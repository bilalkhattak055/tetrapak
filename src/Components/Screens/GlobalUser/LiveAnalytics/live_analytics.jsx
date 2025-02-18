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
import Loader3 from "../../../../CommonElements/Spinner/loader3";
import { RecentOrderChart } from "./analytics_data_temp";
import ReactApexChart from "react-apexcharts";
import { ArrowDown, ArrowUp, Filter } from "react-feather";
import "../AIModelReports/custom.css";
import { errorToast, getWeek, infoToast, showConfirmationAlert, successToast } from "../../../../_helper/helper";
import { dummyJSON, Shifts } from "../../../../Data/staticData/data";
import ApexInteractiveHeatmap from "./components/HeatMap";
import ProgressBars from "./components/ProgressBars";
import AlertsTrendChart from "./components/AlertsTrendChart";
import AreaService from "../../../../api/areaService";
import { getCurrentWeekNumber } from "../../../../utils/getCurrentWeekNumber";
import CameraService from "../../../../api/cameraService";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import { analyticsPageService } from "../../../../api/analyticsPageService";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { Input } from "reactstrap";
import "./components/alertTrend.css";
import { LuBuilding2 } from "react-icons/lu";
import { TiLocationArrowOutline } from "react-icons/ti";
import { GoLocation } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbAlertSquareRounded } from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { formatMonth, formatWeek } from "../../../../utils/formatDate";
import LiveAnalyticsContext from "../../../../_helper/formData/LiveAnalytics/LiveAnalytics";
import NewCommonFIlterButton from "../../../Common/commonFilterButton/NewCommonFIlterButton";
import FactoryService from "../../../../api/factoryService";

