import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, FormGroup, Input } from 'reactstrap';
import { Row, Col, Card } from "react-bootstrap";
import TopLeaderCard from './Component/Top_Leader_Card';
import Table from './Component/Table/DataTable'
import Loader1 from "../../../../CommonElements/Spinner/loader";
import DatePicker from "react-datepicker";
import './style/style.css';
import YearPicker from './Component/YearComponent/Select_Year';
import AreaService from '../../../../api/areaService';
import { errorToast } from '../../../../_helper/helper';
import { Filter } from "react-feather";
import { getCurrentWeekWithYear } from '../../../../utils/currentWeekWithYear';
import { getPreviousWeekWithYear } from '../../../../utils/getPreviousWeekWithYear';
import { formatWeek } from '../../../../utils/formatDate';
import PDFContext from '../../../../_helper/formData/LiveAnalytics/LiveAnalytics'

const LeaderBoard = () => {
  const [Leaders, setLeaders] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [FileteredLeaders, setFileteredLeaders] = useState([])
  const [FileteredTable, setFileteredTable] = useState([])
  const [loader, setLoader] = useState(true);
  const [filterType, setFilterType] = useState('today');
  const [currentweek, setcurrentweek] = useState('');
    const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  
  const [filterTable, setfilterTable] = useState([])
  const [filters, setFilters] = useState({
    week:  getCurrentWeekWithYear(),
    month: '',
    year: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const {setleaderscontext,setfiltertablecontext,setfilteredleaderscontext,setfilteredtablecontext,settabledatacontext, setleaderpagefilterscontext} = useContext(PDFContext)

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');

  const employeeData = [
    {
      Name: "Adil",
      Phone: "+92 300 123 4567",
      Score: 101,
      Status: "Active",
      totalalert: '101',
      areaid: 'AO-1',
      points: 30,
      compliance: 40,
      time: '7 mins'
    },
    {
      Name: "Aftab",
      Phone: "+92 301 234 5678",
      Score: 99,
      Status: "Active",
      totalalert: '114',
      areaid: 'AO-2',
      points: 30,
      compliance: 40,
      time: '7 mins'
    },
  
  ];

  useEffect(() => {
    
  const fils = JSON.parse(localStorage.getItem('leaderfilters'))
  if(!fils){
    localStorage.setItem('leaderfilters',JSON.stringify(filters))
  }
  else{
    setFilters(fils)
    // setleaderpagefilterscontext(fils)
  }
   
  }, [])
  

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);

    if (e.target.value == 'monthly') {
      setFilters({
        ...filters,
        week: ''
      })
    }
    else if (e.target.value == 'weekly') {
      setFilters({
        ...filters,
        month: ''
      })
    }
    else {
      console.log('hello broo')
      setFileteredLeaders([]);
      setfilteredleaderscontext([])
      setFileteredTable([]);
      setfilteredtablecontext([])
      setfilterTable([])
      setfiltertablecontext([])
      setFilters({
        month: '',
        week: ''
      })
    }
  };
  const handleYearChange = date => {
    setFilters({ ...filters, year: date });
  };

  const getCurrentWeek = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1); // January 1st
    const daysPassed = (today - firstDayOfYear) / 86400000; // Convert milliseconds to days
    let currentWeekNumber = Math.ceil((daysPassed + firstDayOfYear.getDay() + 1) / 7); // Week calculation

    // Previous week number
    let previousWeekNumber = currentWeekNumber - 1;

    if (previousWeekNumber < 1) {
      // If it is the first week and we subtract one, calculate the last week of the previous year
      const lastDayOfLastYear = new Date(currentYear - 1, 11, 31); // December 31st of the last year
      const firstDayOfLastYear = new Date(currentYear - 1, 0, 1); // January 1st of the last year
      const daysInLastYear = (lastDayOfLastYear - firstDayOfLastYear) / 86400000;
      const lastYearWeekNumber = Math.ceil((daysInLastYear + firstDayOfLastYear.getDay() + 1) / 7);
      previousWeekNumber = lastYearWeekNumber;
    }

    return previousWeekNumber;
  };

  const handleInputChange = (e, field) => {
    
    console.log('filed', e.target.value)
    if (field === 'week') {
      setFilters({
        ...filters,
        [field]: e.target.value,
        month: ''
      });
   
    } if (field === 'month') {
      setFilters({
        ...filters,
        [field]: e.target.value,
        week: ''
      });

    }
    if(e.target.value === '') {
      errorToast('At least one filter is required. The current week is automatically selected.')
      if(field === 'month') {
        setFilters({
          ...filters,
          month: '',
          week: getCurrentWeekWithYear()
        });
  
      }else if(field === 'week') {
        setFilters({
          ...filters,
          month: '',
          week: getCurrentWeekWithYear()
        });
 
      }
      
    }

    console.log("all filters", filters);
  };

  useEffect(() => {
    const weekNumber = getCurrentWeek();
    const maxWeek = getCurrentWeekWithYear()
    console.log(maxWeek)
    setcurrentweek(maxWeek);
  }, [])


  console.log("adfadfad", currentweek, getCurrentWeekWithYear())
  const updateCompliance = (data) => {
    console.log("timmeeeee",data.time)
    return data.map(item => {
      if (item.totalalert === 0) { // Ensure no division by zero
        const compliancePercentage = 100
        return {
          ...item,
          compliance: compliancePercentage,
          highseverityalerts: '9%',
          points: compliancePercentage >= 80 ? 100 : 75,
          time: '10'
        };
      } else if (item.totalalert > 0) {
        const compliancePercentage = (item.compliance / (item.totalalert + item.compliance)) * 100;
        return {
          ...item,
          compliance: compliancePercentage.toFixed(0),
          highseverityalerts: '9%',
          points: compliancePercentage >= 80 ? 100 : 75,
          time: '10'
        };
      }
      return item;
    });
  };
  const sortData = (data) => {
    return data.sort((a, b) => {
      // Check if the points are equal
      if (a.points === b.points) {
        return a.totalalert - b.totalalert; // Sorting by totalalert if points are equal, lower first
      }
      // Otherwise, sort by points, higher first
      return b.points - a.points;
    });
  };
  function fWeekForAPI() {
    const currentDate = new Date(); // Get the current date
    const startDate = new Date(currentDate.getFullYear(), 0, 1); // First day of the current year
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000)); // Difference in days

    let weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7); // Calculate the week number
    // if (startDate.getDay() > 4) {
    //   weekNumber -= 1; // Adjust if year started on a weekend
    // }

    // Format the week number to match "YYYY-WW" format
    return `${currentDate.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
  }

  const fetchleaderboard = async () => {
    const weeknumber = getCurrentWeekWithYear()
    const fils = JSON.parse(localStorage.getItem('leaderfilters'))
    try {
      const payload = {
        flag: true,
        factory_id:factoryID,
        week: fils.week
      };
      setleaderpagefilterscontext(fils)
      const res = await AreaService.fetchDataForLeaderBoard(payload);
      if (res.data) {
        // const data = updateCompliance(res.data);
        const data = res.data;
        const updatedData = data.map(item => ({
          ...item,
          time: Math.round(item.time / 60).toFixed(0) // Convert time from seconds to minutes
        }));
        const finalData = sortData(updatedData);
        console.log('Sorted Data:', finalData);
        setLeaders(finalData.slice(0, 3));
        setleaderscontext(finalData.slice(0, 3))
        setTableData(finalData.slice(3));
        settabledatacontext(finalData.slice(3))
      } else {
        console.log('No data returned from fetch operation');
      }
      setLoader(false);
    } catch (error) {
      console.error('Error while fetching leaderboard data', error);
      errorToast('Error while fetching leaderboard data');
    }
  };

  useEffect(() => {
    fetchleaderboard();
  }, []);


  console.log('table Data=>', TableData)

  const handlefiltertarget = async () => {
   localStorage.setItem('leaderfilters',JSON.stringify(filters))
    try {
      if (!filters.week && !filters.month) {
        errorToast('Please select any week or year')
      }
      setLoader(true);
      const payload = {
        flag: true,
        month: filters.month,
        factory_id:factoryID,
        week: filters.week
      }
      setleaderpagefilterscontext(filters)
      console.log(payload);
    setShowFilters(!showFilters)
      const res = await AreaService.fetchDataForLeaderBoard(payload);
      if (res.data) {
        const data = res.data
        const updatedData = data.map(item => ({
          ...item,
          time: Math.round(item.time / 60).toFixed(0) // Convert time from seconds to minutes
        }));
        console.log('Updated Data:', data);
        const finalData = sortData(updatedData);
        console.log('Sorted Data:', finalData);
        setfilterTable(finalData)
        settabledatacontext(finalData)
        setFileteredLeaders(finalData.slice(0, 3));
        setleaderscontext(finalData.slice(0, 3))
        setFileteredTable(finalData.slice(3));
        settabledatacontext(finalData.slice(3))
        setLoader(false);
      } else {
        setLoader(false);
        console.log('No data returned from fetch operation');
      }
    } catch (error) {
      errorToast('Error while fetching leaderboard data')
    }
  }

  //filter button code 
  const filterButton = useRef(null);
  const filterCardRef = useRef(null);
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

  return (
    <Fragment>
      <br />

      <Container fluid={true} className='pb-5'>
        <Row>
          <Col sm='4'>
          <h5 style={{ fontSize: '22px' }}>Leaderboard</h5>
          <span>{formatWeek(filters.week)}</span>
          </Col>
          <Col sm='8' className='d-flex  justify-content-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end'>
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
          </Col>
        </Row>
        <div className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
         
          <div className="w-100 d-flex justify-content-end position-relative">
            {showFilters && <div className={`d-flex align-items-center justify-content-end gap-2 py-3 filter-card shadow-sm`}
              ref={filterCardRef}
            >
              <div className='d-flex align-items-center justify-content-center flex-wrap gap-2 filtersbtngroupofleader'>

                <div className='mx-1'>
                  <Input style={{ width: '170px' }} type="week" value={filters.week} max={currentweek} onChange={(e) => { handleInputChange(e, 'week'); }} />
                </div>

                {/* <div className='mx-1'>
                  <Input style={{ width: '170px' }} type="month" value={filters.month} max={`${currentYear}-${currentMonth}`} onChange={(e) => { handleInputChange(e, 'month'); }} />
                </div> */}

                <Button style={{ width: '170px' }} className='btn brn-primary applyfilterbtn' color='primary' onClick={handlefiltertarget} >Apply filter</Button>
              </div>

            </div>}
          </div>
        </div>
        {loader ? (
          <Loader1 />
        ) : (
          <>
            <Row>
              {FileteredLeaders?.length > 0 ?
                FileteredLeaders.map((data, key) => (
                  <Col md='6' lg='6' xl='4' key={key}>
                    <Card  style={{ border: '2px solid #d9e6fc', boxShadow: 'none', height: '441px', position:'relative' }}>
                      <TopLeaderCard data={data} rank={key} />
                    </Card>
                  </Col>
                ))
                :
                Leaders?.map((data, key) => (
                  <Col md='6' lg='6' xl='4' key={key}>
                    <Card style={{ border: '2px solid #d9e6fc', boxShadow: 'none', height: '441px', position:'relative' }}>
                      <TopLeaderCard data={data} rank={key} />
                    </Card>
                  </Col>
                ))
              }

            </Row>
            <h5>Ranks</h5>

            <Table filterTable={filterTable} filterType={filterType} data={FileteredTable.length > 0 ? FileteredTable : filterTable.length > 0 ? FileteredTable : TableData} />

          </>
        )}
      </Container>

    </Fragment>
  );
};

export default LeaderBoard;
