import React, { Fragment, useState, useEffect, useRef,useContext } from "react";
import AlertList from "../../../Tables/DatatableForArea/DataTable/Index";
import liveAlertContext from '../../../../_helper/formData/LiveAlert/LiveAlert';
import {
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { H4 } from "../../../../AbstractElements";
import {
  areaOptionsData,
  areas,
  DateFilters,
  dummyDataForLiveAlerts,
  modulesforAlerts,
  modulesForRefrigeration,
  Shifts,
  statuses,
  subareaOptionsData,
  ViolationSeverity,
} from "../../../../Data/staticData/data";
import AreaService from "../../../../api/areaService";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import Loader3 from "../../../../CommonElements/Spinner/loader3";
import moment from "moment";
import SingleImage from "../../../../Gallery/zoomin/SingleImage";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { Button, FormGroup, Input, Card } from "reactstrap";
import { errorToast, getWeek } from "../../../../_helper/helper";
import CameraImage from "../../../../assets/images/cameras/camera.jpeg";
import { Typeahead } from "react-bootstrap-typeahead";
import { dateChoose } from "../../../Screens/GlobalUser/AIModelReports/Components/data/staticData";
import LiveAlertsFilters from "./Components/DateFilters/LiveAlertsFilters";
import LiveAlertsCards from "./Components/LiveAlertsCards/LiveAlertsCards";
import "./Components/LiveAlertsCards/livealerts.css";
import './reports.css'
import axios from "axios";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { Filter } from "react-feather";
import TypeheadFilter from "../../../Common/commonFilterButton/TypeheadFilter";
import { ClipLoader } from "react-spinners";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router";
import { SlArrowLeft } from "react-icons/sl";




const AreaAnalysisDetails = ({ togglee, settogglee, acceptedArray, setAcceptedArray, rejectedArray, setRejectedArray, runApi, setRunApi, setQaFilters }) => {
  const todayy = new Date().toISOString().split("T")[0];
  let analysis = undefined;
  analysis = JSON.parse(localStorage.getItem('areaPayload'))
  console.log('coming from areaanalysis', analysis)
  const areaanalysisfilters = JSON.parse(localStorage.getItem('areaanalysisalertfilters'))
 
  const [next, setnext] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);
 
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  
  const { setLiveAlertData, settotalLiveAlerts, filtersContext, setFiltersContext, setmodelandreports } = useContext(liveAlertContext);

  

  const style = {
    minWidth: "132px",
    width: "144px",
    maxWidth: "150px",
    height: "38px",
    fontSize: 13,
  };
  const [modules, setModules] = useState();
  const [initialMods, setInitialMods] = useState()
  const [severities, setSeverities] = useState(ViolationSeverity);
  const [pageCache, setPageCache] = useState({});
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState({});
  const [loader, setLoader] = useState(true);
  const [verified, setVerified] = useState(undefined)

  const [selectedOption, setSelectedOption] = useState(areaanalysisfilters.week!=='' ? 'Week' : areaanalysisfilters.month!=='' && 'Month');
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(areaanalysisfilters.month!=='' ? true : false);
  const [weeklyShow, setWeeklyShow] = useState(areaanalysisfilters.week!=='' ? true : false);
  const [customDate, setCustomDate] = useState(false);
  const [accept, setAccept] = useState([])
  const [reject, setReject] = useState([])
  const [count, setCount] = useState(0);
  const [pending, setpending] = useState()
  const area_id = JSON.parse(localStorage.getItem(`userData`))?.area_ids.name

  const handleDateDrop = (e) => {
    setSelectedOption(e.target.value); // Update the dropdown value based on user selection
    setShowButtons(true)
    if (e.target.value == "Duration") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false); 
    } else if (e.target.value == "Month") {
      setMonthShow(true);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Daily") {
      setMonthShow(false);
      setDateShow(true);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Week") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(true);
      setCustomDate(false);
    } else if (e.target.value == "Custom") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(true);
    }
  };

  const role = JSON.parse(localStorage.getItem("role"));

  

  
  

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
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
  const currentWeekk = getCurrentWeekWithYear()
  // const currentWeekk = getCurrentWeek();
  const monthtoday = new Date();
  const currentMonth = monthtoday.toISOString().slice(0, 7);

  const {id} = useParams();

  
  
  const [newFilters, setNewFilters] = useState({
    approval:"Select Approval",
    module: "",
    severity: "",
    shift: areaanalysisfilters.shifts!=='' ? [areaanalysisfilters.shifts] : [],
    date: areaanalysisfilters.date,
    week: areaanalysisfilters.week,
    month: areaanalysisfilters.month,
    starting: areaanalysisfilters.starting,
    ending: areaanalysisfilters.ending,
    area: analysis?.name,
    subarea: "",
  });

  console.log('initial area filter', newFilters)
  

  const handleTypeChange = (selected) => {
    setShowButtons(true);
    setNewFilters((prevFilters) => ({
      ...prevFilters,
      shift: selected,
    }));
  };


  const handleNewInputChange = (e, field) => {
    let value = e.target.value;
  
    setShowButtons(true);
  
    // Update filters based on field type
    if (field === "week" && value) {
      setNewFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          week: value,
          date: "",
          month: "",
          starting: "",
          ending: "",
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters)); // Persist in localStorage
        return updatedFilters;
      });
    } else if (field === "month" && value) {
      setNewFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          month: value,
          date: "",
          week: "",
          starting: "",
          ending: "",
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
    } else if (field === "date" && value) {
      setNewFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          date: value,
          month: "",
          week: "",
          starting: "",
          ending: "",
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
    } else if (field === "starting" || field === "ending") {
      setNewFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          [field]: value,
          date: "",
          month: "",
          week: "",
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
    } else {
      // Default case for other filters
      setNewFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          [field]: value,
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
  
      // Filter modules based on severity
      if (field === "severity") {
        if (value === "High") {
          const filteredModules = initialMods.filter(
            (mod) => !["Vest", "Helmet", "Machine Guard"].includes(mod)
          );
          setModules(filteredModules);
          localStorage.setItem("modules", JSON.stringify(filteredModules)); // Persist modules
        } else if (value === "Medium") {
          const filteredModules = initialMods.filter(
            (mod) => !["Helmet", "Emergency Exit", "Vest", "MMHE"].includes(mod)
          );
          setModules(filteredModules);
          localStorage.setItem("modules", JSON.stringify(filteredModules));
        } else if (value === "Medium plus") {
          const filteredModules = initialMods.filter(
            (mod) => !["Emergency Exit", "Machine Guard", "MMHE"].includes(mod)
          );
          setModules(filteredModules);
          localStorage.setItem("modules", JSON.stringify(filteredModules));
        } else {
          const allModules = [
            "Helmet",
            "Vest",
            "Emergency Exit",
            "Machine Guard",
            "MMHE",
          ];
          setModules(initialMods);
          localStorage.setItem("modules", JSON.stringify(initialMods));
        }
      } else if (field === "module") {
        if (value === "MMHE" || value === "Emergency Exit") {
          const filteredSeverities = ViolationSeverity.filter(
            (mod) => !["Medium", "Medium plus"].includes(mod)
          );
          setSeverities(filteredSeverities);
          localStorage.setItem("severities", JSON.stringify(filteredSeverities)); // Persist severities
        } else if (value === "Vest" || value === "Helmet") {
          const filteredSeverities = ViolationSeverity.filter(
            (mod) => !["High", "Medium"].includes(mod)
          );
          setSeverities(filteredSeverities);
          localStorage.setItem("severities", JSON.stringify(filteredSeverities));
        } else if (value === "Machine Guard") {
          const filteredSeverities = ViolationSeverity.filter(
            (mod) => !["Medium plus", "High"].includes(mod)
          );
          setSeverities(filteredSeverities);
          localStorage.setItem("severities", JSON.stringify(filteredSeverities));
        } else {
          const allSeverities = ["High", "Medium plus", "Medium"];
          setSeverities(allSeverities);
          localStorage.setItem("severities", JSON.stringify(allSeverities));
        }
      }
    }
  };
  
  // Load filters, modules, and severities on page load

  


  const [filtereddData, setFiltereddData] = useState();
  const [pageNo, setPageNo] = useState(1);

  async function CallOps(payload1){
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
   
    if(role=='qa'){

      const resp = await AreaService.getOperationID(payload1);
      setAcceptedArray(resp?.data?.ids?.accepted);
      setRejectedArray(resp?.data?.ids?.rejected);
      
      // Calculate the count of elements in both arrays and set it as the verified value
      // setVerified((resp?.data?.ids?.accepted?.length || 0) + (resp?.data?.ids?.rejected?.length || 0));
      // setpending(count - verified)
    
    }
    }

  const applyNewFilters = async () => {
    
    if(dateShow){
      if(newFilters.date==''){
        errorToast('Choose The Date')
        return ;
      }
    }
    else if(weeklyShow){
      if(newFilters.week==''){
        errorToast('Choose The Week')
        return ;
      }
    }
    else if(monthShow){
      if(newFilters.month==''){
        errorToast('Choose The Month')
        return ;
      }
    }
    else if(customDate){
      if(newFilters.starting=='' || newFilters.ending==''){
        errorToast('Choose Both ranges')
        return ;
      }
    }
    
    
    setLoader(true);
    setPageNo(1);
    setPageCache({});
   
    const payload = {
      user_id: 1,
      factory_id:factoryID,
      identifier:
        newFilters.date !== ""
          ? "date"
          : newFilters.week !== ""
            ? "week"
            : newFilters.month !== ""
              ? "month"
              : newFilters.starting !== "" && newFilters.ending !== ""
                ? "custom"
                : "no date",
      filters: newFilters,
      pagination: {
        page_no: pageNo,
        per_page: 21,
      },
    };
    // console.log('-----------x--------------------x----------------')
    // console.log(newFilters.module,'current filters')
    // console.log('-----------x--------------------x----------------')
    const payloadWithoutPagination = {...payload}
    // delete payloadWithoutPagination.pagination
    localStorage.setItem('qafilters',JSON.stringify(payload))
if(role=='qa'){

  setQaFilters(payload)
}
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    const payload1 = {
      safety_area: [],
      factory_id:factoryID,
      shift: [newFilters.shift],
      start_date: newFilters.starting
        ? formatDate(newFilters.starting)
        : newFilters.date == ""
          ? ""
          : formatDate(newFilters.date),
      end_date: newFilters.ending
        ? formatDate(newFilters.ending)
        : newFilters.date == ""
          ? ""
          : formatDate(newFilters.date),
      week: newFilters.week,
      month: newFilters.month,
    };

    const payload2 = {
      safety_area: [newFilters.area],
      factory_id:factoryID,
      shift: Array.isArray(newFilters.shift) ? newFilters.shift : [newFilters.shift],
      start_date: newFilters.starting
        ? formatDate(newFilters.starting)
        : newFilters.date == ""
          ? ""
          : formatDate(newFilters.date),
      end_date: newFilters.ending
        ? formatDate(newFilters.ending)
        : newFilters.date == ""
          ? ""
          : formatDate(newFilters.date),
      week: newFilters.week,
      month: newFilters.month,
    };

// ye function jahn jahn call horaha hai wahn payload update krna hai
// sherry

    await fetchLive(payload, payload1);
    await CallOps(payload2) 

    localStorage.setItem("filters",JSON.stringify(newFilters))
   
    localStorage.setItem('pageNo',1)
    
    // setFiltereddData(filteredData); // Update the state with the filtered data
  };
  const [totalPages, setTotalPages] = useState(0);
  const [acc, setacc] = useState(0)
  const [rej, setrej] = useState(0)

  const [summary, setsummary] = useState({})


  
  

  function handleCardClick(item) {
   
    setImageData({
      photo: item.image,
      cameraName: item.camera_name,
      violation: item.violation,
      operation_safety_id: item.operation_safety_id,
      date: item?.date,
      time: item?.time,
    });
    setShowModal(!showModal);
  }

  function Reset() {
    setLoader(true);
    setShowButtons(false);
    setDateShow(false);
    setWeeklyShow(true);
    setMonthShow(false);
    setCustomDate(false);
    setSelectedOption("Week");
    setReset(true);
    setPageNo(1);
    setPageCache({}); // Clear the cache when filters are reset
  
    // Define the reset filters object
    const resetFilters = {
        approval:"Select Approval",
        module: "",
        severity: "",
        shift: [],
        date: "",
        week: currentWeekk,
        month: "",
        starting: "",
        ending: "",
        area: analysis?.name,
        subarea: "",
      }

    
    // Set the filters immediately and call fetchLive with the new filters
    setNewFilters(()=>{
      localStorage.setItem("filters", JSON.stringify(resetFilters));
      return resetFilters
    });

    localStorage.setItem("pageNo",1)
    
  
    const payload = {
      user_id: 1,
      identifier: "week",
      factory_id:factoryID,
      filters: resetFilters,
      pagination: {
        page_no: 1,
        per_page: 21,
      },
    };
  if(role=='qa'){
    setQaFilters(payload)
    localStorage.setItem('qafilters',JSON.stringify(payload))
    const payload1 = {
      safety_area: [resetFilters.area],
      factory_id:factoryID,
      shift: Array.isArray(resetFilters.shift) ? resetFilters.shift : [resetFilters.shift],
      start_date: resetFilters.starting
        ? formatDate(resetFilters.starting)
        : resetFilters.date == ""
          ? ""
          : formatDate(resetFilters.date),
      end_date: resetFilters.ending
        ? formatDate(resetFilters.ending)
        : resetFilters.date == ""
          ? ""
          : formatDate(resetFilters.date),
      week: resetFilters.week,
      month: resetFilters.month,
    };
    CallOps(payload1);
  }
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
  
    const payload1 = {
      safety_area: [],
      factory_id:factoryID,
      shift: [resetFilters.shift],
      start_date: formatDate(todayy),
      end_date: formatDate(todayy),
      week: "",
      month: "",
    };
  
    // Call fetchLive with the reset filters directly
    fetchLive(payload, payload1);
  
    // Reset modules and severities
    setModules(["Helmet", "Emergency Exit", "Machine Guard", "Vest", "MMHE"]);
    setSeverities(["High", "Medium plus", "Medium"]);
    localStorage.setItem("severities",severities)
  }
  
  

 
  
  const [reset, setReset] = useState(false);

  const [areas, setAreas] = useState([])
  const [subareas, setSubAreas] = useState({})
 
  useEffect(() => {
    // setLoader(true)
    const updateSubAreas = (mappedAreas) => {
      const subs = mappedAreas.reduce((acc, a) => {
        acc[a.area] = a.sub_area; // Set `area_name` as the key and `sub_area` as the value
        return acc;
      }, {});  
      // Update the state
      setSubAreas(subs);
    };
    async function fetchArea(){
      try {
        const payload={
          "user_id": JSON.parse(localStorage.getItem("userData"))?.id,
          "factory_id": factoryID
        }
        const res = await AreaService.GetAllAreas(factoryID)
        if(res){
          // setLoader(false)
        } 
        setAreas(res?.data?.data?.areas)
        const mappedAreas = res?.data?.data?.areas && res?.data?.data?.areas.map(area => ({
         ...area,
         label: `${area.area}, ${area.areaOwner}`,
         disabled: !area.active
       }));  
       updateSubAreas(mappedAreas)
      } catch (error) {
        console.log(error)
        errorToast('Error while fetching areas')
      }
      
       }
       async function fetchModules() {
        const res = await AreaService.GetModules();
        console.log('getting modules', res?.data?.data)
        setModules(res?.data?.data?.map((m)=>m.module_name))
        setInitialMods(res?.data?.data?.map((m)=>m.module_name))
       }


     fetchModules()  
     fetchArea()
  
  }, [])


  
  useEffect(() => {
  let filters = JSON.parse(localStorage.getItem('filters'))
    
    if(!filters) {
      localStorage.setItem('filters',JSON.stringify(newFilters))
    }
   
   
  }, [])
  
 
  useEffect(() => {
    // Only fetch if the current page is not in cache
   

    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr?.split("-");
      return `${month}/${day}/${year}`;
    };

  
  let filters = JSON.parse(localStorage.getItem('filters'))
  if(!filters) {
    localStorage.setItem('filters',JSON.stringify(newFilters))
  }
  else {
    setNewFilters(filters)
  }
  if(filters?.approval!=='Select Approval' || filters.module!=='' || filters.severity!=='' || (role!=='area' && filters.area!=='') || filters.subarea!=='' || filters?.month!=='' || filters.date!=='' || filters.week!==currentWeekk || filters.starting!=='' || filters.ending!==''){

    setShowButtons(true)
  }
   if (filters?.month!=='') {
    setMonthShow(true);
    setDateShow(false);
    setWeeklyShow(false);
    setCustomDate(false);
    setSelectedOption('Month')
  } else if (filters?.date!=='') {
    setMonthShow(false);
    setDateShow(true);
    setWeeklyShow(false);
    setCustomDate(false);
    setSelectedOption('Daily')
  } 
  else if (filters?.starting!=='' || filters?.ending!=='') {
    setMonthShow(false);
    setDateShow(false);
    setWeeklyShow(false);
    setCustomDate(true);
    console.log('customing')
    setSelectedOption('Custom')

  }
  else if (filters?.week!==currentWeekk) {
    setMonthShow(false);
    setDateShow(false);
    setWeeklyShow(true);
    setCustomDate(false);
    setSelectedOption('Week')
  } 


 
    if (!pageCache[pageNo]) {
      const payload = {
        user_id: 1,
        factory_id:factoryID,
        identifier:
          filters?.date !== ""
            ? "date"
            : filters?.week !== ""
              ? "week"
              : filters?.month !== ""
                ? "month"
                : filters?.starting !== "" && filters?.ending !== ""
                  ? "custom"
                  : "no date",
        filters: filters,
        pagination: {
          page_no: pageNo,
          per_page: 21,
        },
      };
      
      const payload1 = {
        safety_area: [],
        factory_id:factoryID,
        shift: [filters?.shift],
        start_date: filters?.starting
          ? formatDate(filters?.starting)
          : filters?.date == ""
            ? ""
            : formatDate(filters?.date),
        end_date: filters?.ending
          ? formatDate(filters?.ending)
          : filters.date == ""
            ? ""
            : formatDate(filters?.date),
        week: filters?.week,
        month: filters?.month,
      };
      // setQaFilters(payload)
    localStorage.setItem('qafilters',JSON.stringify(payload))
    if(role=='qa'){
      const payload1 = {
        safety_area: [filters.area],
        factory_id:factoryID,
        shift: Array.isArray(filters.shift) ? filters.shift : [filters.shift],
        start_date: filters.starting
          ? formatDate(filters.starting)
          : filters.date == ""
            ? ""
            : formatDate(filters.date),
        end_date: filters.ending
          ? formatDate(filters.ending)
          : filters.date == ""
            ? ""
            : formatDate(filters.date),
        week: filters.week,
        month: filters.month,
      };
      CallOps(payload1);
    }
      fetchLive(payload, payload1);
     
    } else {
    
      setFiltereddData(pageCache[pageNo]);
      
      }
     
  }, [pageNo]);

 
  async function fetchLive(payload, payload1) {
    
    try {
      setLoader(true);
     console.log('payload launching', payload)
     setFiltersContext(payload.filters)
      let res = await AreaService.getFilterAlerts(payload);
      if (res) {
        setLoader(false);
        const fetchedData = res?.data?.data?.alerts;
       
        // Use filters from payload instead of relying on `newFilters`
        
       const {filters} = payload
  
  
        // Update filtered data and related states
        setPageCache((prevCache) => ({
          ...prevCache,
          [payload.pagination.page_no]: fetchedData,
        }));


        localStorage.setItem('filters', JSON.stringify(filters))
        
        setFiltereddData(fetchedData);
        setLiveAlertData(fetchedData);
        let updatedState = {};

        if (filters.approval === 'Verified') {
          updatedState = {
            count: res.data.data.accepted_records + res.data.data.rejected_records,
            verified: res.data.data.accepted_records + res.data.data.rejected_records,
            pending: 0, // Since verified is all records, pending is 0
            acc: res.data.data.accepted_records,
            rej: res.data.data.rejected_records
          };
        } else if (filters.approval === 'Accepted') {
          updatedState = {
            count: res.data.data.accepted_records,
            verified: res.data.data.accepted_records,
            pending: 0,
            acc: res.data.data.accepted_records,
            rej: 0
          };
        } else if (filters.approval === 'Rejected') {
          updatedState = {
            count: res.data.data.rejected_records,
            verified: res.data.data.rejected_records,
            pending: 0,
            acc: 0,
            rej: res.data.data.rejected_records
          };
        } else if (filters.approval === 'Unverified') {
          const unverifiedRecords = res.data.data.total_records - (res.data.data.accepted_records + res.data.data.rejected_records);
          updatedState = {
            count: unverifiedRecords,
            verified: 0,
            pending: unverifiedRecords,
            acc: 0,
            rej: 0
          };
        } else {
          updatedState = {
            count: res.data.data.total_records,
            verified: res.data.data.accepted_records + res.data.data.rejected_records,
            pending: res.data.data.total_records - (res.data.data.accepted_records + res.data.data.rejected_records),
            acc: res.data.data.accepted_records,
            rej: res.data.data.rejected_records
          };
          console.log('trueeee')

        }
        console.log('summary showing', updatedState)
        
        // Update all states at once
        setsummary(updatedState);
        setmodelandreports((prev)=>({
          ...prev,
          totalAlerts: updatedState.count
        }))
        
      setTotalPages(res.data.data.total_pages);
      }
    } catch (error) {
      console.log("Error fetching alerts:", error);
      setLoader(false);
    }
  }



 
  // useEffect(() => {
  //   const formatDate = (dateStr) => {
  //     const [year, month, day] = dateStr.split("-");
  //     return `${month}/${day}/${year}`;
  //   };
  
   
  //   async function CallOps(){
  //     const payload1 = {
  //       safety_area: [],
  //       shift: [newFilters.shift],
  //       start_date: newFilters.starting
  //         ? formatDate(newFilters.starting)
  //         : newFilters.date == ""
  //           ? ""
  //           : formatDate(newFilters.date),
  //       end_date: newFilters.ending
  //         ? formatDate(newFilters.ending)
  //         : newFilters.date == ""
  //           ? ""
  //           : formatDate(newFilters.date),
  //       week: newFilters.week,
  //       month: newFilters.month,
  //     };
  //     if(role=='qa'){
  
  //       const resp = await AreaService.getOperationID(payload1);
  //       acc = resp?.data?.ids?.accepted
  //       rej = resp?.data?.ids?.rejected
  //       setAcceptedArray(resp?.data?.ids?.accepted);
  //       setRejectedArray(resp?.data?.ids?.rejected);
        
  //       // Calculate the count of elements in both arrays and set it as the verified value
  //        sum = resp?.data?.ids?.accepted?.length + resp?.data?.ids?.rejected?.length
  //       setVerified((resp?.data?.ids?.accepted?.length || 0) + (resp?.data?.ids?.rejected?.length || 0));
  //       pen = count-sum
       
  //       setpending(count - verified)
  //     }

  //     }
  //   CallOps();
  
  // }, [])
  

 

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

  const typeheadStyle={
     width: '144px',
     fontSize: '13px',
     color: 'black'
  }

