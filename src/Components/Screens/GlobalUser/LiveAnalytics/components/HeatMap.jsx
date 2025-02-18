import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Card } from "react-bootstrap";
import Chart from 'react-apexcharts';
import '../liveanalytics.css'
import CustomizerContext from '../../../../../_helper/Customizer';
import throttle from 'lodash.throttle';
import { useNavigate } from 'react-router';
// import './liveanalytics.css'


// const areas = ['Helmet', 'Vest', 'E. Exit', 'Guard', 'MMHE'];
// const subAreas = ['AO-1', 'AO-2', 'AO-3', 'AO-4', 'AO-5', 'AO-6', 'AO-7', 'AO-8', 'AO-9', 'AO-10', 'AO-11', 'AO-12', 'AO-13', 'AO-14', 'AO-15'];
// const areaOwner = ['Adil', 'Aftab', 'Arsalan', 'Ayesha Khaliq', 'Dr. Amjad', 'Meraj', 'Moazzam Ali', 'Muhammd Shahbaz', 'Muhammd Wasi', 'Nazir', 'Sadia', 'Shafiq', 'Shahbaz', 'Sheraz', 'Umair Pervaiz'];

// const generateData = () => {
//   return areas.map((area) => ({
//     name: area,
//     data: subAreas.map(() => Math.floor(Math.random() * 99))
//   }));
// };

