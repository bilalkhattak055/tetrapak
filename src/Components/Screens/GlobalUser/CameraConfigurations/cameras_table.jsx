import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import Loader3 from "../../../../CommonElements/Spinner/loader3";
import CustomPagination from "./Components/pagination/pagination";
import CameraImage from "../.../../../../../assets//pictures/default_image.jpg";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { CamersStatus, Modules } from "../../../../Data/staticData/data";
import SingleImage from "../../../../Gallery/zoomin/SingleImage";
import KPICard from "./Components/KPICards/kpi_card";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AddCameraModel from "./Components/add_camera_model";
import CameraService from "../../../../api/cameraService";
import ErrorHeading from "../../../Common/Errors/errorHeading";
import { ChevronDown, Eye, Filter, MoreVertical } from "react-feather";
import PDFContext from '../../../../_helper/formData/LiveAnalytics/LiveAnalytics'
import {
  errorToast,
  infoToast,
  OptionToggle,
  showConfirmationAlert,
  successToast,
  truncateName,
} from "../../../../_helper/helper";
import moment from "moment";
import ImageZoom from "../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom";
import "./cameras.css";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomPaginationn from "./Components/pagination/Custom_Pagination";
import { replace } from "feather-icons";
import ConfirmationModals from "../../../Dashboards/ItDashboard/It Officer/Components/ConifrmationModal/Confirmation_Modal";
import NewPagination from "./Components/pagination/NewPagination";
import NewCommonFIlterButton from "../../../Common/commonFilterButton/NewCommonFIlterButton";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import CommonFilterButtonForModule from "../../../Common/commonFilterButton/CommonFilterButtonForModule";

const AllCamerasScreen = ({ area: areaD, ItDashboard }) => {
  const navigate = useNavigate();
  const [allCameras, setAllCameras] = useState([]);
  const [filterCameras, setFilterCameras] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState({});
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [expandedWebIndexes, setWebExpandedIndexes] = useState([]);
  // State to manage loading status for each image by its unique ID
  const [imageLoadingStatus, setImageLoadingStatus] = useState({});
  const [cameraStatusModal, setcameraStatusModal] = useState(false);
  const [totalRecords, setTotalRecords] = useState(undefined)
  const [liveCameras, setLiveCameras] = useState(undefined)
  const [inactiveCameras, setInactiveCount] = useState(undefined)
  const handleCameraStatus = () => setcameraStatusModal(!cameraStatusModal);
  const [modalDataForToggle, setmodalDataForToggle] = useState({
    name: "",
    status: false,
    id: "",
  });
  
  //filters states
  const [showFilters, setShowFilters] = useState(false)
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);

  const {totalcamerascontext,settotalcamerascontext, livecamerascontext, setlivecamerascontext, inactivecamerascontext, setinactivecamerascontext, setcamerasdatacontext, setcamerafilterscontext} = useContext(PDFContext)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterCardRef.current &&
        filterButton.current &&
        !filterCardRef.current.contains(event.target) &&
        !filterButton.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    }

    // Add event listener to detect clicks outside of the element
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  //filters state end

  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoadingStatus((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 200);
  }; 

  const initialRole = JSON.parse(localStorage.getItem("role"));

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });
  const [role, setRole] = useState(initialRole);
  const initialFilters = JSON.parse(localStorage.getItem('cameraFilters'))
  const [localFilters, setLocalFilters] = useState(initialFilters)
  const [filters, setFilters] = useState(localFilters ? localFilters :{
    area: [],
    status: "",
    factory: null,
    sub_area: [],
    module: "",
  });


  const [dropdownOptions, setDropdownOptions] = useState({
    factory: [],
    area_list: [],
    module_options: [],
    sub_area_list: [],
    camera_status: [
      { id: 1, title: "Active" },
      { id: 2, title: "InActive" },
    ],
  });
  const [factoryloader, setFactoryloader] = useState(true) 
   
  // Function to fetch companies
  const fetchCompanies = async () => {

    try {
      const res = await CameraService.fetchAllCompanies(); 
      const Fac = res?.data?.data 
      setDropdownOptions((prev) => ({
        ...prev,
        factory: Fac
      }))

      const userData = JSON.parse(localStorage.getItem('userData'))
      const factID = userData.factory.id 

      // const findFac = Fac?.find((f) => f.factory_id === factID)

      // setFilters((prev)=> ({
      //   ...prev,
      //   factory: findFac?.factory_id
      // }))
      setFactoryloader(false)

      // Handle the data (e.g., set it to state)
    } catch (err) {
      console.error("Error fetching companies:", err);
      setFactoryloader(false)
    }
  };

  // useEffect to call API when `ItDashboard` changes
  useEffect(() => {
    if (ItDashboard) {
      fetchCompanies();
    }
  }, [ItDashboard]);
  useEffect(() => {
    const newID = JSON.parse(localStorage.getItem('userData'))?.factory?.id;
    setLoading(true);
    // CameraService.getCameraDropdowns()
    fetchDropdownOptions()

  }, []);
  

  const fetchDropdownOptions = (newID) => {
    CameraService.modules(newID)
      .then((res) => {
        const response = res?.data?.data;
        console.log("API Response:", response); // Log the response
        if (response) {
          setDropdownOptions((prevOptions) => ({
            ...prevOptions,
            module_options: response || [], // Ensure this matches the API response structure
          }));
        }
      })
      .catch((e) => {
        console.error("Error fetching modules:", e);
      });
  };
  const [callApi, setCallApi] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllCameras();
    }, 240000); // 2 minutes interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchAllCameras();
  }, [callApi])

  const handleApply = () => {
    fetchAllCameras()
    if (areaD) {
      // fetchCameraCountArea()
    } else if (ItDashboard) {
      // fetchCameracount()
    } else {
      // fetchCameracount()
    }


    localStorage.setItem('cameraFilters', JSON.stringify(filters))
    localStorage.setItem('dropdownOptions', JSON.stringify(dropdownOptions))
  }
  const handleReset = () => {
    const updated= {
      area: [],
      status: "",
      factory: ItDashboard ? null : '',
      sub_area: [],
      module: "",
    }
    setFilters({
      area: [],
      status: "",
      factory: ItDashboard ? null : '',
      sub_area: [],
      module: "",
    })
    setCallApi(!callApi)


    localStorage.setItem('cameraFilters', JSON.stringify(updated))


  }

  const fetchAllCameras = (page = 1) => {
    setLoading(true);
    let payload;
    const UserData = JSON.parse(localStorage.getItem('userData'))
    if (areaD) {
      payload = {
        user_id: UserData?.id,
        status: filters.status.toLowerCase() || "",
        // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
        connectivity: '',
        areas: [UserData?.area_ids?.id],
        sub_areas: filters?.sub_area?.map((id) => id.id) || [],
        module: parseInt(filters.module.split('-')[1]) || "",
        factory_id: UserData?.factory?.id,
        pagination: {
          page_no: page,
          per_page: 20, // Adjust based on your UI
        },
      };
    } else if (ItDashboard) {
      payload = {
        user_id: UserData?.id,
        status: filters.status.toLowerCase() || "",
        // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
        connectivity: '',
        areas: filters?.area?.map((id) => id.area_id) || [],
        sub_areas: filters?.sub_area?.map((id) => id.id) || [],
        module: parseInt(filters.module.split('-')[1]) || "",
        factory_id: filters.factory ? parseInt(filters?.factory?.split('-')[1]) : null,
        pagination: {
          page_no: page,
          per_page: 20, // Adjust based on your UI
        },
      };
    } else {
      payload = {
        user_id: UserData?.id,
        status: filters.status.toLowerCase() || "",
        // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
        connectivity: '',
        areas: filters?.area?.map((id) => id.area_id) || [],
        sub_areas: filters?.sub_area?.map((id) => id.id) || [],
        module: parseInt(filters.module.split('-')[1]) || "",
        factory_id: UserData?.factory?.id,
        pagination: {
          page_no: page,
          per_page: 20, // Adjust based on your UI
        },
      };
    }
    setcamerafilterscontext(filters)
    CameraService.getAllLiveCameras_new(payload)
      .then((res) => {
        const response = res?.data?.data;
        const cameras = response?.cameras || [];
        const totalRecords = response?.total_records || 0;
        const totalPages = response?.total_pages || 1;

        console.log(payload,'current payload')
        console.log(response,'current response')
        const localCurrentPage = JSON.parse(localStorage.getItem('camerapage'))
        setAllCameras(cameras.reverse().map((item, index) => ({
          ...item,
          // gate: index +1,
          gate: localCurrentPage ? (localCurrentPage) * 20 + index + 1  : index+1 ,
          modules: item?.modules?.filter((m) => m.module_id !== null),
        })))
        setcamerasdatacontext(cameras.reverse().map((item, index) => ({
          ...item,
          // gate: index +1,
          gate: localCurrentPage ? (localCurrentPage) * 20 + index + 1  : index+1 ,
          modules: item?.modules?.filter((m) => m.module_id !== null),
        })))
        const totalCameras = response?.total_cameras
        const activeCameras = response?.active_cameras
        const inactive = response?.inactive_cameras
        // setTotalRecords(totalRecords)
        setTotalRecords(totalCameras)
        settotalcamerascontext(totalCameras)
       
        setLiveCameras(activeCameras)
        setlivecamerascontext(activeCameras)
        setInactiveCount(inactive)
        setinactivecamerascontext(inactive)
        setShowTable(cameras.length > 0);
        setShowError(cameras.length === 0)
        setLoading(false)

        // Handle pagination
        setPagination({
          currentPage: page,
          totalPages,
          totalRecords,
        });
      })
      .catch((error) => {
        setLoading(false);
        setShowError(true);
      });
  };

  useEffect(() => {
    if (areaD) {
      // fetchCameraCountArea()
    } else if (ItDashboard) {
      // fetchCameracount()
    } else {
      // fetchCameracount()
    }

  }, [areaD]);
  // useEffect(() => {

  //   if (ItDashboard) {
  //     fetchCameracount()
  //   }
  // }, [filters])
  const fetchCameracount = async (itD = false) => {
    const UserData = JSON.parse(localStorage.getItem('userData'));
    let paylaodId;
    if (areaD) {
      paylaodId = UserData?.area_ids?.id
    } else if (ItDashboard) {
      paylaodId = filters?.factory.split('-')[1]
    } else {
      paylaodId = UserData?.factory?.id
    }
    try {
      console.log(paylaodId,'curent payload')
      const res = await CameraService.getCameraCounts(paylaodId);
     
      if (res.status === 200) {
        const activeCameras = res?.data?.data?.active_cameras
        const totalCameras = res?.data?.data?.total_cameras 
        // setTotalRecords(totalCameras)
        // setLiveCameras(activeCameras)
        console.log('activeCamerastotalCameras', res)
      } else {
        errorToast(res.message)
      }
      console.log()
    } catch (err) {
      console.log('fetch camera count error: ', err)
    }
  }

  const fetchCameraCountArea = async () => {

    const UserData = JSON.parse(localStorage.getItem('userData'))
    let paylaodId = UserData?.area_ids?.id

    try {
      const res = await CameraService.getCameraCountsArea(paylaodId)
      if (res.status === 200) {

        const activeCameras = res?.data?.data?.active_cameras
        const totalCameras = res?.data?.data?.total_cameras
        console.log('activeCamerastotalCameras', activeCameras, totalCameras)
        // setTotalRecords(totalCameras)
        // setLiveCameras(activeCameras)
      } else {
        errorToast(res.message)
      }
      console.log()
    } catch (err) {
      console.log('fetch camera count error: ', err)
    }
  }
  function hasAnyValue(filters) {
    return Object.values(filters).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0; // Check if array is not empty
      } else {
        return Boolean(value); // Check if value is truthy for strings or other types
      }
    });
  }


  console.log("allCamerasss", allCameras);

  const toggleCameraID = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index)); // Collapse
    } else {
      setExpandedIndexes([...expandedIndexes, index]); // Expand
    }
  };

  const toggleSubArea = (index) => {
    if (expandedWebIndexes.includes(index)) {
      setWebExpandedIndexes(expandedWebIndexes.filter((i) => i !== index)); // Collapse
    } else {
      setWebExpandedIndexes([...expandedWebIndexes, index]); // Expand
    }
  };

  const RenderText = ({ title, value, gate }) => {
    return (
      <div className="camera_details ellipsis-text">
        <span className="f-w-500">{title}: </span>
        {title === "Modules" || title === "Module" ? (
          Array.isArray(value) ? ( 
            value.map((item, index) => (
              <span key={index}>
                {item} {index < value.length - 1 && " | "}
              </span>
            ))
          ) : (
            <span>No modules found</span> 
          )
        ) : (
          <span>{value}</span>
        )}
      </div>
    );
  };
  const RenderCameraID = ({ item, index }) => {
    const isExpanded = expandedIndexes.includes(index);
    const truncatedCameraID = item?.camera_id
      ?.split("-")
      ?.slice(0, 3)
      ?.join("-");

    return (
      <div className="camera_details ellipsis-text">
        <span className="f-w-500">Camera ID: </span>
        <span className="prospect-address">{item?.camera_id}</span>

        {/* <OptionToggle
          onClick={() => toggleCameraID(index)}
          isExpanded={isExpanded}
        /> */}
      </div>
    );
  };
  
