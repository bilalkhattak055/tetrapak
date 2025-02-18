import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'; 

export default function TotalAlerts({ filters, defaultData, chartsData, lastFilter,setLastFilter,data,setData }) {
 
console.log(data,'current charts data')
 
    const options = {
        chart: {
            type: 'bar',
            stacked: true,  // Stacked bars
            height: 350,

        },
        toolbar: {
            show: false
        },
        colors:["#23946C","#E69151","#8E66FF","#F1CA32","#26B6B4"],
        dataLabels: {
            enabled: true,  // Enable data labels
            style: {
                colors: ['#ffffff'],  // Label color
                fontSize: '11px',  // Adjust font size
            },
            formatter: function (val, opts) {
                return `${val}`; // Show data value in labels
            },
            textAnchor: 'middle',
        },
        tooltip: {
            enabled: true,
            shared: true,  // Tooltip is shared across all series (columns)
            intersect: false,  // Show tooltip only on hover
            style: {
                fontSize: '12px',  // Tooltip text size
                fontWeight: 'normal',
            },
            x: {
                show: true,  // Show category name
                formatter: function (value) {
                    return `${value}`;  // Return category name
                },
            }, 
            
            
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadiusWhenStacked: 'all',
                columnWidth: '65%',
                distributed: true,  // Ensures each bar gets its assigned color
                borderRadiusApplication: 'around',
                borderRadius: 4,
            },
        },
        xaxis: {
            // categories: data?.map(item => categoryAbbreviations[item?.category] || item?.category), 
            categories: data?.map(item => item?.name), 
            labels: {
                style: {
                    fontSize: '12px',  // Label font size
                },
                rotate: 0,
                hideOverlappingLabels: false,
                trim: true,  // Trim labels if they are too long
            },
        },
        yaxis: {
            title: {
                text: 'Alerts',
                style: {
                    lineHeight: '2.5',
                    fontSize: '13px',
                    fontWeight: '100',
                    fontFamily: 'sans-serif',
                },
            },
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
        title: {
            text: 'Summary of Alerts',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: '500',
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: true,
            position: 'bottom',  // Position the legend at the bottom
            horizontalAlign: 'center',
            labels: {
                useSeriesColors: true,  // Use the series colors
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,  // Circular markers for legend
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
                                fontSize: '12px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
                        },
                    },
                }
            },
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 400,
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
                                fontSize: '12px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
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
                                fontSize: '10px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
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
    console.log(data,'from summary alerts')
    
    const series = [
        { 
            data: data.map(item => item.data) 
        }
    ];

    return (
        <>
            <ReactApexChart
                options={options}
                // series={createSeries()} 
                series={series} 
                type="bar"
                height={options?.chart?.height}
            /> 
        </>
    );
}
