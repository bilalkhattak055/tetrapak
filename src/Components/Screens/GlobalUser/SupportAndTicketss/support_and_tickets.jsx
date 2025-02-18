import React, { useState, Fragment, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, CardBody } from 'reactstrap'; 
import HeroSection from './Component/HeroSection/Hero_Section'; 

const SupportAndTicketsScreen = () => {
 const [role, setrole] = useState(JSON.parse(localStorage.getItem('role')))

  return (
    <Fragment>
      <br />
      <Container fluid={true}>  
        <h4 style={{ fontSize: "20px" }}>Support and Tickets </h4>
        <HeroSection role={role}/>
      </Container>

      {/* Modal */}
      
      {/* <EditTicketModal submitloader={submitloader} editTicket={editTicket} areaOptions={areaOptions} moduleOptions={moduleOptions} toggleModal={editmodalToggle} isOpen={editmodal} formatDate={formatDate} setTicketsData={setTicketsData} TicketsData={TicketsData} currentTicket={selectedTickets} type={type} />
      <Practise submitloader={submitloader} GenerateTicket={GenerateTicket} areaOptions={areaOptions} toggleModal={toggleModal} isOpen={modal} formatDate={formatDate} setTicketsData={setTicketsData} TicketsData={TicketsData} type={type} setnewTicket={setnewTicket} moduleOptions={moduleOptions} />
     */}
    </Fragment>
  );
};

export default SupportAndTicketsScreen;
