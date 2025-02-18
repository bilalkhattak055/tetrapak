import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import search from '../../../../assets/SuperAdminIcons/Search.png';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import calendarImage from '../../../../assets/images/dashboard/calendarTiming/calendar-svg.svg'
import watchImage from '../../../../assets/images/dashboard/calendarTiming/watch-svg.svg'
import '../../../../Components/Dashboards/Dashboard/components/calendarTiming/calendar.css'
import DataTableComponent from '../Components/datatablefactory';
import DateTime from '../Components/DateTime';


const FactoryNotications = () => {
    const tableColumns = [
        { name: 'Operation', selector: row => row.operation, sortable: true },
        {
            name: 'Status',
            cell: row => (
                <button type="button" className="btn btn-success">{row.status}</button>
            )
        },
        { name: 'Timestamp', selector: row => row.timestamp, sortable: true },
        { name: 'Role', selector: row => row.role, sortable: true },
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
    // const [showDate, setfirst] = useState(second)
    // const [selectedDate, setSelectedDate] = useState(null);
    // const [startTime, setStartTime] = useState(null);
    // const [endTime, setEndTime] = useState(null);
    // //showing
    // const [showDate, setShowDate] = useState(false)
    // const [showStartTime, setShowStartTime] = useState(false)
    // const [showEndTime, setShowEndtime] = useState(false)
    

    useEffect(() => {
        const notificationsFactory = JSON.parse(localStorage.getItem('notificationsFactory')) || [];
        setData(notificationsFactory);
        setFilteredRows(notificationsFactory); // Initialize filteredRows with all data
    }, []);

    const handleDeleteClick = (row) => {
        const updatedData = data.filter(item => item !== row);
        setData(updatedData);
        setFilteredRows(updatedData);
        localStorage.setItem('notificationsFactory', JSON.stringify(updatedData));
    };

    const handleEditClick = () => {
        // Functionality for handling edit clicks if needed
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchItem(value);

        // Filter notifications based on the search input
        const filtered = data.filter(item =>
            item.operation.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredRows(filtered);
    };



    // const handleDateChange = date => {
    //     setSelectedDate(date);
    //     filterData(date, startTime, endTime);
    //     setShowDate(!showDate)
    //     console.log('this is date', date)
    // };

    // const handleStartTimeChange = time => {
    //     setStartTime(time);
    //     filterData(selectedDate, time, endTime);
    //     // setShowStartTime(!startTime)
    //     if(time){
    //         setShowEndtime(true)
    //         setShowStartTime(!showStartTime)
    //     }
    // };

    // const handleEndTimeChange = time => {
    //     setEndTime(time);
    //     filterData(selectedDate, startTime, time);
    //     // setShowEndtime(!showEndTime)
    //     if(time){
    //         setShowEndtime(!showEndTime)
    //         setShowStartTime(false)
    //     }
    // };

    // const filterData = (date, start, end) => {
    //     let filtered = data;

    //     if (date) {
    //         const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    //         filtered = filtered.filter(item => {
    //             const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
    //             return itemDate === dateString;
    //         });
    //     }

    //     if (start && end) {
    //         const startTimeString = start.toTimeString().split(' ')[0].substring(0, 5); // Format as HH:MM
    //         const endTimeString = end.toTimeString().split(' ')[0].substring(0, 5); // Format as HH:MM
    //         filtered = filtered.filter(item => {
    //             const itemTime = new Date(item.timestamp).toTimeString().split(' ')[0].substring(0, 5);
    //             return itemTime >= startTimeString && itemTime <= endTimeString;
    //         });
    //     }

    //     setFilteredRows(filtered);
    // };

    return (
        <div>
            <Container className='px-3' fluid={true} style={{ paddingTop: '30px', border: '0px solid' }}>
                <Row className=' header d-flex justify-content-between permissioncolres align-items-center pb-2' >
                    <Col xl='12'xs='12' className='permissioncolresCol d-flex align-items-center' >
                        <h3 className='superadminheading' style={{   fontWeight: '600', lineHeight: '40px',  }}>Activity Monitor</h3>
                    </Col>
       
                </Row>
                {/* <Row className='d-flex justify-content-end' style={{position:'absolute',zIndex: '100', width:'100%' }}>
                   <Col xl='3' lg='4' md='4' sm='4' xs='12'>
                    {showDate && (
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                            className="custom-datepicker"
                        />
                    )}
                    </Col>
                </Row> */}

                {/* <Row className='d-flex justify-content-end '  style={{position:'absolute',zIndex: '100', width:'95%' }}>
                    {showStartTime && (
                        <DatePicker
                            selected={startTime}
                            onChange={handleStartTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Start"
                            dateFormat="h:mm aa"
                            inline
                        />
                    )}
                </Row> */}

                {/* <Row className='d-flex justify-content-end' style={{zIndex: '100', width:'95%',position:'absolute' }}>
                {showEndTime && (
                        
                            <DatePicker
                                selected={endTime}
                                onChange={handleEndTimeChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="End"
                                dateFormat="h:mm aa"
                               inline
                            />
                      
                )}
                </Row> */}


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
                        <h4 className='logsheadingres'>Logs</h4>
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

export default FactoryNotications;
