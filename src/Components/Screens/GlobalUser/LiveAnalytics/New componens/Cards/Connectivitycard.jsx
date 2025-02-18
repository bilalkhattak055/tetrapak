import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { LiaShareAltSolid } from "react-icons/lia";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import '../style/style.css';
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { ScaleLoader  } from 'react-spinners';
const Connectivitycard = ({data}) => {
    const [loader, setloader] = useState(true);
    const [connectivityData, setconnectivityData] = useState(data) 
    useEffect(() => {
       if(data?.value !== undefined){
        setloader(false);
        setconnectivityData(data)
       }
       else{
        setconnectivityData(true)
       }
    }, [data])
    
    return (
        <>
        {/* <Card className='cardHeighForLiveAnalysis'>
        <CardBody className='liveAnalyticsHeroCards'>
        <h5 className='mb-3 ps-2 p-1' style={{borderLeft:'5px solid #1e67d6'}}>Connectivity</h5> 
            {loader?<Loader3/>:<>
            
            <div className='d-flex align-items-center gap-2'>
                <div className="icon">
                    <LiaShareAltSolid style={{color:'#1f7edb', width:'48px',height:'48px'}}/>
                </div>
                <div className=' w-100'>
                   <div className="d-flex align-items-center">
                   <h6 style={{fontSize:'30px',color:'#595959',fontFamily: 'Roboto, sans-serif'}} >
                        {data?.value}%
                    </h6>
                    {data?.trend=='up'?<IoIosArrowRoundUp style={{fontSize:'30px',color:'green',marginBottom:'8px'}}/>:data?.trend=='down'?<IoIosArrowRoundDown style={{fontSize:'30px',color:'green',marginBottom:'8px'}}/>:null}
                        
                   </div>
                   <div>
                    <p className='m-0 p-0 subheadingofcard ellipsis-text ' style={{color:'#8C8C8C',width:'90%'}}>{data?.status}</p>
                   </div>

                </div>
            </div>
            </>}
        </CardBody>
    </Card> */}
        
        <Card style={{background:'#175fa4',borderRadius:'24px',minHeight:'180px',maxHeight:'180px'}}>
            {loader?<div className='w-100 d-flex justify-content-center align-items-center'><ScaleLoader color='white' className='py-4' /></div>:
                <CardBody style={{padding:'24px'}}>
                    <div style={{width:'100%'}}>
                            <svg className='mb-2' width="35" height="35" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill="#b0d8b0" /> 
                                <circle cx="12" cy="12" r="8" fill="#b0d8b0" />  
                                <circle cx="12" cy="12" r="5" fill="#008000" />  
                            </svg>
                            <p className='mb-0' style={{color:'#BAD7F4'}}>Connectivity</p>
                            <h6 style={{fontSize:'30px',color:'white',fontFamily: 'Roboto, sans-serif'}} >
                                {data?.value}%
                                 <span className='ms-2'> 
                                    {data?.trend=='up'?<FaArrowTrendUp style={{color:'white',fontSize:'25px'}}/>:data?.trend=='down'?<FaArrowTrendDown style={{color:'white',fontSize:'25px'}}/>:null}
                                    </span>
                            </h6>
                            <p className='mb-0 ellipsis-text ' style={{color:'#BAD7F4',width:'100%'}}>{data?.status}</p>

                    </div>
                </CardBody>
                }
            </Card>
        </>
    );
}

export default Connectivitycard;