const CustomHeatmap = ({
  heatmapData, area, moduleLength, filters
}) => {
  console.log('heatmapDataheatmapData', heatmapData)
  // const series = useMemo(() => generateData(), []);
  // const maxValue = useMemo(() => Math.max(...series.flatMap(s => s.data)), [series]);
  // const { areas, subAreas, areaOwner, data } = heatmapData;

  // Use the data from props to generate series for heatmap
  // const series = useMemo(() => data, [data]);

  // const maxValue = useMemo(() => Math.max(...series.flatMap(s => s.data.filter(val => val !== ''))), [series]);

  const { areas = [], subAreas = [], areaOwner = [], data = [], cameras=[], cameraNames = [] } = heatmapData || {};

  const newAreass = areas.map((ar) => {
    const [prefix, number] = ar.split('-'); // Split the string by '-'
    const formattedNumber = number < 10 ? `0${number}` : number; // Add leading zero if below 10
    return `${prefix}-${formattedNumber}`; // Combine prefix and formatted number
});
const [newAreas, setNewAreas] = useState(newAreass)
 

  // Ensure data is available before processings
  const series = useMemo(() => {
    return data.map(item => ({
      name: item.name,
      data: item.data.map(value => (value === '' ? 0 : value)) // Replace empty values with 0
    }));
  }, [data]);
  

  const maxValue = useMemo(() => {
    if (series.length > 0) {
      return Math.max(...series.flatMap(s => s.data));
    }
    return 100; // Default max value if no data available
  }, [series]);

  let colorGradient;
  if(area) {

  colorGradient = [
    // Lighter Red Shades
    { from: 0, to: Math.floor(maxValue * 0.05), color: '#FFE5E5', name: 'Very Low' },  // Light Red
    { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#FFCCCC', name: 'Low' },
    { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#FFB2B2', name: 'Moderate Low' },
    { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#FF9999', name: 'Medium Low' },
    { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#FF8080', name: 'Medium' },
    { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#FF6666', name: 'Medium High' },
    { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#FF4C4C', name: 'High' },
    { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#FF3333', name: 'Very High' },
    { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#FF1A1A', name: 'Extreme' },
    { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#FF0000', name: 'Critical' },  // Pure Red
  
    // Darker Red Shades (No Black, only dark reds)
    { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#E60000', name: 'Dark Red 1' },
    { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#CC0000', name: 'Dark Red 2' },
    { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#B30000', name: 'Dark Red 3' },
    { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#990000', name: 'Dark Red 4' },
    { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#800000', name: 'Dark Red 5' },
    { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#730000', name: 'Dark Red 6' },  // Darker Red (no black)
    { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#660000', name: 'Dark Red 7' },  // Deep Dark Red
    { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#590000', name: 'Dark Red 8' },  // Deeper Dark Red
    { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#4C0000', name: 'Dark Red 9' },  // Deepest Dark Red
    { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#400000', name: 'Critical Dark Red' }  // Final Dark Red (no black)
  ];

}else {

  colorGradient = [
    // Lighter Red Shades
    // { from: -1, to: Math.floor(maxValue * 0), color: '#FFE5E5', name: 'Very Low' },  // Light Red
    { from: -2, to: Math.floor(maxValue * 0.05), color: '#FFE5E5', name: 'Very Low' },  // Light Red
    { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#FFCCCC', name: 'Low' },
    { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#FFB2B2', name: 'Moderate Low' },
    { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#FF9999', name: 'Medium Low' },
    { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#FF8080', name: 'Medium' },
    { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#FF6666', name: 'Medium High' },
    { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#FF4C4C', name: 'High' },
    { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#FF3333', name: 'Very High' },
    { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#FF1A1A', name: 'Extreme' },
    { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#FF0000', name: 'Critical' },  // Pure Red
  
    // Darker Red Shades (No Black, only dark reds)
    { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#E60000', name: 'Dark Red 1' },
    { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#CC0000', name: 'Dark Red 2' },
    { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#B30000', name: 'Dark Red 3' },
    { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#990000', name: 'Dark Red 4' },
    { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#800000', name: 'Dark Red 5' },
    { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#730000', name: 'Dark Red 6' },  // Darker Red (no black)
    { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#660000', name: 'Dark Red 7' },  // Deep Dark Red
    { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#590000', name: 'Dark Red 8' },  // Deeper Dark Red
    { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#4C0000', name: 'Dark Red 9' },  // Deepest Dark Red
    { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#400000', name: 'Critical Dark Red' }  // Final Dark Red (no black)
  ];
  }

  const [chartOptions, setChartOptions] = useState({
    // chart: {
    //   type: 'heatmap',
    //   toolbar: { show: false },
    //   animatiion: true,
    //   events: {
    //     rendered: function(chartContext, config) {
    //       console.log('document.querySelectorAll', document.querySelectorAll('rect[fill="#500000"]'))
    //       const criticalCells = document.querySelectorAll(
    //         'rect[fill="#500000"]' // Selecting the "Critical Dark Red" color
    //       );
    //       console.log('criticalCells', criticalCells)
    //       console.log('chartContext', chartContext)
    //       console.log('config', config)
          
    //       criticalCells.forEach(cell => {
    //         cell.style.animation = 'blink 1s infinite'; // Applying blink animation
    //       });
    //     }
    //   }
    // },
    chart: {
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        rendered: function(chartContext, config) {
          // Loop over the series data and apply blinking to critical values
          const criticalRange = { from: Math.floor(maxValue * 0.95) + 1, to: maxValue }; // Critical Dark Red Range
  
          config.globals.series.forEach((series, seriesIndex) => {
            series.forEach((value, dataPointIndex) => {
              // Check if the value falls in the critical range
              console.log('valueeeee', value)
              if (value >= criticalRange.from && value <= criticalRange.to) {
                // Find the corresponding SVG rect element
                const cell = document.querySelector(
                  `rect[data-real-value="${value}"]` // Adjust this selector based on the SVG structure
                );
                console.log('cell', cell)
  
                if (cell) {
                  cell.style.animation = 'blink 1s infinite'; // Apply the blink animation
                }
              }
            });
          });
        }
      },
      height: moduleLength > 3 ? 350 : 300


    },
    // dataLabels: {
    //   enabled: true,
    //   style: {
    //     colors: ['#000'],
    //     fontSize: '12px',
    //   },
    // },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'], // Label color
        fontSize: '12px',
      },
      formatter: function(val) {
        // Return an empty string if the value is zero
        return val < 0 ? '' : val;
      }
    },
    colors: ["#fff7f7"],
    xaxis: {
      position: 'top',
      offsetY: 5,
      offsetX: 0,
      categories: area ? cameras : subAreas,
      // labels: {
      //   rotateAlways: true,
      //   // rotate: -45,
      //   style: { fontSize: '10px !important', dominantBaseline: 'hanging !important'  }  // Base font size for larger screens
      // }
    },

    yaxis: {
      categories: areas,
      labels: {
        style: { fontSize: '12px' }  // Consistent font size for y-axis
      }
    },
    plotOptions: {
      heatmap: {
        // enableShades: false,
        shadeIntensity: 0.3,
      distributed: true,
      radius: 10,
      useFillColorAsStroke: false,
        colorScale: {
          ranges: colorGradient
        },
        
      }
    },
   
    legend: {
      show: false
    },
    tooltip: {
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const value = w.globals.series[seriesIndex][dataPointIndex];
        const subArea = subAreas[dataPointIndex];
        const owner = areaOwner[dataPointIndex];
        const cameraName = cameraNames[dataPointIndex]
        console.log('areaOwner.length', areaOwner.length)
        return `<div class="custom-tooltip">
                  ${!cameraNames?.length ? `<span><strong>Area:</strong> ${subArea}</span><br>` : ''}
                  ${areaOwner?.length ? `<span><strong>Owner:</strong> ${owner}</span><br>` : ''}
                  ${cameraNames?.length ? `<span><strong>Camera:</strong> ${cameraName}</span><br>` : ''}
                  <span><strong>Alerts:</strong> ${value}</span>
                </div>`;
      }
    },
    responsive: [
      {
        // Mobile screens (up to 480px)
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: 250
          },
          xaxis: {
            offsetY: 10,
            offsetX: 20,
            labels: {
              style: { fontSize: '9px' }  // Smaller font for mobile
            }
          },
          yaxis: {
            labels: {
              style: { fontSize: '10px' }
            }
          }
        }
      },
      {
        // Tablets (481px to 768px)
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
            height: moduleLength > 3 ? 350 : 300
          },
          xaxis: {
           
            labels: {
              style: { fontSize: '10px' }  // Medium font size for tablets
            }
          },
          yaxis: {
            labels: {
              style: { fontSize: '12px' }
            }
          }
        }
      },
      {
        // Tablets (481px to 768px)
        breakpoint: 1354,
        options: {
          xaxis: {
            offsetX: 20,
       
            labels: {
              style: { fontSize: '11px', textAlign: 'center' }  // Medium font size for tablets
            }
          },
        }
      },
      {
        breakpoint: 1355,
        options: {
          xaxis: {
       
            labels: {
              style: { fontSize: '11px', textAlign: 'center' }  // Medium font size for tablets
            }
          },
        }
      },
      {
        // Large screens (above 768px)
        breakpoint: 3024,
        options: {
          chart: {
            width: '100%',
            height: moduleLength > 3 ? 350 : 300
          },
          xaxis: {
            labels: {
              style: { fontSize: '12px' }  // Larger font size for big screens
            }
          },
          yaxis: {
            labels: {
              style: { fontSize: '12px' }
            }
          }
        }
      }
    ]
  });
  
console.log('subAreasss', subAreas)
const navigate = useNavigate()
// useEffect to update chart options dynamically based on `heatmapData`
useEffect(() => {
  // const formattedCategories = newAreas.map((area, index) => {
  //   const owner = areaOwner[index] || '';
  //   const firstName = owner.split(' ')[0]; // Extract only the first name
  //   return `${area} ${firstName}`; // Using '|' as a separator for splitting the text
  // });
  const formattedCategories = newAreas.map((area, index) => {
    const owner = areaOwner[index] || '';
    const nameParts = owner.split(' ');
  
    // If the first name is 'Muhammad', use the last name, otherwise use the first name
    const displayName = nameParts[0].toLowerCase() === 'muhammad' && nameParts.length > 1
      ? nameParts[nameParts.length - 1] // Use the last name if 'Muhammad' is the first name
      : nameParts[0]; // Otherwise, use the first name
  
    return `${area} ${displayName}`; // Return the formatted category with the area and appropriate name
  });

  setChartOptions((prevOptions) => ({
    ...prevOptions,
    xaxis: {
      type: 'category',
      categories: formattedCategories,
      labels: {
        show: true,
        trim: true,
        maxHeight: 120,
        style: {
          fontSize: '10px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
          textAlign: 'center',
        },
      },
    },
    yaxis: {
      ...prevOptions.yaxis,
      categories: areas.slice().reverse(),
    },
    plotOptions: {
      ...prevOptions.plotOptions,
      heatmap: {
        ...prevOptions.plotOptions.heatmap,
        colorScale: {
          ranges: colorGradient,
        },
      },
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const value = w.globals.series[seriesIndex][dataPointIndex];
        const subArea = areas[dataPointIndex];
        const owner = areaOwner[dataPointIndex];
        const cameraName = cameraNames[dataPointIndex];
        return `<div class="custom-tooltip">
                  ${!cameraNames?.length ? `<span><strong>Area:</strong> ${subArea}</span><br>` : ''}
                  ${areaOwner?.length ? `<span><strong>Owner:</strong> ${owner}</span><br>` : ''}
                  ${cameraNames?.length ? `<span><strong>Camera:</strong> ${cameraName}</span><br>` : ''}
                  <span><strong>Alerts:</strong> ${value == -1 ? 0 : value}</span>
                </div>`;
      },
    },
    chart: {
      ...prevOptions.chart,
      events: {
        dataPointSelection: function (event, chartContext, { dataPointIndex, seriesIndex, w }) {
          const value = w.globals.series[seriesIndex][dataPointIndex];
          const xAxisValue = formattedCategories[dataPointIndex];
          const yAxisValue = chartContext.w.config.series[seriesIndex].name;
          const subArea = subAreas[dataPointIndex];
          console.log('x value', xAxisValue)
          console.log('y value', chartContext.w.config.series[seriesIndex].name)
          console.log('sub value', subArea)
          // Store in localStorage
          localStorage.setItem('xAxisValue', JSON.stringify(xAxisValue));
          localStorage.setItem('yAxisValue', JSON.stringify(yAxisValue));
          localStorage.setItem('subValue', JSON.stringify(subArea));
          localStorage.setItem('heatmapfilters', JSON.stringify(filters));
        
          const role = JSON.parse(localStorage.getItem('role'));
          console.log('event calling', chartContext)
          navigate(`${process.env.PUBLIC_URL}/dashboard/default/alerts/${role}`);
        },
      },
    },
  }));
  

}, [heatmapData]);
console.log('camerass', cameras)

  
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);
  const chartRef = useRef(null)
  const chartContainerRef = useRef(null); 


  // Use ResizeObserver to handle dynamic resizing with throttling
  // useEffect(() => {
  //   const handleResize = throttle(() => {
  //     if (chartRef.current && chartContainerRef.current) {
  //       const containerWidth = chartContainerRef.current.offsetWidth;
  //       console.log('bilalllllllll')

  //       if (containerWidth !== chartRef.current.chart.width) {
  //         chartRef.current.chart.updateOptions({
  //           chart: {
  //             width: containerWidth,
  //           },
  //         }, false, true); // Update options without animation and without full re-render
  //       }
  //     }
  //   },500); // Throttle the resize function to only run every 200ms

  //   const resizeObserver = new ResizeObserver(handleResize);

  //   if (chartContainerRef.current) {
  //     resizeObserver.observe(chartContainerRef.current);
  //   }

  //   // Clean up observer on unmount
  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [toggleIcon]);

  useEffect(() => {
    const handleResize = throttle(() => {
      if (chartRef.current && chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
  
        // Only update the chart if the width has actually changed
        if (containerWidth && containerWidth !== chartRef.current.chart.width) {
          chartRef.current.chart.updateOptions({
            chart: {
              width: containerWidth,
            },
          }, false, true); // Update options without animation and without full re-render
        }
      }
    }, 500); // Throttle the resize function to only run every 500ms
  
    const resizeObserver = new ResizeObserver(handleResize);
  
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }
  
    // Clean up observer on unmount to avoid memory leaks
    return () => {
      resizeObserver.disconnect();
    };
  }, [toggleIcon]);
  

  
 
  useEffect(() => {
    const applyBlinkAnimation = () => {
      // Extract all values from the series data
      const allValues = series.flatMap((s) => s.data);
  
      // Define the range for "Critical Dark Red"
      const criticalRange = colorGradient.find(
        (gradient) => gradient.name === 'Critical Dark Red'
      );
  
      if (!criticalRange) {
        console.error("Critical Dark Red range not found in colorGradient");
        return;
      }

  
      // Get all <rect> elements representing the heatmap cells
      const rectElements = document.querySelectorAll('rect.apexcharts-heatmap-rect');
  
      // Apply the "blinking" class to the <rect> elements whose value falls within the critical range
      rectElements.forEach((rectElement) => {
        const value = parseFloat(rectElement.getAttribute('val') || rectElement.getAttribute('data-real-value'));
  
        // Check if the value falls within the critical range
        if (!isNaN(value) && value >= criticalRange.from && value <= criticalRange.to) {
          rectElement.classList.add('blinking');
          rectElement.style.stroke = 'none'; // Remove the stroke
        }
      });
    };
  
    // Add the blinking style to the document
    const styleElement = document.createElement("style");
    styleElement.innerHTML = blinkingStyle;
    document.head.appendChild(styleElement);
  
    // Timeout to ensure DOM elements are rendered; increase timeout duration if necessary
    setTimeout(applyBlinkAnimation, 1000); // Ensure DOM is fully rendered before applying changes
  }, [series, colorGradient]);
  
  
  
  
  

  // const blinkingStyle = `
  // @keyframes blink {
  //   0% { opacity: 1; }
  //   50% { opacity: 0.7; }
  //   100% { opacity: 1; }
  // }
  // `;
  const blinkingStyle = `
  @keyframes blink {
    0% { fill: #7b3e3e; }        /* Darkest Red */
    50% { fill: rgb(255 90 90); }       /* Lighter Red */
    100% { fill: #7b3e3e; }      /* Darkest Red */
  }

  rect.blinking {
    animation: blink 1s linear infinite;
  }
`;
const seenNumbers = new Set();
console.log('chart options', chartOptions.xaxis.categories)
  return (
    <div className="" style={{width: '100%'}}>
      <div style={{minWidth: `${chartOptions?.xaxis?.categories?.length > 15 ? '800px' : '600px'}`, width: '100%'}}>
        <div className="" style={{width:'100%'}} >
          <div ref={chartContainerRef} style={{width: '100%'}} >
          <style>{blinkingStyle}</style>
            <Chart
            ref={chartRef}
              options={chartOptions}
              series={series}
              type="heatmap"
              height={chartOptions?.chart?.height}
              width='100%'
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="position-relative d-flex flex-column justify-content-center" style={{ maxWidth: '500px', width: '100%' }}>
              <div className=''
                style={{ 
                  width: '100%', 
                  height: '20px', 
                  background: `linear-gradient(to right, ${colorGradient?.slice(1).map(c => c.color).join(', ')})`
                }}
              ></div>
              <div className=" d-flex justify-content-between mt-2">

                {/* {colorGradient.map((_, index) => (
                  <span key={index} style={{ fontSize: '10px' }}>
                    {Math.round(maxValue * (index / (colorGradient.length - 1)))}
                  </span> 
                ))} */}
                {/* {colorGradient.map((_, index) => (
  <span key={index} style={{ fontSize: '10px' }}>
    {index === 0 ? 1 : Math.round(maxValue * (index / (colorGradient.length - 1)))}
  </span>
))} */}


{colorGradient.map((_, index) => {
  const value = Math.round(maxValue * (index / (colorGradient.length - 1)));
 // Initialize a Set to track seen numbers

  // Only render the number if it hasn't been seen before
  if (seenNumbers.has(value)) return null;

  // Add the current value to the Set to mark it as seen
  seenNumbers.add(value);

  return (
    <span key={index} style={{ fontSize: '10px' }}>
      {value}
    </span>
  );
})}
              </div>
              <span className='mt-2' style={{width: '100%', textAlign: 'center'}}>Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeatmap;










































  //10 different red colors
  // const colorGradient = [
  //   { from: 0, to: Math.floor(maxValue * 0.1), color: '#FFE5E5', name: 'Very Low' },
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.2), color: '#FFCCCC', name: 'Low' },
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.3), color: '#FFB2B2', name: 'Moderate Low' },
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.4), color: '#FF9999', name: 'Medium Low' },
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.5), color: '#FF8080', name: 'Medium' },
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.6), color: '#FF6666', name: 'Medium High' },
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.7), color: '#FF4C4C', name: 'High' },
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.8), color: '#FF3333', name: 'Very High' },
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.9), color: '#FF1A1A', name: 'Extreme' },
  //   { from: Math.floor(maxValue * 0.9) + 1, to: maxValue, color: '#a10202', name: 'Critical' }  // Critical Range (dark red)
  // ];

  //10 different red colors
  // const colorGradient = [
  //   { from: 0, to: Math.floor(maxValue * 0.1), color: '#FFF0F0', name: 'Very Low' },  // Lightest Red
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.2), color: '#FFDDDD', name: 'Low' },  // Light Red
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.3), color: '#FFC0C0', name: 'Moderate Low' },  // Light Red
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.4), color: '#FF9494', name: 'Medium Low' },  // Medium Red
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.5), color: '#FF5757', name: 'Medium' },  // Slightly Darker Red
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.6), color: '#FF2323', name: 'Medium High' },  // Darker Red
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.7), color: '#FF0000', name: 'High' },  // Pure Red
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.8), color: '#D70000', name: 'Very High' },  // Dark Red
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.9), color: '#B30303', name: 'Extreme' },  // Darker Red
  //   { from: Math.floor(maxValue * 0.9) + 1, to: maxValue, color: '#500000', name: 'Critical' }  // Darkest Red
  // ];
  


  //10 different colors
  // const colorGradient = [
  //   { from: 0, to: Math.floor(maxValue * 0.1), color: '#A9A9A9', name: 'Very Low (Grey)' },  // Grey
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.2), color: '#808080', name: 'Low (Grey)' },  // Darker Grey
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.3), color: '#008000', name: 'Moderate Low (Green)' },  // Green
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.4), color: '#32CD32', name: 'Medium Low (Light Green)' },  // Light Green
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.5), color: '#ADFF2F', name: 'Medium (Yellow-Green)' },  // Yellow-Green
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.6), color: '#FFD700', name: 'Medium High (Amber)' },  // Amber
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.7), color: '#FFA500', name: 'High (Dark Amber)' },  // Dark Amber
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.8), color: '#FF8C00', name: 'Very High (Orange-Red)' },  // Orange-Red
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.9), color: '#FF4500', name: 'Extreme (Red-Orange)' },  // Red-Orange
  //   { from: Math.floor(maxValue * 0.9) + 1, to: maxValue, color: '#FF0000', name: 'Critical (Red)' }  // Critical Red
  // ];


  //20 different colors 
  // const colorGradient = [
  //   // Grey Shades (Very Low)
  //   { from: 0, to: Math.floor(maxValue * 0.05), color: '#D3D3D3', name: 'Very Low (Light Grey)' },  // Light Grey
  //   { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#A9A9A9', name: 'Low (Grey)' },  // Grey
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#808080', name: 'Moderate Low (Dark Grey)' },  // Dark Grey
  //   { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#696969', name: 'Medium Low (Darker Grey)' },  // Darker Grey
    
  //   // Green Shades (Low to Medium)
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#008000', name: 'Moderate Low (Green)' },  // Green
  //   { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#228B22', name: 'Low (Forest Green)' },  // Forest Green
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#32CD32', name: 'Medium Low (Lime Green)' },  // Lime Green
  //   { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#66CDAA', name: 'Medium (Medium Aquamarine)' },  // Medium Aquamarine
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#ADFF2F', name: 'Moderate (Yellow-Green)' },  // Yellow-Green
  //   { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#7FFF00', name: 'Medium (Chartreuse)' },  // Chartreuse
  
  //   // Amber Shades (Medium to High)
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#FFD700', name: 'Moderate High (Amber)' },  // Amber
  //   { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#FFC200', name: 'High (Dark Amber)' },  // Dark Amber
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#FFB000', name: 'High (Golden Amber)' },  // Golden Amber
  //   { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#FFA500', name: 'High (Orange Amber)' },  // Orange Amber
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#FF8C00', name: 'Very High (Orange)' },  // Orange
  
  //   // Red Shades (Very High to Critical)
  //   { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#FF7F50', name: 'Very High (Coral)' },  // Coral
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#FF6347', name: 'Very High (Tomato)' },  // Tomato
  //   { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#FF4500', name: 'Extreme (Orange-Red)' },  // Orange-Red
  //   { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#DC143C', name: 'Critical (Crimson)' },  // Crimson
  //   { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#FF0000', name: 'Critical (Red)' }  // Critical Red
  // ];

  //20 red colors
  // const colorGradient = [
  //   // Lighter Red Shades
  //   { from: 0, to: Math.floor(maxValue * 0.05), color: '#FFE5E5', name: 'Very Low' },  // Light Red
  //   { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#FFCCCC', name: 'Low' },
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#FFB2B2', name: 'Moderate Low' },
  //   { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#FF9999', name: 'Medium Low' },
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#FF8080', name: 'Medium' },
  //   { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#FF6666', name: 'Medium High' },
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#FF4C4C', name: 'High' },
  //   { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#FF3333', name: 'Very High' },
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#FF1A1A', name: 'Extreme' },
  //   { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#FF0000', name: 'Critical' },  // Pure Red
  
  //   // Darker Red Shades (No Black, only dark reds)
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#E60000', name: 'Dark Red 1' },
  //   { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#CC0000', name: 'Dark Red 2' },
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#B30000', name: 'Dark Red 3' },
  //   { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#990000', name: 'Dark Red 4' },
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#800000', name: 'Dark Red 5' },
  //   { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#730000', name: 'Dark Red 6' },  // Darker Red (no black)
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#660000', name: 'Dark Red 7' },  // Deep Dark Red
  //   { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#590000', name: 'Dark Red 8' },  // Deeper Dark Red
  //   { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#4C0000', name: 'Dark Red 9' },  // Deepest Dark Red
  //   { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#400000', name: 'Critical Dark Red' }  // Final Dark Red (no black)
  // ];


  // const colorGradient = [
  //   { from: 0, to: Math.floor(maxValue * 0.05), color: '#FFE5E5', name: 'Very Low' },  // Light Red
  //   { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#FFCCCC', name: 'Low' },
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#FFB2B2', name: 'Moderate Low' },
  //   { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#FF9999', name: 'Medium Low' },
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#FF8080', name: 'Medium' },
  //   { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#FF6666', name: 'Medium High' },
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#FF4C4C', name: 'High' },
  //   { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#FF3333', name: 'Very High' },
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#FF1A1A', name: 'Extreme' },
  //   { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#FF0000', name: 'Critical' },  // Pure Red
    
  //   // Darker Red Shades (Smooth transition to darker shades)
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#E60000', name: 'Dark Red 1' },
  //   { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#CC0000', name: 'Dark Red 2' },
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#B30000', name: 'Dark Red 3' },
  //   { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#990000', name: 'Dark Red 4' },
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#800000', name: 'Dark Red 5' },
  //   { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#730000', name: 'Dark Red 6' },
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#660000', name: 'Dark Red 7' },
  //   { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#590000', name: 'Dark Red 8' },
  //   { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#4C0000', name: 'Dark Red 9' },
  //   { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#400000', name: 'Critical Dark Red' }  // Final Dark Red
  // ];

  // const colorGradient = [
  //   // Lighter Red Shades
  //   { from: 0, to: Math.floor(maxValue * 0.05), color: '#FFE5E5', name: 'Very Low' },  // Light Red
  //   { from: Math.floor(maxValue * 0.05) + 1, to: Math.floor(maxValue * 0.1), color: '#FFCCCC', name: 'Low' },
  //   { from: Math.floor(maxValue * 0.1) + 1, to: Math.floor(maxValue * 0.15), color: '#FFB2B2', name: 'Moderate Low' },
  //   { from: Math.floor(maxValue * 0.15) + 1, to: Math.floor(maxValue * 0.2), color: '#FF9999', name: 'Medium Low' },
  //   { from: Math.floor(maxValue * 0.2) + 1, to: Math.floor(maxValue * 0.25), color: '#FF8080', name: 'Medium' },
  //   { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.3), color: '#FF6666', name: 'Medium High' },
  //   { from: Math.floor(maxValue * 0.3) + 1, to: Math.floor(maxValue * 0.35), color: '#FF4C4C', name: 'High' },
  //   { from: Math.floor(maxValue * 0.35) + 1, to: Math.floor(maxValue * 0.4), color: '#FF3333', name: 'Very High' },
  //   { from: Math.floor(maxValue * 0.4) + 1, to: Math.floor(maxValue * 0.45), color: '#FF1A1A', name: 'Extreme' },
  //   { from: Math.floor(maxValue * 0.45) + 1, to: Math.floor(maxValue * 0.5), color: '#FF0000', name: 'Critical' },  // Pure Red
    
  //   // Slightly Darker Reds
  //   { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.55), color: '#E60000', name: 'Dark Red 1' },
  //   { from: Math.floor(maxValue * 0.55) + 1, to: Math.floor(maxValue * 0.6), color: '#CC0000', name: 'Dark Red 2' },
  //   { from: Math.floor(maxValue * 0.6) + 1, to: Math.floor(maxValue * 0.65), color: '#B30000', name: 'Dark Red 3' },
  //   { from: Math.floor(maxValue * 0.65) + 1, to: Math.floor(maxValue * 0.7), color: '#990000', name: 'Dark Red 4' },
  //   { from: Math.floor(maxValue * 0.7) + 1, to: Math.floor(maxValue * 0.75), color: '#870000', name: 'Dark Red 5' },
    
  //   // Darkest Reds with Better Contrast (No Chocolate Color)
  //   { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.8), color: '#750000', name: 'Dark Red 6' },
  //   { from: Math.floor(maxValue * 0.8) + 1, to: Math.floor(maxValue * 0.85), color: '#630000', name: 'Dark Red 7' },
  //   { from: Math.floor(maxValue * 0.85) + 1, to: Math.floor(maxValue * 0.9), color: '#520000', name: 'Dark Red 8' },
  //   { from: Math.floor(maxValue * 0.9) + 1, to: Math.floor(maxValue * 0.95), color: '#400000', name: 'Dark Red 9' },
  //   { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#2E0000', name: 'Critical Dark Red' }  // Final Dark Red
  // ];
















  