//   const RenderSubArea = ({ item, index }) => {
//     const isExpanded = expandedWebIndexes.includes(index);
//     const truncatedCameraID = truncateName(item?.sub_area, 10);

//     return (
//       <div className="camera_details">
//         <span className="f-w-500">Sub Area: </span>
//         <span className="prospect-address"> 
//           {item?.sub_area?.charAt(0).toUpperCase() + item?.sub_area?.slice(1).toLowerCase()}
//           {/* {isExpanded ? item?.sub_area : truncatedCameraID} */}
//         </span>

//         {/* <OptionToggle
//           onClick={() => toggleSubArea(index)}
//           isExpanded={isExpanded}
//         /> */}
//       </div>
//     );
//   };
// }

  const MenuIconButton = ({
    handleEdit,
    darkColor,
    handleDelete,
    handlestatus,
  }) => {
    return (
      <span className="pull-right onhover-dropdown  p-0 text-right">
        <MoreVertical
          className={`font-${darkColor ? "dark" : "primary"}`}
          size={20}
        />

        <div
          className="onhover-show-div"
          style={{
            position: "absolute",
            top: 28,
            left: -70,
            width: "150px",
          }}
        >
          <ul
            style={{
              padding: "5px 10px",
              textAlign: "left",
              width: "140px",
            }}
          >
            <li
              style={{ margin: "5px 5px ", cursor: "pointer" }}
              onClick={handleEdit}
            >
              <p className="menu-title"> Edit</p>
            </li>

            <li
              style={{
                margin: "5px 5px ",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            >
              <p className="menu-title">Delete</p>
            </li>
            <li
              style={{
                margin: "5px 5px ",
                cursor: "pointer",
              }}
              onClick={handlestatus}
            >
              <p className="menu-title">Change status</p>
            </li>
          </ul>
        </div>
      </span>
    );
  };

  const handleRowEditClick = (camera_id) => {
    navigate(
      `${process.env.PUBLIC_URL}/update_camera/${JSON.parse(
        localStorage.getItem("role")
      )}`,
      {
        state: {
          camera_id: camera_id,
          models: dropdownOptions?.module_options,
        },
      }
    );
  };
  const handleDeleteClick = (camera_id) => {
    showConfirmationAlert("Are you sure you want to delete this Camera?").then(
      (result) => {
        if (result.value) {
          CameraService.deleteCamera(camera_id)
            .then((resp) => {
              if (resp?.data?.success === true) {
                const filtereddata = filterCameras?.filter(
                  (r) => r.camera_id !== camera_id
                );
                setAllCameras(filtereddata);
                setcamerasdatacontext(filtereddata)
                setFilterCameras(filtereddata);
                if (filtereddata.length === 0) {
                  setShowTable(false);
                }

                successToast(resp?.data?.message);
              } else {
                infoToast(resp?.data?.message);
                setShowTable(true);
              }
            })
            .catch((err) => {
              setShowTable(false);
              errorToast(err?.response?.data?.message);
            });
        }
      }
    );
  };
  const handleCameraToggle = (data) => {
    console.log(data, "data");
    if (data) {
      setmodalDataForToggle({
        name: data.area_owner,
        id: data.camera_id,
        status: data.active,
      });
      handleCameraStatus();
    }
  };

  const Buttonstyle = {
    minWidth: "132px",
    width: "160px",
    maxWidth: "160px",
    height: "35px",
    fontSize: 13,

  };
  const Items = (items) => {
    return (
      <Row>
        {items &&
          items?.map((item, index) => {
            return (
              <Col
                key={index}
                className="custom-col-card col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6"
              >
                <Card
                  className={
                    index % 2 === 0
                      ? "camera_item_card_odd"
                      : "camera_item_card_even"
                  }
                  key={index + 1}
                  style={{
                    marginBottom: 5,
                    backgroundColor: item?.active ? "white" : "#e2e2e2",
                  }}
                >
                  <CardBody className="camera_card_body">
                    <Row
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Media>
                        <div className="gateNumber mb-2">
                          Camera #{item?.gate}
                        </div>
                        <Media body className="action-options pull-right">
                          {JSON.parse(localStorage.getItem("role")) ===
                            "it-officer" && (
                              <MenuIconButton
                                handleEdit={() =>
                                  handleRowEditClick(item?.camera_id)
                                }
                                handleDelete={() =>
                                  handleDeleteClick(item?.camera_id)
                                }
                                handlestatus={() =>
                                  handleCameraToggle(item ? item : null)
                                }
                              />
                            )}
                          <Eye
                            size={18}
                            className="view_icon font-primary"
                            onClick={() => handleRowClick(item)}
                          />
                        </Media>
                      </Media>
                      <Col className="custom-col-9 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                        <RenderCameraID item={item} index={index} />

                        <RenderText
                          title={"Camera Name"}
                          value={item?.camera_name}
                          gate={item}
                        />
                        <RenderText
                          title={"Sub Area"}
                          value={item?.sub_area} 
                        />

                        {!areaD && (
                          <>
                            <RenderText
                              title={"Area"}
                              value={item?.area}
                              gate={item}
                            />
                            {/* <RenderText
                              title={"Owner"}
                              value={item?.area_owner}
                              gate={item}
                            /> */}
                          </>
                        )}
                       {/**  <RenderSubArea item={item} index={index} />*/}

                        <RenderText
                          title={
                            item?.modules?.length > 1 ? "Modules" : "Module"
                          }
                          value={item?.modules}
                          gate={item}
                        />
                        {item?.last_active && (
                          <RenderText
                            title={"Last Active"}
                            value={item?.last_active}
                            gate={item}
                          />
                        )}

                        <div className="camera_details">
                          <span className="f-w-500">Status: </span>
                          <span
                            className={`badge ${item?.active ? "bg-success" : "bg-danger"
                              }`}
                            style={{
                              fontWeight: 500,
                              fontSize: 13,
                            }}
                          >
                            {" "}
                            {item?.active
                              ? "Active"
                              : !item?.last_active
                                ? "Nill"
                                : "Inactive"}
                          </span>
                        </div>
                      </Col>
                      <Col className="custom_camera_card col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-end">

                        {imageLoadingStatus[index] !== false && (
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <span className="loader-for-image">
                              <Loader3 />
                            </span>
                          </div>
                        )}

                        <img
                          src={item?.image_url ? item?.image_url : CameraImage}
                          alt="Camera"
                          className={`camera_image ${imageLoadingStatus[index] === false ? "visible" : ""
                            }`}
                          style={{
                            color: "gray",
                          }}
                          onLoad={() => handleImageLoad(index)}
                          onClick={() => handleRowClick(item)}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    );
  };

  const handleFilterChange = (e, field) => {

    localStorage.setItem('camerapage', 0)
    setFilters((prevFilters) => {

      const newFilter = {
        ...prevFilters,
        [field]: e.target.value,
      };


      localStorage.setItem('camerafilter1', JSON.stringify(newFilter));


      return newFilter;
    });

  };
  const handleFilterChangeNew = (e, field) => {
    console.log('e.target.value', e.target.value)
    setFilters((prevFilters) => {
      const newFilter = {
        ...prevFilters,
        [field]: e.target.value,
      };
      return newFilter;
    });
    fetchDropdownOptions(e.target.value.split('-')[1])
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      area_list: prevOptions.area_list.filter((f) => f.factory_id !== e.target.value.split('-')[1])
    }));

  };

  // useEffect(() => {
  //   const payload = JSON.parse(localStorage.getItem('camerafilter1'))
  //   applyFilters(payload, filterCameras);
  // }, [filters, filterCameras]);

  const applyFilters = (currentFilters, dataList) => {
    let filtered = dataList;
    console.log('payload', currentFilters)
    console.log("currentFilters", filtered);

    // Apply area filter
    if (currentFilters?.area) {
      console.log('currentFilters.area', currentFilters.area)
      console.log('filteredfiltered', filtered)
      const selected_areas = currentFilters?.area?.map((i) => i.area_name);
      filtered = filtered.filter(
        (item) =>
          selected_areas.length === 0 || selected_areas?.includes(item.area)
      );
    }
    // Apply sub area filter
    if (currentFilters?.sub_area) {
      console.log('current filters', currentFilters)
      const selected_sub_areas = currentFilters?.sub_area?.map((i) =>
        i.name?.trim()?.toLowerCase()
      );
      filtered = filtered.filter((item) => {
        return (
          selected_sub_areas.length === 0 ||
          selected_sub_areas?.includes(item.sub_area?.trim()?.toLowerCase())
        );
      });
    }
    if (currentFilters?.module) {
      const selected_module = currentFilters.module.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        return item.modules.some(
          (module) =>
            module.module_name.trim().toLowerCase() === selected_module
        );
      });
    }

    // Apply module filter
    if (currentFilters?.status) {
      const val = currentFilters.status === "Active" ? true : false;
      filtered = filtered.filter((item) => item.active === val);
    }

    const updated_data = filtered?.map((i, index) => ({
      ...i,
      sr: index + 1,
    }));
    console.log(filtered, 'filteredd')
    setAllCameras(updated_data);
  };

  const style = {
    width: "160px",
    height: "38px",
    fontSize: 13,
    margin: "5px 3px",
    display: "inline-block",
  };

  const handleRowClick = (item) => {
    setImageData({
      photo: item.image_url,
      cameraName: item.camera_name,
      date: item?.last_active
        ? moment(item?.last_active).format("DD MMM, YYYY")
        : "",
      time: item?.last_active
        ? moment(item?.last_active).format("hh:mm A")
        : "",
    });
    setModalData(item);
    setShowModal(!showModal);
  };


  // Update areas and reset subareas based on selected areas
  const handleAreaChange = (selectedAreas) => {
    const selectedAreaIds = selectedAreas.map((area) => area.area_id);

    // Update filters
    setFilters((prevFilters) => ({
      ...prevFilters,
      area: selectedAreas, // Save the selected areas in the filters
      sub_area: !filters.area.length ? [] : prevFilters.sub_area, // Reset sub-areas when a new area is selected
    }));

    // Update sub-area dropdown options based on selected areas
    const selectedSubAreas = selectedAreas
      .map((area) => area.sub_areas || []) // Extract subareas
      .flat(); // Flatten into a single array
    setDropdownOptions((prevOptions) => ({
      ...prevOptions,
      sub_area_list: selectedSubAreas, // Update sub-area options
    }));
  };
  const handleFactoryChange = (selectedFactory) => {


    // Update filters
    setFilters((prevFilters) => ({
      ...prevFilters,
      // Reset sub-areas when a new area is selected
      factory: selectedFactory
    }));


  };

  // Update selected subareas
  const handleSubAreaChange = (selectedSubAreas) => {
    console.log('selectedSubAreasselectedSubAreas', selectedSubAreas)
    setFilters((prevFilters) => ({
      ...prevFilters,
      sub_area: selectedSubAreas,
    }));
  };

  console.log('fillterss', filters)



  const handleSaveCamera = (record) => {
    fetchAllCameras();
  };

  const handleNavigation = async () => {

    const queryString = new URLSearchParams({
      areas_list: JSON.stringify(dropdownOptions?.area_list), // Encode areas_list
      models: [], // Encode models 
      handleSave: handleSaveCamera, // Encode the function as a string (optional)
    }).toString();

    navigate(
      `${process.env.PUBLIC_URL}/addcameras/${JSON.parse(
        localStorage.getItem("role")
      )}?${queryString}`
    );
  };
  const handleToggle = () => {

    const cameraIndex = allCameras.findIndex(
      (item) => item.camera_id === modalDataForToggle.id
    );

    if (cameraIndex !== -1) {
      const newCameras = [...allCameras];
      newCameras[cameraIndex] = {
        ...newCameras[cameraIndex],
        active: !newCameras[cameraIndex].active,
      };
      setAllCameras(newCameras);
      setcamerasdatacontext(newCameras)
      handleCameraStatus();
    } else {
    }
  };



  const newOptionsForAreas = dropdownOptions?.area_list?.map((a) => a.area_name)
  console.log('dropdownOptions?.sub_area_list', dropdownOptions?.sub_area_list)

  console.log('dropdownOptions?.area_list', dropdownOptions?.area_list)

  return (
    <>
      <br />
      <Container fluid className="pb-1">
        <Row style={{ marginBottom: 0, alignItems: "flex-start" }}>
          <Col md='4'>
            <h5 className="d-inline-block">Cameras</h5>
          </Col>
          <Col md='8' className="d-flex  justify-content-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end ">

            <div className="filter-row position-relative">
              {JSON.parse(localStorage.getItem("role")) === "it-officer" && (
                <Button
                  className="rounded-2 d-inline-block"
                  color="primary"
                  style={{
                    height: "44px",
                    fontSize: '14px',
                    padding: "0px 10px",
                    width: "120px",
                    marginRight: '8px'
                  }}
                  onClick={handleNavigation}
                >
                  Add Cameras
                </Button>
              )}
              <div style={{backgroundColor:"#635470" }} type='button' className={`d-flex justify-content-center filter-btnn  ${showFilters && 'border_R'}`}
                ref={filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <p
                  className="m-0"
                  style={{ fontSize: "16px"}}
                >
                  Filters
                </p>
                <span className="d-flex"><Filter color="#fff" size={16} className="ms-2 " /></span>
              </div>

              <div className="w-100 d-flex justify-content-end position-relative">
                {showFilters && <div className={`d-flex align-items-center justify-content-center py-3 filter-card shadow-sm`}
                  ref={filterCardRef}
                >

                  <div className="d-flex align-items-center justify-content-center flex-wrap ">

                    {ItDashboard && (
                      <NewCommonFIlterButton
                        data={factoryloader ? ['Select factory'] : dropdownOptions?.factory?.map((f) => f.name + "-" + f.factory_id)}
                        handleInputChange={handleFilterChangeNew}
                        style={style}
                        selectedItem={filters.factory || ''}
                        firstOption={"Select Factory"}
                        inputChangeOption={"factory"}
                        className={""}
                      />
                    )}
                    {/**
                    {!areaD && (
                      <div style={{ display: "inline-block", position: "relative" }}>
                        <ChevronDown
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "11px",
                            zIndex: "2",
                          }}
                          size={18}
                          color="#383e44"
                        />
                        <Typeahead
                          id="area-typeahead"
                          name="area"
                          className="custom-typeahead rounded-3"
                          labelKey={(option) =>
                            `${option.area_name} ${option.area_owner ? option.area_owner : ""}`.trim()
                          }
                          multiple
                          options={dropdownOptions?.area_list}
                          selected={filters?.area}
                          onChange={handleAreaChange}
                          placeholder="Select Areas"
                          renderMenuItemChildren={(option) => (
                            <div
                              style={{
                                color: option.active ? "inherit" : "#a9a9a9", // Dimmed color for inactive areas
                                opacity: option.active ? 1 : 0.6, // Slightly transparent for inactive areas
                                pointerEvents: option.active ? "auto" : "none", // Disable click for inactive options
                                cursor: option.active ? "pointer" : "not-allowed",
                              }}
                            >
                              <span>{option.area_name}</span>
                              {option.area_owner && <small> {option.area_owner}</small>}
                            </div>
                          )}
                          style={{
                            display: "inline-block",
                            textTransform: "capitalize",
                            maxWidth: "160px",



                          }}
                          inputProps={{
                            style: {

                              padding: "10px", // Adjust padding for better alignment
                            },
                          }}
                        />
                      </div>
                    )}
                    */}
                    
                    {filters?.area.length ? <div style={{ display: "inline-block", position: "relative", width: '150x' }}>
                      <ChevronDown
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "11px",
                          zIndex: "2",
                        }}
                        size={18}
                        color="#383e44"
                      />

                      <Typeahead
                        id="sub-area-typeahead"
                        name="sub-area"
                        className="custom-typeahead rounded-3"
                        labelKey="name" // Ensure the subarea object has a "name" field
                        multiple
                        options={dropdownOptions?.sub_area_list || []}
                        selected={filters?.sub_area || []}
                        onChange={handleSubAreaChange}
                        placeholder="Select Sub Areas"
                        style={{
                          display: "inline-block",
                          textTransform: "capitalize",
                          maxWidth: "160px",
                          fontSize: "11px",
                        }}
                      />
                    </div> : null}
                  
                    
                    {areaD ? <div style={{ display: "inline-block", position: "relative", width: '150x' }}>
                      <ChevronDown
                        style={{
                          position: "absolute",
                          top: "15px",
                          right: "11px",
                          zIndex: "2",
                        }}
                        size={18}
                        color="#383e44"
                      />
                      
                      <Typeahead
                        id="sub-area-typeahead"
                        name="sub-area"
                        className="custom-typeahead rounded-3"
                        labelKey="name" // Ensure the subarea object has a "name" field
                        multiple
                        options={dropdownOptions?.sub_area_list || []}
                        selected={filters?.sub_area || []}
                        onChange={handleSubAreaChange}
                        placeholder="Select Sub Areas"
                        style={{
                          display: "inline-block",
                          textTransform: "capitalize",
                          maxWidth: "160px",
                          fontSize: "11px",
                        }}
                      />
                    </div> : null}
                    

                    <CommonFIlterButton
                      data={CamersStatus}
                      handleInputChange={handleFilterChange}
                      style={style}
                      selectedItem={filters.status}
                      firstOption={"Select Status"}
                      inputChangeOption={"status"}
                      className={""}
                    />
                    {/**
                    <CommonFIlterButton
                      data={Modules}
                      handleInputChange={handleFilterChange}
                      style={style}
                      selectedItem={filters.module}
                      firstOption={"Select Module"}
                      inputChangeOption={"module"}
                      className={""}
                    />
                    */}
                    {/** 
                    <CommonFilterButtonForModule
                      data={dropdownOptions?.module_options?.map((m) => m.module_name + '-' + m.module_id)}
                      handleInputChange={handleFilterChange}
                      style={style}
                      selectedItem={filters.module}
                      firstOption={"Select Module"}
                      inputChangeOption={"module"}
                      className={""}
                    />
                    */}


                
                      <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
                        <button

                          style={Buttonstyle}
                          className={` p-0 mb-2 rounded-3 btn-success hover border-0 shadow-sm d-flex align-items-center justify-content-evenly`}
                          onClick={handleApply}
                        >
                          <IoCheckmarkOutline
                            style={{
                              color: '#fff',
                              fontSize: "20px",
                              transform: "rotate(20deg)",
                            }}
                          />
                          <p style={{ color: '#fff' }} className="m-0 p-0 "> Accept</p>
                        </button>
                        <button
                          style={Buttonstyle}
                          className={`m-0 p-0 rounded-3 border-0 btn-danger shadow-sm d-flex align-items-center justify-content-evenly`}
                          onClick={handleReset}
                          color="danger"

                        >
                          <RxReset
                            style={{
                              color: '#fff',
                              fontSize: "20px",
                              // transform: "rotate(20deg)",
                            }}
                          />
                          <p className="m-0 p-0 text-light"> Reset</p>
                        </button>

                        {/* <Button
                        style={style}
                        className="rounded-3"
                        onClick={Reset}
                        color="primary"
                      >
                        <RxReset />
                      </Button> */}

                      </div>
               
                  </div>
                </div>
                }
              </div>
            </div>
          </Col>
        </Row>

        {loading ? (
          <center
            style={{ textAlign: "center", marginTop: "", marginBottom: 40 }}
          >
            <Loader1 />
          </center>
        ) : showTable ? (
          <>
            <Row style={{ marginTop: 5 }}>
              <Col
                style={{ height: "137px" }}
                className="col-12 col-lg-6 col-xl-6 col-xxl-6"
              > 
              {console.log(totalRecords,'for checkinggg')}
                <KPICard
                  data={{
                    title: "Total Cameras",
                    gros: 50,
                    total: totalRecords || 0,
                    showPercentage: false,
                  }}
                  mainClass="kpi_card_total"
                />
               


              </Col>
              <Col
                style={{ height: "137px" }}
                className="col-12 col-lg-6 col-xl-6 col-xxl-6"
              >

                <KPICard
                  data={{
                    title: "Live Cameras",
                    titleInactive: inactiveCameras && "| Inactive Cameras",
                    InActiveCount: inactiveCameras,
                    // gros:
                    //   allCameras?.length > 0
                    //     ? Math.round(
                    //       (allCameras?.filter((i) => i?.active === true)
                    //         ?.length /
                    //         allCameras?.length) *
                    //       100
                    //     ).toFixed(0)
                    //     : 0,
                    gros:
                      Math.round(
                        (liveCameras /
                          totalRecords) *
                        100
                      ).toFixed(0)
                    ,
                    // total:
                    //   allCameras?.filter((i) => i?.active === true)?.length ||
                    //   0,
                    showPercentage: true,

                    total: liveCameras || 0,

                  }}
                  mainClass="kpi_card_live"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20, marginTop: 5 }}>
              <Col>
                {/* <CustomPagination
                  data={allCameras}
                  itemsPerPage={10}
                  renderItems={Items}
                /> */}
                {/* <NewPagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => fetchAllCameras(page)}
                /> */}
                
                    <NewPagination
                  data={allCameras} // Current page's data
                  totalRecords={pagination.totalRecords} // Total records from API
                  itemsPerPage={10}
                  currentPage={pagination.currentPage - 1} // 0-based index for `forcePage`
                  totalPages={pagination.totalPages} // Total pages from API
                  onPageChange={(page) => fetchAllCameras(page)} // Fetch data for the selected page
                  renderItems={Items}
                /> 
                
               
              </Col>
              <ConfirmationModals
                toggle={handleCameraStatus}
                modal={cameraStatusModal}
                actionbtn={"Change status"}
                body={"Are you sure you want to change this camera status ? "}
                user={modalDataForToggle}
                header={"Toggle Status"}
                handleConfirm={handleToggle}
                type={"status change"}
              />

              {/* custom pagination according to 20 objects */}
              {/* <CustomPaginationn/> */}
            </Row>
          </>
        ) : (
          showError && <ErrorHeading />
        )}
        {showModal && (
          <ImageZoom
            photo={modalData?.image_url ? modalData?.image_url : CameraImage}
            setIsOpen={setShowModal}
            setShowModal={setShowModal}
            imageData={imageData}
            cameraTable={true}
          />
        )}
      </Container>
    </>
  );
};

