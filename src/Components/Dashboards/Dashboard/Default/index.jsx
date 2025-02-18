import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Breadcrumbs, H2, H4 } from "../../../../AbstractElements";

import DoughnutChartClass from "../../../Charts/ChartsJs/DoughnutChart";
import GatesSection from "../components/Gates/GatesSection";
import BlockageOvertime from "../../../BlockageOvertime/BlockageOvertime";
import Alerts from "../../../Alerts/Alerts";
import WidgetsGrid from "../../GlobalDashboard/Default/WidgetsGrid";
import Calendar from "../components/calendarTiming/Calendar";
import img from '../../../../assets/images/dashboard/vieww.svg'
import ImageGallery from "../../../../Gallery/HoverGallery/ImageGallery";
// import { apexAreaChart } from './apexData';
import { apexAreaChart4, apexBarChart4 } from '../../../../Components/Charts/ApexCharts/apexData';
import { useNavigate } from "react-router";
import { SmallWidgetsData4 } from "../../../../Data/Ecommerce";
import { GatesData4 } from "../../../../Data/DefaultDashboard";
import { Link } from "react-router-dom";
import ViewAllButton from '../../../Common/newButton/index'

const Dashboard = ({ mainTitle, newData, title:factoryName }) => {
  const role = JSON.parse(localStorage.getItem('role'));
  const Navigate = useNavigate();

  const blockage = "Blockage";
  const noBlockage = "No Blockage";
  const blockagePercent = 40;
  const noBlockagePercent = 60;
  const color1 = '#d3e4ff';
  const color2 = '#0b57d0';

  const AllData = {
    donut: {
      labels: [blockage, noBlockage],
      colors: [color1, color2],
      series: [noBlockagePercent, blockagePercent],
    },
    blockageOverTime: {
      apexData: apexAreaChart4
    },
    apexBarChart: apexBarChart4,
    SmallWidgetsData: SmallWidgetsData4,
    GatesData: GatesData4

  }

  const data = newData || AllData


  const viewClick = () => {
    Navigate(`${process.env.PUBLIC_URL}/dashboard/live-camera/${role}`)
  }
  return (
    <Fragment>

      <Container className="dashboard-first-page" fluid={true}>
  
        <Row  >
          <Col xl='6' lg='5' md='12' >
          {factoryName &&  <H4 className='border'>{factoryName}</H4>}
          {!factoryName &&  <H4 className='border'>{role === 'super-admin' ? 'Dashboard' : mainTitle}</H4>}
          </Col>
          <Col xl='6' lg='7' md='12' className='d-flex justify-content-xl-end justify-content-lg-end justify-content-sm-left justify-content-md-left justify-content-left '>

            <Calendar />

          </Col>
        </Row>

        <Row className="widget-grid">

          <DoughnutChartClass donutData={data.donut} />
          <GatesSection GatesData={data.GatesData} />
          <BlockageOvertime apexCharData={data.blockageOverTime.apexData} />
          <Alerts data={data.apexBarChart} />


        </Row>
        <div className="d-flex justify-content-between" style={{ marginTop: '15px', marginBottom: '15px' }} >
          <p className="m-0 p-0" style={{ fontSize: '17px' }}>Emergency Alerts</p>
          {/* <Calendar /> */}
          <Link to={`${process.env.PUBLIC_URL}/dashboard/live-alerts/${role}`}>
           <ViewAllButton btnText='View All' icon={img} />
             </Link>

        </div>
        <Row>
          <WidgetsGrid SmallWidgetsData={data.SmallWidgetsData} />
        </Row>
        <div className="d-flex justify-content-between" style={{ marginTop: '15px', marginBottom: '15px' }} >
          <p className="m-0 p-0" style={{ fontSize: '17px' }}>Latest Alerts</p>
          {/* <Calendar /> */}
          <Link to={`${process.env.PUBLIC_URL}/dashboard/live-camera/${role}`}>
          <ViewAllButton btnText='View All' icon={img} />
           
            {/* <button type="button" className="btn btn-primary" style={{ fontSize: '14px', padding: '2px 12px' }}>View All <span><img className="ms-1" src={img} alt="" /></span></button> */}
          </Link>

        </div>
        <Row>
          <ImageGallery />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
