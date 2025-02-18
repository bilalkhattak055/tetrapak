import React, { useState, useEffect } from "react";
import ComplianceTargetsChart from "./Component/ComplianceTarget";
import AlertCountsChart from "./Component/AlertCount";
import ModelAnalyticsHeader from "../CameraConfigurationV2/Components/ModelAnalytics";
import Cards from './Component/CARDFT';
import TargetModal from "./Component/TargetModal";
import { WeekFilterProvider, useWeekFilter } from "../../../../Contexts/WeakGlobal";
import { Container, Row, Col, CardTitle } from 'reactstrap';
import { tarConService } from '../../../../api/tarConService';

const TargetControlContent = () => {
  const { selectedWeek } = useWeekFilter();
  const [loading, setLoading] = useState(false);
  const [targetAreas, setTargetAreas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentAlerts, setCurrentAlerts] = useState(0);
  const factoryID = JSON.parse(localStorage.getItem('userData'))?.factory?.id || 14;
  const userID = JSON.parse(localStorage.getItem('userData'))?.id || 89;

  const fetchData = async () => {
    setLoading(true);
    if (!selectedWeek) return;
  
    try {
      const payload = {
        week: selectedWeek,
        user_id: userID,
        factory_id: factoryID,
      };
  
      const response = await tarConService.tarAndCon(payload);
      console.log(response.data,'target and control')
      // Access the nested data structure from Axios response
      if (response?.data?.success && response?.data?.data?.target_areas) {
        setTargetAreas(response.data.data.target_areas);
      } else {
        console.error('Invalid data structure:', response?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTarget = async (payload) => {
    console.log('bilalll', payload)
    try {
      // setLoading(true);
      
      const updatedPayload = {
        ...payload,
        week: selectedWeek,
        factory_id: factoryID,
        user_id: userID,
      };

      const response = await tarConService.targetEdit(updatedPayload);
      // Check the nested data structure from Axios response
      if (response?.data?.success) {
        console.log("Target updated successfully:", response.data);
        // Refresh the data after successful update
        setTimeout(()=> {
          fetchData();
        }, 500)
       
      } else {
        console.error("Failed to update target:", response?.data?.message || 'Unknown error');
      }
    } catch (err) {
      console.error("Error updating target:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedWeek]);

  
  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSelectTarget = (areaId, lastWeekAlerts) => {
    console.log('bilal2', areaId, lastWeekAlerts)
    if (lastWeekAlerts === 0) {
      return;
    }
    setSelectedArea(areaId);
    setCurrentAlerts(lastWeekAlerts); 
    setModalOpen(true);
  };
  

  const getTargetStatus = (alerts, target) => {
    if (!alerts || !target) return "";
    return alerts < target ? "Target Achieved" : "";
  };

  const calculateDisplayPercentage = (alerts, target) => {
    const availablePercentages = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100];

    if (!alerts || !target || alerts <= 0 || target <= 0) {
      return "N/A";
    }

    const reductionNeeded = alerts - target;
    const actualPercentage = (reductionNeeded / alerts) * 100;

    const closestPercentage = availablePercentages.reduce((prev, curr) => {
      return Math.abs(curr - actualPercentage) < Math.abs(prev - actualPercentage)
        ? curr
        : prev;
    });

    return `${closestPercentage}%`;
  };

  // Render loading state
  const renderLoading = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "250px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );


  return (
    <>
    <Container fluid className="py-3">
      <CardTitle style={{ color: "#383838", fontWeight: 700, fontSize: "24px" }}>
        Targets & Controls
      </CardTitle>
      <Row>
        <ModelAnalyticsHeader heading={'Model Analytics'} />
        <Col xs={12} lg={5}>
          <div className="p-3">
            <ComplianceTargetsChart
              loading={loading}
              targetAreas={targetAreas}
            />
          </div>
        </Col>
        <Col xs={12} lg={7}>
          <div className="p-3">
            <AlertCountsChart
              loading={loading}
              targetAreas={targetAreas}
            />
          </div>
        </Col>
      </Row>
      </Container>
      
      
          {loading ? (
            renderLoading()
          ) : (
             <Container fluid>
              <CardTitle style={{color: "#383838",fontWeight: 700, fontSize: "24px", marginBottom: "20px"}}>Set Area Targets</CardTitle>
              <Row className="g-3">
                {targetAreas.map((item) => (                  
                  <Col key={item.id} xs={12} md={6} lg={6} xl={4} xxl={4}>
                    <Cards
                      title={item.owner}
                      subArea={item.area_id}
                      targetStatus={getTargetStatus(
                        item.current_week.alerts,
                        item.current_week.target
                      )}
                      reductionTarget={calculateDisplayPercentage(
                        item.current_week.alerts,
                        item.current_week.target
                      )}
                      currentWeekData={{
                        targets: item.current_week.target || "N/A",
                        alerts: item.current_week.alerts,
                      }}
                      lastWeekData={{
                        targets: item.last_week.target || "N/A",
                        alerts: item.last_week.alerts,
                      }}
                      onSelectTarget={() => handleSelectTarget(item.id, item.current_week.alerts)}
                      isCurrentWeek={selectedWeek}           
                    />
                  </Col>
                  
                ))}
              </Row>
              </Container>


            
          )}
        

      <TargetModal
        isOpen={modalOpen}
        toggle={toggleModal}
        areaId={selectedArea}
        currentAlerts={currentAlerts}
        onSave={handleUpdateTarget}
      />
      </>
    
  );
};

const TargetControl = () => {
  return (
    <WeekFilterProvider>
      <TargetControlContent />
    </WeekFilterProvider>
  );
};

export default TargetControl;