const navigate = useNavigate()


  return (
    <Fragment>
      <Container className="  dashboard-first-page px-3" fluid={true}>
        {
            analysis!==undefined &&(
                <div style={{paddingBlock:'16px'}} className='d-flex align-items-center gap-2'>
                    <SlArrowLeft onClick={()=> {
                        localStorage.removeItem('filters')
                     navigate(`${process.env.PUBLIC_URL}/areaanalysis/${JSON.parse(localStorage.getItem('role'))}`)
                    }} style={{fontSize:'15px', color:'#175FA4', cursor:'pointer'}} />
                    <p onClick={()=> {
                        localStorage.removeItem('filters')
                     navigate(`${process.env.PUBLIC_URL}/areaanalysis/${JSON.parse(localStorage.getItem('role'))}`)
                    }} style={{fontSize:'20px', color:'#175FA4', cursor:'pointer'}} className='m-0 p-0'>Back</p>
                    </div>
            )
        }
       {
        loader ? (
          <>
          <div style={{ width:'100%', height: 'calc(100vh - 300px)'}} className="d-flex align-items-center justify-content-center w-100">
         <span> <Loader3 /></span>
          </div>
          </>
        )
       :(
        <>
        
        
            <Row className="d-flex align-items-start  ">
              <Col xl={`12`} lg="12" md="12" sm="12" xs="12">
             
                    <div className={`${role!=='qa' && 'mb-2'}`}>
                      <Row>
                        <Col md='7' className="d-flex align-items-center">
                        <div className={`d-flex align-items-center justify-content-between gap-2  `}>
                      <p
                        className="p-0 m-0 d-flex gap-1 flex-wrap align-items-center"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        Live Alerts <span style={{ fontSize: "18px", fontWeight: "100" }}> | Alerts: {summary.count} - {newFilters.week!=='' ? `Week ${newFilters.week.split('-W')[1]}` : newFilters.date!=='' ?  `Day ${newFilters.date.split('-')[2]}` :  newFilters.month!=='' ? `${newFilters.month.replace(/2024-(\d+)/, (match, month) =>
                            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(month, 10) - 1]
                          )} ${newFilters.month.split('-')[0].slice(-2)}` : (newFilters.starting && newFilters.ending) && `Day ${newFilters.starting.split('-')[2]} to ${newFilters.ending.split('-')[2]}`}</span>
                            </p>
                      
                     
                    </div>
                        </Col>
                        <Col md='5' className="d-flex  justify-content-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end ">
                        <div type='button' className={`d-flex justify-content-center filter-btnn  ${showFilters && 'border_R'}`} 
                      ref={filterButton}
                      onClick={()=> setShowFilters(!showFilters)}
                      >
                      <p
                        className="m-0"
                        style={{ fontSize: "16px",  }}
                      >
                        Filters 
                      </p>
                      <span className="d-flex"><Filter color="#fff" size={16} className="ms-2 " /></span>
                      </div>
                        </Col>
                      </Row>
                    
                   
                    <div className="w-100 d-flex justify-content-end position-relative">
                      {showFilters && <div className={`d-flex align-items-center justify-content-end gap-2 py-3 filter-card shadow-sm`}
                      ref={filterCardRef}
                      >

                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                          <LiveAlertsFilters
                          analysis={analysis}
                          maxWeek={getCurrentWeekWithYear()}
                          role={role}
                          areas={areas}
                          subarea={subareas[newFilters?.area]}
                            modulesforAlerts={modules}
                            ViolationSeverity={severities}
                            handleDateDrop={handleDateDrop}
                            currentWeekk={currentWeekk}
                            style={style}
                            handleNewInputChange={handleNewInputChange}
                            newFilters={newFilters}
                            selectedOption={selectedOption}
                            dateShow={dateShow}
                            monthShow={monthShow}
                            weeklyShow={weeklyShow}
                            customDate={customDate}
                            typeHeadFilter={true}
                          />
                          <TypeheadFilter
                          typeheadStyle={typeheadStyle}
                          selected={newFilters?.shift}
                          shifts={Shifts}
                          placeholder={'Select Shift'}
                          handleTypeChange={handleTypeChange}
                          />
                          
                          {showButtons && (
                            <>
                              <div className="d-flex flex-wrap gap-2 justify-content-center">
                                <Button
                                  style={style}
                                  className={`m-0 p-0 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                                  onClick={applyNewFilters}
                                  color=""
                                >
                                  <IoCheckmarkOutline
                                    style={{
                                      color: '#22c65e',
                                      fontSize: "20px",
                                      transform: "rotate(20deg)",
                                    }}
                                  />
                                  <p style={{ color: '#22c65e' }} className="m-0 p-0 "> Accept</p>
                                </Button>
                                <Button
                                  style={style}
                                  className={`m-0 p-0 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                                  onClick={Reset}
                                  color=""
                                >
                                  <RxReset
                                    style={{
                                      color: '#4e74d4',
                                      fontSize: "20px",
                                      // transform: "rotate(20deg)",
                                    }}
                                  />
                                  <p style={{ color: '#4e74d4' }} className="m-0 p-0 "> Reset</p>
                                </Button>

                                {/* <Button
                        style={style}
                        className="rounded-3"
                        onClick={Reset}
                        color="primary"
                      >
                        <RxReset />
                      </Button> */}

                              </div>
                            </>
                          )}
                        </div>
                      </div>}
                    </div>
                    </div>

                  {/* </CardBody> */}
                  {/* <p
                    style={{ fontSize: "18px", fontWeight: "500" }}
                    className="p-0 ms-3 mb-2 d-flex justify-content-start"
                  >
                    Total Alerts: {count} 
                  </p> */}
                  {
                    role =='qa' && (
                      <>
                      <div className="d-flex flex-wrap gap-3 justify-content-start mb-3 mt-1">
                      <div className="d-flex flex-column align-items-center justify-content-center ">
                      <p style={{color:'#71717a'}} className="p-0 ms-0 my-0 ">Verified: </p>
                      <p className='p-0 m-0 text-primary' style={{fontWeight:'600',fontSize: "18px"}}>{summary.verified}</p>
                      </div>
                      <div className="border"></div>
                      <div className="d-flex flex-column align-items-center justify-content-center ">
                      <p style={{color:'#71717a'}} className="p-0 ms-0 my-0 ">Accepted: </p>
                      <p className='p-0 m-0 text-success' style={{fontWeight:'600',fontSize: "18px"}}>{summary.acc}</p>
                      </div>
                      <div className="border"></div>
                      <div className="d-flex flex-column align-items-center justify-content-center ">
                      <p style={{color:'#71717a'}} className="p-0 ms-0 my-0 ">Rejected: </p>
                      <p className='p-0 m-0 text-danger' style={{fontWeight:'600',fontSize: "18px"}}>{summary.rej}</p>
                      </div>
                      <div className="border"></div>
                      <div className="d-flex flex-column align-items-center justify-content-center ">
                      <p style={{color:'#71717a'}} className="p-0 ms-0 my-0 ">Pending: </p>
                      <p className='p-0 m-0 text-info' style={{fontWeight:'600',fontSize: "18px"}}>{summary.pending}</p>
                      </div>
                      </div>
                      </>
                    )
                  }
                {/* </Card> */}
              </Col>
              {/* <Col className={`gap-2 d-flex align-items-center mt-xl-2 justify-content-start justify-content-xl-${customDate ? 'start' : 'end'}`} xs='12'>


      </Col> */}
        </Row>
<LiveAlertsCards setFiltereddData={setFiltereddData} loader={loader} togglee={togglee} settogglee={settogglee} summary={summary} setsummary={setsummary} setAcceptedArray={setAcceptedArray} setRejectedArray={setRejectedArray} accept={accept} setAccept={setAccept} reject={reject} setReject={setReject} runApi={runApi} setRunApi={setRunApi} acceptedArray={acceptedArray} rejectedArray={rejectedArray} setLoader={setLoader}  role={role} key={pageNo} setPageNo={setPageNo} pageNo={pageNo} total_pages={totalPages} imageData={imageData} showModal={showModal} setShowModal={setShowModal} filtereddData={filtereddData} handleCardClick={handleCardClick} />

</>
       )
      }
       
         
         
          {/* <p style={{fontSize:'18px', fontWeight:'500'}} className="p-0 m-0 d-flex justify-content-start blink-text">Total Alerts: {count}</p> */}
         
         
          
      </Container>
    </Fragment>
  );
};

export default AreaAnalysisDetails;
