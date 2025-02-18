import React, { useState, Fragment, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, CardBody } from 'reactstrap';
import TicketCard from './Component/TicketCard'
import { Link } from 'react-router-dom';
import PreviousSupportTicketCard from './Component/PreviousSupportTicketCard';
import GenerateOReditTicket from './Component/Modal_Generate_Ticket'
import Practise from './Component/GenerateTicket'
import EditTicketModal from './Component/EditModal';
import axios from 'axios';
import Loader1 from "../../../../CommonElements/Spinner/loader";
import staticDatafortickets from './Staticdata/data'
import AreaService from "../../../../api/areaService";
import HeroSection from './Component/HeroSection/Hero_Section';
import { errorToast } from '../../../../_helper/helper';

const SupportAndTicketsScreen = () => {
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')));
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const [type, settype] = useState('')
  const [loading, setLoading] = useState(true);
  const [moduleOptions, setmoduleOptions] = useState([])
  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };
  const [modal, setModal] = useState(false);
  const [newTicket, setnewTicket] = useState({})
  const toggleModal = () => setModal(!modal);
  const editmodalToggle = () => seteditmodal(!editmodal)
  const [submitloader, setsubmitloader] = useState(false)

  const generateTicket = () => {
    if(!allarea){
      errorToast('Unable to create ticket, user authorization failed.');
      return
    }
    settype('Generate');
    toggleModal();
  };

  // -------------------x-----------------------x-----------------------
  const [selectedTickets, setselectedTickets] = useState()
  const [TicketsData, setTicketsData] = useState([])
  const [Alldata, setAlldata] = useState()
  const [editmodal, seteditmodal] = useState(false)
  const [updatedTicket, setupdatedTicket] = useState({})
  const [allarea, setallarea] = useState()
  const [areaOptions, setAreaOptions] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const handleEditRequest = (data) => {
    setselectedTickets(data)
    settype('Edit')
    editmodalToggle()
  }

  const getTicketsData = async () => {
    setLoading(true)
    try {
      const data = []
      const payload={
        factory_id:factoryID,
        user_id:JSON.parse(localStorage.getItem("userData"))?.id || 41
      }
      // AreaService.getAlltickets(payload)
      AreaService.getAlltickets(payload)
        .then((res) => {
          const resp = res?.data?.data;
          // console.log(resp)
          setAlldata(resp);
          // const tickets=resp?.tickets.map((item=>(
          //   item.areas.map(owners=>({
          //     owner:item.owner
          //   }))
          // )))
          // console.log('hello',tickets)
          setTicketsData(resp.tickets)
          setmoduleOptions(resp.models)
          setallarea(resp.areas)
          setLoading(false)
          localStorage.setItem('tickets', JSON.stringify(resp));
        })
        .catch((e) => {
          setLoading(false)
        });

      // setAlldata(data.length>0?data:staticDatafortickets);
      // setTicketsData(data.length>0?data.tickets:staticDatafortickets.tickets)
      // setmoduleOptions(staticDatafortickets.data.models) 
      // setallarea(staticDatafortickets.data.areas)

      console.log(staticDatafortickets.data.areas)
    } catch (error) {
      console.log('error fetching support ticket data', error)
    }
  };
  useEffect(() => {
    const cachedTickets = localStorage.getItem('tickets');
    if (cachedTickets) {
      const cachedData = JSON.parse(cachedTickets)
      setAlldata(cachedData);
      setTicketsData(cachedData.tickets)
      setmoduleOptions(cachedData.models)
      setallarea(cachedData.areas)
      setLoading(false);
    }else getTicketsData();
  }, []);

  useEffect(() => {
    if (dataChanged) {
      getTicketsData();
      setDataChanged(false); // Reset the dataChanged state
    }
  }, [dataChanged]);

  const handleDataChange = () => {
    setDataChanged(true); // Set dataChanged to true to trigger the API call
  };
  const GenerateTicket = async (e) => {

    try {
      // setLoading(true) 
      setsubmitloader(true)
      const payload={
        ...e,
        factory_id:factoryID
      }
      AreaService.generatenewticket(payload)
        .then((res) => {
          const resp = res?.data?.data;
          console.log(resp, 'api response')
          const updatedModels = resp.models.map(model => ({
            id: model.module_id,
            name: model.module_name
          }));


          const updatedAreas = resp.areas.map(area => ({
            area_id: area.id,
            area_name: area.area_name,
            owner: area.owner
          }));

          const updatedSubAreas = resp.sub_areas.map(sub => ({
            sub_area_id: sub.id,
            name: sub.name
          }));

          resp.areas = updatedAreas;
          resp.models = updatedModels;
          resp.sub_areas = updatedSubAreas;

          setTicketsData([
            ...TicketsData,
            resp
          ])
          // setLoading(false) 
          setsubmitloader(false)
          toggleModal()
        })
        .catch((e) => {
          // setLoading(false) 
          setsubmitloader(false)
        });
        handleDataChange()
    } catch (error) {
      console.error('Error Generating new ticket:', error);
      alert('error while generating ticket')
      // setLoading(false);
      setsubmitloader(false)
    }
  }
  const editTicket = async (e) => {
    try {
      // setLoading(true);
      setsubmitloader(true)
      const payload={
        ...e,
        factory_id:factoryID
      }
      AreaService.editticket(payload)
        .then((res) => {
          const resp = res?.data?.data;
          console.log(resp, 'API Response');

          const updatedTicketsData = TicketsData.filter(ticket => ticket.id !== resp.id);
          const updatedModels = resp.models.map(model => ({
            id: model.module_id,
            name: model.module_name
          }));


          const updatedAreas = resp.areas.map(area => ({
            area_id: area.id,
            area_name: area.area_name,
            owner: area.owner
          }));

          const updatedSubAreas = resp.sub_areas.map(sub => ({
            sub_area_id: sub.id,
            name: sub.name
          }));

          resp.areas = updatedAreas;
          resp.models = updatedModels;
          resp.sub_areas = updatedSubAreas;

          setTicketsData([
            ...updatedTicketsData,
            resp
          ]);
          setsubmitloader(false);
          editmodalToggle()
          // setLoading(false);
          handleDataChange()
        })
        .catch((e) => {
          // setLoading(false);
          setsubmitloader(false)
        });
    } catch (error) {
      console.error('Error Generating new ticket:', error);
      // setLoading(false);
      setsubmitloader(false);
      alert('error while editing ticket')
    }
  };
 
  useEffect(() => {
    const mappedAreas = allarea && allarea.map(area => ({
      ...area,
      label: `${area.area_name}, ${area.area_owner}`,
      disabled: !area.active
    }));
    setAreaOptions(mappedAreas);
  }, [allarea]);

 

  return (
    <Fragment>
      <br />
      <Container fluid={true}>
        {loading ?
          <Loader1 />
          :
          <>
            <Row>
              <Col xs='12'>
                <h5 style={{ fontSize: '22px' }}>Support and Tickets</h5>
              </Col>
              <HeroSection generateTicket={generateTicket} role={role} />
              {/* <Col xs='12' sm='6' lg='4' className='mb-4'>
              <TicketCard onClick={() => { generateTicket() }} heading={'Generate Support Ticket'} img={'https://cdn-icons-png.flaticon.com/512/10729/10729082.png'} />
            </Col>
            <Col xs='12' sm='6' lg='4' className='mb-4'>

              <Link to={'https://calendly.com/'} target="_blank">
                <TicketCard heading={'Schedule Now'} img={'https://i.pinimg.com/736x/f0/a5/bc/f0a5bc76afc2563bf5475eddbe936f7e.jpg'} />
              </Link>
            </Col>
            <Col xs='12' sm='6' lg='4' className='mb-4'>
              <Link to={`${process.env.PUBLIC_URL}/support/documentationfaqs/${role}`}>
                <TicketCard heading={'FAQs'} img={'https://cdn3d.iconscout.com/3d/premium/thumb/faq-10358250-8356545.png'} />
              </Link>
            </Col> */}

              <h5>Previous Support Tickets</h5>

              {TicketsData && TicketsData.length > 0 ? <>
                {TicketsData &&
                  TicketsData
                    .sort((a, b) => b.id - a.id)
                    .map((data, key) => (
                      <Col xl='12' xxl='6' key={key}>
                        <PreviousSupportTicketCard
                          previousReq={data}
                          dataa={data}
                          ticketno={key + 1}
                          handleEditTicket={() => {
                            handleEditRequest(data);
                            settype('Edit');
                          }}
                        />
                      </Col>
                    ))
                }
              </> :
                <div className="text-center" >
                  <p>Zero <b>tickets</b> found</p>
                </div>

              }

            </Row>
          </>
        }

      </Container>

      {/* Modal */}
      <EditTicketModal submitloader={submitloader} editTicket={editTicket} areaOptions={areaOptions} moduleOptions={moduleOptions} toggleModal={editmodalToggle} isOpen={editmodal} formatDate={formatDate} setTicketsData={setTicketsData} TicketsData={TicketsData} currentTicket={selectedTickets} type={type} />
      <Practise submitloader={submitloader} GenerateTicket={GenerateTicket} areaOptions={areaOptions} toggleModal={toggleModal} isOpen={modal} formatDate={formatDate} setTicketsData={setTicketsData} TicketsData={TicketsData} type={type} setnewTicket={setnewTicket} moduleOptions={moduleOptions} />
    </Fragment>
  );
};

export default SupportAndTicketsScreen;
