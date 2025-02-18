import React, { Fragment, useContext } from 'react'
import { Col, Container, Form, Input, Row } from 'reactstrap'
import { Btn, H5 } from '../../AbstractElements'
import './addUser.css'
import { X } from 'react-feather'
import PopupStateContext from '../../_helper/popupState'

const AddUserPopup = () => {
  const {setAddUser} = useContext(PopupStateContext)
  return (
    <Fragment>

      <Container fluid={true} className='add-user-form-page'>

        <Form className=" add-user-form">

          <div className='add-user-top d-flex justify-content-between w-100'>
            <H5 attrH5={{ className: '' }}>Add User</H5>
            <X onClick={()=> setAddUser(false)} width={24} height={24} stroke-width='2' color='black' role='button' className='cursor-pointer' />
          </div>
          <Container className='inputs-sec w-100'>
            <Row className=''>
              <Col xs='12 mb-4'>
                <Input className="form-control" type="text" placeholder="UserId *" required />
              </Col>
              <Col xs='12 mb-4' md='6 mb-4'>
                <Input className="form-control" type="text" placeholder="First Name *" required />
              </Col>
              <Col xs='12 mb-4' md='6 mb-4'>
                <Input className="form-control" type="text" placeholder="Last Name *" required />
              </Col>


              <Col xs='12 mb-4' md='4 mb-4'>
                <Input className="form-control" type="text" placeholder="Email Id *" required />
              </Col>
              <Col xs='12 mb-4' md='4 mb-4'>
                <Input className="form-control" type="number" placeholder="Mobile No" />
              </Col>
              <Col sm="12 mb-4" md="4 mb-4">
                <Input type="select" name="select" className="form-select form-control">
                  <option select="">{'Select Role Type'}</option>
                  <option defaultValue="1">{'One'}</option>
                  <option defaultValue="2">{'Two'}</option>
                  <option defaultValue="3">{'Three'}</option>
                </Input>
              </Col>

              <Col xs='12 mb-4' md='4 mb-4'>
                <Input className="form-control" type="text" placeholder="User Name *" required />
              </Col>
              <Col xs='12 mb-4' md='4 mb-4'>
                <Input className="form-control" type="number" placeholder="Password *" />
              </Col>
              <Col xs='8 mb-4' md="5 mb-4" lg="4 mb-3" xl="3 mb-3">
                <Btn attrBtn={{ className: 'primary', color: "primary" }}>  Generate Password </Btn>
              </Col>

            </Row>
          </Container>



          <div className='module-permission ' >
            <Row>
              <Col sm="9">
                <H5>Module Permission</H5>
              </Col>
              <Col sm="3">
                <H5>Select</H5>
              </Col>
            </Row>
          </div>

          <Container className='inputs-sec w-100'>
            <Row>
              <Col sm="9 mb-4">
                Live Camera
              </Col>
              <Col sm="3 mb-4">
                check
              </Col>
              <Col sm="9 mb-4">
                Reports
              </Col>
              <Col sm="3 mb-4">
                Check
              </Col>
              <Col sm="9 mb-4">
                Live Alers
              </Col>
              <Col sm="3 mb-4">
                Check
              </Col>
            </Row>
          </Container>

          <div>

          </div>
        </Form>
      </Container>
    </Fragment>
  )
}

export default AddUserPopup;
