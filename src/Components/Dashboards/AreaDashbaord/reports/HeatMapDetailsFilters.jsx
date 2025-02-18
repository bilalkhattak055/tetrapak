import React, { useState } from 'react'
import CommonFIlterButton from '../../../Common/commonFilterButton/CommonFIlterButton'
// import { modulesforAlerts, Shifts, ViolationSeverity } from '../../../../../../Data/staticData/data'
import { dateChoose } from '../../../Screens/GlobalUser/AIModelReports/Components/data/staticData'
import { Button, FormGroup, Input, Card } from "reactstrap";


export default function HeatMapDetailsFilters({xvalue, yvalue, subValue, subanalysis, analysis, maxWeek, role, style, areas, subarea, modulesforAlerts, Shifts, ViolationSeverity, selectedOption, handleDateDrop, currentWeekk, handleNewInputChange, newFilters, dateShow, monthShow, weeklyShow, customDate }) {
const rolee = JSON.parse(localStorage.getItem('role'))
console.log('sub area names', subarea)
console.log('analysissss', analysis)
  return (
    <>
    {
      role == 'qa' && 
      <>
      <Input 
      style={style}
      value={newFilters.approval}
      type='select'
      onChange={(e)=>handleNewInputChange(e,'approval')}
      >
      <option value={'Select Approval'}>Select Approval</option>
      <option value={'Verified'}>Verified</option>
      <option value={'Accepted'}>Accepted</option>
      <option value={'Rejected'}>Rejected</option>
      <option value={'Unverified'}>Unverified</option>
      </Input>

      </>
    }
 
      {/* {
        ViolationSeverity &&
        <div className="" >
          <CommonFIlterButton
            data={ViolationSeverity}
            handleInputChange={handleNewInputChange}
            style={style}
            selectedItem={newFilters?.severity}
            firstOption={"Select Severity"}
            inputChangeOption={"severity"}
          />
        </div>
      } */}
      {
        Shifts &&
        <div className=" ">

          <CommonFIlterButton
            data={Shifts}
            handleInputChange={handleNewInputChange}
            style={style}
            selectedItem={newFilters?.shift}
            firstOption={"Select Shift"}
            inputChangeOption={"shift"}
          />
        </div>
      }
  
  
      <div className=''>

        <Input
          className=" rounded-3"
          type="select"
          name="role"
          id="role"
          style={style}
          value={selectedOption}
          onChange={handleDateDrop} // Make sure it's `onChange` not `OnChange`
        >
          {dateChoose.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Input>

      </div>
      {dateShow && (
        <>
          <Input
            className="form-control rounded-3"
            type="date"
            name="role"
            id="role"
            max={new Date().toLocaleDateString("en-CA")}
            value={newFilters.date}
            style={style}
            onChange={(e) => handleNewInputChange(e, "date")}
          />
        </>
      )}
      {monthShow && (
        <>
          <Input
            className="form-control rounded-3"
            type="month"
            name="month"
            id="role"
            max={new Date().toISOString().slice(0, 7)}
            value={newFilters.month}
            style={style}
            onChange={(e) => handleNewInputChange(e, "month")}
          />
        </>
      )}
      {weeklyShow && (
        <>
          <Input
            className="form-control  rounded-3"
            type="week"
            name="week"
            id="week"
            max={maxWeek}
            value={newFilters?.week}
            style={style}
            onChange={(e) => handleNewInputChange(e, "week")}
          />
        </>
      )}
      {customDate && (
        <>
          <div className="">
            <Input
              className="form-control rounded-3 "
              type="date"
              name="start_date"
              id="start_date"
              multiple={true}
              max={new Date().toLocaleDateString("en-CA")}
              value={newFilters?.starting}
              style={style}
              onChange={(e) => handleNewInputChange(e, "starting")}
            />
            {/* <p className="m-0 p-0  ">To</p> */}
            <Input
              className="form-control rounded-3 mt-2"
              type="date"
              name="end_date"
              id="end_date"
              placeholder="End Date"
              // disabled={filters?.start_date?.trim() === ""}
              // min={filters?.start_date}
              max={new Date().toLocaleDateString("en-CA")}
              value={newFilters?.ending}
              style={style}
              onChange={(e) => handleNewInputChange(e, "ending")}
            />
            {/* <Button
                    color="success"
                    style={{
                      padding: "0px 10px",
                      height: "38px",
                      // margin: "10px 3px",
                    }}
                    // onClick={() => fetchCustomDurationAlerts()}
                  >
                    Save
                  </Button> */}
          </div>
        </>
      )}

    </>
  )
}
