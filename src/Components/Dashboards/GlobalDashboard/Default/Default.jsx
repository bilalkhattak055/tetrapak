import React from 'react'
import { GatesData, GatesData1 } from '../../../../Data/DefaultDashboard';
import { SmallWidgetsData, SmallWidgetsData1 } from '../../../../Data/Ecommerce';
import { apexAreaChart, apexAreaChart1, apexBarChart, apexBarChart1 } from '../../../Charts/ApexCharts/apexData';
import GlobalDashboard from '../../GlobalDashboard/Default/index'
export default function Default () {
    const blockage = "Blockage";
  const noBlockage = "No Blockage";
  const blockagePercent = 80;
  const noBlockagePercent = 20;
  const color1 = '#0b76b7'; 
  const color2 = '#bde3fa';

  const AllData = {
    donut: {
      labels: [blockage, noBlockage],
      colors: [color1, color2],
      series: [noBlockagePercent, blockagePercent],
    },
    blockageOverTime: {
           apexData: apexAreaChart1
    },
    apexBarChart: apexBarChart1,
    SmallWidgetsData: SmallWidgetsData1,
    GatesData:GatesData1

  }
  return (
   <>
   <GlobalDashboard newData={AllData} type={'Default'}/>
   </>
  )
}
