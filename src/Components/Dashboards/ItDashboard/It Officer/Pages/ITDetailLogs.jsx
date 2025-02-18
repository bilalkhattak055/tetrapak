import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import DetailLogCardList from '../Components/Cards/DetailLogCardList'
import ItDataTable from '../Components/Table/ItDataTable';
import { FaArrowLeftLong } from "react-icons/fa6";
import '../../../Super Admin Dashboard/styling/super.css'
import { H3 } from '../../../../../AbstractElements';
import { errorToast } from '../../../../../_helper/helper';
import AreaService from '../../../../../api/areaService';
import Loader1 from '../../../../../CommonElements/Spinner/loader'

const ITDetailLogs = () => {
    const location = useLocation();  
    const [Logs, setLogs] = useState();
    const [userDetails, setuserDetails] = useState(location.state?.logs)
    const [loader, setloader] = useState(true)
    const [updatedLogs, setupdatedLogs] = useState([])
    const [status, setstatus] = useState(true)
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
                    LockoutDuration: `0 min (Status: Active)`,
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
    const [FetchedDetails, setFetchedDetails] = useState()
 
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

    const getUserLogs=async()=>{
        try {
            const id=userDetails?.userID
            const res=await AreaService.itSelectedUserLogs(id);
            if(res.status==200){
                setloader(false)
                setFetchedDetails(res.data.data)
                console.log(res)
            }
        } catch (error) {
            errorToast('Error while fetching user logs');
            console.log(error)
        }
    }
 
    useEffect(() => {
        getUserLogs()
        // setLogs(extractedLogs)
    }, [userDetails])

  function togglestatus(){
    errorToast('Cannot toggle status')
  }
    return (    
            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                {loader?<Loader1/>:<>
                <Row>
                    <Col xl='12' lg='12' md='12' sm='12' xs='12' className='d-flex' style={{paddingTop:'30px'}}>
                    <Link to={`${process.env.PUBLIC_URL}/dashboard/itlog/${JSON.parse(localStorage.getItem('role'))}`} className='m-0 p-0'>
                            <div className='btn d-flex m-0' >
                                <FaArrowLeftLong style={{ width: '17px', height: '20px', marginRight: '4px' }} /> 
                            </div>
                        </Link>
                        <H3 className='superadminheading' style={{ border: '0px solid', fontWeight: '600', lineHeight: '40px'}}>Detailed Log</H3>
                    </Col>
                </Row>
                <Row style={{ paddingBottom: '30px',padding:'20px' }}>

                    <Card  className=' p-0 m-0'>
                        <CardBody className='DetailLogsCard p-0 m-0' >
                            <Row>
                                <Col xl='8' lg='8' md='8' sm='12' xs='12'> 
                                    <DetailLogCardList 
                                        name={FetchedDetails?.name} 
                                        status={`${FetchedDetails?.status}`} 
                                        id={FetchedDetails?.id} 
                                        email={FetchedDetails?.email} 
                                        role={FetchedDetails?.role_name} 
                                        company={'Unilever'} 
                                        // branch={tableData.Branch} 
                                        // area={tableData.Area} 
                                        whatsAppNotification={`${FetchedDetails?.whatsapp_notifications[0]?.toggle}`}
                                        EmailNotification={`${FetchedDetails?.email_notifications[0]?.toggle}`}
                                        phone={FetchedDetails?.mobile_no}
                                    />
                                </Col>
                                <Col xl='4' lg='4' md='4' sm='12' xs='12' className='m-0 p-0 d-flex justify-content-center align-items-center flex-column'>
                                    <div className='pb-3'>
                                        <p className='p-0 m-0 p-2' style={{ color: `${FetchedDetails?.status == true ? 'blue' : 'red'}`, textAlign: 'center', fontSize: '17px', }}>{FetchedDetails?.status == true ? ' Unlocked' : '15 mins remaining'}</p>
                                    </div>


                                    <h3 style={{ fontSize: '17px', textAlign: 'center', color: '#36454F', paddingBlock: "10px" }}>Account Status: <span style={{ color: `${FetchedDetails?.status == true ? '#54c500' : 'red'}`, fontSize: '20px' }}> {FetchedDetails?.status == true ? 'Active' : 'Inactive'} </span></h3>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} className='cardparentdetaillogit'>
                                      <button 
                                      className={`btn ${FetchedDetails?.status==true?'activetbn':'inactivetbn'}` } onClick={togglestatus} >Active</button> 
                                      <button 
                                      className={`btn ${FetchedDetails?.status!==true?'activetbn':'inactivetbn'}` } onClick={togglestatus} >Inactive</button> 
                                         
                                    </div>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>


                {/* <ItDataTable
                    tableColumns={tableColumns}
                    staticData={Logs}
                /> */}
                </>}
            </Container>
      
    );
}

export default ITDetailLogs;
