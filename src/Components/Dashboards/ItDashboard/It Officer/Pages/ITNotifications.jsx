import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../Styling/itStyle.css'
// import Loader3 from '../../../../CommonElements/Spinner/loader3'
import Loader from '../../../../../CommonElements/Spinner/loader'

// import deleteIcon from '../../../assets/SuperAdminIcons/Delete.png';
import deleteIcon from '../../../../../assets/SuperAdminIcons/Delete.png';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import search from '../../../../../assets/SuperAdminIcons/Search.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ItDataTable from '../Components/Table/ItDataTable';
import Calender from '../Components/Calender';
import { H3, H4 } from '../../../../../AbstractElements';
import SearchInput from '../../../../Common/Search Input/searchInput';
import DateTime from '../../../CompanyDashbaord/Components/DateTime';
import LiveAlertsFilters from '../../../AreaDashbaord/reports/Components/DateFilters/LiveAlertsFilters';
import { MarginLeft, MarginRight } from '../../../../../Constant';
import itService from '../../../../../api/itService';
import MonitorTable from '../Components/Table/MonitorTable';
import CommonFIlterButton from '../../../../Common/commonFilterButton/CommonFIlterButton';


const ITNotifications = () => {
  const tableColumns = [
    { name: 'Operation', selector: row => row.operation, sortable: true, grow: 3, cell: (row) => (
      <div style={{ textAlign: 'left', padding: '5px' }}>
        {row.operation}
      </div>
    ),},
    { name: 'User Name', selector: row => row.username, sortable: true, grow: 1, center: false },
    // { 
    //     name: 'Status', 
    //     cell: row => (
    //         <button type="button" className="btn btn-success">{row.status}</button>
    //     )
    // },
    { name: 'Timestamp', selector: row => row.timestamp, sortable: true, grow: 2, cellClass: 'table-column-timestamp', },

    // { 
    //     name: 'Delete',  cellClass: 'table-column-delete' ,
    //     cell: row => (
    //         <div>
    //             <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
    //                 <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
    //             </button>
    //         </div>
    //     ),
    //     style: { width: '15%' }, cellClass: 'table-column-delete'
    // },


  ];

  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredRows, setFilteredRows] = useState(undefined);
  const [filter, setFilter] = useState({
    userName: ''
  })
  // const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  // const [showDate, setfirst] = useState(second)


  // useEffect(() => {
  //     const notificationsIT = JSON.parse(localStorage.getItem('notificationsIT')) || [];
  //     console.log("notificationsIT", notificationsIT)
  //     setData(notificationsIT);
  //     setFilteredRows(notificationsIT); // Initialize filteredRows with all data
  // }, []);
  useEffect(() => {
    const notificationsIT = JSON.parse(localStorage.getItem('notificationsIT')) || [];

    // Process notifications to capitalize role and split by hyphen if necessary
    // const processedNotifications = notificationsIT.map(notification => {
    //     const roleSplit = notification.role.split('-').map(el => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase());
    //     const capitalizedRole = roleSplit.join(' '); // Join with a space between words
    //     return {
    //         ...notification,
    //         role: capitalizedRole // Update the role field with the formatted role
    //     };
    // });

    // console.log("Processed Notifications:", processedNotifications);

    // Update state with processed data
    // setData(notificationsIT);
    // setFilteredRows(notificationsIT); // Initialize filteredRows with all data
  }, []);

  const handleDeleteClick = (row) => {
    const updatedData = data.filter(item => item !== row);
    setData(updatedData);
    setFilteredRows(updatedData);
    localStorage.setItem('notificationsIT', JSON.stringify(updatedData));
  };

  const handleEditClick = () => {
    // Functionality for handling edit clicks if needed
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
    if (!e.target.value.trim()) {
      setFilteredRows(e.target.value);
      return;
    }
    // Filter notifications based on the search input
    const filtered = data.filter(item =>
      item.operation.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredRows(filtered);
  };
  const todayy = new Date().toISOString().split("T")[0];
  const style = {
    minWidth: "132px",
    width: '140px',
    maxWidth: "145px",
    height: "47px",
    fontSize: 13,
  };
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(false);
  const [weeklyShow, setWeeklyShow] = useState(false);
  const [customDate, setCustomDate] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Date");
  const [loader, setLoader] = useState(true)
  // const [userNames, setUserNames] = useState(JSON.parse(localStorage.getItem('filterNames')) || [])
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
  const currentWeekk = getCurrentWeek();
  const [newFilters, setNewFilters] = useState({
    module: "",
    severity: "",
    shift: "",
    date: todayy,
    week: '',
    month: '',
    starting: "",
    ending: "",
  });
  const handleDateDrop = (e) => {
    setSelectedOption(e.target.value); // Update the dropdown value based on user selection
    if (e.target.value == "Select Date") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Month") {
      setMonthShow(true);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Date") {
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
  const handleNewInputChange = (e, field) => {
    let value = e.target.value;

    if (field === "week" && value) {
      // When a week is selected, clear both date, month, and custom date range fields
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        week: value,
        date: '',  // Clear the date
        month: '', // Clear the month
        starting: '', // Clear starting date
        ending: '',   // Clear ending date
      }));
    } else if (field === "month" && value) {
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        month: value,
        date: '', // Clear the date when a new month is selected
        week: '', // Clear the week when a new month is selected
        starting: '', // Clear starting date
        ending: '',   // Clear ending date
      }));
    } else if (field === "date" && value) {
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        date: value,
        month: '', // Clear the month when a new date is selected
        week: '',  // Clear the week when a new date is selected
        starting: '', // Clear starting date
        ending: '',   // Clear ending date
      }));
    } else if (field === "starting" || field === "ending") {
      // When a custom date range is selected, clear date, month, and week
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
        date: '',  // Clear the date
        month: '', // Clear the month
        week: '',  // Clear the week
      }));
    } else {
      // Default case for other filters
      setNewFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
      }));
    }
  };

  useEffect(() => {
    const payload = {
      username: ''
    }
    getActivityLogs(payload)
  }, [])

  const getActivityLogs = async (payload) => {
    
    const res = await itService.activityLogs(payload)
    if (res.status === 200) {
      setData(res?.data?.data);

      const newData = Array.from(new Set(res?.data?.data?.map((d) => d.username)))
      console.log('newDatanewData', newData)
      // JSON.stringify(localStorage.setItem('filterNames', newData))
    }
    setLoader(false)
    console.log('responnn', res)
  }

  const handleFilterChange = (e, field) => {
    const value = e.target.value;
    setFilter((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  
    // Prepare the payload for the API call
    const payload = {
      username: value, // Pass the selected username as the filter
    };

    setLoader(true)
    getActivityLogs(payload)

  };
  
console.log('datdfadsgaa')

  const filterStyles = {
    width: "160px",
    height: "38px",
    fontSize: 13,
    margin: "5px 3px",
    display: "inline-block",
  };
  return (
    <div>
      <br />
      <Container fluid={true}>
        <h5 className='mb-3'>Activity Monitor</h5>
        <Row className=' mb-3'>
          <Col xl='5' lg='5' md='5' sm='5' xs='12'>
            <Card className='shadow-none m-0 '>
              <CardBody className='d-flex justify-content-start align-items-center' style={{ padding: '12px 12px 12px 20px', height: '47px' }}>
                <img src={search} alt="search icon" style={{ width: '16px', height: '16px', marginRight: '15px', marginTop: '2px' }} />
                <input
                  type="text"
                  placeholder='Search activity'
                  value={searchItem}
                  onChange={handleSearch}
                  style={{ width: '100%', border: '0px', fontSize: '16px', padding: '0px', margin: '0px' }}
                />
              </CardBody>
            </Card>
          </Col>
          {/* <LiveAlertsFilters  handleDateDrop={handleDateDrop} currentWeekk={currentWeekk} style={style} handleNewInputChange={handleNewInputChange} newFilters={newFilters} selectedOption={selectedOption} dateShow={dateShow} monthShow={monthShow} weeklyShow={weeklyShow} customDate={customDate} /> */}
          {/* <Col className='flex-wrap d-flex justify-content-start justify-content-sm-start justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-start' xl='7' lg='7' md='7' sm='7' xs='12'>
            <CommonFIlterButton
              data={Array.from(new Set(data?.map((d) => d.username)))}
              handleInputChange={handleFilterChange}
              style={filterStyles}
              selectedItem={filter.userName}
              firstOption={"Select Name"}
              inputChangeOption={"userName"}
              className={""}
            />
          </Col> */}
        </Row>

        {/* <h5 className='logsheadingres mb-3'>User Logs</h5> */}

        {loader ? <><Loader /></> : <MonitorTable
          tableColumns={tableColumns}
          onRowClick={handleEditClick}
          staticData={filteredRows ? filteredRows : data}
        />}


      </Container>
    </div>
  );
}

export default ITNotifications;
