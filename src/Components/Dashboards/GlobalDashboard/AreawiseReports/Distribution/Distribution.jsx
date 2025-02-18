// import React from 'react'
// import FactoryDashboard from '../../../CompanyDashbaord/Pages/FactoryDashboard'
// import { Container } from 'reactstrap'
// import GlobalDashboard from '../../../GlobalDashboard/Default/index'
// import { apexAreaChart5, apexBarChart5 } from '../../../../Charts/ApexCharts/apexData';
// import { SmallWidgetsData2 } from '../../../../../Data/Ecommerce';
// import { GatesData5 } from '../../../../../Data/DefaultDashboard';
// const Distribution = () => {
//   const blockage = "Blockage";
//   const noBlockage = "No Blockage";
//   const blockagePercent = 78;
//   const noBlockagePercent = 22;
//   const color1 = '#d3e4ff';
//   const color2 = '#0b57d0';

//   const AllData = {
//     donut: {
//       labels: [blockage, noBlockage],
//       colors: [color1, color2],
//       series: [noBlockagePercent, blockagePercent],
//     },
//     blockageOverTime: {
//            apexData: apexAreaChart5
//     },
//     apexBarChart: apexBarChart5,
//     SmallWidgetsData: SmallWidgetsData2,
//     GatesData:GatesData5

//   }

//   return ( 
//       < >
//         {/* <FactoryDashboard /> */}
//         <GlobalDashboard newData={AllData} type='Distribution' />
//       </> 
//   )
// }

// export default Distribution

import React from 'react'
import Production from '../production/Production'

const Distribution = () => {
  return (
    <>
      <Production mainTitle={'Distribution'} />
    </>
  )
}

export default Distribution

