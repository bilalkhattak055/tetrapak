import React from 'react';
// import calendarImage from './../../../assets/images/dashboard/calendarTiming/calendar-svg.svg'
import calendarImage from '../../../../../assets/images/dashboard/calendarTiming/calendar-svg.svg'
import watchImage from '../../../../../assets/images/dashboard/calendarTiming/watch-svg.svg'
// import '../../../../../Components/Dashboard/components/calendarTiming/calendar.css'
import '../../../../../Components/Dashboards/Dashboard/components/calendarTiming/calendar.css'

const Calender = (props) => {
  // console.log('this calender props', props)
 const{showDateTimePicker,setShowDateTimePicker} = props;
  return (
    <div className="calendar-time d-flex gap-2 rounded" onClick={()=> setShowDateTimePicker(!showDateTimePicker)}>
          <div className='border-right pe-2'><img width={15} height={15} src={calendarImage} alt="" className='me-1' /> <span>Today</span></div>
          <div className=''><img width={15} height={15} src={watchImage} alt="" className='me-1' /> <span>8:00 to 9:00 AM</span></div>
      </div>
  )
}

export default Calender
