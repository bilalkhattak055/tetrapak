// import React from 'react'
// import GlobalDashboard from '../../../GlobalDashboard/Default/index'
// import { apexAreaChart2, apexBarChart2 } from '../../../../Charts/ApexCharts/apexData';
// import { SmallWidgetsData2 } from '../../../../../Data/Ecommerce';
// import { GatesData2 } from '../../../../../Data/DefaultDashboard';

// const WareHouse = () => {
//   const blockage = "Blockage";
//   const noBlockage = "No Blockage";
//   const blockagePercent = 25;
//   const noBlockagePercent = 75;
//   const color1 = '#d3e4ff';
//   const color2 = '#0b57d0';

//   const AllData = {
//     donut: {
//       labels: [blockage, noBlockage],
//       colors: [color1, color2],
//       series: [noBlockagePercent, blockagePercent],
//     },
//     blockageOverTime: {
//            apexData: apexAreaChart2
//     },
//     apexBarChart: apexBarChart2,
//     SmallWidgetsData: SmallWidgetsData2,
//     GatesData:GatesData2

//   }

//   return (
//     <>
//      <GlobalDashboard newData={AllData} type='Warehouse' />
//     </>

//   );
// }
// export default WareHouse;
import React from 'react'
import Production from '../production/Production'

const WareHouse = () => {
  return (
    <div>
      <Production mainTitle='Warehouse' />
    </div>
  )
}

export default WareHouse

