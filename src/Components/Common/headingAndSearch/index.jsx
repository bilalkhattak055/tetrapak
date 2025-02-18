import React, { Fragment } from "react";
import { H4, H2 } from "../../../AbstractElements";
import { Col, Form, FormGroup, Input } from "reactstrap";
import { Search, Plus } from "react-feather";
import "./heading.css";

const index = ({
  title,
  setAdd,
  searchChange,
  searchPlaceHolder,
  role,
  roles,
  handleInputChange
}) => {
  const itOrSuper = role === "it-officer" || role === "super-admin";

  const handlePopup = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <Fragment>
      {/* <H4>{title}</H4> */}
      <div>
        <Form
          className="form-inline search-full col open"
          action="#"
          method="get"
        >
          <Col
            className="search-main-div d-flex gap-4 "
            xl="6"
            lg="6"
            md="6"
            sm="6"
            xs="12"
          >
            <input
              className="input-type-search my-4"
              type="text"
              placeholder={`${
                searchPlaceHolder ? searchPlaceHolder : "search..."
              }`}
              name=""
              id=""
              onChange={searchChange}
            />
          
            <Search className="it-search-icon" />
            {itOrSuper && (
              <button
                onClick={(e) => handlePopup(e)}
                className="it-button my-4"
              >
                Add User{" "}
                <span>
                  <Plus className="it-icon" />
                </span>
              </button>
            )}
          </Col>
          {role === 'factory' ? (
              <Col xl="6" xs="12" className="d-flex justify-content-end">
                {" "}
                <FormGroup>
                  {/* <Label for='role'>Factory</Label> */}
                  <Input
                    className="form-control rounded-3"
                    type="select"
                    name="role"
                    id="role"
                    style={{ width: "158px" }}
                    // value={formData.role}
                    onChange={(e) => handleInputChange(e, "module")}
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
              </Col>
            ) : (
              <></>
            )}
        </Form>
      </div>
    </Fragment>
  );
};

export default index;
