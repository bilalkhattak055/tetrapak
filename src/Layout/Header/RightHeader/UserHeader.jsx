import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "react-feather";
import man from "../../../assets/images/appointment/app-ent.jpg";
import uniIcon from '../../../assets/images/logo/uni-logo.jpeg'
import Axenmen from '../../../assets/images/logo/Axenmen.svg'

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Admin, LogOut } from "../../../Constant";
import PopupStateContext from "../../../_helper/popupState";
import './header.css'
import FactoryService from "../../../api/factoryService";

const UserHeader = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("Emay Walter");
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));
  const { setResyncRole} = useContext(PopupStateContext)
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')))
  const [show, setShow] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
    setName(localStorage.getItem("name") ? JSON.parse(localStorage.getItem("name")) : name);

    const handleOutsideClick =(e)=> {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return ()=> {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef]);

  const Logout = async() => {
    const id = JSON.parse(localStorage.getItem('userData'))?.id

    localStorage.removeItem("login")
    localStorage.removeItem("profileURL");
    localStorage.removeItem("token");
    localStorage.removeItem("auth0_profile");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    localStorage.setItem("authenticated", false);
    localStorage.removeItem('filters');
    localStorage.removeItem('camerafilter1');
    localStorage.removeItem('dropdownOptions');
    localStorage.removeItem('pageNo');
    localStorage.removeItem('camerapage');
localStorage.removeItem('qafilters')


    history(`${process.env.PUBLIC_URL}/login`);
    setResyncRole(true)
    try{
      const res = await FactoryService.logoutApi(id)
      console.log('ressss', res)
    }catch(err) {
      console.log(err)
    }

    
  };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };
 
  return (
    <li
    ref={dropdownRef}

    className="profile-nav onhover-dropdown py-0 ms-2  px-2 py-2 rounded bg-primary logoutwidthforresponsive" 
    onClick={()=> setShow(!show)}
    >
      <div style={{width: 'max-content'}} className="media profile-media">
      
      <div className="uni-logo-div">

      
        <Image
          attrImage={{
            className: "b-r-10 m-0 uni-logoo",
            src: `${Axenmen}`,
            // src: `${role === 'factory' ? uniIcon : man}`,
            alt: "",
          }}
        />
        </div>
        <div className="media-body pe-2" >
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            <span style={{color: 'white'}}>{Admin} <i className="middle fa fa-angle-down"></i></span>
          </P>
          <span>{authenticated ? auth0_profile.name : name}</span>
        </div>
      </div>
      <UL
        attrUL={{ className: `simple-list profile-dropdown onhover-show-div logout-div ${show ? 'active' : ''}`}}
      >
        {/* <LI attrLI={{}}>
          <User />
          <span>{Account} </span>
        </LI>
        <LI attrLI={{}}>
          <Mail />
          <span>{Inbox}</span>
        </LI>
        <LI attrLI={{}}>
          <FileText />
          <span>{Taskboard}</span>
        </LI> */}
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}.
            
          </span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
