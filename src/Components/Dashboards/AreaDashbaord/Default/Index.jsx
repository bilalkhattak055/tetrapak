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
import { ArrowDown, ArrowUp, Camera, Filter } from "react-feather";
import "../../../Screens/GlobalUser/AIModelReports/custom.css";
import {
  AreaOwnerAnlyticsJSON,
  dummyJSON,
  Shifts,
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
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { Input } from "reactstrap";
import { LuBuilding2 } from "react-icons/lu";
import { TiLocationArrowOutline } from "react-icons/ti";
import { GoLocation } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbAlertSquareRounded } from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { formatMonth, formatWeek } from "../../../../utils/formatDate";
import LiveAnalyticsContext from '../../../../_helper/formData/LiveAnalytics/LiveAnalytics'

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
  const [detailsofAreaOwner, setdetailsofAreaOwner] = useState();
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)

  const [highseverityCardData, sethighseverityCardData] = useState({
    max_alerts: '',
    highSeverity: ''
  })
  const [highseverityCardLoader, sethighseverityCardLoader] = useState(true);
  const { overAllComplaince,
    setOverAllComplaince,
    progressContext,
    setProgressContext,
    aiAccuracyContext,
    setAiAccuracyContext,
    cameraCountContext,
    setCameraCountContext,
    highestAlerts,
    setHighestAlerts,
    highSeverityContext,
    sethighSeverityContext,
   heatmapcontext,
  alerttrendcontext,
    setheatdatacontext, 
    
    setdashfiltercontext
} = useContext(LiveAnalyticsContext)

  const [focusClass, setFocusClass] = useState('')
  const handleMouseEnter = (e) => {
    setTooltipPosition({ top: e.clientY, left: e.clientX });
    setShowTooltip(true);
  };
  const [filters, setFilters] = useState({
    weekly: getCurrentWeekWithYear(),
    month: '',
    shift: ''
  })

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

    ai_accuracy();
    fetchProgressBarOfArea();
    getHighSeverityCardData()
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

      setChartData({
        categories: parsedData.alertsTrendChart.categories,
        series: parsedData.alertsTrendChart.series,
      });


    };
    parseJSONData();
    const areaID = JSON.parse(localStorage.getItem('areaPayload'))?.id || JSON.parse(localStorage.getItem("userData"))?.area_ids?.id;
    setConnectivityLoader(true);
    CameraService.getCameraCountsArea(areaID).then((res) => {
      const data = res?.data?.data
      setConnectivityData(data);
      setCameraCountContext(data)
      setConnectivityLoader(false);
    }).catch((e) => {
      setConnectivityLoader(false);
      console.log(e);
    });
  }, [filters]);
  const getHighSeverityCardData = async () => {
      sethighseverityCardLoader(true)
    try {
      const payload = {
        area: id ? id : JSON.parse(localStorage.getItem('userData'))?.area_ids.name,
        factory_id: factoryID,
        ...filters
      }
      const res = await AreaService.highseverityAlerts(payload);
      if (res.status == 200) {
        console.log(res.data, 'current high severity card')
        sethighseverityCardData({
          max_alerts: res?.data?.highest_alert_card,
          highSeverity: res?.data?.highest_severity_alert_card
        });
        setHighestAlerts({
          max_alerts: res?.data?.highest_alert_card,
          highSeverity: res?.data?.highest_severity_alert_card
        })
        sethighseverityCardLoader(false)
      }
    } catch (error) {
      errorToast('Error while fetching high severity alert data')
    }
  }



  async function ai_accuracy() {
    setAccuracyLoader(true)
    const pID = JSON.parse(localStorage.getItem('userData'))?.id
    const areaID = JSON.parse(localStorage.getItem('userData'))?.area_ids?.name

    const payload = {

      user_id: pID,
      factory_id: factoryID,
      identifier: filters.weekly ? "week" : 'month',
      filters: {
        approval: "Select Approval",
        module: "",
        severity: "",
        shift: filters.shift,
        date: "",
        week: filters.weekly,
        month: filters.month,
        starting: "",
        ending: "",
        area: id ? id : areaID,
        subarea: ""
      },
      pagination: {
        page_no: 1,
        per_page: 21
      }
    }


    try {
      // const res = await AreaService.getModelAccuracyChart(payload);
      const res = await AreaService.getFilterAlerts(payload)
      if (res?.statusText?.toLocaleLowerCase() == 'ok') {
        console.log('resssnnn', res)


        const accepted = res?.data?.data?.accepted_records
        const rejected = res?.data?.data?.rejected_records
        const percentage_new = (accepted / (accepted + rejected)) * 100

        setAccuracyPercent(Math.round(percentage_new));
        setAiAccuracyContext(Math.round(percentage_new))

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



  const fetchProgressBarOfArea = async () => {
    setloaderforProgressbar(true)
    setloadingForBars(true)
    setLoadingForDonut(true);
    let payload;
    let ids = [];
    if (id) {
      const data = JSON.parse(localStorage.getItem('areaPayload'));
      ids.push(data.id);
      setdetailsofAreaOwner(data)
      payload = {
        ...filters,
        areaname: data.name,
        factory_id: factoryID,
        area_ids: ids,
        user_id: data.area_owner_id 
      }
    }
    else {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const areaName = userData?.area_ids?.name;
      const areaID = userData?.area_ids?.id;
      const userID = userData?.id;

      payload = { ...filters, areaname: areaName, area_ids: [areaID], user_id: userID, factory_id: factoryID, }
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
        // const totalNumber = [Math.round(res?.data?.overall_compliance)];
        setRecentOrderChart((recentOrderChart) => ({
          ...recentOrderChart,
          series: [Math.round(averageBarValue).toFixed(0)],  // Update series with parsed data
        }));
        setOverAllComplaince(Math.round(averageBarValue).toFixed(0))

        const updatedData = res?.data?.progressData.map(item => ({
          ...item,
          tooltipContent: [
            { label: 'Max alerts by', value: `${item.area_with_max_alerts} (${item.area_owner})` },
            { label: 'Sub Area', value: `${item.subarea_with_max_alerts}` },
            { label: 'Alerts', value: `${item.max_alerts}` },
          ]
        }));
        setProgressData(updatedData);
        setProgressContext(updatedData)
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

  const hasActiveFilter = (fil) => {
    console.log('Filters:', fil);
    const { weekly, month } = fil;
    return weekly !== '' || month !== '';
  }

  useEffect(() => {

    fetchAreaHeatmap()
    console.log('calling heatmapper')
  }, [filters])


  const fetchAreaHeatmap = async () => {
    setloaderforHeatmap(true)
    const activeFilters = hasActiveFilter(filters);
    if (!activeFilters) {
      errorToast('Weekly filter applied.')
      setFilters({
        ...filters,
        weekly: getCurrentWeekWithYear()
      })
    }
    const updatedFilters = {
      ...filters,
      weekly: activeFilters ? filters.weekly : getCurrentWeekWithYear(),
    };
    let payload;

    if (id) {
      const data = JSON.parse(localStorage.getItem('areaPayload'));
      console.log(data,'curent idd from area heatmap')
      let ids = data.id
      payload = {
        ...updatedFilters,
        areaname: data.name,
        factory_id: factoryID,
        area_ids: ids,
        user_id: data.area_owner_id
      }
    }

    else {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const areaName = userData?.area_ids?.name;
      const areaID = userData?.area_ids?.id;
      const userID = userData?.id;
      payload = {
        areaname: areaName,
        area_ids: areaID,
        factory_id: factoryID,
        user_id: userID,
        ...updatedFilters
      }
      //  {areaname: areaName, area_ids: [areaID], user_id: userID}

    }
    setdashfiltercontext((prev)=>({
      ...prev,
      month:payload.month,
      weekly:payload.weekly,
      shift:payload.shift
    }))
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

      setAccuracySectionData({
        ...accuracySectionData,
        highSeverityAlerts: {
          cameraid: highseverity.cameraID,
          alerts: highseverity.maxAlerts,
          module: highseverity.module
        }
      })

      setHeatmapData(res?.data.heatmapData);
      setheatdatacontext(res?.data?.heatmapData)

      setloaderforHeatmap(false)
    } catch (error) {
      errorToast('error while fetching heatmap data');
      console.log(error)
      setloaderforHeatmap(false)
    }
  }


  // //heatmap filters logic
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFilters((prev) => {
      const update = {
        ...prev,
        [field]: value,
      }
      localStorage.setItem('dashfilters', JSON.stringify(update))
      return update
    });

  };
  const handleWeekChange = (e) => {
    const { value } = e.target;
    // setFilters({
    //   ...filters,
    //   month: '',
    //   weekly: value,
    // });
    console.log(value, 'vsgsfgvaldfdsfue')
    console.log(getCurrentWeekWithYear(), 'vsgsfgvaldfdsfueb')
    setFilters((prev) => {
      const update = {
        ...prev,
        month: '',
        weekly: !value ? getCurrentWeekWithYear() : value,
      }
      localStorage.setItem('dashfilters', JSON.stringify(update))
      return update
    });

  }
  const handleMonthChange = (e) => {
    const { name, value } = e.target;

    console.log(name, 'name', value, 'vsgsfgvalue')
    // setFilters({
    //   ...filters,
    //   weekly: '',
    //   [name]: value,
    // });
    setFilters((prev) => {
      const update = {
        ...prev,
        weekly: !value ? getCurrentWeekWithYear() : '',
        [name]: value,
      }
      localStorage.setItem('dashfilters', JSON.stringify(update))
      return update
    });

  }


  //filters new code 
  //filters states
  const [showFilters, setShowFilters] = useState(false)
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterCardRef.current &&
        filterButton.current &&
        !filterCardRef.current.contains(event.target) &&
        !filterButton.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    }

    // Add event listener to detect clicks outside of the element
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const renderFilters = () => {
    const transformFilterValue = (value, key) => {
      if (key === 'month') {
        return formatMonth(value);
      }
      if (key === 'weekly') {
        return formatWeek(value);
      }
      return value;
    };

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => ['shift', 'month', 'weekly'].includes(key) && Boolean(value))
      .map(([key, value]) => transformFilterValue(value, key));

    return activeFilters.length >= 2
      ? `${activeFilters[0]} and ${activeFilters[1]}`
      : activeFilters.length === 1
        ? activeFilters[0]
        : "";
  };


  const filterButtonstyle = { width: "155px", height: "38px", fontSize: 13, margin: "0" };
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
              <span>{renderFilters() ? renderFilters() : 'Year 2025'}</span>
          </Col>
          <Col lg='6'
            className=" d-flex flex-row flex-md-row flex-column mt-2 mt-sm-0 flex-wrap justify-content-end align-items-end filter-container align-self-end">
            <div type='button' className={`d-flex justify-content-center filter-btnn  ${showFilters && 'border_R'}`}
              ref={filterButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              <p
                className="m-0"
                style={{ fontSize: "16px", }}
              >
                Filters
              </p>
              <span className="d-flex"><Filter color="#fff" size={16} className="ms-2 " /></span>
            </div>
            <div className="w-100 d-flex justify-content-end position-relative">
              {showFilters && <div className={`d-flex align-items-center justify-content-center py-3 gap-2 filter-card flex-wrap shadow-sm`}
                ref={filterCardRef}
              >
                <CommonFIlterButton
                  data={Shifts}
                  handleInputChange={handleInputChange}
                  style={filterButtonstyle}
                  selectedItem={filters?.shift}
                  firstOption={"Select Shift"}
                  inputChangeOption={"shift"}
                  clName={` ${filters?.shift && focusClass} filter-button-size`}
                />
                <div className="d-flex rounded-3 position-relative flex-column justify-content-center gap-2 flex-md-row flex-wrap">
                  {!filters?.weekly && (
                    <span
                      className="filters-weekly-span"
                    >
                      Select Week
                    </span>
                  )}
                  <Input
                    className={`filter-button-size margin-for-weekly input-border-class-weekly m-0
                          //  ${(filters.weekly && focusClass) ? focusClass : ''}`
                    }
                    type="week"
                    name="week"
                    id="week"
                    max={getCurrentWeekWithYear()}
                    value={filters.weekly || ''}
                    placeholder="Select Week"
                    style={{ ...filterButtonstyle }}  // Remove right border-radius for the first button
                    onChange={handleWeekChange}
                  />
                  {!filters.month && (
                    <span className="filter-month-span">
                      Select Month
                    </span>
                  )}
                  <Input
                    className={`filter-button-size input-border-class-month m-0 ${(filters.month && focusClass) ? focusClass : ''}`}
                    type="month"
                    name="month"
                    id="month"
                    max={new Date().toISOString().slice(0, 7)}
                    value={filters.month || ''}
                    style={{ ...filterButtonstyle }}
                    onChange={handleMonthChange}
                  />
                </div>
              </div>}
            </div>



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
                    {/* <div
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
                    </div> */}
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

                <CardBody className={`${cardClass}`}>
                  {/* <h4 className="mb-0"> <ArrowDown color="red" size={20} />{85}%</h4> */}
                  {acuuracyLoader ? <><Loader3 /></> : <>
                    <h6 className="ellipsis-text">AI Accuracy</h6>
                    <h4 className="mb-0">
                      {!accuracyPercent ? "" : accuracyPercent === 'NaN' ? "" : accuracyPercent < 80 ? (
                        <ArrowDown color="red" size={20} />
                      ) : (
                        <ArrowUp color="green" size={20} />
                      )}
                      {accuracyPercent === 'NaN' ? "N/A" : !accuracyPercent ? 'N/A' : accuracyPercent + '%'}
                    </h4>
                    {/* <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span> */}
                    </>}
                  {/* <span className="f-light">Week 42 Data</span> */}
                </CardBody>

              </Card>
              <Card
                className="anlyticsTopCards"
                style={{ padding: "20px 10px", width: "50%" }}
              >
                <CardBody className={`${cardClass}`}>
                  {/* <h6 className="ellipsis-text">Connectivity</h6> */}
                  {connectivityLoader ? <Loader3 /> : <>
                    <h6 className="ellipsis-text ">Cameras Count</h6>
                    <p className="ellipsis-text mb-0 d-flex">
                      <span className="f-light "><FaCamera size={22} className="me-3" /></span>
                      <h5>{Number.isInteger(connectivityData?.active_cameras) ? connectivityData.active_cameras : 'N/A'} / {Number.isInteger(connectivityData?.total_cameras) ? connectivityData.total_cameras : 'N/A'}</h5>
                    </p>
                    {/* <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span> */}

                  </>}
                </CardBody>
              </Card>

            </Col>
            <Row>
              <Col sm='6' xs='12'>
                <Card className="anlyticsBottomCard">
                  <CardBody>
                    {highseverityCardLoader ? <div className="w-100 h-100 d-flex justify-content-center align-items-center"><Loader3 /></div> :
                      <>
                        <h6 className="ellipsis-text  py-2"> Highest Alerts</h6>
                        {highseverityCardData?.max_alerts !== null  ?
                          <ul  >
                            <li >
                              <p className="f-light ellipsis-text mb-1"> <span><TbAlertSquareRounded className='me-1' /></span> Alerts: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>{highseverityCardData?.max_alerts?.alert_count || 'N/A'}</span></p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                <span><LuBuilding2 className="me-1" /></span>
                                Module: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>
                                
                                  {highseverityCardData?.max_alerts &&
                                    (highseverityCardData?.max_alerts?.object === 'forklift_person_in_same_aisle' ? 'MMHE' :
                                      highseverityCardData?.max_alerts?.object === 'emergency_exit_blockage' ? 'E.Exit' :
                                      highseverityCardData?.max_alerts?.object === 'Emergency Exit' ? 'E.Exit' : highseverityCardData.max_alerts.object || 'N/A')
                                  }
                                </span>
                              </p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><TiLocationArrowOutline className="me-1" /></span> {highseverityCardData?.max_alerts?.area}, {highseverityCardData?.max_alerts?.area_owner || 'N/A'}</p>

                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1"><span><MdAccessTime className="me-1" /></span> {"Shift " + highseverityCardData?.max_alerts?.shift_name || 'N/A'} </p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"> <span><FaCamera className="me-1" /></span> {highseverityCardData?.max_alerts?.camera_id || 'N/A'}</p>

                            </li>
                          </ul> :
                          <p className="f-light text-center py-3"> Zero Alerts</p>
                        }

                      </>}
                  </CardBody>
                </Card>
              </Col>

              <Col sm='6' xs='12'>
                <Card className="anlyticsBottomCard">
                  <CardBody>
                    {highseverityCardLoader ? <div className="w-100 h-100 d-flex justify-content-center align-items-center"><Loader3 /></div> :
                      <>
                        <h6 className="ellipsis-text py-2">High Severity Alerts</h6>
                        {highseverityCardData?.highSeverity !== null  
                          ?
                          <ul  >
                            <li >
                              <p className="f-light ellipsis-text mb-1"> <span><TbAlertSquareRounded className='me-1' /></span> Alerts: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>{highseverityCardData?.highSeverity?.alert_count || 'N/A'}</span></p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><LuBuilding2 className="me-1" /></span>Module: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}> {highseverityCardData?.highSeverity?.object == 'forklift_person_in_same_aisle' ? 'MMHE' : highseverityCardData?.highSeverity?.object == 'Emergency Exit' ? 'E.Exit' : highseverityCardData?.highSeverity?.object || 'N/A'}  </span></p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><TiLocationArrowOutline className="me-1" /></span> {highseverityCardData?.highSeverity?.area}, {highseverityCardData?.highSeverity?.area_owner || 'N/A'}</p>

                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1"><span><MdAccessTime className="me-1" /></span> {"Shift " + highseverityCardData?.highSeverity?.shift_name || 'N/A'} </p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"> <span><FaCamera className="me-1" /></span> {highseverityCardData?.highSeverity?.camera_id || 'N/A'}</p>

                            </li>
                          </ul> :
                          <p className="f-light text-center py-3"> Zero Alerts</p>
                        }

                      </>}
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Col>
        </Row>
        <Row className=" ">
          <Col xs={12} lg={12} md={12} sm={12} xl={12}>
            <Card ref={heatmapcontext} className="shadow-sm w-100">
              <Card.Header className="text-black">
                {/* <h5 className="mb-0">Area Intensity Heatmap</h5> */}
                <Row className="">
                  <Col xs="12" sm='7' md='6' className="">
                    <h5 className="mb-0">Area Intensity Heatmap</h5>
                  </Col>

                </Row>
              </Card.Header>
              <Card.Body className="p-0 p-md-3 p-lg-4 w-100">
                <div className="table-responsive w-100">
                  <div className="mb-4 w-100">
                    {loaderforHeatmap ? <Loader3 /> :
                      <>
                        {heatmapNullcheck ? <p className="text-center">Zero Alerts found for heatmap</p> :
                          <AreaHeatmapnew
                            heatmapData={heatmapData}
                            area={true}
                            moduleLength={progressData?.length}
                            filters={filters}
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
            <AlertsTrendChart chartData={chartData} area_ID={id} filters={filters} />
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
