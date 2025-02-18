import React from 'react';
import {  Col, Row } from 'reactstrap';
import { SmallWidgetsData } from '../../../../Data/Ecommerce';
import SmallWidgets from '../../../Common/CommonWidgets/SmallWidgets';

const WidgetsGrid = () => {
  return (
   
      <>
        
        {SmallWidgetsData.map((data, i) => (
          <Col xs='6' md='4' xl='3' key={i}>
            <SmallWidgets data={data} />
          </Col>
        ))}
      </>
    
  );
};

export default WidgetsGrid;