export default AllCamerasScreen;





































































// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";
// import Loader1 from "../../../../CommonElements/Spinner/loader";
// import Loader3 from "../../../../CommonElements/Spinner/loader3";
// import CustomPagination from "./Components/pagination/pagination";
// import CameraImage from "../.../../../../../assets//pictures/default_image.jpg";
// import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
// import { CamersStatus, Modules } from "../../../../Data/staticData/data";
// import SingleImage from "../../../../Gallery/zoomin/SingleImage";
// import KPICard from "./Components/KPICards/kpi_card";
// import { Typeahead } from "react-bootstrap-typeahead";
// import "react-bootstrap-typeahead/css/Typeahead.css";
// import AddCameraModel from "./Components/add_camera_model";
// import CameraService from "../../../../api/cameraService";
// import ErrorHeading from "../../../Common/Errors/errorHeading";
// import { ChevronDown, Eye, Filter, MoreVertical } from "react-feather";
// import {
//   errorToast,
//   infoToast,
//   OptionToggle,
//   showConfirmationAlert,
//   successToast,
//   truncateName,
// } from "../../../../_helper/helper";
// import moment from "moment";
// import ImageZoom from "../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom";
// import "./cameras.css";
// import { Navigate, useNavigate } from "react-router";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import CustomPaginationn from "./Components/pagination/Custom_Pagination";
// import { replace } from "feather-icons";
// import ConfirmationModals from "../../../Dashboards/ItDashboard/It Officer/Components/ConifrmationModal/Confirmation_Modal";
// import NewPagination from "./Components/pagination/NewPagination";
// import NewCommonFIlterButton from "../../../Common/commonFilterButton/NewCommonFIlterButton";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import { RxReset } from "react-icons/rx";
// import CommonFilterButtonForModule from "../../../Common/commonFilterButton/CommonFilterButtonForModule";

