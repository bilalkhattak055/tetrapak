import React, { Fragment } from 'react';
import { Col, Card, CardHeader, CardBody, Row } from 'reactstrap';
import '../../../../Super Admin Dashboard/styling/super.css'
// import '../../../Super Admin Dashboard/styling/super.css'
const DetailLogCardList = (props) => {
    return (
        <Fragment>
             <Card style={{boxShadow:'none'}}>
                    <CardHeader className='b-l-primary m-0 pb-0 '>
                        <Row>
                            <Col lg='5' xl='5' md='5' sm='5' xs='12' className='detailsCardList  d-flex justify-content-center align-items-center'>
                                <img className='card' src="https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg" alt="" style={{ width: '100px', borderRadius: '50%' }} />

                            </Col>
                            <Col lg='7' xl='7' md='7' sm='7' xs='12' className='detailsCardList d-flex justify-content-start align-items-center'>
                                <div className='detailedlogsitheader w-100'>
                                    <p className='detailsCardList' style={{ marginLeft: '20px', fontSize: '20px' }}>{props.name}</p>
                                    <p className='detailsCardList' style={{ marginLeft: '20px' }}>Status: <span style={{ fontWeight: '600' }}> {props.status} </span></p>
                                </div>

                            </Col>
                        </Row>

                    </CardHeader>
                    <CardBody className='px-5' >
                        <Row>
                            <Col lg='6' md='6' sm='6' xs='12' className='detailsCardList'>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>User Id: <span style={{ fontWeight: '600' }}> {props.id}</span> </li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> Name: <span style={{ fontWeight: '600' }}> {props.name}</span></li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> Email:<span style={{ fontWeight: '600' }}> {props.email} </span> </li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>Role: <span style={{ fontWeight: '600' }}> {props.role} </span></li>
                                </ul>
                            </Col>
                            <Col lg='6' md='6' sm='6' xs='12' className='detailsCardList'>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>Company: <span style={{ fontWeight: '600' }}>    {props.company} </span> </li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>Phone: <span style={{ fontWeight: '600' }}>    {props.phone} </span> </li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>Whatsapp notification: <span style={{ fontWeight: '600' }}>    {props.whatsAppNotification} </span> </li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}>Email notification: <span style={{ fontWeight: '600' }}>    {props.whatsAppNotification} </span> </li>
                                   
                                    {/* <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> W.Notification: <span style={{ fontWeight: '600' }}> </span></li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> E.Notification:<span style={{ fontWeight: '600' }}> {props.EmailNotification} </span> </li> */}

                                </ul>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

        </Fragment>
    );
};

export default DetailLogCardList;
