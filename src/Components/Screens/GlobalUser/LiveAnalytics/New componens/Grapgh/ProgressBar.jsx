import '../../../AIModelReports/custom.css';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from 'react-feather';
import { Progress } from 'reactstrap'
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import { P } from '../../../../../../AbstractElements';
// import Loader3 from '../../../../CommonElements/Spinner/loader3'
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { getCurrentWeekNumber } from '../../../../../../utils/getCurrentWeekNumber';

const ProgressBar = ({ areaOwner, progressData, week, loadingForBars }) => {
  const moduleSize = progressData?.length

  let gapForModules;
  switch (moduleSize) {
    case 5:
      gapForModules = 'gap-3';
      break;
    case 4:
      gapForModules = 'gap-4';
      break;
    case 3:
      gapForModules = 'gap-4';
      break;
    default:
      gapForModules = 'default-gap'; // Set a default value if necessary
      break;
  }
  return (
    <Card className="w-100" style={{ height: "399px" }}>
      <CardBody className="w-100 px-4 pt-3">
        {
          loadingForBars ? <span className='"w-100 h-100 d-flex justify-content-center align-items-center position-absolute"'><Loader3 /> </span> : <> <div className={`d-flex flex-column ${gapForModules}`}>
            {progressData?.map((data) => {
              return <EachProgress data={data} className moduleSize={moduleSize} />
            })}
          </div>
            {/* <div className="d-flex justify-content-center">
              <span style={{ width: "90%", position: 'absolute', bottom: '15px' }} className="text-center f-light" >
                Week {getCurrentWeekNumber()} Data
              </span>
            </div> */}
            </>
        }

      </CardBody>
    </Card>
  )
} 
export default ProgressBar;


function EachProgress({ data, moduleSize }) {

    console.log('moduleSize', moduleSize)
    const { name, barColor, barValue, trend, percentage, tooltipContent } = data;
  
    let classNameForColor;
    if (name.toLowerCase() === 'helmet' || name.toLowerCase() === 'emergency exit' || name.toLowerCase() === 'machine guard') {
      classNameForColor = 'red-color'
    } else if (name.toLowerCase() === 'vest') {
      classNameForColor = 'light-blue-color'
    } else if (name.toLowerCase() === 'mmhe') {
      classNameForColor = 'yellow-color'
    }
    // State to control tooltip visibility and position
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
    const handleMouseEnter = (e) => {
  
      // Set tooltip position based on cursor position
      const { clientX, clientY } = e;
      setTooltipPosition({ top: clientY, left: clientX });
      setShowTooltip(true);
    };
    const handleMouseLeave = () => {
  
      setShowTooltip(false);
    };
    const handleMouseMove = (e) => {
      // Update the tooltip position while the mouse is moving
      const { clientX, clientY } = e;
      setTooltipPosition({ top: clientY, left: clientX });
    };
  
    // Animated progress value
    const [animatedValue, setAnimatedValue] = useState(0);
  
    // Animate progress bar to its final value on load
    useEffect(() => {
      // Trigger the progress bar to animate to its final width after mount
      setTimeout(() => {
        setAnimatedValue(barValue);
      }, 10); // Small delay to initiate the animation
    }, [barValue]);
  
    return (<>
      <div className="chart-container progress-chart pt-2 w-100">
         
          <div>
            <h6>{name}</h6>
          </div>
          
         
        <div className=''> 
          {/* <Progress type={'button'} className="prog-bar-analytics progress-bar progress-bar-striped progress-bar-animated" color={barColor} value={barValue} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} /> */}
          <div className='d-flex align-items-center justify-content-between' style={{width:'100%'}}>
          <div className="progress progressCustomHeigh"
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}
            style={{width:'94%'}}
          >
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated  ${classNameForColor && classNameForColor}`}
              role="progressbar"
              aria-valuenow={barValue}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{
                width: `${animatedValue}%`,
                backgroundColor: `${barColor} !important`, // Apply different colors dynamically
                transition: 'width 1s ease-in-out', // Smooth transition with ease-in-out
              }}
            ></div>
            
          </div>
          
          <div className='d-flex'>
            {trend === 'uptrend' ?
              <ArrowUp style={{ position: 'relative', top: '2px', right: '2px',}} color="green" size={19} />
              :
              <ArrowDown style={{ position: 'relative', top: '2px', right: '2px' }} color="red" size={19} />
            } <P>{percentage}</P>
          </div>
          </div>
          {
            moduleSize <= 3 && (
              <div
                className="mt-3"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flexDirection: 'row',
                }}
              >
                {tooltipContent.map((item, index) => (
                  <span key={index}><strong>{item.label}: </strong> {item.value}</span>
                ))}
              </div>
            )
          }
  
  
          {/* Tooltip: Show only if showTooltip is true */}
          {showTooltip && moduleSize >= 4 && (
            <div
              className="custom-tool"
              style={{
                position: 'fixed',
                // top: '12px',
                // left: '48px',
                top: `${tooltipPosition.top + 15}px`, // Slightly offset to not overlap the cursor
                left: `${tooltipPosition.left - 100}px`, // Slightly offset to not overlap the cursor
                width: 'max-content',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '3px',
                padding: '8px',
                zIndex: 1000,
  
              }}
            >
              {tooltipContent.map((item, index) => (
                <span key={index}><strong>{item.label}: </strong> {item.value}</span>
              ))}
  
            </div>
          )}
          
        </div>
      </div>
    </>)
  }