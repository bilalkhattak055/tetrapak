import React, { useState, useEffect } from 'react';
import ModelAnalyticsHeader from '../CameraConfigurationV2/Components/ModelAnalytics';
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';
import LiveAlertCards from './Component/AlertCard';
import AreaService from '../../../../api/areaService';
import { Container, Row, Col, Card } from 'reactstrap';
import { AlertOctagon } from 'lucide-react';

const FILTER_STORAGE_KEY = 'liveAlertFilters';
const ITEMS_PER_PAGE = 21;

const NoDataState = () => {
    return (
        <Row className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Col xs={12} sm={10} md={8} lg={6} className="text-center">
                <Card className="border-0 shadow-md p-5" style={{ background: 'linear-gradient(145deg, #f8f9fa 10%, #e9ecef 100%)' }}>
                    <div className="d-flex flex-column align-items-center gap-4">
                        <div className="p-4 rounded-circle" style={{ background: '#635470' }}>
                            <AlertOctagon size={64} style={{ color: '#ffffff' }} />
                        </div>
                        <div>
                            <h3 className="mb-3 fw-bold" style={{ color: '#635470' }}>No Alerts Found</h3>
                            <p className="text-muted mb-0">
                                We couldn't find any alerts matching your criteria. Please try adjusting your filters or check back later.
                            </p>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

const HeatAlertAxen = () => {
    const [filters, setFilters] = useState(() => {
        const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
        return savedFilters ? JSON.parse(savedFilters) : {};
    });
    
    const [alertData, setAlertData] = useState({
        alerts: [],
        totalRecords: 0,
        acceptedRecords: 0,
        rejectedRecords: 0,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const factoryID = JSON.parse(localStorage.getItem('userData'))?.factory?.id || 1;
    const userID = JSON.parse(localStorage.getItem('userData'))?.id || 1;

    const getCurrentWeek = () => {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const dayOfWeek = oneJan.getDay();
        const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
        const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
        const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
        return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
    };

    const processShiftValue = (filters) => {
        if (filters.multiShift && Array.isArray(filters.multiShift)) {
            return filters.multiShift;
        }
        if (filters.shift) {
            return Array.isArray(filters.shift) ? filters.shift : [filters.shift];
        }
        return [];
    };

    const determineIdentifier = (currentFilters) => {
        // First check if there's an explicit identifier from NewHeatmap
        if (currentFilters.identifier) {
            return currentFilters.identifier;
        }

        // Then check time filter selection
        if (currentFilters.timeFilterSelection) {
            switch (currentFilters.timeFilterSelection) {
                case 'custom':
                    return 'custom';
                case 'month':
                    return 'month';
                case 'daily':
                    return 'date';
                default:
                    return 'week';
            }
        }

        // Finally, determine based on filter values
        if (currentFilters.month) {
            return 'month';
        }
        if (currentFilters.customStartDate && currentFilters.customEndDate) {
            return 'custom';
        }
        if (currentFilters.date) {
            return 'date';
        }
        
        return 'week';
    };

    const fetchAlerts = async (currentFilters) => {
        setLoading(true);
        
        try {
            const shiftValue = processShiftValue(currentFilters);
            const identifier = determineIdentifier(currentFilters);
            
            console.log('Current filters:', currentFilters);
            console.log('Determined identifier:', identifier);

            const payload = {
                user_id: userID,
                factory_id: factoryID,
                identifier,
                pagination: {
                    page_no: page,
                    per_page: ITEMS_PER_PAGE
                },
                filters: {
                    approval: currentFilters.approval || "Select Approval",
                    module: currentFilters.module || "",
                    severity: currentFilters.severity || "",
                    shift: shiftValue,
                    date: identifier === 'date' ? currentFilters.customStartDate : "",
                    month: currentFilters.month || "",
                    area: currentFilters.area || "",
                    subarea:currentFilters.subarea|| "",
                    week: currentFilters.week || getCurrentWeek(),
                    starting: currentFilters.customStartDate || "",
                    ending: currentFilters.customEndDate || ""
                }
            };

            console.log('Sending API payload:', payload);
            const response = await AreaService.getFilterAlerts(payload);

            if (response?.data?.data) {
                setAlertData({
                    alerts: response.data.data.alerts || [],
                    totalRecords: response.data.data.total_records || 0,
                    acceptedRecords: response.data.data.accepted_records || 0,
                    rejectedRecords: response.data.data.rejected_records || 0,
                    totalPages: response.data.data.total_pages || 0
                });
            } else {
                setAlertData({
                    alerts: [],
                    totalRecords: 0,
                    acceptedRecords: 0,
                    rejectedRecords: 0,
                    totalPages: 0
                });
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
            setAlertData({
                alerts: [],
                totalRecords: 0,
                acceptedRecords: 0,
                rejectedRecords: 0,
                totalPages: 0
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts(filters);
    }, [filters, page]);

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
        }
    }, [filters]);

    const handleAccept = (newFilters) => {
        console.log('Received new filters:', newFilters);
        
        const processedFilters = {
            ...newFilters,
            shift: newFilters.multiShift && Array.isArray(newFilters.multiShift) && newFilters.multiShift.length > 0
                ? newFilters.multiShift
                : newFilters.shift || []
        };
        
        setPage(1);
        setFilters(processedFilters);
    };

    const handleReset = () => {
        localStorage.removeItem(FILTER_STORAGE_KEY);
        setFilters({});
        setPage(1);
        fetchAlerts({});
    };

    return (
        <Container fluid className='pt-2 pb-2'>
            <WeekFilterProvider>
                <ModelAnalyticsHeader
                    heading={`Live Alerts`}
                    alertText={`| Alerts: ${alertData.totalRecords}`}
                    currentWeek={false}
                    shifts={false}
                    multiShift={true}
                    months={false}
                    modules={true}
                    severity={false}
                    timeFilterOption={true}
                    areas={false}
                    showActions={true}
                    onAccept={handleAccept}
                    onReset={handleReset}
                />
                {!loading && alertData.alerts.length === 0 ? (
                    <NoDataState />
                ) : (
                    <LiveAlertCards
                        filters={filters}
                        alerts={alertData.alerts}
                        loading={loading}
                        totalRecords={alertData.totalRecords}
                        currentPage={page}
                        totalPages={alertData.totalPages}
                        onPageChange={setPage}
                    />
                )}
            </WeekFilterProvider>
        </Container>
    );
};

export default HeatAlertAxen;