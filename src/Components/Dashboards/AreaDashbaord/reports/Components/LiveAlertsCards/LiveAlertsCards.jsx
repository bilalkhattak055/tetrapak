import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./livealerts.css";
import { CiWarning } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import ImageZoom from './ImageZoom';
import { Calendar, Camera, Clock, Map, MapPin } from "react-feather";
import CameraImage from "../../../../../../assets/pictures/default_image.jpg"
import { H4 } from "../../../../../../AbstractElements";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import AreaService from "../../../../../../api/areaService";
import Loader1 from '../../../../../../CommonElements/Spinner/loader'
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { ClipLoader } from "react-spinners";
import './livealerts.css';
import { BiShareAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import { toast } from "react-toastify";
import liveAlertContext from '../../../../../../_helper/formData/LiveAlert/LiveAlert'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { errorToast } from "../../../../../../_helper/helper";

export default function LiveAlertsCards({setFiltereddData, verifiedmod, setverifiedmod
  , summary, setsummary, settogglee,loader, togglee, setAcceptedArray, setRejectedArray, accept, setAccept, reject, setReject, acceptedArray, rejectedArray, setLoader, role, filtereddData, handleCardClick, showModal, setShowModal, imageData, total_pages, pageNo, setPageNo }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoadingStatus, setImageLoadingStatus] = useState({});
  const { imageRef } = useContext(liveAlertContext); 
  console.log('here is mod', verifiedmod)
 const [moduleSelection, setModuleSelection] = useState({
    operation_safety_id: '',
    Helmet: "",
    Mask: "",
    Glasses: "",
    Boots: "",
    Gloves: "",
  });
  
  const handleModuleChange = (module, id) => {

    setModuleSelection((prev) => {
      const currentState = prev[module];
      let newState = "";
  
      if (currentState === "") {
        newState = "selected"; // First click: checked
      } else if (currentState === "selected") {
        newState = "cross"; // Second click: cross
      } else if (currentState === "cross") {
        newState = ""; // Third click: empty
      }
  
      return {
        ...prev,
        operation_safety_id: id,
        [module]: newState,
      };
    });
  };

  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoadingStatus((prevState) => ({
        ...prevState,
        [id]: false
      }));
    }, 200)
  }; 
  // const [pageNo, setPageNo] = useState(1); 
  const itemsPerPage = 30; // Number of alerts to show per page
  // const total_pages = Math.ceil(filtereddData.length / itemsPerPage); 
  // Handle page change with bounds checking
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= total_pages) {
      // Save the page number in localStorage
      localStorage.setItem('pageNo', pageNumber);

      // Update the page number in state
      setPageNo(pageNumber);
    }
  };
  
  // On page load (or component mount), retrieve the page number from localStorage
  useEffect(() => {
    const savedPageNo = localStorage.getItem('pageNo');
    if (savedPageNo) {
      setPageNo(Number(savedPageNo)); // Initialize pageNo from localStorage
    }
  }, []);
  

  

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


//   async function sendApproval(payload){
//     try {
//       const res = await AreaService.getApprovalAlerts(payload);

//       console.log(res,'alert response from api')
//     } catch (error) {
//       console.log(error)
//     }
    
