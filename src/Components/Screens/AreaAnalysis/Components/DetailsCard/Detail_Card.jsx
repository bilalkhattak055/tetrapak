import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { CiUser } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import  '../../Style/style.css'
import { Link,useNavigate } from 'react-router-dom';
const DetailCard = ({setAllData, allData, items,areaData, filters}) => {
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('role'))) ;
    const navigate=useNavigate()
const handleNavigate=(data)=>{ 
    const id={
        id: data?.AreaId,
        name: data?.AreaName,
        owner:data?.AreaOwner,
        area_owner_id:data?.AreaOwnerId
    };
    localStorage.setItem('areaPayload', JSON.stringify(id));
    localStorage.setItem('areaanalysisalertfilters', JSON.stringify(filters))
    navigate(`${process.env.PUBLIC_URL}/areaanalysis/alerts/${items.AreaName}/${role}`)
}
    return (
        <>
        <Card className='card-hover-area-analysis' onClick={()=>{handleNavigate(items)}}>
                <CardBody >

                    <div className='mt-2 d-flex ' style={{ fontSize: '15px', }}>
                        <CiUser style={{ fontWeight: 'bold', fontSize: '25px' }} />
                         <h6 className='mx-1'>{items.AreaOwner==='Muhammad Shahbaz' ? 'M.Shahbaz' : items.AreaOwner}</h6>
                    </div>
                    <p className='mb-4' style={{ fontSize: '15px', color: 'grey' }}>{items.AreaName}</p>
                    <Row>
                        <Col xs='6' className='d-flex align-items-center'>
                            <FaCamera style={{ fontWeight: 'bold', fontSize: '20px',color:'#3B82F6' }}/>
                            <p className='mx-1' style={{fontSize:'22px',fontWeight: '600'}}>{items.SubAreas?.length}</p>
                        </Col>
                        <Col xs='6' className='text-end'>
                        <p className='m-0 p-0'>Compliance</p>
                            <h4  style={{ fontWeight: 'bold', fontSize: '20px' }}>{items.AreaCompliance?.toFixed(0) }%</h4> 
                        </Col>
                        <Col>
                        <div style={{width:'100%', background:'#eaeaea',borderRadius:'3px'}} className='mt-2 p-0'>
                                <div style={{width:`${items.AreaCompliance}%`,height:'8px',background:items.AreaCompliance<50?'#ff0000':items.AreaCompliance>=50 && items.AreaCompliance<=80?'#facb23':'#20e647',borderRadius:'3px'}}>

                                </div>
                            </div>
                        </Col>
                    </Row>


                </CardBody>
            </Card>
        {/* <Link to={`${process.env.PUBLIC_URL}/areaanalysis/details/${items.AreaName}/${role}`}> 
            
            </Link> */}
        </>
    );
}

export default DetailCard;
