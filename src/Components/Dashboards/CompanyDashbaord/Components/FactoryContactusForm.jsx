import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col, Card, CardBody } from 'reactstrap';
import '../Styling/factoryowner.css'
import { Controller } from 'react-hook-form';


const FactoryContactusForm = ({ handleChange, control, handleSubmit, formShow, onSubmit,watch, register, errors }) => {
      // Watching all form values to check them in real-time
      // Watching all form values to check them in real-time
    const formValues = watch(['UserId', 'email', 'company', 'message']); // Specifically watch these fields
    console.log('watch', formValues); // Log the watched values

    const style ={
        color: '#d93038'
    }
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
                                    </> : <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                                {/* <FormGroup>
                                                    <Label for="id"><b>User ID</b></Label>
                                                    <Input
                                                    id='id'
                                                        type="text"
                                                        placeholder="User ID"
                                                        onChange={handleChange}
                                                        {...register('UserId', { required: true, maxLength: 20 })}
                                                    />
                                                    {errors.UserId && <p role="alert">{errors.UserId}</p>}
                                                </FormGroup> */}
                                                <FormGroup>
                                                    <Label for="id"><b>User ID</b></Label>
                                                    <Controller
                                                        name="UserId"
                                                        control={control}
                                                        rules={{ required: 'User ID is required', maxLength: { value: 20, message: 'Max length is 20' } }}
                                                        render={({ field }) => (
                                                            <Input
                                                                id='id'
                                                                type="text"
                                                                placeholder="User ID"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.UserId && <p role="alert" style={style}>{errors.UserId.message}</p>}
                                                </FormGroup>
                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                                 <FormGroup>
                                                    <Label for="email"><b>Email</b></Label>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        rules={{
                                                            required: 'Email is required',
                                                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                id='email'
                                                                type="text"
                                                                placeholder="Email"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.email && <p role="alert" style={style}>{errors.email.message}</p>}
                                                </FormGroup>

                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>

                                                   <FormGroup>
                                                    <Label for="company"><b>Company</b></Label>
                                                    <Controller
                                                        name="company"
                                                        control={control}
                                                        rules={{ required: 'Company name is required' }}
                                                        render={({ field }) => (
                                                            <Input
                                                                id='company'
                                                                type="text"
                                                                placeholder="Company"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.company && <p role="alert" style={style}>{errors.company.message}</p>}
                                                </FormGroup>
                                            </Col>
                                            <Col xl='6' lg='6' md='6' sm='6' xs='12'>
                                              
                                                <FormGroup>
                                                    <Label for="message"><b>Message</b></Label>
                                                    <Controller
                                                        name="message"
                                                        control={control}
                                                        rules={{ required: 'Message is required' }}
                                                        render={({ field }) => (
                                                            <Input
                                                                id='message'
                                                                type="textarea"
                                                                placeholder="Enter your message"
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors.message && <p role="alert" style={style}>{errors.message.message}</p>}
                                                </FormGroup>
                                                </Col>
                                        </Row>


                                        <Button color='primary' type="submit" >
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

export default FactoryContactusForm;

