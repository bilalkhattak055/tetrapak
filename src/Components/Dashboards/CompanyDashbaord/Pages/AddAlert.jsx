import React, { useState } from "react";
import "./styling/addForm.css";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { H5 } from "../../../../AbstractElements";
// import BasicColor from "../../../../FormSwitch/BasicSwitch/SwitchColor";
import { Typeahead } from "react-bootstrap-typeahead";
import FormButtom from '../../../Common/newButton/index'

const AddAlert = () => {
  const [switch2, setswitch2] = useState(true);
  const [switch3, setswitch3] = useState(true);
  const [switch4, setswitch4] = useState(true);
  const [multiple, setMultiple] = useState(true);

  const handleCancel = (e) => {
    e.preventDefault()
  }
  const handleSubmit = (e) => [
    e.preventDefault()
  ]
  return (
    <Container fluid={true} className="dashboard-first-page add-alert px-4 py-5">
      <H5 attrH5={{ className: "Add-alert-head" }}>Add Alert</H5>
      <form className="w-100 add-alert-form">
        <Row xs="12">
          <Col xs="12 p-0">
            <FormGroup>
              <Label for="name">Alert Title</Label>
              <Input className="bgg-color" type="text" name="name" id="name" />
            </FormGroup>
          </Col>

          <Col xs="12" className="border-line-container">
            <div className="border-line rounded-4">
              <FormGroup switch className=" ">
                <H5 attrH5={{ className: "pt-3" }}>Notification</H5>
                <div className="padding-line px-4 py-3">
                  <Input
                  className="switch-input"
                    type="switch"
                    checked={switch2}
                    onClick={() => {
                      setswitch2(!switch2);
                    }}
                  />
                  <Label check>
                    <strong>In App</strong>
                  </Label>
                  <p>Keep all alerts in the live alert page</p>
                </div>
              </FormGroup>
              <Col xs="12" className="border-line-container">
                <div className="padding-line px-4 py-3 rounded-4">
                  <FormGroup switch className=" ">
                    <Input
                     className="switch-input"
                      type="switch"
                      checked={switch3}
                      onClick={() => {
                        setswitch3(!switch3);
                      }}
                    />
                    <Label check>
                      <strong>Email Notification</strong>
                    </Label>
                    <p>
                      Recieve Email notification when alerts get triggered. who
                      should be notified?
                    </p>
                    <Typeahead
                      id="basic-typeahead"
                      className="type-head"
                      labelKey="name"
                      multiple={multiple}
                      options={[]}
                      placeholder="mbilalkhk@gmail.com"
                      allowNew
                    />

                  </FormGroup>
                </div>
              </Col>


              <Col xs="12" className="border-line-container">
                <div className="padding-line px-4 py-4 rounded-4">
                  <FormGroup switch className=" ">
                    <Input
                     className="switch-input"
                      type="switch"
                      checked={switch4}
                      onClick={() => {
                        setswitch4(!switch4);
                      }}
                    />
                    <Label check>
                      <strong>Whatsapp Notification</strong>
                    </Label>
                    <p>
                      Recieve whatsapp notification when alerts get triggered.
                      who should be notified?
                    </p>
                    <Typeahead
                      id="basic-typeahead"
                      className="type-head"
                      labelKey="name"
                      multiple={multiple}
                      options={[]}
                      placeholder="+923142676432"
                      allowNew
                    />

                  </FormGroup>
                </div>
              </Col>

            </div>
          </Col>
          <div className="w-100 d-flex justify-content-end gap-4 mt-2"> 
            <FormButtom btnText='Cancel' bgcolor='btn-danger' onClick={handleCancel} />
            <FormButtom btnText='Add Alert' onClick={handleSubmit} />
          </div>
        </Row>
      </form>
    </Container>
  );
};

export default AddAlert;
