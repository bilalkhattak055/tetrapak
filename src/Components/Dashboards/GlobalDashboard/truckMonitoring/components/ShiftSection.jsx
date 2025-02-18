import React, { useState } from 'react'
import ApexLineChartClass from '../../../../Charts/ApexCharts/ApexLineChart'
import ColumnChartClass from '../../../../Charts/ApexCharts/ColumnChart'
import { Col, Row } from 'reactstrap'
import { H5 } from '../../../../../AbstractElements'
import Calender from '../../../ItDashboard/It Officer/Components/Calender'
import DateComponentt from '../../../../Common/DateComponent/Index'

const ShiftSection = () => {
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showDateTimePicker1, setShowDateTimePicker1] = useState(false);
   
    // const [timing, setTiming] = useState({
    //     startDate: undefined,
    //     endDate: undefined,
    //     startTime: undefined,
    //     endTime: undefined
    // })

    // const handleDateChange = (e, key) => {
    //     if (!e || isNaN(new Date(e).getTime())) {
    //         console.error("Invalid date or time value", e);
    //         return;
    //     }
    //     let formattedValue;
    
    //     if (key === 'startDate' || key === 'endDate') {
    //         // Extract and format the date
    //         formattedValue = e.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'
    //     } else if (key === 'startTime' || key === 'endTime') {
    //         // Extract and format the time
    //         formattedValue = e.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format as 'hh:mm AM/PM'
    //     }
    
    //     setTiming((prevTiming) => ({
    //         ...prevTiming,
    //         [key]: formattedValue
    //     }));
    // };
    const [timing, setTiming] = useState({
        startDate: null,  // Set to null as default value
        endDate: null,    // Set to null as default value
        startTime: null,  // Set to null as default value
        endTime: null     // Set to null as default value
    });

    const handleDateChange = (e, key) => {
        if (!e) {
            console.error("Invalid date or time value", e);
            return;
        }

        let formattedValue;

        if (key === 'startDate' || key === 'endDate') {
            // Extract and format the date
            formattedValue = e.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'
        } else if (key === 'startTime' || key === 'endTime') {
            // Extract and format the time
            formattedValue = e.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format as 'hh:mm AM/PM'
        }

        setTiming((prevTiming) => ({
            ...prevTiming,
            [key]: formattedValue
        }));
    };


    // const handleDateChange = (e, key) => {
        
    
    //     setTiming((prevTiming) => ({
    //         ...prevTiming,
    //         [key]: e
    //     }));
    // };
    
    console.log('time', timing)

    console.log('time', timing)
    
    
    return (
        <div>
            <Row xs='12'>

                <Col xs='12' xl='6'>
                    <div className='d-flex justify-content-between'>
                        <H5>1<sup>st</sup> Shift</H5>
                        <div className='col-xs-12 col-sm-6 date-comp d-flex mb-2'>
                            <Calender showDateTimePicker={showDateTimePicker} setShowDateTimePicker={setShowDateTimePicker} timing={timing} setTiming={setTiming} />
                        </div>
                            {showDateTimePicker && <DateComponentt  handleDateChange={handleDateChange} timing={timing} setTiming={setTiming}  />}
                    </div>
                    <ColumnChartClass />
                </Col>

                <Col xs='12' xl='6'>
                    <div className='d-flex justify-content-between'>
                        <H5>2<sup>nd</sup> Shift</H5>
                        <div className='col-xs-12 col-sm-6 date-comp d-flex mb-2'>
                            <Calender showDateTimePicker={showDateTimePicker1} setShowDateTimePicker={setShowDateTimePicker1} timing={timing} setTiming={setTiming} />
                        </div>
                            {showDateTimePicker1 && <DateComponentt handleDateChange={handleDateChange} timing={timing} setTiming={setTiming} />}
                    </div>
                    <ColumnChartClass />
                </Col>
            </Row>

        </div>
    )
}

export default ShiftSection
