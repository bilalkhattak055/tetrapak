import React, { useState } from 'react';
import { Row, Col, Card, Table } from "react-bootstrap";
import { FaRegCircle } from "react-icons/fa";
import Chart from 'react-apexcharts';
import '../style/style.css'
import { CardBody } from 'reactstrap';
import { FiAward } from "react-icons/fi";
import { IoTrendingUpSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
const TopLeaderCard = ({ data, rank }) => {

    // ----------x-------------------x--------------
    // const chartData = {
    //     series: [
    //         {
    //             name: "Progress",
    //             data: data.trend.map(key => key.value),
    //         },
    //     ],
    //     options: {
    //         chart: {
    //             height: 100,
    //             type: "line",
    //             zoom: {
    //                 enabled: false,
    //             },
    //             toolbar: {
    //                 show: false, // Hide toolbar
    //             },
    //         },
    //         dataLabels: {
    //             enabled: false, // Hide data labels
    //         },
    //         stroke: {
    //             curve: "smooth", // Keep the line smooth
    //             width: 2, // Set the line width
    //         },
    //         grid: {
    //             show: false, // Hide grid lines
    //         },
    //         xaxis: {
    //             labels: {
    //                 show: false, // Hide x-axis labels
    //             },
    //             axisBorder: {
    //                 show: false, // Hide x-axis border
    //             },
    //             axisTicks: {
    //                 show: false, // Hide x-axis ticks
    //             },
    //             categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    //         },
    //         yaxis: {
    //             labels: {
    //                 show: false, // Hide y-axis labels
    //             },
    //             axisBorder: {
    //                 show: false, // Hide y-axis border
    //             },
    //             axisTicks: {
    //                 show: false, // Hide y-axis ticks
    //             },
    //         },
    //         markers: {
    //             size: 0, // Hide the points on the line
    //         },
    //         tooltip: {
    //             enabled: false, // Hide tooltips
    //         },
    //         title: {
    //             text: undefined, // Hide title
    //         },
    //     },
    // };
    return (
        <div>
            <CardBody className='pt-0 pb-0 '>

                <div>
                    <Row className='d-flex justify-content-evenly align-items-center p-3 '>
                        <Col xs='3'>
                            <div class="social-img-wrap ">
                                <div class="social-img">
                                    <img src='https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg' className='leaderCardimg' alt="" />
                                </div>

                            </div>
                        </Col>
                        <Col className='pe-0 me-0' xs='9'>
                            <div className='d-flex align-items-center justify-content-end'>

                                {/* <p style={{ backgroundColor: '#efc50b', fontWeight: '600' }} className='p-2 m-0 rounded-3'>Points : {data.points+30}</p> */}
                                <p style={{ backgroundColor: '#efc50b', fontWeight: '600' }} className='p-2 m-0 rounded-3'>
                                    Points : {data.points}
                                </p>
                            </div>
                        </Col>
                        <div className=' mt-2'>
                            <h5 className='mt-0 pt-0'>
                                {data.Name}
                            </h5>
                            <p className='p-0 m-0' style={{ color: 'grey' }}><b>{data.areaid}</b></p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center mb-2'>

                            <span className='ms-1 my-0 text-primary' style={{ fontSize: '30px' }}><b>{data.compliance_percentage}%</b> </span>
                            <p style={{ color: 'grey' }} className='m-0 p-0'>Compliance</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <span className='p-0 m-0 text-primary' style={{ fontSize: '30px' }}><b>{data.totalalert}</b> </span>
                                <p className='p-0 m-0' style={{ color: 'grey' }}>Total Alerts:</p>


                            </div>
                            <div className='d-flex flex-column justify-content-center align-items-center mt-3 '>
                                {data.target === 'Achieved' ? <FaCheck className='text-primary' style={{ fontSize: '30px' }} /> : <AiOutlineClose className='text-primary' style={{ fontSize: '30px' }} />}
                                <p className='p-0 m-0 ' style={{ color: 'grey' }}>{data.target === 'Achieved' ? 'Target Achieved' : data.target === 'Not Set' ? 'Target Not Set' : data.target === 'Failed' ? 'Target Not Achieved' : ""}</p>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center align-items-center mt-4 gap-2'>
                          
                                <><GoClock />
                                    <p className='p-0 m-0'>Time Spent: {data.time} Minutes</p></>
                          
                              {/* {
                                data.target === 'Not Set'  && <><GoClock  style={{visibility:'hidden'}} />
                                    <p style={{visibility:'hidden'}} className='p-0 m-0'>Time Goal Achieved</p></>
                            }
                              {
                                data.target === 'Failed' && <div><GoClock  style={{visibility:'hidden'}} />
                                    <p className='p-0 m-0' style={{visibility:'hidden'}} >Time Goal Achieved</p></div>
                            } */}

                        </div>

                        <div className='d-flex  bg-primary rounded-3 align-items-center justify-content-center mt-4' >

                            <div className='d-flex align-items-center'>
                                <FiAward style={{ fontSize: '20px' }} />
                                <span className='ms-2'>Rank: </span>
                            </div>
                            <span className='ms-1' style={{ fontSize: '30px' }}><b>{rank + 1}</b> </span>

                        </div>

                    </Row>


                </div>
            </CardBody>

        </div>

    );
}

export default TopLeaderCard;
