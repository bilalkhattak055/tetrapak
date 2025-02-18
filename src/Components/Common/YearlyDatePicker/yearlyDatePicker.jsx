import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfYear, endOfYear } from 'date-fns';
import './year.css'
import { ChevronDown } from 'react-feather';

const YearPicker = ({ handleYear, selectedYear, setSelectedYear, setYear, isDatePickerVisible, setIsDatePickerVisible }) => {
  // const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const datePickerRef = useRef(null); // Ref for DatePicker container

  // Toggle DatePicker visibility
  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  // Handle click outside of the DatePicker
  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setIsDatePickerVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedYear) {
      // Format the year to a string (e.g., '2024')
      setYear(selectedYear.getFullYear().toString());
    }
  }, [selectedYear, setYear]);

  return (
    <div  style={{ position: 'relative' }} ref={datePickerRef}>
      <button
      className="year-picker"
        style={{
          borderRadius: '10px',
          padding: '5px 20px',
          cursor: 'pointer',
        }}
        onClick={toggleDatePicker}
      >
   Year:  {selectedYear ? selectedYear.getFullYear() : 'Select Year'} <ChevronDown width={28} color='#383e44' className='px-1 year-icon' />
      </button>
      {isDatePickerVisible && (
        <div style={{ position: 'absolute', zIndex: '2000' }}>
          <DatePicker
            selected={selectedYear}
            onChange={handleYear}
            inline
            showYearPicker
            dateFormat="yyyy"
            minDate={startOfYear(new Date('1900-01-01'))}
            // maxDate={endOfYear(new Date('2100-12-31'))}
            maxDate={endOfYear(new Date('2024-12-31'))}
            scrollableYearDropdown
            showMonthYearPicker={false}
          />
        </div>
      )}
    </div>
  );
};

export default YearPicker;
