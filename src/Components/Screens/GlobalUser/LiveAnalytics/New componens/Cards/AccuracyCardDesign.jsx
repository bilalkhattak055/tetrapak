import React,{useState,useEffect} from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import '../style/style.css';
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'

import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
const AccuracyCardDesign = ({data}) => {
    const [accuracyData, setaccuracyData] = useState(data.accuracy);
    const [loader, setloader] = useState(false) ;
    function getCurrentWeekdata() {
        // Create a new date object for the current date and time
        const currentDate = new Date();
        
        // Get the first day of the year
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        
        // Calculate the number of days between the current date and the start of the year
        const pastDaysOfYear = (currentDate - startOfYear) / 86400000; // 86400000 ms per day
        
        // Calculate the current week number
        const currentWeek = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        
        return currentWeek;
    }
    
      const [currentweek, setcurrentweek] = useState(getCurrentWeekdata())
useEffect(() => {
 if(data.accuracy !== undefined){
    setloader(false);
    setaccuracyData(data.accuracy)
 }
 else{
    setloader(true)
 }
}, [data])

    return (
        <>
            {/* <Card className='cardHeighForLiveAnalysis'> 
                <CardBody className='liveAnalyticsHeroCards'>
                <h5 className='mb-3 ps-2 p-1' style={{borderLeft:'5px solid #1e67d6'}}>Ai Accuracy</h5>
                {loader?<Loader3/>:<>
                    <div className='d-flex align-items-center gap-2'>
                        <div className="icon">
                            <IoIosCheckmarkCircleOutline style={{color:'#1f7edb', width:'48px',height:'48px'}}/>
                        </div>
                        <div >
                           <div className="d-flex align-items-center">
                           <h6  style={{fontSize:'30px',color:'#595959',fontWeight:'500',fontFamily: 'Roboto, sans-serif'}}  >
                                {accuracyData}%
                            </h6>
                            {accuracyData <80 ? <IoIosArrowRoundDown   style={{fontSize:'30px',color:'red',marginBottom:'8px'}}/> : <IoIosArrowRoundUp   style={{fontSize:'30px',color:'red',marginBottom:'8px'}}/> }
                             </div>
                           <div>
                            <p className='m-0 p-0 subheadingofcard' style={{color:'#8C8C8C'}}>Current week</p>
                           </div>

                        </div>
                    </div>
                    </>}
                </CardBody>
            </Card> */}
            <Card style={{borderRadius:'24px',minHeight:'180px'}}>
                {/* {loader?<div className='py-4'><Loader3/></div>:
                <CardBody style={{padding:'24px'}}>
                    <div>
                            <svg className='mb-2' width="35" height="35" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={accuracyData <80 ?'#feb9ba':'#b0d8b0'} /> 
                                <circle cx="12" cy="12" r="8" fill={accuracyData <80 ?'#feb9ba':'#b0d8b0'} />  
                                <circle cx="12" cy="12" r="5" fill={accuracyData <80 ?'#ff0000':'#008000'} />  
                            </svg>
                            <p className='mb-0' style={{color:'#8C8C8C'}}>AI Accuracy</p>
                            <h6 style={{fontSize:'30px',color:'#595959',fontFamily: 'Roboto, sans-serif'}} >
                            {accuracyData}%
                                 <span className='ms-2'> 
                                    {accuracyData <80 ?<FaArrowTrendUp style={{color:'#8C8C8C',fontSize:'25px'}}/>:<FaArrowTrendDown style={{color:'#8C8C8C',fontSize:'25px'}}/>}
                                    </span>
                            </h6>
                            <p className='mb-0' style={{color:'#8C8C8C'}}>Week {currentweek} Data</p>

                    </div>
                </CardBody>
                } */}
                <CardBody style={{padding:'24px'}}>
                    <div>
                            <svg className='mb-2' width="35" height="35" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={'#b0d8b0'} /> 
                                <circle cx="12" cy="12" r="8" fill={'#b0d8b0'} />  
                                <circle cx="12" cy="12" r="5" fill={'#008000'} />  
                            </svg>
                            <p className='mb-0' style={{color:'#8C8C8C'}}>AI Accuracy</p>
                            <h6 style={{fontSize:'30px',color:'#595959',fontFamily: 'Roboto, sans-serif'}} >
                            {accuracyData || '99'}%
                                 <span className='ms-2'> 
                                 <FaArrowTrendUp style={{color:'#8C8C8C',fontSize:'25px'}}/>
                                    </span>
                            </h6> 

                    </div>
                </CardBody>
            </Card>
            
        </>
    );
}

export default AccuracyCardDesign;
