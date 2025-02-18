import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cubaimg from "../../assets/images/logo/login-logo.svg"
import CustomizerContext from '../../_helper/Customizer';
import uniIcon from '../../assets/images/logo/uni-logo.jpeg';
import logoaxsen from '../../assets/images/logo/logoaxsen.svg';

const SidebarIcon = () => {
  const { layoutURL,  toggleSidebar, toggleIcon } = useContext(CustomizerContext);

  const clickLogo =()=> {
    let pageBody;
    let iconClass;
    if (window.innerWidth > 991) {
       pageBody = document.querySelector('.page-body')
       iconClass = document.querySelector('.close_icon')
      if (iconClass) {
        pageBody.classList.add('new-icon-class-available');
        pageBody.classList.add('icon-class-available');
      } 
      
        // document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon";
        document.querySelector(".page-header").className =
      "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper";
      console.log('toffle', toggleIcon)
      if(toggleIcon) {
        toggleSidebar(!toggleIcon)
      }
      // document.querySelector(".bg-overlay1").classList.add("active");
    }
    if (window.innerWidth <= 991) {
      document.querySelector(".page-header").className =
        "page-header";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper";
      // document.querySelector('.mega-menu-container').classList.remove('d-block');
    
    }
  }
  return (
    <div onClick={clickLogo} className="logo-icon-wrapper">
      <Link>
        <img
          className="img-fluid logo-sv-img"
          src={logoaxsen}
          alt=""
        />
      </Link>
    </div>
  );
};

export default SidebarIcon;