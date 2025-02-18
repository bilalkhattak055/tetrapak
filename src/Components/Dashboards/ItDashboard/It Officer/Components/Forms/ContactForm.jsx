import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col, Card, CardBody } from 'reactstrap';
import '../../Styling/itStyle.css'


const ContactForm = ({ handleChange, handleSubmit, formShow }) => {

    return (
        <div>
            <Row>
                <Col xl='12' className='d-flex justify-content-xl-center m-0'>
                    <Col xl='12'>
                        <Card className='b-l-primary  m-0 pb-0'>
                            <CardBody style={{ paddingBlock: '40px' }} className=' m-0'>
                                {formShow ?
                                    <>
                                        <p className='alert alert-success text-center' style={{ background: 'white', color: 'black' }}>Message Send Successfully</p>
                                    </> : <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                                <FormGroup>
                                                    <Label for="id"><b>ID</b></Label>
                                                    <Input
                                                        type="text"
                                                        name="id"
                                                        id="id"
                                                        placeholder=" ID"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                                <FormGroup>
                                                    <Label for="name"><b>Email</b></Label>
                                                    <Input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                                <FormGroup>
                                                    <Label for="name"><b>Company</b></Label>
                                                    <Input
                                                        type="text"
                                                        name="company"
                                                        id="company"
                                                        placeholder="Company"
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                            <FormGroup>
                                                <Label for="message"><b>Message</b></Label>
                                                <Input
                                                    type="textarea"
                                                    name="message"
                                                    id="message"
                                                    placeholder="Enter your message"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        </Row>

                                        
                                        <Button className='itFormSubmitBtn' type="submit" style={{ background: '#1A3D6F' }}>
                                            Submit
                                        </Button>

                                    </Form>}

                            </CardBody>
                        </Card>
                    </Col>

                </Col>
            </Row>
        </div>
    );
}

export default ContactForm;
