import GlobalDashboard from '../../GlobalDashboard/Default/index'
import { apexAreaChart2, apexBarChart2 } from "../../../Charts/ApexCharts/apexData";
import {  SmallWidgetsData2 } from "../../../../Data/Ecommerce";
import { GatesData2 } from "../../../../Data/DefaultDashboard";
import Production from '../../GlobalDashboard/AreawiseReports/production/Production';

const FactoryWeeklyReport = () => {
  const blockage = "Blockage";
  const noBlockage = "No Blockage";
  const blockagePercent = 25;
  const noBlockagePercent = 75;
  const color1 = '#bde3fa'; 
  const color2 = '#0b76b7';

  const AllData = {
    donut: {
      labels: [blockage, noBlockage],
      colors: [color1, color2],
      series: [noBlockagePercent, blockagePercent],
    },
    blockageOverTime: {
           apexData: apexAreaChart2
    },
    apexBarChart: apexBarChart2,
    SmallWidgetsData: SmallWidgetsData2,
    GatesData:GatesData2

  }

  return (
    <>
     {/* <GlobalDashboard newData={AllData} type='Weekly'/> */}
   <Production mainTitle={'Weekly Report'} type={'area'} />

    </>

  );
}

export default FactoryWeeklyReport;
  
