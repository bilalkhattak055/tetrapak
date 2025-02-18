import React, { useContext, useState } from 'react';
import { Grid } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CubaIcon from '../../assets/images/logo/login-logo.svg';
import AxenLogin from '../../assets/images/logo/AxenLogin.svg';
import CustomizerContext from '../../_helper/Customizer';
import './side.css'
import resyncState from '../../_helper/resync';

const SidebarLogo = () => {
  const navigate = useNavigate()
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')))
  const {resyncForWidth, setResyncForWidth} = useContext(resyncState)


  const openCloseSidebar = () => {
    // console.log("cons")
      toggleSidebar(!toggleIcon);
      setResyncForWidth(resyncForWidth)
      const pageBody = document.querySelector('.page-body')
      const iconClass = document.querySelector('.close_icon')
    //   if (!iconClass) {
    //     pageBody.classList.add('icon-class-available');
    // } else {
    //     pageBody.classList.remove('icon-class-available');
    // }
  };
  let navigation = undefined
  switch (true) {
    case role === 'global':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/global`
      break;
    case role === 'it-officer':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/it-officer`
      break;
    case role === 'super-admin':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/super-admin`;
      break;

    case role === 'factory':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/factory`;
      break;

    case role === 'area':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/area`;
      break

    case role === 'qa':
      navigation = `${process.env.PUBLIC_URL}/dashboard/default/qa`;
      break
  }

  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  const clickLogo =()=> {
    document.querySelector(".page-header").classList.remove("close_icons");
    document.querySelector(".sidebar-wrapper").classList.remove("close_icons");
    if(toggleIcon) {
      toggleSidebar(!toggleIcon)
    }
    navigate(navigation)

  }


  return (
    <div className='logo-wrapper new-logo-wrapper'>
      {layout1 !== 'compact-wrapper dark-sidebar' && layout1 !== 'compact-wrapper color-sidebar' && mixLayout ? (
        navigation ? (<div onClick={clickLogo} className='bilal'>
          <Image  attrImage={{ className: 'img-fluid d-inline uni-logo', style: { height: '110px' }, src: `${role === 'factory' ? AxenLogin : CubaIcon}`, alt: 'logo-main' }} />
        </div>) : (<div>
          <Image attrImage={{ className: 'img-fluid d-inline uni-logo', style: { height: '110px' }, src: `${role === 'factory' ? AxenLogin : CubaIcon}`, alt: 'logo-main' }} />
        </div>)
      ) : (
        navigation ? (<div type='button' onClick={clickLogo} className=' d-flex justify-content-center'>
          <Image  attrImage={{ className: 'img-fluid d-inline uni-logo', src: `${AxenLogin}`, alt: 'main-logo' }} />
          {/* <Image attrImage={{ className: 'img-fluid d-inline uni-logo', src:`${role === 'factory' ? uniIcon : CubaIcon}`, alt: 'main-logo' }} /> */}
        </div>): (<div className='d-flex justify-content-center'>
          <Image attrImage={{ className: 'img-fluid d-inline uni-logo', src: `${AxenLogin}`, alt: 'main-logo' }} />
          {/* <Image attrImage={{ className: 'img-fluid d-inline uni-logo', src:`${role === 'factory' ? uniIcon : CubaIcon}`, alt: 'main-logo' }} /> */}
        </div>)
        
      )}
      <div className='back-btn btn-back' role='button' onClick={openCloseSidebar}>
        <i className='fa fa-angle-left'></i>
      </div>
      <div className='toggle-sidebar' onClick={openCloseSidebar}>
        {/* <Grid className='status_toggle middle sidebar-toggle' /> */}
        <i className={`fa ${toggleIcon ? 'fa-angle-right' : 'fa-angle-left'} status_toggle middle sidebar-toggle`} ></i>
      </div>
    </div>
  );
};

export default SidebarLogo;
