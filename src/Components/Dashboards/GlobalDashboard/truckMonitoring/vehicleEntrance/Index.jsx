import React, { Fragment } from 'react';
import { Button, Col, Container } from 'reactstrap';
import { H2 } from '../../../../../AbstractElements';
import DownloadBtn from '../../../../Common/CommonButton/DownloadBtn';
import "./vehicleEntrnce.css"
import LiveAnalytics from '../components/LiveAnalytics';
import VehicleEntranceSection from '../components/VehicleEntranceSection';
import ShiftSection from '../components/ShiftSection';
import FinishedProductSection from '../components/FinishedProductSection';

const Index = ({headingText}) => {

  const heading = headingText || 'Vehicle Entrance Dashboard'
  
  return (
    <Fragment>

      <Container className="dashboard-first-page machine-guard" fluid={true}>

        <div className="row d-flex justify-content-between" style={{ marginTop: '15px', marginBottom: '15px' }} >

          <H2 attrH2={{ className: 'col-xs-12 col-sm-6' }}>{heading}</H2>
          <Col sm='6' xs='12' className=''>
            <div className='w-100 d-flex justify-content-end'>
              <DownloadBtn />
              <Button
                outline
                className='vehicleDetails'
              >
              Vehicle Details
              </Button>
            </div>
          </Col>
        </div>
        <LiveAnalytics />
        <VehicleEntranceSection />
        <ShiftSection />
        <FinishedProductSection />
      </Container>
    </Fragment>

  )
}

export default Index