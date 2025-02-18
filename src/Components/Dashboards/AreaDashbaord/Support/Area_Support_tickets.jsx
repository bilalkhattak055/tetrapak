import React, { useEffect, useState } from 'react';
import SupportAndTicketsScreen from '../../../Screens/GlobalUser/SupportAndTickets/support_and_tickets';
import HeroSection from '../../../Screens/GlobalUser/SupportAndTickets/Component/HeroSection/Hero_Section';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AreaService from "../../../../api/areaService";
import PreviousSupportTicketCard from '../../../Screens/GlobalUser/SupportAndTickets/Component/PreviousSupportTicketCard';
import GenerateTicket from './Component/GenerateTicket';
import EditTicket from './Component/EditTicket';
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { errorToast, successToast } from '../../../../_helper/helper';
import CardsforGeneratingTicketsV2 from '../../../Screens/GlobalUser/SupportAndTicketss/Component/HeroSection/Hero_Section';

const AreaSupportTickets = () => {
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')));
    const [previousTickets, setpreviousTickets] = useState([])
    const [generateTciketModal, setgenerateTciketModal] = useState(false)
    const [editTicketModal, seteditTicketModal] = useState(false)
    const handleEditTicketModal = () => seteditTicketModal(!editTicketModal)
    const handleGenerateModal = () => setgenerateTciketModal(!generateTciketModal);
    const [models, setmodels] = useState([]);
    const [areas, setareas] = useState()
    const [subAreaOptions, setsubAreaOptions] = useState([])
    const [selectedTicket, setselectedTicket] = useState()
    const [loader, setloader] = useState(true);
    const [smallLoader, setsmallLoader] = useState(false);
      const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
    
    const [dummyTickets, setdummyTickets] = useState(
        [
            {
                id: 1,
                "user_id": 1,
                "owner": "Meraj",
                "models": [
                    {
                        "module_id": 1,
                        "name": "Helmet"
                    },
                    {
                        "module_id": 2,
                        "name": "Vest"
                    },
                    {
                        "module_id": 5,
                        "name": "MMHE"
                    }
                ],
                "areas": [
                    {
                        "area_id": 11,
                        "area_name": "AO-6",
                        "owner": "Meraj"
                    },
                ],
                "sub_areas": [
                    {
                        "id": 76,
                        "name": "Roof Tops (Pulp Store)"
                    },
                    {
                        "id": 77,
                        "name": "Chemical store"
                    }
                ],
                "priority": "medium",
                "status": "pending",
                "query": "camera is not working",
                "response": "",
                "ticketDate": "2024-10-23 10:38:05 AM",
                "responseDate": ""
            },
            {
                id: 2,
                "user_id": 1,
                "owner": "Meraj",
                "models": [
                    {
                        "module_id": 1,
                        "name": "Helmet"
                    },
                    {
                        "module_id": 2,
                        "name": "Vest"
                    },

                    {
                        "module_id": 5,
                        "name": "MMHE"
                    }
                ],
                "areas": [
                    {
                        "area_id": 11,
                        "area_name": "AO-6",
                        "owner": "Meraj"
                    },
                ],
                "sub_areas": [
                    {
                        "id": 76,
                        "name": "Roof Tops (Pulp Store)"
                    },

                ],
                "priority": "medium",
                "status": "pending",
                "query": "camera is not working",
                "response": "",
                "ticketDate": "2024-10-23 10:41:54 AM",
                "responseDate": ""
            },
        ]
    )
    const generateTicket =async (e) => { 
        setsmallLoader(true)
        try {
            const res=await AreaService.generateAreaOwnerTicket(e);
            console.log(res.data.data);
            if(res.status==200){
                const updatedModels = res.data.data.models.map(model => ({
                    id: model.module_id,
                    name: model.module_name
                  }));

                  const updatedAreas = res.data.data.areas.map(area => ({
                    area_id: area.id,
                    area_name: area.area_name,
                    owner: area.owner
                  }));
        
                  const updatedSubAreas = res.data.data.sub_areas.map(sub => ({
                    sub_area_id: sub.id,
                    name: sub.name
                  }));
        
                  res.data.data.areas = updatedAreas;
                  res.data.data.models = updatedModels;
                  res.data.data.sub_areas = updatedSubAreas;

                  res.data.data.models = updatedModels;
                if(updatedModels){
                    setpreviousTickets([
                        ...previousTickets,
                        res.data.data
                    ])
                    setsmallLoader(false)
                    handleGenerateModal();
                    successToast('ticket successfuly generated');
                }
            }
        } catch (error) {
            console.log(error);
            setsmallLoader(false) 
            errorToast('Error while generating ticket')
        }
        // setdummyTickets([
        //     ...dummyTickets,
        //     e
        // ])
    } 
    const fetchAreaDashboardData = async () => {
        const id=JSON.parse(localStorage.getItem("userData"))?.id 
        const loggedinUserArea=JSON.parse(localStorage.getItem("userData"))?.area_ids 
        const payload={
            user_id:id,
            factory_id:factoryID
        }
        const res = await AreaService.getAreaUserTickets(payload); 
        const areaa = res?.data?.data?.areas.filter(e => e && e.area_id === loggedinUserArea.id);
        console.log(areaa[0], 'filtered area')
        setsubAreaOptions(areaa[0]?.sub_areas)
        setareas(areaa[0])
        setmodels(res.data.data.models)
        setpreviousTickets(res.data.data.tickets);
        setloader(false)
    }
    const handleEditTicket = (e) => {
      
        const data = previousTickets.filter(a => a.id == e); 
        const transformedData = data.map(ticket => ({
            ...ticket,
            models: ticket.models.map(model => ({
                module_id: model.id,
                module_name: model.name
            })),
            sub_areas:ticket.sub_areas.map(sub => ({
                id: sub.sub_area_id,
                name: sub.name
            })),
        }));
        setselectedTicket(transformedData[0]);
        handleEditTicketModal(); 
    }
    const handleeditsubit =async (e) => {
        setsmallLoader(true);
        const updatedTicket = e;
        try {
            const resp=await AreaService.editticket(updatedTicket); 
            if(resp){
                const filteredTickets = previousTickets.filter(ticket => ticket.id !== updatedTicket.ticket_id);
                console.log(filteredTickets,'previous tickets without updated one');
                const data = resp?.data?.data;

                const updatedModels = data.models.map(model => ({
                    id: model.module_id,
                    name: model.module_name
                  }));
        
        
                  const updatedAreas = data.areas.map(area => ({
                    area_id: area.id,
                    area_name: area.area_name,
                    owner: area.owner
                  }));
        
                  const updatedSubAreas = data.sub_areas.map(sub => ({
                    sub_area_id: sub.id,
                    name: sub.name
                  }));
        
                  data.areas = updatedAreas;
                  data.models = updatedModels;
                  data.sub_areas = updatedSubAreas;

                  setpreviousTickets([
                    ...filteredTickets,
                    data
                  ])
                successToast('Ticket edit successfully');
                setsmallLoader(false);
                handleEditTicketModal()
            }
        } catch (error) {
            console.log(error)
            errorToast('Error while updating ticket');
            setsmallLoader(false)
        } 
      
    }
    useEffect(() => {
        fetchAreaDashboardData()
    }, [])
    return (
        <>
            <br />
            <Container fluid={true}>
                <h5 style={{ fontSize: '22px' }}>Support and Tickets</h5>
                {loader ? <Loader1 /> : <>
                    {/* <Row>
                    <HeroSection role={role} generateTicket={handleGenerateModal} />
                    <h5>Previous Support Tickets</h5>
                    {previousTickets?.length<=0 && <p className='text-center'>Zero <b>tickets</b> found</p>}
                    {[...previousTickets]?.reverse().map((item, key) => (
                        <Col xl='12' xxl='6' key={key} >
                            <PreviousSupportTicketCard dataa={item} handleEditTicket={() => handleEditTicket(item.id)} />
                        </Col>
                    ))}

                    </Row>
                    <EditTicket smallLoader={smallLoader} handleeditsubit={handleeditsubit} data={selectedTicket} show={editTicketModal} generateTicket={generateTicket} areas={areas} handleClose={handleEditTicketModal} modeloption={models} subAreaOptions={subAreaOptions} />
                    <GenerateTicket smallLoader={smallLoader} show={generateTciketModal} generateTicket={generateTicket} areas={areas} handleClose={handleGenerateModal} modeloption={models} subAreaOptions={subAreaOptions} /> */}
                    <CardsforGeneratingTicketsV2 AreaMode={true} role={role}  />
                    
                </>}
            </Container>
        </>
    );
}

export default AreaSupportTickets;
