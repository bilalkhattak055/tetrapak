import React, { useRef, useState } from 'react';
import calendarImage from '../../../../assets/images/dashboard/calendarTiming/calendar-svg.svg';
import watchImage from '../../../../assets/images/dashboard/calendarTiming/watch-svg.svg';
import './dateTimeCss.css';
import { Col, Row } from 'reactstrap';

export default function DateTime({ data, setFilteredRows }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const dateInputRef = useRef(null); // Ref for date input field

  const handleDateChange = (event) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    setSelectedDate(date);
    filterData(date, startTime, endTime);
  };

  const handleStartTimeChange = (event) => {
    const time = event.target.value ? new Date(`1970-01-01T${event.target.value}:00`) : null;
    setStartTime(time);
    filterData(selectedDate, time, endTime);
  };

  const handleEndTimeChange = (event) => {
    const time = event.target.value ? new Date(`1970-01-01T${event.target.value}:00`) : null;
    setEndTime(time);
    filterData(selectedDate, startTime, time);
  };

  const filterData = (date, start, end) => {
    let filtered = data;

    if (date) {
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        return itemDate === dateString;
      });
    }

    if (start && end) {
      const startTimeString = start.toTimeString().split(' ')[0].substring(0, 5); // Format as HH:MM
      const endTimeString = end.toTimeString().split(' ')[0].substring(0, 5); // Format as HH:MM
      filtered = filtered.filter((item) => {
        const itemTime = new Date(item.timestamp).toTimeString().split(' ')[0].substring(0, 5);
        return itemTime >= startTimeString && itemTime <= endTimeString;
      });
    }

    setFilteredRows(filtered);
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Programmatically open the date picker
    }
  };

  return (
    <>
      <div style={{ height: '47px', backgroundColor: 'white' }} className="calendar-time d-flex rounded align-items-center">
        
        {/* Date input section */}
      
        <div
          onClick={handleDateClick} // Clicking anywhere on this div triggers the date picker
          style={{ cursor: 'pointer' }}
        >
          <input
           
            type="date"
            className="p-0 m-0"
            style={{ backgroundColor: 'white', border: 'none' }}
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
        </div>

        <div className="py-2 mx-2" style={{ border: '1px solid #a4a3a3' }}></div>

        {/* Time input section */}
        {/* <div style={{height:'55px', width:'300px'}} className=" border justify-content-center align-items-center"> */}
        <Row className='d-flex align-items-center' style={{height:'70px'}}>
          <Col>
          <input
            type="time"
            style={{ backgroundColor: 'white', border: 'none' }}
            value={startTime ? startTime.toTimeString().substring(0, 5) : '08:00'}
            onChange={handleStartTimeChange}
            className="mx-2 d-flex align-items-center py-0"
          />
          </Col>
          
          <Col>
          <input
            style={{ backgroundColor: 'white', border: 'none' }}
            type="time"
            value={endTime ? endTime.toTimeString().substring(0, 5) : '09:00'}
            onChange={handleEndTimeChange}
            className="mx-2 py-0"
          />
          </Col>
          </Row>
        </div>
      {/* </div> */}
    </>
  );
}
