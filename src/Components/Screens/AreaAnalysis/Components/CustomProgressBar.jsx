import React from 'react'
import '../NewDesigns/style.css'
 const CustomProgressBar=({percentage,progressColor})=> {
  return (
    <div className="progress-container">
    <div
        className="progress-circle"
        style={{
        background: `conic-gradient(${progressColor} ${percentage * 3.6}deg, #f0f0f0 0deg)`,
        }}
    >
        <div className="progress-text "><span className='f-light ' style={{fontSize: '10px'}}>{percentage.toFixed(0)}%</span></div>
    </div>
</div>
  )
}
export default CustomProgressBar