import React, { useState } from 'react';
import './calendar.css'
import DatePicker from 'react-datepicker';
import { Col } from 'reactstrap';

const Calendar = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const handleChange = date => {
    setstartDate(date);
  };
  const addDays = date => {
    setstartDate(date, 4);
  };
  // eslint-disable-next-line
  const setEndDate = date => {
    setendDate(date);
  };
  const formatDate = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    }
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  return (
    // <div className='col-xs-12 col-sm-6 calendar-time-container'>
    // <div className=" calendar-time d-flex gap-2 rounded">
    //       <div className='border-right pe-2'><img width={15} height={15} src={calendarImage} alt="" className='me-1' /> <span>Today</span></div>
    //       <div className=''><img width={15} height={15} src={watchImage} alt="" className='me-1' /> <span>8:00 to 9:00 AM</span></div>
    //   </div>
    //   </div>
    <div className='col-xs-12 col-sm-6 calendar-time-container'>
      <Col>
        <DatePicker className="form-control digits calendar-time rounded px-4" showPopperArrow={false} selected={startDate} showTimeSelect dateFormat="Pp" customInput={<CustomDatePickerInput value={formatDate(startDate)} />} />
      </Col>
    </div>
  )
}

const CustomDatePickerInput = ({ value, onClick }) => (
  <button className="form-control digits calendar-time rounded" onClick={onClick}>
    {value}
  </button>
);

export default Calendar
