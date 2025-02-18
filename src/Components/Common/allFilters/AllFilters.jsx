import { Col, FormGroup, Input } from "reactstrap";
import CommonFIlterButton from "../commonFilterButton/CommonFIlterButton";
import YearPicker from "../YearlyDatePicker/yearlyDatePicker";
import { useEffect, useState } from "react";
import { getWeek } from "../../../_helper/helper";

function AllFilters({
  handleInputChange,
  statuses,
  ViolationSeverity,
  factories,
  weeks,
  shifts,
  style,
  modules,
  areas,
  selectedDate,
  startDate,
  handleDateChange,
  typedate,
  dateInputShow,
  area,
  selectedMonth,
  setSelectedMonth,
  monthly,
  handleChange,
  yearly,
  handleYear,
  selectedYear,
  setSelectedYear,
  setYear,
  year,
  isDatePickerVisible,
  setIsDatePickerVisible,
  showWeeklyFilter,
  showMonthlyFilter,
  showShiftFilter,
  Shifts,
  selectedWeek,
  handleWeekChange,
  showDateFilter,
}) {
  const [currentWeek, setCurrentWeek] = useState(null);

  useEffect(() => {
    if (monthly) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const formattedMonth = month < 10 ? `0${month}` : month;
      setSelectedMonth(`${year}-${formattedMonth}`);
    }
    if (showWeeklyFilter) {
      // Get current year and week
      const now = new Date();
      const year = now.getFullYear();
      const week = getWeek(now);
      const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
      setCurrentWeek(maxWeek);
    }
  }, []);


  return (
    <Col xs="12" lg="7" 
    className="d-flex justify-content-end gap-2"
    >
      {factories && (
        <CommonFIlterButton
          data={factories}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Factory"}
          inputChangeOption={"factory"}
        />
      )}

      {areas && (
        <CommonFIlterButton
          data={areas}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Area"}
          inputChangeOption={"area"}
        />
      )}

      {modules && (
        <CommonFIlterButton
          data={modules}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Module"}
          inputChangeOption={"module"}
        />
      )}
      {shifts && (
        <CommonFIlterButton
          data={shifts}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Shift"}
          inputChangeOption={"shift"}
        />
      )}
        {weeks && (
        <CommonFIlterButton
          data={weeks}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Week"}
          inputChangeOption={"week"}
        />
      )}
      {ViolationSeverity && (
        <CommonFIlterButton
          data={ViolationSeverity}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Severity"}
          inputChangeOption={"severity"}
        />
      )}

      {statuses && (
        <CommonFIlterButton
          data={statuses}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Status"}
          inputChangeOption={"status"}
        />
      )}
      {showShiftFilter && (
        <CommonFIlterButton
          data={Shifts}
          handleInputChange={handleInputChange}
          style={style}
          firstOption={"Select Shift"}
          inputChangeOption={"shift"}
        />
      )}

      {dateInputShow && (
        <FormGroup className="marginBottom">
          {/* <Label for='role'>Factory</Label> */}
          <Input
            className="form-control rounded-3"
            type="date"
            name="role"
            id="role"
            max={new Date().toLocaleDateString("en-CA")}
            value={
              selectedDate ? selectedDate : startDate ? startDate : "mm/dd/yyyy"
            }
            style={style}
            onChange={handleDateChange}
          ></Input>
        </FormGroup>
      )}

      {monthly && (
        <FormGroup className="marginBottom">
          <Input
            className="form-control rounded-3"
            type="month"
            name="role"
            id="role"
            value={selectedMonth}
            placeholder="Filter by Month"
            style={{ width: "171px", height: "38px" ,  fontSize: 13,}}
            onChange={handleChange}
          ></Input>
        </FormGroup>
      )}
      {showMonthlyFilter && (
        <FormGroup className="marginBottom">
          <Input
            className="form-control rounded-3"
            type="month"
            name="month"
            id="role"
            max={new Date().toISOString().slice(0, 7)}
            value={selectedMonth}
            style={style}
            onChange={handleChange}
          />
        </FormGroup>
      )}
      {showWeeklyFilter && (
        <FormGroup className="marginBottom">
          <Input
            className="form-control rounded-3"
            type="week"
            name="week"
            id="week"
            max={currentWeek}
            value={selectedWeek}
            style={style}
            onChange={handleWeekChange}
          />
        </FormGroup>
      )}

      {yearly && (
        <YearPicker
          handleYear={handleYear}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          setYear={setYear}
          year={year}
          isDatePickerVisible={isDatePickerVisible}
          setIsDatePickerVisible={setIsDatePickerVisible}
        />
      )}
    </Col>
  );
}
export default AllFilters;
