import React, { useState, useRef, useEffect } from 'react';
import { Progress, Tooltip } from 'reactstrap';

// ProgressWithTooltip Component
const ProgressWithTooltip = ({ name, barValue, totalAlerts, totalCompliance,max_alerts,bgColor,data }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const progressBarRef = useRef(null); // Ref to store the progress bar DOM element

  useEffect(() => {
    // Ensure that the Tooltip is linked to the target element
    if (progressBarRef.current) {
      setTooltipOpen(false); // Reset tooltip visibility
    }
  }, [progressBarRef.current]); // Run whenever the progress bar is rendered
 

  return (
    <div  style={{ position: 'relative' }}>
      <div
        ref={progressBarRef}
        onMouseEnter={toggleTooltip} 
        onMouseLeave={toggleTooltip} 
      >
        <Progress
          value={barValue}
          style={{
            height: '10px',
            borderRadius: '50px',
            backgroundColor: '#e9ecef',
            cursor:'pointer'
          }}
          barStyle={{
            backgroundColor:bgColor,
            borderRadius: '50px',
          }}
        />
      </div>

      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={progressBarRef} 
        toggle={toggleTooltip} 
        style={{
            background:'#635470',
            color:'white'
        }}
      >
        {/* <div className='text-start'><strong>Name:</strong> {name}</div> */}
        <div className='text-start'><strong>Total Records:</strong> {data?.total_records || 'N/A'}</div>
        <div className='text-start'><strong> Compliance:</strong> {data?.compliance_count}</div>
        <div className='text-start'><strong>Non Compliance:</strong> { data?.alert_count }</div>
      </Tooltip>
    </div>
  );
};

export default ProgressWithTooltip;