// import React, { useMemo } from 'react';
// import { Card } from "react-bootstrap";
// import Chart from 'react-apexcharts';
// import './liveanalytics.css';

// const areas = ['Helmet', 'Vest', 'E. Exit', 'Guard', 'MMHE'];
// const subAreas = ['AO-1', 'AO-2', 'AO-3', 'AO-4', 'AO-5', 'AO-6', 'AO-7', 'AO-8', 'AO-9', 'AO-10', 'AO-11', 'AO-12', 'AO-13', 'AO-14', 'AO-15'];
// const areaOwner = ['Adil', 'Aftab', 'Arsalan', 'Ayesha Khaliq', 'Dr. Amjad', 'Meraj', 'Moazzam Ali', 'Muhammd Shahbaz', 'Muhammd Wasi', 'Nazir', 'Sadia', 'Shafiq', 'Shahbaz', 'Sheraz', 'Umair Pervaiz'];

// const generateData = () => {
//   return areas.map((area) => ({
//     name: area,
//     data: subAreas.map(() => Math.floor(Math.random() * 99))
//   }));
// };

// const CustomHeatmap = () => {
//   const series = useMemo(() => generateData(), []);
//   const maxValue = useMemo(() => Math.max(...series.flatMap(s => s.data)), [series]);
  
