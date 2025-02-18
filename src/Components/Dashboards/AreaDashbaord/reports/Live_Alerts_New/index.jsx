import React, { Fragment, useState, useEffect, useRef,useContext } from "react";
import AlertList from "../../../../Tables/DatatableForArea/DataTable/Index";
import liveAlertContext from '../../../../../_helper/formData/LiveAlert/LiveAlert';
import {
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { H4 } from "../../../../../AbstractElements";
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
} from "../../../../../Data/staticData/data";
import AreaService from "../../../../../api/areaService";
import Loader1 from "../../../../../CommonElements/Spinner/loader";
import moment from "moment";
import SingleImage from "../../../../../Gallery/zoomin/SingleImage";
import CommonFIlterButton from "../../../../Common/commonFilterButton/CommonFIlterButton";
import { Button, FormGroup, Input, Card } from "reactstrap";
import { errorToast, getWeek } from "../../../../../_helper/helper";
import CameraImage from "../../../../../assets/images/cameras/camera.jpeg";
import { Typeahead } from "react-bootstrap-typeahead";
import { dateChoose } from "../../../../Screens/GlobalUser/AIModelReports/Components/data/staticData";
import LiveAlertsFilters from ".././Components/DateFilters/LiveAlertsFilters";
import LiveAlertsCards from ".././Components/LiveAlertsCards/LiveAlertsCards";
import ".././Components/LiveAlertsCards/livealerts.css";
import '.././reports.css'
import axios from "axios";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { Filter } from "react-feather";
import TypeheadFilter from "../../../../Common/commonFilterButton/TypeheadFilter";
import { ClipLoader } from "react-spinners";
import { getCurrentWeekWithYear } from "../../../../../utils/currentWeekWithYear";
import { toast } from "react-toastify";
import AlertsCards from "./Components/AlertsCards";
import { RiMenu5Line } from "react-icons/ri";

