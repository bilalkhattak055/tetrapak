import React, { Fragment, useEffect, useState } from 'react';
import Notificationbar from './Notificationbar';
import UserHeader from './UserHeader';
import { UL } from '../../../AbstractElements';
import { Col } from 'reactstrap';
import AreaService from '../../../api/areaService';
import DownloadButton from './DownloadButton ';
import { useLocation } from 'react-router-dom';

const RightHeader = () => { 
  const [currentRoute, setcurrentRoute] = useState()
  const location = useLocation();

  const today = new Date();
  const startDat = today.toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(startDat);
  const [data, setData] = useState([])


  const fetchDashboard = (selected_date) => {
    const payload = {
      user_id: 9,
      date: selected_date,
    };
    AreaService.getRecentAlerts(payload)
      .then((res) => {
        const resp = res?.data?.data;
        setData(resp)
      })
      .catch((e) => {
      });
  };
console.log('current route', currentRoute)
  useEffect(() => {
    const current=location.pathname.split('/')
    const currentRoute = current.find(element => element.toLowerCase() === 'support' ) || ''; 
    setcurrentRoute(currentRoute) 

    // const interval = setInterval(() => {
    //   fetchDashboard(selectedDate);
    // }, 60000);
    // return () => clearInterval(interval);  
  }, [location.pathname]);
  return (
    <Fragment>
      <Col xs='4' md='2'  xl='3' lg='4'  className='nav-right pull-right right-header col-8 p-0 ms-auto'>
        {/* <Col md="8"> */}
        <UL attrUL={{ className: 'simple-list nav-menus flex-row' }}>
          {/* <Language /> */}
          {/* <Searchbar /> */}
         
          {/* <BookmarkHeader /> */}
          {/* <MoonLight /> */}
          {/* <CartHeader /> */}
          {/* {(currentRoute==='support' )?null:<DownloadButton />} */}
          <Notificationbar totalNotifications={data?.length > 0 ? data?.length : ""} data={data}  />
          <UserHeader />
        </UL>
        {/* </Col> */}
      </Col>
    </Fragment>
  );
};

export default RightHeader;
