// // import DefaultDashboard from '../../../GlobalDashboard/Default/index'
// import React, { Fragment } from 'react'
// import { Card, Col, Container, Row } from 'react-bootstrap';
// import ForkLiftTotalCard from '../../../CompanyDashbaord/Components/ForkLiftTotalCard'
// import smallCards from '../../../../../Data/SmallCards/smallCardData'
// // import Donut from '../../../../../Data/SmallCards/smallCardData'
// import DoughnutChartClass from "../../../../Charts/ChartsJs/DoughnutChart";
// import Chart from "react-apexcharts";
// import { BorderTop } from '../../../../../Constant';

// const FactoryOne = () => {
//   // factory previous Code
//   // const title = 'ICF Factory';
//   // <DefaultDashboard type={'factory-one'} mainTitle={title} />

//   const donut = {
//     options: {
//       grid: {
//         padding: {
//           top: 20,
//           bottom: 30,
//           left: 20,
//           right: 20
//         }
//       },
//       chart: {
//         height: 440,
//         type: 'donut',
//         toolbar: {
//           show: false
//         }
//       },
//       labels: ['PPE Module', 'Emergency Exit', 'Forklift', 'Machine Guard'], // Labels for each section
//       colors: ['#0b76b7', '#41b2ef', '#83cdf6', '#bde3fa'],
//       dataLabels: {
//         enabled: false
//       },
//       legend: {
//         show: true,
//         position: 'bottom',
//         markers: {
//           size: 7,
//           shape: 'square',
//         },
//         formatter: function (label, opts) {
//           const series = opts.w.globals.series;
//           const total = series.reduce((acc, val) => acc + val, 0);
//           const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(0);
//           return `<div style="width:160px; display:flex; justify-content:space-between; align-items:center; color: #6D6F70;">${label} <span>${percentage}%</span></div>`;
//         },
//         labels: {
//           colors: ['#6D6F70'], // Color for legend text
//           fontSize: '12px',
//         },
//         offsetX: 7,
//         offsetY: -7,
//       },
//       plotOptions: {
//         pie: {
//           donut: {
//             size: '55%', // Increase the size of the donut
//             labels: {
//               show: true,
//               name: {
//                 show: false,
//                 fontSize: '22px',
//                 fontFamily: 'Helvetica, Arial, sans-serif',
//                 color: '#373d3f',
//                 offsetY: -10
//               },
//               value: {
//                 show: true,
//                 fontSize: '30px',
//                 fontFamily: 'Helvetica, Arial, sans-serif',
//                 fontWeight: 'bold',
//                 color: '#6D6F70', // Set the color for the value inside the donut
//                 offsetY: 16,
//                 formatter: function (val) {
//                   return val + "%";
//                 }
//               },
//               total: {
//                 show: true,
//                 color: '#6D6F70', // Set the color for the total
//                 formatter: function (w) {
//                   // Find and return the maximum value from the series
//                   const maxValue = Math.max(...w.globals.seriesTotals);
//                   return `${maxValue}%`;
//                 }
//               }
//             }
//           }
//         }
//       },
//     },
//     series: [40, 30, 20, 10], // Your data
//   };
  
//   const chartOptions = {
//     chart: {
//       type: 'bar',
//       height: 440,
//       toolbar: {
//         show: false
//       }
//     },
//     title: {
//       text: 'Alerts', // Your title here
//       align: 'left',
//       floating: false,
//       offsetX: 7,
//       offsetY: 10,
//       style: {
//         fontSize: '15px', // Font size of the title
//         color: '#6d6f70', // Title color, you can change it dynamically
//         fontFamily: 'Arial',
//         fontWeight: '400'
//       }
//     },
//     plotOptions: {
//       bar: {
//         distributed: true, // Different colors for each bar
//         borderRadius: 5, // Rounds the top borders of bars
//         columnWidth: '70%', // Increase bar width, adjust as needed
//         horizontal: false
//       }
//     },
//     colors: ['#0b76b7', '#41b2ef', '#83cdf6'], // Custom colors for each bar
//     dataLabels: {
//       enabled: false
//     },
//     xaxis: {
//       categories: ['Production', 'Warehouse', 'Factory Office'],
//       labels: {
//         style: {
//           colors: ['#6D6F70'], // Color for the x-axis values
//           fontSize: '12px'
//         }
//       },
//       title: {
//         // text: 'Category'
//       }
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: ['#6D6F70'], // Color for the y-axis values
//           fontSize: '12px'
//         }
//       },
//       title: {
//         // text: 'Alerts'
//       }
//     },
//     legend: {
//       show: true,
//       position: 'right', // Legends on the right
//       floating: false, // Legends don't float, fixed to the right
//       offsetY: 120, // Vertically center the legend
//       offsetX: 0, // Adjust X offset to move the legend to the right
//       formatter: function (label, opts) {
//         const series = opts.w.globals.series[0]; // Access the data array
//         const total = series.reduce((acc, val) => acc + val, 0);
//         const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(0);
//         return `<div style="width:150px; display:flex; justify-content:space-between; align-items:center;">${label} <span>${percentage}%</span></div>`;
//       },
//       markers: {
//         fillColors: ['#0b76b7', '#41b2ef', '#83cdf6'], // Match legend colors to bars
//         radius: 5 // Rounded borders of the legend markers
//       },
//       labels: {
//         colors: '#6D6F70', // Color for legend text
//         fontSize: '12px',
//       },
//     },
//     series: [
//       {
//         data: [450, 350, 250] // Data for each bar
//       }
//     ]
//   };
  
//   return (
//     <Fragment>
//       <Container className='dashboard-first-page' fluid={true}>
//         <Row xs='12' >
//           <Col xs='12' xxl='6' >
//             <Card>
//               Big Chart
//             </Card>
//           </Col>
//           <Col xs='12' lg='6' xxl='3' >

//             {smallCards.map((data, index) => (
//               <ForkLiftTotalCard data={data} TotalFont='20px' padding='px-5 py-2' BarWidth='130' />
//             ))}

//           </Col>
//           <Col xs='12' lg='6' xxl='3' >
//             <Card>
//               <Chart
//                 options={donut.options}
//                 series={donut.series}
//                 type="donut"
//                 height={donut.options.chart.height}
//               />
//             </Card>
//           </Col>
//         </Row>

//         <Row>
//           <Col xs='12' xxl='5' >
//             <Card  className='area-cardd'>
            
//               <Chart
//                 options={chartOptions}
//                 series={chartOptions.series}
//                 type="bar"
//                 height="350"
//               />
//             </Card>
//           </Col>
//           <Col xs='12' xxl='7' >
//             <Card>
//               Table
//             </Card>
//           </Col>
//         </Row>
//       </Container>




//       {/* Factory previous Code */}
//       {/* <DefaultDashboard type={'factory-one'} mainTitle={title} /> */}
//     </Fragment>
//   )
// }

// export default FactoryOne;
import React from 'react'
import Production from '../../AreawiseReports/production/Production'

const FactoryOne = () => {
  return (
    <>
      <Production />
    </>
  )
}

export default FactoryOne

