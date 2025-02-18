import React, { useState } from 'react'
import GlobalAIModelAndReports from '../../../../Components/Screens/GlobalUser/AIModelReports/model_and_reports';

const AiModelAndReports = () => {
  return (
    <>
      <GlobalAIModelAndReports area={true} />
    </>
  )
}

export default AiModelAndReports





// import React, { Fragment } from 'react'
// import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap'
// import DataTableModel from '../../../Screens/GlobalUser/AIModelReports/Components/DataTable';
// import AllFilters from '../../../Common/allFilters/AllFilters';
// import { useState, useRef, useEffect } from 'react';
// import { shifts, weeks } from '../../../../Data/staticData/data';
// import { H3, H4, H5 } from '../../../../AbstractElements';
// import TotalAlerts from '../../../Screens/GlobalUser/AIModelReports/Components/Charts/TotalAlerts';
// import ModelChart from '../../../Screens/GlobalUser/AIModelReports/Components/Charts/ModelChart';
// import CameraImage from "../../../../assets/images/cameras/camera.jpeg"
// import { Button, FormGroup, Input, Label } from 'reactstrap';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import AIModal from '../../../Screens/GlobalUser/AIModelReports/Components/Modal/AIModal';
// import { StaticDataForAO6, areaaa, dateChoose, SA } from '../../../Screens/GlobalUser/AIModelReports/Components/data/staticData';
// import '../../../Screens/GlobalUser/AIModelReports/custom.css'
// import { toast } from "react-toastify";
// import { getWeek } from '../../../../_helper/helper';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import SingleImage from '../../../../Gallery/zoomin/SingleImage';
// import DateFilter from '../../../Screens/GlobalUser/AIModelReports/Components/Dates/DateFilter';
// import ModelCards from '../../../Screens/GlobalUser/AIModelReports/Components/AIModelCards/ModelCards';
// import axios from 'axios';
// import ImageZoom from '../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';
// import AreaService from '../../../../api/areaService';




// const AiModelAndReports = (area) => {

//   const today = new Date().toISOString().split("T")[0];
//   const [isOpen, setIsOpen] = useState(false)
//   const pageRef = useRef();
//   const [modal, setModal] = useState(false);
//   const [sub, setSubmit] = useState(false);
//   const [currentWeek, setCurrentWeek] = useState()
//   const [selectedOption, setSelectedOption] = useState('Daily');
//   const style = {
//     minWidth: "132px",
//     width: '140px',
//     maxWidth: "145px", height: "38px", fontSize: 13,
//   }
//   const monthtoday = new Date();
//   const currentMonth = monthtoday.toISOString().slice(0, 7);
//   const [dateShow, setDateShow] = useState(true)
//   const [monthShow, setMonthShow] = useState(false)
//   const [weeklyShow, setWeeklyShow] = useState(false)
//   const [customDate, setCustomDate] = useState(false)
//   const [totalAlerts, setTotalAlerts] = useState()


//   const [chartsData, setChartsData] = useState({
//     totalAlertsChart: [
//       { category: 'Helmet', value: 85 },
//       { category: 'Vest', value: 30 },
//       { category: 'MMHE', value: 35 },
//     ],
//     modelAccuracyChart: [
//       { name: 'Helmet', value: 75 },
//       { name: 'Vest', value: 85 },
//       { name: 'MMHE', value: 80 },
//     ]
//   })
//   useEffect(() => {

//     function getDefaultData() {

//     }

//     getDefaultData()

//     window.scrollTo({
//       top: 0, // Scroll to the top
//       left: 0, // Ensure it's the horizontal start as well
//       behavior: 'smooth' // Smooth scrolling behavior
//     });
//   }, [])

//   const getCurrentWeek = () => {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();

//     // Get the first day of the year
//     const firstDayOfYear = new Date(year, 0, 1);
//     const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;

//     // Calculate the current week number
//     const currentWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

//     // Return the formatted value in YYYY-Wxx format
//     return `${year}-W${currentWeekNumber.toString().padStart(2, '0')}`;
//   };

//   const currentWeekk = getCurrentWeek();

//   const [filters, setFilters] = useState({
//     areas: [],
//     shifts: [],
//     date: today,
//     week: '',
//     month: '',
//     starting: '',
//     ending: ''
//     // areas: [],
//     // shifts: [],
//     // date:today,
//     // week:currentWeekk,
//     // month:currentMonth,
//     // starting:'',
//     // ending:''
//   })

//   useEffect(() => {


