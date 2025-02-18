import React from 'react'
import { Col, Row } from 'reactstrap'
import { H2 } from '../../../../AbstractElements'
import { SmallWidgetsData, SmallWidgetsDataaa } from '../../../../Data/Ecommerce'
import SmallWidgets from '../../../Common/CommonWidgets/SmallWidgets'


const CardsSection = () => {
  return (
    <Row>
        <div className="row d-flex justify-content-between"   style={{marginTop:'15px', marginBottom: '15px'}} >
        <H2 attrH2={{className:'col-xs-12 col-sm-6'}}>PPE Alterts</H2>
        {/* <Calendar /> */}
        </div>
        <Row>
          <WidgetsGridd />
        </Row>
        </Row>
  )
}


const WidgetsGridd = () => {
    return (
     
        <>
          
          {SmallWidgetsDataaa.map((data, i) => (
            <Col xs='12' md='6' xl='6' key={i}>
              <SmallWidgets data={data} />
            </Col>
          ))}
        </>
      
    );
  };

export default CardsSection
