import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import DatePicker from 'react-datepicker';
import './dateComp.css';


const Index = ({ handleDateChange,handleTimeChange, timing}) => {
  return (

        <Row className='d-flex  DateComponenet'>
            <Col>
                <Card className='float-right'>
                    <CardBody className='d-flex flex-column align-content-center' style={{ padding: '12px 12px 12px 20px' }}>
                    <DatePicker
                            // selected={timing.startDate}
                            // selected={timing.startDate ? new Date(timing.startDate) : null}  // Ensure valid date

                            onChange={(e)=> handleDateChange(e, 'startDate')}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select Date"
                            className='w-100'
                        />
                        <DatePicker
        // selected={timing.endDate ? new Date(timing.endDate) : null}  // Ensure valid date
        onChange={(e)=> handleDateChange(e, 'endDate')}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select Date"
                            className='w-100'
                        />
                        <DatePicker
        // selected={timing.startTime ? timing.startTime : null}  // Use the Date object directly
        onChange={(e)=> handleDateChange(e, 'startTime')}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Start Time"
                            dateFormat="h:mm aa"
                            placeholderText="Select Start Time"
                            className='mt-2 w-100'
                        />
                        <DatePicker
        // selected={timing.endTime ? timing.endTime : null}  // Use the Date object directly
        onChange={(e)=> handleDateChange(e, 'endTime')}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="End Time"
                            dateFormat="h:mm aa"
                            placeholderText="Select End Time"
                            className='mt-2 w-100'
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>

  )
}

export default Index
