import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import KPICard from "./Components/KPICards/kpi_card";
import { CamersStatus } from "../../../../Data/staticData/data";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { Button, Input } from "reactstrap";
import GlobalMainGate from "./Components/MainGate/main_gate";
import CameraImage from "../.../../../../../assets/images/cameras/camera.jpeg";
import GateCard from "./Components/Gates/GateCard";
import { Link, useNavigate } from "react-router-dom";
import AddCameraModel from "./Components/add_camera_model";
import ContextData from "../../../../Hooks/useAuth";
import moment from "moment";
import SingleImage from "../../../../Gallery/zoomin/SingleImage";
const CameraConfigurationsScreen = () => {
  const { Cameras, setCameras } = ContextData();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [mainCard, setMainCard] = useState();
  const [activeRoom, setActiveRoom] = useState();
  const [filters, setFilters] = useState({
    area: "",
    status: "",
  });
  const [dropdownOptions, setDropdownOptions] = useState({
    area_list: [
      {
        id: 1,
        area: "SA-1",
        areaOwner: "Adil",
        sub_area: [
          { id: 1, name: "Palletizing 1,2 & 3" },
          { id: 2, name: "Palletizing office" },
          { id: 3, name: "Palletizing corridor" },
          { id: 4, name: "Waste window area" },
        ],
      },
      {
        id: 2,
        area: "SA-2",
        areaOwner: "Aftab",
        sub_area: [
          { id: 1, name: "Ammonia Compressor room" },
          { id: 2, name: "Catch pit area" },
          { id: 3, name: "Ref workshop" },
          { id: 4, name: "Ref Control Room" },
          { id: 5, name: "Ammonia CCR" },
          { id: 6, name: "Diffusion tank" },
        ],
      },
      {
        id: 3,
        area: "SA-3",
        areaOwner: "Arslan",
        sub_area: [
          { id: 1, name: "Admin Building Roof Top" },
          { id: 2, name: "AHU Room above Canteen" },
          { id: 3, name: "Main Asset scrap yard" },
          { id: 4, name: "Motor / panel scrap yard" },
          { id: 5, name: "R&D front side scrap yard" },
          { id: 6, name: "Contractor Workshops" },
          { id: 7, name: "DP store area" },
          { id: 8, name: "Engineering store" },
          { id: 9, name: "Safety office" },
          { id: 10, name: "Safety storage area" },
          { id: 11, name: "Engineering store placement yard" },
          { id: 12, name: "Fabrication workshop & surrounding area" },
          { id: 13, name: "Lathe Machine Workshop" },
          { id: 14, name: "MAMz workshop" },
        ],
      },
      {
        id: 4,
        area: "SA-4",
        areaOwner: "Ayesha Khaliq",
        sub_area: [
          { id: 1, name: "Cone Baking" },
          { id: 2, name: "Mixing" },
          { id: 3, name: "LI room" },
          { id: 4, name: "Aging room" },
          { id: 5, name: "Chocolate plant" },
          { id: 6, name: "Mixing pits" },
          { id: 7, name: "Oil/Glucose decanting area" },
          { id: 8, name: "Sauce plant" },
          { id: 9, name: "Chilled room" },
          { id: 10, name: "Day store area" },
          { id: 11, name: "Mixing control room" },
          { id: 12, name: "Tank form" },
        ],
      },
      {
        id: 5,
        area: "SA-5",
        areaOwner: "Dr. Amjad",
        sub_area: [{ id: 1, name: "Medical Roof Top" }],
      },
      {
        id: 6,
        area: "SA-6",
        areaOwner: "Meraj",
        sub_area: [
          { id: 1, name: "Roof Tops (Dry Store)" },
          { id: 2, name: "Roof Tops (Pulp Store)" },
          { id: 3, name: "Scrap Yard (Packmat area/ drums)" },
          { id: 4, name: "Dry Store 1, 2" },
          { id: 5, name: "Chemical store" },
          { id: 6, name: "Dry store driver room" },
          { id: 7, name: "Docking stations" },
          { id: 8, name: "Washrooms" },
          { id: 9, name: "Pulp Store" },
          { id: 10, name: "Hot room" },
          { id: 11, name: "Flavour room" },
          { id: 12, name: "Pallet washing room" },
        ],
      },
      {
        id: 7,
        area: "SA-7",
        areaOwner: "Moazzam Ali",
        sub_area: [
          { id: 1, name: "Machine Parts Room" },
          { id: 2, name: "Ultra Clean" },
          { id: 3, name: "Production floor" },
          { id: 4, name: "Production offices" },
          { id: 5, name: "TPM room" },
          { id: 6, name: "Day store" },
          { id: 7, name: "Parts room" },
          { id: 8, name: "Room 10" },
          { id: 9, name: "OPC chemical room" },
        ],
      },
      {
        id: 8,
        area: "SA-8",
        areaOwner: "Muhammad Shahbaz",
        sub_area: [
          { id: 1, name: "ETP" },
          { id: 2, name: "Boiler" },
          { id: 3, name: "Air compressor" },
          { id: 4, name: "Boiler control room" },
          { id: 5, name: "HFO tank" },
          { id: 6, name: "Water filter area" },
        ],
      },
      {
        id: 9,
        area: "SA-9",
        areaOwner: "Muhammad Wasi",
        sub_area: [
          { id: 1, name: "Roof Tops (Canteen)" },
          { id: 2, name: "Roof Tops (Security)" },
          { id: 3, name: "Time Office" },
          { id: 4, name: "ETMS" },
          { id: 5, name: "Medical OHC" },
          { id: 6, name: "Security Office" },
          { id: 7, name: "Parkings" },
          { id: 8, name: "Cycle Stand" },
          { id: 9, name: "Smoking Area" },
          {
            id: 10,
            name: "Area between Multan road gate to inner factory entrance gate",
          },
          { id: 11, name: "Admin Building" },
          { id: 12, name: "Reception" },
          { id: 13, name: "Canteen" },
          { id: 14, name: "Kitchen" },
          { id: 15, name: "Galleries" },
          { id: 16, name: "Washrooms" },
          { id: 17, name: "Locker area" },
          { id: 18, name: "Masjid" },
          { id: 19, name: "Changing rooms" },
          { id: 20, name: "Waiting area" },
          { id: 21, name: "Girls room" },
          { id: 22, name: "Exit routes" },
          { id: 23, name: "Brains lab" },
          { id: 24, name: "Recharge room" },
          { id: 25, name: "Humail's office" },
          { id: 26, name: "Meeting rooms" },
          { id: 27, name: "IT room" },
          { id: 28, name: "Outside Taris" },
        ],
      },
      {
        id: 10,
        area: "SA-10",
        areaOwner: "Nazir Sb",
        sub_area: [
          {
            id: 1,
            name: "Solar Area (Panels, Transformer rooms & entire area)",
          },
          { id: 2, name: "Diesel Storage area" },
          { id: 3, name: "Earth pit area" },
          { id: 4, name: "Electrical power house" },
          { id: 5, name: "LT room" },
          { id: 6, name: "HT room" },
          { id: 7, name: "Gen set area" },
          { id: 8, name: "Transformer room" },
          { id: 9, name: "Ammonia soft starter room" },
        ],
      },
      {
        id: 11,
        area: "SA-11",
        areaOwner: "Sadia",
        sub_area: [{ id: 1, name: "R&D Innovation Centre (Complete)" }],
      },
      {
        id: 12,
        area: "SA-12",
        areaOwner: "Shafiq",
        sub_area: [
          { id: 1, name: "QA" },
          { id: 2, name: "Pathogen Lab" },
          { id: 3, name: "QA storeroom" },
        ],
      },
      {
        id: 13,
        area: "SA-13",
        areaOwner: "Shahbaz",
        sub_area: [
          { id: 1, name: "LPG Area" },
          { id: 2, name: "Pump House" },
          { id: 3, name: "Water treatment plant & roof" },
          { id: 4, name: "Biomass Boiler (including fuel storage shed)" },
        ],
      },
      {
        id: 14,
        area: "SA-14",
        areaOwner: "Sheraz",
        sub_area: [
          { id: 1, name: "Roof Tops (Cold Stores)" },
          { id: 2, name: "Wooden Pallets Area" },
          { id: 3, name: "FG BOF" },
          { id: 4, name: "Cold Store 1&2" },
          { id: 5, name: "Cold store offices" },
          { id: 6, name: "Dispatch area" },
        ],
      },
      {
        id: 15,
        area: "SA-15",
        areaOwner: "Umair Pervaiz",
        sub_area: [
          { id: 1, name: "UE Projects" },
          { id: 2, name: "Projects Store" },
        ],
      },
    ],
  });
  const [allCameras, setAllCameras] = useState([]);
  const [filterCameras, setFilterCameras] = useState([]);

  useEffect(() => {
    setLoader(true);
    setAllCameras(Cameras);
    setFilterCameras(Cameras);
    setActiveRoom(Cameras[0]?.roomName);
    setMainCard(Cameras[0]);
    setLoader(false);
  }, []);

  const style = {
    width: "155px",
    height: "38px",
    fontSize: 13,
    margin: "5px 3px",
    display: "inline-block",
  };

  const handleFilterChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageData, setImageData] = useState({});

  const handleImage = (data) => {
    setImage(data?.image_url);
    setImageData({
      cameraName: data?.cameraName,
      date: data?.date,
      time: data?.time,
    });

    setIsOpen(true);
  };

  useEffect(() => {
    applyFilters(filters, filterCameras);
  }, [filters, filterCameras]);

  const applyFilters = (currentFilters, dataList) => {
    let filtered = dataList;

    // Apply area filter
    if (currentFilters.area) {
      filtered = filtered.filter((item) => item.area === currentFilters.area);
    }

    // Apply module filter
    if (currentFilters.status) {
      const val = currentFilters.status === "Active" ? true : false;
      filtered = filtered.filter((item) => item.active === val);
    }

    const updated_data = filtered?.map((i, index) => ({
      ...i,
      sr: index + 1,
    }));

    if (updated_data?.length > 0) {
      setActiveRoom(updated_data[0]?.roomName);
      setMainCard(updated_data[0]);
    } else {
      setActiveRoom("");
      setMainCard();
    }
    setAllCameras(updated_data);
  };

  const handleSaveCamera = (record) => {
    const new_item = {
      active: true,
      cameraIP: record?.camera_ip,
      area: record?.area,
      subArea: record?.sub_area,
      cameraId: record?.camera_id,
      cameraName: "Ezviz",
      date: moment().format("YY-MM-DD"),
      time: moment().format("hh:mm A"),
      module: "Helmet",
      gate: 1,
      roomName: "Ezviz",
      image_url: CameraImage,
    };
    const updated_list = [new_item, ...Cameras];
    setCameras(updated_list);
    setAllCameras(updated_list);
    setFilterCameras(updated_list);
  };

  return (
    <Fragment>
         {isOpen && <SingleImage photo={CameraImage} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <br />
      <Container fluid>
        {/* HEADER & FILTERS */}
        <Row>
          <Col className="col-12 col-sm-12 col-md-4 col-lg-12 col-xl-4 col-xxl-6">
            <h5>Camera Configurations</h5>
          </Col>
          <Col className="col-12 col-sm-12 col-md-8 col-lg-12 col-xl-8 col-xxl-6 text-end">
            <div className="filter-row">
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
                  // display:'inline-block'
                }}
                value={filters?.area}
                onChange={(e) => handleFilterChange(e, "area")}
              >
                <option value="">Select Area</option>
                {dropdownOptions?.area_list?.map((item, index) => (
                  <option key={index} value={item?.area}>
                    {item?.area}
                  </option>
                ))}
              </Input>
              <CommonFIlterButton
                data={CamersStatus}
                handleInputChange={handleFilterChange}
                style={style}
                selectedItem={filters?.status}
                firstOption={"Select Status"}
                inputChangeOption={"status"}
              />
              <AddCameraModel
                areas_list={dropdownOptions?.area_list}
                handleSave={handleSaveCamera}
              />
            </div>
          </Col>
        </Row>

        {/* KPIS */}
        <Row style={{ marginTop: 5 }}>
          <Col className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <KPICard
              data={{
                title: "Total Cameras",
                gros: 50,
                total: allCameras?.length || 0,
                showPercentage: false,
                marginRight: -5,
              }}
            />
          </Col>
          <Col className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <KPICard
              data={{
                title: "Live Cameras",
                gros: 39,
                total:
                  allCameras?.filter((i) => i?.active === true)?.length || 0,
                showPercentage: true,
                marginLeft: -5,
              }}
            />
          </Col>
        </Row>

        {/* CAMERA LIST AND VIEWER */}
        <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Cameras
        </p>

        <Row className=" flex-lg-row flex-xl-row">
          <Col
            style={{ scrollbarWidth: "2px !important",}}
            className="d-flex flex-row flex-md-row flex-lg-row flex-xl-column flex-sm-row gateCardd  py-0"
            xl="5"
            xs="12"
          >
            {allCameras
              ?.slice(0, allCameras?.length > 3 ? 3 : allCameras?.length)
              ?.map((gate, index) => (
                <GateCard
                  key={index}
                  gate={gate}
                  setMainCard={setMainCard}
                  mainCard={mainCard}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  roomName={gate?.roomName}
                />
              ))}
          </Col>
          <Col xl="7" xs="12">
            <GlobalMainGate mainCard={mainCard} handleImage={handleImage} />
          </Col>
        </Row>

        {/* <Row className="flex-lg-row flex-xl-row flex-column-reverse flex-md-column-reverse">
          <Col
            style={{
              scrollbarWidth: "2px !important",
              overflowY: "auto", // Make the column scrollable on smaller screens
              // maxHeight: "400px", // Control the height of the scroll area
            }}
            className="d-flex flex-column py-0"
            xl="5"
            xs="12"
          >
            {allCameras
              ?.slice(0, allCameras?.length > 3 ? 3 : allCameras?.length)
              ?.map((gate, index) => (
                <GateCard
                  key={index}
                  gate={gate}
                  setMainCard={setMainCard}
                  mainCard={mainCard}
                  activeRoom={activeRoom}
                  setActiveRoom={setActiveRoom}
                  roomName={gate?.roomName}
                />
              ))}
          </Col>
          <Col xl="7" xs="12">
            <GlobalMainGate mainCard={mainCard} handleImage={handleImage} />
          </Col>
        </Row> */}

        {/* SEE MORE BUTTON */}
        {allCameras?.length > 3 && (
          <Button
            color="primary"
            onClick={() => {
              navigate(
                `${process.env.PUBLIC_URL}/camera_configuration/cameras/global`
              );
            }}
            style={{
              fontSize: 15,
              fontWeight: 400,
              width: 200,
              margin: "20px 0px",
            }}
          >
            See More
          </Button>
        )}

        {/* NO CAMERAS FOUND  */}
        {allCameras?.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "10rem" }}>
            <h6>No Cameras Found</h6>
          </div>
        )}
        <br />
        <br />
      </Container>
    </Fragment>
  );
};

export default CameraConfigurationsScreen;