const LiveAnalyticsScreen = ({FactoryID,GlobalSummaryFlag,GlobalHeading,GlobalSubHeading}) => {
  const [loadingForDonut, setLoadingForDonut] = useState(true)
  const [loadingForBars, setLoadingForBars] = useState(false)
  const [heatmapLoader, setHeatmapLoader] = useState(false)
  const [connectivityLoader, setConnectivityLoader] = useState(true)
  const [acuuracyLoader, setAccuracyLoader] = useState(true)
  const [accuracyPercent, setAccuracyPercent] = useState();
  const [week, setWeek] = useState(null)
  const [accuracySectionData, setAccuracySectionData] = useState({
    aiAccuracy: undefined,
    connectivity: undefined,
    highSeverityAlerts: undefined,
    maxAlerts: undefined,
  });
  const {
    overAllComplaince,
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



  const [HeatmapLoaderForConnect, setHeatmapLoaderForConnect] = useState(true);
  const [focusClass, setFocusClass] = useState("");
  const [correctPercent, setCorrectPercent] = useState();
  const [severityAlertsData, setSevirityAlertsData] = useState();
  const [severityLoader, setSevirityLoader] = useState(true);
  const [recentOrderChart, setRecentOrderChart] = useState(RecentOrderChart);
  const [DonutSeries, setDonutSeries] = useState();
  const [extractedData, setExtractedData] = useState({
    maxAlerts: 0,
    module: "",
    camera: "",
    owner: "",
    subArea: "",
  });
  const [heatmapData, setHeatmapData] = useState({
    areas: [],
    subAreas: [],
    areaOwner: [],
    data: [],
  });
  const [selectedFactory, setSelectedFactory] = useState("");
  const [factoryList, setFactoryList] = useState([]);
  const [progressData, setProgressData] = useState(undefined);
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});

  //heatmap filter states
  const [filters, setFilters] = useState({
    weekly: getCurrentWeekWithYear(),
    month: "",
    shift: "",
  });

  const [highseverityCardData, sethighseverityCardData] = useState({
    max_alerts: '',
    highSeverity: ''
  })
  const [highseverityCardLoader, sethighseverityCardLoader] = useState(true)
  const [factoryID, setfactoryID] = useState(FactoryID? FactoryID : JSON.parse(localStorage.getItem('userData')).factory.id || 0)

  const initialSync = useRef(false);
  const initialLoad = useRef(true); // Track initial load separately

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("userData"))?.id || "";
    setUserData(JSON.parse(localStorage.getItem('userData')))
    let fils = JSON.parse(localStorage.getItem("dashfilters"));

    if (!fils) {
      localStorage.setItem("dashfilters", JSON.stringify(filters));
      fils = JSON.parse(localStorage.getItem("dashfilters"));
    } else {
      setFilters(fils);
    }

    // Trigger the API call immediately on the first load
    let payload = {
      ...fils,
      user_id: userID,
      factory_id: factoryID,
    };

    if (!initialSync.current) {
      fetchHeatmapData(payload);
    }
    initialSync.current = true;
  }, []);

  useEffect(() => {
    // fetchSevirityData()
    // fetchFactories();
    setHeatmapLoader(true);
    fetchAnalyticsBars();
    // fetchAnlyticsData()
    // fetchHeatmapDataForConnetivity()
    modelAccuracy();
    getHighSeverityCardData();

    const parseJSONData = () => {
      const parsedData = JSON.parse(dummyJSON); // Parse the JSON
      const newSeries = parsedData.complianceData.series; // Extract the series data

      //top right section data
      setAccuracySectionData((prevState) => ({
        ...prevState,
        aiAccuracy: parsedData?.aiAccuracy,
        highSeverityAlerts: parsedData?.highSeverityAlerts,
        maxAlerts: parsedData?.maxAlerts,
      }));

      //progress bars
      setWeek(parsedData.week);
      const corrPer = setCorrectPercent();
      // setProgressData(parsedData?.progressData);

      //heatmap
      // setHeatmapData(parsedData.heatmapData);

      // Set dynamic categories and series for chart
      setChartData({
        categories: parsedData.alertsTrendChart.categories,
        series: parsedData.alertsTrendChart.series,
      });
    };
    parseJSONData();
    // return () => unsubscribe;
  }, [filters]);

  

  const getHighSeverityCardData = async () => {
    sethighseverityCardLoader(true);
    const fils = JSON.parse(localStorage.getItem("dashfilters"));
    try {
      const payload = {
        area: "",
        factory_id: factoryID,
        ...fils,
      };
      const res = await AreaService.highseverityAlerts(payload);
      if (res.status == 200) {
        console.log(res.data, "current high severity card");
        sethighseverityCardData({
          max_alerts: res?.data?.highest_alert_card,
          highSeverity: res?.data?.highest_severity_alert_card,
        });
        setHighestAlerts({
          max_alerts: res?.data?.highest_alert_card,
          highSeverity: res?.data?.highest_severity_alert_card,
        });
        sethighseverityCardLoader(false);
      }
    } catch (error) {
      errorToast("Error while fetching high severity alert data");
    }
  };
  // useEffect(() => {
  //   setLoader(true)
  //   CameraService.getAllLiveCameras()
  //     .then((res) => {
  //       const response = res?.data?.data;
  //       console.log('responsess', response)
  //       const conn_percentage =
  //         response?.length > 0
  //           ? Math.round(
  //             (response?.filter((i) => i?.active === true)?.length /
  //               response?.length) *
  //             100
  //           ).toFixed(0)
  //           : 0;

  //       setAccuracySectionData(prevState => ({
  //         ...prevState,
  //         connectivity: {
  //           value: conn_percentage,
  //           trend: conn_percentage > 50 ? "up" : "down",
  //           status: conn_percentage > 0 ? "All Systems operational" : "Systems are down"
  //         }
  //       }));
  //       setLoader(false)
  //     })
  //     .catch((e) => {
  //       setLoader(false)
  //       console.log(e);
  //     });
  // }, []);

  // const tooltipContent = [
  //   { label: 'Max alerts by', value: 'AO-1 ( Adil )' },
  //   { label: 'Sub Area', value: 'Palletizing corridor' },
  //   { label: 'Alerts', value: '10' }
  // ]

  //api calls
  async function fetchAnalyticsBars() {
    setLoadingForBars(true);
    setLoadingForDonut(true);
    const userID = JSON.parse(localStorage.getItem("userData"))?.id;
    const fils = JSON.parse(localStorage.getItem("dashfilters"));

    try {
      const payload = {
        ...fils,
        areaname: "",
        area_ids: [],
        user_id: userID,
        factory_id: factoryID,
      };
      const res = await AreaService.fetchAnalyticsProgressGbl(payload);
      console.log("resresres", res);
      console.log(res?.data, "progressss barr for factoryy");
      if (res.status == 200) {
        const validBarValues = res?.data?.progressData.filter(
          (item) => item.barValue > 0
        );
        const totalBarValue = validBarValues.reduce(
          (sum, item) => sum + item.barValue,
          0
        );
        const averageBarValue =
          validBarValues.length > 0 ? totalBarValue / validBarValues.length : 0;
        console.log("Average Bar Value:", averageBarValue);

        // Store the average in an array
        // const totalNumber = [Math.round(res?.data?.overall_compliance)];
        setRecentOrderChart((recentOrderChart) => ({
          ...recentOrderChart,
          series: [Math.round(averageBarValue).toFixed(0)], // Update series with parsed data
        }));

        setOverAllComplaince(Math.round(averageBarValue).toFixed(0));

        const updatedData = res?.data?.progressData.map((item) => ({
          ...item,
          tooltipContent: [
            {
              label: "Max alerts by",
              value: `${
                item.area_with_max_alerts ? item.area_with_max_alerts : "N/A"
              } ${item.area_owner ? `(${item.area_owner})` : ""} `,
            },
            { label: "Sub Area", value: `${item.subarea_with_max_alerts}` },
            { label: "Max Alerts", value: `${item.max_alerts}` },
            { label: "Total Alerts", value: `${item.alerts}` },
          ],
        }));

        setProgressData(updatedData);
        setProgressContext(updatedData);
      }
      setLoadingForBars(false);
      setLoadingForDonut(false);
    } catch (err) {
      console.log("Analytics page, Progress bars section error", err);
      setLoadingForBars(false);
      setLoadingForDonut(false);
    }
  }
  // async function fetchAnlyticsData() {
  //   // let payload;
  //   // if()

  //   const payload = {
  //     area: ''
  //   }
  //   try {
  //     const res = await AreaService.fetchAnalyticsPercentGbl(payload)
  //     if (res.status == 200) {
  //       // Update the chart state with the new series data
  //       setRecentOrderChart((recentOrderChart) => ({
  //         ...recentOrderChart,
  //         series: res?.data?.complianceData?.series,  // Update series with parsed data
  //       }));
  //     }
  //     setLoadingForDonut(false)
  //   } catch (err) {
  //     console.log("Analytics page, Donut chart error", err)
  //     setLoadingForDonut(false)
  //   }

  // }
  async function fetchSevirityData() {
    try {
      const payload = {
        factory_id: factoryID,
      };
      console.log(factoryID, "factory id");
      const res = await analyticsPageService.highSevrityF(payload);
      if (res.status == 200) {
        console.log("res?.dataa", res?.data);
        setSevirityAlertsData(res?.data);
      }
      setSevirityLoader(false);
    } catch (err) {
      setSevirityLoader(false);
      console.log("High sevirity data Error", err);
    }
  }
  function processHeatmapData(heatmapData) {
    const areas = heatmapData.areas;
    const areaOwner = heatmapData.areaOwner;
    const subAreas = heatmapData.subAreas;
    const data = heatmapData.data;

    let maxAlerts = 0;
    let module = "";
    let cameraIndex = -1;

    // Find the module with maximum alerts
    data.forEach((moduleData) => {
      moduleData.data.forEach((alerts, index) => {
        if (alerts > maxAlerts) {
          maxAlerts = alerts;
          module = moduleData.name;
          cameraIndex = index;
        }
      });
    });

    // Extract the corresponding area, owner, and sub-area
    const camera = areas[cameraIndex];
    const owner = areaOwner[cameraIndex];
    const subArea = subAreas[cameraIndex];

    return { maxAlerts, module, camera, owner, subArea };
  }
  const hasActiveFilter = (fil) => {
    console.log("Filters:", fil);
    const { weekly, month } = fil;
    return weekly !== "" || month !== "";
  };
  useEffect(() => {
    if (initialSync.current && !initialLoad.current) {
      setHeatmapLoader(true);
      const userID = JSON.parse(localStorage.getItem("userData"))?.id || "";
      const fils = JSON.parse(localStorage.getItem("dashfilters"));

      let payload;
      if (!hasActiveFilter(filters)) {
        payload = {
          ...fils,
          user_id: userID,
          factory_id: factoryID,
        };
        errorToast("Current week filter applied.");
        const filters = JSON.parse(localStorage.getItem("dashfilters")) || {};
        filters.weekly = getCurrentWeekWithYear();
        localStorage.setItem("dashfilters", JSON.stringify(filters));

        // setFilters((prev) => ({
        //   ...prev,
        //   weekly: getCurrentWeekWithYear()
        // }))
        setFilters((prev) => ({
          ...prev,
          weekly: getCurrentWeekWithYear(),
        }));
      } else {
        payload = {
          ...fils,
          user_id: userID,
          factory_id: factoryID,
        };
      }
      fetchHeatmapData(payload);
    }
    initialLoad.current = false; // Allow future updates to trigger API calls
  }, [filters]);

  async function fetchHeatmapData(payload) {
    try {
      setdashfiltercontext((prev)=>({
        ...prev,
        month:payload.month,
        weekly:payload.weekly,
        shift:payload.shift
      }))
      const res = await AreaService.fetchAnalyticsHeatmapGbl(payload)
      if (res.status == 200) {
        setHeatmapData(res?.data?.heatmapData);
        setheatdatacontext(res?.data?.heatmapData)
       
      }
      setHeatmapLoader(false);
    } catch (err) {
      console.log("Analytics page, Heatmap chart error", err);
      setHeatmapLoader(false);
    }
  }

  async function fetchHeatmapDataForConnetivity() {
    const userID = JSON.parse(localStorage.getItem("userData"))?.id || "";
    const payload = {
      weekly: getCurrentWeekWithYear(),
      month: "",
      shift: "",
      user_id: userID,
      factory_id: factoryID,
    };
    try {
      // const res = await AreaService.fetchAnalyticsHeatmapGbl(payload)
      // if (res.status == 200) {
      //   setHeatmapData(res?.data?.heatmapData);
      // }
      // const extractedData = processHeatmapData(res?.data?.heatmapData);
      // setExtractedData(extractedData);

      setHeatmapLoaderForConnect(false);
    } catch (err) {
      console.log("Analytics page, Heatmap chart error", err);
      setHeatmapLoaderForConnect(false);
    }
  }
  // async function fetchConnectivity() {
  //   try {
  //     const res = await AreaService.fetchCameraConnectivity(41) //insert user id when users avaialble
  //     const newRes = res?.data?.data;
  //     const conn_percentage = Math.round((newRes?.active_cameras / newRes?.total_cameras) * 100).toFixed(0) || 0
  //     setAccuracySectionData(prevState => ({
  //       ...prevState,
  //       connectivity: {
  //         value: conn_percentage,
  //         trend: conn_percentage > 50 ? "up" : "down",
  //         status: conn_percentage > 0 ? "All Systems operational" : "Systems are down"
  //       }
  //     }));
  //     setConnectivityLoader(false)
  //   } catch (err) {
  //     setConnectivityLoader(false)
  //     console.log('Camera connectivity error', err)
  //   }
  // }
  const [connectivityFactoryLoader, setconnectivityFactoryLoader] =
    useState(true);
  const [factoryCamerasCount, setfactoryCamerasCount] = useState();
  const getfactorycamerascount = async () => {
    setconnectivityFactoryLoader(true);
    try {
      const res = await CameraService.factoryCameras(factoryID);
      if (res) {
        setfactoryCamerasCount(res.data.data);
        setCameraCountContext(res?.data?.data);
        setconnectivityFactoryLoader(false);
      }
    } catch (error) {
      console.log(error);
      errorToast("Error while fetching factory cameras");
    }
  };
  useEffect(() => {
    setLoader(true);

    getfactorycamerascount();
    CameraService.getAllLiveCameras()
      .then((res) => {
        const response = res?.data?.data;
        const conn_percentage =
          response?.length > 0
            ? Math.round(
                (response?.filter((i) => i?.active === true)?.length /
                  response?.length) *
                  100
              ).toFixed(0)
            : 0;

        setAccuracySectionData((prevState) => ({
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
  }, [filters]);

  // async function modelAccuracy() {
  //   const payload = {
  //     week: getCurrentWeekWithYear(),
  //   };
  //   try {
  //     const res = await AreaService.getModelAccuracyChart(payload);
  //     if (res?.statusText?.toLocaleLowerCase() == 'ok') {
  //       const models = res?.data?.totalAlertsChart;
  //       console.log("res?.datares?.data", res?.data)
  //       console.log(models, 'modelssss')
  //       const totalValue = models.reduce((sum, model) => sum + model.value, 0);
  //       // Calculate the average percentage
  //       const averagePercentage = (totalValue / models.length).toFixed(0) || 0;
  //       setAccuracyPercent(averagePercentage)
  //     }
  //     setAccuracyLoader(false)
  //   } catch (err) {
  //     console.log('Ai accuracy error'.err)
  //     setAccuracyLoader(false)
  //   }
  // }
  async function modelAccuracy() {
    setAccuracyLoader(true);
    const pID = JSON.parse(localStorage.getItem("userData"))?.id;
    const fils = JSON.parse(localStorage.getItem("dashfilters"));

    const payload = {
      user_id: pID,
      identifier: fils.weekly ? "week" : "month",
      factory_id: factoryID,
      filters: {
        approval: "Select Approval",
        module: "",
        severity: "",
        shift: fils.shift,
        date: "",
        week: fils.weekly,
        month: fils.month,
        starting: "",
        ending: "",
        area: "",
        subarea: "",
      },
      pagination: {
        page_no: 1,
        per_page: 21,
      },
    };

    try {
      // const res = await AreaService.getModelAccuracyChart(payload);
      const res = await AreaService.getFilterAlerts(payload);
      if (res?.statusText?.toLocaleLowerCase() == "ok") {
        console.log("resssnnn", res);
        // const models = res?.data?.totalAlertsChart;
        // console.log("res?.data", res?.data);
        // console.log(models, 'models');

        //// Filter out models with value equal to zero
        // const filteredModels = models.filter(model => model.value > 0);

        //// Calculate the sum of the filtered values
        // const totalValue = filteredModels.reduce((sum, model) => sum + model.value, 0);

        //// Calculate the average percentage (only use non-zero values)
        // const averagePercentage = filteredModels.length > 0
        //   ? ((totalValue / (filteredModels.length * 100)) * 100).toFixed(0)
        //   : 0;

        // const averagePercentage = filteredModels.length > 0
        //   ? ((totalValue / (filteredModels.length * 100)) * 100).toFixed(0)
        //   : 0;

        const accepted = res?.data?.data?.accepted_records;
        const rejected = res?.data?.data?.rejected_records;
        const percentage_new = (accepted / (accepted + rejected)) * 100;

        setAccuracyPercent(Math.round(percentage_new));
        setAiAccuracyContext(Math.round(percentage_new));
      }
      setAccuracyLoader(false);
    } catch (err) {
      console.log("Ai accuracy error", err);
      setAccuracyLoader(false);
    }
  }

  //heatmap filters logic
  const handleInputChange = (e, field) => {
    const { value } = e.target;

    setFilters((prev) => {
      const update = {
        ...prev,
        [field]: value,
      };

      localStorage.setItem("dashfilters", JSON.stringify(update));
      return update;
    });
  };
  const handleWeekChange = (e) => {
    const { value } = e.target;

    // setFilters({
    //   ...filters,
    //   month: '',
    //   weekly: value,
    // });

    setFilters((prev) => {
      const update = {
        ...prev,
        month: "",
        weekly: !value ? getCurrentWeekWithYear() : value,
      };

      localStorage.setItem("dashfilters", JSON.stringify(update));
      return update;
    });
  };
  const handleMonthChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, 'name', value, 'value')
    // setFilters({
    //   ...filters,
    //   weekly: '',
    //   [name]: value,
    // });

    setFilters((prev) => {
      const update = {
        ...prev,
        weekly: !value ? getCurrentWeekWithYear() : "",
        [name]: value,
      };

      localStorage.setItem("dashfilters", JSON.stringify(update));
      return update;
    });
  };

  //filters new code
  //filters states
  const [showFilters, setShowFilters] = useState(false);
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
      if (key === "month") {
        return formatMonth(value);
      }
      if (key === "weekly") {
        return formatWeek(value);
      }
      return value;
    };

    const activeFilters = Object.entries(filters)
      .filter(
        ([key, value]) =>
          ["shift", "month", "weekly"].includes(key) && Boolean(value)
      )
      .map(([key, value]) => transformFilterValue(value, key));

    return activeFilters.length >= 2
      ? `${activeFilters[0]} and ${activeFilters[1]}`
      : activeFilters.length === 1
      ? activeFilters[0]
      : "";
  };

  const cardClass = `d-flex flex-column mb-0 gap-2 p-2 p-md-2 justify-content-center`;
  const filterButtonstyle = {
    width: "155px",
    height: "38px",
    fontSize: 13,
    margin: "0",
  };

  const style = {
    width: "160px",
    height: "38px",
    fontSize: 13,
    margin: "5px 3px",
    display: "inline-block",
  };
  // factory change dropdown --------------x---------------------------x-------------
  // const fetchFactories = () => {
  //   FactoryService.getAllFactories()
  //     .then((res) => {
  //       setFactoryList(res.data?.data);
  //       const user = JSON.parse(localStorage.getItem("userData"));
  //       setSelectedFactory(user ?user?.factory?.id: 0)
  //     })
  //     .catch((e) => {});
  // };
  // const handleFilterChangeNew = (e) => {
  //   const val=parseInt(e.target.value)
  //   setSelectedFactory(val);
  //   if(val !== 0){
  //   var get_user_data=JSON.parse(localStorage.getItem('userData')) 
  //   showConfirmationAlert("Are you sure you want to change your factory?","Yes")
  //   .then((result) => {
  //     if (result.value) {
  //       const payload = {
  //         user_id: get_user_data?.id,
  //         factory_id: val,
  //       };

  //       FactoryService.updateUserFactory(payload)
  //         .then((res) => {
  //           if (res?.status === 200) {
  //             successToast(res?.data?.message);
  //             get_user_data.factory={ id:res?.data?.data?.factory_id, name:res?.data?.data?.factory_name}
  //             localStorage.setItem('userData',JSON.stringify(get_user_data)) 
  //             window.location.reload();
              
  //           } else {
  //             infoToast(res?.data?.message);
  //           }
  //         })
  //         .catch((err) => {
  //           if (err?.status === 404) {
  //             errorToast(err?.statusText);
  //           } else {
  //             errorToast(err?.response?.data?.message);
  //           }
  //         });
  //     }
  //   })
  //   .catch((error) => {});
  // }

  //   // console.log('e.target.value', e.target.value)
  //   // setFilters((prevFilters) => {
  //   //   const newFilter = {
  //   //     ...prevFilters,
  //   //     [field]: e.target.value,
  //   //   };
  //   //   return newFilter;
  //   // });
  //   // fetchDropdownOptions(e.target.value.split('-')[1])
  //   // setDropdownOptions((prevOptions) => ({
  //   //   ...prevOptions,
  //   //   area_list: prevOptions.area_list.filter((f) => f.factory_id !== e.target.value.split('-')[1])
  //   // }));
  // };
// factory change dropdown end --------------x---------------------------x-------------
  return (
    <Fragment>
      <br />
      <Container fluid={true}>
        {GlobalSummaryFlag?<> 
        {GlobalHeading?<h4 className="mb-3" style={{fontSize:'24px'}}>Summary</h4>:null}
        </>:
        <Row className="d-flex justify-content-center mb-2 px-1">
          <Col xs="12" sm="7" md="6" className=" pt-1">
            <h5 className="">
             {GlobalSummaryFlag?<span style={{ fontSize: '24px' }}>Summary</span>:null} {renderFilters() ? renderFilters() : 'Year 2025'}
            </h5>
          </Col>
          <Col
            xs="12"
            sm="5"
            md="6"
            className=" d-flex flex-row flex-md-row flex-column mt-2 mt-sm-0 flex-wrap justify-content-end align-items-end filter-container align-self-end"
          >
            {/* <NewCommonFIlterButton
              data={factoryList?.map((f) => f.name + "-" + f.factory_id)}
              handleInputChange={handleFilterChangeNew}
              style={style}
              selectedItem={selectedFactory}
              firstOption={"Select Factory"}
              inputChangeOption={"factory"}
              className={""}
            /> */}

            {/* Factory dropdown */}

          {/* {userData?.id === 129 &&  <Input
              className={`rounded-3`}
              type="select"
              name="factory"
              id="factory"
              style={style}
              value={selectedFactory}
              onChange={handleFilterChangeNew}
            >
              <option value="0">Select Factory</option>
              

              {factoryList &&
                factoryList?.map((item, index) => (
                  <option
                    style={{ width: "80%" }}
                    className="ellipsis-textt"
                    key={index}
                    value={item?.factory_id}
                  >
                    {item?.name}
                  </option>
                ))}
            </Input>} */}

             {/* Factory dropdown end */}
            <div
              type="button"
              className={`d-flex justify-content-center filter-btnn  ${
                showFilters && "border_R"
              }`}
              ref={filterButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              <p className="m-0" style={{ fontSize: "16px" }}>
                Filters
              </p>
              <span className="d-flex">
                <Filter color="#fff" size={16} className="ms-2 " />
              </span>
            </div>
            <div className="w-100 d-flex justify-content-end position-relative">
              {showFilters && (
                <div
                  className={`d-flex align-items-center justify-content-center py-3 gap-2 filter-card flex-wrap shadow-sm`}
                  ref={filterCardRef}
                >
                  <CommonFIlterButton
                    data={Shifts}
                    handleInputChange={handleInputChange}
                    style={filterButtonstyle}
                    selectedItem={filters?.shift}
                    firstOption={"Select Shift"}
                    inputChangeOption={"shift"}
                    clName={` ${
                      filters?.shift && focusClass
                    } filter-button-size`}
                  />
                  <div className="d-flex rounded-3 position-relative flex-column justify-content-center gap-2 flex-md-row flex-wrap">
                    {!filters?.weekly && (
                      <span className="filters-weekly-span">Select Week</span>
                    )}
                    <Input
                      className={`filter-button-size margin-for-weekly input-border-class-weekly m-0
                          //  ${
                            filters.weekly && focusClass ? focusClass : ""
                          }`}
                      type="week"
                      name="week"
                      id="week"
                      max={getCurrentWeekWithYear()}
                      value={filters.weekly || ""}
                      placeholder="Select Week"
                      style={{ ...filterButtonstyle }} // Remove right border-radius for the first button
                      onChange={handleWeekChange}
                    />
                    {!filters.month && (
                      <span className="filter-month-span">Select Month</span>
                    )}
                    <Input
                      className={`filter-button-size input-border-class-month m-0 ${
                        filters.month && focusClass ? focusClass : ""
                      }`}
                      type="month"
                      name="month"
                      id="month"
                      max={new Date().toISOString().slice(0, 7)}
                      value={filters.month || ""}
                      style={{ ...filterButtonstyle }}
                      onChange={handleMonthChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row> 
        }
        {GlobalSummaryFlag?<>
          <Row>
            <p className="f-light" style={{fontSize:'18px',fontWeight:'500'}}> {GlobalSubHeading} </p>
          <Col md={6} xxl={4}>
            <Card style={{ height: "399px" }}>
              { 
                loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                  :
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
                        <ReactApexChart
                          type="radialBar"
                          height={290}
                          options={recentOrderChart.options}
                          series={recentOrderChart.series}
                        />
                      </div>
                      <div
                        style={{ width: "100%" }}
                        className="d-flex justify-content-center"
                      >
                        {/* <span
                          style={{ width: "80%", position: 'absolute', bottom: '15px' }}
                          className="text-center f-light"
                        >
                          Week {getCurrentWeekNumber()} Data
                        </span> */}
                      </div>
                    </CardBody>
                  </>
              }
            </Card>
          </Col>
          <Col md={6} xxl={4}>
            <ProgressBars progressData={progressData}
              week={week} loadingForBars={loadingForBars} filters={filters}
            />

          </Col>
          <Col
            xs='12' sm='mb-4' md={12} xxl={4}
            style={{ justifyContent: "center", alignItems: "center", margin: '0', padding: '0 12px' }}
            className="AiAccuracy-section"
          >
            <Col
              className="AiAccuracy-section-cards d-flex gap-sm-4"
              xs='12'
              style={{ justifyContent: "center", alignItems: "center", width: '100%', }}
            >
              {/* {mb-md-4 mb-xxl-2} */}
              <Card className="anlyticsTopCards" style={{ padding: "20px 10px", width: '50%' }}>
                <CardBody className={`${cardClass}`}>
                  {/* <h4 className="mb-0"> <ArrowDown color="red" size={20} />{85}%</h4> */}
                  {acuuracyLoader ? <><Loader3 /></> : <>
                    <h6 className="ellipsis-text">AI Accuracy</h6>
                    {/* <h4 className="mb-0">
                      {accuracyPercent < 80 ? (
                        <ArrowDown color="red" size={20} />
                      ) : (
                        <ArrowUp color="green" size={20} />
                      )}
                      {`${accuracyPercent}%` || 'N/A'}
                    </h4> */}
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
                  {connectivityFactoryLoader ? <Loader3 /> : <>
                    <h6 className="ellipsis-text">Cameras Count</h6>
                    <p className=" ellipsis-text mb-0 d-flex">
                      <span className="f-light"><FaCamera size={22} className="me-3" /></span>
                      <h5>{Number.isInteger(factoryCamerasCount?.active_cameras) ? factoryCamerasCount.active_cameras : 'N/A'} / {Number.isInteger(factoryCamerasCount?.total_cameras) ? factoryCamerasCount.total_cameras : 'N/A'} </h5>
                    </p>
                    {/* <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span> */}
                    {/* <p className="f-light ellipsis-text mb-1">
                        <span><GiCctvCamera className="me-1" /></span> 
                        Active Cameras: {Number.isInteger(factoryCamerasCount?.active_cameras) ? factoryCamerasCount.active_cameras : 'N/A'}
                      </p> */}

                    {/* <h4 className="mb-0">
                    {/* <h4 className="mb-0">
                     
                      {accuracySectionData.connectivity?.trend === "up" ? (
                        <ArrowUp color="green" size={20} />
                      ) : (
                        <ArrowDown color="red" size={20} />
                      )}
                      {accuracySectionData.connectivity?.value}%
                    </h4> 
                    <span className="f-light">
                      {accuracySectionData.connectivity?.status}
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
                        {highseverityCardData?.max_alerts !== null ?
                          <ul  >
                            <li >
                              <p className="f-light ellipsis-text mb-1"> <span><TbAlertSquareRounded className='me-1' /></span> Alerts: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>{highseverityCardData?.max_alerts?.alert_count}</span></p>

                            </li>
                            <li>
                              {highseverityCardData?.max_alerts && <p className="f-light ellipsis-text mb-1">
                                <span><LuBuilding2 className="me-1" /></span>
                                Module: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>

                                  {
                                    highseverityCardData?.max_alerts?.object === 'forklift_person_in_same_aisle' ? 'MMHE' :
                                    highseverityCardData?.max_alerts?.object === 'emergency_exit_blockage' ? 'E.Exit' :
                                      highseverityCardData?.max_alerts?.object === 'Emergency Exit' ? 'E.Exit' : highseverityCardData.max_alerts.object
                                  }
                                </span>
                              </p>}

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><TiLocationArrowOutline className="me-1" /></span> {highseverityCardData?.max_alerts?.area}, {highseverityCardData?.max_alerts?.area_owner}</p>

                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1"><span><MdAccessTime className="me-1" /></span> {"Shift " + highseverityCardData?.max_alerts?.shift_name || 'Shift A'} </p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"> <span><GoLocation className="me-1" /></span> {highseverityCardData?.max_alerts?.sub_area}</p>

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
                        {highseverityCardData?.highSeverity !== null ?
                          <ul  >
                            <li >
                              <p className="f-light ellipsis-text mb-1"> <span><TbAlertSquareRounded className='me-1' /></span> Alerts: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}>{highseverityCardData?.highSeverity?.alert_count}</span></p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><LuBuilding2 className="me-1" /></span>Module: <span style={{ fontWeight: '500', fontSize: '16px', color: 'black' }}> {highseverityCardData?.highSeverity?.object == 'forklift_person_in_same_aisle' ? 'MMHE' : highseverityCardData?.highSeverity?.object == 'Emergency Exit' ? 'E.Exit' : highseverityCardData?.highSeverity?.object}  </span></p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"><span><TiLocationArrowOutline className="me-1" /></span> {highseverityCardData?.highSeverity?.area}, {highseverityCardData?.highSeverity?.area_owner}</p>

                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1"><span><MdAccessTime className="me-1" /></span> {"Shift " + highseverityCardData?.highSeverity?.shift_name || 'Shift A'} </p>

                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1"> <span><GoLocation className="me-1" /></span> {highseverityCardData?.highSeverity?.sub_area}</p>

                            </li>
                          </ul> :
                          <p className="f-light text-center py-3"> Zero Alerts</p>
                        }

                      </>}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* <Card className="anlyticsBottomCard">
              <CardBody className={`w-100 d-flex justify-content-between p-2 p-md-2 `}>
                {highseverityCardLoader ? <div className="w-100 h-100 d-flex justify-content-center align-items-center"><Loader3 /></div> :
                 <>
                  
                 <div className="d-flex flex-column w-50 gap-2 justify-content-center" style={{ padding: '20px 10px 20px 10px' }}>
                  <h6>High Severity Alerts</h6>
                  <h4 className="mb-0">
                    <ArrowUp color="green" size={20} /> 
                    {extractedData?.maxAlerts}
                  </h4>
                  <span>
                    <span className="f-light ellipsis-text"> 
                      Module: {extractedData?.module}
                    </span>
                    <span style={{ visibility: "hidden" }} className="f-light d-block ellipsis-text"> 
                      Camera: N/A
                    </span>
                  </span>
                </div>
                  <div
                    className="d-flex flex-column w-50 gap-2 justify-content-center"
                    style={{ padding: "20px 15px" }}
                  >
                    <h6 style={{ visibility: "hidden" }}>High Severity Alerts</h6>
                    <h4 className="mb-0"> 
                      {extractedData?.camera}
                    </h4>
                    <span>
                      <span className="f-light d-block ellipsis-text"> 
                        Owner: {extractedData?.owner}
                      </span>
                      <span
                        className="f-light d-block ellipsis-text"
                      > 
                        Sub Area: {extractedData?.subArea}
                      </span>
                    </span>
                  </div>
                  </>}
              </CardBody>
            </Card> */}

          </Col>
        </Row>
        
        </>:
        <>
        <Row>
          <Col md={6} xxl={4}>
            <Card style={{ height: "399px" }}>
              { 
                loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                  :
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
                        <ReactApexChart
                          type="radialBar"
                          height={290}
                          options={recentOrderChart.options}
                          series={recentOrderChart.series}
                        />
                      </div>
                      <div
                        style={{ width: "100%" }}
                        className="d-flex justify-content-center"
                      >
                        {/* <span
                          style={{ width: "80%", position: 'absolute', bottom: '15px' }}
                          className="text-center f-light"
                        >
                          Week {getCurrentWeekNumber()} Data
                        </span> */}
                    </div>
                  </CardBody>
                </>
              }
            </Card>
          </Col>
          <Col md={6} xxl={4}>
            <ProgressBars
              progressData={progressData}
              week={week}
              loadingForBars={loadingForBars}
              filters={filters}
            />
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
                  {acuuracyLoader ? (
                    <>
                      <Loader3 />
                    </>
                  ) : (
                    <>
                      <h6 className="ellipsis-text">AI Accuracy</h6>
                      {/* <h4 className="mb-0">
                      {accuracyPercent < 80 ? (
                        <ArrowDown color="red" size={20} />
                      ) : (
                        <ArrowUp color="green" size={20} />
                      )}
                      {`${accuracyPercent}%` || 'N/A'}
                    </h4> */}
                      <h4 className="mb-0">
                        {!accuracyPercent ? (
                          ""
                        ) : accuracyPercent === "NaN" ? (
                          ""
                        ) : accuracyPercent < 80 ? (
                          <ArrowDown color="red" size={20} />
                        ) : (
                          <ArrowUp color="green" size={20} />
                        )}
                        {accuracyPercent === "NaN"
                          ? "N/A"
                          : !accuracyPercent
                          ? "N/A"
                          : accuracyPercent + "%"}
                      </h4>
                      {/* <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span> */}
                    </>
                  )}
                  {/* <span className="f-light">Week 42 Data</span> */}
                </CardBody>
              </Card>
              <Card
                className="anlyticsTopCards"
                style={{ padding: "20px 10px", width: "50%" }}
              >
                <CardBody className={`${cardClass}`}>
                  {/* <h6 className="ellipsis-text">Connectivity</h6> */}
                  {connectivityFactoryLoader ? (
                    <Loader3 />
                  ) : (
                    <>
                      <h6 className="ellipsis-text">Cameras Count</h6>
                      <p className=" ellipsis-text mb-0 d-flex">
                        <span className="f-light">
                          <FaCamera size={22} className="me-3" />
                        </span>
                        <h5>
                          {Number.isInteger(factoryCamerasCount?.active_cameras)
                            ? factoryCamerasCount.active_cameras
                            : "N/A"}{" "}
                          /{" "}
                          {Number.isInteger(factoryCamerasCount?.total_cameras)
                            ? factoryCamerasCount.total_cameras
                            : "N/A"}{" "}
                        </h5>
                      </p>
                      {/* <span className="f-light">
                      Week {getCurrentWeekNumber()} Data
                    </span> */}
                      {/* <p className="f-light ellipsis-text mb-1">
                        <span><GiCctvCamera className="me-1" /></span> 
                        Active Cameras: {Number.isInteger(factoryCamerasCount?.active_cameras) ? factoryCamerasCount.active_cameras : 'N/A'}
                      </p> */}

                      {/* <h4 className="mb-0">
                    {/* <h4 className="mb-0">
                     
                      {accuracySectionData.connectivity?.trend === "up" ? (
                        <ArrowUp color="green" size={20} />
                      ) : (
                        <ArrowDown color="red" size={20} />
                      )}
                      {accuracySectionData.connectivity?.value}%
                    </h4> 
                    <span className="f-light">
                      {accuracySectionData.connectivity?.status}
                    </span> */}
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Row>
              <Col sm="6" xs="12">
                <Card className="anlyticsBottomCard">
                  <CardBody>
                    {highseverityCardLoader ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Loader3 />
                      </div>
                    ) : (
                      <>
                        <h6 className="ellipsis-text  py-2"> Highest Alerts</h6>
                        {highseverityCardData?.max_alerts !== null ? (
                          <ul>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                {" "}
                                <span>
                                  <TbAlertSquareRounded className="me-1" />
                                </span>{" "}
                                Alerts:{" "}
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: "black",
                                  }}
                                >
                                  {
                                    highseverityCardData?.max_alerts
                                      ?.alert_count
                                  }
                                </span>
                              </p>
                            </li>
                            <li>
                              {highseverityCardData?.max_alerts && (
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <LuBuilding2 className="me-1" />
                                  </span>
                                  Module:{" "}
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "16px",
                                      color: "black",
                                    }}
                                  >
                                    {highseverityCardData?.max_alerts
                                      ?.object ===
                                    "forklift_person_in_same_aisle"
                                      ? "MMHE"
                                      : highseverityCardData?.max_alerts
                                          ?.object === "emergency_exit_blockage"
                                      ? "E.Exit"
                                      : highseverityCardData?.max_alerts
                                          ?.object === "Emergency Exit"
                                      ? "E.Exit"
                                      : highseverityCardData.max_alerts.object}
                                  </span>
                                </p>
                              )}
                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                <span>
                                  <TiLocationArrowOutline className="me-1" />
                                </span>{" "}
                                {highseverityCardData?.max_alerts?.area},{" "}
                                {highseverityCardData?.max_alerts?.area_owner}
                              </p>
                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1">
                                <span>
                                  <MdAccessTime className="me-1" />
                                </span>{" "}
                                {"Shift " +
                                  highseverityCardData?.max_alerts
                                    ?.shift_name || "Shift A"}{" "}
                              </p>
                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                {" "}
                                <span>
                                  <GoLocation className="me-1" />
                                </span>{" "}
                                {highseverityCardData?.max_alerts?.sub_area}
                              </p>
                            </li>
                          </ul>
                        ) : (
                          <p className="f-light text-center py-3">
                            {" "}
                            Zero Alerts
                          </p>
                        )}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>

              <Col sm="6" xs="12">
                <Card className="anlyticsBottomCard">
                  <CardBody>
                    {highseverityCardLoader ? (
                      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Loader3 />
                      </div>
                    ) : (
                      <>
                        <h6 className="ellipsis-text py-2">
                          High Severity Alerts
                        </h6>
                        {highseverityCardData?.highSeverity !== null ? (
                          <ul>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                {" "}
                                <span>
                                  <TbAlertSquareRounded className="me-1" />
                                </span>{" "}
                                Alerts:{" "}
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: "black",
                                  }}
                                >
                                  {
                                    highseverityCardData?.highSeverity
                                      ?.alert_count
                                  }
                                </span>
                              </p>
                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                <span>
                                  <LuBuilding2 className="me-1" />
                                </span>
                                Module:{" "}
                                <span
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    color: "black",
                                  }}
                                >
                                  {" "}
                                  {highseverityCardData?.highSeverity?.object ==
                                  "forklift_person_in_same_aisle"
                                    ? "MMHE"
                                    : highseverityCardData?.highSeverity
                                        ?.object == "Emergency Exit"
                                    ? "E.Exit"
                                    : highseverityCardData?.highSeverity
                                        ?.object}{" "}
                                </span>
                              </p>
                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                <span>
                                  <TiLocationArrowOutline className="me-1" />
                                </span>{" "}
                                {highseverityCardData?.highSeverity?.area},{" "}
                                {highseverityCardData?.highSeverity?.area_owner}
                              </p>
                            </li>
                            <li>
                              {/* <p className="f-light ellipsis-text mb-1"> {highseverityCardData?.max_alerts?.area_owner}</p> */}
                              <p className="f-light ellipsis-text mb-1">
                                <span>
                                  <MdAccessTime className="me-1" />
                                </span>{" "}
                                {"Shift " +
                                  highseverityCardData?.highSeverity
                                    ?.shift_name || "Shift A"}{" "}
                              </p>
                            </li>
                            <li>
                              <p className="f-light ellipsis-text mb-1">
                                {" "}
                                <span>
                                  <GoLocation className="me-1" />
                                </span>{" "}
                                {highseverityCardData?.highSeverity?.sub_area}
                              </p>
                            </li>
                          </ul>
                        ) : (
                          <p className="f-light text-center py-3">
                            {" "}
                            Zero Alerts
                          </p>
                        )}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* <Card className="anlyticsBottomCard">
              <CardBody className={`w-100 d-flex justify-content-between p-2 p-md-2 `}>
                {highseverityCardLoader ? <div className="w-100 h-100 d-flex justify-content-center align-items-center"><Loader3 /></div> :
                 <>
                  
                 <div className="d-flex flex-column w-50 gap-2 justify-content-center" style={{ padding: '20px 10px 20px 10px' }}>
                  <h6>High Severity Alerts</h6>
                  <h4 className="mb-0">
                    <ArrowUp color="green" size={20} /> 
                    {extractedData?.maxAlerts}
                  </h4>
                  <span>
                    <span className="f-light ellipsis-text"> 
                      Module: {extractedData?.module}
                    </span>
                    <span style={{ visibility: "hidden" }} className="f-light d-block ellipsis-text"> 
                      Camera: N/A
                    </span>
                  </span>
                </div>
                  <div
                    className="d-flex flex-column w-50 gap-2 justify-content-center"
                    style={{ padding: "20px 15px" }}
                  >
                    <h6 style={{ visibility: "hidden" }}>High Severity Alerts</h6>
                    <h4 className="mb-0"> 
                      {extractedData?.camera}
                    </h4>
                    <span>
                      <span className="f-light d-block ellipsis-text"> 
                        Owner: {extractedData?.owner}
                      </span>
                      <span
                        className="f-light d-block ellipsis-text"
                      > 
                        Sub Area: {extractedData?.subArea}
                      </span>
                    </span>
                  </div>
                  </>}
              </CardBody>
            </Card> */}
          </Col>
        </Row>

        <Row className=" ">
          <Col xs={12} lg={12} md={12} sm={12} xl={12}>
            <Card ref={heatmapcontext} className="shadow-sm w-100">
              <CardHeader className="text-black">
                <Row className="">
                  <Col xs="12" sm="6" md="5" className="">
                    <h5 className="mb-0">Area Intensity Heatmap</h5>
                  </Col>

                  {/* <Col xs="12 " sm='6' md='7'
                    className=" d-flex flex-row flex-md-row flex-column mt-2 mt-sm-0 justify-content-start flex-wrap justify-content-sm-end align-items-start align-items-sm-end align-items-md-start filter-container gap-2 align-self-end align-md-self-start">
                    <CommonFIlterButton
                      data={Shifts}
                      handleInputChange={handleInputChange}
                      style={filterButtonstyle}
                      selectedItem={filters?.shift}
                      firstOption={"Select Shift"}
                      inputChangeOption={"shift"}
                      clName={` ${filters?.shift && focusClass} filter-button-size`}
                    />
                    <div className="d-flex rounded-3 position-relative flex-column flex-md-row  gap-2 gap-md-0">
                      {!filters?.weekly && (
                        <span
                          className="filters-weekly-span"
                        >
                          Select Week
                        </span>
                      )}
                      <Input
                        className={`filter-button-size margin-for-weekly input-border-class-weekly m-0 mr-sm-2 
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

                  </Col> */}
                </Row>
              </CardHeader>
              <Card.Body className="p-0 p-md-3 p-lg-4 w-100">
                <div className="table-responsive w-100">
                  <div className="mb-4 w-100">
                    {heatmapLoader ? (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "436px" }}
                      >
                        <Loader3 />
                      </div>
                    ) : (
                      <ApexInteractiveHeatmap
                        heatmapData={heatmapData}
                        moduleLength={progressData?.length}
                        filters={filters}
                      />
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <AlertsTrendChart
              ref={alerttrendcontext}
              chartData={chartData}
              filters={filters}
            />
          </Col>
        </Row>
        </>}
       
      </Container>
    </Fragment>
  );
};

export default LiveAnalyticsScreen;
