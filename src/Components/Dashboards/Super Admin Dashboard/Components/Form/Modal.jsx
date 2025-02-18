import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, Input, Row, Col, Label, Container } from 'reactstrap';

const RoleModal = ({ isOpen, toggle, title, handleInput, formData, handleSave, modalType }) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <Container fluid={true}>
        <ModalBody>
          <form>
            <Row>
              <Col className='mb-3' lg='12'>
                <Label for='role'><b>Role</b></Label>
                <Input
                  className='form-control rounded-3'
                  type='text'
                  name='Role'
                  id='role'
                  onChange={handleInput}
                  value={formData.Role || ''} // Show the current role if available
                  placeholder='Enter Role'
                />
              </Col>

              <Col className='mb-3' lg='12'>
                <Label for='description'><b>Description</b></Label>
                <textarea
                  name='Description'
                  id='description'
                  onChange={handleInput}
                  value={formData.Description || ''} // Show the current description if available
                  placeholder='Description'
                  style={{ border: '1px solid grey', width: '100%', padding: '10px' }}
                  className='card'
                />
              </Col>

              <Col lg='6' className='  d-flex align-items-center justify-content-start'>
                <Button color="primary mx-0 my-2" onClick={handleSave}>
                  {modalType === 'edit' ? 'Update' : 'Add'} {/* Change button text based on modalType */}
                </Button>
                <Button color="dark m-2" onClick={toggle}>Close</Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
        </Container>
      </Modal>
    </>
  );
};

export default RoleModal;
