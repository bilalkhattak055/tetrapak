import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Input,
  Label,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import ContextData from "../../../../Hooks/useAuth";
import FactoryService from "../../../../api/factoryService";
import {
  errorToast,
  sortAreaList,
  successToast,
} from "../../../../_helper/helper";
import CameraService from "../../../../api/cameraService";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BeatLoader   } from 'react-spinners';

const EditCamera = () => {
  const { auth } = ContextData();
  const { state } = useLocation();
  const navigate = useNavigate();
const [smallloader, setsmallloader] = useState(false)
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    camera_id: "",
    camera_ip: "",
    modules: [],
    sub_area_id: "",
    camera_name: "",
    camera_position_no: "",
    nvr_no: "",
    camera_location: "",
    username: "",
    password: "",
    stream: "",
    port: "",
    area: "",
    area_owner: "",
    factory_id: "",
  });
  const [dropdownOptions, setDropdownOptions] = useState({
    factory_list: [],
    areas_list: [],
    sub_areas_list: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    factory_name: "",
    area_name: "",
    sub_area_name: "",
  });
  const [selectedArea, setSelectedArea] = useState({});
  const [selectedSubArea, setSelectedSubArea] = useState({});
  const [cameraIdError, setCameraIdError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedFactory, setSelectedFactory] = useState("");
  const [selectedFactoryRec, setSelectedFactoryRec] = useState({});
  const [areas_list, setAreasList] = useState([]);
  const [models, setModels] = useState([]);
  const [loader, setLoader] = useState(false);
  const [saveloader, setSaveLoader] = useState(false);
  const [oldCameraid, setoldCameraid] = useState('')
  const [CameraIdData, setCameraIdData] = useState({
    area:'',
    sub_area:'',
    factory:''
  })
  useEffect(() => {
    if (state !== undefined) {
      setModels(state?.models);
      setLoader(true);
      getCameraRecord({ camera_id: state?.camera_id });
      getAllFactories();
    }
  }, [state]);

  const getCameraRecord = (camera_id) => {
    CameraService.getCameraByID(camera_id)
      .then((res) => {
        const response = res?.data?.data;
        // console.log(response)
        setFormData({
          ...formData,
          camera_id: response?.camera_id || "",
          camera_ip: response?.camera_ip || "",
          camera_name: response?.camera_name || "",
          camera_position_no: response?.camera_position_no || "",
          nvr_no: response?.nvr_no || "",
          camera_location: response?.camera_location || "",
          username: response?.username || "",
          password: response?.password || "",
          stream: response?.stream || "",
          port: response?.port || "",
          sub_area_id: response?.sub_area_id || "",
          area: response?.area_id || "",
          area_owner: response?.area_owner || "",
          modules: response?.modules?.map((i) => i?.module_id) || [],
          factory_id: response?.factory_id,
        });
        setoldCameraid(response?.camera_id)
        setSelectedOptions({
          ...selectedOptions,
          factory_name: response?.factory_name,
          area_name: response?.area,
          sub_area_name: response?.sub_area,
        });
      })
      .catch((e) => {});
  };
