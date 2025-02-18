import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import thumbnail from "./../../../../assets/video/thumbnail.png";
import "./liveCamera.css";
import MainGate from "./mainComponent";
import Gates from "./Gates";
import { H4 } from "../../../../AbstractElements";
import { FormGroup, Input } from "reactstrap";
import AreaService from "../../../../api/areaService";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import SingleImage from "../../../../Gallery/zoomin/SingleImage";

export default function LiveCamera({ type }) {
  // const cardsData = [
  //   {
  //     gate: 1,
  //     roomName: "Gate #1",
  //     module: "Helmet Module",
  //     factory: "RYK Factory",
  //     area: "Warehouse",
  //     video: "https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1",
  //     thumbnail: thumbnail,
  //   },
  // ];
  const dummyData = [
    // {
    //   camera_name: "Area1",
    //   image_url: "https://storage.googleapis.com/unilever-images/camera_frame/Area1_30-09-2024_05-30-27PM.jpg",
    //   module: "Helmet",
    //   gate: 1,
    //   roomName: "Area1",
    //   subArea: 'Sub area 01',
    //   active: false
    // },
    {
      active: true,
      cameraIP: "192.168.10.213",
      subArea: "Ammonia Compressor Room",
      cameraId: "ICF-SA2-ACR-1-05-213 ",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
    },
    {
      active: true,
      cameraIP: "192.168.10.220",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-2-5-220",
    },
    {
      active: false,
      cameraIP: "192.168.10.221",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-3-5-221",
    },
    {
      active: true,
      cameraIP: "192.168.10.222",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-4-5-222",
    },
    {
      active: false,
      cameraIP: "192.168.10.223",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-5-5-223",
    },
    {
      active: true,
      cameraIP: "192.168.10.225",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-6-5-225",
    },
    {
      active: true,
      cameraIP: "192.168.10.226",
      subArea: "Ammonia Compressor Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-ACR-7-5-226",
    },
    {
      active: false,
      cameraIP: "192.168.10.81",
      subArea: "Ref workshop",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-RW-1-2-81",
    },
    {
      active: false,
      cameraIP: "192.168.9.52",
      subArea: "Ref workshop",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-RW-2-8-52",
    },
    {
      active: true,
      cameraIP: "192.168.10.79",
      subArea: "Ref Control Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-RCR-1-2-79",
    },
    {
      active: true,
      cameraIP: "192.168.9.51",
      subArea: "Ref Control Room",
      cameraName: 'Ezviz',
      date: '24-10-10',
      time: '10:56 AM',
      cameraId: "ICF-SA2-RCR-2-8-51",
    },
  ];
  const [loader, setLoader] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);
  const [mainCard, setMainCard] = useState();
  const [activeRoom, setActiveRoom] = useState(); // Lifted state
  const [filteredData, setFilteredData] = useState(undefined);
  const [filters, setFilters] = useState({
    factory: "",
    area: "",
    module: "",
  });

  useEffect(() => {
    setLoader(true);
    let unsubscribe = fetchDashboard();
    return () => unsubscribe;
  }, []);

  const fetchDashboard = () => {
    const payload = {
      user_id: 9,
      date: "2024",
    };
    AreaService.getLiveCameras(payload)
      .then((res) => {
        const resp = res?.data?.data;
        console.log("response", resp);
        const updated = resp?.map((item, index) => {
          const data = dummyData[index];
          return {
            ...item,
            module: "Helmet",
            gate: index + 1,
            roomName: item?.camera_name,
            cameraIP: data.cameraIP,
            cameraID: data.cameraId,
            subArea: data.subArea,
            active: data.active,
            cameraName: data.cameraName,
            date: data.date,
            time: data.time
          };
        });

        console.log("updated..", updated);
        setCardsData(updated);
        setActiveRoom(updated[0]?.roomName);
        setMainCard(updated[0]);

        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  //filters
  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
    applyFilters({ ...filters, [field]: e.target.value });
  };

  // Function to apply all filters
  const applyFilters = (currentFilters) => {
    let filtered = cardsData;

    // Apply factory filter
    if (currentFilters.factory) {
      filtered = filtered.filter(
        (item) => item.factory === currentFilters.factory
      );
    }

    // Apply area filter
    if (currentFilters.area) {
      filtered = filtered.filter((item) => item.area === currentFilters.area);
    }

    // Apply module filter
    if (currentFilters.module) {
      filtered = filtered.filter(
        (item) => item.module === currentFilters.module
      );
    }

    setFilteredData(filtered);
  };

  const factories = cardsData && [
    ...new Set(cardsData.map((item) => item.factory)),
  ];
  const Area = cardsData && [...new Set(cardsData.map((ar) => ar.area))];
  const module = cardsData && [...new Set(cardsData.map((mod) => mod.module))];

  const mapCardData = filteredData ? filteredData : cardsData;

  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imageData, setImageData] = useState({})

  const handleImage = (data) => {
    setImage(data?.image_url);
    setImageData({
      cameraName: data?.cameraName,
      date: data?.date,
      time: data?.time
    })

    setIsOpen(true);
  };


  const style = {
    width: "158px",
    height: "48px",
  };
  return (
    <>
      {isOpen && <SingleImage setIsOpen={setIsOpen} photo={image} imageData={imageData} />}
      <Container className="dashboard-first-page" fluid={true}>
        {loader ? (
          <Loader1 />
        ) : (
          <Row>
            <Col lg="4" xs="12">
              <H4>Live Camera</H4>
            </Col>
            <Col
              style={{ marginTop: "10px" }}
              xl="12"
              lg="12"
              md="12"
              sm="12"
              xs="12"
            >
              <Row className=" flex-lg-row flex-xl-row">
                <Col
                  style={{ scrollbarWidth: "2px !important" }}
                  className=" d-flex flex-row flex-md-row flex-lg-row flex-xl-column flex-sm-row gateCardd  py-0"
                  xl="5"
                  xs="12"
                >
                  {cardsData?.map((gate) => (
                    <Gates
                      key={gate?.gate}
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
                  <MainGate mainCard={mainCard} handleImage={handleImage} />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
