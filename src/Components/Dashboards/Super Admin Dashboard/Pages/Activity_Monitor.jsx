import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent';
import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import search from '../../../../assets/SuperAdminIcons/Search.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { H4, H5, H6 } from '../../../../AbstractElements';
import DateTime from '../../CompanyDashbaord/Components/DateTime';

const ActivityMonitor = () => {
    const tableColumns = [
        { name: 'Operation', selector: row => row.operation, sortable: true },
        { 
            name: 'Status', 
            cell: row => (
                <button type="button" className="btn btn-success">{row.status}</button>
            )
        },
        { name: 'Timestamp', selector: row => row.timestamp, sortable: true }, 
        { 
            name: 'Delete',
            cell: row => (
                <div>
                    <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            )
        },
    ];

    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredRows, setFilteredRows] = useState(undefined);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [tableData, settableData] = useState()

    useEffect(() => {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        setData(notifications);
        settableData(notifications)
        setFilteredRows(notifications);
    }, []);

    const handleDeleteClick = (row) => {
        const updatedData = data.filter(item => item !== row);
        setData(updatedData);
        setFilteredRows(updatedData);
        localStorage.setItem('notifications', JSON.stringify(updatedData));
    };

    const handleEditClick = () => {
        // Functionality for handling edit clicks if needed
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value)
        console.log('search item', searchItem)
        if (!e.target.value.trim()) {
            setFilteredRows(e.target.value);   
            return;
        } 
        // Filter notifications based on the search input
        const filtered = data.filter(item =>
            item.operation.toLowerCase().includes(searchItem.toLowerCase())
        );
        if(e.target.value==''){
            setFilteredRows(tableData)
        }
        else{

            setFilteredRows(filtered);
        }
    };
    

  

    return (
        <div>
            <Container fluid={true} style={{ paddingTop: '30px', border: '0px solid' }}>
            <Row className='header d-flex justify-content-between align-items-center permissioncolres pb-2'>
                <Col xl='9' lg='8' md='8' sm='8' xs='12' className='permissioncolresCol'>    
                  <H4>
                  Activity Monitor
                  </H4> 
                </Col>
                {/* <Col className='d-flex justify-content-start justify-content-sm-end justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-start' xl='3' lg='4' md='4' sm='4' xs='12'>
                    <button
                        className='btn addbtnres'
                        style={{ background: '#1C3664', color: 'white', padding: '8px 20px', height: '45px', maxHeight: '45px' }}
                        onClick={() => setShowDateTimePicker(!showDateTimePicker)}
                    >
                        Date/Time
                    </button>
                </Col> */}
            </Row>
            {/* {showDateTimePicker && (
                <Row className='d-flex justify-content-end'>
                    <Col xl='10' lg='8' md='8' sm='8' xs='12'>
                        <Card className='shadow-none'>
                            <CardBody className='d-flex flex-column align-content-center' style={{ padding: '12px 12px 12px 20px' }}>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select Date"
                                />
                                <DatePicker
                                    selected={startTime}
                                    onChange={handleStartTimeChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Start Time"
                                    dateFormat="h:mm aa"
                                    placeholderText="Select Start Time"
                                    className='mt-2'
                                />
                                <DatePicker
                                    selected={endTime}
                                    onChange={handleEndTimeChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="End Time"
                                    dateFormat="h:mm aa"
                                    placeholderText="Select End Time"
                                    className='mt-2'
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )} */}
                   <Row className='d-flex justify-content-between align-items-center '>
                    <Col style={{marginTop:'25px'}} xl='5' lg='5' md='5' sm='5' xs='12'>
                        <Card className='shadow-none '>
                            <CardBody className='d-flex justify-content-start align-items-center' style={{ padding: '12px 12px 12px 20px' }}>
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
                    <Col   className=' d-flex justify-content-start justify-content-sm-start justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-center' xl='7' lg='7' md='7' sm='7' xs='12'>
                        {/* <button
                        className='btn addbtnres'
                        style={{ background: '#1C3664', color: 'white', padding: '8px 20px', height: '45px', maxHeight: '45px' }}
                        onClick={() => setShowDateTimePicker(!showDateTimePicker)}
                    >
                        Date/Time
                    </button> */}
                       <DateTime  data={data} filteredRows={filteredRows} setFilteredRows={setFilteredRows} />

                    </Col>
                </Row>
                <Card>
                    <CardHeader>
                        {/* <h4 className='logsheadingres'>Logs</h4> */}
                        <H5>
                            Logs
                        </H5>
                    </CardHeader>
                    <CardBody className='p-0 pb-3'>
                    <DataTableComponent 
                            tableColumns={tableColumns} 
                            onRowClick={handleEditClick} 
                            staticData={filteredRows ? filteredRows : data} 
                        />

                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default ActivityMonitor;
