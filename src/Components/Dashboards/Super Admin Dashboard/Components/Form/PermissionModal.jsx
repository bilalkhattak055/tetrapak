// MyModal.js
import React, { useState } from 'react';
import {Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter, Button,FormGroup ,Input, Row, Col,Label} from 'reactstrap';

const PermissionModal = ({ isOpen, toggle, title, handleInput ,formData,handleSave,role,modalType}) => {
    const [adminName, setAdminName] = useState(localStorage.getItem('role' || 'Super'))

  return (
    <Modal isOpen={isOpen} toggle={toggle} className='modal-lg'>
      <ModalHeader toggle={toggle}>{modalType}</ModalHeader>
      <ModalBody className='mx-2'>
        <form>
        <Row>
        <Col  className='mb-3' lg='6'>
              <Label for='role'><b>Permission</b></Label>
            <Input
                className='form-control rounded-3'
                type='text'
                name='Permission'
                id='permission' 
                onChange={handleInput}
                value={formData.Permission}
                placeholder='Enter Permission'
            /> 
                                    
          </Col>
           
          <Col  className='mb-3' lg='6'>
              <Label for='CreatedBy'><b>Created By</b></Label>
            <Input
                className='form-control rounded-3'
                type='text'
                name='CreatedBy'
                id='CreatedBy' 
                value={role || 'Super Admin'} 
                readOnly
            /> 
                                    
          </Col>
          
          {/* <Col  className='mb-3' lg='6'>
              <Label for='role'><b>Description</b></Label>
              <br />
              <textarea 
              name='Description'
                onChange={handleInput}
                placeholder="Description"
                style={{border:'1px solid grey',width:'100%',padding:'10px'} }
                className='card'
            />                  
          </Col> */}
          <Col lg='6' className='d-flex align-items-center justify-content-start'>
          {modalType=='Add Permission'?
          <>
          <Button color="primary mr-2" onClick={handleSave}>Add</Button>
          <Button color="dark mx-1 " onClick={toggle}>Close</Button>
          </>  
          :modalType=='Edit Permission'?
          <Button color="primary " onClick={handleSave}>Submit</Button>
            :''
        }
          </Col>
        </Row>
        </form>
      </ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={handleSave}>Add</Button>
        <Button color="dark" onClick={toggle}>Close</Button>
      </ModalFooter> */}
    </Modal>
  );
};

export default PermissionModal;
