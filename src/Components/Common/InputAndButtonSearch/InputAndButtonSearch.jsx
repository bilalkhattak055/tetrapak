import React, { Fragment } from "react";
import { H4, H2 } from "../../../AbstractElements";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Search, Plus } from "react-feather";
import "../headingAndSearch/heading.css";
import SeacrhBar from '../Search Input/searchInput'

const InputAndButtonSearch = ({
  searchChange,
  searchPlaceHolder,
  role,
  roles,
  handleInputChange,
}) => {
  return (
    <Fragment>
      <div>
        <Form
          className=""
          action="#"
          method="get"
        >
          <Row xs='12'>
          <Col
            className="search-main-div d-flex  "
            xl="6" xs="12"
          >
            <input
              className="input-type-search my-4"
              type="text"
              placeholder={`${searchPlaceHolder ? searchPlaceHolder : "search..."
                }`}
              name=""
              id=""
              onChange={searchChange}
            />

            <Search className="it-search-icon" />
           
          </Col>

          <Col xl="6" xs="12" className="d-flex gap-2 justify-content-end align-items-center mb-ms-4">
            {" "}
            <FormGroup className="marginBottom"> 
              {/* <Label for='role'>Factory</Label> */}
              <Input
                className="form-control rounded-3"
                type="select"
                name="role"
                id="role"
                style={{ width: "158px", height: '48px' }}
                // value={formData.role}
                onChange={(e) => handleInputChange(e, "role")}
              >
                <option value="" selected>
                  Select Role
                </option>
                {roles &&
                  roles.map((rl, i) => (
                    <option key={i} value={rl}>
                      {rl}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup className="marginBottom"> 


              {/* <Label for='role'>Factory</Label> */}
              <Input
                className='form-control rounded-3'
                type='date'
                name='role'
                id='role'
                style={{ width: '158px', height: '48px' }}
                onChange={(e) => handleInputChange(e, 'date')}
              >


              </Input>


            </FormGroup>


          </Col>

        </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default InputAndButtonSearch;
