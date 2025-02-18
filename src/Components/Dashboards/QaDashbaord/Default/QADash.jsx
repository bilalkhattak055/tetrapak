import React, { Fragment, useContext, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { ArrowDown, ArrowUp } from "react-feather";
import ModelChart from "../../../Screens/GlobalUser/AIModelReports/Components/Charts/ModelChart";
import AreaService from "../../../../api/areaService";
import Loader1 from "./../../../../CommonElements/Spinner/loader";
import Loader3 from "./../../../../CommonElements/Spinner/loader3";
import Index from "../../AreaDashbaord/reports/Index";
import AccuracyCard from "./AccuracyCard";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import './../../AreaDashbaord/reports/Components/LiveAlertsCards/livealerts.css'
import DownloadContext from '../../../../_helper/formData/LiveAnalytics/LiveAnalytics'

export default function QADash() {


  const [rejectedArray, setRejectedArray] = useState([]);
  const [togglee, settogglee] = useState(false)
  const [runApi, setRunApi] = useState(false);
  const [lastFilter, setLastFilter] = useState(null);
  const [loader, setLoader] = useState(true);
  const [series2, setSeries2] = useState();
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const [accuracySectionData, setAccuracySectionData] = useState({
    aiAccuracy: undefined,
    connectivity: undefined,
    highSeverityAlerts: undefined,
    maxAlerts: undefined,
  });
  const getCurrentWeek = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Get the first day of the year
    const firstDayOfYear = new Date(year, 0, 1);
    const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;

    // Calculate the current week number
    const currentWeekNumber = Math.ceil(
      (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
    );

    // Return the formatted value in YYYY-Wxx format
    return `${year}-W${currentWeekNumber.toString().padStart(2, "0")}`;
  };

  const {setTechQaContext, techQaContext} = useContext(DownloadContext)

  const currentWeekk = getCurrentWeekWithYear();
  const getCurrentWeekNumber = () => {
    const currentWeek = getCurrentWeekWithYear(); // This gives you something like "2024-W45"
    const weekNumber = currentWeek.split("W")[1]; // Extract the week number (e.g., "45")
    return weekNumber;
  };

  const currentWeekNumber = getCurrentWeekNumber();
  useEffect(() => {
    
  let fils = JSON.parse(localStorage.getItem('qafilters'))
  if(!fils){
    localStorage.setItem('qafilters',JSON.stringify(qaFilters))
  }
  else{
    setQaFilters(fils)
  }
   
  }, [])
  

  async function modelAccuracy(payload) {
    // setLoader(true)
    const res = await AreaService.getModelAccuracyChart(payload);
    // if (res) {
    //   setLoader(false);
    // }
    console.log("these are models", res?.data);

    // const modifiedData = res?.data?.totalAlertsChart.map((item) => {
    //   // Modify the names as required
    //   if (item.name === "forklift_person_in_same_aisle") {
    //     item.name = "MMHE";
    //   } else if (item.name === "emergency_exit_blockage") {
    //     item.name = "Emergency Exit";
    //   } else if (item.name === "machine_guard_open") {
    //     item.name = "Machine Guard";
    //   }

    //   return item;
    // });

    // Set the modified data in setSeries2
    const modifiedData = (res?.data?.totalAlertsChart || []).map((item) => {
      if (item.name === "forklift_person_in_same_aisle") {
          item.name = "MMHE";
      } else if (item.name === "emergency_exit_blockage") {
          item.name = "Emergency Exit";
      } else if (item.name === "machine_guard_open") {
          item.name = "Machine Guard";
      }
      return item;
  });
    
    setSeries2([res?.data?.compliance_accuracy]);
    setAccuracySectionData((prev)=>({
      ...prev,
      aiAccuracy: res?.data?.total_accuracy
    }))
    setTechQaContext((prev)=>({
      ...prev,
      complianceData: modifiedData
    }))

    // Calculate the average value of the total alerts chart
    const nonZeroValues = modifiedData
      .map((item) => item.value)
      .filter((value) => value !== 0);
    const averageValue =
      nonZeroValues.reduce((acc, val) => acc + val, 0) / nonZeroValues.length

    // Update the aiAccuracy in the accuracySectionData state
    // setAccuracySectionData((prevState) => ({
    //   ...prevState,
    //   aiAccuracy: {
    //     ...prevState.aiAccuracy,
    //     value: Math.round(averageValue), // Set the average of values as aiAccuracy
    //   },
    // }));
  }

  const [allowButton, setAllowButton] = useState(false);
 const [qaFilters, setQaFilters] = useState({
  user_id: 1,
  identifier: "week",
  factory_id:factoryID,
  filters: {
    approval:"Select Approval",
    module: "",
    severity: "",
    shift: [],
    date: "",
    week: currentWeekk,
    month: "",
    starting: "",
    ending: "",
    area: '',
    subarea: "",
  },
  pagination: {
    page_no: 1,
    per_page: 21,
  },
});


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const fils = JSON.parse(localStorage.getItem('qafilters'))
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    // {
    //   week: currentWeekk,
    //   factory_id: factoryID
    // };
    
    const payload = {
      user_id: 1,
      identifier: "week",
      factory_id:factoryID,
      filters: qaFilters,
      pagination: {
        page_no: 1,
        per_page: 21,
      },
    };

    const updatedFilters = {
      ...fils,
      filters: {
          ...fils.filters,
          areas: fils.filters.area!=="" ? [fils.filters.area] : []  // Add areas inside the existing filters
      }
  };
  
  delete updatedFilters.filters.area;  
  setLoader(true); // Start loader before API calls

  Promise.all([
    modelAccuracy(updatedFilters),
    fetchAlerts(fils)
  ]).then(([modelResponse, alertResponse]) => {
    // Both API responses are available here
    console.log('Model Accuracy Response:', modelResponse);
    console.log('Alerts Response:', alertResponse);
  }).catch((error) => {
    console.error('Error fetching data:', error);
  }).finally(() => {
    setLoader(false);  // Turn off loader after both calls complete
  });
    // modelAccuracy(qaFilters);
  }, [
    // togglee, 
    qaFilters]);


