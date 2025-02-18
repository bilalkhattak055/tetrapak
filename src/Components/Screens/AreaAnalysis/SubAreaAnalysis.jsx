import React, { useContext, useEffect, useRef, useState } from 'react';
import { Camera, Filter, Layers } from 'react-feather';
import './Style/areaStyles.css'
import { errorToast, getWeek } from '../../../_helper/helper';
import AreaService from '../../../api/areaService';
import Loader1 from '../../../CommonElements/Spinner/loader'
import { Button, Col, FormGroup, Row } from 'reactstrap';
import { RxReset } from 'react-icons/rx';
import { IoCheckmarkOutline } from 'react-icons/io5';
import DateFilter from '../GlobalUser/AIModelReports/Components/Dates/DateFilter';
import {getCurrentWeek } from '../../../utils/currentWeekWithYear';
import CommonFIlterButton from '../../Common/commonFilterButton/CommonFIlterButton';
import { Shifts } from '../../../Data/staticData/data';
import { useNavigate } from 'react-router';
import { formatMonth2, formatWeek } from '../../../utils/formatDate';
import SubAreaContext from '../../../_helper/formData/SubAreaAnalysis/SubAreaContext'

// const members = [
//   { id: "AO-1", name: "Sub Area 1", camera: 1, compliance: 0 },
//   { id: "AO-2", name: "Sub Area 2", camera: 2, compliance: 90 },
//   { id: "AO-6", name: "Sub Area 3", camera: 19, compliance: 78 },
//   { id: "AO-7", name: "Sub Area 4", camera: 7, compliance: 100 },
//   { id: "AO-8", name: "Sub Area 5", camera: 1, compliance: 36 },
//   { id: "AO-9", name: "Sub Area 6", camera: 2, compliance: 100 },
//   { id: "AO-10", name: "Sub Area 7", camera: 4, compliance: 58 },
//   { id: "AO-13", name: "Sub Area 8", camera: 5, compliance: 56 },
//   { id: "AO-14", name: "Sub Area 9", camera: 4, compliance: 60 }
// ];
const members = [
  { id: "AO-1", name: "waste window area", camera: 1, compliance: 0, modules: ['Helmet'], owner: "Adil Sultan", alerts: 10 },
  { id: "AO-2", name: "Ref workshop", camera: 2, compliance: 90, modules: ['Helmet', 'Emergency Exit'], owner: "Muhammad Aftab", alerts: 10 },
  { id: "AO-6", name: "DRY Store 1, 2", camera: 19, compliance: 78, modules: ['Helmet', 'Vest', 'MMHE'], owner: "Meraj Khalid", alerts: 10 },
  { id: "AO-6", name: "chemical store", camera: 21, compliance: 72, modules: ['Helmet', 'Vest'], owner: "Meraj Khalid", alerts: 10 },
  { id: "AO-6", name: "docking stations", camera: 22, compliance: 76, modules: ['Helmet', 'Vest', 'MMHE'], owner: "Meraj Khalid", alerts: 10 },
  { id: "AO-7", name: "Production Floor", camera: 7, compliance: 100, modules: ['Emergency Exit', 'Machine Guard'], owner: "Moazzam Ali", alerts: 10 },
  { id: "AO-8", name: "Air compressor", camera: 8, compliance: 92, modules: ['Helmet'], owner: "M.Shahbaz", alerts: 10 },
  { id: "AO-9", name: "Galleries", camera: 9, compliance: 85, modules: ['Emergency Exit'], owner: "M.Wasi", alerts: 10 },
  { id: "AO-10", name: "LT room", camera: 10, compliance: 88, modules: ['Helmet'], owner: "Nazir Ahmed", alerts: 10 },
  { id: "AO-10", name: "ammonia soft starter room", camera: 11, compliance: 84, modules: ['Helmet'], owner: "Nazir Ahmed", alerts: 10 },
  { id: "AO-13", name: "Pump House", camera: 12, compliance: 89, modules: ['Helmet'], owner: "Shahbaz", alerts: 10 },
  { id: "AO-13", name: "Biomass Boiler (including fuel storage shed)", camera: 13, compliance: 87, modules: ['Helmet'], owner: "Shahbaz", alerts: 10 },
  { id: "AO-14", name: "Cold Store 1&2", camera: 14, compliance: 94, modules: ['Helmet', 'MMHE'], owner: "Sheraz", alerts: 10 },
];
export default function AreaAnalysisCards() {
  const [memberss, setmemberss] = useState([]);
  const [loading, setloading] = useState(true);
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)

  const {
    subAreaFiltersContext,
    setSubAreaFiltersContext,
    subAreaDetails,
    setSubAreaDetails
  
} = useContext(SubAreaContext)

  //filters code
  const today = new Date().toISOString().split("T")[0];
  const [selectedOption, setSelectedOption] = useState("Week");
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(false);
  const [weeklyShow, setWeeklyShow] = useState(true);
  const [customDate, setCustomDate] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [identifier, setIdentifier] = useState(""); 
  let getfilss = JSON.parse(localStorage.getItem('aifilterss'))
  const [getfils, setGetfils] = useState(getfilss)
  const [filters, setFilters] = useState({
    areas: getfils?.areas ? getfils?.areas : [],
    shifts: getfils?.shifts || '',
    date: getfils?.date || "",
    week: getfils?.week || getCurrentWeek(),
    month: getfils?.month || "",
    starting: getfils?.starting || "",
    ending: getfils?.ending || "",
  });




  console.log('filtersss', filters)
  const [allarea, setallarea] = useState([]);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };


  async function getAiReportsCardsFunc(payload) {

    let mappedAreas = [];



    // Fetch allarea if not already populated
    const payloadd = {
      user_id: JSON.parse(localStorage.getItem("userData"))?.id,
      factory_id: factoryID
    }
    const areaRes = await AreaService.GetAllAreas(factoryID);
    // if (areaRes) {
    //   setLoader(false);
    // }
    console.log('get all areas', areaRes?.data?.data)
    mappedAreas =
      areaRes?.data?.data?.areas.map((area) => ({
        ...area,
        label: `${area.area}, ${area.areaOwner}`,
        // disabled: !area.active,
      })) || [];
    setallarea(mappedAreas);

    // updatedData = updatedData.filter((data) =>
    //   mappedAreas?.some((a) => data.AreaName === a.area_name && a.active)
    // );

    // setAllData(updatedData);
  }

  const shouldShowButton = () => {
    const fils = JSON.parse(localStorage.getItem('aifilterss'))
    return (
      fils?.areas.length > 0 ||
      fils?.shifts.length > 0 ||
      fils?.date !== today ||
      fils?.week !== "" ||
      fils?.month !== "" ||
      fils?.starting !== "" ||
      fils?.ending !== ""
    );
  };

  useEffect(() => {
    getAiReportsCardsFunc()
    let getfils = JSON.parse(localStorage.getItem('aifilterss'))

    if (!getfils) {
      localStorage.setItem('aifilterss', JSON.stringify(filters))
    }
    const fils = JSON.parse(localStorage.getItem('aifilterss'))
    if (fils.areas.length > 0 || fils.shifts.length > 0 || fils.date !== '' || fils.month !== '' || fils.week !== getCurrentWeek() || fils.starting !== '' || fils.ending !== '') {
      setShowButtons(true)
    }
    if (fils.month !== '') {
      setMonthShow(true);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
      setSelectedOption('Month')
    } else if (fils.date !== '') {
      setMonthShow(false);
      setDateShow(true);
      setWeeklyShow(false);
      setCustomDate(false);
      setSelectedOption('Daily')

    } else if (fils.week !== '') {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(true);
      setCustomDate(false);
      setSelectedOption('Week')

    } else if (fils.starting !== '' || fils.ending !== '') {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(true);
      setSelectedOption('Custom')

    }

  }, [])

  const typeHeadChange = (field, selected) => {
    setShowButtons(true);
    setFilters((prevFilters) => {
      const update = {
        ...prevFilters,
        [field]: field == 'areas' ? selected.map((a) => a.split(',')[0]) : selected
      }
      localStorage.setItem('aifilterss', JSON.stringify(update))
      return update
    });
  };

  const handleDateDrop = (e) => {
    setSelectedOption(e.target.value); // Update the dropdown value based on user selection
    setShowButtons(true);
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

  const handleInputChange = (e, field) => {
    setShowButtons(true);
    let value = e.target.value;
    if (field === "week" && value) {
      // When a week is selected, clear both date, month, and custom date range fields
      setIdentifier("week");
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          week: value,
          date: "", // Clear the date
          month: "", // Clear the month
          starting: "", // Clear starting date
          ending: "", // Clear ending date
        }
        localStorage.setItem('aifilterss', JSON.stringify(update))
        return update
      });
    } else if (field === "month" && value) {
      setIdentifier("month");
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          week: "",
          date: "", // Clear the date
          month: value, // Clear the month
          starting: "", // Clear starting date
          ending: "", // Clear ending date
        }
        localStorage.setItem('aifilterss', JSON.stringify(update))
        return update
      });
    } else if (field === "date" && value) {
      setIdentifier("date");
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          week: "",
          date: value, // Clear the date
          month: "", // Clear the month
          starting: "", // Clear starting date
          ending: "", // Clear ending date
        }
        localStorage.setItem('aifilterss', JSON.stringify(update))
        return update
      });
    } else if (field === "starting" || field === "ending") {
      // When a custom date range is selected, clear date, month, and week
      setIdentifier("custom");
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          [field]: value,
          week: "",
          date: "", // Clear the date
          month: "", // Clear the month
        }
        localStorage.setItem('aifilterss', JSON.stringify(update))
        return update
      });
    } else {
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          [field]: value,
        }
        localStorage.setItem('aifilterss', JSON.stringify(update))
        return update
      });
    }
  };
  const handleInputChangeShift = (e, field) => {
    const { value } = e.target;

    setFilters((prev) => {
      const update = {
        ...prev,
        [field]: value,
      }

      localStorage.setItem('aifilterss', JSON.stringify(update))
      return update

    });




  };

  function Reset() {
    //  localStorage.removeItem('aifilterss')
    const updatefils = {
      areas: [],
      shifts: [],
      date: "",
      week: getCurrentWeek(),
      month: "",
      starting: "",
      ending: "",
    }
    setFilters(updatefils);
    localStorage.setItem('aifilterss', JSON.stringify(updatefils))
    getSubareasDetails()


  }

  async function ApplyFilter() {
    console.log('applying', filters)
    // localStorage.setItem('aifilterss', JSON.stringify(filters))
    const fils = JSON.parse(localStorage.getItem('aifilterss'))


    if (dateShow) {
      if (fils?.date == "") {
        errorToast("Choose The Date");
        return;
      }
    } else if (weeklyShow) {
      if (fils?.week == "") {
        errorToast("Choose The Week");
        return;
      }
    } else if (monthShow) {
      if (fils?.month == "") {
        errorToast("Choose The Month");
        return;
      }
    } else if (customDate) {
      if (fils?.starting == "" || fils?.ending == "") {
        errorToast("Choose Both ranges");
        return;
      }
    }




    const payload = {
      safety_area: fils?.areas,
      shift: fils?.shifts,
      factory_id: factoryID,
      start_date:
        fils?.starting !== ""
          ? formatDate(fils?.starting)
          : fils?.date == ""
            ? ""
            : formatDate(fils?.date),
      end_date:
        fils?.ending !== ""
          ? formatDate(fils?.ending)
          : fils?.date == ""
            ? ""
            : formatDate(fils?.date),
      week: fils?.week,
      month: fils?.month,
    };

    getSubareasDetails(payload)



  }

  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;


  ////filters new code 
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

  //filters end
  const setDataFormat = (data) => {
    try {
      const correctFormat = data.flatMap((item, key) => {
        const groupedSubareas = item.SubAreas.reduce((acc, subarea) => {
          if (!acc[subarea.SubAreaName]) {
            acc[subarea.SubAreaName] = {
              totalCompliance: 0,
              totalViolations: 0,
              subareaName: subarea.SubAreaName,
              violations: subarea.Violations,
              cameraCount: 0,
              Modules: subarea.Modules
            };
          }
          acc[subarea.SubAreaName].totalCompliance += subarea.Compliance;
          acc[subarea.SubAreaName].totalViolations += subarea.Violations;
          acc[subarea.SubAreaName].cameraCount += 1;
          return acc;
        }, {});
        console.log(groupedSubareas)

        return Object.values(groupedSubareas).map((subarea) => {
          const total = subarea.totalCompliance + subarea.totalViolations;
          const calculated = total ? ((subarea.totalCompliance / total) * 100).toFixed(0) : 0;
          const violationss = subarea.totalViolations
          console.log(groupedSubareas)
          return {
            areaName: item.AreaName,
            areaOwner: item.AreaOwner,
            totalCameras: subarea.cameraCount,
            subareaName: subarea.subareaName,
            alerts: violationss,
            calculated,
            compliance: calculated > 0 ? calculated : subarea.violations == 0 ? 100 : 0,
            Modules: subarea.Modules
          };
        });
      });
      return correctFormat
    } catch (error) {
      errorToast('Error found in data format');
      console.log(error)
    }
  }

  const getSubareasDetails = async () => {
    setloading(true)
    try {
      const fils = JSON.parse(localStorage.getItem('aifilterss'))
      const payload = 
      {
        safety_area: fils?.areas,
        shift: fils?.shifts,
        start_date:
          fils?.starting !== ""
            ? formatDate(fils?.starting)
            : fils?.date == ""
              ? ""
              : formatDate(fils?.date),
        end_date:
          fils?.ending !== ""
            ? formatDate(fils?.ending)
            : fils?.date == ""
              ? ""
              : formatDate(fils?.date),
        weekly: fils?.week,
        factory_id: factoryID,
        month: fils?.month,
        user_id: JSON.parse(localStorage.getItem('userData'))?.id, 
      }
      setSubAreaFiltersContext(payload)
      // const res = await AreaService.getAiReportsCards(payload);
      const res = await AreaService.getAlertsCount(payload);
      if (res.status == 200) {
        // const finalData = setDataFormat(res?.data);
        console.log(res?.data) 
        // setSubAreaDetails(finalData)
        setmemberss(res?.data);
        setloading(false)
      }
    } catch (error) {
      errorToast('Error while fetching data');
      console.log(error)
      return
    }
  }
  useEffect(() => {
    getSubareasDetails()
  }, [])

  const filterStyle = {
    minWidth: "182px",
    width: "182px",
    maxWidth: "182px",
    height: "38px",
    fontSize: 13,
  };

  const navigate = useNavigate()

  function handleNavigate(details) {
    console.log('show navigation details', details)
    localStorage.setItem('subAreaPayload', JSON.stringify(details))
    navigate(`${process.env.PUBLIC_URL}/sub-area-analysis/alerts/${JSON.parse(localStorage.getItem('role'))}`)
  }
  return (
    <div className="container-fluid py-3">
      <Row className='mb-2'>
        <Col>
          <h5>Sub Area Analysis</h5>
          <span className="f-light"> {
            filters.week && formatWeek(filters.week)
            ||
            filters.month && formatMonth2(filters.month)
            ||
            filters.starting && `${filters.starting}  -  ${filters.ending}`} </span>
        </Col>
         <Col xs="12" sm='5' md='6'
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
            {showFilters && (
              <div
                style={{ zIndex: "2" }}
                className={`d-flex align-items-center justify-content-end gap-2 py-3 filter-cardd shadow-sm`}
                ref={filterCardRef}
              >
                <div className="w-100 d-flex justify-content-center flex-column">
                  <DateFilter
                    maxWeek={getCurrentWeek()}
                    allarea={allarea}
                    showAreaFilter={true}
                    // allData={allData}
                    style={filterStyle}
                    shouldShowButton={shouldShowButton}
                    selectedOption={selectedOption}
                    currentWeek={getCurrentWeek()}
                    typeHeadChange={typeHeadChange}
                    filters={filters}
                    handleDateDrop={handleDateDrop}
                    handleInputChange={handleInputChange}
                    dateShow={dateShow}
                    monthShow={monthShow}
                    weeklyShow={weeklyShow}
                    // customDate={customDate}
                    shiftNotShow={true}
                  />
                  <FormGroup className='mx-2 align-self-center'>
                    <CommonFIlterButton
                      data={Shifts}
                      handleInputChange={handleInputChangeShift}
                      style={filterStyle}
                      selectedItem={filters?.shifts}
                      firstOption={"Select Shift"}
                      inputChangeOption={"shifts"}
                    // clName={` ${filters?.shifts}`}
                    />
                  </FormGroup>

                  {showButtons && (
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                      <Button
                        style={filterStyle}
                        className={`mx-2 p-0 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                        onClick={ApplyFilter}
                        color=""
                      >
                        <IoCheckmarkOutline
                          style={{
                            color: "#22c65e",
                            fontSize: "20px",
                            transform: "rotate(20deg)",
                          }}
                        />
                        <p
                          style={{ color: "#22c65e" }}
                          className="m-0 p-0 "
                        >
                          {" "}
                          Accept
                        </p>
                      </Button>
                      <Button
                        style={filterStyle}
                        className={`mx-2 mt-3 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                        onClick={Reset}
                        color=""
                      >
                        <RxReset
                          style={{
                            color: "#4e74d4",
                            fontSize: "20px",
                            // transform: "rotate(20deg)",
                          }}
                        />
                        <p
                          style={{ color: "#4e74d4" }}
                          className="m-0 p-0 "
                        >
                          {" "}
                          Reset
                        </p>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>



        </Col> 

      </Row>

      {loading ? (
        <Loader1 />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-3 row-cols-2xl-4 g-4">
          {memberss?.alertsGateCount?.map((member, index) => {
            let className = '';
            let classNameForArea = '';
            if (member?.compliance < 50) {
              className = 'com-red-color';
              classNameForArea = 'bg-red-color';
            } else if (member?.compliance >= 50 && member?.compliance < 80) {
              className = 'com-yellow-color';
              classNameForArea = 'bg-yellow-color';
            } else {
              className = 'com-green-color';
              classNameForArea = 'bg-green-color';
            }

            return (
              <div key={index} className="col" data-aos="fade-up" data-aos-delay={index * 100}>
                <div 
                //  onClick={() => handleNavigate(member)} 
                 className="card h-100 shadow-sm d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex gap-2" style={{ width: '85%' }}>
                        <Layers color="#1e67d6" size={20} style={{ width: 'max-content' }} />
                        <div>
                          <h6 className="card-title m-0 p-0">
                           Gate {member.gate}
                           {/* {member.subareaName?.charAt(0).toUpperCase() + member.subareaName?.slice(1).toLowerCase()} */}
                          </h6>

                          <p className="f-light m-0 p-0">{member.areaOwner}</p>
                        </div>
                      </div>
                      <span className={`badge align-self-start`} style={{ backgroundColor: '#1e67d6' }}>
                        {member.areaName}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <p className="card-text d-flex align-items-center gap-2 m-0">
                        <Camera
                          fill="#1e67d6"
                          color="#fff"
                          size={25}
                          style={{ transition: '0.3s' }}
                        />
                        {member.totalCameras > 1 ? (
                          <div>
                            <span>
                              <b>{member.totalCameras}</b>
                            </span>{' '}
                            <span>Cameras</span>
                          </div>
                        ) : (
                          <div>
                            <span>
                              <b>{member.totalCameras || 1}</b>
                            </span>{' '}
                            <span>Camera</span>
                          </div>
                        )}
                      </p>
                      <p className="m-0 p-0">
                        <b>{member.alerts_count}</b> Alerts
                      </p>
                    </div>
                    <div className="d-flex flex-wrap">
                      {memberss.alertsBarChart?.map((name, key) => (
                        <p key={key} className="f-light ms-0 me-1 my-0"> 
                          {name.module || 'Axens Module'} 
                          {key + 1 === memberss.alertsBarChart.length ? null : ' |'}
                        </p>
                      ))}
                    </div>
                    {/* Push the progress bar to the bottom */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span>Compliance</span>
                        <span className={`f-light fw-bold`}>{member.compliance_percentage}%</span>
                      </div>
                      <div className="progress" style={{ height: '10px' }}>
                        <div
                          className={`progress-bar progress-bar-striped progress-bar-animated ${classNameForArea}`}
                          role="progressbar"
                          style={{ width: `${member.compliance_percentage}%` }}
                          aria-valuenow={member.compliance_percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

  );
}

