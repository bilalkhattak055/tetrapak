import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { H2 } from '../../../../../AbstractElements';
import './addArea.css'

const AddArea = ({ toggleModal, modal, modalType, handleSave, generateUserId, generatePassword, handleCheckboxChange }) => {


    const [formData, setFormData] = useState(
        {
            id: '',
            name: '',
            email: '',
            Phone: '',
            password: '',
            role: '',
            permissions: [
                { routeofPermission: 'ITOfficer', isActive: false },
                { routeofPermission: 'factory', isActive: false },
                { routeofPermission: 'Factory', isActive: false },
                { routeofPermission: 'Area', isActive: false },
                { routeofPermission: 'TechQA', isActive: false }
            ],
            status: 'Active',
            createdBy: 'It Officer',
        },

    );

    const handleInputChange = (e) => {
        const { name, type, checked } = e.target;

        if (type === 'checkbox') {
            const updatedPermissions = formData.permissions.map(permission =>
                permission.routeofPermission === name
                    ? { ...permission, isActive: checked }
                    : permission
            );

            setFormData(prevFormData => ({
                ...prevFormData,
                permissions: updatedPermissions
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: e.target.value,
                status: 'Active',
                createdBy: 'It Officer',
            }));
        }

        console.log({ [name]: type === 'checkbox' ? checked : e.target.value });
        setTimeout(20000, console.log(formData, 'from set time out'))
    };


    const onSubmit = (data) => {


        if (data) {
            handleSave();
        } else {
            // errors.showMessages(); 
        }
    };
    const allpermissions = [
        { routeofPermission: 'ITOfficer', isActive: false },
        { routeofPermission: 'factory', isActive: false },
        { routeofPermission: 'Factory', isActive: false },
        { routeofPermission: 'Area', isActive: false },
        { routeofPermission: 'TechQA', isActive: false }
    ]
    useEffect(() => {
        console.log('hello from child')
    }, [formData])


    return (
        <Fragment>
            <Container fluid={true} className='dashboard-first-page add-company-page'>
                
                <form action="" className='add-compnay-form'>

                    <Row>
                        <H2>Add Area</H2>
                        <Col xs='12' className='card mb-2 add-company-card'>
                            <FormGroup>
                                <Label for="name">Area Name</Label>
                                <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Area Email</Label>
                                <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="role">Mobile no</Label>
                                <Input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} />
                            </FormGroup>
                            <Row>
                                <Label for="Password">Password</Label>
                                <Col lg='12' xl='12' md='12' sm='12' xs='12'>
                                    <FormGroup>
                                        <Input type="password" name="password" id="Password" value={formData.Password} onChange={handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col xs='12 mb-4' >

                                    <div className="custom-file">
                                        <Input className="custom-file-input" id="validatedCustomFile" type="file" required="" />
                                        <div className="invalid-feedback">{"Example invalid custom file feedback"}</div>
                                    </div>
                                </Col>

                                <Col lg='12' xl='12' md='12' sm='12' xs='12' className='d-flex justify-content-center'>
                                    <button className='btn btn-primary'>Submit</button>
                                </Col>
                            </Row>

                        </Col>
                  
                   
                    </Row>

                </form>
            </Container>
        </Fragment>
    )
}

export default AddArea

