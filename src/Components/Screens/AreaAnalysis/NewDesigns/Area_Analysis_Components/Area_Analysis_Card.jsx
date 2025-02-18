import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Row, Col, Button, CardFooter } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import User from '../../../../../assets/fonts/user.svg';
import { useNavigate } from 'react-router-dom';
import '../style.css'
import { errorToast } from "../../../../../_helper/helper";
import CustomProgressBar from "../../Components/CustomProgressBar";

const SubAreaCard = ({ name, percentage, cameras, area, items,areaData,allData, filters}) => {
    console.log('allDataallData', allData) 
    const progressColor = percentage == 100 ? "#28a745" : "#D99104"; 
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('role')));
    const navigate = useNavigate()
    const handleNavigate = (data) => { 
       
        console.log('dataaaaa', data)
        const id={
            id: data?.AreaId,
            name: data?.AreaName,
            owner:data?.AreaOwner
        };
        // localStorage.setItem('areaPayload', JSON.stringify(id));
        // navigate(`${process.env.PUBLIC_URL}/areaanalysis/details/${items.AreaName}/${role}`)
        localStorage.setItem('areaPayload', JSON.stringify(id));
    localStorage.setItem('areaanalysisalertfilters', JSON.stringify(filters))
    navigate(`${process.env.PUBLIC_URL}/areaanalysis/alerts/${items.AreaName}/${role}`)
    } 
    return (
        <Card
            style={{
                borderRadius: "12px",
                border: "1px solid #ECECEC",
                minHeight:'200px'
            }} 
        >
            <CardBody  >
                <div className="d-flex justify-content-between align-items-center   ">
                    <div style={{ display: "flex" }}>
                        <CardTitle tag="h5" className="mt-2">
                            <img
                                src={User}
                                alt="user"
                                style={{ marginBottom: "2px", marginRight: "2px" }}
                            />
                            {items?.AreaOwner}
                        </CardTitle>
                    </div>
                    <CustomProgressBar percentage={items?.AreaCompliance} progressColor={progressColor} /> 
                </div>
                <div
                    style={{ border: "1px solid #ECECEC", width: "100%" }}
                    className="mt-2"
                ></div> 
                <CardText className="mt-3 ">
                    <div className="d-flex justify-content-between">
                        {items?.SubAreas?.length} Camera<br />
                        <CardText  style={{ fontWeight: 500, fontSize: '16px' }}>{items?.AreaName}</CardText>
                    </div>
                    <div className="d-flex justify-content-between">
                        {items?.SubAreas
                            ? items.SubAreas?.reduce((totalViolations, item) => totalViolations + (item.Violations || 0), 0)
                            : 0} Alerts<br />
                    </div>

                </CardText> 

                 
              
            </CardBody>
            <div className="d-flex justify-content-center align-items-center mb-2">
            <Button
                    outline
                    size="sm" 
                    style={{
                        width: "90%",
                        padding: "6px",
                        borderRadius: "4px", 
                        border: "1px solid #ECECEC",
                    }}
                    className="newDesignCardBtn "
                    onClick={(e=>handleNavigate(items))}
                    color="primary"
                >
                    See Details
            </Button>

            </div>
        </Card>
    )
}

export default SubAreaCard;