const Index = ({ togglee, settogglee, acceptedArray, setAcceptedArray, rejectedArray, setRejectedArray, runApi, setRunApi }) => {
  const todayy = new Date().toISOString().split("T")[0];
 
  const [next, setnext] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);
  const { setLiveAlertData, settotalLiveAlerts } = useContext(liveAlertContext);
   const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  

  

  const style = {
    minWidth: "132px",
    width: "144px",
    maxWidth: "150px",
    height: "38px",
    fontSize: 13,
  };
  const [modules, setModules] = useState(modulesforAlerts);
  const [severities, setSeverities] = useState(ViolationSeverity);
  const [pageCache, setPageCache] = useState({});
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState({});
  const [loader, setLoader] = useState(true);
  const [verified, setVerified] = useState(undefined)

  const [selectedOption, setSelectedOption] = useState("Week");
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(false);
  const [weeklyShow, setWeeklyShow] = useState(true);
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
  
  const [newFilters, setNewFilters] = useState({
    approval:"Select Approval",
    module: "",
    severity: "",
    shift: [],
    date: "",
    week: currentWeekk,
    month: "",
    starting: "",
    ending: "",
    area: role=='area' ? area_id : '',
    subarea: "",
  });

  

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
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        week: value,
        date: "",
        month: "",
        starting: "",
        ending: "",
      }));
    } else if (field === "month" && value) {
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        month: value,
        date: "",
        week: "",
        starting: "",
        ending: "",
      }));
    } else if (field === "date" && value) {
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        date: value,
        month: "",
        week: "",
        starting: "",
        ending: "",
      }));
    } else if (field === "starting" || field === "ending") {
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
        date: "",
        month: "",
        week: "",
      }));
    } 
 
    
    else {
      // Default case for other filters
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));

      // Filter modules based on severity directly using the value
      if (field === "severity") {
        if (value === "High") {
          const filteredModules = modulesforAlerts.filter(
            (mod) => !["Vest", "Helmet", "Machine Guard"].includes(mod)
          );
          setModules(filteredModules);
        } else if (value === "Medium") {
          const filteredModules = modulesforAlerts.filter(
            (mod) => !["Helmet", "Emergency Exit", "Vest", "MMHE"].includes(mod)
          );
          setModules(filteredModules);
        } else if (value === "Medium plus") {
          const filteredModules = modulesforAlerts.filter(
            (mod) => !["Emergency Exit", "Machine Guard", "MMHE"].includes(mod)
          );
          setModules(filteredModules);
        } else {
          // If no severity selected or any other value, reset modules to all available
          setModules([
            "Helmet",
            "Vest",
            "Emergency Exit",
            "Machine Guard",
            "MMHE",
          ]);
        }
      } else if (field === "module") {
        if (value === "MMHE" || value === "Emergency Exit") {
          const filteredModules = ViolationSeverity.filter(
            (mod) => !["Medium", "Medium plus"].includes(mod)
          );
          setSeverities(filteredModules);
        } else if (value === "Vest" || value === "Helmet") {
          const filteredModules = ViolationSeverity.filter(
            (mod) => !["High", "Medium"].includes(mod)
          );
          setSeverities(filteredModules);
        } else if (value === "Machine Guard") {
          const filteredModules = ViolationSeverity.filter(
            (mod) => !["Medium plus", "High"].includes(mod)
          );
          setSeverities(filteredModules);
        } else {
          // If no severity selected or any other value, reset modules to all availablee
          setSeverities(["High", "Medium plus", "Medium"]);
        }
      }
    }
  };


  const [filtereddData, setFiltereddData] = useState();
  const [pageNo, setPageNo] = useState(1);

  async function CallOps(){
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    const payload1 = {
      safety_area: [],
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
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    const payload1 = {
      safety_area: [],
      factory_id:factoryID,
      shift:newFilters.shift,
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

    await fetchLive(payload, payload1);
    await CallOps()
    
    // setFiltereddData(filteredData); // Update the state with the filtered data
  };
  const [totalPages, setTotalPages] = useState(0);
  const [acc, setacc] = useState(0)
  const [rej, setrej] = useState(0)

  const [summary, setsummary] = useState({})

  async function fetchLive(payload, payload1) {
console.log('payload11', payload1)
    try {
      setLoader(true);
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
        
      setTotalPages(res.data.data.total_pages);
      }
    } catch (error) {
      console.log("Error fetching alerts:", error);
      setLoader(false);
    }
  }
  
  

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
    setDateShow(true);
    setWeeklyShow(false);
    setMonthShow(false);
    setCustomDate(false);
    setSelectedOption("Daily");
    setReset(true);
    setPageNo(1);
    setPageCache({}); // Clear the cache when filters are reset
  
    // Define the reset filters object
    const resetFilters = {
      approval: "Select Approval",
      module: "",
      area: role=='area' ? area_id : '',
      subarea: '',
      severity: "",
      shift: "",
      date: "",
      week: currentWeekk,
      month: "",
      starting: "",
      ending: "",
    };
  
    // Set the filters immediately and call fetchLive with the new filters
    setNewFilters(resetFilters);
  
    const payload = {
      user_id: 1,
      identifier: "week",
      filters: resetFilters,
      pagination: {
        page_no: 1,
        per_page: 21,
      },
    };
  
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
  
    const payload1 = {
      safety_area: [],
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
  }
  
  

 
  
  const [reset, setReset] = useState(false);

  const [areas, setAreas] = useState([])
  const [subareas, setSubAreas] = useState({})

  useEffect(() => {
    setLoader(true)
    const updateSubAreas = (mappedAreas) => {
      const subs = mappedAreas.reduce((acc, a) => {
        acc[a.area_name] = a.sub_areas; // Set `area_name` as the key and `sub_area` as the value
        return acc;
      }, {});
    console.log('subsss',subs)
      // Update the state
      setSubAreas(subs);
    };
    // async function fetchArea(){
      
    //   const res = await AreaService.getAreaUserTickets(JSON.parse(localStorage.getItem("userData"))?.id)
    //   if(res){
    //     setLoader(false)
    //   }
     
    //   setAreas(res?.data?.data?.areas)
    //   const mappedAreas = res?.data?.data?.areas && res?.data?.data?.areas.map(area => ({
    //    ...area,
    //    label: `${area.area_name}, ${area.area_owner}`,
    //    disabled: !area.active
    //  }));
    //  console.log('mapped areas received', mappedAreas)
    //  updateSubAreas(mappedAreas)
    
    //  }
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

     fetchArea()
  
  }, [])
  
 
  useEffect(() => {
    // Only fetch if the current page is not in cache
   

    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    if (!pageCache[pageNo]) {
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
      
      const payload1 = {
        safety_area: [],
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
      
      fetchLive(payload, payload1);
     
    } else {
      // Use cached data for the current page
      setFiltereddData(pageCache[pageNo]);
      
      }
      CallOps();
  }, [pageNo]);


 
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




  return (
    <Fragment>
      <Container className="  dashboard-first-page px-3" fluid={true}>
       {
        loader ? (
          <Loader1 />
        )
       :(
        <>
        
        
            <Row className="d-flex align-items-start  ">
              <Col xl={`12`} lg="12" md="12" sm="12" xs="12">
             
                    <div className={`${role!=='qa' && 'mb-2'}`}>
                    <div className={`d-flex align-items-center justify-content-between gap-2  `}>
                      <p
                        className="p-0 m-0 d-flex gap-1 flex-wrap align-items-center"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        Live Alerts 
                      </p>
                      <div type='button' className={`d-flex justify-content-center filter-btnn  ${showFilters && 'border_R'}`}
                      style={{background:'#635470',border:'1px solid #dfdfdf'}} 
                      ref={filterButton}
                      onClick={()=> setShowFilters(!showFilters)}
                      >
                      <span className="d-flex"><RiMenu5Line color="#8c8c8c" size={16} className=" me-2 " /></span>
                      <p
                        className="m-0"
                        style={{ fontSize: "16px", color:'black'  }}
                      >
                        Filters 
                      </p> 
                      {/* <span className="d-flex"><Filter color="#fff" size={16} className="ms-2 " /></span> */}
                      </div>
                     
                    </div>
                    <div className="w-100 d-flex justify-content-end position-relative">
                      {showFilters && <div className={`d-flex align-items-center justify-content-end gap-2 py-3 filter-card shadow-sm`}
                      ref={filterCardRef}
                      >

                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                          <LiveAlertsFilters
                          maxWeek={maxWeek}
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
              <Col className="mb-2">
              <div className="d-flex flex-wrap align-items-center">
              <span className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> 
                 Total Alerts: {summary.count}  
                        </span>
                        <h6 className="m-0 p-0" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> {newFilters.week!=='' ? `Week: ${newFilters.week.split('-W')[1]}` : newFilters.date!=='' ?  `Day ${newFilters.date.split('-')[2]}` :  newFilters.month!=='' ? `${newFilters.month.replace(/2024-(\d+)/, (match, month) =>
                        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(month, 10) - 1]
                        )} ${newFilters.month.split('-')[0].slice(-2)}` : (newFilters.starting && newFilters.ending) && `Day ${newFilters.starting.split('-')[2]} to ${newFilters.ending.split('-')[2]}`
                        }</h6>
              </div>
              <div className="d-flex flex-wrap align-items-center mt-2">
                {/* <h6 className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}>  */}
                {newFilters.severity  &&  
                <h6 className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> 
                 Severity: {newFilters.severity}
                        </h6>
                 }
                   {newFilters.module  &&     <h6 className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> 
                   Module: {newFilters.module}
                   </h6>}
                   {newFilters.area  &&  <h6 className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> 
                   Area: {newFilters.area}
                   </h6>}
                   {newFilters.shift  && newFilters.shift.map((item)=>(
                   <h6 className="me-4" style={{ fontSize: "18px", fontWeight: "100" ,color:'#595959'}}> 
                    {item}
                   </h6>
                   )) 
                   }
              </div>
              </Col>
              {/* <Col className={`gap-2 d-flex align-items-center mt-xl-2 justify-content-start justify-content-xl-${customDate ? 'start' : 'end'}`} xs='12'>


      </Col> */}
        </Row>
        <AlertsCards setFiltereddData={setFiltereddData} loader={loader} togglee={togglee} settogglee={settogglee} summary={summary} setsummary={setsummary} setAcceptedArray={setAcceptedArray} setRejectedArray={setRejectedArray} accept={accept} setAccept={setAccept} reject={reject} setReject={setReject} runApi={runApi} setRunApi={setRunApi} acceptedArray={acceptedArray} rejectedArray={rejectedArray} setLoader={setLoader}  role={role} key={pageNo} setPageNo={setPageNo} pageNo={pageNo} total_pages={totalPages} imageData={imageData} showModal={showModal} setShowModal={setShowModal} filtereddData={filtereddData} handleCardClick={handleCardClick}/>
        {/* <LiveAlertsCards setFiltereddData={setFiltereddData} loader={loader} togglee={togglee} settogglee={settogglee} summary={summary} setsummary={setsummary} setAcceptedArray={setAcceptedArray} setRejectedArray={setRejectedArray} accept={accept} setAccept={setAccept} reject={reject} setReject={setReject} runApi={runApi} setRunApi={setRunApi} acceptedArray={acceptedArray} rejectedArray={rejectedArray} setLoader={setLoader}  role={role} key={pageNo} setPageNo={setPageNo} pageNo={pageNo} total_pages={totalPages} imageData={imageData} showModal={showModal} setShowModal={setShowModal} filtereddData={filtereddData} handleCardClick={handleCardClick} /> */}

</>
       )
      }
       
         
         
          {/* <p style={{fontSize:'18px', fontWeight:'500'}} className="p-0 m-0 d-flex justify-content-start blink-text">Total Alerts: {count}</p> */}
         
         
          
      </Container>
    </Fragment>
  );
};

export default Index;
 
