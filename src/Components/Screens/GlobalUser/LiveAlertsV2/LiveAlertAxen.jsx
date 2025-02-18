import React, { useState, useEffect } from 'react';
import ModelAnalyticsHeader from '../CameraConfigurationV2/Components/ModelAnalytics';
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';
import LiveAlertCards from './Component/AlertCard';
import AreaService from '../../../../api/areaService';
import { Container, Row, Col, Card } from 'reactstrap';
import { AlertOctagon } from 'lucide-react';

// Constants
const FILTER_STORAGE_KEY = 'liveAlertFilters';
const ITEMS_PER_PAGE = 21;

// No Data State Component
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

const LiveAlertAxen = () => {
    // Initialize state with stored filters
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

    // Get user data from localStorage
    const factoryID = JSON.parse(localStorage.getItem('userData'))?.factory?.id || 1;
    const userID = JSON.parse(localStorage.getItem('userData'))?.id || 1;
    const getCurrentWeek = (currentWeekDisable = false) => {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const dayOfWeek = oneJan.getDay(); // Get the day of the week for Jan 1 (0 = Sunday, 6 = Saturday)
        
        // Ensure the first week always starts on Monday and includes all seven days
        const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
        
        // Calculate the week number
        const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
        const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    
        if (currentWeekDisable) {
            const previousWeekNumber = weekNumber - 1;
            return previousWeekNumber > 0
                ? `${now.getFullYear()}-W${previousWeekNumber.toString().padStart(2, "0")}`
                : `${now.getFullYear() - 1}-W52`; // Handle case where first week is disabled
        }
        
        return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
    };
    
    console.log(getCurrentWeek(false)); // Example output: "2025-W06"
    console.log(getCurrentWeek(true));  // Example output (previous week): "2025-W05"
    

    const processShiftValue = (filters) => {
        // Handle multi-shift case
        if (filters.multiShift && Array.isArray(filters.multiShift)) {
            return filters.multiShift;
        }
        
        // Handle single shift case
        if (filters.shift) {
            return Array.isArray(filters.shift) ? filters.shift : [filters.shift];
        }
        
        // Default case: return empty array
        return [];
    };

    const fetchAlerts = async (currentFilters) => {
        setLoading(true);
      
        // Determine the identifier based on the selected time filter
        const identifier = currentFilters.timeFilterSelection === 'custom'
          ? "custom"
          : currentFilters.timeFilterSelection === 'month'
            ? "month"
            : currentFilters.timeFilterSelection === 'daily'
              ? "date" // Use "date" as the identifier for daily filter
              : "week"; // Default to "week"
      
        try {
          const shiftValue = processShiftValue(currentFilters);
          console.log('Processed shift value:', shiftValue);
      
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
              date: currentFilters.timeFilterSelection === 'daily' ? currentFilters.customStartDate : "", // Pass date for daily filter
              month: currentFilters.month || "",
              area: "",
              subarea: Array.isArray(currentFilters.subarea) ? currentFilters.subarea : [],
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

    // Fetch alerts when filters or page changes
    useEffect(() => {
        fetchAlerts(filters);
    }, [filters, page]);

    // Save filters to localStorage when they change
    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
        }
    }, [filters]);

    const handleAccept = (newFilters) => {
        console.log('Received new filters:', newFilters);
        
        // Process the filters to handle both single and multi-shift scenarios
        const processedFilters = {
            ...newFilters,
            // If multiShift exists and has values, use it
            // Otherwise, keep the single shift value or empty array
            shift: newFilters.multiShift && Array.isArray(newFilters.multiShift) && newFilters.multiShift.length > 0
                ? newFilters.multiShift
                : newFilters.shift || []
        };
        
        console.log('Processed filters:', processedFilters);
        
        // Reset to first page when filters change
        setPage(1);
        setFilters(processedFilters);
    };

    const handleReset = () => {
        // Clear filters from localStorage
        localStorage.removeItem(FILTER_STORAGE_KEY);
        
        // Reset all state
        setFilters({});
        setPage(1);
        
        // Fetch alerts with empty filters
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
                    areas={true}
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

export default LiveAlertAxen;