//   const colorGradient = [
//     { from: 0, to: Math.floor(maxValue * 0.25), color: '#FFCCCB', name: 'Low' },
//     { from: Math.floor(maxValue * 0.25) + 1, to: Math.floor(maxValue * 0.5), color: '#FF9999', name: 'Medium' },
//     { from: Math.floor(maxValue * 0.5) + 1, to: Math.floor(maxValue * 0.75), color: '#FF6666', name: 'High' },
//     { from: Math.floor(maxValue * 0.75) + 1, to: Math.floor(maxValue * 0.95), color: '#FF0000', name: 'Very High' },
//     { from: Math.floor(maxValue * 0.95) + 1, to: maxValue, color: '#a10202', name: 'Critical' }  // Critical Range (dark red)
//   ];

//   // const options = {
//   //   chart: {
//   //     type: 'heatmap',
//   //     toolbar: { show: false },
//   //   },
//   //   dataLabels: {
//   //     enabled: true,
//   //     style: {
//   //       colors: ['#000'],
//   //       fontSize: '12px',
//   //     },
//   //   },
//   //   colors: ["#008FFB"],
//   //   xaxis: {
//   //     categories: subAreas,
//   //     labels: {
//   //       rotate: -45,
//   //       rotateAlways: false,
//   //       style: { fontSize: '14px' }
//   //     }
//   //   },
//   //   yaxis: {
//   //     categories: areas.slice().reverse(),
//   //     labels: {
//   //       style: { fontSize: '12px' }
//   //     }
//   //   },
//   //   plotOptions: {
//   //     heatmap: {
//   //       shadeIntensity: 0.5,
//   //       radius: 0,
//   //       useFillColorAsStroke: true,
//   //       colorScale: {
//   //         ranges: colorGradient
//   //       }
//   //     }
//   //   },
    
