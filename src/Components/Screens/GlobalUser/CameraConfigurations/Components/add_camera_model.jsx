import React, { useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import CameraService from "../../../../../api/cameraService"; 
import {
  errorToast,
  infoToast,
  successToast,
} from "../../../../../_helper/helper";
import "../cameras.css"
import { useNavigate } from "react-router";

const AddCameraModel = ({ handleSave, areas_list, models }) => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    const queryString = new URLSearchParams({
      areas: JSON.stringify(areas_list),  // Encode areas_list
      models: JSON.stringify(models),     // Encode models
      save: handleSave.toString(),        // Encode the function as a string (optional)
    }).toString();
    navigate(`${process.env.PUBLIC_URL}/addcameras${JSON.parse(localStorage.getItem("role"))}?${queryString}`)
  }
  
  const [modal, setModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState({});
  const [selectedSubArea, setSelectedSubArea] = useState({});
  // const [models, setModels] = useState(models_list);
  const [formData, setFormData] = useState({
    camera_ip: "",
    area: "0",
    area_owner: "",
    sub_area: "0",
    ai_models: [],
    camera_id: "",
    nvr: "0",
    camera_position: "",
  });
  const [showError, setShowError] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setFormData({
      camera_ip: "",
      camera_id: "",
      area: "0",
      area_owner: "",
      sub_area: "0",
      nvr: "0",
      camera_position: "",
      ai_models: [],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.ai_models?.length === 0) {
      setShowError(true);
    } else if (formData?.camera_id === "") {
      alert("Please generate Camera ID");
    } else {
      const payload = {
        user_id: 4,
        sub_area_id: parseInt(formData?.sub_area),
        modules: formData?.ai_models,
        camera_id: formData?.camera_id,
        camera_ip: formData?.camera_ip,
      };
      CameraService.addCamera(payload)
        .then((res) => {
          if (res?.status === 200) {
            successToast(res?.data?.message);
            handleSave({
              camera_id: formData?.camera_id,
              camera_ip: formData?.camera_ip,
              area: selectedArea?.area,
              area_owner: selectedArea?.areaOwner,
              sub_area: selectedSubArea?.name,
              ai_models: formData?.ai_models,
            });
            setFormData({
              camera_ip: "",
              camera_id: "",
              area: "0",
              area_owner: "",
              sub_area: "0",
              nvr: "0",
              camera_position: "",
              ai_models: [],
            });
            toggle();
          } else {
            infoToast(res?.data?.message);
          }
        })
        .catch((err) => {
          if (err?.status === 404) {
            errorToast(err?.statusText);
          } else {
            errorToast(err?.response?.data?.message);
          }
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const moduleId = parseInt(value); // Convert the value back to an integer

    if (checked) {
      // Add the selected module_id
      setFormData((prevState) => ({
        ...prevState,
        ai_models: [...prevState.ai_models, moduleId], // Add moduleId
      }));

      if ([...formData.ai_models, moduleId]?.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    } else {
      // Remove the unselected module_id
      setFormData((prevState) => ({
        ...prevState,
        ai_models: prevState.ai_models.filter((model) => model !== moduleId), // Remove moduleId
      }));

      const filtered = formData?.ai_models.filter(
        (model) => model !== moduleId
      );
      if (filtered?.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  const getSubAreaShortName = (str) => {
    return str
      .split(" ") // Split by spaces
      .filter((word) => !/\d/.test(word)) // Exclude words that contain numbers
      .map((word) => {
        // Handle cases where word contains '&' or other special characters
        if (word.includes("&")) {
          return word; // Keep the '&' intact
        } else if (/[^a-zA-Z0-9]/.test(word)) {
          return word.charAt(0); // Extract first letter of words with special characters
        } else {
          return word.charAt(0); // Extract the first letter of normal words
        }
      })
      .join("") // Join the letters into a string
      .replace(/[^\w&]/g, "-") // Replace all non-alphanumeric characters (except &) with '-'
      .replace(/-+/g, "-") // Replace multiple dashes with a single dash
      .replace(/^-|-$/g, ""); // Remove any leading or trailing dashes
  };

  const RequiredMark = () => (
    <sup className="font-danger" style={{ fontSize: 14 }}>
      *
    </sup>
  );

  return (
    <>
      <Button
        className="rounded-3 d-inline-block"
        color="primary"
        style={{
          height: "38px",
          fontSize: 14,
          margin: "5px 3px",
          padding: "0px 10px",
          width: "120px",
          // width: "160px",
        }}
        onClick={toggle}
      >
        Add Camera
      </Button>
      <Modal
        centered
        isOpen={modal}
        toggle={toggle}
        keyboard={false}
        backdrop="static"
        size="lg"
      >
        <ModalHeader toggle={toggle}>Add Camera</ModalHeader>
        <Form
          onSubmit={handleSubmit}
          className="theme-form"
          style={{ padding: "10px 20px" }}
        >
          <ModalBody>
            <Row>
              <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xx-6 col-right"
                // style={{
                //   paddingRight: 20,
                // }}
              >
                <FormGroup>
                  <Label>
                    {" "}
                    Camera IP <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="text"
                    name="camera_ip"
                    id="camera_ip"
                    style={{ fontSize: 14, color: "black" }}
                    value={formData?.camera_ip}
                    required={true}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="m-1" >
                    {" "}
                    Area <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="select"
                    name="area"
                    id="area"
                    required={true}
                    style={{ fontSize: 14, color: "black" }}
                    value={formData?.area}
                    onChange={(e) => {
                      let owner_name = "";
                      const selected_area = areas_list?.find(
                        (i) => i?.id === parseInt(e.target.value)
                      );

                      if (selected_area) {
                        owner_name = selected_area?.areaOwner;
                        setSelectedArea(selected_area);
                      } else {
                        setSelectedArea({});
                      }
                      setSelectedSubArea({});

                      setFormData({
                        ...formData,
                        area: e.target.value,
                        sub_area: "0",
                        area_owner: owner_name,
                        camera_id: "",
                      });
                    }}
                  >
                    <option value="0">Select Area</option>
                    {areas_list?.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.area}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                <Label className="m-1" >
                    {" "}
                    Area Owner <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="text"
                    name="area_owner"
                    id="area_owner"
                    disabled
                    style={{
                      fontSize: 14,
                      color: "black",
                      backgroundColor: "#e2e2e2",
                    }}
                    value={formData?.area_owner}
                    required={true}
                    onChange={handleInputChange}
                  />
                  <p
                    className="font-dark"
                    style={{ marginLeft: 5, marginBottom: 10, fontSize: 13 }}
                  >
                    Select Area to view Area Owner
                  </p>
                </FormGroup>

                <FormGroup>
                <Label className="m-1" >
                    {" "}
                    Sub Area <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="select"
                    name="sub_area"
                    id="sub_area"
                    required={true}
                    style={{ fontSize: 14, color: "black" }}
                    value={formData?.sub_area}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        sub_area: e.target.value,
                        camera_id: "",
                      });

                      const selected_sub_area = selectedArea?.sub_area?.find(
                        (i) => i?.id === parseInt(e.target.value)
                      );
                      if (selected_sub_area) {
                        setSelectedSubArea(selected_sub_area);
                      } else {
                        setSelectedSubArea({});
                      }
                    }}
                  >
                    <option value="0">Select Sub Area</option>
                    {selectedArea?.sub_area?.map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                <Label className="m-1" >
                    {" "}
                    Camera Position No. on NVR <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="text"
                    name="camera_position"
                    id="camera_position"
                    style={{
                      fontSize: 14,
                      color: "black",
                    }}
                    value={formData?.camera_position}
                    required={true}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>

              <Col
                className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xx-6 col-border"
                // style={{
                //   borderLeft: "1px solid lightgray",
                //   paddingLeft: 20,
                // }}
              >
                <FormGroup>
                <Label className="m-1" >
                    {" "}
                    NVR <RequiredMark />{" "}
                  </Label>
                  <Input
                    className="form-control rounded-3 m-1"
                    type="number"
                    name="nvr"
                    min={0}
                    id="nvr"
                    style={{
                      fontSize: 14,
                      color: "black",
                    }}
                    value={formData?.nvr}
                    required={true}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                <Label className="m-1" >
                    AI Models <RequiredMark />
                  </Label>
                  {models?.map((model) => (
                    <div key={model?.module_id}>
                      <input
                        type="checkbox"
                        value={model?.module_id}
                        onChange={handleCheckboxChange}
                        checked={formData.ai_models.includes(model?.module_id)} // Check by module_id
                      />
                      <label style={{ marginLeft: 10 }}>
                        {model?.module_name}
                      </label>{" "}
                    </div>
                  ))}
                  {showError === true && (
                    <p className="font-danger">
                      Please select at least one AI Model
                    </p>
                  )}
                </FormGroup>
                
                  <FormGroup>
                     <Label className="m-1" >
                      {" "}
                      Camera ID <RequiredMark />{" "}
                    </Label>
                    <Input
                      className="form-control rounded-3 m-1"
                      type="text"
                      name="camera_id"
                      id="camera_id"
                      style={{
                        fontSize: 14,
                        color: "black",
                        backgroundColor:
                          formData?.camera_id === "" ? "#e2e2e2" : "white",
                      }}
                      disabled={formData?.camera_id === ""}
                      value={formData?.camera_id}
                      required
                      onChange={handleInputChange}
                    />
                    <p style={{ fontSize: 13 }}>
                      To generate Camera ID, please select all required fields
                    </p>
                  </FormGroup>
                

                <FormGroup style={{ textAlign: "right" }}>
                  <Button
                    className="m-1"
                    color="primary"
                    disabled={
                      formData?.area === "0" ||
                      formData?.sub_area === "0" ||
                      formData?.camera_ip?.trim() === "" ||
                      formData?.camera_position?.trim() === "" ||
                      formData?.nvr === "0" || formData?.nvr === ""
                    }
                    onClick={() => {
                      const number = formData?.camera_position?.trim();
                      const nvr = formData?.nvr;
                      const IP_parts = formData?.camera_ip?.split(".");
                      const IP = IP_parts[IP_parts.length - 1];
                      const area = selectedArea?.area?.split("-").join("");
                      const sub_area = getSubAreaShortName(
                        selectedSubArea?.name
                      );
                      setFormData({
                        ...formData,
                        camera_id: `ICF-${area}-${sub_area?.toUpperCase()}-${number}-${nvr}-${IP}`,
                      });
                    }}
                  >
                    Generate Camera ID
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>
              Close
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddCameraModel;
