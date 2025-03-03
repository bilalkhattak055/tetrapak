import React, { Fragment, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Taptop from "./TapTop";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ThemeCustomize from "../Layout/ThemeCustomizer";
import CustomizerContext from "../_helper/Customizer";
import AnimationThemeContext from "../_helper/AnimationTheme";
import ConfigDB from "../Config/ThemeConfig";
import Loader from "./Loader";
import SessionTimeOut from '../popups/sessionTimeout';
import PopupStateContext from "../_helper/popupState";
import AddUserPopup from '../popups/addUserPopup'
import { ShowDisclaimer } from "../_helper/helper";

const AppLayout = ({ children, classNames, ...rest }) => {

  const location = useLocation();
  const navigate = useNavigate()
  const [showSessionTimeout, ] = useState(false);
  const { layout } = useContext(CustomizerContext);
  const { sidebarIconType } = useContext(CustomizerContext);
  const { addUser, resynRole } = useContext(PopupStateContext)
  const layout1 = localStorage.getItem("sidebar_layout") || layout;
  const sideBarIcon = localStorage.getItem("sidebar_icon_type") || sidebarIconType;
  const { animation } = useContext(AnimationThemeContext);
  const animationTheme = localStorage.getItem("animation") || animation || ConfigDB.data.router_animation;

  // useEffect(() => {
  //   if(location.state?.showToast) {
  //     toast.success('Verification Successful!')
  //   }
  // }, [location.state]);
  useEffect(() => {
    if (location.state?.showToast) {
      // toast.success('Login Successful!');
      ShowDisclaimer("This Dashboard is intended for authorized personnel only. All data and information displayed are proprietary to Tetra Pak and are confidential. Any unauthorized access, distribution, or misuse of the information contained in this platform may result in legal consequences. The company does not guarantee the absolute accuracy of the data presented and users are advised to cross-check critical information. By using this platform, you agree to comply with Tetra Pak data security and privacy policies.")
      // Clear the showToast state after displaying the toast
      navigate(location.pathname, { replace: true, state: { ...location.state, showToast: false } });
    }
  }, [location, location.pathname, navigate, resynRole]);

  // Event listener to detect clicks outside the header

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 991) {
        const header = document.querySelector(".page-header");
        const sidebar = document.querySelector(".sidebar-wrapper");
        const toggleException = document.querySelector('.toggle-sidebar-exception')
        if (toggleException && !toggleException.contains(event.target) && sidebar && !sidebar.contains(event.target)) {
            // Add the class 'close_icon' when clicking outside the header or sidebar
            header.classList.add("close_icon");
            sidebar.classList.add("close_icon");
        }
      }
    };

    // Attach event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };





  }, []);
  const [iconClass ,seticonClass] = useState(false)

  const iconclass = document.querySelector('.new-icon-class-available');
  useEffect(()=> {
      seticonClass(true)
  }, [iconclass])

  // console.log("addUser=>", addUser)
  return (
    <Fragment>
      {addUser && <AddUserPopup />}
      {showSessionTimeout && <SessionTimeOut />}
      <Loader />
      <Taptop />
      <div className={`page-wrapper ${layout1}`} sidebar-layout={sideBarIcon} id="pageWrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          {/* <TransitionGroup {...rest}>
            <CSSTransition key={location.key} timeout={100} classNames={animationTheme} unmountOnExit> */}
              <div className={`page-body`}>
                <div>
                  <div>
                    <Outlet />
                  </div>
                </div>
              </div>
            {/* </CSSTransition>
          </TransitionGroup> */}
          {/* <Footer /> */}
        </div>
      </div>
      <ThemeCustomize />
      <ToastContainer />
    </Fragment>
  );
};
export default AppLayout;