//   //   tooltip: {
//   //     custom: function({ seriesIndex, dataPointIndex, w }) {
//   //       const value = w.globals.series[seriesIndex][dataPointIndex];
//   //       const subArea = subAreas[dataPointIndex];
//   //       const owner = areaOwner[dataPointIndex];
//   //       const isCritical = value > Math.floor(maxValue * 0.95); // Define critical condition
        
//   //       // Apply blinking class if critical
//   //       return `<div class="custom-tooltip ${isCritical ? 'blinking' : ''}">
//   //                 <span><strong>SubArea:</strong> ${subArea}</span><br>
//   //                 <span><strong>Owner:</strong> ${owner}</span><br>
//   //                 <span><strong>Alerts:</strong> ${value}</span>
//   //               </div>`;
//   //     }
//   //   },
//   //   legend:{
//   //     show: false
//   //   },
//   //   responsive: [
//   //     {
//   //       breakpoint: 480,
//   //       options: {
//   //         chart: {
//   //           width: '100%',
//   //           height: 250
//   //         },
//   //         xaxis: {
//   //           labels: {
//   //             rotate: -90,
//   //             style: { fontSize: '9px' }
//   //           }
//   //         },
//   //         yaxis: {
//   //           labels: {
//   //             style: { fontSize: '10px' }
//   //           }
//   //         }
//   //       }
//   //     },
//   //     {
//   //       breakpoint: 768,
//   //       options: {
//   //         chart: {
//   //           width: '100%',
//   //           height: 350
//   //         },
//   //         xaxis: {
//   //           labels: {
//   //             rotate: -45,
//   //             style: { fontSize: '10px' }
//   //           }
//   //         },
//   //         yaxis: {
//   //           labels: {
//   //             style: { fontSize: '12px' }
//   //           }
//   //         }
//   //       }
//   //     },
//   //     {
//   //       breakpoint: 3024,
//   //       options: {
//   //         chart: {
//   //           width: '100%',
//   //           height: 350
//   //         },
//   //         xaxis: {
//   //           labels: {
//   //             rotate: -45,
//   //             style: { fontSize: '14px' }
//   //           }
//   //         },
//   //         yaxis: {
//   //           labels: {
//   //             style: { fontSize: '12px' }
//   //           }
//   //         }
//   //       }
//   //     }
//   //   ]
//   // };
//   const options = {
//     chart: {
//       type: 'heatmap',
//       toolbar: { show: false },
//     },
//     dataLabels: {
//       enabled: true,
//       style: {
//         colors: ['#000'],
//         fontSize: '12px',
//       },
//     },
//     colors: ["#008FFB"],
//     xaxis: {
//       categories: subAreas,
//       labels: {
//         rotate: -45,
//         rotateAlways: false,
//         style: { fontSize: '14px' }
//       }
//     },
//     yaxis: {
//       categories: areas.slice().reverse(),
//       labels: {
//         style: { fontSize: '12px' }
//       }
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         radius: 0,
//         useFillColorAsStroke: true,
//         colorScale: {
//           ranges: colorGradient
//         },
//         distributed: true,  // Allows for styling individual heatmap boxes
//         onCellClick: function(chartContext, seriesIndex, dataPointIndex) {
//           console.log('chartContext.series[seriesIndex][dataPointIndex]', chartContext.series[seriesIndex][dataPointIndex])
//           console.log('chartContext.el.classList.add', chartContext.el.classList)
//           const value = chartContext.series[seriesIndex][dataPointIndex];
//           if (value > Math.floor(maxValue * 0.95)) {
//             chartContext.el.classList.add('blinking-box');
//           } else {
//             chartContext.el.classList.remove('blinking-box');
//           }
//         }
      
