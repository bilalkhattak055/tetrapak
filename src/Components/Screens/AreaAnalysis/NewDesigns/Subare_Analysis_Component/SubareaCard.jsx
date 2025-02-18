import React, { useEffect,useState } from 'react'
import { Card, CardBody, CardTitle, CardText,  Button } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; 
import design from '../../../../../assets/fonts/design.svg'
import ModuleDisplay from './Modules_ToolTip'
import CustomProgressBar from '../../Components/CustomProgressBar';
import '../../Style/style.css'

const SubareaCardd=({ maintitle,  percentage, cameras, areaname, areamanager, alerts, alertstat, moduleLabel, moduleBackgroundColor, moduleFontColor, })=>{
    const progressColor = percentage > 80 ? "#28a745" : "#D99104"; 
  
  return (
    <Card
            style={{
                borderRadius: "12px",
                border: "1px solid #ECECEC", 
                flexDirection: "column",    
                height: "auto",
                overflow: "hidden",
            }}
        >
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <CardTitle style={{ marginBottom: "0px", fontWeight: 500, fontSize: '20px' }}>
                            <img
                                src={design}
                                alt="user"
                                style={{  marginRight: "2px", textOverflow: "ellipsis", whiteSpace: "nowrap", }}
                            />
                            {maintitle?.split('(')[0] || maintitle}
                        </CardTitle>
                        <CardTitle
                            tag="p"
                            style={{
                                fontSize: "12px",
                                color: '#595959',
                                fontWeight: 400,
                                marginTop: "0px",
                                lineHeight: "15px",
                                textAlign: 'center',
                                marginLeft: '25px',  
                            }}
                        >
                            {/* {maintitle?.split('(')[1]?.replace(')', '') || ''} */}
                            {maintitle?.split('(')[1] ? `(${maintitle.split('(')[1]}` : ''}


                        </CardTitle>
                    </div>
                    <CustomProgressBar percentage={percentage} progressColor={progressColor} />
                </div>
                <div style={{ border: "1px solid #ECECEC", width: "100%" }} className="mt-1"></div>
                <div className="d-flex justify-content-between align-items-center py-2 flex-wrap">
                        <div>Module</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            {/* {moduleLabel} */}
                            <ModuleDisplay modules={moduleLabel}/>
                          </div>
                    </div>

                <div  style={{ border: "1px solid #ECECEC", width: "100%" }}></div>
                    <div className="d-flex justify-content-between py-1">
                        Area Name<br />
                        <CardText style={{ fontWeight: 500, fontSize: '16px' }}>{areaname}</CardText>
                    </div>
              
                    <div className="d-flex justify-content-between py-1 "  >
                       <span style={{minWidth:'100px'}} > Area Owner</span>
                        <CardText className='ellipsis-textt  ps-2' style={{ fontWeight: 500, fontSize: '16px' }}>{areamanager}</CardText>
                    </div>
               
                    <div className="d-flex justify-content-between py-1">
                        Cameras<br />
                        <CardText style={{ fontWeight: 500, fontSize: '16px' }}>{cameras}</CardText>
                    </div>
              
                    <div className="d-flex justify-content-between py-1">
                        Alerts<br />
                        <CardText style={{ fontWeight: 500, fontSize: '16px' }}>{alerts}</CardText>
                    </div>
               
            </CardBody>
        </Card>
  )
}

export default SubareaCardd;

 