//     //get api will be called here
//     const formatDate = (dateStr) => {
//       const [year, month, day] = dateStr.split('-');
//       return `${month}/${day}/${year}`;
//     };
//     const payload = {
//       safety_area: filters.areas,
//       shift: filters.shifts,
//       start_date: filters.starting ? formatDate(filters.starting) : formatDate(filters.date),
//       end_date: filters.ending ? formatDate(filters.ending) : formatDate(filters.date)
//     };
//     const payload1 = {
//       safety_area: filters.areas,
//       shift: filters.shifts,
//       start_date: filters.starting ? formatDate(filters.starting) : formatDate(filters.date),
//       end_date: filters.ending ? formatDate(filters.ending) : formatDate(filters.date),
//       week: filters?.week,
//       month: filters?.month
//     };

//     getAlertsCharts(payload)
//     getAiReportsCardsFunc(payload1)

//     window.scrollTo({
//       top: 0, // Scroll to the top
//       left: 0, // Ensure it's the horizontal start as well
//       behavior: 'smooth' // Smooth scrolling behavior
//     });
//   }, [])

//   //api calls
//   async function getAiReportsCardsFunc(payload) {
//     const res = await AreaService.getAiReportsCards(payload)
//     console.log('resssss', res?.data)
//     setCardsData(res?.data)

//   }

//   async function getAlertsCharts(payload) {
//     const res = await AreaService.getAlertsChart(payload)
//     const desiredOrder = ["Emergency Exit", "MMHE", "Helmet", "Vest", "Machine Guard"];
//     const sortedData = res?.data?.totalAlertsChart?.sort((a, b) => {
//       return desiredOrder.indexOf(a?.category) - desiredOrder.indexOf(b?.category);
//     });
//     const filteredForAo6 = sortedData?.filter((data)=> data?.category?.toLowerCase() !== 'machine guard' && data?.category?.toLowerCase() !== 'emergency exit')

//     const totAlerts = filteredForAo6?.reduce((acc, curr) => acc + curr.value, 0)
//     setTotalAlerts(totAlerts)
//     setAlertsData(filteredForAo6)

//   }



//   const handlePdfDownload = () => {
//     toast.success("Downloaded Successfully");
//     const element = pageRef.current;
//     html2canvas(element).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('ai_model_reports.pdf');





//     });
//   };
//   const handlePrint = () => {
//     window.print(); // Opens the print dialog
//   };

//   function toggleModal() {
//     setModal(!modal);
//     console.log("modal", modal);
//     setSubmit(false);
//   }



//   const handleDateDrop = (e) => {
//     setSelectedOption(e.target.value); // Update the dropdown value based on user selection
//     if (e.target.value == 'Duration') {
//       setMonthShow(false)
//       setDateShow(false)
//       setWeeklyShow(false)
//       setCustomDate(false)
//     }
//     else if (e.target.value == 'Month') {
//       setMonthShow(true)
//       setDateShow(false)
//       setWeeklyShow(false)
//       setCustomDate(false)

//     }
//     else if (e.target.value == 'Daily') {
//       setMonthShow(false)
//       setDateShow(true)
//       setWeeklyShow(false)
//       setCustomDate(false)
//     }
//     else if (e.target.value == 'Week') {
//       setMonthShow(false)
//       setDateShow(false)
//       setWeeklyShow(true)
//       setCustomDate(false)
//     }
//     else if (e.target.value == 'Custom') {
//       setMonthShow(false)
//       setDateShow(false)
//       setWeeklyShow(false)
//       setCustomDate(true)
//     }
//   };

//   const [identifier, setIdentifier] = useState('')

//   // To handle changes in the Typeahead
//   const handleInputChange = (e, field) => {
//     let value = e.target.value;

//     if (field === "week" && value) {
//       // When a week is selected, clear both date, month, and custom date range fields
//       setIdentifier('week')
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         week: value,
//         date: '',  // Clear the date
//         month: '', // Clear the month
//         starting: '', // Clear starting date
//         ending: '',   // Clear ending date
//       }));
//     } else if (field === "month" && value) {
//       setIdentifier('month')
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         month: value,
//         date: '', // Clear the date when a new month is selected
//         week: '', // Clear the week when a new month is selected
//         starting: '', // Clear starting date
//         ending: '',   // Clear ending date
//       }));
//     } else if (field === "date" && value) {
//       setIdentifier('date')
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         date: value,
//         month: '', // Clear the month when a new date is selected
//         week: '',  // Clear the week when a new date is selected
//         starting: '', // Clear starting date
//         ending: '',   // Clear ending date
//       }));
//     } else if (field === "starting" || field === "ending") {
//       // When a custom date range is selected, clear date, month, and week
//       setIdentifier('custom')
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         [field]: value,
//         date: '',  // Clear the date
//         month: '', // Clear the month
//         week: '',  // Clear the week
//       }));
//     } else {
//       // Default case for other filters
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         [field]: value,
//       }));
//     }
//   };
//   const typeHeadChange = (field, selected) => {
//     setFilters({
//       ...filters,
//       [field]: selected  // Update the field dynamically (factories or areas)
//     });
//   };