//     // error show krwana hai
//     // sherry
// }
//
async function sendApproval(payload) {
  let res;
  try {
     res = await AreaService.getApprovalAlerts(payload);
    
    console.log(res, 'alert response from api');

    // Check if response status is 400 and throw an error
    if (res.status === 400) {
      throw new Error('API returned 400 error');
    }

    return res;  // Return response if successful
  } catch (error) {
    console.error('Error in sendApproval:', res);
    throw error;  // Re-throw the error to handle it in handleAccept
  }
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

  const updatedModuleSelection = {
    operation_safety_id: moduleSelection.operation_safety_id, // Keep the operation_safety_id as is
    ...Object.fromEntries(
      Object.entries(moduleSelection)
        .filter(([key, value]) => key === "operation_safety_id" || value === "selected" || value === "cross") // Filter for selected or cross states
        .map(([key, value]) => [
          key === "operation_safety_id" ? key : `${key.toLowerCase()}_accuracy_result`, // Rename keys for modules
          key === "operation_safety_id" ? value : (value === "selected" ? true : (value === "cross" ? false : value)), // Convert selected to true, cross to false, or keep value unchanged
        ])
    ),
  };
console.log('qa payload', updatedModuleSelection)
  try {
    // Call sendApproval and await the response
    await sendApproval(updatedModuleSelection).then((e)=>{
      setsummary((prevState) => ({
        count: prevState.count,
        acc: prevState.acc + 1,
        rej: prevState.rej,
        verified: prevState.verified + 1,
        pending: prevState.pending - 1
      }));
  
      settogglee(!togglee);
      
      setToggle((prev) => {
        if (prev.includes(id.operation_safety_id)) {
          return prev.filter(item => item !== id.operation_safety_id);
        } else {
          return [...prev, id.operation_safety_id];
        }
      });
  
      setAccept((prev) => [...prev, id.operation_safety_id]);
  
      // Update acceptedArray and remove from rejectedArray
      setAcceptedArray((prevAcceptedArray) => {
        const updatedAcceptedArray = [...prevAcceptedArray, id.operation_safety_id];
        return updatedAcceptedArray;
      });
  
      setReject((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));
      setRejectedArray((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));
      setverifiedmod((prev) => ({
        ...prev,
        [id.operation_safety_id]: Object.fromEntries(
          Object.entries(updatedModuleSelection)
            .filter(([key, value]) => key !== "operation_safety_id" && value === true) // Keep only selected fields
            .map(([key]) => [key.replace("_accuracy_result", "_accuracy"), true]) // Convert to _accuracy: true
        )
      }));
    
      setLoadingCardId(id.operation_safety_id);
    }).catch((e)=>{
      errorToast('Error')
    })

     

  }  catch (error) {
    console.error('API Error:', error?.response);
    if(error.response.data['committed result']==true){

      toast.error('This alert has already been accepted, please refresh');
    }
    else if(error.response.data['committed result']==false){
      toast.error('This alert has already been rejected, please refresh');
    }
  } finally {
    setLoadingCardId(null);  // Always reset loader after API call
  }
  setModuleSelection({
    operation_safety_id: '',
    Helmet: "",
    Mask: "",
    Glasses: "",
    Boots: "",
    Gloves: "",
  })
};
//


// const handleAccept = async (id) => {
//   const payload = {
//     operation_safety_id: id.operation_safety_id,
//     vio_severity: id.VioSeverity,
//     module: id.module,
//     violation: id.violation,
//     violation_area: id.violationArea,
//     camera_name: id.camera_name,
//     date: id.date,
//     time: id.time,
//     shift: id.shift,
//     image: id.image,
//     camera_id: id.camera_id,
//     result: true
//   };
//   sendApproval(payload).finally(() => {
//     setLoadingCardId(null)
//   }
// );

// setsummary((prevState) => ({
//   count: prevState.count,
//   acc: prevState.acc + 1,
//   rej: prevState.rej,
//   verified: prevState.verified + 1,
//   pending: prevState.pending - 1
// }));


//   settogglee(!togglee)
 
//   setToggle((prev) => {
//     if (prev.includes(id.operation_safety_id)) {
//       return prev.filter(item => item !== id.operation_safety_id);
//     } else {
//       return [...prev, id.operation_safety_id];
//     }
//   });

  
//   setLoadingCardId(id.operation_safety_id);
//   setAccept((prev)=>[...prev,id.operation_safety_id])