async function fetchAlerts(payload){
// setLoader(true)
const res = await AreaService.getFilterAlerts(payload)
// if(res){
//   setLoader(false)
// }
console.log('api ok')
// setAccuracySectionData((prevState) => ({
//   ...prevState,
//   aiAccuracy: {
//     ...prevState.aiAccuracy,
//     value: Math.round((
//       ((res.data.data.accepted_records/(res.data.data.accepted_records + res.data.data.rejected_records))*100)
//     )), // Set the average of values as aiAccuracy
//   },
// }));

setTechQaContext((prev)=>({
  ...prev,
  aiAccuracy: Math.round((
    ((res.data.data.accepted_records/(res.data.data.accepted_records + res.data.data.rejected_records))*100)
  ))
}))

}

  

  useEffect(() => {

    const filter = {
      approval: "Select Approval",
      module: "",
      area: '',
      subarea: '',
      severity: "",
      shift: "",
      date: "",
      week: currentWeekk,
      month: "",
      starting: "",
      ending: "",
    };
    
    // const payload = {
    //   user_id: 1,
    //   identifier: "week",
    //   factory_id:factoryID,
    //   filters: qaFilters,
    //   pagination: {
    //     page_no: 1,
    //     per_page: 21,
    //   },
    // };

    // fetchAlerts(payload);

   
  }, [togglee])
  

  return (
    <>
      <br />
      <Container className="px-3 mb-0 pb-0" fluid={true}>
       
          <>
            <Row>
              <Col className="" xl="12" lg="12" md="12" sm="12" xs="12">
                <h4 style={{ fontSize: "20px" }}>Dashboard</h4>
              </Col>
            </Row>
            <Row>
              <Col lg={12} xl={8}>
                <Card ref={techQaContext.techComplianceRef} style={{ width: "100%", height: "100%" }}>
                  <CardBody>
                    {
                      !loader ? (
                        <ModelChart
                        series2={series2}
                        setSeries2={setSeries2}
                        lastFilter={lastFilter}
                        setLastFilter={setLastFilter}
                        currentweek={currentWeekNumber}
                      />
                      )
                      : (
                        <div style={{height:'100%', width:'100%'}} className=" d-flex align-items-center justify-content-center">
                        <span className=""><Loader3 /></span>
                      </div>
                      )
                    }
                 
                  </CardBody>
                </Card>
              </Col>

              <Col className=" mt-xl-0" xl={4} lg={12} md="12">
                {/* {mb-md-4 mb-xxl-2} */}
                <Card
                  className="  mt-xl-0 mt-lg-3  mt-md-3 mt-sm-3 mt-xs-3 mt-3"
                  style={{ width: "100%", height: "100%" }}
                  ref={techQaContext.accuracyRef}
                >
                  <CardBody className="d-flex flex-column flex-lg-row flex-xl-column flex-md-row flex-sm-row justify-content-evenly  align-items-center">
                    {/* <img style={{height:'100px'}} src={'https://media0.giphy.com/media/LESpNIDaNBUcRIPzng/200w.gif?cid=6c09b952fsb9p8mnacpcwfqoyjeoe5pi6xaheytybc8ruvau&ep=v1_gifs_search&rid=200w.gif&ct=g'} /> */}
                    {/* <Settings2 className="gear gear-main text-primary" size={48} /> */}
                    {/* <Settings2 className="gear gear-secondary text-primary-light position-absolute" style={{ top: '0', right: '-24px' }} size={40} /> */}

                   
                    {
                      (!loader) ? (
                       
                        <>

<AccuracyCard
                      weekNumber={currentWeekNumber}
                      accuracy={accuracySectionData.aiAccuracy}
                    />
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 ">
                      <h4 className="mb-0 ">AI Accuracy</h4>
                      {/* <h4 className="mb-0"> <ArrowDown color="red" size={20} />{85}%</h4> */}
                      <h4 className="mb-0  d-flex align-items-center">


                        {accuracySectionData.aiAccuracy < 80 ? (
                          <ArrowDown color="red" size={20} />
                        ) : isNaN(accuracySectionData.aiAccuracy) ? 
                        <>
                        
                        </>
                        :
                        
                        
                        
                        (
                          <ArrowUp color="green" size={20} />
                        )}

{!isNaN(accuracySectionData.aiAccuracy) ? `${accuracySectionData.aiAccuracy}%` : 'N/A'}
                      </h4>

                      {/* <span className="f-light ">
                        Week {currentWeekNumber} Data
                      </span> */}
                    </div>


                       </>
                      )
                      : (
                        <div style={{height:'100%', width:'100%'}} className=" d-flex align-items-center justify-content-center">
                          <span className=""><Loader3 /></span>
                        </div>
                      )
                    }

                   
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
       
      </Container>
      <Index
      togglee={togglee}
      settogglee={settogglee}
    
      rejectedArray={rejectedArray}
      setRejectedArray={setRejectedArray}
        runApi={runApi}
        setRunApi={setRunApi}
        allowButton={allowButton}
        setAllowButton={setAllowButton}
        setQaFilters={setQaFilters}
      />
    </>
  );
}
