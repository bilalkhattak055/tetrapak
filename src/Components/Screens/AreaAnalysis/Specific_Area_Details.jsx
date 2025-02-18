import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AreaDashboard from '../../Dashboards/AreaDashbaord/Default/Index'
const SpecificAreaDetails = () => {
  const { id } = useParams();  
  return (
    <>
    <AreaDashboard id={id}/>
    </>
  );
}

export default SpecificAreaDetails;