// const AllCamerasScreen = ({ area: areaD, ItDashboard }) => {
//   const navigate = useNavigate();
//   const [allCameras, setAllCameras] = useState([]);
//   const [filterCameras, setFilterCameras] = useState([]);
//   const [allModules, setAllModules] = useState();
//   const [showTable, setShowTable] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [modalData, setModalData] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [imageData, setImageData] = useState({});
//   const [expandedIndexes, setExpandedIndexes] = useState([]);
//   const [expandedWebIndexes, setWebExpandedIndexes] = useState([]);
//   // State to manage loading status for each image by its unique ID
//   const [imageLoadingStatus, setImageLoadingStatus] = useState({});
//   const [cameraStatusModal, setcameraStatusModal] = useState(false);
//   const [totalRecords, setTotalRecords] = useState(undefined)
//   const [liveCameras, setLiveCameras] = useState(undefined)
//   const handleCameraStatus = () => setcameraStatusModal(!cameraStatusModal);
//   const [modalDataForToggle, setmodalDataForToggle] = useState({
//     name: "",
//     status: false,
//     id: "",
//   });
//   //filters states
//   const [showFilters, setShowFilters] = useState(false)
//   const filterCardRef = useRef(null);
//   const filterButton = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         filterCardRef.current &&
//         filterButton.current &&
//         !filterCardRef.current.contains(event.target) &&
//         !filterButton.current.contains(event.target)
//       ) {
//         setShowFilters(false);
//       }
//     }

