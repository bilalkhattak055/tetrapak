import React, { useEffect, useState } from 'react'
import SupportAndTicketsScreen from '../../../../Screens/GlobalUser/SupportAndTickets/support_and_tickets'
import PreviousSupportTicketCard from '../../../../Screens/GlobalUser/SupportAndTickets/Component/PreviousSupportTicketCard'
import AreaService from "../../../../../api/areaService";
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import EditModal from '../Components/EditModal/Edit_Modal';
import Loader1 from "../../../../../CommonElements/Spinner/loader";
import { FaRegListAlt } from 'react-icons/fa';
import { TbClockCancel } from "react-icons/tb";
import { FaRegHourglass } from 'react-icons/fa';
import { ImCheckboxChecked } from "react-icons/im";
import PreviousTicketCard from '../../../../Screens/GlobalUser/SupportAndTicketss/Component/NewDesignPreviousTickets/PreviousTicketCardNewDesign';

const ItSupport = () => {
  const [tickets, settickets] = useState([])
  const [modal, setModal] = useState(false);
  const [selectedTicket, setselectedTicket] = useState()
  const [loader, setloader] = useState(true)
  const [btnload, setbtnload] = useState(false)
  const [statusCounts, setStatusCounts] = useState([
    { status: 'Pending', count: 0 },
    { status: 'In Process', count: 0 },
    { status: 'Resolved', count: 0 },
    { status: 'Total', count: 0 }
  ]);
  
  function handleUpdateclick(item) {
    setselectedTicket(item)
    toggle()
  }
  const handleupdateReq = async (e) => {
    try {
      setbtnload(true)
      const res = await AreaService.handleTicketUpdateReq(e);
      console.log(res.data.data.id,res.data.data.status)
      if (res.data) {
        const currentDate = new Date().toISOString();
        settickets(prevTickets => 
            prevTickets.map(ticket => 
                ticket.id === res.data.data.id
                ? { ...ticket, status: res.data.data.status,response:e.response,responseDate:currentDate } 
                : ticket
            )
        );
      setbtnload(false)
        toggle();
    }
    } catch (error) {
      console.log('error while updating ticket', error)
      alert('Error while updating ticket')
    }

  }
  const toggle = () => setModal(!modal);
  const getData = async () => {
    try {
      const res = await AreaService.getDataforItTickets();
      const counts = [
        { status: 'Pending', count: res.data.data.tickets.filter(ticket => ticket.status === 'pending').length },
        { status: 'In Process', count: res.data.data.tickets.filter(ticket => ticket.status === 'in process').length },
        { status: 'Resolved', count: res.data.data.tickets.filter(ticket => ticket.status === 'resolved').length },
        { status: 'Total', count: res.data.data.tickets.length }
      ];
      
      console.log(counts,'all count of tickets')
      setStatusCounts(counts);
      settickets(res.data.data.tickets);
      setloader(false)
    } catch (error) {
      console.log('error while fetching tickets data', error)
    }
  }

  useEffect(() => {
    
    getData();
  }, [])
  // async function SubStatus(){
  //   // const id = 78
  //   const id = [38,43,44,40,46,47,48,49,50,51,52,55,56,57,58,59,60,63,67,68,69,70,72,74,75,76,77,
  //               80,82,83,84,85,86,90,92,93,94,95,96,100,101,102,103,104,105,106,107,108,109,110,111,
  //               115,117,121,123,125,126,127,128,129,130,131,132,135,137,143,144,146,148,149,150,152]
  //   const res = await AreaService.sub_area_status(id);
  //   console.log(res)
  //  }
  return (
    <>
      <br />
      <Container fluid={true}>
        <h5 style={{ fontSize: '22px' }}>Generated Tickets</h5>
       {loader?<center style={{ marginTop:'60px' }} >
          <Loader1 />
        </center> :
       <>
        <Row>
    
              {/* <button className='btn btn-primary my-3' onClick={SubStatus}>click me</button> */}

        {statusCounts?.sort((a, b) => a.status === "Total" ? -1 : a.status === "Pending" ? 0 : a.status === "In Process" ? 1 : 2)
        .map((data) => (
          <Col xs='12' sm='6' lg='4' xl='3' key={data.status}>
            <Card className={` ${data.status==='Total'?'b-l-info': data.status==='Pending'?'b-l-danger':data.status==='Resolved'?'b-l-success':data.status==='In Process'?'b-l-warning':null}`}>
              <CardBody className=' d-flex justify-content-center flex-column align-items-center' style={{height:'150px'}}>
                <div className='mb-2'>
                {data.status === 'Total' ? <FaRegListAlt style={{ color: '#5f6a6a', fontSize: '25px' }} />
                  : data.status === 'Pending' ? <TbClockCancel style={{ color: '#FC4438', fontSize: '25px' }} />
                    : data.status === 'In Process' ? <FaRegHourglass style={{ color: '#ffc107', fontSize: '25px' }} />
                      : data.status === 'Resolved' ? <ImCheckboxChecked style={{ color: '#28a745', fontSize: '25px' }} />
                        : null}
                </div>
                <h6 >
                  {data.status} :  <span > {data.count}</span> 
                </h6>
              </CardBody>
            </Card>
          </Col>
        ))}
          {
            tickets?.sort((a, b) => b.id - a.id)
              .map((item, key) => (
                <Col xl='12' xxl='6' key={key}>
                  <PreviousTicketCard data={item} itmode={true} toggle={() => handleUpdateclick(item)} />
                </Col>
              ))
          }
        </Row>
        <EditModal btnload={btnload} handleupdateReq={handleupdateReq} toggle={toggle} isOpen={modal} selectedTicket={selectedTicket} />
      
       </>
       }
      </Container>
    </>
  )
}

export default ItSupport

