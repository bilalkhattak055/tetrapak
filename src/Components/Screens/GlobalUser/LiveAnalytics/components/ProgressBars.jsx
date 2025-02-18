import '../../AIModelReports/custom.css';
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from 'react-feather';
import { Progress } from 'reactstrap'
import { P } from '../../../../../AbstractElements';
// import Loader3 from '../../../../CommonElements/Spinner/loader3'
import Loader3 from '../../../../../CommonElements/Spinner/loader3'
import { getCurrentWeekNumber } from '../../../../../utils/getCurrentWeekNumber';

const ProgressBars = ({ areaOwner, progressData, week, loadingForBars }) => {
  const [progressDataa, setProgressDataa] = useState()
  const moduleSize = progressData?.length

  useEffect(()=> {
    if(progressData) {
      const sortedData = [...progressData].sort((a, b) => {
        if (a.barValue === -1 && b.barValue !== -1) return 1; // Move `a` to the end if it's -1
        if (a.barValue !== -1 && b.barValue === -1) return -1; // Move `b` to the end if it's -1
        return 0; // Keep other items in their relative order
      });
      setProgressDataa(sortedData)
    
    }
       
  }, [progressData])

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

  console.log('progressDataaprogressDataa', progressDataa)
  return (
    <Card className="w-100" style={{ height: "399px" }}>
      <CardBody className="w-100 px-4 pt-3">
        {
          loadingForBars ? <span className='"w-100 h-100 d-flex justify-content-center align-items-center position-absolute"'><Loader3 /> </span> : <> <div className={`d-flex flex-column ${gapForModules}`}>
            {progressDataa?.map((data) => {
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

export default ProgressBars

function EachProgress({ data, moduleSize }) {
 
  const { name, barColor, barValue, trend, percentage, tooltipContent } = data; 
  

  let classNameForColor;
  if (barValue > 79) {
    classNameForColor = 'green-color'
    // classNameForColor = 'red-color'
  } else if (barValue > 50 && barValue < 80) {
    classNameForColor = 'yellow-color'
    // classNameForColor = 'light-blue-color'
  } else if (barValue < 50) {
    // classNameForColor = 'yellow-color'
    classNameForColor = 'red-color'
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
//&& tooltipContent.some(item => item.value && item.value !== 'undefined' && item.value && item.value !== 'undefined (undefined)')
  return (<>
    <div className="chart-container progress-chart pt-2 w-100">
      <div className='d-flex justify-content-between'>
        <div>
          <h6>{name}</h6>
        </div>
        <div className='d-flex'>
          {/* {trend === 'uptrend' ?
            <ArrowUp style={{ position: 'relative', top: '2px', right: '2px' }} color="green" size={16} />
            :
            <ArrowDown style={{ position: 'relative', top: '2px', right: '2px' }} color="red" size={16} />
          }  */}
          
          <P>{barValue > 1 &&  `${parseInt(percentage).toFixed(0)}%` || null}</P>
        </div>
      </div>
      <div className=''>


        {/* <Progress type={'button'} className="prog-bar-analytics progress-bar progress-bar-striped progress-bar-animated" color={barColor} value={barValue} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} /> */}
        {barValue < 1 ? <span className='f-light'> N/A</span> :<div className="progress"
          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></div>
        </div>}
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
 
            {tooltipContent.map((item, index) => {
  //tooltipContent.some(item => item.value && item.value !== 'undefined' && item.value && item.value !== 'undefined (undefined)')
 
              return (<span key={index}><strong>{item.label}: </strong> {item.value === "undefined" ? 'N/A' : item.value === "undefined (undefined)" ? 'N/A' : item.value}</span>)
            })}
            {/* {tooltipContent
              .filter(item => item.value && item.value !== 'undefined') // Filter valid items
              .map((item, index) => (
                <span key={index}>
                  <strong>{item.label}: </strong> {item.value}
                </span>
              ))} */}

          </div>
        )}
      </div>
    </div>
  </>)
}