//     // Add event listener to detect clicks outside of the element
//     document.addEventListener("mousedown", handleClickOutside);

//     // Cleanup listener on component unmount
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showFilters]);

//   //filters state end

//   const handleImageLoad = (id) => {
//     setTimeout(() => {
//       setImageLoadingStatus((prevState) => ({
//         ...prevState,
//         [id]: false,
//       }));
//     }, 200);
//   };
//   console.log("isImageLoading", imageLoadingStatus);

//   const initialRole = JSON.parse(localStorage.getItem("role"));

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalRecords: 0,
//   });
//   const [role, setRole] = useState(initialRole);
//   const [filters, setFilters] = useState({
//     area: [],
//     status: "",
//     factory: ItDashboard ? `f-${JSON.parse(localStorage.getItem('userData'))?.factory?.id}` : '',
//     sub_area: [],
//     module: "",
//   });


//   useEffect(() => {
//     const localFilters = JSON.parse(localStorage.getItem('cameraFilters'))
//     if (localFilters) {
//       setFilters(localFilters)
//     }
//   }, [])


//   const [dropdownOptions, setDropdownOptions] = useState({
//     factory: [],
//     area_list: [],
//     module_options: [],
//     sub_area_list: [],
//     camera_status: [
//       { id: 1, title: "Active" },
//       { id: 2, title: "InActive" },
//     ],
//   });
//   const [factoryloader, setFactoryloader] = useState(true)
//   console.log('dropdownOptions33', dropdownOptions)

//   // Function to fetch companies
//   const fetchCompanies = async () => {

//     try {
//       const res = await CameraService.fetchAllCompanies();
//       console.log('resgkjksljg',)
//       const Fac = res?.data?.data
//       console.log('FacIDs', Fac)
//       setDropdownOptions((prev) => ({
//         ...prev,
//         factory: Fac
//       }))


//       const userData = JSON.parse(localStorage.getItem('userData'))
//       const factID = userData.factory.id
//       console.log('FacFacFacFac', Fac)

//       // const findFac = Fac?.find((f) => f.factory_id === factID)

//       // setFilters((prev)=> ({
//       //   ...prev,
//       //   factory: findFac?.factory_id
//       // }))
//       setFactoryloader(false)

//       // Handle the data (e.g., set it to state)
//     } catch (err) {
//       console.error("Error fetching companies:", err);
//       setFactoryloader(false)
//     }
//   };

//   // useEffect to call API when `ItDashboard` changes
//   useEffect(() => {
//     if (ItDashboard) {
//       fetchCompanies();
//     }
//   }, [ItDashboard]);
//   useEffect(() => {
//     const newID = JSON.parse(localStorage.getItem('userData'))?.factory?.id;
//     setLoading(true);
//     // CameraService.getCameraDropdowns()
//     fetchDropdownOptions(newID)

//   }, []);

//   const fetchDropdownOptions = (newID) => {
//     const localFilters = JSON.parse(localStorage.getItem('cameraFilters'))
//     console.log("localFilters_", localFilters)
//     console.log("localFilters_bilal")
//     CameraService.getCameraDropdowns(newID)
//       .then((res) => {
//         const response = res?.data?.data;
//         console.log("bbb", response);
//         if (areaD) {
//           const Area_user =
//             JSON.parse(localStorage.getItem("userData"))?.area_ids?.name || "";


//           // console.log('Area_user', Area_user)
//           const findArea = response?.area_list?.find(
//             (area) => area?.area_name == Area_user
//           );


//           console.log("findAreafindArea", findArea)




//           setDropdownOptions((prevOptions) =>

//           ({
//             ...prevOptions,
//             module_options: response?.modules || [],
//             sub_area_list: findArea?.sub_areas || [],
//             area_list: response?.area_list?.sort((a, b) => {
//               // Extract the number part from the area name
//               const numA = parseInt(a.area_name.match(/\d+/)?.[0] || 0, 10);
//               const numB = parseInt(b.area_name.match(/\d+/)?.[0] || 0, 10);
//               return numA - numB;
//             }),

//           }));
//         } else {
//           console.log('bilal')
//           let findArea;
//           let matchingAreas;
//           if (localFilters.area.length) {
//             const localAreaIds = localFilters?.area?.map(area => area.area_id) || [];

//             // Find matching areas based on area_id
//             matchingAreas = response?.area_list?.filter(area =>
//               localAreaIds.includes(area.area_id)
//             );
//           }



//           console.log("Matching Areas", matchingAreas);



//           setDropdownOptions((prevOptions) => ({
//             ...prevOptions,
//             module_options: response?.modules || [],
//             area_list: response?.area_list?.sort((a, b) => {
//               // Extract the number part from the area name
//               const numA = parseInt(a.area_name.match(/\d+/)?.[0] || 0, 10);
//               const numB = parseInt(b.area_name.match(/\d+/)?.[0] || 0, 10);
//               return numA - numB;
//             }),
//             sub_area_list: matchingAreas.flatMap((a) => a.sub_areas) || []
//           }));
//         }
//       })
//       .catch((e) => { });
//   }

//   const [callApi, setCallApi] = useState(false)
//   useEffect(() => {

//     const interval = setInterval(() => {

//       fetchAllCameras();
//     }, 120000); // 2 minutes interval
//     return () => clearInterval(interval);
//   }, []);
//   useEffect(() => {

//     fetchAllCameras();
//   }, [callApi])

//   const handleApply = () => {
//     fetchAllCameras()
//     if (areaD) {
//       fetchCameraCountArea()
//     } else if (ItDashboard) {
//       fetchCameracount()
//     } else {
//       fetchCameracount()
//     }

//     localStorage.setItem('cameraFilters', JSON.stringify(filters))
//   }
//   const handleReset = () => {
//     setFilters({
//       area: [],
//       status: "",
//       factory: ItDashboard ? `f-${JSON.parse(localStorage.getItem('userData'))?.factory?.id}` : '',
//       sub_area: [],
//       module: "",
//     })
//     localStorage.setItem('cameraFilters', JSON.stringify(filters))
//     setCallApi(!callApi)


//   }

//   const fetchAllCameras = (page = 1) => {
//     setLoading(true);
//     let payload;
//     const UserData = JSON.parse(localStorage.getItem('userData'))
//     const localFilters = JSON.parse(localStorage.getItem('cameraFilters'))
//     console.log('filtersnew', filters)
//     if (areaD) {
//       if (localFilters) {
//         payload = {
//           user_id: UserData?.id,
//           status: localFilters.status || "",
//           // connectivity: localFilters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
//           connectivity: '',
//           areas: [UserData?.area_ids?.id],
//           sub_areas: localFilters?.sub_area?.map((id) => id.id) || [],
//           module: parseInt(localFilters.module.split('-')[1]) || '',
//           factory_id: UserData?.factory?.id,
//           pagination: {
//             page_no: page,
//             per_page: 20, // Adjust based on your UI
//           },
//         };
//       } else {
//         payload = {
//           user_id: UserData?.id,
//           status: filters.status || "",
//           // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
//           connectivity: '',
//           areas: [UserData?.area_ids?.id],
//           sub_areas: filters?.sub_area?.map((id) => id.id) || [],
//           module: parseInt(filters.module.split('-')[1]) || '',
//           factory_id: UserData?.factory?.id,
//           pagination: {
//             page_no: page,
//             per_page: 20, // Adjust based on your UI
//           },
//         };
//       }

//     } else if (ItDashboard) {
//       payload = {
//         user_id: UserData?.id,
//         status: filters.status || "",
//         // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
//         connectivity: '',
//         areas: filters?.area?.map((id) => id.area_id) || [],
//         sub_areas: filters?.sub_area?.map((id) => id.id) || [],
//         module: parseInt(filters.module.split('-')[1]) || "",
//         factory_id: parseInt(filters?.factory?.split('-')[1]),
//         pagination: {
//           page_no: page,
//           per_page: 20, // Adjust based on your UI
//         },
//       };
//     } else {
//       payload = {
//         user_id: UserData?.id,
//         status: filters.status || "",
//         // connectivity: filters?.status === 'Active' ? "1" : filters?.status === 'InActive' ? '0' : '',
//         connectivity: '',
//         areas: filters?.area?.map((id) => id.area_id) || [],
//         sub_areas: filters?.sub_area?.map((id) => id.id) || [],
//         module: parseInt(filters.module.split('-')[1]) || "",
//         factory_id: UserData?.factory?.id,
//         pagination: {
//           page_no: page,
//           per_page: 20, // Adjust based on your UI
//         },
//       };

//     }




