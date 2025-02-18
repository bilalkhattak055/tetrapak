import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  Input,
  Label,
} from "reactstrap";
import {
  CamersStatus,
  ReductionTarget,
} from "../../../../../Data/staticData/data";
import CommonFIlterButton from "../../../../Common/commonFilterButton/CommonFIlterButton";

const UpdateTargetModel = ({
  data,
  targetweek,
  handleShow,
  handleSave,
  selectedAreas,
  selectedMonth,
  currentTarget
}) => {
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    target: "",
  });

  const toggle = () => {
    setModal(!modal);
    handleShow(!modal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData?.target);
    toggle();
  };
  useEffect(() => { 
  setFormData({
    target:currentTarget
  })
}, [currentTarget])

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      keyboard={false}
      backdrop="static"
    >
      <ModalHeader toggle={toggle}>
        Update Target (Week {data?.current_week?.week})
      </ModalHeader>
      <Form
        onSubmit={handleSubmit}
        className="theme-form"
        style={{ padding: "10px 20px" }}
      >
        <ModalBody>
          <FormGroup>
           
            {/* <Input
              className="form-control rounded-3 m-1"
              type="number"
              min={0}
              name="current_target"
              id="current_target"
              style={{ fontSize: 14, color: "black" }}
              value={formData?.target}
              required
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFormData({ ...formData, target: val });
              }}
            /> */}

           { data?.last_week.alerts == 0 && data?.current_week.target == null ? 
           <p style={{color:'red'}} className="m-0 p-0">Due to last week's alert being zero, the target can not be set.</p>
            :
            <>
             <Label> Target </Label>
            <CommonFIlterButton
              data={ReductionTarget}
              handleInputChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, target: val });
              }}
              style={{ fontSize: 14, color: "black" }}
              selectedItem={formData?.target}
              firstOption={"Select Target"}
              inputChangeOption={"current_target"} 
            />
            </>
            }
          </FormGroup>
          
          {selectedAreas?.length > 0 ? (
            <>
              <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 5 }}>
                Selected Areas
              </p>
              <Row>
                {selectedAreas
                  ?.sort((a, b) => {
                    if (a.area < b.area_id) return -1;
                    if (a.area > b.area_id) return 1;
                    return 0;
                  })
                  .map((item, index) => (
                    <Col
                      key={index}
                      className="col-12 col-sm-6 col-md-6 col-lg-4 col-xxl-4 col-xxl-4"
                      style={{ padding: "5px 12px" }}
                    >
                      <b style={{ fontWeight: 400 }}>{item?.area_id}</b>
                    </Col>
                  ))}
              </Row>
            </>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button className="m-1" color="dark" onClick={toggle}>
            Close
          </Button>
          { data?.last_week.alerts == 0 && data?.current_week.target == null ?null:
          <Button className="m-1" color="primary" type="submit">
            Save
          </Button>
          }
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default UpdateTargetModel;
