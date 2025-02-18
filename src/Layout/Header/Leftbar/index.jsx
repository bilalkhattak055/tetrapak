import React, { Fragment, useState, useLayoutEffect, useContext, useEffect } from "react";
import { Col } from "reactstrap";
import { AlignCenter } from "react-feather";
import { Link } from "react-router-dom";
import { H2, H3, H4, Image } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import NotificationSlider from "./NotificationSlider";
import { Button, ButtonGroup } from "reactstrap";
import FactoryService from "../../../api/factoryService";
import { errorToast, infoToast, showConfirmationAlert, successToast } from "../../../_helper/helper";
import '../../Sidebar/side.css'
const Leftbar = () => {
  const { layoutURL, setToggleIcon, toggleSidebar, toggleIcon } =
    useContext(CustomizerContext);
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const user = JSON.parse(localStorage.getItem("userData"));
  const [role, setRole] = useState(initialRole);
  const [sidebartoggle, setSidebartoggle] = useState(true);
  const width = useWindowSize();

  // const itOfficerOrSuperadmin = role === 'it-officer' || role === 'super-admin'

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth <= 991) {
          setToggleIcon(true);
        } else {
          setToggleIcon(false);
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const responsive_openCloseSidebar = (toggle) => {
    if (width <= 991) {
      toggleSidebar(!toggleIcon);
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper";
      document.querySelector(".bg-overlay1").classList.add("active");
      // console.log('bilal 11')
    } else {
      if (toggle) {
        // console.log('bilal 22')
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper close_icon";
        document.querySelector(".page-header").className =
          "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper";
        document.querySelector(".bg-overlay1").classList.add("active");
      } else {
        // console.log('bilal 33')
        // console.log("991 54 else", toggle);
        toggleSidebar(!toggle);
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper ";
      }
    }
  };
// for global feature -----------x--------------------x--------------
const [activeButton, setActiveButton] = useState("ICF");
const [selectedFactory, setSelectedFactory] = useState("");
const [factoryList, setFactoryList] = useState([]);

const handleButtonClick = (factoryName) => {
  setActiveButton(factoryName);
  handleFilterChangeNew(factoryName)
};
const fetchFactories = () => {
  FactoryService.getAllFactories()
    .then((res) => {
      setFactoryList(res.data?.data);
      const user = JSON.parse(localStorage.getItem("userData"));
      setSelectedFactory(user ?user?.factory?.id: 0) 
    })
    .catch((e) => {});
};
const handleFilterChangeNew = (e) => {
  // const val=parseInt(e.target.value)
 
  const selectedFactoryID= factoryList.find(item=>item.name==e);
  const val=selectedFactoryID?.factory_id  
  if(val !== 0){
  var get_user_data=JSON.parse(localStorage.getItem('userData')) 
  showConfirmationAlert("Are you sure you want to change your factory?","Yes")
  .then((result) => {
    if (result.value) {
      const payload = {
        user_id: get_user_data?.id,
        factory_id: val,
      };
      setSelectedFactory(e);
      FactoryService.updateUserFactory(payload)
        .then((res) => {
          if (res?.status === 200) {
            successToast(res?.data?.message);
            get_user_data.factory={ id:res?.data?.data?.factory_id, name:res?.data?.data?.factory_name}
            localStorage.setItem('userData',JSON.stringify(get_user_data)) 
            window.location.reload();
            
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
  })
  .catch((error) => {});
} 
};

useEffect(() => {
  setActiveButton(user?.factory?.name)
  fetchFactories();
}, [])

  return (
    <Fragment>
      <Col className="header-logo-wrapper col-auto p-0 " id="out_side_click">
        <div className="logo-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <Image
              attrImage={{
                className: "img-fluid for-light",
                src: `${require("../../../assets/images/logo/logo.png")}`,
                alt: "",
              }}
            />
            <Image
              attrImage={{
                className: "img-fluid for-dark",
                src: `${require("../../../assets/images/logo/logo_dark.png")}`,
                alt: "",
              }}
            />
          </Link>
        </div>
        <div
          className="toggle-sidebar-exception toggle-sidebar"
          onClick={() => responsive_openCloseSidebar(sidebartoggle)}
          style={
            window.innerWidth <= 991
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <AlignCenter
            className="status_toggle middle sidebar-toggle"
            id="sidebar-toggle"
          />
        </div>
      </Col>
      <Col sm="5" className="left-header p-0 d-none d-md-block" style={{ width: "fit-content" }}>
        {/* <NotificationSlider /> */} 
       {user?.id==129?
        null
        :<H4 attrH4={{className: 'header-heading'}}>{role === 'it-officer' || role === 'super-admin' ? 'Industrial Safety AI Dashboard' : role === 'area' ? 'Area Safety AI Dashboard' :role=='global' ? 'Axens Safety AI Dashboard' :  `${JSON.parse(localStorage.getItem('userData'))?.factory?.name || 'Axens'} Safety AI Dashboard`}
        </H4>}
      </Col>
    </Fragment>
  );
};

export default Leftbar;
