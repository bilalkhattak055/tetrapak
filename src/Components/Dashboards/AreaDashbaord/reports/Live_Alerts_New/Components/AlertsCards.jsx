import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../../Components/LiveAlertsCards/livealerts.css";
import { CiWarning } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import ImageZoom from '../../Components/LiveAlertsCards/ImageZoom';
import { Calendar, Camera, Clock, MapPin } from "react-feather";
import CameraImage from "../../../../../../assets/pictures/default_image.jpg"
import { H4 } from "../../../../../../AbstractElements";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import AreaService from "../../../../../../api/areaService";
import Loader1 from '../../../../../../CommonElements/Spinner/loader'
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { ClipLoader } from "react-spinners"; 
import { BiShareAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import { RiLineChartLine } from "react-icons/ri";
import { useWindowSize } from "../../../../../Screens/GlobalUser/LiveAnalytics/New componens/CustomHook/Check_Screen_Width";
import NewImageZoom from "../../Components/LiveAlertsCards/NewImageZoom";
export default function AlertsCards({setFiltereddData, summary, setsummary, settogglee,loader, togglee, setAcceptedArray, setRejectedArray, accept, setAccept, reject, setReject, acceptedArray, rejectedArray, setLoader, role, filtereddData, handleCardClick, showModal, setShowModal, imageData, total_pages, pageNo, setPageNo }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoadingStatus, setImageLoadingStatus] = useState({});

  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoadingStatus((prevState) => ({
        ...prevState,
        [id]: false
      }));
    }, 200)
  };  
  const itemsPerPage = 30; // Number of alerts to show per page
  // const total_pages = Math.ceil(filtereddData.length / itemsPerPage); 
  // Handle page change with bounds checking
  const handlePageChange = (pageNumber) => {

    if (pageNumber >= 1 && pageNumber <= total_pages) {
      setPageNo(pageNumber);
    }
  };

  

  // Pagination logic to display first, last, current, and some neighbors
  const getPaginationRange = () => {
    const pageNeighbors = 1; // Number of pages to show before and after the current page
    const totalPageNumbers = pageNeighbors * 2 + 3; // First, Last, Current + neighbors

    if (total_pages <= totalPageNumbers) {
      return Array.from({ length: total_pages }, (_, index) => index + 1); // All pages if fewer than totalPageNumbers
    }

    const startPage = Math.max(2, pageNo - pageNeighbors);
    const endPage = Math.min(total_pages - 1, pageNo + pageNeighbors);
    const paginationRange = [];

    paginationRange.push(1); // Always show the first page

    if (startPage > 2) {
      paginationRange.push("..."); // Ellipsis if the start page is greater than 2
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationRange.push(i);
    }

    if (endPage < total_pages - 1) {
      paginationRange.push("..."); // Ellipsis if end page is less than the total pages - 1
    }

    paginationRange.push(total_pages); // Always show the last page

    return paginationRange;
  };

  const [expandedViolation, setExpandedViolation] = useState(null);

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to handle the click event
  const handleToggleViolation = (index) => {
    // If the same violation is clicked again, collapse it, otherwise expand
    setExpandedViolation(expandedViolation === index ? null : index);
  };



  // const [active, setActive] = useState(second)
  const [loadingCardId, setLoadingCardId] = useState(null);


  async function sendApproval(payload){
  
    const res = await AreaService.getApprovalAlerts(payload)
    
    }
 
const handleAccept = async (id) => {
  const payload = {
    operation_safety_id: id.operation_safety_id,
    vio_severity: id.VioSeverity,
    module: id.module,
    violation: id.violation,
    violation_area: id.violationArea,
    camera_name: id.camera_name,
    date: id.date,
    time: id.time,
    shift: id.shift,
    image: id.image,
    camera_id: id.camera_id,
    result: true
  };
  sendApproval(payload).finally(() => {

    setLoadingCardId(null)
  }
);

setsummary((prevState) => ({
  count: prevState.count,
  acc: prevState.acc + 1,
  rej: prevState.rej,
  verified: prevState.verified + 1,
  pending: prevState.pending - 1
}));


  settogglee(!togglee)
 
  setToggle((prev) => {
    if (prev.includes(id.operation_safety_id)) {
      return prev.filter(item => item !== id.operation_safety_id);
    } else {
      return [...prev, id.operation_safety_id];
    }
  });

  
  setLoadingCardId(id.operation_safety_id);
  setAccept((prev)=>[...prev,id.operation_safety_id])

  // Update acceptedArray and remove from rejectedArray
  setAcceptedArray((prevAcceptedArray) => {
    const updatedAcceptedArray = [...prevAcceptedArray, id.operation_safety_id];
    // setVerified(updatedAcceptedArray.length + rejectedArray.length); 
    // setpending(count - (updatedAcceptedArray.length + rejectedArray.length)); 
    return updatedAcceptedArray;
  });
  
  setReject((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));
  setRejectedArray((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));


 
};

