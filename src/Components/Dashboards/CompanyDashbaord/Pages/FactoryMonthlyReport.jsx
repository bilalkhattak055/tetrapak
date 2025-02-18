import { GatesData2, GatesData3 } from '../../../../Data/DefaultDashboard';
import { SmallWidgetsData2, SmallWidgetsData3 } from '../../../../Data/Ecommerce';
import { apexAreaChart2, apexAreaChart3, apexBarChart2, apexBarChart3 } from '../../../Charts/ApexCharts/apexData';
import Production from '../../GlobalDashboard/AreawiseReports/production/Production';
import GlobalDashboard from '../../GlobalDashboard/Default/index'
const FactoryMonthlyReport = () => {
  const blockage = "Blockage";
  const noBlockage = "No Blockage";
  const blockagePercent = 50;
  const noBlockagePercent = 50;
  const color1 = '#bde3fa'; 
  const color2 = '#0b76b7';

  const AllData = {
    donut: {
      labels: [blockage, noBlockage],
      colors: [color1, color2],
      series: [noBlockagePercent, blockagePercent],
    },
    blockageOverTime: {
           apexData: apexAreaChart3
    },
    apexBarChart: apexBarChart3,
    SmallWidgetsData: SmallWidgetsData3,
    GatesData:GatesData3

  }

  return (
    <>
    {/* <GlobalDashboard newData={AllData} type='monthly'/> */}
   <Production mainTitle={'Monthly Report'}  type={'area'}/>

    </>

  );
}

export default FactoryMonthlyReport;
   
