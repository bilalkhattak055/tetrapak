import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TicketCard from '../TicketCard';
import { Link } from 'react-router-dom';

const HeroSection = ({generateTicket,role}) => {
    return (
        <>
       
            <Col xs='12' sm='6' lg='4' className='mb-4'>
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
            </Col>
        
        </>
    );
}

export default HeroSection;
