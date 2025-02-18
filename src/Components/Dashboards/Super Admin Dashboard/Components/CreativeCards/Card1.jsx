import React, { Fragment } from 'react';
import { Col, Card, CardHeader, CardBody, Row } from 'reactstrap';
// import { H5, P } from '../../../../AbstractElements'
import { H5, P } from '../../../../../AbstractElements'
import '../../styling/super.css'
const CreativeCardsCommon = (props) => {
    
    return (
        <Fragment>

            <Col sm="12" xl="12" lg='12' md='12' xs='12' className='m-0 p-0' >
                <Card className='m-0 p-0' style={{boxShadow:'none'}}>
                    <CardHeader className='b-l-primary m-0 pb-0 '>
                        <Row>
                            <Col lg='5' xl='5' md='5' sm='5' xs='12' className='detailsCardList d-flex justify-content-center align-items-center'>
                                <img className='card' src="https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg" alt="" style={{ width: '100px', borderRadius: '50%' }} />

                            </Col>
                            <Col lg='7' xl='7' md='7' sm='7' xs='12' className='detailsCardList d-flex justify-content-start align-items-center'>
                                <div>
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
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> Branch: <span style={{ fontWeight: '600' }}> {props.branch}</span></li>
                                    <li class="list-group-item" style={{ color: '#36454F', fontSize: '15px', padding: '4px' }}> Area:<span style={{ fontWeight: '600' }}> {props.area} </span> </li>

                                </ul>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>

        </Fragment>
    );
};

export default CreativeCardsCommon;