import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CreativeCardsCommon from '../Components/CreativeCards/Card1'
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent'; 
import { FaArrowLeftLong } from "react-icons/fa6";
import '../styling/super.css'
import { H4 } from '../../../../AbstractElements';

const DetailLog = () => {
    const [Logs, setLogs] = useState()
    const initialRole = JSON.parse(localStorage.getItem('role'))
    const [role, setRole] = useState(initialRole)
    const [updatedLogs, setupdatedLogs] = useState([])
    const [status, setstatus] = useState(false)
    const [tableData, settableData] = useState(
        {
            UserId: '908899268',
            Company: 'Disrupt Lab',
            Branch: 'Jouhar main branch',
            Area: 'Scheme 33, Karachi',
            status: 'Active',
            createdBy: 'Super Admin',
            name: "John Doe",
            email: "john.doe@example.com",
            role: "IT Officer",
            date: "2024-08-01",
            action: "Approved",
            Phone: "+92313778899",
            permissions: [
                { name: 'ITOfficer', isActive: false },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: false },
                { name: 'Area', isActive: true },
                { name: 'TechQA', isActive: false }
            ],
            Logs: [
                {
                    logID: 1,
                    ActivityType: 'Login',
                    LockoutTime: 'last active 1 day ago',
                    TimeStanmpLog: '2 aug 13:45',
                    LockoutDuration: '0 min (Status Active)',
                    LoginAttempt: '3',
                    AttemptStatus: 'Success'
                },
                {
                    logID: 2,
                    ActivityType: 'Account locked due to incorrect password',
                    LockoutTime: 'last active 2 hours ago',
                    TimeStanmpLog: '27 aug 19:45',
                    LockoutDuration: '15 mins Remaining',
                    LoginAttempt: '5',
                    AttemptStatus: 'Locked Out'
                }
            ]
        }
    )



    const tableColumns = [
        {
            name: 'Activity Type',
            cell: row => (
                <div className='d-flex align-items-center justify-content-center'>
                    {row.ActivityType}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Lockout Time',
            selector: row => row.LockoutTime,
            sortable: true,
        },
        {
            name: 'Timestanmp',
            selector: row => row.TimeStanmpLog,
            sortable: true,
        },
        {
            name: 'Lockout Duration',
            selector: row => row.LockoutDuration,
            sortable: true,
        },
        {
            name: 'Login Attempt',
            selector: row => row.LoginAttempt,
            sortable: true,
        },

    ]
    useEffect(() => {
        // const extractedLogs = tableData.map(item => item.Logs).flat();
        const extractedLogs = tableData.Logs
        console.log(extractedLogs, 'all logs')
        setLogs(extractedLogs)
    }, [])


    return (
        <div>
            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <Row>
                    <Col xl='12' lg='12' md='12' sm='12' xs='12' className='d-flex' style={{paddingTop:'30px'}}>
                    <Link to={`${process.env.PUBLIC_URL}/dashboard/logs/${role}`} className='m-0 p-0'>
                            <div className='btn d-flex' >
                                <FaArrowLeftLong style={{ width: '17px', height: '20px', marginRight: '4px' }} /> 
                            </div>
                        </Link>
                        <H4>
                            Detailed Log
                        </H4>
                        {/* <h3 className='superadminheading' style={{ border: '0px solid', fontWeight: '600', lineHeight: '40px'}}>Detailed Log</h3> */}
                    </Col>
                </Row>


                <Row style={{ paddingBottom: '30px',padding:'20px' }}>

                    <Card  className=' p-0 m-0'>
                        <CardBody className='DetailLogsCard p-0 m-0' >
                            <Row>
                                <Col xl='8' lg='8' md='8' sm='12' xs='12'>
                                    <CreativeCardsCommon name={tableData.name} status={tableData.status} id={tableData.UserId} email={tableData.email} role={tableData.role} company={tableData.Company} branch={tableData.Branch} area={tableData.Area} />
                                </Col>
                                <Col xl='4' lg='4' md='4' sm='12' xs='12' className='m-0 p-0 d-flex justify-content-center align-items-center flex-column'>
                                    <div className='pb-3'>
                                        <p className='p-0 m-0 p-2' style={{ color: `${status == true ? 'blue' : 'red'}`, textAlign: 'center', fontSize: '17px', }}>{status == true ? ' Unlocked' : '15 mins remaining'}</p>
                                    </div>


                                    <h3 style={{ fontSize: '17px', textAlign: 'center', color: '#36454F', paddingBlock: "10px" }}>Account Status: <span style={{ color: `${status == true ? '#54c500' : 'red'}`, fontSize: '20px' }}> {status == true ? 'Active' : 'Inactive'} </span></h3>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <button className='btn' style={{ border: `${status == true ? '0px solid #D3D3D3' : '1px solid #D3D3D3'}`, background: `${status == true ? '#54c500' : ''}`, color: `${status == true ? 'white' : 'black'}`, margin: '2px' }} onClick={() => {
                                            setstatus(true); settableData({
                                                ...tableData,
                                                status: 'Active'
                                            })
                                        }}>Active</button>
                                        <button className='btn' style={{ border: `${status == true ? '1px solid #D3D3D3' : '0px solid #D3D3D3'}`, color: `${status == true ? 'black' : 'white'}`, margin: '2px', background: `${status == true ? '' : '#54c500'}` }} onClick={() => {
                                            setstatus(false); settableData({
                                                ...tableData,
                                                status: 'Inactive'
                                            })
                                        }}>Inactive</button>
                                    </div>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>

                <div className='px-2'>
                <DataTableComponent
                    tableColumns={tableColumns}
                    staticData={Logs}
                />
    
    </div>
            </Container>
        </div>
    );
}

export default DetailLog;
