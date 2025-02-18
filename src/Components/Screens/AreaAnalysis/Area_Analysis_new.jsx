import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Card, Col, Container, FormGroup, Row } from "reactstrap";
import DetailCard from "./Components/DetailsCard/Detail_Card";
import Loader1 from "../../../CommonElements/Spinner/loader";
import AreaService from "../../../api/areaService";
import { getCurrentWeekWithYear } from "../../../utils/currentWeekWithYear";
import { errorToast, getWeek } from "../../../_helper/helper";
import { Filter } from "react-feather";
import DateFilter from "../GlobalUser/AIModelReports/Components/Dates/DateFilter";
import CommonFIlterButton from "../../Common/commonFilterButton/CommonFIlterButton";
import { Shifts } from "../../../Data/staticData/data";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { formatMonth2, formatWeek } from "../../../utils/formatDate";
import areaAnalysisContext from "../../../_helper/formData/AreaAnalysis/AreaAnalysisContext";
import SubAreaCard from "./NewDesigns/Area_Analysis_Components/Area_Analysis_Card";

const Area_Analysis_new = () => {
  const currentWeekk = getCurrentWeekWithYear();
  const [loader, setloader] = useState(true);
  const [allData, setAllData] = useState([]);
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const [areaData, setareaData] = useState([]);
  const {areaFiltersContext,
    setAreaFiltersContext,
    areaDetails,
    setAreaDetails} = useContext(areaAnalysisContext)

  //filters code
  const today = new Date().toISOString().split("T")[0];
  const [selectedOption, setSelectedOption] = useState("Week");
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(false);
  const [weeklyShow, setWeeklyShow] = useState(true);
  const [customDate, setCustomDate] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [showFilters, setShowFilters] = useState(false)
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);
  let getfilss = JSON.parse(localStorage.getItem('areaAnalysisFilters'))
  const [getfils, setGetfils] = useState(getfilss)
  const [filters, setFilters] = useState({
    areas: getfils?.areas ? getfils?.areas : [],
    shifts: getfils?.shifts || '',
    date: getfils?.date || "",
    week: getfils?.week || getCurrentWeekWithYear(),
    month: getfils?.month || "",
    starting: getfils?.starting || "",
    ending: getfils?.ending || "",
  });




  console.log('filterssttttts', filters)
  const [allarea, setallarea] = useState([]);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };



  const shouldShowButton = () => {
    const fils = JSON.parse(localStorage.getItem('areaAnalysisFilters'))
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

    let getfils = JSON.parse(localStorage.getItem('areaAnalysisFilters'))

    if (!getfils) {
      localStorage.setItem('areaAnalysisFilters', JSON.stringify(filters))
    }
    else{
      setFilters(getfils)
    }
    const fils = JSON.parse(localStorage.getItem('areaAnalysisFilters'))
    if (fils.areas.length > 0 || fils.shifts.length > 0 || fils.date !== '' || fils.month !== '' || fils.week !== getCurrentWeekWithYear() || fils.starting !== '' || fils.ending !== '') {
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
      localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
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
        localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
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
        localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
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
        localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
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
        localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
        return update
      });
    } else {
      setFilters((prevFilters) => {
        const update = {
          ...prevFilters,
          [field]: value,
        }
        localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
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

      localStorage.setItem('areaAnalysisFilters', JSON.stringify(update))
      return update

    });




  };

  function Reset() {
    //  localStorage.removeItem('areaAnalysisFilters')
    const updatefils = {
      areas: [],
      shifts: [],
      date: "",
      week: getCurrentWeekWithYear(),
      month: "",
      starting: "",
      ending: "",
    }
    setFilters(updatefils);
    localStorage.setItem('areaAnalysisFilters', JSON.stringify(updatefils))

    const payload = {
      ...updatefils,
      factory_id: factoryID,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
    }

    getAiReportsCardsFunc(payload)



  }

  async function ApplyFilter() {
    console.log('applying', filters)
    // localStorage.setItem('areaAnalysisFilters', JSON.stringify(filters))
    const fils = JSON.parse(localStorage.getItem('areaAnalysisFilters'))


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
      factory_id: factoryID,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
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
      week: fils?.week,
      month: fils?.month,
    };


    getAiReportsCardsFunc(payload)





  }

  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
  //filters states


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


  const filterStyle = {
    minWidth: "132px",
    width: "140px",
    maxWidth: "145px",
    height: "38px",
    fontSize: 13,
  };

  //filters code end ////////



  useEffect(() => {
    // const payload = {
    //   // safety_area: area_id ? [area_id] : filters.areas ,
    //   // shift: filters.shifts ,
    //   // start_date: filters.starting!=='' ? formatDate(filters.starting) : filters.date=='' ? '' : formatDate(filters.date),
    //   // end_date: filters.ending!=='' ? formatDate(filters.ending) : filters.date=='' ? '' : formatDate(filters.date),
    //   week: currentWeekk,
    //   factory_id:factoryID,
    //   user_id:JSON.parse(localStorage.getItem('userData'))?.id
    // };
    const fils = JSON.parse(localStorage.getItem('areaAnalysisFilters'))
    const payload = {
      factory_id: factoryID,
      user_id: JSON.parse(localStorage.getItem('userData'))?.id,
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
      week: fils?.week,
      month: fils?.month,
    };
    getAiReportsCardsFunc(payload);
  }, []);

  async function getAiReportsCardsFunc(payload) {
    setloader(true);
    try {
      setAreaFiltersContext(payload)
      const res = await AreaService.getAiReportsCards(payload);
      console.log(res.data)
      setAreaDetails(res?.data)
      setAllData(res.data);
      setloader(false);
    } catch (error) {
      console.log(error);
      errorToast('Erroe while fetching areas')
    }
  }

  return (
    <>
      <br />
      <Container fluid={true}>
        <Row className="mb-2">
          <Col>
            <h5>Area Analysis</h5>
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
                      maxWeek={getCurrentWeekWithYear()}
                      // allData={allData}
                      area={true}
                      style={filterStyle}
                      shouldShowButton={shouldShowButton}
                      selectedOption={selectedOption}
                      currentWeek={getCurrentWeekWithYear()}
                      typeHeadChange={typeHeadChange}
                      filters={filters}
                      handleDateDrop={handleDateDrop}
                      handleInputChange={handleInputChange}
                      dateShow={dateShow}
                      monthShow={monthShow}
                      weeklyShow={weeklyShow}
                      customDate={customDate}
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

        {loader ? (
          <Loader1 />
        ) : (
          <Row>
            {allData.map((items) => (
              <Col xxl="3" xl="4" lg="6" md="6">
                <SubAreaCard
                  allData={allData}
                  setAllData={setAllData}
                  items={items}
                  areaData={areaData}
                  filters={filters}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Area_Analysis_new;
