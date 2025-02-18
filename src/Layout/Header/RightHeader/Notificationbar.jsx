import React, { useState } from 'react';
import SvgIcon from '../../../Components/Common/Component/SvgIcon';
import { CHECKALL, DeliveryComplete, DeliveryProcessing, Notification, OrderComplete, TicketsGenerated } from '../../../Constant';
import { Link } from 'react-router-dom';

const Notificationbar = ({totalNotifications, data}) => {
  const [notificationDropDown, setNotificationDropDown] = useState(false);

  return (
    <li className='onhover-dropdown'>
      <div className='notification-box' onClick={() => setNotificationDropDown(!notificationDropDown)}>
        <SvgIcon iconId='notification' />
        <span className='badge rounded-pill badge-secondary'>{totalNotifications}</span>
      </div>
      <div className={`notification-dropdown onhover-show-div ${notificationDropDown ? 'active' : ''}`}>
        <h6 className='f-18 mb-0 dropdown-title'>{Notification}</h6>
        <ul>
          {/* <li className='b-l-primary border-4'>
            <p>
              PPE Module Notification <span className='font-danger'>{'10 min.'}</span>
            </p>
          </li>
          <li className='b-l-success border-4'>
            <p>
              Helmet Violation Alert
              <span className='font-success'>{'1 hr'}</span>
            </p>
          </li>
          <li className='b-l-info border-4'>
            <p>
            Helmet Violation Alert
              <span className='font-info'>{'3 hr'}</span>
            </p>
          </li> */}
          
          <li>
            <Link to={`${process.env.PUBLIC_URL}/live_alerts/${JSON.parse(localStorage.getItem('role'))}`} className='f-w-700'>
              {CHECKALL}
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default Notificationbar;