//     CameraService.getAllLiveCameras_new(payload)
//       .then((res) => {
//         const response = res?.data?.data;
//         const cameras = response?.cameras || [];
//         const totalRecords = response?.total_records || 0;
//         const totalPages = response?.total_pages || 1;

//         setAllCameras(cameras.reverse().map((item, index) => ({
//           ...item,
//           gate: index + 1,
//           modules: item?.modules?.filter((m) => m.module_id !== null),
//         })));

//         setShowTable(cameras.length > 0);
//         setShowError(cameras.length === 0);
//         setLoading(false);

//         // Handle pagination
//         setPagination({
//           currentPage: page,
//           totalPages,
//           totalRecords,
//         });
//       })
//       .catch((error) => {
//         setLoading(false);
//         setShowError(true);
//       });
//   };

//   useEffect(() => {
//     if (areaD) {
//       fetchCameraCountArea()
//     } else if (ItDashboard) {

//     } else {
//       fetchCameracount()
//     }

//   }, [areaD])
//   // useEffect(() => {

//   //   if (ItDashboard) {
//   //     fetchCameracount()
//   //   }
//   // }, [filters])
//   const fetchCameracount = async (itD = false) => {
//     const UserData = JSON.parse(localStorage.getItem('userData'))
//     let paylaodId;
//     if (areaD) {
//       paylaodId = UserData?.area_ids?.id
//     } else if (ItDashboard) {
//       paylaodId = filters?.factory.split('-')[1]
//     } else {
//       paylaodId = UserData?.factory?.id
//     }
//     try {
//       const res = await CameraService.getCameraCounts(paylaodId)
//       if (res.status === 200) {
//         const activeCameras = res?.data?.data?.active_cameras
//         const totalCameras = res?.data?.data?.total_cameras
//         setTotalRecords(totalCameras)
//         setLiveCameras(activeCameras)
//         console.log('activeCamerastotalCameras', res)
//       } else {
//         errorToast(res.message)
//       }
//       console.log()
//     } catch (err) {
//       console.log('fetch camera count error: ', err)
//     }
//   }

//   const fetchCameraCountArea = async () => {

//     const UserData = JSON.parse(localStorage.getItem('userData'))
//     let paylaodId = UserData?.area_ids?.id

//     try {
//       const res = await CameraService.getCameraCountsArea(paylaodId)
//       if (res.status === 200) {

//         const activeCameras = res?.data?.data?.active_cameras
//         const totalCameras = res?.data?.data?.total_cameras
//         console.log('activeCamerastotalCameras', activeCameras, totalCameras)
//         setTotalRecords(totalCameras)
//         setLiveCameras(activeCameras)
//       } else {
//         errorToast(res.message)
//       }
//       console.log()
//     } catch (err) {
//       console.log('fetch camera count error: ', err)
//     }
//   }
//   function hasAnyValue(filters) {
//     return Object.values(filters).some((value) => {
//       if (Array.isArray(value)) {
//         return value.length > 0; // Check if array is not empty
//       } else {
//         return Boolean(value); // Check if value is truthy for strings or other types
//       }
//     });
//   }


//   console.log("allCamerasss", allCameras);

//   const toggleCameraID = (index) => {
//     if (expandedIndexes.includes(index)) {
//       setExpandedIndexes(expandedIndexes.filter((i) => i !== index)); // Collapse
//     } else {
//       setExpandedIndexes([...expandedIndexes, index]); // Expand
//     }
//   };

//   const toggleSubArea = (index) => {
//     if (expandedWebIndexes.includes(index)) {
//       setWebExpandedIndexes(expandedWebIndexes.filter((i) => i !== index)); // Collapse
//     } else {
//       setWebExpandedIndexes([...expandedWebIndexes, index]); // Expand
//     }
//   };

//   const RenderText = ({ title, value, gate }) => {
//     return (
//       <div className="camera_details ellipsis-text">
//         <span className="f-w-500">{title}: </span>
//         {title === "Modules" || title === "Module" ? (
//           value?.map((item, index) => {
//             return (
//               <span key={index}>
//                 {" "}
//                 {item?.module_name} {index < value.length - 1 && " | "}{" "}
//               </span>
//             );
//           })
//         ) : (
//           <span>{value}</span>
//         )}
//       </div>
//     );
//   };

//   const RenderCameraID = ({ item, index }) => {
//     const isExpanded = expandedIndexes.includes(index);
//     const truncatedCameraID = item?.camera_id
//       ?.split("-")
//       ?.slice(0, 3)
//       ?.join("-");

//     return (
//       <div className="camera_details ellipsis-text">
//         <span className="f-w-500">Camera ID: </span>
//         <span className="prospect-address">{item?.camera_id}</span>

//         {/* <OptionToggle
//           onClick={() => toggleCameraID(index)}
//           isExpanded={isExpanded}
//         /> */}
//       </div>
//     );
//   };
//   const RenderSubArea = ({ item, index }) => {
//     const isExpanded = expandedWebIndexes.includes(index);
//     const truncatedCameraID = truncateName(item?.sub_area, 10);

//     return (
//       <div className="camera_details">
//         <span className="f-w-500">Sub Area: </span>
//         <span className="prospect-address">
//           {item?.sub_area}
//           {/* {isExpanded ? item?.sub_area : truncatedCameraID} */}
//         </span>

//         {/* <OptionToggle
//           onClick={() => toggleSubArea(index)}
//           isExpanded={isExpanded}
//         /> */}
//       </div>
//     );
//   };

//   const MenuIconButton = ({
//     handleEdit,
//     darkColor,
//     handleDelete,
//     handlestatus,
//   }) => {
//     return (
//       <span className="pull-right onhover-dropdown  p-0 text-right">
//         <MoreVertical
//           className={`font-${darkColor ? "dark" : "primary"}`}
//           size={20}
//         />

//         <div
//           className="onhover-show-div"
//           style={{
//             position: "absolute",
//             top: 28,
//             left: -70,
//             width: "150px",
//           }}
//         >
//           <ul
//             style={{
//               padding: "5px 10px",
//               textAlign: "left",
//               width: "140px",
//             }}
//           >
//             <li
//               style={{ margin: "5px 5px ", cursor: "pointer" }}
//               onClick={handleEdit}
//             >
//               <p className="menu-title"> Edit</p>
//             </li>

//             <li
//               style={{
//                 margin: "5px 5px ",
//                 cursor: "pointer",
//               }}
//               onClick={handleDelete}
//             >
//               <p className="menu-title">Delete</p>
//             </li>
//             <li
//               style={{
//                 margin: "5px 5px ",
//                 cursor: "pointer",
//               }}
//               onClick={handlestatus}
//             >
//               <p className="menu-title">Change status</p>
//             </li>
//           </ul>
//         </div>
//       </span>
//     );
//   };

//   const handleRowEditClick = (camera_id) => {
//     navigate(
//       `${process.env.PUBLIC_URL}/update_camera/${JSON.parse(
//         localStorage.getItem("role")
//       )}`,
//       {
//         state: {
//           camera_id: camera_id,
//           models: dropdownOptions?.module_options,
//         },
//       }
//     );
//   };
//   const handleDeleteClick = (camera_id) => {
//     showConfirmationAlert("Are you sure you want to delete this Camera?").then(
//       (result) => {
//         if (result.value) {
//           CameraService.deleteCamera(camera_id)
//             .then((resp) => {
//               if (resp?.data?.success === true) {
//                 const filtereddata = filterCameras?.filter(
//                   (r) => r.camera_id !== camera_id
//                 );
//                 setAllCameras(filtereddata);
//                 setFilterCameras(filtereddata);
//                 if (filtereddata.length === 0) {
//                   setShowTable(false);
//                 }

//                 successToast(resp?.data?.message);
//               } else {
//                 infoToast(resp?.data?.message);
//                 setShowTable(true);
//               }
//             })
//             .catch((err) => {
//               setShowTable(false);
//               errorToast(err?.response?.data?.message);
//             });
//         }
//       }
//     );
//   };
//   const handleCameraToggle = (data) => {
//     console.log(data, "data");
//     if (data) {
//       setmodalDataForToggle({
//         name: data.area_owner,
//         id: data.camera_id,
//         status: data.active,
//       });
//       handleCameraStatus();
//     }
//   };

//   const Buttonstyle = {
//     minWidth: "132px",
//     width: "160px",
//     maxWidth: "160px",
//     height: "35px",
//     fontSize: 13,

//   };
//   const Items = (items) => {
//     return (
//       <Row>
//         {items &&
//           items?.map((item, index) => {
//             return (
//               <Col
//                 key={index}
//                 className="custom-col-card col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6"
//               >
//                 <Card
//                   className={
//                     index % 2 === 0
//                       ? "camera_item_card_odd"
//                       : "camera_item_card_even"
//                   }
//                   key={index + 1}
//                   style={{
//                     marginBottom: 5,
//                     backgroundColor: item?.active ? "white" : "#e2e2e2",
//                   }}
//                 >
//                   <CardBody className="camera_card_body">
//                     <Row
//                       style={{
//                         alignItems: "center",
//                       }}
//                     >
//                       <Media>
//                         <div className="gateNumber mb-2">
//                           Camera #{item?.gate}
//                         </div>
//                         <Media body className="action-options pull-right">
//                           {JSON.parse(localStorage.getItem("role")) ===
//                             "it-officer" && (
//                               <MenuIconButton
//                                 handleEdit={() =>
//                                   handleRowEditClick(item?.camera_id)
//                                 }
//                                 handleDelete={() =>
//                                   handleDeleteClick(item?.camera_id)
//                                 }
//                                 handlestatus={() =>
//                                   handleCameraToggle(item ? item : null)
//                                 }
//                               />
//                             )}
//                           <Eye
//                             size={18}
//                             className="view_icon font-primary"
//                             onClick={() => handleRowClick(item)}
//                           />
//                         </Media>
//                       </Media>
//                       <Col className="custom-col-9 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
//                         <RenderCameraID item={item} index={index} />

