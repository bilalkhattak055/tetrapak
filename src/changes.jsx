import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import { RecentOrderChart } from "../../../Screens/GlobalUser/LiveAnalytics/analytics_data_temp";
import ReactApexChart from "react-apexcharts";
import { ArrowDown, ArrowUp, Camera } from "react-feather";
import "../../../Screens/GlobalUser/AIModelReports/custom.css";
import {
  AreaOwnerAnlyticsJSON,
  dummyJSON,
} from "../../../../Data/staticData/data";
import ProgressBars from "../../../Screens/GlobalUser/LiveAnalytics/components/ProgressBars";
import ApexInteractiveHeatmap from "../../../Screens/GlobalUser/LiveAnalytics/components/HeatMap";
import AlertsTrendChart from "../../../Screens/GlobalUser/LiveAnalytics/components/AlertsTrendChart";
import { errorToast, getWeek } from "../../../../_helper/helper";
import { H4 } from "../../../../AbstractElements";
import { getCurrentWeekNumber } from "../../../../utils/getCurrentWeekNumber";
import AreaService from "../../../../api/areaService";
import Loader3 from "../../../../CommonElements/Spinner/loader3";
import CameraService from "../../../../api/cameraService";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import AreaHeatmapnew from '../../../Screens/GlobalUser/LiveAnalytics/components/AreaHeatmapnew'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const AreaDashboard = ({ id }) => {
  const [accuracySectionData, setAccuracySectionData] = useState({
    aiAccuracy: undefined,
    connectivity: undefined,
    highSeverityAlerts: undefined,
    maxAlerts: undefined,
  });
  const [connectivityData, setConnectivityData] = useState()
  const [heatmapData, setHeatmapData] = useState({
    areas: [],
    subAreas: [],
    areaOwner: [],
    data: [],
  });
  const [week, setWeek] = useState();
  const [progressData, setProgressData] = useState();
  const [loadingForBars, setloadingForBars] = useState(true)
  const [recentOrderChart, setRecentOrderChart] = useState(RecentOrderChart);
  const [CurrentWeek, setCurrentWeek] = useState(undefined);
  const [accuracyPercent, setAccuracyPercent] = useState()
  const [acuuracyLoader, setAccuracyLoader] = useState(true)
  const [OwnerName, setOwnerName] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [loadingForDonut, setLoadingForDonut] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [connectivityLoader, setConnectivityLoader] = useState(true);
  const [loaderforProgressbar, setloaderforProgressbar] = useState(true);
  const [loaderforHeatmap, setloaderforHeatmap] = useState(true);
  const [heatmapNullcheck, setheatmapNullcheck] = useState(false);
  const [progressBarCheck, setprogressBarCheck] = useState(false);
  const [radialbarcheck, setradialbarcheck] = useState(false);
  const [detailsofAreaOwner, setdetailsofAreaOwner] = useState()
  const handleMouseEnter = (e) => {
    setTooltipPosition({ top: e.clientY, left: e.clientX });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (e) => {
    setTooltipPosition({ top: e.clientY, left: e.clientX });
    setShowTooltip(!showTooltip); // Toggle tooltip on click for mobile devices
  };

  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  useEffect(() => {
    //parse JSON data
    // fetchAnlyticsData();
    ai_accuracy();
    fetchProgressBarOfArea();
    fetchAreaHeatmap();
    const parseJSONData = () => {
      const parsedData = JSON.parse(AreaOwnerAnlyticsJSON); // Parse the JSON
      const newSeries = parsedData.complianceData.series; // Extract the series data
      setOwnerName(parsedData?.OwnerName);
      //top right section data
      setAccuracySectionData({
        aiAccuracy: parsedData?.aiAccuracy,
        connectivity: parsedData?.connectivity,
        // highSeverityAlerts: parsedData?.highSeverityAlerts,
        maxAlerts: parsedData?.maxAlerts,
      });

      //progress bars
      setWeek(parsedData.week);

      // comment done by sheheryar
      // setProgressData(parsedData?.progressData);

      //heatmap
      // setHeatmapData(parsedData.heatmapData);
      // Set dynamic categories and series for chart
      setChartData({
        categories: parsedData.alertsTrendChart.categories,
        series: parsedData.alertsTrendChart.series,
      });

      // Update the chart state with the new series data
      // setRecentOrderChart((recentOrderChart) => ({
      //   ...recentOrderChart,
      //   series: newSeries,  // Update series with parsed data
      // }));
    };
    parseJSONData();

    // setLoader(true);
    const curr_date = new Date().toLocaleDateString("en-CA");
    // let unsubscribe = fetchAlerts(curr_date);
    const now = new Date();
    const year = now.getFullYear();
    const week = getWeek(now);
    const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
    setCurrentWeek(maxWeek);
    // return () => unsubscribe;
  }, []);
  useEffect(() => {
    // const areaUser = id ? id : JSON.parse(localStorage.getItem("userData"))?.area_ids?.name || "";
    const areaUser = id ? id : JSON.parse(localStorage.getItem("userData"))?.area_ids?.name || "";
    CameraService.getAllLiveCameras()
      .then((res) => {
        const response = res?.data?.data;
        console.log('response Camera' , response);
        
        const updated_response = response?.filter((a) => a.area == areaUser);
        const conn_percentage =
          updated_response?.length > 0
            ? Math.round(
              (updated_response?.filter((i) => i?.active === true)?.length /
                updated_response?.length) *
              100
            ).toFixed(0)
            : 0;

        setConnectivityData((prevState) => ({
          ...prevState,
          connectivity: {
            value: conn_percentage,
            trend: conn_percentage > 50 ? "up" : "down",
            status:
              conn_percentage == 100
                ? "All Systems operational"
                : conn_percentage > 0
                  ? "Check Network or CCTV"
                  : "Systems are down",
          },
        }));
        setConnectivityLoader(false);
      })
      .catch((e) => {
        setConnectivityLoader(false);
        console.log(e);
      });
  }, []);

  // async function fetchAnlyticsData() {
  //   const userArea =
  //     JSON.parse(localStorage.getItem("userData")).area_ids.name || false;
  //   const areID = id
  //   const payload = {
  //     area: areID ? areID : userArea,
  //   };
  //   try {
  //     const res = await AreaService.fetchAnalyticsPercentGbl(
  //       userArea && payload
  //     );
  //     const length = Object.keys(res.data).length;
  //     if (length == 0) {
  //       setradialbarcheck(true);
  //       setLoadingForDonut(false)
  //       return;
  //     }
  //     else if (res.status == 200) {

  //       // Update the chart state with the new series data

  //       setRecentOrderChart((recentOrderChart) => ({
  //         ...recentOrderChart,
  //         series: res?.data?.complianceData?.series, // Update series with parsed data
  //       }));
  //     }
  //     setLoadingForDonut(false);
  //   } catch (err) {
  //     console.log("Analytics page, Donut chart error", err);
  //     setradialbarcheck(true)
  //     setLoadingForDonut(false);
  //   }
  // }
  // async function ai_accuracy() {
  //   const userArea =
  //     JSON.parse(localStorage.getItem("userData")).area_ids.name || false;
  //   const payload = {
  //     safety_area: [userArea],
  //     shift: [],
  //     week: getCurrentWeekWithYear(), };
  //     console.log("payloadpayloadddd", payload)
  //   try {
  //     const res = await AreaService.getModelAccuracyChart(payload);

  //     console.log('these are models', res?.data);

  //     let modifiedData = res?.data?.totalAlertsChart?.map(item => {
  //       // Modify the names as required
  //       if (item.name === 'forklift_person_in_same_aisle') {
  //         item.name = 'MMHE';
  //       } else if (item.name === 'emergency_exit_blockage') {
  //         item.name = 'Emergency Exit';
  //       } else if (item.name === 'machine_guard_open') {
  //         item.name = 'Machine Guard';
  //       }

  //       return item;
  //     });
  //     const totalValues = modifiedData?.reduce((acc, item) => acc + item.value, 0);
  //     const average = totalValues / modifiedData?.length;
  //     const roundedAverage = Math.round(average);
  //     setAccuracyPercent(roundedAverage)
  //     setAccuracyLoader(false);
  //   } catch (err) {
  //     console.log("Analytics page, Donut chart error", err);
  //     setAccuracyLoader(false);
  //   }
  // }
  async function ai_accuracy() {
    // const payload = {
    //   week: getCurrentWeekWithYear(),
    // };
    const userArea =
      JSON.parse(localStorage.getItem("userData")).area_ids.name || false;
    const areID = id

    const payload = {
      safety_area: [areID ? areID : userArea],
      shift: [],
      week: getCurrentWeekWithYear(),
    };
    try {
      const res = await AreaService.getModelAccuracyChart(payload);
      if (res?.statusText?.toLocaleLowerCase() == 'ok') {
        const models = res?.data?.totalAlertsChart;
        console.log("res?.data", res?.data);
        console.log(models, 'models');

        // Filter out models with value equal to zero
        const filteredModels = models.filter(model => model.value > 0);

        // Calculate the sum of the filtered values
        const totalValue = filteredModels.reduce((sum, model) => sum + model.value, 0);

        // Calculate the average percentage (only use non-zero values)
        const averagePercentage = filteredModels.length > 0
          ? ((totalValue / (filteredModels.length * 100)) * 100).toFixed(0)
          : 0;

        setAccuracyPercent(averagePercentage);
      }
      setAccuracyLoader(false);
    } catch (err) {
      console.log('Ai accuracy error', err);

      setAccuracyLoader(false);
    }
  }


  const cardClass = `d-flex flex-column  gap-1 gap-sm-2 p-2 p-md-2 justify-content-center`;
  const instialData = JSON.parse(localStorage.getItem('userData'))
  const [localStorageData, setlocalStorageData] = useState(instialData);


  // changes made by sheheryar

  const fetchProgressBarOfArea = async () => {
    let payload;
    let ids=[];
    if(id){
      const data= JSON.parse(localStorage.getItem('areaPayload'));
      ids.push(data.id);
      setdetailsofAreaOwner(data)
      payload={
        areaname:data.name,
        area_ids:ids,
        user_id: data.name =='AO-8'? '99' : 
        data.name =='AO-1'? '102': 
        data.name =='AO-2'?'94':
        data.name =='AO-6'?'90':
        data.name =='AO-7'?'93':
        data.name =='AO-9'?'92':
        data.name =='AO-10'?'95':
        data.name =='AO-13'?'97':
        data.name =='AO-14'?'98':'00'
      } 
    }
    else{
      const userData = JSON.parse(localStorage.getItem('userData'))
      const areaName = userData?.area_ids?.name;
      const areaID = userData?.area_ids?.id;
      const userID = userData?.id;
       payload = {areaname: areaName, area_ids: [areaID], user_id: userID}
    }

    try {
      const res = await AreaService.progressBarOFArea(payload);
      console.log(res, 'final data of progres bar');
      if (res.status == 200) {
        const validBarValues = res?.data?.progressData.filter(item => item.barValue > 0);
        const totalBarValue = validBarValues.reduce((sum, item) => sum + item.barValue, 0);
        const averageBarValue = validBarValues.length > 0 ? totalBarValue / validBarValues.length : 0;
        console.log('Average Bar Value:', averageBarValue);

        // Store the average in an array
        const totalNumber = [Math.round(res?.data?.overall_compliance)];
        setRecentOrderChart((recentOrderChart) => ({
          ...recentOrderChart,
          series: totalNumber,  // Update series with parsed data
        }));
        const updatedData = res?.data?.progressData.map(item => ({
          ...item,
          tooltipContent: [
            { label: 'Max alerts by', value: `${item.area_with_max_alerts} (${item.area_owner})` },
            { label: 'Sub Area', value: `${item.subarea_with_max_alerts}` },
            { label: 'Alerts', value: `${item.max_alerts}` },
          ]
        }));
        setProgressData(updatedData);
        setloaderforProgressbar(false)
        setloadingForBars(false)
        setLoadingForDonut(false);
        // localStorage.removeItem('areaPayload')
      }
    } catch (error) {
      setprogressBarCheck(true);
      setLoadingForDonut(false);
      errorToast('error while fetching progress bar data')
    }
  }

  function processHeatmapData(heatmapData) {
    // const areas = heatmapData.areas;
    // const areaOwner = heatmapData.areaOwner;
    // const subAreas = heatmapData.subAreas;
    const data = heatmapData.data;

    let maxAlerts = 0;
    let module = '';
    let cameraIndex = -1;
    let cameraID;


    // Find the module with maximum alerts
    data.forEach((moduleData) => {
      moduleData.data.forEach((alerts, index) => {
        if (alerts > maxAlerts) {
          maxAlerts = alerts;
          module = moduleData.name;
          cameraIndex = index;
          console.log(index)
          cameraID = heatmapData.camera_mapping_id[cameraIndex]
        }
      });
    });

    // Extract the corresponding area, owner, and sub-area
    // const camera = areas[cameraIndex];
    // const owner = areaOwner[cameraIndex];
    // const subArea = subAreas[cameraIndex];

    // return { maxAlerts, module, camera, owner, subArea, };
    return { maxAlerts, module, cameraID };
  }
  const fetchAreaHeatmap = async () => {
    let payload;
    let ids=[];
    if(id){
      const data= JSON.parse(localStorage.getItem('areaPayload'));
      ids.push(data.id) 
      payload={
        areaname:data.name,
        area_ids:ids,
        user_id: data.name =='AO-8'? '99' : 
        data.name =='AO-1'? '102': 
        data.name =='AO-2'?'94':
        data.name =='AO-6'?'90':
        data.name =='AO-7'?'93':
        data.name =='AO-9'?'92':
        data.name =='AO-10'?'95':
        data.name =='AO-13'?'97':
        data.name =='AO-14'?'98':'00'
      }
      console.log(payload,'payload');
    }
    else{
      const userData = JSON.parse(localStorage.getItem('userData'))
      const areaName = userData?.area_ids?.name;
      const areaID = userData?.area_ids?.id;
      const userID = userData?.id;
       payload = {areaname: areaName, area_ids: [areaID], user_id: userID}
    }

    try {
      // const userArea =
      //   JSON.parse(localStorage.getItem("userData")).area_ids.name || false;
      // const areID = id
      // const payload = {
      //   area: areID ? areID : userArea,
      // };

      const res = await AreaService.areaHeatMap(payload);
      // const checkingNullResponse= res?.data.heatmapData?.data.filter(item=>item.data.length>1);
      // const checkingNullResponse= res?.data.heatmapData?.data.filter(item=>item.data.length>1);
      if (res?.data.heatmapData?.camera_mapping_id.length <= 0) {
        setheatmapNullcheck(true);
        // console.log(checkingNullResponse,'null response');
        setloaderforHeatmap(false);
        setloaderforProgressbar(false);
        return
      }

      const highseverity = processHeatmapData(res?.data.heatmapData)
      console.log(highseverity, 'DATA for high severity');

      setAccuracySectionData({
        ...accuracySectionData,
        highSeverityAlerts: {
          cameraid: highseverity.cameraID,
          alerts: highseverity.maxAlerts,
          module: highseverity.module
        }
      })
      setHeatmapData(res?.data.heatmapData);
      setloaderforHeatmap(false)
    } catch (error) {
      errorToast('error while fetching heatmap data');
      console.log(error)
    }
  }
  return (
    <Fragment>
      <br />
      <Container fluid={true}>
        <Row className="d-flex justify-content-between align-items-center mb-4">
          <Col xs="12" lg="5">
            {id
              ?
              <H4>
                <Link to={`${process.env.PUBLIC_URL}/areaanalysis/${JSON.parse(localStorage.getItem('role'))}`}>
                  <button className="btn p-0"><IoIosArrowRoundBack style={{ fontSize: '30px' }} /></button> 
                </Link>
                <span style={{ textDecoration: 'none', color: 'black' }}>Details of {detailsofAreaOwner?.owner} - {id}</span>
              </H4>
              :
              <H4>Hello {localStorageData?.name}! - {localStorageData?.area_ids?.name}</H4>}
            {/* <span className="f-light">Area: AO-6</span> */}
          </Col>
        </Row>
        <Row>
          <Col md={6} xxl={4}>
            <Card style={{ height: "399px" }}>
              {loadingForDonut ? (
                <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
                  <Loader3 />
                </span>
              ) : (
                <>
                  <CardHeader>
                    <Row>
                      <Col xs="9">
                        <h5>Overall Compliance Score</h5>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="position-relative p-0">
                    <div className="">
                      {radialbarcheck ? <p className="text-center pt-5" >Empty response found from backend</p> :
                        <ReactApexChart
                          type="radialBar"
                          height={290}
                          options={recentOrderChart.options}
                          series={recentOrderChart.series}
                        />
                      }
                    </div>
                    <div
                      style={{ width: "100%" }}
                      className="d-flex justify-content-center"
                    >
                      <span
                        style={{
                          width: "80%",
                          position: "absolute",
                          bottom: "15px",
                        }}
                        className="text-center f-light"
                      >
                        Week {getCurrentWeekNumber()} Data
                      </span>
                    </div>
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
          <Col md={6} xxl={4}>
            {progressBarCheck ? <Card style={{ height: '399px' }}>
              <p className="text-center pt-5" >Empty response found from backend</p>
            </Card> :
              <ProgressBars
                week={week}
                progressData={progressData}
                areaOwner={true}
                loadingForBars={loadingForBars}
              />
            }
          </Col>
          {/* <Col
           xs='12 mb-1' sm='12 mb-2' md='12' xxl={4}
            style={{ justifyContent: "center", alignItems: "center", margin: '0', padding: '0 12px', }}
          >
            <Col
              className="d-flex gap-2 gap-md-4 gap-xxl-2"
              xs='12'
              style={{ justifyContent: "center", alignItems: "center", width: '100%', }}
            >
             
              <Card className="anlyticsTopCards mb-2" style={{ padding: "20px 10px", width: '50%' }}>
                <CardBody className={`${cardClass}`}>
                  <h6>AI Accuracy</h6>
             
                  <h4 className="mb-0">
                    {accuracySectionData.aiAccuracy?.trend === "down" ? (
                      <ArrowDown color="red" size={20} />
                    ) : (
                      <ArrowUp color="green" size={20} />
                    )}
                    {accuracySectionData.aiAccuracy?.value}%
                  </h4>
                  <span className="f-light">{accuracySectionData.aiAccuracy?.week}</span>
              
                </CardBody>
              </Card>
              <Card className="anlyticsTopCards mb-2" style={{ padding: "20px 10px", width: '50%' }}>
                <CardBody className={`${cardClass}`}>
                  <h6>Connectivity</h6>
                  <h4 className="mb-0">
                   
                    {accuracySectionData.connectivity?.trend === "up" ? (
                      <ArrowUp color="green" size={20} />
                    ) : (
                      <ArrowDown color="red" size={20} />
                    )}
                    {accuracySectionData.connectivity?.value}%
                  </h4>
                 
                  <span className="f-light">{accuracySectionData.connectivity?.status}</span>
                </CardBody>
              </Card>
            </Col>
            <Card className="anlyticsBottomCard" style={{ marginBottom: 0 }}>
              <CardBody className={`w-100 d-flex justify-content-between p-2 p-md-2 `}>
                <div className="d-flex flex-column w-50 gap-2 " style={{ padding: '20px 10px 20px 10px' }}>
                  <h6>High Severity Alerts</h6>
                  <h4 className="mb-0">
                    <ArrowUp color="green" size={20} />
                    {accuracySectionData.highSeverityAlerts?.alerts}
                  </h4>
                  <span>
                    <span className="f-light ellipsis-text">Module: {accuracySectionData.highSeverityAlerts?.module}</span>
                    <span className="f-light d-block ellipsis-text">Camera: {accuracySectionData.highSeverityAlerts?.camera}</span>
                    <span className="f-light d-block ellipsis-text">Sub Area: DRY Store 1, 2</span>
                  </span>
                </div>
                <div className="d-flex flex-column w-50 gap-2 " style={{ padding: '20px 15px' }}>
                  <h6 >Camera Details <span style={{ visibility: 'hidden' }}>Ale</span></h6>
                  <h4 className="mb-0 d-flex align-items-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                  >Camera 2</h4>
                  <span>

                    <span className="f-light d-block ellipsis-text">ID: ICF-AO6-D2C2-2-2-10-58</span>
                    <span className="f-light d-block ellipsis-text">IP: 192.168.10.58</span>
                  </span>
                </div>

              </CardBody>
            </Card>
          </Col> */}
          <Col
            xs="12"
            sm="mb-4"
            md={12}
            xxl={4}
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: "0",
              padding: "0 12px",
            }}
            className="AiAccuracy-section"
          >
            <Col
              className="AiAccuracy-section-cards d-flex gap-sm-4"
              xs="12"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* {mb-md-4 mb-xxl-2} */}
              <Card
                className="anlyticsTopCards"
                style={{ padding: "20px 10px", width: "50%" }}
              >
                {/* <CardBody className={`${cardClass}`}>
                  <h6>AI Accuracy</h6>
                  <h4 className="mb-0">
                    {accuracySectionData.aiAccuracy?.trend === "down" ? (
                      <ArrowDown color="red" size={20} />
                    ) : (
                      <ArrowUp color="green" size={20} />
                    )}
                    {accuracySectionData.aiAccuracy?.value}%
                  </h4>
                  <span className="f-light">
                    Week {getCurrentWeekNumber()} Data
                  </span>
                </CardBody> */}
                <CardBody className={`${cardClass}`}>
                  <h6 className="ellipsis-text">AI Accuracy</h6>
                  {/* <h4 className="mb-0"> <ArrowDown color="red" size={20} />{85}%</h4> */}
                  {acuuracyLoader ? <><Loader3 /></> : <><h4 className="mb-0">
                    {accuracyPercent === 0 ? "" : accuracyPercent < 80 ? (
                      <ArrowDown color="red" size={20} />
                    ) : (
                      <ArrowUp color="green" size={20} />
                    )}
                    {accuracyPercent === 0 ? 'N/A' : accuracyPercent+'%'}
                  </h4>
                    <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span></>}
                  {/* <span className="f-light">Week 42 Data</span> */}
                </CardBody>

              </Card>
              <Card
                className="anlyticsTopCards"
                style={{ padding: "20px 10px", width: "50%" }}
              >
                {/* <CardBody className={`${cardClass}`}>
                  <h6>Connectivity</h6>
                  <h4 className="mb-0">
                    
                    {accuracySectionData.connectivity?.trend === "up" ? (
                      <ArrowUp color="green" size={20} />
                    ) : (
                      <ArrowDown color="red" size={20} />
                    )}
                    {accuracySectionData.connectivity?.value}%
                  </h4>
                  <span className="f-light">{accuracySectionData.connectivity?.status}</span>
                </CardBody> */}
                <CardBody className={`${cardClass}`}>
                  <h6 className="ellipsis-text">Connectivity</h6>
                  {connectivityLoader ? (
                    <Loader3 />
                  ) : (
                    <>
                      <h4 className="mb-0">
                        {/* <ArrowUp color="green" size={20} />
                  100% */}
                        {connectivityData.connectivity?.trend === "up" ? (
                          <ArrowUp color="green" size={20} />
                        ) : (
                          <ArrowDown color="red" size={20} />
                        )}
                        {connectivityData.connectivity?.value}%
                      </h4>
                      {/* <span className="f-light">All systems operational</span> */}
                      <span className="f-light">
                        {connectivityData.connectivity?.status}
                      </span>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Card className="anlyticsBottomCard">

              <CardBody
                className={`w-100 d-flex justify-content-between p-2 p-md-2 `}
              >
                <div
                  className="d-flex align-self-center flex-column w-50 gap-2"
                  style={{ padding: "20px 10px 20px 10px" }}
                >
                  <h6>High Severity Alerts</h6>
                  {loaderforProgressbar ? <Loader3 /> :
                    <>
                      {heatmapNullcheck ? <>Zero Alerts found</> : <>


                        <h4 className="mb-0">
                          <ArrowUp color="green" size={20} />
                          {accuracySectionData.highSeverityAlerts?.alerts}
                        </h4>
                        <span>
                          <span className="f-light ellipsis-text">
                            Module: {accuracySectionData.highSeverityAlerts?.module}
                          </span>
                          {/* <span className="f-light d-block ellipsis-text">
                      Sub Area: DRY Store 1, 2
                    </span> */}
                        </span>
                      </>}
                    </>
                  }
                </div>
                <div
                  className="d-flex flex-column align-self-center w-50 gap-2"
                  style={{ padding: "20px 15px" }}
                >
                  <h6>
                    Camera Details{" "}
                    <span style={{ visibility: "hidden" }}>Ale</span>
                  </h6>
                  {loaderforHeatmap ? <Loader3 /> : <>
                    {heatmapNullcheck ? <>Zero Alerts found</> : <>

                      <h4
                        className="mb-0 d-flex align-items-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                      >
                        Camera
                      </h4>
                      <span>
                        <span className="f-light d-block ellipsis-text">
                          ID: {accuracySectionData.highSeverityAlerts?.cameraid}
                        </span>
                        {/* <span className="f-light d-block ellipsis-text">
                      IP: 192.168.10.58
                    </span> */}
                      </span>
                    </>}
                  </>}
                </div>
              </CardBody>

            </Card>
          </Col>
        </Row>
        <Row className=" ">
          <Col xs={12} lg={12} md={12} sm={12} xl={12}>
            <Card className="shadow-sm w-100">
              <Card.Header className="text-black">
                <h5 className="mb-0">Area Intensity Heatmap</h5>
              </Card.Header>
              <Card.Body className="p-0 p-md-3 p-lg-4 w-100">
                <div className="table-responsive w-100">
                  <div className="mb-4 w-100">
                    {loaderforHeatmap ? <Loader3 /> :
                      // <ApexInteractiveHeatmap
                      //   heatmapData={heatmapData}
                      //   area={true}
                      //   moduleLength={progressData?.length}
                      // />
                      <>
                        {heatmapNullcheck ? <p className="text-center">Zero Alerts found for heatmap</p> :
                          <AreaHeatmapnew
                            heatmapData={heatmapData}
                            area={true}
                            moduleLength={progressData?.length}
                          />
                        }
                      </>
                    }
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <AlertsTrendChart chartData={chartData} area_ID={id} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AreaDashboard;

////////////////////////////////////previous code ////////////////////////////////////////
// import React from 'react'
// import Production from '../../GlobalDashboard/AreawiseReports/production/Production'

// const Index = () => {
//   return (
//     <>
//      <Production mainTitle={'Hello Aftab!'} type={'area'}/>
//     </>
//   )
// }

// export default Index