//   // Update acceptedArray and remove from rejectedArray
//   setAcceptedArray((prevAcceptedArray) => {
//     const updatedAcceptedArray = [...prevAcceptedArray, id.operation_safety_id];
//     // setVerified(updatedAcceptedArray.length + rejectedArray.length); 
//     // setpending(count - (updatedAcceptedArray.length + rejectedArray.length)); 
//     return updatedAcceptedArray;
//   });
  
//   setReject((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));
//   setRejectedArray((prevRejectedArray) => prevRejectedArray.filter((item) => item !== id.operation_safety_id));


 
// };

// const handleReject = async (id) => {
//   const payload = {
//     operation_safety_id: id.operation_safety_id,
//     vio_severity: id.VioSeverity,
//     module: id.module,
//     violation: id.violation,
//     violation_area: id.violationArea,
//     camera_name: id.camera_name,
//     date: id.date,
//     time: id.time,
//     shift: id.shift,
//     image: id.image,
//     camera_id: id.camera_id,
//     result: false
//   };
//   sendApproval(payload).finally(() => {
  
//     setLoadingCardId(null)
//   }
// );
// setsummary((prevState) => ({
//   count:prevState.count,
//   rej: prevState.rej + 1,
//   acc: prevState.acc,
//   verified: prevState.verified + 1,
//   pending: prevState.pending - 1
// }));
//   settogglee(!togglee)

//   setToggle((prev) => {
//     if (prev.includes(id.operation_safety_id)) {
//       return prev.filter(item => item !== id.operation_safety_id);
//     } else {
//       return [...prev, id.operation_safety_id];
//     }
//   });


//   setLoadingCardId(id.operation_safety_id);
// setReject((prev)=>[...prev,id.operation_safety_id])
//   // Update rejectedArray and remove from acceptedArray
//   setRejectedArray((prevRejectedArray) => {
//     const updatedRejectedArray = [...prevRejectedArray, id.operation_safety_id];
//     // setVerified(updatedRejectedArray.length + acceptedArray.length); // Calculate verified
//     // setpending(count - (updatedRejectedArray.length + acceptedArray.length)); // Calculate pending
//     return updatedRejectedArray;
//   });

//   setAccept((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));
//   setAcceptedArray((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));
 

  
// };



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
    result: false  // Rejection indicated by false result
  };

  setLoadingCardId(id.operation_safety_id);  // Start loader before API call

  const updatedModuleSelection = {
    operation_safety_id: moduleSelection.operation_safety_id, // Keep as is
    ...Object.fromEntries(
      Object.entries(moduleSelection)
        .filter(([key, value]) => key === "operation_safety_id" || value === "selected") // Keep only selected fields
        .map(([key, value]) => [
          key === "operation_safety_id" ? key : `${key.toLowerCase()}_accuracy_result`, // Rename keys
          key === "operation_safety_id" ? value : false, // Convert selected to true
        ])
    )
  };
  
  try {
    // Await the API response (can return 400 as normal response)
    const response = await sendApproval(updatedModuleSelection).then((e)=>{
      setverifiedmod((prev) => ({
        ...prev,
        [id.operation_safety_id]: Object.fromEntries(
          Object.entries(updatedModuleSelection)
            .filter(([key, value]) => key !== "operation_safety_id" && value === false) // Keep only selected fields
            .map(([key]) => [key.replace("_accuracy_result", "_accuracy"), false]) // Convert to _accuracy: true
        )
      }));
      setsummary((prevState) => ({
        count: prevState.count,
        rej: prevState.rej + 1,
        acc: prevState.acc,
        verified: prevState.verified + 1,
        pending: prevState.pending - 1
      }));
  
      settogglee(!togglee);
  
      setToggle((prev) => {
        if (prev.includes(id.operation_safety_id)) {
          return prev.filter(item => item !== id.operation_safety_id);
        } else {
          return [...prev, id.operation_safety_id];
        }
      });
  
      setReject((prev) => [...prev, id.operation_safety_id]);
  
      setRejectedArray((prevRejectedArray) => {
        const updatedRejectedArray = [...prevRejectedArray, id.operation_safety_id];
        return updatedRejectedArray;
      });
  
      setAccept((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));
    }).catch((e)=>{
      if (response && response.status === 400) {
        if (response.data && response.data.committed) {
          if (response.data.committed?.result) {
            toast.info('This alert has been accepted already. Please refresh the page.');
          } else {
            toast.warning('This alert has been rejected already. Please refresh the page.');
          }
        }
        // Stop execution for 400 error
        return;
      }
      else{
        errorToast('Error')
      }
    })
 
    
    // setAcceptedArray((prevAcceptedArray) => prevAcceptedArray.filter((item) => item !== id.operation_safety_id));

  } catch (error) {
    console.error('API Error:', error?.response);
    if(error.status==500){
      errorToast('Error')
    }
    if(error.response.data['committed result']==true){

      toast.error('This alert has already been accepted, please refresh');
    }
    else if(error.response.data['committed result']==false){
      toast.error('This alert has already been rejected, please refresh');
    }
  } finally {
    setLoadingCardId(null);  // Reset loader in all cases
  }
};





