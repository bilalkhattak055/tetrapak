import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FormGroup,
  Button,
  Form,
  Input,
  Label,
  CardBody,
  Card,
  Table,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import CameraService from "../../../../api/cameraService";
import {
  errorToast,
  infoToast,
  showInfoAlert,
  sortAreaList,
  successToast,
} from "../../../../_helper/helper";
import "./cameras.css";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowRoundBack, IoIosCloudDownload } from "react-icons/io";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { CameraAddOptions } from "../../../../Data/staticData/data";
import { read, utils } from "xlsx";
import Swal from "sweetalert2";
import ContextData from "../../../../Hooks/useAuth";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { Download, Loader, Save } from "react-feather";
import FactoryService from "../../../../api/factoryService";
import { Typeahead } from "react-bootstrap-typeahead";
import sampleFile from "../../../../assets/sample/CamerasSample.xlsx";
import AreaService from "../../../../api/areaService";

const AddCamera = () => {
  const { auth } = ContextData();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFactory, setSelectedFactory] = useState("");
  const [selectedFactoryRec, setSelectedFactoryRec] = useState({});
  const [factoryAreas, setFactoryAreas] = useState([]);
  const [subArea, setsubArea] = useState([]);
  const [excelArea, setExcelArea] = useState("");
  const [excelAreaRec, setExcelAreaRec] = useState({});
  const [excelSubAreas, setExcelSubAreas] = useState([]);
  const fileref = useRef(null);
  const [RowsDataEditable, setRowsdataEditable] = useState([]);
  const [RowData, setRowData] = useState([]);
  const [showtable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [models, setModels] = useState([]);

  const location = useLocation();
  // Parse the query string from the URL
  const queryParams = new URLSearchParams(location.search);

  const [selectedArea, setSelectedArea] = useState({});
  const [selectedSubArea, setSelectedSubArea] = useState({});
  const [cameraIdError, setCameraIdError] = useState(false);
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
  });
  const [showError, setShowError] = useState(false);

  const [factories, setfactories] = useState([]);
  const [allData, setallData] = useState([]);

  useEffect(() => {
    CameraService.modules().then((res)=>{
      setModels(res?.data?.data || []);
    }).catch((e)=>{})
    
    GetFactory();
  }, []); 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.modules?.length === 0) {
      setShowError(true);
    } else if (formData?.camera_id === "") {
      setCameraIdError(true);
      // alert("Please generate Camera ID");
    } else {
      setDisableSaveButton(true)
      const payload = {
        user_id: 4,
        ...formData,
        sub_area_id: parseInt(formData?.sub_area_id),
        status: 1,
        area_name:formData?.area,
        factory_name:selectedFactoryRec?.name ,
        sub_area_name:selectedSubArea?.name
      };
      CameraService.addCamera(payload)
        .then((res) => {
          if (res?.data?.success) {
            successToast(res?.data?.message);
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
          } else {
            errorToast(res?.data?.message);
          }
          setDisableSaveButton(false)
        })
        .catch((err) => {
          if (err?.status === 404) {
            errorToast(err?.statusText);
          } else {
            errorToast(err?.response?.data?.message);
            
          }
          setDisableSaveButton(false)
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

  const handleFilterChange = (e, field) => {
    setSelectedOption(e.target.value);
    setSelectedFactory("");
    setSelectedFactoryRec({});
    setFactoryAreas([]);
    setExcelArea("");
    setExcelAreaRec({});
    setExcelSubAreas([]);
    if (fileref.current) {
      fileref.current.value = null;
    }
    setRowData([]);
    setRowsdataEditable([]);
    setShowTable(false);
    setDisableSaveButton(false);
  };

  const handleFactory = (e, field) => {
    setSelectedFactory(e.target.value);
    setSelectedFactoryRec({});
    // setFactoryAreas([]);
    setExcelArea("");
    setExcelAreaRec({});
    setExcelSubAreas([]);
    if (fileref.current) {
      fileref.current.value = null;
    }
    setRowData([]);
    setRowsdataEditable([]);
    setShowTable(false);
    setDisableSaveButton(false);

    // FactoryService.getFactorybyID(parseInt(e.target.value))
    //   .then((res) => {
    //     setSelectedFactoryRec(res?.data?.data);
    //     setFactoryAreas(sortAreaList(res?.data?.data?.areas));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   }); 

    if (allData.length > 0) {
      const fac = allData?.filter((item) => item?.name === e.target.value);
      // console.log("fact:", fac)
      setSelectedFactoryRec(fac?.length > 0 ? fac[0]: null)
      setFactoryAreas(
        fac
          .map(
            (item) =>
              item.areas
                .filter((a) => a.active) // Filter only active areas
                .map((a) => a.area) // Map to the `area` field
          )
          .flat()
          .sort((a, b) => {
            const numA = parseInt(a.split("-")[1], 10); // Extract numeric part
            const numB = parseInt(b.split("-")[1], 10);
            return numA - numB; // Sort numerically
          })
      );
    }
  };

  const handleExcelArea = (e) => {
    const val = e.target.value;
    setExcelArea(val);
    setExcelAreaRec({});
    setExcelSubAreas([]);
    fileref.current.value = null;
    setRowData([]);
    setRowsdataEditable([]);
    setShowTable(false);
    setDisableSaveButton(false);

    if (val !== "") {

      const selected_area = selectedFactoryRec?.areas?.find(
        (i) => i?.area === e.target.value
      ); 
 
      if (selected_area) {
        setExcelSubAreas(selected_area?.sub_area);
        setExcelAreaRec(selected_area);
      }
    }
  };

  const EXTENSIONS = ["xlsx", "xls", "csv"];

  const getextension = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };
  const ConvertToJSon = (headers, data) => {
    const rows = [];
    data?.forEach((row) => {
      let rowData = {};
      row?.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const importFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (getextension(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const bstr = event.target.result;
          const workbook = read(bstr, { type: "binary" });

          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];

          const fileData = utils.sheet_to_json(worksheet, { header: 1 });

          const file_headers = [
            "sr",
            "camera_ip",
            "camera_name",
            "camera_position_no",
            "nvr_no",
            "camera_location",
            "username",
            "password",
            "stream",
            "port",
          ];

          const converted_headers = fileData[0]?.map((item) => {
            return item.trim().toLowerCase().split(" ").join("_");
          });
          fileData.splice(0, 1);

          if (
            file_headers.every((header) => converted_headers.includes(header))
          ) {
            const emptyColumnExists = fileData?.some((row) => {
              return Object.values(row).some(
                (value) =>
                  value === undefined ||
                  (typeof value === "string" &&
                    (value.includes("eg") || value.includes("e.g")))
              );
            });

            if (emptyColumnExists) {
              errorToast("All columns are required");
            } else {
              const data = ConvertToJSon(converted_headers, fileData);

              const newList = [];
              data.forEach((st) => {
                if (Object.keys(st).length !== 0) {
                  newList.push(st);
                }
              });
              const alldata = newList.map((st, index) => ({
                id: index + 1,
                camera_ip:
                  st.camera_ip === undefined ? "" : st.camera_ip.trim(),
                camera_name:
                  st.camera_name === undefined ? "" : st.camera_name.trim(),
                camera_position_no:
                  st.camera_position_no === undefined
                    ? ""
                    : st.camera_position_no.trim(),
                nvr_no: st.nvr_no === undefined ? "" : st.nvr_no,
                camera_location:
                  st.camera_location === undefined
                    ? ""
                    : st.camera_location.trim(),
                username: st.username === undefined ? "" : st.username.trim(),
                password: st.password === undefined ? "" : st.password.trim(),
                stream: st.stream === undefined ? "" : st.stream.trim(),
                port: st.port === undefined ? 0 : st.port,
              }));

              const newList1 = [];
              alldata.forEach((st) => {
                if (st.camera_ip !== "") {
                  newList1.push(st);
                }
              });
              // console.log(newList1)
              setRowData(newList1);
              setRowsdataEditable(newList1);
              setShowTable(true);
            }
          } else {
            setShowTable(false);
            errorToast("Invalid Sheet with different columns");
          }
        };
        reader.readAsBinaryString(file);
      } else {
        errorToast("Please select .csv/.xlsx File");
        setShowTable(false);
      }
    } else {
      setShowTable(false);
      setRowData([]);
      setRowsdataEditable([]);
    }
  };

  const generateCameraID = (row) => {
    const number = row?.camera_position_no?.trim();
    const nvr_no = row?.nvr_no;
    const IP_parts = row?.camera_ip?.split(".");
    const IP = IP_parts?.length > 0 ? IP_parts[IP_parts.length - 1] : "";
    const area = row?.area_id?.split("-").join("");
    const sub_area_id = getSubAreaShortName(row?.sub_area_name);
    return `${selectedFactory}-${area}-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`;
  };

  useEffect(() => {
    RowsDataEditable.length === 0 ? setShowTable(false) : setShowTable(true);
  }, [RowsDataEditable]);

  async function GetFactory() {
    setLoading(true);
    const res = await AreaService.getAllFactoriesDataForIT();
    if (res) {
      setLoading(false);
    }
    setallData(res?.data?.data);
    setfactories(res?.data?.data.map((item) => item?.name));
  }

  const handleDeleteClick = (row) => {
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      iconColor: "#bd2130",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      cancelButtonColor: "#bd2130",
      allowEnterKey: false,
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        const filtereddata = RowData.filter((r) => r.id !== row.id);
        setRowData(filtereddata);
        setRowsdataEditable(filtereddata);
      }
    });
  };

  const handleSubmitExcel = () => {
    
    const isDataValid = RowsDataEditable.every(
      (row) =>
        row?.sub_area_id !== undefined &&
        row.sub_area_id !== "" &&
        row.sub_area_id !== 0 &&
        row?.modules !== undefined &&
        row.modules.length > 0 &&
        row?.camera_id !== undefined &&
        row.camera_id !== ""
    );
    if (selectedFactory === "") {
      showInfoAlert("Please Select Factory");
    } else if (RowsDataEditable?.length === 0) {
      showInfoAlert("Please Add data before Save");
    } else if (!isDataValid) {
      showInfoAlert(
        "Please select Sub Area, Modules and Generate Camera ID for all Cameras"
      );
    } else {
      // setShowTable(false)
      setDisableSaveButton(true);
      // setLoading(true);
      const payload = {
        user_id: auth?.id || 1,
        cameras_list: RowsDataEditable?.map((i) => ({
          ...i,
          modules: i?.modules.map((m) => m.module_id),
        })),
        area_name:excelAreaRec?.area,
        factory_name:selectedFactoryRec?.name ,
        area_owner:excelAreaRec?.areaOwner

      }; 
      CameraService.addCamerasWithExcel(payload)
        .then((res) => {
          if (res.data?.success) {
            successToast("Cameras added successfully");
            setShowTable(false);
            setRowData([]);
            setRowsdataEditable([]);
            fileref.current.value = null;
          } else {
            errorToast(res?.data?.message);
          }
          setDisableSaveButton(false);
          // setLoading(false);
        })
        .catch((err) => {
          errorToast(err?.response?.data?.message);
          setDisableSaveButton(false);
          // setLoading(false);
        });
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

  const downloadSampleFile = () => {
    const link = document.createElement("a");
    link.href = sampleFile;
    link.download = "Cameras Sample.xlsx";
    link.click();
  };

  return (
    <>
      <br />
      <Container fluid={true}>
        <IoIosArrowRoundBack
          className="backArrow"
          style={{ cursor: "pointer" }}
          onClick={() => {
            clearInputs();
            navigate(-1);
          }}
        />{" "}
        <h5 className="mt-2 mb-2">Add Cameras</h5>
        {/* Filters */}
        {loading ? (
          <div style={{ marginTop: "5%" }}>
            <Loader1 />
          </div>
        ) : (
          <>
            <Card style={{ marginBottom: 10 }}>
              <CardBody>
                <CommonFIlterButton
                  data={CameraAddOptions}
                  handleInputChange={handleFilterChange}
                  style={{
                    width: "160px",
                    height: "38px",
                    fontSize: 13,
                    margin: "5px 3px",
                    display: "inline-block",
                  }}
                  selectedItem={selectedOption}
                  firstOption={"Select Type"}
                  inputChangeOption={"type"}
                  className={""}
                />

                <Input
                  className="form-control rounded-3 d-inline-block"
                  type="select"
                  name="area"
                  id="area"
                  style={{
                    width: "160px",
                    height: "38px",
                    fontSize: 14,
                    margin: "10px 3px",
                    display: "inline-block",
                  }}
                  value={selectedFactory}
                  onChange={handleFactory}
                >
                  <option key={0} value="">
                    Select Factory
                  </option>
                  {factories.map((factory, index) => (
                    <option key={index + 1} value={factory}>
                      {factory}
                    </option>
                  ))}
                </Input>

                {selectedOption === "Excel" && selectedFactory !== "" && (
                  <>
                    <Input
                      className="form-control rounded-3 d-inline-block"
                      type="select"
                      name="area"
                      id="area"
                      style={{
                        width: "160px",
                        height: "38px",
                        fontSize: 14,
                        margin: "10px 3px",
                        display: "inline-block",
                      }}
                      disabled={factoryAreas?.length === 0}
                      value={excelArea}
                      onChange={handleExcelArea}
                    >
                      <option value="">Select Area</option>
                      {factoryAreas?.map((item, index) => (
                        <option key={index} value={item?.id}>
                          {item}
                        </option>
                      ))}
                    </Input>{" "}
                    <Input
                      innerRef={fileref}
                      className="form-control m-1"
                      disabled={excelArea === ""}
                      type="file"
                      style={{ maxWidth: "27rem", display: "inline-block" }}
                      onChange={importFile}
                    />
                    <Button
                      className="m-1"
                      type="submit"
                      color="danger"
                      style={{
                        width: "6rem",
                      }}
                      onClick={() => {
                        fileref.current.value = null;
                        setRowData([]);
                        setRowsdataEditable([]);
                        setShowTable(false);
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      color="primary"
                      style={{ padding: "6px 10px", display: "inline-block" }}
                      onClick={downloadSampleFile}
                    >
                      Download Sample
                    </Button>
                  </>
                )}
              </CardBody>
            </Card>
            {/* Individual Camera Form */}
            {selectedOption === "Individual" && selectedFactory !== "" && (
              <Card>
                <CardBody>
                  <Form
                    onSubmit={handleSubmit}
                    className="theme-form"
                    style={{ padding: "10px 20px", marginTop: 15 }}
                  >
                    <Row className="" style={{ height: "100%", width: "100%" }}>
                      <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xx-6 col-right">
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
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val !== "") {
                                let owner_name = "";
                                const selected_area = factoryAreas?.find(
                                  (i) => i === e.target.value
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
                                  sub_area_id: "",
                                  area_owner: allData
                                    ?.find(
                                      (item) => item.name === selectedFactory
                                    ) // Find the first matching factory
                                    ?.areas?.find(
                                      (a) => a.area === e.target.value
                                    )?.areaOwner, // Find the first matching area
                                  camera_id: "",
                                });
                                setsubArea(
                                  allData
                                    ?.filter(
                                      (item) => item.name == selectedFactory
                                    )[0]
                                    ?.areas?.filter(
                                      (a) => a.area == e.target.value
                                    )
                                    ?.map((o) => o.sub_area)
                                    ?.flat()
                                );
                 
                              } else {
                                setSelectedArea({});
                                setSelectedSubArea({});
                                setFormData({
                                  ...formData,
                                  area: "",
                                  sub_area_id: "",
                                  area_owner: "",
                                  camera_id: "",
                                });
                              }
                            }}
                          >
                            <option value="">Select Area</option>
                            {factoryAreas?.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
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
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                sub_area_id: e.target.value,
                                camera_id: "",
                              });

                              if (e.target.value !== "") {
                                const selected_sub_area =
                                  subArea?.find(
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
                            }}
                          >
                            <option value="">Select Sub Area</option>
                            {subArea?.map((item, index) => (
                              <option key={index} value={item?.id}>
                                {item?.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
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
                      </Col>

                      <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xx-6 col-border">
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
                        {/* Password */}
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
                      </Col>
                      <Col className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xx-6 col-left">
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
                                checked={formData.modules.includes(
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
                              const IP_parts = formData?.camera_ip?.split(".");
                              const IP = IP_parts[IP_parts.length - 1];
                              const area = selectedArea?.area
                                ?.split("-")
                                .join("");

                              const sub_area_id = getSubAreaShortName(
                                selectedSubArea?.name
                              );
                              const id= `${
                                  selectedFactoryRec?.name
                                }-${selectedArea}-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`
                              
                              setFormData({
                                ...formData,
                                camera_id: `${
                                  selectedFactoryRec?.name 
                                }-${selectedArea}-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`,
                              });
                              setCameraIdError(false);
                            }}
                          >
                            Generate Camera ID
                          </Button>
                        </FormGroup>
                        <FormGroup>
                          <Button
                            color="success"
                            type="submit"
                            className="pull-right mt-3 mb-4"
                            disabled={disableSaveButton}
                          >
                            {disableSaveButton ? <Loader /> : "Save"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            )}
            {/* Table */}
          </>
        )}
        {showtable && (
          <>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody
                    style={{ padding: "10px 10px 0px 10px", height: 450 }}
                  >
                    <p className="font-danger" style={{ fontSize: 14 }}>
                      Note<sup>*</sup>: To generate <b>Camera ID</b>, please
                      select Factory, Area, Sub Area and Modules{" "}
                    </p>
                    <Table hover responsive>
                      <thead>
                        <tr
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            position: "sticky",
                            top: 0,
                            height: "30px",
                          }}
                        >
                          <th style={{ minWidth: "40px" }}>Sr.</th>

                          <th style={{ minWidth: "120px" }}>Camera IP</th>
                          <th style={{ minWidth: "150px" }}>Camera Name</th>
                          <th style={{ minWidth: "150px" }}>
                            Camera Position No
                          </th>
                          <th style={{ minWidth: "120px" }}>NVR No</th>
                          <th style={{ minWidth: "150px" }}>Camera Location</th>
                          <th style={{ minWidth: "120px" }}>Username</th>
                          <th style={{ minWidth: "120px" }}>Password</th>
                          <th style={{ minWidth: "120px" }}>Stream</th>
                          <th style={{ minWidth: "120px" }}>Port</th>
                          <th style={{ minWidth: "200px" }}>Sub Area</th>
                          <th style={{ minWidth: "150px" }}>Modules</th>
                          <th style={{ minWidth: "240px" }}>Camera ID</th>
                          <th style={{ minWidth: "200px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RowsDataEditable?.map((row, index) => (
                          <tr
                            key={row.id}
                            title={row.name}
                            className="align-middle text-center"
                            style={{ minHeight: "60px" }}
                          >
                            <td>{index + 1}</td>

                            <td>{row.camera_ip}</td>
                            <td>{row.camera_name}</td>
                            <td>{row.camera_position_no}</td>
                            <td>{row.nvr_no}</td>
                            <td>{row.camera_location}</td>
                            <td>{row.username}</td>
                            <td>{row.password}</td>
                            <td>{row.stream}</td>
                            <td>{row.port}</td>
                            <td>
                              <Input
                                className="form-control"
                                type="select"
                                name="sub_area_id"
                                id="sub_area_id"
                                required={true}
                                style={{
                                  fontSize: 14,
                                  color: "black",
                                  minWidth: "270px",
                                  textWrap: "wrap",
                                  margin: "10px 0px",
                                }}
                                value={
                                  row?.sub_area_id === undefined
                                    ? ""
                                    : row?.sub_area_id
                                }
                                onChange={(e) => {
                                  const selectedValue = e.target.value;
                                  const selected_sub_area = excelSubAreas?.find(
                                    (i) => i?.id === parseInt(selectedValue)
                                  );

                                  const updatedRowsData = [...RowsDataEditable];
                                  updatedRowsData[index].camera_id = "";
                                  updatedRowsData[index].sub_area_id =
                                    selected_sub_area
                                      ? selected_sub_area?.id
                                      : selectedValue;
                                  updatedRowsData[index].sub_area_name =
                                    selected_sub_area
                                      ? selected_sub_area?.name
                                      : "";
                                  setRowsdataEditable(updatedRowsData);
                                }}
                              >
                                <option value="">Select Sub Area</option>
                                {excelSubAreas?.map((item, index) => (
                                  <option key={index} value={item?.id}>
                                    {item?.name}
                                  </option>
                                ))}
                              </Input>
                            </td>
                            
                            <td>
                              <Typeahead
                                id="area-typeahead"
                                name="area"
                                className="custom-typeahead rounded-3"
                                labelKey="module_name"
                                multiple
                                options={models}
                                selected={row?.modules || []}
                                dropup={
                                  index >= RowsDataEditable?.length - 3
                                    ? true
                                    : false
                                }
                                onChange={(selected) => {
                                  const updatedRowsData = [...RowsDataEditable];
                                  updatedRowsData[index].modules = selected;
                                  setRowsdataEditable(updatedRowsData);
                                }}
                                placeholder="Select Modules"
                                style={{
                                  textTransform: "capitalize",
                                  maxWidth: "350px",
                                  minWidth: "300px",
                                  margin: "10px 10px",
                                }}
                              />
                            </td>
                            <td>
                              <Input
                                type="text"
                                id="camera_id"
                                name="camera_id"
                                required
                                placeholder=""
                                defaultValue={row.camera_id}
                                style={{
                                  minWidth: "240px",
                                  textAlign: "left",
                                  margin: "10px 0px",
                                  display: "inline-block",
                                }}
                                onChange={(e) => {
                                  const updatedRowsData = [...RowsDataEditable];
                                  updatedRowsData[index].cam_id =
                                    e.target.value;
                                  setRowsdataEditable(updatedRowsData);
                                }}
                              />
                            </td>

                            <td>
                              <Button
                                className="m-1"
                                color="primary"
                                style={{ padding: "5px 10px" }}
                                disabled={
                                  row?.camera_position_no === "" ||
                                  row?.nvr_no === "" ||
                                  selectedFactory === "" ||
                                  excelArea === "" ||
                                  row?.sub_area_id === undefined ||
                                  row?.sub_area_id === "" ||
                                  row?.modules === undefined ||
                                  row?.modules === "" ||
                                  row?.modules.length === 0
                                }
                                onClick={() => {
                                  const number =
                                    row?.camera_position_no?.trim();
                                  const nvr_no = row?.nvr_no;
                                  const IP_parts = row?.camera_ip?.split(".");
                                  const IP =
                                    IP_parts?.length > 0
                                      ? IP_parts[IP_parts.length - 1]
                                      : "";
                                  const sub_area_id = getSubAreaShortName(
                                    row?.sub_area_name
                                  );
                                  const cam_id = `${selectedFactoryRec?.name}-${
                                    excelAreaRec?.area?.split("-")
                                    .join("")
                                  }-${sub_area_id?.toUpperCase()}-${number}-${nvr_no}-${IP}`;
                                  const updatedRowsData = [...RowsDataEditable];
                                  updatedRowsData[index].camera_id = cam_id;
                                  setRowsdataEditable(updatedRowsData);
                                }}
                              >
                                Generate ID
                              </Button>
                              <Button
                                className="m-1"
                                color="danger"
                                style={{ padding: "5px 10px" }}
                                onClick={() => handleDeleteClick(row)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Button
              title="Save Cameras"
              color="primary"
              onClick={handleSubmitExcel}
              className="position-fixed rounded-circle shadow-lg "
              disabled={disableSaveButton}
              style={{
                width: "56px",
                height: "56px",
                bottom: 40,
                right: 50,
                padding: "5px 10px 0px 10px",
              }}
            >
            {disableSaveButton ? <Loader /> :  <Save size={25} />}
            </Button>
          </>
        )}
        <br />
      </Container>
      <ToastContainer />
    </>
  );
};

export default AddCamera;

