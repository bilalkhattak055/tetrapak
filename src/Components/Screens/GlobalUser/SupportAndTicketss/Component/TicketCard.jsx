import React from 'react';
import { Card, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import './HeroSection/style.css' 

const TicketCard = ({onClick,heading,Icon,flag}) => {   
    return (
      
         <Card  style={{ padding: '24px',borderRadius:'24px',width:'280px',minHeight:'180px'}} className='text-center support-ticket-hover m-2 newgeneratecards' onClick={onClick}>
            <div>
                {flag && Icon ? 
                <Icon className='iconsize' style={{ width: '56px', height: '56px', fill: '#635470' }} />
                 :<>{Icon && <Icon className='iconsize' style={{width:'56px',height:'56px',color:'#635470'}} />}</> }
                 
            </div> 
              <h6 className={` cardtextsize ${flag && 'mt-1'}`} style={{fontSize:'24px',fontWeight:'400'}}>{heading}</h6> 
        </Card>

       
    );
}

export default TicketCard;