//       }
//     },
//     tooltip: {
//       custom: function({ seriesIndex, dataPointIndex, w }) {
//         const value = w.globals.series[seriesIndex][dataPointIndex];
//         const subArea = subAreas[dataPointIndex];
//         const owner = areaOwner[dataPointIndex];
//         const isCritical = value > Math.floor(maxValue * 0.95); // Define critical condition
        
//         // Apply blinking class if critical
//         return `<div class="custom-tooltip">
//                   <span><strong>SubArea:</strong> ${subArea}</span><br>
//                   <span><strong>Owner:</strong> ${owner}</span><br>
//                   <span><strong>Alerts:</strong> ${value}</span>
//                 </div>`;
//       }
//     },
//     legend:{
//       show: false
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: '100%',
//             height: 250
//           },
//           xaxis: {
//             labels: {
//               rotate: -90,
//               style: { fontSize: '9px' }
//             }
//           },
//           yaxis: {
//             labels: {
//               style: { fontSize: '10px' }
//             }
//           }
//         }
//       },
//       {
//         breakpoint: 768,
//         options: {
//           chart: {
//             width: '100%',
//             height: 350
//           },
//           xaxis: {
//             labels: {
//               rotate: -45,
//               style: { fontSize: '10px' }
//             }
//           },
//           yaxis: {
//             labels: {
//               style: { fontSize: '12px' }
//             }
//           }
//         }
//       },
//       {
//         breakpoint: 3024,
//         options: {
//           chart: {
//             width: '100%',
//             height: 350
//           },
//           xaxis: {
//             labels: {
//               rotate: -45,
//               style: { fontSize: '14px' }
//             }
//           },
//           yaxis: {
//             labels: {
//               style: { fontSize: '12px' }
//             }
//           }
//         }
//       }
//     ]
//   };
  
//   return (
//     <div className="">
//       <div style={{minWidth: '600px'}}>
//         <div className="d-flex flex-column">
//           <div>
//             <Chart
//               options={options}
//               series={series}
//               type="heatmap"
//               height="100%"
//             />
//           </div>
//           <div className="mt-4 d-flex justify-content-center align-items-center">
//             <div className="d-flex flex-column justify-content-center" style={{ maxWidth: '500px', width: '100%' }}>
//               <div 
//                 style={{ 
//                   width: '100%', 
//                   height: '20px', 
//                   background: `linear-gradient(to right, ${colorGradient.map(c => c.color).join(', ')})`
//                 }}
//               ></div>
//               <div className="d-flex justify-content-between mt-2">
//                 {colorGradient.map((_, index) => (
//                   <span key={index} style={{ fontSize: '10px' }}>
//                     {Math.round(maxValue * (index / (colorGradient.length - 1)))}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomHeatmap;





