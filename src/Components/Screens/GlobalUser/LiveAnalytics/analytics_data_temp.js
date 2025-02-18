import { Legend } from "chart.js";

class ConfigDB {
  static data = {
    settings: {
      layout_type: "ltr",
      sidebar: {
        type: "compact-wrapper",
        iconType: "stroke-svg",
      },
      sidebar_setting: "default-sidebar",
    },
    color: {
      primary_color: localStorage.getItem("default_color") || "#7366ff",
      secondary_color: localStorage.getItem("secondary_color") || "#f73164",
      mix_background_layout: "light-only",
    },
    router_animation: "fadeIn",
  };
}

//  '#7366ff'
const primary =
  localStorage.getItem("default_color") || ConfigDB.data.color.primary_color;
//  '#f73164'
const secondary =
  localStorage.getItem("secondary_color") ||
  ConfigDB.data.color.secondary_color;

export const progress1 = {
  series: [
    {
      name: "Alerts",
      data: [44],
    },
  ],
  options: {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: [primary],
          backgroundBarOpacity: 0.2,
        },
      },
    },
    colors: [primary],
    stroke: {
      width: 0,
    },
    fill: {
      colors: [primary],
      type: "gradient",
      opacity: 1,
      gradient: {
        gradientToColors: [primary],
      },
    },

    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Helmet",
      style: {
        fontSize: "16px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "44%",
      style: {
        fontSize: "14px",
      },
    },
    // tooltip: {
    //   enabled: true,
    //   custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //     const value = series[seriesIndex][dataPointIndex];
    //     return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
    //               <span><strong>Module:</strong> Helmet</span>
    //               <span><strong>Area:</strong> AO-1</span>
    //               <span><strong>Alerts:</strong> 24</span><br>
    //             </div>`;
    //   }
    // },
    tooltip: {
      enabled: true,
      shared: true,  // Ensures that the tooltip appears for the entire bar
      intersect: false,
      y: {
        formatter: (value) => `${value}%`,
      },
      // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      //   const value = series[seriesIndex][dataPointIndex];
      //   return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
      //             <span><strong>Max alerts by AO-1 (Adil)</strong></span>
      //             <span><strong>Sub Area:</strong> palletizing corridor</span>
      //             <span><strong>Alerts:</strong> 24</span>
      //           </div>`;
      // },
      style: {
        fontSize: '12px',
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      fixed: {
        enabled: true,
        position: 'topLeft',  // Fixing the position (optional)
        offsetY: 30,  // Shift tooltip 30px down
      }
    },
    xaxis: {
      categories: ["Helmet Module"],
    },
    yaxis: {
      max: 100,
    },

    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  },
};

export const progress2 = {
  series: [
    {
      name: "Alerts",
      data: [40],
    },
  ],
  options: {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: [secondary],
          backgroundBarOpacity: 0.2,
          backgroundBarRadius: 10,
        },
      },
    },
    colors: [secondary],
    stroke: {
      width: 0,
    },

    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Vest",
      style: {
        fontSize: "16px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "44%",
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: true,
      shared: true,  // Ensures that the tooltip appears for the entire bar
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
                  <span><strong>Max alerts by AO-2 (Aftab)</strong></span>
                  <span><strong>Sub Area:</strong> Catch pit area</span>
                  <span><strong>Alerts:</strong> 14</span>
                </div>`;
      },
    },
    xaxis: {
      categories: ["Vest Module"],
    },
    yaxis: {
      max: 100,
    },
    fill: {
      colors: [secondary],
      type: "gradient",
      gradient: {
        inverseColors: false,
        gradientToColors: [secondary],
      },
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  },
};

export const progress3 = {
  series: [
    {
      name: "Alerts",
      data: [50],
    },
  ],
  options: {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: ["#a927f9"],
          backgroundBarOpacity: 0.2,
          backgroundBarRadius: 10,
        },
      },
    },
    colors: ["#a927f9"],
    stroke: {
      width: 0,
    },

    fill: {
      colors: ["#a927f9"],
      type: "gradient",
      gradient: {
        gradientToColors: ["#a927f9"],
      },
    },
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Emergency Exit",
      style: {
        fontSize: "16px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "50%",
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: true,
      shared: true,  // Ensures that the tooltip appears for the entire bar
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
                  <span><strong>Max alerts by AO-5 (Dr. Amjad)</strong></span>
                  <span><strong>Sub Area:</strong> OHC</span>
                  <span><strong>Alerts:</strong> 33</span>
                </div>`;
      },
    },
    xaxis: {
      categories: ["Emergency Exit"],
    },
    yaxis: {
      max: 100,
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  },
};