//                         <RenderText
//                           title={"Camera Name"}
//                           value={item?.camera_name}
//                           gate={item}
//                         />

//                         {!areaD && (
//                           <>
//                             <RenderText
//                               title={"Area"}
//                               value={item?.area}
//                               gate={item}
//                             />
//                             <RenderText
//                               title={"Owner"}
//                               value={item?.area_owner}
//                               gate={item}
//                             />
//                           </>
//                         )}
//                         <RenderSubArea item={item} index={index} />

//                         <RenderText
//                           title={
//                             item?.modules?.length > 1 ? "Modules" : "Module"
//                           }
//                           value={item?.modules}
//                           gate={item}
//                         />
//                         {item?.last_active && (
//                           <RenderText
//                             title={"Last Active"}
//                             value={item?.last_active}
//                             gate={item}
//                           />
//                         )}

//                         <div className="camera_details">
//                           <span className="f-w-500">Status: </span>
//                           <span
//                             className={`badge ${item?.active ? "bg-success" : "bg-danger"
//                               }`}
//                             style={{
//                               fontWeight: 500,
//                               fontSize: 13,
//                             }}
//                           >
//                             {" "}
//                             {item?.active
//                               ? "Active"
//                               : !item?.last_active
//                                 ? "Nill"
//                                 : "Inactive"}
//                           </span>
//                         </div>
//                       </Col>
//                       <Col className="custom_camera_card col-3 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-end">

//                         {imageLoadingStatus[index] !== false && (
//                           <div
//                             className=""
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               width: "100%",
//                               height: "100%",
//                             }}
//                           >
//                             <span className="loader-for-image">
//                               <Loader3 />
//                             </span>
//                           </div>
//                         )}

//                         <img
//                           src={item?.image_url ? item?.image_url : CameraImage}
//                           alt="Camera"
//                           className={`camera_image ${imageLoadingStatus[index] === false ? "visible" : ""
//                             }`}
//                           style={{
//                             color: "gray",
//                           }}
//                           onLoad={() => handleImageLoad(index)}
//                           onClick={() => handleRowClick(item)}
//                         />
//                       </Col>
//                     </Row>
//                   </CardBody>
//                 </Card>
//               </Col>
//             );
//           })}
//       </Row>
//     );
//   };

//   const handleFilterChange = (e, field) => {

//     localStorage.setItem('camerapage', 0)
//     setFilters((prevFilters) => {

//       const newFilter = {
//         ...prevFilters,
//         [field]: e.target.value,
//       };
//       return newFilter;
//     });

//   };
//   const handleFilterChangeNew = (e, field) => {
//     console.log('e.target.value', e.target.value)
//     setFilters((prevFilters) => {
//       const newFilter = {
//         ...prevFilters,
//         [field]: e.target.value,
//       };
//       return newFilter;
//     });
//     fetchDropdownOptions(e.target.value.split('-')[1])
//     setDropdownOptions((prevOptions) => ({
//       ...prevOptions,
//       area_list: prevOptions.area_list.filter((f) => f.factory_id !== e.target.value.split('-')[1])
//     }));

//   };

//   // useEffect(() => {
//   //   const payload = JSON.parse(localStorage.getItem('camerafilter1'))
//   //   applyFilters(payload, filterCameras);
//   // }, [filters, filterCameras]);

//   const applyFilters = (currentFilters, dataList) => {
//     let filtered = dataList;
//     console.log('payload', currentFilters)
//     console.log("currentFilters", filtered);

//     // Apply area filter
//     if (currentFilters?.area) {
//       console.log('currentFilters.area', currentFilters.area)
//       console.log('filteredfiltered', filtered)
//       const selected_areas = currentFilters?.area?.map((i) => i.area_name);
//       filtered = filtered.filter(
//         (item) =>
//           selected_areas.length === 0 || selected_areas?.includes(item.area)
//       );
//     }
//     // Apply sub area filter
//     if (currentFilters?.sub_area) {
//       console.log('current filters', currentFilters)
//       const selected_sub_areas = currentFilters?.sub_area?.map((i) =>
//         i.name?.trim()?.toLowerCase()
//       );
//       filtered = filtered.filter((item) => {
//         return (
//           selected_sub_areas.length === 0 ||
//           selected_sub_areas?.includes(item.sub_area?.trim()?.toLowerCase())
//         );
//       });
//     }
//     if (currentFilters?.module) {
//       const selected_module = currentFilters.module.trim().toLowerCase();
//       filtered = filtered.filter((item) => {
//         return item.modules.some(
//           (module) =>
//             module.module_name.trim().toLowerCase() === selected_module
//         );
//       });
//     }

//     // Apply module filter
//     if (currentFilters?.status) {
//       const val = currentFilters.status === "Active" ? true : false;
//       filtered = filtered.filter((item) => item.active === val);
//     }

//     const updated_data = filtered?.map((i, index) => ({
//       ...i,
//       sr: index + 1,
//     }));
//     console.log(filtered, 'filteredd')
//     setAllCameras(updated_data);
//   };

//   const style = {
//     width: "160px",
//     height: "38px",
//     fontSize: 13,
//     margin: "5px 3px",
//     display: "inline-block",
//   };

//   const handleRowClick = (item) => {
//     setImageData({
//       photo: item.image_url,
//       cameraName: item.camera_name,
//       date: item?.last_active
//         ? moment(item?.last_active).format("DD MMM, YYYY")
//         : "",
//       time: item?.last_active
//         ? moment(item?.last_active).format("hh:mm A")
//         : "",
//     });
//     setModalData(item);
//     setShowModal(!showModal);
//   };


//   // Update areas and reset subareas based on selected areas
//   const handleAreaChange = (selectedAreas) => {
//     const selectedAreaIds = selectedAreas.map((area) => area.area_id);

//     // Update filters
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       area: selectedAreas, // Save the selected areas in the filters
//       sub_area: [], // Reset sub-areas when a new area is selected
//     }));

//     // Update sub-area dropdown options based on selected areas
//     const selectedSubAreas = selectedAreas
//       .map((area) => area.sub_areas || []) // Extract subareas
//       .flat(); // Flatten into a single array
//     setDropdownOptions((prevOptions) => ({
//       ...prevOptions,
//       sub_area_list: selectedSubAreas, // Update sub-area options
//     }));
//   };
//   const handleFactoryChange = (selectedFactory) => {


//     // Update filters
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       // Reset sub-areas when a new area is selected
//       factory: selectedFactory
//     }));


//   };

//   // Update selected subareas
//   const handleSubAreaChange = (selectedSubAreas) => {
//     console.log('selectedSubAreasselectedSubAreas', selectedSubAreas)
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       sub_area: selectedSubAreas,
//     }));
//   };

//   console.log('fillterss', filters)



//   const handleSaveCamera = (record) => {
//     fetchAllCameras();
//   };

//   const handleNavigation = async () => {

//     const queryString = new URLSearchParams({
//       areas_list: JSON.stringify(dropdownOptions?.area_list), // Encode areas_list
//       models: [], // Encode models
//       handleSave: handleSaveCamera, // Encode the function as a string (optional)
//     }).toString();

//     navigate(
//       `${process.env.PUBLIC_URL}/addcameras/${JSON.parse(
//         localStorage.getItem("role")
//       )}?${queryString}`
//     );
//   };
//   const handleToggle = () => {

//     const cameraIndex = allCameras.findIndex(
//       (item) => item.camera_id === modalDataForToggle.id
//     );

//     if (cameraIndex !== -1) {
//       const newCameras = [...allCameras];
//       newCameras[cameraIndex] = {
//         ...newCameras[cameraIndex],
//         active: !newCameras[cameraIndex].active,
//       };
//       setAllCameras(newCameras);
//       handleCameraStatus();
//     } else {
//     }
//   };



//   const newOptionsForAreas = dropdownOptions?.area_list?.map((a) => a.area_name)
//   console.log('dropdownOptions?.sub_area_list', dropdownOptions?.sub_area_list)

//   console.log('dropdownOptions?.area_list', dropdownOptions?.area_list)

//   return (
//     <>
//       <br />
//       <Container fluid>
//         <Row style={{ marginBottom: 0, alignItems: "flex-start" }}>
//           <Col className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 col-xxl-2">
//             <h5 className="d-inline-block">Cameras</h5>
//           </Col>
//           <Col className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 col-xxl-10">

//             <div className="filter-row position-relative">
//               {JSON.parse(localStorage.getItem("role")) === "it-officer" && (
//                 <Button
//                   className="rounded-2 d-inline-block"
//                   color="primary"
//                   style={{
//                     height: "44px",
//                     fontSize: '14px',
//                     padding: "0px 10px",
//                     width: "120px",
//                     marginRight: '8px'
//                   }}
//                   onClick={handleNavigation}
//                 >
//                   Add Cameras
//                 </Button>
//               )}
//               <div type='button' className={`d-flex justify-content-center filter-btnn  ${showFilters && 'border_R'}`}
//                 ref={filterButton}
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <p
//                   className="m-0"
//                   style={{ fontSize: "16px", }}
//                 >
//                   Filters
//                 </p>
//                 <span className="d-flex"><Filter color="#fff" size={16} className="ms-2 " /></span>
//               </div>

