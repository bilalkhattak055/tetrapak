import React, { useState, useEffect } from 'react';
import ComplianceChart from './Components/ComplianceGraph';
import PPEViolation from './Components/PPEViolation';
import DayViolationGraph from './Components/DayAlert';
import { Container, Row, Col, Spinner } from 'reactstrap';
import CameraPics from './Components/CameraPics';
import ModelAnalyticsHeader from '../CameraConfigurationV2/Components/ModelAnalytics';
import WeekFilterProvider, { useWeekFilter } from '../../../../Contexts/WeakGlobal';
import AreaService from '../../../../api/areaService';
import preview from './../../../../assets/images/svg-icon/preview.png';

const AnalyticsDashboard = () => {
  const [complianceData, setComplianceData] = useState({
    compliance_summary: [],
    average_compliance_percentage: 0
  });
  const [ppeData, setPpeData] = useState([]);
  const [gateData, setGateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraData, setCameraData] = useState([]);

  const factoryID = JSON.parse(localStorage.getItem('userData'))?.factory?.id || 1;
  const userID = JSON.parse(localStorage.getItem('userData'))?.id || 1;

  const {
    currentFilter,
    selectedWeek,
    selectedMonth,
    selectedShift
  } = useWeekFilter();
  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay(); // Get the day of the week for January 1st (0 = Sunday, 6 = Saturday)
    
    // Adjust to make Monday the start of the week (ISO standard)
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    
    // Calculate the difference in days and convert to full weeks
    const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };


  const fetchCameraData = async (currentFilters) => {
    
    const processShiftValue = (filters) => {
      // Handle multi-shift case
      if (filters.multiShift && Array.isArray(filters.multiShift)) {
          return filters.multiShift;
      }
      
      // Handle single shift case
      if (filters.shift) {
          return Array.isArray(filters.shift) ? filters.shift : [filters.shift];
      }
      
     
      return [];
  };
    const identifier = currentFilters?.month
      ? "month"
      : currentFilters?.week
      ? "week"
      : "week";
  
    try {
      const shiftValue = processShiftValue(currentFilters);
      const payload = {
        user_id: userID,
        factory_id: factoryID,
        identifier,
        pagination: {
          page_no: 1,
          per_page: 3  
        },
        filters: {
          approval: "Select Approval",
          module: "",
          severity: "",
          shift: shiftValue ,
          date: "",
          month: currentFilters?.month || "", // Use optional chaining to avoid errors
          area: "",
          subarea: "",
          week: currentFilters?.week || getCurrentWeek() 
        }
      };
  
      const response = await AreaService.getFilterAlerts(payload);
  
      if (response.data && response.data.data && response.data.data.alerts) {
        // Take first 3 alerts and format them for camera display
        const firstThreeAlerts = response.data.data.alerts.slice(0, 3);
        const formattedData = firstThreeAlerts.map(alert => ({
          image: alert.image || preview,
          time: new Date(alert.timestamp).toLocaleString(),
        }));
  
        setCameraData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching alert images:", error);
      // Fallback to preview images
      setCameraData([
        { image: preview, time: new Date().toLocaleString() },
        { image: preview, time: new Date().toLocaleString() },
        { image: preview, time: new Date().toLocaleString() }
      ]);
    }
  };

  const fetchData = async (payload) => {
    setIsLoading(true);
    try {
      const [complianceResponse, ppeResponse] = await Promise.all([
        AreaService.fetchAnalyticsProgressGbl(payload),
        AreaService.getAlertsCount(payload)
      ]);
  
      setComplianceData(complianceResponse.data);
      setPpeData(ppeResponse.data.alertsBarChart);
      setGateData(ppeResponse.data.alertsGateCount);
  
      // Pass the payload (or relevant filters) to fetchCameraData
      await fetchCameraData(payload);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilterChange = (filters) => {
    const payload = {
      factory_id: factoryID,
      shift: filters.shift || "",
      weekly: filters.week ? filters.week : "", 
     month: filters.month ? filters.month : ""
    };
    fetchData(payload);
  };

  useEffect(() => {
    const payload = {
      factory_id: factoryID,
      shift: selectedShift || "",
      weekly: currentFilter === "week" ? selectedWeek || getCurrentWeek() : "", 
     month: currentFilter === "month" ? selectedMonth || getCurrentMonth() : ""

    };
    fetchData(payload);
  
    // Refresh alert images every 5 minutes with the correct filters
    const intervalId = setInterval(() => {
      fetchCameraData(payload);
    }, 300000);
  
    return () => clearInterval(intervalId);
  }, [currentFilter, selectedWeek, selectedMonth, selectedShift, factoryID]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner
          style={{
            height: '3rem',
            width: '3rem',
            color: '#635470'
          }}
        />
      </div>
    );
  }

  return (
    <>
    <style>
      {
        `
        @media (max-width: 490px) {
          .headings{
            font-size:26px !important
          }
        }
        `
      }
    </style>
    <Container fluid className="pt-2 pb-4">
      <ModelAnalyticsHeader
        heading="Live Analytics"
        headingstyle={"headings"}
        currentWeek={true}
        shifts={true}
        months={true}
        modules={false}
        severity={false}
        areas={false}
        timeFilterOption={false}
        showActions={false}
        onAccept={handleFilterChange}
        onReset={() => {
          const initialPayload = {
            factory_id: factoryID,
            shift: "",
            weekly: "",
            month: ""
          };
          fetchData(initialPayload);
        }}
      />
      <Row className="g-3">
        <Col xs={12} md={5} lg={5} xl={5} xxl={3}>
          <ComplianceChart data={complianceData} />
        </Col>
        <Col xs={12} md={7} lg={7} xl={7} xxl={4}>
          <PPEViolation data={ppeData} gateData={gateData} />
        </Col>
        <Col xs={12} lg={12} xl={12} xxl={5}>
          <DayViolationGraph
            currentFilter={currentFilter}
            selectedWeek={selectedWeek}
            selectedMonth={selectedMonth}
            selectedShift={selectedShift}
          />
        </Col>
      </Row>
      <CameraPics data={cameraData} />
    </Container>
    </>
  );
};

const AxenLiveAnalytics = () => {
  return (
    <WeekFilterProvider>
      <AnalyticsDashboard />
    </WeekFilterProvider>
  );
};

export default AxenLiveAnalytics;