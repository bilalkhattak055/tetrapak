import React, { useEffect, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { dateChoose } from '../data/staticData';
import AreaService from '../../../../../../api/areaService';

export default function DateFilter({showAreaFilter, maxWeek,shiftNotShow, allarea, area, allData, shouldShowButton,style, selectedOption,selectArea, currentWeek,typeHeadChange,filters,handleDateDrop,handleInputChange, dateShow,monthShow,weeklyShow,customDate}) {
    const multiple = true

  
    
   
  return (
    <>
    {
      !area && (

        <FormGroup className='mx-2'>
        {!selectArea && !showAreaFilter && (
       <Typeahead
       style={{ minWidth: '112px'}} // Adjust min and max widths
       id="areas"
       labelKey="label"
       multiple={multiple} // Ensures multi-selection
      //  options={[...allarea].sort((a, b) => {
      //    // Extract numeric part and compare for sorting
      //    const numA = parseInt(a.label.split('-')[1], 10);
      //    const numB = parseInt(b.label.split('-')[1], 10);
      //    return numA - numB;
      //  })} // Provide the array of all available areas
      options={allarea
        .filter(a => a.active)  // Only include active areas
        .sort((a, b) => {
          const numA = parseInt(a.label.split('-')[1], 10);
          const numB = parseInt(b.label.split('-')[1], 10);
          return numA - numB;
        })
        .map(a => a.label)
      }
      
      selected={filters?.areas?.map((area) => {
        const matchedArea = allarea.find((a) => a.label.startsWith(area)); // Match the start of the label with filters.areas value
        return matchedArea ? matchedArea.label : null; // Return the full label if matched
      }).filter(Boolean)} // Exclude null values
       // Sync selected items to the filters.areas array
       placeholder="Select Area"
       onChange={(selected) => {
        console.log('choosing typeahead', selected)
        typeHeadChange('areas', selected)
       }
      
      }
      renderMenuItemChildren={(option) => {
        const matchedOption = allarea.find((a) => a.label === option);
        const isActive = matchedOption?.active;
      
        return (
          <div
            style={{
              color: isActive ? "inherit" : "#a9a9a9", // Dimmed color for inactive areas
              opacity: isActive ? 1 : 0.6, // Slightly transparent for inactive areas
              pointerEvents: isActive ? "auto" : "none", // Disable click for inactive options
              cursor: isActive ? "pointer" : "not-allowed",
              whiteSpace: 'normal',
              wordBreak: 'break-word',
            }}
          >
            {option}
          </div>
        );
      }}
          
      
       menuStyle={{
        maxHeight: '200px', // Set max height for the dropdown
        overflowY: 'auto', // Enable scroll for overflow
      }}
     />
     
        )}
      </FormGroup>
      
      )
    }
       {!shiftNotShow &&<FormGroup className='mx-2 align-self-center'>
       <Typeahead
        style={{minWidth:'112px'}}
          id="areas"
          labelKey="name"
          multiple={multiple}
          options={['Shift A', 'Shift B', 'Shift C']}
          selected={filters.shifts}
          placeholder="Select Shift"
          onChange={(selected) => typeHeadChange('shifts', selected)}
        />
      </FormGroup>}
      <FormGroup className='mx-2 my-0 align-self-center' style={{justifySelf:'center'}}>
                <Input
                  className='rounded-3'
                  type="select"
                  name="role"
                  id="role"
                  style={style}
                  value={selectedOption}
                  onChange={handleDateDrop}  
                >
                  {/* <option value="Select Date">
          {selectedOption === 'Select Date' ? 'Select Date' : selectedOption}
        </option> */}
                  {dateChoose.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>
     
              {
                dateShow && (
                  <>
                  <FormGroup className='mx-2 align-self-center' style={{justifySelf:'center'}}>
                    <Input
                      className="form-control rounded-3"
                      type="date"
                      name="role"
                      id="role"
                      max={new Date().toLocaleDateString("en-CA")}
                      value={filters.date}
                      style={style}
                      onChange={(e)=>handleInputChange(e,'date')}
                    />
                    </FormGroup>
                  </>
                )
              }
              {
                monthShow && (
                  <>
                  <FormGroup className='mx-2 align-self-center' style={{justifySelf:'center'}}>
                   <Input
                className="form-control rounded-3"
                type="month"
                name="month"
                id="role"
                max={new Date().toISOString().slice(0, 7)}
                value={filters.month}
                style={style}
                onChange={(e)=>handleInputChange(e,'month')}
              />
              </FormGroup>
                  </>
                )
              }
              {
                weeklyShow && (
                  <>
                  <FormGroup className='mx-2 align-self-center' style={{justifySelf:'center'}}>
                   
                    <Input
                      className="form-control  rounded-3"
                      type="week"
                      name="week"
                      id="week"
                      max={maxWeek}
                      value={filters?.week}
                      style={style}
                    onChange={(e)=>handleInputChange(e,'week')}
                    />
                    </FormGroup>
                  </>
                )
              }
              {
                customDate && (
                  <>
                    <div className=''>
                      <FormGroup className='mx-2 align-self-center justify-self-center' style={{justifySelf:'center'}}>
                      <Label htmlFor="start_date">Start date</Label>
                      <Input
                        className=" rounded-3 "
                        
                        type="date"
                        name="start_date"
                        id="start_date"
                        multiple={true}
                        max={new Date().toLocaleDateString("en-CA")}
                        value={filters?.starting ? filters?.starting : 'Start date'}
                        style={style}
                      onChange={(e)=>handleInputChange(e,'starting')}
                      />
                      </FormGroup>
                      <FormGroup className='mx-2 align-self-center justify-self-center' style={{justifySelf:'center'}}>
                      <Label htmlFor="end_date">End date</Label>
                      <Input
                        className="form-control rounded-3 "
                        type="date"
                        name="end_date"
                        id="end_date"
                        placeholder="End Date"
                        // disabled={filters?.start_date?.trim() === ""}
                        // min={filters?.start_date}
                        max={new Date().toLocaleDateString("en-CA")}
                        value={filters?.ending}
                        style={style}
                        onChange={(e)=>handleInputChange(e,'ending')}
                      />
                      </FormGroup>
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
                )
              }
    
    </>
  )
}