//               <div className="w-100 d-flex justify-content-end position-relative">
//                 {showFilters && <div className={`d-flex align-items-center justify-content-center py-3 filter-card shadow-sm`}
//                   ref={filterCardRef}
//                 >

//                   <div className="d-flex align-items-center justify-content-center flex-wrap ">

//                     {ItDashboard && (
//                       <NewCommonFIlterButton
//                         data={factoryloader ? ['Select factory'] : dropdownOptions?.factory?.map((f) => f.name + "-" + f.factory_id)}
//                         handleInputChange={handleFilterChangeNew}
//                         style={style}
//                         selectedItem={filters?.factory}
//                         // firstOption={filters.module}
//                         inputChangeOption={"factory"}
//                         className={""}
//                       />
//                     )}

//                     {!areaD && (
//                       <div style={{ display: "inline-block", position: "relative" }}>
//                         <ChevronDown
//                           style={{
//                             position: "absolute",
//                             top: "15px",
//                             right: "11px",
//                             zIndex: "2",
//                           }}
//                           size={18}
//                           color="#383e44"
//                         />
//                         <Typeahead
//                           id="area-typeahead"
//                           name="area"
//                           className="custom-typeahead rounded-3"
//                           labelKey={(option) =>
//                             `${option.area_name} ${option.area_owner ? option.area_owner : ""}`.trim()
//                           }
//                           multiple
//                           options={dropdownOptions?.area_list}
//                           selected={filters?.area}
//                           onChange={handleAreaChange}
//                           placeholder="Select Areas"
//                           renderMenuItemChildren={(option) => (
//                             <div
//                               style={{
//                                 color: option.active ? "inherit" : "#a9a9a9", // Dimmed color for inactive areas
//                                 opacity: option.active ? 1 : 0.6, // Slightly transparent for inactive areas
//                                 pointerEvents: option.active ? "auto" : "none", // Disable click for inactive options
//                                 cursor: option.active ? "pointer" : "not-allowed",
//                               }}
//                             >
//                               <span>{option.area_name}</span>
//                               {option.area_owner && <small> {option.area_owner}</small>}
//                             </div>
//                           )}
//                           style={{
//                             display: "inline-block",
//                             textTransform: "capitalize",
//                             maxWidth: "160px",



//                           }}
//                           inputProps={{
//                             style: {

//                               padding: "10px", // Adjust padding for better alignment
//                             },
//                           }}
//                         />
//                       </div>
//                     )}


//                     {filters?.area.length ? <div style={{ display: "inline-block", position: "relative", width: '150x' }}>
//                       <ChevronDown
//                         style={{
//                           position: "absolute",
//                           top: "15px",
//                           right: "11px",
//                           zIndex: "2",
//                         }}
//                         size={18}
//                         color="#383e44"
//                       />

//                       <Typeahead
//                         id="sub-area-typeahead"
//                         name="sub-area"
//                         className="custom-typeahead rounded-3"
//                         labelKey="name" // Ensure the subarea object has a "name" field
//                         multiple
//                         options={dropdownOptions?.sub_area_list || []}
//                         selected={filters?.sub_area || []}
//                         onChange={handleSubAreaChange}
//                         placeholder="Select Sub Areas"
//                         style={{
//                           display: "inline-block",
//                           textTransform: "capitalize",
//                           maxWidth: "160px",
//                           fontSize: "11px",
//                         }}
//                       />
//                     </div> : null}
//                     {areaD ? <div style={{ display: "inline-block", position: "relative", width: '150x' }}>
//                       <ChevronDown
//                         style={{
//                           position: "absolute",
//                           top: "15px",
//                           right: "11px",
//                           zIndex: "2",
//                         }}
//                         size={18}
//                         color="#383e44"
//                       />

//                       <Typeahead
//                         id="sub-area-typeahead"
//                         name="sub-area"
//                         className="custom-typeahead rounded-3"
//                         labelKey="name" // Ensure the subarea object has a "name" field
//                         multiple
//                         options={dropdownOptions?.sub_area_list || []}
//                         selected={filters?.sub_area || []}
//                         onChange={handleSubAreaChange}
//                         placeholder="Select Sub Areas"
//                         style={{
//                           display: "inline-block",
//                           textTransform: "capitalize",
//                           maxWidth: "160px",
//                           fontSize: "11px",
//                         }}
//                       />
//                     </div> : null}

//                     <CommonFIlterButton
//                       data={CamersStatus}
//                       handleInputChange={handleFilterChange}
//                       style={style}
//                       selectedItem={filters.status}
//                       firstOption={"Select Status"}
//                       inputChangeOption={"status"}
//                       className={""}
//                     />
//                     <CommonFilterButtonForModule
//                       data={dropdownOptions?.module_options?.map((m) => m.module_name + '-' + m.module_id)}
//                       handleInputChange={handleFilterChange}
//                       style={style}
//                       selectedItem={filters.module}
//                       firstOption={"Select Module"}
//                       inputChangeOption={"module"}
//                       className={""}
//                     />



//                     <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
//                       <button

//                         style={Buttonstyle}
//                         className={` p-0 mb-2 rounded-3 btn-success hover border-0 shadow-sm d-flex align-items-center justify-content-evenly`}
//                         onClick={handleApply}
//                       >
//                         <IoCheckmarkOutline
//                           style={{
//                             color: '#fff',
//                             fontSize: "20px",
//                             transform: "rotate(20deg)",
//                           }}
//                         />
//                         <p style={{ color: '#fff' }} className="m-0 p-0 "> Accept</p>
//                       </button>
//                       <button
//                         style={Buttonstyle}
//                         className={`m-0 p-0 rounded-3 border-0 btn-danger shadow-sm d-flex align-items-center justify-content-evenly`}
//                         onClick={handleReset}
//                         color="danger"

//                       >
//                         <RxReset
//                           style={{
//                             color: '#fff',
//                             fontSize: "20px",
//                             // transform: "rotate(20deg)",
//                           }}
//                         />
//                         <p className="m-0 p-0 text-light"> Reset</p>
//                       </button>

//                       {/* <Button
//                         style={style}
//                         className="rounded-3"
//                         onClick={Reset}
//                         color="primary"
//                       >
//                         <RxReset />
//                       </Button> */}

//                     </div>

//                   </div>
//                 </div>
//                 }
//               </div>
//             </div>
//           </Col>
//         </Row>

//         {loading ? (
//           <center
//             style={{ textAlign: "center", marginTop: "", marginBottom: 40 }}
//           >
//             <Loader1 />
//           </center>
//         ) : showTable ? (
//           <>
//             <Row style={{ marginTop: 5 }}>
//               <Col
//                 style={{ height: "137px" }}
//                 className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
//               >

//                 <KPICard
//                   data={{
//                     title: "Total Cameras",
//                     gros: 50,
//                     total: totalRecords || 0,
//                     showPercentage: false,
//                   }}
//                   mainClass="kpi_card_total"
//                 />


//               </Col>
//               <Col
//                 style={{ height: "137px" }}
//                 className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
//               >

//                 <KPICard
//                   data={{
//                     title: "Live Cameras",
//                     // gros:
//                     //   allCameras?.length > 0
//                     //     ? Math.round(
//                     //       (allCameras?.filter((i) => i?.active === true)
//                     //         ?.length /
//                     //         allCameras?.length) *
//                     //       100
//                     //     ).toFixed(0)
//                     //     : 0,
//                     gros:
//                       Math.round(
//                         (liveCameras /
//                           totalRecords) *
//                         100
//                       ).toFixed(0)
//                     ,
//                     // total:
//                     //   allCameras?.filter((i) => i?.active === true)?.length ||
//                     //   0,
//                     showPercentage: true,

//                     total: liveCameras || 0,

//                   }}
//                   mainClass="kpi_card_live"
//                 />
//               </Col>
//             </Row>
//             <Row style={{ marginBottom: 20, marginTop: 5 }}>
//               <Col>
//                 {/* <CustomPagination
//                   data={allCameras}
//                   itemsPerPage={10}
//                   renderItems={Items}
//                 /> */}
//                 {/* <NewPagination
//                   currentPage={pagination.currentPage}
//                   totalPages={pagination.totalPages}
//                   onPageChange={(page) => fetchAllCameras(page)}
//                 /> */}
//                 <NewPagination
//                   data={allCameras} // Current page's data
//                   totalRecords={pagination.totalRecords} // Total records from API
//                   itemsPerPage={10}
//                   currentPage={pagination.currentPage - 1} // 0-based index for `forcePage`
//                   totalPages={pagination.totalPages} // Total pages from API
//                   onPageChange={(page) => fetchAllCameras(page)} // Fetch data for the selected page
//                   renderItems={Items}
//                 />
//               </Col>
//               <ConfirmationModals
//                 toggle={handleCameraStatus}
//                 modal={cameraStatusModal}
//                 actionbtn={"Change status"}
//                 body={"Are you sure you want to change this camera status ? "}
//                 user={modalDataForToggle}
//                 header={"Toggle Status"}
//                 handleConfirm={handleToggle}
//                 type={"status change"}
//               />

//               {/* custom pagination according to 20 objects */}
//               {/* <CustomPaginationn/> */}
//             </Row>
//           </>
//         ) : (
//           showError && <ErrorHeading />
//         )}
//         {showModal && (
//           <ImageZoom
//             photo={modalData?.image_url ? modalData?.image_url : CameraImage}
//             setIsOpen={setShowModal}
//             setShowModal={setShowModal}
//             imageData={imageData}
//             cameraTable={true}
//           />
//         )}
//       </Container>
//     </>
//   );
// };

// export default AllCamerasScreen;