const [toggle, setToggle] = useState([])


 

  return (
    <>
      
        <>
          <Row className="">
            {filtereddData ?
              // ?.slice((pageNo - 1) * itemsPerPage, pageNo * itemsPerPage)
              filtereddData?.map((item, index) => {
                const violation = item?.violation === "Helmet" || item?.violation === "Vest" ? `No ${item?.violation}` : item?.violation
                return <Col className="" xxl="4" xl="6" lg="6" md="6">
                  <div
                    className="card position-relative"

                    style={{
                      backgroundColor: hoveredCard === index || acceptedArray?.includes(item.operation_safety_id) || rejectedArray?.includes(item.operation_safety_id)  ? "#dcdcdc" : "white",
                      color: hoveredCard === index ? "black" : "",
                      transition: "all 0.1s ease",
                      
                    }}
                    // onMouseEnter={() => setHoveredCard(index)}
                    // onMouseLeave={() => setHoveredCard(null)}
                  >
                    {imageLoadingStatus[index] !== false && (
                      <div className="">
                        <span className="loader-for-imagee"><Loader3 /></span>
                      </div>
                    )}
                    {
                      !imageLoadingStatus[index] !== false && <img
                      ref={(el) => (imageRef.current[index] = el)}
                        style={{ borderRadius: "10px 10px", height: '250px', maxHeight: '255px' }}
                        src={item?.image ? item?.image : CameraImage}
                        className={`card-img-top ${imageLoadingStatus[index] === false ? 'visible' : ''}`}
                        onClick={() => handleCardClick(item)}
                        alt="Picture Not Available"
                        onLoad={() => handleImageLoad(index)}
                      />
                    }

                    <div
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
                    </div>
                    <div className="card-body py-4">
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
                          {/* <CiWarning /> */}
                          {/* {item.VioSeverity
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                          } Severity */}
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
                          <Map size={14} />
                          <p
                            style={{ color: "#79818b" }}
                            className="m-0 p-0 detailsfont"
                          >
                            {item?.area}
                          </p>
                        </div>


                      </div>
                    
                        <div style={{width:'170px'}} className="d-flex align-items-start justify-content-end  ">
                          {/* <LuSettings2 style={{marginTop:'5px', fontSize:'14px', marginLeft:'3px'}} /> */}
                          <p 
                      style={{ color: "#79818b" }}
                      className="m-0 p-0 detailsfont ellipsis-textt "
                      // title={item?.subarea?.replace(/\b\w/g, char => char.toUpperCase())} // Show full text on hover
                    >
                      {/* {item?.subarea?.replace(/\b\w/g, char => char.toUpperCase())?.length > 16
                        ? `${item.subarea.replace(/\b\w/g, char => char.toUpperCase()).slice(0, 16)}...`
                        :  */}
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
                             {Array.isArray(item.shift) ? item.shift.join(' | ') :  item.shift }

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
                        <>
               
                        {/* <MdOutlineVerifiedUser className="mt-2" style={{fontSize:'35px', color:'#635470'}} />
  <div style={{ color: "#79818b", fontSize: 16 }} className="">
   
   {Object.keys(verifiedmod[item?.operation_safety_id])
      .filter((key) => key !== "verification") // Ignore 'verification' field
      .map((key) => key.replace("_accuracy", "")) // Remove "_accuracy" from field names
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1)) // Capitalize first letter
      .join(", ")}{" "}
    was verified
 
  </div> */}
 
 <div className="d-flex flex-wrap justify-content-between mt-3 gap-2">
 {["Helmet", "Mask", "Glasses", "Boots", "Gloves"].map((module) => {
    const accuracyKey = `${module.toLowerCase()}_accuracy`;
    const isDisabled = acceptedArray?.includes(item?.operation_safety_id) || rejectedArray?.includes(item?.operation_safety_id);
    const isChecked = moduleSelection[module] === "selected" && moduleSelection.operation_safety_id === item.operation_safety_id;
    const isCrossed = moduleSelection[module] === "cross" && moduleSelection.operation_safety_id === item.operation_safety_id;

    return (
      <div key={module} className="form-check d-flex align-items-center p-0 m-0 gap-2">
        <input
          type="checkbox"
          id={module}
          className="border"
          value={module}
          disabled={isDisabled}
          checked={isDisabled?item[accuracyKey] === true || item[accuracyKey] === false:isChecked || isCrossed} // Show checked or crossed state
          onChange={(e) => {
            if (!isDisabled) {
              handleModuleChange(module, item?.operation_safety_id);
            }
          }}
          style={{ accentColor: isCrossed ? 'red' : item[accuracyKey]===false ? 'red' : '#635470' }} // Change color for crossed state
        />
        <label style={{ color: "#79818b", fontSize: 13 }} htmlFor={module} className="form-check-label detailsfont p-0 m-0">
          {module}
        </label>
        {(isCrossed || item[accuracyKey]===false) && <span style={{ color: 'red', marginLeft: '5px' }}>✕</span>} {/* Display cross */}
      </div>
    );
  })}
</div>


                      
  <div className="d-flex justify-content-between mt-2">
    {/* Module Selection Checkboxes */}
   

    {/* Accept Button */}
    {(!reject?.includes(item.operation_safety_id) && !rejectedArray?.includes(item.operation_safety_id)) && (
      <>
        {loadingCardId === item.operation_safety_id ? (
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
              "Verified"
            ) : (
              <>
                <TiTick /> Verify
              </>
            )}
          </button>
        )}
      </>
    )}

    {/* Reject Button */}
    {/* {(!accept?.includes(item.operation_safety_id) && !acceptedArray?.includes(item.operation_safety_id)) && (
      <>
        {loadingCardId === item.operation_safety_id ? (
          <ClipLoader size={20} color="#1E67D6" />
        ) : (
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
        )}
      </>
    )} */}
  </div>
  </>
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
                    </div>
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

          <ImageZoom photo={imageData.photo} setIsOpen={setShowModal} imageData={imageData} setShowModal={setShowModal} />

        )
      }
      {!loader && !filtereddData?.length && <>
        <div className="d-flex align-items-center justify-content-center flex-column" style={{height:"70vh"}}>
          <img style={{ height: '300px', width: '300px', mixBlendMode: 'multiply' }} src="https://img.freepik.com/premium-vector/search-found-no-data-found-data-empty_1249780-8.jpg" />
          <H4>No Data Found</H4>
        </div>

      </>}

      {/* Pagination with Back and Forward Buttons */}
      
      {filtereddData?.length >0 &&  
       <div className=" pb-3 pagination-primary  d-flex flex-wrap justify-content-center ">
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
