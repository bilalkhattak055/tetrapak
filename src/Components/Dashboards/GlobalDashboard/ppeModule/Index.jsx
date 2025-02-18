import React, { Fragment, useState } from 'react';
import { H2 } from '../../../../AbstractElements';
import { Container } from 'reactstrap';
import Calender from '../../ItDashboard/It Officer/Components/Calender';
import DateComponentt from '../../../Common/DateComponent/Index';
import './ppe.css'
import DownloadBtn from '../../../Common/CommonButton/DownloadBtn';
import ChartsSection from './ChartsSection';
import CardsSection from './CardsSection';
import FactoryPPEModal from '../../CompanyDashbaord/Pages/FactoryPPEModule';



const Index = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();



  const handleDateChange = date => {
    setSelectedDate(date);

  };

  const handleStartTimeChange = time => {
    setStartTime(time);

  };

  const handleEndTimeChange = time => {
    setEndTime(time);

  };
  return (
    <Fragment>
      <FactoryPPEModal />
    </Fragment>

  )
}

export default Index