//   const addRandomCompliance = (areas) => {
//     return areas.map(area => ({
//       ...area,
//       SubAreas: area.SubAreas.map(subArea => ({
//         ...subArea,
//         Compliance: Math.floor(Math.random() * (100 - 50 + 1)) + 50 // Generate a random number between 50 and 100
//       }))
//     }));
//   };

//   // Adding random Compliance to area1 data
//   const updatedArea1 = addRandomCompliance(StaticDataForAO6);

//   const [imageData, setImageData] = useState({});

//   const [showModal, setShowModal] = useState(false)

//   function handleCardClick(item) {
//     console.log('this is item', item)
//     setImageData({
//       cameraName: undefined,
//       violation: item.violation,
//       areaName: item.AreaName,
//       areaOwner: item.AreaOwner,
//       subareas: item.SubAreas,
//       date: item?.date,
//       time: item?.time,
//     });
//     setShowModal(!showModal)
//   }

//   const [cardsData, setCardsData] = useState()

//   const [lastFilter, setLastFilter] = useState(null);
//   const defaultData = chartsData.totalAlertsChart
//   const [alertsData, setAlertsData] = useState([]);
//   const [series2, setSeries2] = useState(chartsData.modelAccuracyChart);





//   async function ApplyFilter() {
//     //post api to send filters state to backend 
//     let updatedData = [...defaultData]; // Default data
//     let updatedData2 = series2


//     console.log('shift ssss', filters?.shifts[0])
//     if (lastFilter == 'shifts') {
//       if (filters?.shifts.length == 1) {
//         updatedData = updatedData.map(item => ({
//           ...item,
//           value: item.value * 1.5,
//         })); // Modify data for Shift 1
//         updatedData2 = updatedData2.map((item) => ({ ...item, value: item.value / 2 })); // Shift 1 logic

//       } else if (filters?.shifts.length == 2) {
//         updatedData = [
//           { category: 'Helmet', value: 40 },
//           { category: 'Vest', value: 20 },
//           { category: 'MMHE', value: 75 },
//         ]; // Shift 2 data
//         updatedData2 = updatedData2.map((item) => ({ ...item, value: item.value + 10 })); // Shift 2 logic

//       } else if (filters?.shifts.length == 3) {
//         updatedData = [
//           { category: 'Helmet', value: 80 },
//           { category: 'Vest', value: 40 },
//           { category: 'MMHE', value: 60 },
//         ]; // Shift 3 data
//         updatedData2 = updatedData2.map((item) => ({ ...item, value: item.value + 5 })); // Shift 3 logic

//       }
//     }
//     else if (lastFilter == 'areas') {
//       if (filters?.areas.length == 1) {
//         updatedData = [
//           { category: 'Helmet', value: 60 },
//           { category: 'Vest', value: 25 },
//           { category: 'MMHE', value: 30 },
//         ]; // Week 1 data
//         updatedData2 = updatedData2.map((item, index) => ({ ...item, value: item.value + 5 })); // Logic for one area

//       } else if (filters?.areas.length == 2) {
//         updatedData = [
//           { category: 'Helmet', value: 65 },
//           { category: 'Vest', value: 30 },
//           { category: 'MMHE', value: 35 },
//         ]; // Week 2 data
//         updatedData2 = updatedData2.map((item, index) => ({ ...item, value: item.value + 5 })); // Logic for two areas

//       } else if (filters?.areas.length == 3) {
//         updatedData = [
//           { category: 'Helmet', value: 70 },
//           { category: 'Vest', value: 35 },
//           { category: 'MMHE', value: 40 },
//         ]; // Week 3 data
//       } else if (filters?.areas.length == 4) {
//         updatedData = [...defaultData]; // Week 4 is the default data
//       }
//     }
//     const payload = {
//       identifier: identifier,
//       filters: filters
//     }
//     // const response = await axios.post('', payload)
//     setSeries2(updatedData2)
//     setAlertsData(updatedData);

//   }

//   const shouldShowButton = () => {
//     return (
//       filters.areas.length > 0 ||
//       filters.shifts.length > 0 ||
//       filters.date !== '' ||
//       filters.week !== '' ||
//       filters.month !== '' ||
//       filters.starting !== '' ||
//       filters.ending !== ''
//     );
//   };
//   function Reset() {