export const progress4 = {
  options: {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: ["#F8D62B"],
          backgroundBarOpacity: 0.2,
          backgroundBarRadius: 10,
        },
      },
    },
    colors: ["#F8D62B"],
    stroke: {
      width: 0,
    },

    fill: {
      colors: ["#F8D62B"],
      type: "gradient",
      gradient: {
        gradientToColors: ["#F8D62B"],
      },
    },
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Machine Guard",
      style: {
        fontSize: "16px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "60%",
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: true,
      shared: true,  // Ensures that the tooltip appears for the entire bar
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
                  <span><strong>Max alerts by AO-3 (Arsalan)</strong> </span>
                  <span><strong>Sub Area:</strong> DP store area</span>
                  <span><strong>Alerts:</strong> 43</span>
                </div>`;
      },
    },
    xaxis: {
      categories: ["Machine Guard"],
    },
    yaxis: {
      max: 100,
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Alerts",
      data: [60],
    },
  ],
};

export const progress5 = {
  options: {
    chart: {
      height: 70,
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "15%",
        colors: {
          backgroundBarColors: ["#51BB25"],
          backgroundBarOpacity: 0.2,
          backgroundBarRadius: 10,
        },
      },
    },
    colors: ["#51BB25"],
    stroke: {
      width: 0,
    },

    fill: {
      colors: ["#51BB25"],
      type: "gradient",
      gradient: {
        gradientToColors: ["#51BB25"],
      },
    },
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "MMHE",
      style: {
        fontSize: "16px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 500,
      },
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "74%",
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: true,
      shared: true,  // Ensures that the tooltip appears for the entire bar
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `<div class="custom-tool" style="display: flex; flex-direction: column; background-color: #333; color: #fff; border-radius: 3px;">
                  <span><strong>Max alerts by AO-1 (Dr. Amjad)</strong></span>
                  <span><strong>Sub Area:</strong> OHC</span>
                  <span><strong>Alerts:</strong> 30</span>
                </div>`;
      },
    },
    xaxis: {
      categories: ["MMHE Module"],
    },
    yaxis: {
      max: 100,
    },
    responsive: [
      {
        breakpoint: 767,
        options: {
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Alerts",
      data: [74],
    },
  ],
};

export const RecentOrderChart = {
  series: [80, 20] ,
  options: {
    chart: {
      height: 280,
      type: "radialBar",
    },

    series: [67],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Compliance"],
  },
};

// export const TurnoverChart = {
//   options: {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//       height: 300,
//       type: "area",
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: [4,2,2,2,2,2,2],
//       curve: "smooth",
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//       ],
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     grid: {
//       borderColor: "rgba(196,196,196, 0.3)",
//       padding: {
//         top: -20,
//         right: -55,
//         bottom: 0,
//       },
//     },
//     fill: {
//       opacity: 0.5,
//     },
//     colors: ["#2f84f4",primary, secondary,"#a927f9", "#ffaa05", "#54ba4a"],
//     dataLabels: {
//       enabled: true,
//       enabledOnSeries: [0],
//     },
//     // markers: {
//     //   size: 2,
//     //   strokeColors: "#736fff",
//     //   strokeWidth: 15,
//     //   strokeOpacity: 0.9,
//     //   strokeDashArray: 0,
//     //   fillOpacity: 1,
//     //   shape: "square",
//     //   hover: {
//     //     size: 2,
//     //     sizeOffset: 0,
//     //   },
//     // },

//     tooltip: {
//       x: {
//         format: "dd/MM/yy HH:mm",
//       },
//     },
//   },
//   series: [
//     {
//       name: "Total",
//       data: [642, 864, 275, 623, 315, 718, 894, 644, 478, 857, 845, 845,],
//     },
//     {
//       name: "Helmet",
//       data: [108, 199, 60, 80, 90, 100, 105, 223, 60, 210, 30, 30, ],
//     },
//     {
//       name: "Vest",
//       data: [69, 210, 40, 100, 110, 98, 209, 90, 100, 290, 190, 190, ],
//     },
//     {
//       name: "Emergency Exit",
//       data: [230, 240, 30, 218, 50, 210, 90, 80, 118, 100, 115, 115, ],
//     },
//     {
//       name: "Machine Guard",
//       data: [20, 190, 110, 180, 10, 245, 223, 95, 105, 67, 200, 200, ],
//     },
//     {
//       name: "MMHE",
//       data: [215, 25, 35, 45, 55, 65, 167, 156, 95, 190, 210, 210, ],
//     },
//   ]

// };


// export const TurnoverChart = {
//   options: {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//       height: 300,
//       type: "area",
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: [4, 2, 2, 2, 2, 2, 2],
//       curve: "smooth",
//     },
//     xaxis: {
//       categories: [
//         "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"
//       ],
//       labels: {
//         labels: {
//           rotate: -45,  // Rotate labels by 45 degrees
//           style: {
//             fontSize: '12px',  // Set the font size for normal screens
//           },
         
//         },
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//         labels: {
//           style: {
//             fontSize: '10px',  // Reduce font size for mobile
//           },
//         },

//       },

//     },
//     grid: {
//       borderColor: "rgba(196,196,196, 0.3)",
//       padding: {
//         top: -20,
//         right: 10,  // Adjust padding for mobile
//         bottom: 0,
//       },
//     },
//     fill: {
//       opacity: 0.5,
//     },
//     colors: ["#2f84f4", primary, secondary, "#a927f9", "#ffaa05", "#54ba4a"],
//     dataLabels: {
//       enabled: true,
//       enabledOnSeries: [0],
//     },
//     tooltip: {
//       x: {
//         format: "dd/MM/yy HH:mm",
//       },
//     },
//     Legend: {
//       offsetY: 5,
//       itemMargin: {
//         horizontal: 5,
//         vertical: 5,
//       },
//     },

//     responsive: [
//       {
//         breakpoint: 768,
//         options: {
//           chart: {
//             height: 250,
//           },
//           grid: {
//             padding: {
//               right: 0,
//               left: 0,
//             },
//           },

//           xaxis: {
//             labels: {
//               rotate: -45,
//               style: {
//                 fontSize: '6px',
//               },
//             },

//           },
//           yaxis: {
//             labels: {
//               style: {
//                 fontSize: '6px',
//               },
//             }
//           },
//           dataLabels: {
//             enabled: false,
//           },
//         },
//       },
//     ],
//   },
//   series: [
//     {
//       name: "Total",
//       data: [642, 864, 275, 623, 315, 718, 894, 644, 478, 857, 845, 845],
//     },
//     {
//       name: "Helmet",
//       data: [108, 199, 60, 80, 90, 100, 105, 223, 60, 210, 30, 30],
//     },
//     {
//       name: "Vest",
//       data: [69, 210, 40, 100, 110, 98, 209, 90, 100, 290, 190, 190],
//     },
//     {
//       name: "Emergency Exit",
//       data: [230, 240, 30, 218, 50, 210, 90, 80, 118, 100, 115, 115],
//     },
//     {
//       name: "Machine Guard",
//       data: [20, 190, 110, 180, 10, 245, 223, 95, 105, 67, 200, 200],
//     },
//     {
//       name: "MMHE",
//       data: [215, 25, 35, 45, 55, 65, 167, 156, 95, 190, 210, 210],
//     },
//   ],
// };


export const TurnoverChart = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 320,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [4, 2, 2, 2, 2, 2, 2],
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"
      ],
      labels: {
        rotate: -45,  // Rotate labels by 45 degrees
        rotateAlways: true,
        style: {
          fontSize: '12px',  // Set the font size for normal screens
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    grid: {
      borderColor: "rgba(196,196,196, 0.3)",
      padding: {
        top: -20,
        right: 10,  // Adjust padding for mobile
        bottom: 0,
      },
    },
    fill: {
      opacity: 0.5,
    },
    // colors: ["#635470", primary, secondary, "#a927f9", "#ffaa05", "#54ba4a"],
    colors: ["#635470", "#23946c", "#e69151", "#8e66ff", "#f1ca32", "#26b6b4"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0], 
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {  // Fixed 'Legend' to 'legend'
      offsetY: 2,
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          grid: {
            padding: {
              right: 10,
              left: 5,
            },
          },
          xaxis: {
            labels: {
              rotate: -65,  // Rotate labels by 45 degrees for small screens
              style: {
                fontSize: '11px',  // Reduce font size for small screens
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '9px',
              },
            },
          },
          legend: {  // Fixed 'Legend' to 'legend'
             fontSize: '11px',
            offsetY: -5,
            itemMargin: {
              horizontal: 5,
           
            },
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Total",
      data: [642, 864, 275, 623, 315, 718, 894, 644, 478, 857, 845],
    },
    {
      name: "Helmet",
      data: [108, 199, 60, 80, 90, 100, 105, 223, 60, 210, 30],
    },
    {
      name: "Vest",
      data: [69, 210, 40, 100, 110, 98, 209, 90, 100, 290, 190, ],
    },
    {
      name: "Emergency Exit",
      data: [230, 240, 30, 218, 50, 210, 90, 80, 118, 100, 115, ],
    },
    {
      name: "Machine Guard",
      data: [20, 190, 110, 180, 10, 245, 223, 95, 105, 67, 200, ],
    },
    {
      name: "MMHE",
      data: [215, 25, 35, 45, 55, 65, 167, 156, 95, 190, 210, ],
    },
  ],
};


// for new design
export const TurnoverChart2 = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 320,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [4, 2, 2, 2, 2, 2, 2],
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"
      ],
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,  // Ensuring x-axis border is visible
        color: '#cccccc'
      },
      axisTicks: {
        show: false,  // Ensuring x-axis ticks are visible
        color: '#cccccc'
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,  // Ensuring y-axis border is visible
        color: '#cccccc'
      },
      axisTicks: {
        show: false,  // Ensuring y-axis ticks are visible
        color: '#cccccc'
      },
    },
    grid: {
      show: true,  // Ensure the grid is enabled
      borderColor: '#cccccc',  // Set the grid line color
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    
    fill: {
      opacity: 0.5,
    },
    colors: ["#2f84f4", "#FF6384", "#36A2EB", "#a927f9", "#ffaa05", "#54ba4a"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {
      show:false,
      offsetY: 2,
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -65,
              style: {
                fontSize: '11px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '9px',
              },
            },
          },
          legend: {
            fontSize: '11px',
            offsetY: -5,
            itemMargin: {
              horizontal: 5,
            },
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Total",
      data: [642, 864, 275, 623, 315, 718, 894, 644, 478, 857, 845],
    },
    // Additional series...
  ],
};

export const dummyforcandel = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 320,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [4, 2, 2, 2, 2, 2, 2],
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun", 
      ],
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,  // Ensuring x-axis border is visible
        color: '#cccccc'
      },
      axisTicks: {
        show: false,  // Ensuring x-axis ticks are visible
        color: '#cccccc'
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,  // Ensuring y-axis border is visible
        color: '#cccccc'
      },
      axisTicks: {
        show: false,  // Ensuring y-axis ticks are visible
        color: '#cccccc'
      },
    },
    grid: {
      show: true,  // Ensure the grid is enabled
      borderColor: '#cccccc',  // Set the grid line color
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    
    fill: {
      opacity: 0.5,
    },
    colors: ["#2f84f4", "#FF6384", "#36A2EB", "#a927f9", "#ffaa05", "#54ba4a"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {
      show:false,
      offsetY: 2,
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              rotate: -65,
              style: {
                fontSize: '11px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '9px',
              },
            },
          },
          legend: {
            fontSize: '11px',
            offsetY: -5,
            itemMargin: {
              horizontal: 5,
            },
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
    ],
  },
  series: [
    {
      name: "Total",
      data: [135, 0, 0, 0, 0, 0, 0, ],
    },
    // Additional series...
  ],
};



