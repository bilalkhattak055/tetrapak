import React from 'react'
import { Button } from 'reactstrap'
import './tableButton.css'

const index = ({ btnText, onChange, onClick, bgcolor, icon,height,width, btType, className }) => {

  return (

    <>
      {/* <Button
  className='tableButton  '
    color="primary" 
  >
    {btnText}
  </Button> */}
      <button type={btType} className={` ${className} ${bgcolor ? bgcolor : 'btn-primary'}`} style={{ height:`${height?height:'38px'}` ,width:`${width?width:'140px'}`,border:'0px',borderRadius:'7px',color:'white' }} onChange={onChange} onClick={onClick}>
        {btnText}
        
        {icon ?
          <img src={icon} alt="" style={{ marginLeft: '5px', width: '20px' }} /> : ''}
      </button>
    </>

  )
}

export default index
