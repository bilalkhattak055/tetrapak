import React, { Fragment, useEffect, useState } from "react";
import { Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { H2, H3, H4 } from "../../../../AbstractElements";
import DatePicker from 'react-datepicker';
import DoughnutChartClass from "../../../Charts/ChartsJs/DoughnutChart";
import GatesSection from "../../Dashboard/components/Gates/GatesSection";
import BlockageOvertime from "../../../BlockageOvertime/BlockageOvertime";
import Alerts from '../../../../Components/Alerts/Alerts'
import WidgetsGrid from "./WidgetsGrid";
import Calendar from "../../Dashboard/components/calendarTiming/Calendar";
import img from '../../../../assets/images/dashboard/vieww.svg'
import ImageGallery from "../../../../Gallery/HoverGallery/ImageGallery";
import { apexAreaChart, apexBarChart } from "../../../Charts/ApexCharts/apexData";
import { SmallWidgetsData } from "../../../../Data/Ecommerce";
import { GatesData } from "../../../../Data/DefaultDashboard";
import { useNavigate } from "react-router";
import MonthDropDown from '../../../Common/MonthDropDown/index'
import YearlyDatePicker from '../../../Common/YearlyDatePicker/yearlyDatePicker'
import './../../CompanyDashbaord/Components/dateTimeCss.css'
import ViewAllButton from '../../../Common/newButton/index'
import { Col, FormGroup } from "react-bootstrap";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { areas, factories, modules } from "../../../../Data/staticData/data";
import YearPicker from "../../../Common/YearlyDatePicker/yearlyDatePicker";
import AllFilters from "../../../Common/allFilters/AllFilters";
const Dashboard = ({ newData, type, Areaprop, mainTitle }) => {
  console.log('typeeeeeee', type)
  const initialRole = JSON.parse(localStorage.getItem('role'));
  const [role, setRole] = useState(initialRole)
  const [filters, setFilters] = useState({
    module: '',
    area: '',
    factory: ''
  })


  const navigate = useNavigate()
  const blockage = "Blockage";
  const noBlockage = "No Blockage";
  const blockagePercent = 70;
  const noBlockagePercent = 30;
  const color1 = '#0b76b7'; 
  const color2 = '#bde3fa';
  const AllData = {
    donut: {
      labels: [blockage, noBlockage],
      colors: [color1, color2],
      series: [noBlockagePercent, blockagePercent],
    },
    blockageOverTime: {
      apexData: apexAreaChart
    },
    apexBarChart: apexBarChart,
    SmallWidgetsData: SmallWidgetsData,
    GatesData: GatesData

  }

  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthFormatChange, setmonthFormatChange] = useState()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value; // value in yyyy-mm format
    setSelectedMonth(value);

    const [year, month] = value.split('-');
    // Correctly adjust month index for Date object
    const monthIndex = Number(month) - 1; // Convert 1-based month to 0-based index
    const monthName = new Date(year, monthIndex, 1).toLocaleString('default', { month: 'long' });

    console.log(monthName);
    setmonthFormatChange(`${monthName} ${year}`);
  };

  const [selectedYear, setSelectedYear] = useState(new Date()); // Default to current year
  const [year, setYear] = useState()
  const handleYear = (date) => {
    if (date) {
      setSelectedYear(date);
      setIsDatePickerVisible(!isDatePickerVisible)
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ensure the date object is correctly set to the local time zone
    const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };
  const today = new Date();
  const startDat = today.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(startDat)
  let formattedStartDate;
  if(startDate) {
   formattedStartDate = formatDate(startDate); // Current date in yyyy-mm-dd format
  }

  // Calculate the date 7 days later
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);
  const endDateString = endDate.toISOString().split('T')[0]; // 7 days later in yyyy-mm-dd format
  const formattedEndDate = formatDate(endDateString)

  // const formattedToday = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;


  const data = newData || AllData
  console.log('data.donut 11', data.donut)
  console.log('apexAreaChart 11', apexAreaChart)
  console.log('this is type', type)
  const handleClikc = () => {
    navigate(`${process.env.PUBLIC_URL}/dashboard/live-camera/${role}`)
  }

  const [openDate, setOpenDate] = useState(true)
  const [selectedDate, setSelectedDate] = useState(startDat)
  const [dateHeading, setDateHeading] = useState('')

  useEffect(() => {
    if (type === 'Daily') {
      setDateHeading(`${formattedStartDate}`);
    } else if (type === 'Weekly') {
      setDateHeading(`${formattedStartDate}   to   ${formattedEndDate}`);
    }
    else if (type == 'monthly') {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' });
      setmonthFormatChange(`${monthName} ${year}`);
    }
    else if (type == 'Yearly') {
      if (selectedYear) {
        // Format the year to a string (e.g., '2024')
        setYear(selectedYear.getFullYear().toString());
      }
    }
  }, [])


  function handleDateChange(e) {
    console.log('daily date')
    if (!e.target.value) {
      // If the input is cleared, reset the state
      setSelectedDate('');
      setDateHeading('');
      setStartDate('')
      setOpenDate(false);
      return; // Exit the function
    }
    if (type === 'Daily') {
      const date = new Date(e.target.value); // Selected date
      const newDate = date.toISOString().split('T')[0]
      const formattedNewDate = formatDate(newDate)
      setSelectedDate(newDate)
      console.log(selectedDate)
      setDateHeading(formattedNewDate);
      setOpenDate(true)
    }
    else if (type == 'Weekly') {
      const date = new Date(e.target.value); // Selected date
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + 7); // Add 7 days to the selected date

      // Format dates to yyyy-mm-dd
      const formattedStartDate = e.target.value;
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const newFirstDate = formatDate(formattedStartDate)
      const newEndDate = formatDate(formattedEndDate)
      setSelectedDate(formattedStartDate);
      setDateHeading(`${newFirstDate} to ${newEndDate}`);

    } else if (type === 'Distribution'){
      setSelectedDate(e.target.value);
    } else if(type === 'Warehouse'){
      setSelectedDate(e.target.value);
    } else if(type === 'Production'){
      setSelectedDate(e.target.value);
    } else if(type === 'emergency') {
      setSelectedDate(e.target.value);
    } else if(type === 'factory-one') {
      setSelectedDate(e.target.value);
    } else if(type === 'factory-two') {
      setSelectedDate(e.target.value);
    } else if(type === 'factory-three') {
      setSelectedDate(e.target.value);
    }
  }

  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value
    });
    // applyFilters({ ...filters, [field]: e.target.value });
  };

  const style = { width: '158px', height: '48px' }
  return (

    <Container className="dashboard-first-page " fluid={true}>
      <Row className="d-flex justify-content-between align-items-center mb-4"  >
        {
          type === 'Distribution' ? (
            <>
              <Col xs='12' lg='5' >
                <H4>{type}</H4>
              </Col>
              <AllFilters
                handleInputChange={handleInputChange} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
              />
            </>
          ) :
            type === 'Warehouse' ? (
              <>
                <Col xs='12' lg='5' >
                  <H4>{type}</H4>
                </Col>
                <AllFilters
                  handleInputChange={handleInputChange} style={style} modules={modules} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                />

              </>
            ) :
              type === 'Production' ? (
                <>
                  <Col xs='12' lg='5' >
                    <H4>{type}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange} style={style} modules={modules} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                  />
                </>
              ) :
                type === 'Default' ? (
                  <>

                  </>
                ) :
                  type === 'Daily' ? (
                    <>
                      <Col xs='12' lg='5' >

                        <H4>Day - <span style={{ color: 'black' }}>{dateHeading}</span></H4>
                      </Col>

                      <AllFilters
                        handleInputChange={handleInputChange} factories={factories} style={style} modules={modules} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                      />
                    </>
                  ) :
                    type === 'Weekly' ? (
                      <>
                        <Col xs='12' lg='5' >
                          <H4>Week - <span style={{ color: 'black', fontWeight: '0' }}>{dateHeading}</span></H4>
                        </Col>
                        <AllFilters
                          handleInputChange={handleInputChange} factories={factories} style={style} modules={modules} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                        />
                      </>
                    ) :
                      type === 'monthly' ? (
                        <>
                          <Col xs='12' lg='5' >
                            <H4>Month - {monthFormatChange}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} factories={factories} style={style} modules={modules} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={false} monthly={true} handleChange={handleChange} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} monthFormatChange={monthFormatChange}
                          />
                        </>
                      ) : type === 'Yearly' ? (
                        <>
                          <Col xs='12' lg='5' >
                            <H4>Year - {year}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} factories={factories} style={style} modules={modules} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={false} yearly={true}
                            handleYear={handleYear} selectedYear={selectedYear} setSelectedYear={setSelectedYear} setYear={setYear} year={year} isDatePickerVisible={isDatePickerVisible} setIsDatePickerVisible={setIsDatePickerVisible}
                          />
                        </>
                      ) :
                        type === 'emergency' ? <>
                          <Col xs='12' lg='5' >
                            <H4>{mainTitle}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} factories={factories} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                          />
                        </>
                       : type === 'factory-one' ? <>
                       <Col xs='12' lg='5' >
                            <H4>{mainTitle}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} modules={modules} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                          />
                       </> :
                       type === 'factory-two' ? <>
                       <Col xs='12' lg='5' >
                            <H4>{mainTitle}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} modules={modules} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                          />
                       </> : 
                       type === 'factory-three' ? <>
                       <Col xs='12' lg='5' >
                            <H4>{mainTitle}</H4>
                          </Col>
                          <AllFilters
                            handleInputChange={handleInputChange} modules={modules} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                          />
                       </> :null
        }
      </Row>

      <Row className="widget-grid">

        <DoughnutChartClass donutData={data.donut} />
        <GatesSection GatesData={data.GatesData} />
        <BlockageOvertime apexCharData={data.blockageOverTime.apexData} />
        <Alerts data={data.apexBarChart} />


      </Row>
      <div className="d-flex justify-content-between" style={{ marginTop: '15px', marginBottom: '15px' }} >
        <p className="m-0 p-0" style={{ fontSize: '17px' }}>Emergency Alerts</p>
        {/* <Calendar /> */}
        <Link to={`${process.env.PUBLIC_URL}/dashboard/live-alerts/${role}`}>
          <ViewAllButton btnText='View All' icon={img} />
        </Link>

      </div>
      <Row>
        <WidgetsGrid SmallWidgetsData={data.SmallWidgetsData} />
      </Row>

      <Row>
        <div className="d-flex justify-content-between" style={{ marginTop: '15px', marginBottom: '15px' }} >
          <p className="m-0 p-0" style={{ fontSize: '17px' }}>Latest Alerts</p>
          <ViewAllButton btnText='View All' onClick={handleClikc} icon={img} />
        </div>
        <ImageGallery />
      </Row>


    </Container>
  );
};


export default Dashboard;