const handleReject = async (id) => {
  const payload = {
    operation_safety_id: id.operation_safety_id,
    vio_severity: id.VioSeverity,
    module: id.module,
    violation: id.violation,
    violation_area: id.violationArea,
    camera_name: id.camera_name,
    date: id.date,
    time: id.time,
    shift: id.shift,
    image: id.image,
    camera_id: id.camera_id,
    result: false
  };
  sendApproval(payload).finally(() => {
  
    setLoadingCardId(null)
  }
);
setsummary((prevState) => ({
  count:prevState.count,
  rej: prevState.rej + 1,
  acc: prevState.acc,
  verified: prevState.verified + 1,
  pending: prevState.pending - 1
}));
  settogglee(!togglee)

  setToggle((prev) => {
    if (prev.includes(id.operation_safety_id)) {
      return prev.filter(item => item !== id.operation_safety_id);
    } else {
      return [...prev, id.operation_safety_id];
    }
  });


  setLoadingCardId(id.operation_safety_id);
setReject((prev)=>[...prev,id.operation_safety_id])
  // Update rejectedArray and remove from acceptedArray
  setRejectedArray((prevRejectedArray) => {
    const updatedRejectedArray = [...prevRejectedArray, id.operation_safety_id];
    // setVerified(updatedRejectedArray.length + acceptedArray.length); // Calculate verified
    // setpending(count - (updatedRejectedArray.length + acceptedArray.length)); // Calculate pending
    return updatedRejectedArray;
  });

  setAccept((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));
  setAcceptedArray((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));
 

  
};








