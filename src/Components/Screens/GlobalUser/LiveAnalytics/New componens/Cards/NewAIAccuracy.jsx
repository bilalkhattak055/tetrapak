import React from 'react'
import { Card, CardBody } from 'reactstrap'; 
import { FaArrowTrendUp,FaArrowDown } from "react-icons/fa6";
import { SiOpenai } from "react-icons/si";
import  Loader3  from '../../../../../../CommonElements/Spinner/loader3';
import { ArrowDown } from 'react-feather';

 const NewAIAccuracy=({data,loader})=> {
  let accuracyPercent=data
  return (
    <Card  style={{borderRadius:'24px',height:'160px'}}>
      {loader?<span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>:
        <CardBody className='p-4'> 
            <p style={{fontSize:'16px',color:'#383838',fontWeight:'400'}} className="ellipsis-text">AI Accuracy</p>
            <div className=' d-flex align-items-center gap-2 '>
                <SiOpenai    style={{width:'40px',height:'40px',borderRadius:'20px',padding:'5px',background:'#635470',color:'white'}}/>
                <p className=' m-0' style={{color:'#595959',fontSize:'16px',fontSize:'30px',fontWeight:'500'}} > 
                                    {accuracyPercent === "NaN"
                                      ? "N/A"
                                      : !accuracyPercent
                                      ? "N/A"
                                      : accuracyPercent + "%"}
                </p> 
            </div>
        </CardBody>
  }
    </Card>
  )
}
export default NewAIAccuracy