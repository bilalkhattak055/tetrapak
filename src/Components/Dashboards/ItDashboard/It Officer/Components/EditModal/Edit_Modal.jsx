import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { IoIosSend } from "react-icons/io";

const EditModal = ({ btnload,isOpen, toggle, selectedTicket,handleupdateReq }) => {
    const [response, setResponse] = useState('');
    const [status, setStatus] = useState();  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!response || !status){
            alert('please fill all the fields')
            return;
        }
        else{
            const ITResponse={
                user_id:selectedTicket?.user_id,
                ticket_id: selectedTicket?.id,
                status:status,
                response:response
            }
            handleupdateReq(ITResponse)
        }
        // console.log('Response:', response);
        // console.log('Status:', status);
        // toggle();  
}; 
useEffect(() => {
   if(isOpen && selectedTicket){
    setResponse('') 
    setStatus(selectedTicket?.status)
   }
}, [isOpen,selectedTicket])


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Respond to Ticket ID : <span style={{color:'grey'}}> {selectedTicket?.id}</span></ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="response">Response:</Label>
                        <Input
                            type="textarea"
                            name="response"
                            id="response"
                            placeholder='Enter your response'
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="status">Status:</Label>
                        <Input
                            type="select"
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        > 
                            <option value="pending">Pending</option>
                            <option value="in process">In Process</option>
                            <option value="resolved">Resolved</option>
                        </Input>
                    </FormGroup>
                    
                </ModalBody>
                <ModalFooter>
                    {btnload? 
                     <div className="spinner">
                     {/* <Loader /> */}
                   </div>
                    :
                    <button className="button" style={{ '--clr': '#1E67D6' }} onClick={handleSubmit}>
                        <span className="button-decor"></span>
                        <div className="button-content">
                            <div className="button__icon">
                                <IoIosSend color="#fff" />
                            </div>
                            <span className="button__text">Update</span>
                        </div>
                    </button>
                        }
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditModal;