const [toggle, setToggle] = useState([])





 const width= useWindowSize(); 
  return (
    <>
      
        <>
          <Row>
            {filtereddData ?
              // ?.slice((pageNo - 1) * itemsPerPage, pageNo * itemsPerPage)
              filtereddData?.map((item, index) => {
                const violation = item?.violation === "Helmet" || item?.violation === "Vest" ? `No ${item?.violation}` : item?.violation
                return <Col sm='12' xl='6' xxxl='6' xxl='4'  >

                  <div
                    className="card position-relative"
                    style={{
                      backgroundColor: hoveredCard === index || acceptedArray?.includes(item.operation_safety_id) || rejectedArray?.includes(item.operation_safety_id)  ? "#dcdcdc" : "white",
                      color: hoveredCard === index ? "black" : "",
                      transition: "all 0.1s ease",
                      padding:'20px',
                      borderRadius:'24px'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                 
                    <Row>
                        <Col  className="mb-3"> 
                                {
                                !imageLoadingStatus[index] !== false && <img
                                    style={{ borderRadius: "24px", height: '280px', maxHeight: '300px' }}
                                    src={item?.image ? item?.image : CameraImage}
                                    className={`card-img-top ${imageLoadingStatus[index] === false ? 'visible' : ''}`}
                                    onClick={() => handleCardClick(item)}
                                    alt="Picture Not Available"
                                    onLoad={() => handleImageLoad(index)}
                                />
                                }
                                
                        
                        </Col>
                        <Col lg='12' >
                  
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                                            <h6 className="m-0 p-0 " style={{fontSize:'24px',fontWeight:'500px'}}>
                                            Module {item.module} 
                                            </h6>
                                            <div
                                            style={{
                                                backgroundColor: `${item.VioSeverity == "high"
                                                ? "#fee2e2"
                                                : item.VioSeverity == "medium"
                                                    ? "#FAE5C5"
                                                    : "#fff4db"
                                                }`,
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                color: "#906728",
                                            }}
                                            className="detailsfont rounded-3 d-flex align-items-center gap-2 px-2 py-1"
                                            > 
                                            {item.VioSeverity
                                                .split(' ')
                                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(' ')
                                            } Severity
                                            </div>
                                </div>
                                {/* <Row className="cardDetailsLiveAlert">
                                        <Col xs='5'>  
                              <div className="d-flex align-items-center">
                                 <CiWarning className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>violation</span>
                              </div>  
                                        </Col>
                                        <Col xs='7'>
                                        <p
                            style={{fontSize:'16px',fontWeight:'400'}}
                            className="m-0 p-0  "
                            onClick={() => handleToggleViolation(index)}
                            
                          >
                            {violation.length > 10 &&
                              expandedViolation !== index
                              ? `${capitalizeFirstLetter(
                                violation.substring(0, 20)
                              )} `
                              : capitalizeFirstLetter(violation)}
                            {violation.length > 10 && (
                              <span
                                style={{ cursor: "pointer", }}

                              >
                                {expandedViolation === index
                                  ? ""
                                  : "..."}
                              </span>
                            )}
                          </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center">
                                 <Camera className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Camera No.</span>
                              </div>   
                                        </Col>
                                        <Col xs='7'>
                                        <p className="m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.camera_id}
                                </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center">
                                 <RiLineChartLine className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Area Name.</span>
                              </div>
                                        </Col>
                                        <Col xs='7'>
                                        <p className="m-0" style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.area}
                                </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center" style={{width:'200px'}}>
                                 <RiLineChartLine className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Sub-Area Name.</span>
                              </div> 
                                        </Col>
                                        <Col xs='7'>
                                        <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.subarea?.replace(/\b\w/g, char => char.toUpperCase())}
                                </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center" style={{width:'200px'}}>
                                 <MdAccessTime className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Shift Pattern.</span>
                              </div> 
                                        </Col>
                                        <Col xs='7'>
                                        <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item.shift}
                                </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center"  >
                                 <MapPin className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Operational Area.</span>
                              </div>  
                                        </Col>
                                        <Col xs='7'>
                                        <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item.violationArea}
                                </p>
                                        </Col>
                                    </Row>
                                    <Row  className="cardDetailsLiveAlert">
                                        <Col xs='5'> 
                                        <div className="d-flex align-items-center" >
                                 <Calendar className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Date & Time.</span>
                              </div> 
                                        </Col>
                                        <Col xs='7'>
                                        <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.date}
                                </p>
                                        </Col>
                                    </Row> */}
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center">
                                 <CiWarning className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Violation</span>
                              </div> 
                              <p
                            style={{fontSize:'16px',fontWeight:'400'}}
                            className="m-0 p-0  "
                            onClick={() => handleToggleViolation(index)}
                            
                          >
                            {violation.length > 10 &&
                              expandedViolation !== index
                              ? `${capitalizeFirstLetter(
                                violation.substring(0, 20)
                              )} `
                              : capitalizeFirstLetter(violation)}
                            {violation.length > 10 && (
                              <span
                                style={{ cursor: "pointer", }}

                              >
                                {expandedViolation === index
                                  ? ""
                                  : "..."}
                              </span>
                            )}
                          </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center">
                                 <Camera className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Camera ID</span>
                              </div> 
                              <p className="m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.camera_id}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center">
                                 <RiLineChartLine className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Area</span>
                              </div> 
                              <p className="m-0" style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.area}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center" style={{width:'200px'}}>
                                 <RiLineChartLine className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Sub-Area</span>
                              </div> 
                              <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.subarea?.replace(/\b\w/g, char => char.toUpperCase())}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center" style={{width:'200px'}}>
                                 <MdAccessTime className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Shift</span>
                              </div> 
                              <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item.shift}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center"  >
                                 <MapPin className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Location</span>
                              </div> 
                              <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item.violationArea}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between cardDetailsLiveAlert">
                              <div className="d-flex align-items-center" >
                                 <Calendar className="me-2" style={{width:'16px',height:'16px',color:'#8C8C8C'}}/> <span style={{fontSize:'16px',fontWeight:'400'}}>Date & Time</span>
                              </div> 
                              <p className="ellipsis-textt m-0"  style={{fontSize:'16px',fontWeight:'400'}}   >
                              {item?.date}
                                </p>
                            </div>
                          
                       
                      {/* <div className="d-flex align-items-center justify-content-between my-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaRegUser />
                      <p
                        style={{ color: "#79818b" }}
                        className="m-0 p-0 detailsfont"
                      >
                        Owner Name
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#dbeafe",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#3655b9",
                      }}
                      className="rounded-5 d-flex align-items-center gap-2 px-2 py-1"
                    >
                      {item.AreaName ? item.AreaName : "AO-1"}
                    </div>
                  </div> */}
                        </Col>
                    </Row>
                    {imageLoadingStatus[index] !== false && (
                      <div className="">
                        <span className="loader-for-imagee"><Loader3 /></span>
                      </div>
                    )}
                    {/* {
                      !imageLoadingStatus[index] !== false && <img
                        style={{ borderRadius: "10px 10px", height: '250px', maxHeight: '255px' }}
                        src={item?.image ? item?.image : CameraImage}
                        className={`card-img-top ${imageLoadingStatus[index] === false ? 'visible' : ''}`}
                        onClick={() => handleCardClick(item)}
                        alt="Picture Not Available"
                        onLoad={() => handleImageLoad(index)}
                      />
                    } */}

                    {/* <div
                      className="d-flex align-items-center  gap-2 px-3 py-1 rounded-5"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "#dc2626",
                        color: "white",
                      }}
                    >
                      <CiCamera style={{ fontSize: "20px" }} />
                      <p className="m-0 p-0">{item.camera_name}</p>
                    </div> */}
                    {/* <div className="card-body py-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="m-0 p-0 detailsfont">
                          {item.module} Module
                        </h6>
                        <div
                          style={{
                            backgroundColor: `${item.VioSeverity == "high"
                              ? "#fee2e2"
                              : item.VioSeverity == "medium"
                                ? "#dbeafe"
                                : "#fff4db"
                              }`,
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#b35050",
                          }}
                          className="detailsfont rounded-3 d-flex align-items-center gap-2 px-2 py-1"
                        > 
                          {item.VioSeverity
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                          } Severity
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                        <div className="d-flex align-items-start gap-2 ">
                          <div className="mt-1 ">
                            <CiWarning size={14} style={{ color: "red" }} />
                          </div>
                          <p
                            style={{ color: "#79818b", cursor: 'pointer' }}
                            className="m-0 p-0 detailsfont "
                            onClick={() => handleToggleViolation(index)}
                          >
                            {violation.length > 10 &&
                              expandedViolation !== index
                              ? `${capitalizeFirstLetter(
                                violation.substring(0, 20)
                              )} `
                              : capitalizeFirstLetter(violation)}
                            {violation.length > 10 && (
                              <span
                                style={{ cursor: "pointer", }}

                              >
                                {expandedViolation === index
                                  ? ""
                                  : "..."}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <Camera size={14} />
                          <p
                            style={{ color: "#79818b" }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item?.camera_id}
                          </p>
                        </div>


                      </div>
                      <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <BiShareAlt size={14} />
                          <p
                            style={{ color: "#79818b" }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item?.area}
                          </p>
                        </div>


                      </div>
                    
                        <div style={{width:'170px'}} className="d-flex align-items-start justify-content-end  "> 
                          <p 
  style={{ color: "#79818b" }}
  className="m-0 p-0 detailsfont ellipsis-textt " 
> 
    {item?.subarea?.replace(/\b\w/g, char => char.toUpperCase())}
</p>

                        </div>


                     
                      </div>
                      <div className="d-flex align-items-center justify-content-between">

                        {item?.shift &&
                          <div className="d-flex align-items-center gap-2 ">
                            <MdAccessTime />
                            <p
                              style={{ color: "#79818b" }}
                              className="m-0 p-0 detailsfont"
                            >
                              {item.shift}
                            </p>
                          </div>}
                        <div className="d-flex align-items-center gap-2">
                          <MapPin size={14} />
                          <p
                            style={{ color: "#79818b" }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item.violationArea}
                          </p>
                        </div>
                      </div>

                  
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="d-flex align-items-center gap-2">

                          <Calendar size={14} />
                          <p
                            style={{ color: "#79818b", fontSize: 13 }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item?.date}
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Clock size={14} />
                          <p
                            style={{ color: "#79818b", fontSize: 13 }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item?.time}
                          </p>
                        </div>

                      </div>
                      {role === 'qa' && (
    <div className="d-flex justify-content-between mt-2"> 
      {(!reject?.includes(item.operation_safety_id) && !rejectedArray?.includes(item.operation_safety_id)) && (
        <>
        
        
        {
          loadingCardId === item.operation_safety_id  ? (
            <ClipLoader size={20} color="#1E67D6" />

          ) : (

            <button
            onClick={() => handleAccept(item)}
            className={`accept-button ${
              accept?.includes(item.operation_safety_id) ||
              acceptedArray?.includes(item.operation_safety_id)
                ? "accepted"
                : ""
            }`}
            disabled={
              accept?.includes(item.operation_safety_id) ||
              acceptedArray?.includes(item.operation_safety_id)
            }
          >
            {accept?.includes(item.operation_safety_id) ||
            acceptedArray?.includes(item.operation_safety_id) ? (
              "Accepted"
            ) : (
              <>
                <TiTick /> Accept
              </>
            )}
          </button>
          
          )
        }

        </>
      )}
       
      {(!accept?.includes(item.operation_safety_id) && !acceptedArray?.includes(item.operation_safety_id)) && (
        <>
        {
          loadingCardId === item.operation_safety_id ? (
            // <Loader1 />
            <ClipLoader size={20} color="#1E67D6" />
          )
          : (

            <button
            onClick={() => handleReject(item)}
            className={`reject-button ${
              reject?.includes(item.operation_safety_id) ||
              rejectedArray?.includes(item.operation_safety_id)
                ? "accepted"
                : ""
            }`}
            disabled={
              reject?.includes(item.operation_safety_id) ||
              rejectedArray?.includes(item.operation_safety_id)
            }
          >
            {reject?.includes(item.operation_safety_id) ||
            rejectedArray?.includes(item.operation_safety_id) ? (
              "Rejected"
            ) : (
              <>
                <RxCross1 /> Reject
              </>
            )}
          </button>
          
          )
        }
        </>
      )}
    </div>
  )}
                      <div>
                        <button
                          onClick={() => handleCardClick(item)}
                          style={{ width: "100%" }}
                          className="btn btn-primary mt-3"
                          data-toggle="modal" data-target="#myModal"
                        >
                          View Image
                        </button>
                      </div>
                    </div> */}
                  </div>
                </Col>
              })
              : <>
                {/* <div className="d-flex align-items-center justify-content-center">
                  <img style={{ height: '300px', width: '300px', mixBlendMode: 'multiply' }} src="https://img.freepik.com/premium-vector/search-found-no-data-found-data-empty_1249780-8.jpg" />
                  <H4>No Data Found</H4>
                </div> */}

              </>
            }
          </Row>
        </>
      {/* {showModal && (
        <SingleImage photo={imageData.photo} setIsOpen={setShowModal} imageData={imageData} />
      )} */}

      {
        showModal && (

          <NewImageZoom photo={imageData.photo} setIsOpen={setShowModal} imageData={imageData} setShowModal={setShowModal} />

        )
      }
      {!loader && !filtereddData?.length && <>
        <div className="d-flex align-items-center justify-content-center">
          <img style={{ height: '300px', width: '300px', mixBlendMode: 'multiply' }} src="https://img.freepik.com/premium-vector/search-found-no-data-found-data-empty_1249780-8.jpg" />
          <H4>No Data Found</H4>
        </div>

      </>}

      {/* Pagination with Back and Forward Buttons */}
      {filtereddData?.length && <div className=" pb-3 pagination-primary  d-flex flex-wrap justify-content-center ">
        {/* Back Button */}
        <ul
          style={{ borderRadius: "5px 0px 0px 5px" }}
          className="pagination pagin-border-primary"
        >
          <li
            className="page-item"
            disabled={pageNo === 1}
            onClick={() => handlePageChange(pageNo - 1)}
          >
            <a type="button" className="page-link">Previous</a>
          </li>
        </ul>

        {/* Page Numbers */}
        {getPaginationRange().map((pageNumber, index) => (
          <ul style={{ cursor: "pointer" }} className="pagination" key={index}>
            {pageNumber === "..." ? (
              <span className="page-item">...</span>
            ) : (
              <li
                className={`page-item  ${pageNo === pageNumber ? "active" : ""
                  }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                <a className=" page-link">{pageNumber}</a>
              </li>
            )}
          </ul>
        ))}

        {/* Forward Button */}
        <ul style={{ borderRadius: "0px 5px 5px 0px" }} className="pagination ">
          <li
            className="page-item"
            disabled={pageNo === total_pages}
            onClick={() => handlePageChange(pageNo + 1)}
          >
            <a type="button" className="page-link">Next</a>
          </li>
        </ul>
      </div>}
    </>
  );
}
 