useEffect(() => { 
    const area= dropdownOptions?.areas_list?.find(item=>item.id==formData.area)?.area;
    const subarea= dropdownOptions?.sub_areas_list?.find(item=>item.id==formData.sub_area_id)?.name;
    const factory= dropdownOptions?.factory_list?.find(item=>item.factory_id==formData.factory_id)?.name;
    
    setCameraIdData({
      area:area?area:'',
      sub_area:subarea?subarea: '',
      factory:factory?factory:''
    })
 
}, [dropdownOptions,formData])

  const getAllFactories = () => {
    FactoryService.getAllFactories()
      .then((res) => { 
        setDropdownOptions({
          ...dropdownOptions,
          factory_list: res?.data?.data,
        });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (dropdownOptions?.factory_list?.length > 0) {
      const factory_selected = dropdownOptions?.factory_list?.filter(
        (fac) => fac?.factory_id === parseInt(formData?.factory_id)
      );
      const filtered_areas = factory_selected
        ? factory_selected[0]?.areas?.filter(
            (area) => area?.id === parseInt(formData?.area)
          )
        : []; 
    //   const filtered_sub_areas = filtered_areas
    //     ? filtered_areas[0]?.sub_area?.filter(
    //         (sub) => sub?.id === parseInt(formData?.sub_area_id)
    //       )
    //     : [];
      setDropdownOptions({
        ...dropdownOptions,
        areas_list: factory_selected ? sortAreaList(factory_selected[0]?.areas) : [],
        sub_areas_list: filtered_areas ? filtered_areas[0]?.sub_area : [],
      });
      console.log(dropdownOptions)
    }
  }, [dropdownOptions?.factory_list]);

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
        modules: [...prevState.modules, moduleId], // Add moduleId
      }));

      if ([...formData.modules, moduleId]?.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    } else {
      // Remove the unselected module_id
      setFormData((prevState) => ({
        ...prevState,
        modules: prevState.modules.filter((model) => model !== moduleId), // Remove moduleId
      }));

      const filtered = formData?.modules.filter((model) => model !== moduleId);
      if (filtered?.length === 0) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  const getSubAreaShortName = (str) => {
    return str
      ?.split(" ") // Split by spaces
      ?.filter((word) => !/\d/.test(word)) // Exclude words that contain numbers
      ?.map((word) => {
        // Handle cases where word contains '&' or other special characters
        if (word.includes("&")) {
          return word; // Keep the '&' intact
        } else if (/[^a-zA-Z0-9]/.test(word)) {
          return word.charAt(0); // Extract first letter of words with special characters
        } else {
          return word.charAt(0); // Extract the first letter of normal words
        }
      })
      ?.join("") // Join the letters into a string
      ?.replace(/[^\w&]/g, "-") // Replace all non-alphanumeric characters (except &) with '-'
      ?.replace(/-+/g, "-") // Replace multiple dashes with a single dash
      ?.replace(/^-|-$/g, ""); // Remove any leading or trailing dashes
  };

  const RequiredMark = () => (
    <sup className="font-danger" style={{ fontSize: 14 }}>
      *
    </sup>
  ); 
  const handleFactory = (e) => {
    if (e.target.value !== "") {
      const selected = dropdownOptions?.factory_list?.find(
        (i) => i?.id === parseInt(e.target.value)
      ); 
      setFormData({
        ...formData,
        factory_id: selected?.id,
        area: "",
        sub_area_id: "",
        camera_id: "",
        area_owner: "",
      });
      setSelectedOptions({
        ...selectedOptions,
        factory_name: selected ? selected?.name : "",
        area_name: "",
        sub_area_name: "",
      });
   
      const factory_selected = dropdownOptions?.factory_list?.filter(
        (fac) => fac?.factory_id === parseInt(e.target.value)
      );
      
      const filtered_areas = factory_selected
        ? factory_selected[0]?.areas?.filter(
            (area) => area?.id === parseInt(formData?.area)
          )
        : [];


      FactoryService.getFactorybyID(parseInt(e.target.value))
        .then((res) => {
          const areas = res?.data?.data?.areas;
          const filteredAreas = areas?.filter(
            (area) => area?.id === parseInt(formData?.area)
          );
          setDropdownOptions({
            ...dropdownOptions,
            areas_list: sortAreaList(res?.data?.data?.areas) || [],
            sub_areas_list: filteredAreas ? filteredAreas[0]?.sub_area : [],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setDropdownOptions({
        ...dropdownOptions,
        areas_list: [],
        sub_areas_list: [],
      });
      setSelectedOptions({
        ...selectedOptions,
        factory_name: "",
        area_name: "",
        sub_area_name: "",
      });
      setFormData({
        ...formData,
        factory_id: "",
        camera_id: "",
        area: "",
        sub_area_id: "",
        area_owner: "",
      });
    }
  };

  const handleArea = (e) => {
    const val = e.target.value;
    setDropdownOptions({
      ...dropdownOptions,
      sub_areas_list: [],
    });
    setSelectedOptions({
      ...selectedOptions,
      sub_area_name: "",
    });
    if (val !== "") {
      const selected_area = dropdownOptions?.areas_list?.find(
        (i) => i?.id === parseInt(e.target.value)
      );
      setDropdownOptions({
        ...dropdownOptions,
        sub_areas_list: selected_area ? selected_area?.sub_area : [],
      });
      setSelectedOptions({
        ...selectedOptions,
        area_name: selected_area ? selected_area?.area : "",
      });
      setFormData({
        ...formData,
        area: parseInt(e.target.value),
        sub_area_id: "",
        area_owner: selected_area ? selected_area?.areaOwner : "",
        camera_id: "",
      });
    } else {
      setFormData({
        ...formData,
        area: "",
        sub_area_id: "",
        area_owner: "",
        camera_id: "",
      });
    }
  };

  const handleSubArea = (e) => {
    setFormData({
      ...formData,
      sub_area_id: e.target.value || 'Muhammad Sheheryar',
      camera_id: "",
    });
    if (e.target.value !== "") {
      const selected_sub_area = selectedArea?.sub_area?.find(
        (i) => i?.id === parseInt(e.target.value)
      );

      if (selected_sub_area) {
        setSelectedSubArea(selected_sub_area);
      } else {
        setSelectedSubArea({});
      }
    } else {
      setSelectedSubArea({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsmallloader(true)
    if (formData?.modules?.length === 0) {
      setShowError(true);
      setsmallloader(false)
    } else if (formData?.camera_id === "") {
      setCameraIdError(true);
      setsmallloader(false)
      // alert("Please generate Camera ID");
    } else {
      const payload = {
        user_id: 4,
        ...formData,
        sub_area_id: parseInt(formData?.sub_area_id),
          ...(oldCameraid== formData.camera_id ? {
            change_camera_id:false,
            old_camera_id:oldCameraid,
        }:{
          change_camera_id:true,
          new_camera_id:formData.camera_id,
          old_camera_id:oldCameraid,
        })
      }; 
      if(!payload.area_owner){
        payload.area_owner='Sheheryar' 
      }
      console.log(payload); 
      
      const res = CameraService.updateCamera(payload)
        .then((res) => {
          if (res?.data?.success) {
            successToast(res?.data?.message);
            setsmallloader(false)
            setFormData({
              camera_id: "",
              camera_ip: "",
              modules: [],
              sub_area_id: "",
              camera_name: "",
              camera_position_no: "",
              nvr_no: "",
              camera_location: "",
              username: "",
              password: "",
              stream: "",
              port: "",
              area: "",
              area_owner: "",
            });
            navigate(-1);
          } else {
            errorToast(res?.data?.message);
          }
        })
        .catch((err) => {
          setsmallloader(false)
          if (err?.status === 404) {
            errorToast(err?.statusText);
            setsmallloader()
          } else {
            errorToast(err?.response?.data?.message);
          }
        });
        console.log(res.data,'camera updated')
    }
  };

  const clearInputs = () => {
    setFormData({
      camera_id: "",
      camera_ip: "",
      modules: [],
      sub_area_id: "",
      camera_name: "",
      camera_position_no: "",
      nvr_no: "",
      camera_location: "",
      username: "",
      password: "",
      stream: "",
      port: "",
      area: "",
      area_owner: "",
    });
  };

  return (
    <>
      <br />
      <Container fluid>
        <IoIosArrowRoundBack
          className="backArrow"
          style={{ cursor: "pointer" }}
          onClick={() => {
            clearInputs();
            navigate(-1);
          }}
        />
        <Row>
          <Col>
            <Card>
              <CardBody>
                <h5 className="text-center mt-3 mb-3">Update Camera</h5>
                <Form
                  onSubmit={handleSubmit}
                  className="theme-form"
                  style={{ padding: "10px 20px", marginTop: 15 }}
                >
                  <Row className="" style={{ height: "100%", width: "100%" }}>
                    <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xx-6 col-right">
                      {/* Factory */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Factory <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="select"
                          name="area"
                          id="area"
                          style={{ fontSize: 14, color: "black" }}
                          value={formData?.factory_id}
                          required={true}
                          onChange={handleFactory}
                        >
                          <option value="">Select Factory</option>
                          {dropdownOptions?.factory_list?.map((item, index) => (
                            <option key={index} value={item?.factory_id}>
                              {item?.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      {/* Area */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Area <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="select"
                          name="area"
                          id="area"
                          style={{ fontSize: 14, color: "black" }}
                          value={formData?.area}
                          required={true}
                          onChange={handleArea}
                        >
                          <option value="">Select Area</option>
                          {dropdownOptions?.areas_list?.map((item, index) => (
                            <option key={index} value={item?.id}>
                              {item?.area}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      {/* Area Owner */}
                      <FormGroup>
                        <Label className="m-1">
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
                          style={{
                            marginLeft: 5,
                            marginBottom: 10,
                            fontSize: 13,
                          }}
                        >
                          Select Area to view Area Owner
                        </p>
                      </FormGroup>

                      {/* Sub Area */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Sub Area <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="select"
                          name="sub_area_id"
                          id="sub_area_id"
                          required={true}
                          style={{ fontSize: 14, color: "black" }}
                          value={formData?.sub_area_id}
                          onChange={handleSubArea}
                        >
                          <option value="">Select Sub Area</option>
                          {dropdownOptions?.sub_areas_list?.map(
                            (item, index) => (
                              <option key={index} value={item?.id}>
                                {item?.name}
                              </option>
                            )
                          )}
                        </Input>
                      </FormGroup>
                      {/* Camera IP */}
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
                    </Col>

                    <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xx-6 col-border">
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Camera Position No. on NVR <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="text"
                          name="camera_position_no"
                          id="camera_position_no"
                          style={{
                            fontSize: 14,
                            color: "black",
                          }}
                          value={formData?.camera_position_no}
                          required={true}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              camera_position_no: e.target.value,
                              camera_id: "",
                            });
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          NVR <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="number"
                          name="nvr_no"
                          min={0}
                          id="nvr_no"
                          style={{
                            fontSize: 14,
                            color: "black",
                          }}
                          value={formData?.nvr_no}
                          required={true}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              nvr_no: e.target.value,
                              camera_id: "",
                            });
                          }}
                        />
                      </FormGroup>
                      {/* Camera Name */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Camera Name <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="text"
                          name="camera_name"
                          id="camera_name"
                          style={{
                            fontSize: 14,
                            color: "black",
                          }}
                          value={formData?.camera_name}
                          required={true}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      {/* Camera Location */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Camera Location <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="text"
                          name="camera_location"
                          id="camera_location"
                          style={{
                            fontSize: 14,
                            color: "black",
                          }}
                          value={formData?.camera_location}
                          required={true}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      {/* Username */}
                      <FormGroup>
                        <Label className="m-1">
                          {" "}
                          Username <RequiredMark />{" "}
                        </Label>
                        <Input
                          className="form-control rounded-3 m-1"
                          type="text"
                          name="username"
                          id="username"
                          style={{
                            fontSize: 14,
                            color: "black",
                          }}
                          value={formData?.username}
                          required={true}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xx-6 col-left">
                      {/* Password */}
                      <Row>
                        <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 col-xxl-12 col-right">
                          <FormGroup>
                            <Label className="m-1">
                              {" "}
                              Password <RequiredMark />{" "}
                            </Label>
                            <Input
                              className="form-control rounded-3 m-1"
                              type="text"
                              name="password"
                              id="password"
                              style={{
                                fontSize: 14,
                                color: "black",
                              }}
                              value={formData?.password}
                              required={true}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="m-1">
                              {" "}
                              Port <RequiredMark />{" "}
                            </Label>
                            <Input
                              className="form-control rounded-3 m-1"
                              type="number"
                              name="port"
                              min={0}
                              id="port"
                              style={{
                                fontSize: 14,
                                color: "black",
                              }}
                              value={formData?.port}
                              required={true}
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="m-1">
                              AI Models <RequiredMark />
                            </Label>
                            {models?.map((model) => (
                              <div key={model?.module_id}>
                                <input
                                  type="checkbox"
                                  value={model?.module_id}
                                  onChange={handleCheckboxChange}
                                  checked={formData?.modules?.includes(
                                    model?.module_id
                                  )} // Check by module_id
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
                        </Col>
                        <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 col-xxl-12 col-camera-border">
                          <FormGroup>
                            <Label className="m-1">
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
                                  formData?.camera_id === ""
                                    ? "#e2e2e2"
                                    : "white",
                              }}
                              disabled={formData?.camera_id === ""}
                              value={formData?.camera_id}
                              required
                              onChange={handleInputChange}
                            />
                            <p style={{ fontSize: 13 }}>
                              To generate Camera ID, please select all required
                              fields
                            </p>
                          </FormGroup>
                          {cameraIdError && (
                            <p className="font-danger">
                              Please generate Camera ID
                            </p>
                          )}

                          <FormGroup style={{ textAlign: "right" }}>
                            <Button
                              className="m-1"
                              color="primary"
                              disabled={
                                formData?.area === "0" ||
                                formData?.sub_area_id === "0" ||
                                formData?.camera_ip?.trim() === "" ||
                                formData?.camera_position_no?.trim() === "" ||
                                formData?.nvr_no === "0" ||
                                formData?.nvr_no === ""
                              }
                              onClick={() => {
                               
                                const number =
                                  formData?.camera_position_no?.trim();
                                const nvr_no = formData?.nvr_no;
                                const IP_parts =
                                  formData?.camera_ip?.split(".");
                                const IP = IP_parts[IP_parts.length - 1];
                                // const area = selectedArea?.area
                                //   ?.split("-")
                                //   .join("");
                                const area = CameraIdData.area
                                  ?.split("-")
                                  .join("");

                                // const sub_area_id = getSubAreaShortName(
                                //   selectedSubArea?.name
                                // );
                                const sub_area_id = getSubAreaShortName(
                                  CameraIdData.sub_area
                                );
                                // setFormData({
                                //   ...formData,
                                //   camera_id: `${
                                //     selectedFactoryRec?.name
                                //   }-${area}-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`,
                                // });
                                setFormData({
                                  ...formData,
                                  camera_id: `${
                                    CameraIdData.factory
                                  }-${area}-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`,
                                });
                                setCameraIdError(false);
                              }}
                            >
                              Generate Camera ID
                            </Button>
                          </FormGroup>
                          <FormGroup>
                            
                            {smallloader?<BeatLoader className="pull-right mt-3 mb-4"/>:
                            <Button
                              color="success"
                              type="submit"
                              className="pull-right mt-3 mb-4"
                            >
                              Save
                            </Button>
                            }
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditCamera;
