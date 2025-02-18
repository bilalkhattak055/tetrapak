import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Card, Container, Row, Col, CardBody, CardHeader } from 'react-bootstrap'
import Loader3 from '../../../../CommonElements/Spinner/loader3'
import { RecentOrderChart } from "./analytics_data_temp";
import ReactApexChart from "react-apexcharts";
import { ArrowDown, ArrowUp, Filter } from "react-feather";
import "../AIModelReports/custom.css";
import { errorToast, getWeek } from "../../../../_helper/helper";
import { dummyJSON, Shifts } from "../../../../Data/staticData/data";
import ApexInteractiveHeatmap from "./components/HeatMap";
import ProgressBars from "./components/ProgressBars";
import AlertsTrendChart from "./components/AlertsTrendChart";
import AreaService from "../../../../api/areaService";
import { getCurrentWeekNumber } from "../../../../utils/getCurrentWeekNumber";
import CameraService from "../../../../api/cameraService";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import { analyticsPageService } from "../../../../api/analyticsPageService";
import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
import { Input } from "reactstrap";
import './components/alertTrend.css'
import { LuBuilding2 } from "react-icons/lu";
import { TiLocationArrowOutline } from "react-icons/ti";
import { GoLocation } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbAlertSquareRounded } from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import { formatMonth, formatWeek } from "../../../../utils/formatDate";


// for candel project
// import ICISafety from "./ICI Safety/ICIsafety";
import CardsSection from './New_Page_Live_Analytics'
import CommonHeading from "../../../Common/commonHeading/CommonHeading";
import AnalyticsPage from "./AnalyticsPage";
const LiveAnalyticsScreen = () => {
  const [currentWeekWithYear, setcurrentWeekWithYear] = useState(getCurrentWeekWithYear())
useEffect(() => {
  
}, [])

  return (
    <Fragment>
      <br />
      <Container fluid={true}>

        <CommonHeading text={'Live Analytics'} padding={'pb-0 '}/>

        <p className="f-light mt-0">{`${currentWeekWithYear?.split('-')[0]}-Week ${currentWeekWithYear?.split('-')[1]?.replace('W','')} Data` || 'Current week'}</p>

        {/* <ICISafety/> */}
        <AnalyticsPage />
      </Container>
    </Fragment>
  );
};

export default LiveAnalyticsScreen;