//     setFilters({
//       areas: [],
//       shifts: [],
//       date: '',
//       week: '',
//       month: '',
//       starting: '',
//       ending: ''
//     })
//   }
//   return (
//     <Fragment>
//       {isOpen && <SingleImage photo={CameraImage} isOpen={isOpen} setIsOpen={setIsOpen} />}
//       <br />

//       <div className="p-0 m-0" ref={pageRef}>
//         <Container fluid={true}>
//           {showModal && (
//             <ImageZoom
//               // photo={modalData?.image}
//               setShowModal={setShowModal}
//               photo={CameraImage}
//               setIsOpen={setShowModal}
//               imageData={imageData}
//             />
//           )}
//           <Row className={` my-0 d-flex align-items-${shouldShowButton() ? 'start' : 'start'} px-1`}>
//             <Col xl='3' lg='12' md='12' sm='12' xs='12'>
//               <h4 style={{ fontSize: '20px' }}>AI Model and Reports </h4>
//             </Col>
//             <Col style={{ flexGrow: 0 }} className={`m-0 d-flex flex-wrap  justify-content-start justify-content-xl-end  `} xl='9' lg='12' md='12' sm='12' xs='12'>
//               <DateFilter selectArea={true} style={style} selectedOption={selectedOption} currentWeek={currentWeek} typeHeadChange={typeHeadChange} filters={filters} handleDateDrop={handleDateDrop} handleInputChange={handleInputChange} dateShow={dateShow} monthShow={monthShow} weeklyShow={weeklyShow} customDate={customDate} />
//               {shouldShowButton() && (
//                 <>
//                   <div className='d-flex  gap-2'>
//                     <FormGroup className='my-0'>
//                       <Button style={style} className=' ' onClick={ApplyFilter} color='primary'>
//                         Apply
//                       </Button>
//                     </FormGroup>
//                     <FormGroup>
//                       <Button style={style} className=' ' onClick={Reset} color='danger'>
//                         Reset
//                       </Button>
//                     </FormGroup>
//                   </div>
//                 </>
//               )}
//             </Col>
//           </Row>
//           <Card className='p-0 mx-1 mt-2 '>
//             <CardBody className='p-0'>
//               <CardHeader className=''>
//                 <Row className='p-0  m-0 d-flex align-items-center justify-content-between'>
//                   <Col className='p-0 m-0'>
//                     <H5 attrH5={{ style: { fontSize: '16px' } }}>Module Analytics</H5>
//                     <span className='f-light'>Total Alerts: {totalAlerts}</span>
//                   </Col>
//                   <Col className='p-0 mx-0 my-2 my-xl-0 my-lg-0 my-md-0 my-sm-0 gap-2 d-flex justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-xs-end' >

//                     <Button onClick={handlePdfDownload}>PDF</Button>
//                     <Button onClick={toggleModal} className='' color='primary'>Email</Button>
//                     <Button onClick={handlePrint} color='success'>Print</Button>

//                   </Col>
//                 </Row>
//               </CardHeader>
//               <Row className='d-flex align-items-end'>
//                 <Col className='m-0' xl="6" lg="6" md="12" sm="12" xs="12">
//                   <Card className='m-0'>
//                     <CardBody className='m-0'>
//                       <TotalAlerts defaultData={defaultData} data={alertsData} setData={setAlertsData} lastFilter={lastFilter} setLastFilter={setLastFilter} chartsData={chartsData} filters={filters} />
//                     </CardBody>
//                   </Card>
//                 </Col>
//                 <Col className='mt-xl-0 mt-lg-0 mt-md-3 mt-sm-3 mt-xs-3' xl="6" lg="6 " md="12" sm="12" xs="12">
//                   <Card className='m-0'>
//                     <CardBody className='m-0'>
//                       <ModelChart series2={series2} setSeries2={setSeries2} lastFilter={lastFilter} setLastFilter={setLastFilter} chartsData={chartsData} filters={filters} />
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </CardBody>
//           </Card>
//           <Row className='px-1'>
//             <Col className="mb-2" xl="12" lg="12" md="12" sm="12" xs="12">
//               <ModelCards area={true} data={updatedArea1} handleCardClick={handleCardClick} />
//             </Col>
//           </Row>

//           <AIModal
//             modal={modal}
//             toggleModal={toggleModal}
//             sub={sub}
//             setSubmit={setSubmit}
//           />
//         </Container>
//       </div>
//     </Fragment>
//   );
// };

// export default AiModelAndReports;

