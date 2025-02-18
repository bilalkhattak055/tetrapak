import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form'; 
import { H5 } from '../../../../../../AbstractElements';

const AddForm = ({ toggleModal, modal, modalType, handleSave, handleInputChange, formData, generateUserId, generatePassword }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (data) {
            handleSave();  
        } else {
            errors.showMessages(); 
        }
    };

    useEffect(() => {
        console.log('Form data updated:', formData);
    }, [formData]);

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>{modalType === 'edit' ? 'Edit User' : 'Add Userrrrrrr'}</ModalHeader>
            <ModalBody>
                <H5>Basic Information</H5>
                <Row>
                    <Col lg='12' md='12' sm='12' xl='12' xs='12' className='card mb-2'>
                        <Row className='mb-2'>
                            <Label for="id">User ID</Label>
                            <Col lg='12' xl='12' md='12' sm='12' xs='12'>
                                <FormGroup>
                                    <Input 
                                        type="text" 
                                        name="id" 
                                        id="id" 
                                        value={formData.id} 
                                        onChange={handleInputChange}  
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg='12' xl='12' md='12' sm='12' xs='12' className='d-flex justify-content-center'>
                                <Button color='primary' onClick={generateUserId}>Generate ID</Button>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange}  
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={formData.email} 
                                onChange={handleInputChange}  
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Mobile No</Label>
                            <Input 
                                type="tel" 
                                name="Phone" 
                                id="Phone" 
                                value={formData.Phone} 
                                onChange={handleInputChange}  
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='role'>Role</Label>
                            <Input 
                                type='select' 
                                name='role' 
                                id='role' 
                                value={formData.role} 
                                onChange={handleInputChange}  
                            >
                                <option value=''>Select Role</option>
                                <option value='IT Officer'>IT Officer</option>
                                <option value='Factory'>Factory</option>
                                <option value='Area'>Area</option>
                                <option value='Tech QA'>Tech QA</option>
                            </Input>
                            <span className='d-block'>{errors.role && 'Role is required'}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input 
                                type="date" 
                                name="date" 
                                id="date" 
                                value={formData.date} 
                                onChange={handleInputChange}  
                            />
                        </FormGroup>
                        <Row>
                            <Label for="Password">Password</Label>
                            <Col lg='12' xl='12' md='12' sm='12' xs='12'>
                                <FormGroup>
                                    <Input 
                                        type="password" 
                                        name="password" 
                                        id="Password" 
                                        value={formData.password} 
                                        onChange={handleInputChange}  
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg='12' xl='12' md='12' sm='12' xs='12' className='d-flex justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-start'>
                            <button className='btn btn-primary '>Generate Password</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    {modalType === 'edit' ? 'Save' : 'Add'}
                </Button>
                <Button color="dark" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddForm;

 
