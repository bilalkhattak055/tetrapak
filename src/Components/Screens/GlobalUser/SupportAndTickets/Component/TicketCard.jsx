import React from 'react';
import { Card, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import '../style/style.css'

const TicketCard = ({onClick,heading,img}) => {   
    return (
        <>
         <Card style={{ padding: '60px 0px'}} className='text-center support-ticket-hover  generatecards' onClick={onClick}>
            <div>
                <img src={img} alt="" width={'100px'}/>    
            </div> 
              <h6 className='p-2'>{heading}</h6> 
        </Card>

        </>
    );
}

export default TicketCard;
