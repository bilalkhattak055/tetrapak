import React, { useState, useEffect } from 'react';
import arrow from './../../../assets/icons/arrow-down.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../MonthDropDown/style.css'

const MonthDropDown = ({ selectedMonth, handleChange, setSelectedMonth }) => {


  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    setSelectedMonth(`${year}-${formattedMonth}`);
  }, []);
  return (
    <div>
      <input
        type="month"
        id="month"
        value={selectedMonth}
        style={{ border: '0px', borderRadius: '10px', padding: '7px', background: '#E8E8E8' }}
        onChange={handleChange}
      />
    </div>
  );
}

export default MonthDropDown;
