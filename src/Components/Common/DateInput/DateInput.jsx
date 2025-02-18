const DateInput = ({ label, value, onDateChange, min, max }) => {
    const handleChange = (e) => {
      onDateChange(e.target.value); // Call the parent callback when the date changes
    };
  
    return (
      <div className="date-input">
        <label>{label}</label>
        <input
          type="date"
          value={value}
          onChange={handleChange}
          min={min} // Optional min date
          max={max} // Optional max date
        />
      </div>
    );
  };
  
  export default DateInput;