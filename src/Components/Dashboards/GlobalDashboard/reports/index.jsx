// import React, { Fragment } from "react";
// import "../itSupport/itSupport.css";
// import { Container } from "reactstrap";
// import { H2 } from "../../../AbstractElements";
// import ReportList from '../../Tables/DataTable/';
// import { dummytabledataforReports, tableColumnsForReports } from "../../../Data/Table/Defaultdata";

// const index = () => {
//   return (
//     <Fragment>
//       <Container className="dashboard-first-page" fluid={true}>
//       <H2 attrH2={{className:"pb-4"}}>Reports</H2>
//         <section className="data-table">
//           <ReportList noCardHeader={true} dummytabledata={dummytabledataforReports} tableColumns={tableColumnsForReports} />
//         </section>
//       </Container>
//     </Fragment>
//   );
// };

// export default index;


import React, { useState,useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import arrow from './../../../../assets/icons/arrow-down.png';
import download from './../../../../assets/icons/download.png';
import tablePic from './../../../../assets/pictures/tableImage.png';
import * as XLSX from 'xlsx';
import './table.css';
import DataTables from '../../../Tables/DataTable/Index';
import { H2 } from '../../../../AbstractElements';
import MonthDropDown from '../../../Common/MonthDropDown/index'

const Index = ({ direction, ...args }) => {
  const [tableData] = useState([
    { id: 1, cameraId: '072', date: '12-05-24', time: '16:36:30', alerts: '145', img: tablePic },
    { id: 2, cameraId: '072', date: '14-04-23', time: '16:36:30', alerts: '145', img: tablePic },
    { id: 3, cameraId: '072', date: '20-02-24', time: '16:36:30', alerts: '145', img: tablePic },
    { id: 4, cameraId: '072', date: '08-02-24', time: '16:36:30', alerts: '145', img: tablePic },
  ]);

  const [filteredData, setFilteredData] = useState(tableData);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const selectedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      const selectedYear = date.getFullYear().toString().slice(-2);

      const filtered = tableData.filter(data =>
        data.date.includes(`${selectedMonth}-${selectedYear}`)
      );
     
        setFilteredData(filtered);
    } 
  };

  const downloadExcel = () => {
    // Create a new array without the img property
    const filteredDataWithoutImg = filteredData.map(({ img, ...rest }) => rest);

    // Convert the new array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredDataWithoutImg);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, "Report.xlsx");
};


  const columns = [
    {
        name: 'Camera ID',
        selector: row => row.cameraId,
        sortable: false,
    },
    {
        name: 'Entry Date',
        selector: row => row.date,
        sortable: false,
    },
    {
        name: 'Entry Time',
        selector: row => row.time,
        sortable: false,
    },
    {
        name: 'Alerts',
        selector: row => row.alerts,
        sortable: false,
    },
    {
        name: 'Image',
        cell: row => <img src={row.img} alt="snapshot" className="table-img" />,
        sortable: false,
    },
];
const [selectedMonth, setSelectedMonth] = useState('');
const [monthFormatChange, setmonthFormatChange] = useState()

const handleChange = (event) => {
 const value = event.target.value;
 setSelectedMonth(value); 
 const [year, month] = value.split('-'); 
 const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' }); 
 setmonthFormatChange(`${monthName} ${year}`);
};

useEffect(() => {
 const now = new Date();
 const year = now.getFullYear();
 const month = now.getMonth() + 1;  
 const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' }); 
 setmonthFormatChange(`${monthName} ${year}`);
}, [])

  return (
    <>
      <Container fluid={true}>
        <Row style={{ paddingBlock: '60px' }}>
          <Col xl='6' lg='6' md='6' sm='2' xs='12'>
            <H2>Reports</H2>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems:'center'
            }}
            className="justify-content-start-sm"
            xl="6"
            lg="6"
            md="6"
            sm="10"
            xs="12"
          >
           <MonthDropDown 
                handleChange={handleChange}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
         

            <div onClick={downloadExcel} className='download'>
              <p style={{ fontSize: '0.8rem' }} className='m-0 p-0'>Download Report</p>
              <img src={download} alt="download" />
            </div>
          </Col>

          <Col xl='12' lg='12' md='12' sm='12' xs='12'>
            {/* <div style={{ fontFamily: 'Roboto' }} className="table-responsive card">
              <Box  sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      }} >
            <DataGrid 
  rows={filteredData} 
  columns={columns} 
  disableSelectionOnClick
  sx={{
    "& .MuiDataGrid-toolbarContainer": {
      border:'2px solid black',
      justifyContent: 'space-between',
    },
    "& .MuiTablePagination-toolbar": {
      display:'flex',
      alignItems:'center',
    },
    "& .MuiTablePagination-root": {
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-evenly',
      padding:'0px'
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows": {
      marginBlock:'0px',
      marginInline:'3px',
      padding:'0px'
    },
    // Targeting the header row
    "& .MuiDataGrid-columnHeaders": {
      // backgroundColor: 'black !important', // Setting the background color for the header row
      // color: '#000 !important', // Optional: change text color
       // Make header text bold
       backgroundColor:'red ',
       border:'2px solid black'
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 'bold', // Optional: make the header text bold
      
    },
  }}
/>
</Box>





            </div> */}

            <DataTables noCardHeader={true} tableColumns={columns} dummytabledata={filteredData}/>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

