import React, { useState } from 'react' 
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'; 
import '../style/style.css' 
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { PiWarningOctagon } from "react-icons/pi";

const HighestOrHighSeverity=({data,heading,highestboolean,area,subarea,owner,module,alert,loader,shift })=> {  
  return (
    <Card style={{ borderRadius: '24px',height:'160px'}}  >
    {loader?<span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>:
    <CardBody className='p-4'>
        <div className='d-flex justify-content-between'>
            {/* child 1 */}
            <div>
                <p className='ellipsis-text'  style={{fontSize:'16px',color:'#383838',fontWeight:'400'}}>{heading}</p>
                 <div className=' d-flex align-items-center gap-2 '>
                  { highestboolean ? 
                    <IoWarning style={{width:'40px',height:'40px',borderRadius:'50%',padding:'8px',background:'#635470',color:'white'}}/>
                :
                < PiWarningOctagon    style={{width:'40px',height:'40px',borderRadius:'20px',padding:'5px',background:'#635470',color:'white'}}/>
                } 
                <p className='ellipsis-text m-0' style={{color:'#595959',fontSize:'16px',fontSize:'30px',fontWeight:'500'}} >{alert || 'N/A'}</p>
                {/* {alert && alert>80 ? 
                  <FaArrowTrendUp   color='red' style={{width:'25px',height:'25px'}} /> 
                : alert && alert<80 ? 
                <FaArrowTrendDown   color='red' style={{width:'25px',height:'25px'}} /> 
                :null
                } */}
                </div>
            </div>

            {/* child 2 */}
            <div>
            <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Details</p>
                <p className='m-0 p-0 ellipsis-text' style={{  fontSize: '12px' }}>Area: { area ||  'N/A'}</p>
                <p className='m-0 p-0 ellipsis-text' style={{  fontSize: '12px' }}>Module: {module || 'N/A'}</p>
                {/**<p className='m-0 p-0 ellipsis-text' style={{ fontSize: '12px' }}>Sub Area: { subarea || 'N/A'}</p>
                <p className='m-0 p-0 ellipsis-text' style={{  fontSize: '12px' }}>Owner: { owner ||  'N/A'} </p>*/}
                <p className='m-0 p-0 ellipsis-text' style={{  fontSize: '12px' }}>Shift: { shift ||  'N/A'} </p>
            </div>
        </div>
   
    </CardBody>
}
</Card>
  )
}

export default HighestOrHighSeverity;