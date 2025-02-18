import React from 'react'
import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default function AIModal({email,setEmail,modal, toggleModal, sub, setSubmit}) {

   
    function submit(){
        setSubmit(!sub)
    }

   


  return (
    <>
    <Modal isOpen={modal} toggle={toggleModal} centered>
    
          {
            sub ?
            <div className='d-flex align-items-center justify-content-center p-5'>
                <div className='d-flex justify-content-center' >
                   <p style={{fontSize:'20px', fontWeight:'600'}} className='p-0 m-0 d-flex justify-content-center'> Your Email was sent Successfully!</p>
                    <img  src='https://i.gifer.com/7efs.gif' width={100} />
                </div>
            </div>
            : 

            <>
            <ModalHeader toggle={toggleModal}>Send Email</ModalHeader>
          <ModalBody className='mx-2 my-0' >
            {/* Add your email form fields here */}
            
              <label onChange={(e)=>setEmail(e.target.value)}>Email Address:</label>
              <input type="email" placeholder="Enter recipient email" className="form-control" required />
           
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submit}>Send</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
            </>
          }

    </Modal>
    </>
  )
}
