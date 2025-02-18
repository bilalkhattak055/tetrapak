import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ModelChart({ series2,setSeries2, filters, chartsData, lastFilter, setLastFilter,currentweek }) {
   
console.log(series2,'model chart data' )
    
    const nameAbbreviations = {
        "Helmet": "Helmet",
        "Vest": "Vest",
        "MMHE": "MMHE",
        "Emergency Exit": "E. Exit",
        "Machine Guard": "M. Guard",
    };

 
const safeSeries2 = Array.isArray(series2) ? series2 : [];
const categories = safeSeries2.length > 0 ? Object.keys(safeSeries2[0]) : [];

const formattedSeriesData = [
    {
        name: '80 > value',
        data: categories.map(key => 
            safeSeries2[0]?.[key] < 80 ? safeSeries2[0]?.[key] : null
        ),
        color: '#ef4343'
    },
    {
        name: '95 > value > 80',
        data: categories.map(key => 
            safeSeries2[0]?.[key] >= 80 && safeSeries2[0]?.[key] <= 95 ? safeSeries2[0]?.[key] : null
        ),
        color: '#f9c50a'
    },
    {
        name: '95 < value',
        data: categories.map(key => 
            safeSeries2[0]?.[key] > 95 ? safeSeries2[0]?.[key] : null
        ),
        color: '#32CD32'
    }
]; 
    const secondOptions = {
        chart: {
            type: 'bar',
            width: '100%',
            stacked:true,
            tooltip: {
                enabled: true,  // Enable tooltip
                shared: false,  // Disable shared tooltip
                followCursor: true,  // Follow cursor while hovering
                intersect: true,  // Show tooltip when directly hovering over a point
                y: {
                    formatter: function (val) {
                        return `${val}%`;  // Format the tooltip value as percentage
                    }
                }
            },
        },
        dataLabels: {
            enabled: true,  // Enable data labels
             // Position labels at the top of the bars
            style: {
                colors: ['#ffffff'],  // Optionally set the color of the labels
                fontSize: '11px',  // Adjust font size for readability
                fontWeight: 'normal',  
            
            },
            formatter: function (val, opts) {
                return `${val}%`
            },
            textAnchor: 'middle',
        },
        xaxis: {
            categories: safeSeries2?.flatMap(obj => Object.keys(obj)), // Extract the names for the x-axis categories
            labels: {
                style: {
                    fontSize: '12px', // Set a default font size
                },
                rotateAlways: false,
                hideOverlappingLabels: false,
                trim: true, // Trim labels if they are too long
            },
        },
     
        yaxis: {
            title: {
                text: 'Accuracy (%)',
                // offsetY: -150, // Position title at the top
              // Keep the title horizontal
                style: {
                    fontSize: '13px',
                    fontWeight: '100',
                },
              
            },
            labels: {
                style: {
                    fontSize: '12px', // Set a default font size
                },
      
            },
          
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%', // Reduce the width of the bars to fit more categories
                borderRadius: 4,
                colors: {
                    ranges: [
                        {
                            from: 0,
                            to: 79,
                            color: '#ef4343' // Red for values 80 > value
                        },
                        {
                            from: 80,
                            to: 95,
                            color: '#f0ab43' // Yellow for values between 80 and 95
                        },
                        {
                            from: 96,
                            to: 100,
                            color: '#43f06e' // Green for values above 95
                        }
                    ]
                },
                
            },
        },
        fill: {
            colors: ['#ff0000', '#f9c50a', '#32CD32', '#FFD700', '#9370DB'], // Default colors (not applied to bars individually)
        },
     
        title: {
            text: 'Accuracy of AI Models',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: '500',
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: ['#FF6347', '#FFD700', '#32CD32'],
                useSeriesColors: true
            },
            markers: {
                fillColors: ['#ff0000', '#f9c50a', '#32CD32'],
            },
            formatter: function(seriesName, opts) {
                const severityLevels = {
                    0: '80 > value',
                    1: '95> value > 80',
                    2: '95 < value',
                };
                return severityLevels[opts.seriesIndex];
            },
        }, 
        tooltip: {
            enabled: true,
            shared: true, // Tooltip is shared across all series (columns)
            intersect: false, // Disable the tooltip from showing only on the bar (for better UX with stacked bars)
            
            style: {
                fontSize: '12px', // Tooltip text size
                fontWeight: 'normal',
            },
        },
        responsive: [
            {
                breakpoint: 1367,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '12px', // Adjust font size for smaller screens
                            },
                            rotate: -45, // Rotate labels for better fit
                        },
                    },
                }
            },
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height:400,
                    },
                   
                }
            },
         
                  {
                breakpoint: 697,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '12px', // Adjust font size for smaller screens
                            },
                            rotate: -45, // Rotate labels for better fit
                        },
                    },
                }
            },
            {
                breakpoint: 620,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px', // Adjust font size for smaller screens
                            },
                            rotate: -45, // Rotate labels for better fit
                        },
                    },
                   
                    dataLabels: {
                        style: {
                            fontSize: '9px',  // Adjust font size for readability
                        },
                    },
                }
            }
        ]
    };
 
    const role = JSON.parse(localStorage.getItem('userData'))?.role_name;

    return (
        <>
            <ReactApexChart
                options={secondOptions}
                series={formattedSeriesData} // Updated series with new data format
                type="bar"
                height={350}
                width={secondOptions.chart.width}
            />
            {/* {
                role=='Tech QA' && (
                    <p className='f-light text-center'>{`Week ${currentweek} Data` || 'Current week data'}</p> 
                )
            } */}
        </>
    );
}