import React, { useState } from 'react';
import Table from 'react-data-table-component';
import Chart from 'react-apexcharts';
import { Button, Tooltip } from 'reactstrap'; 

import '../../style/style.css'

const DataTable = ({ data,filterType,filterTable }) => { 
    const [tooltipOpen, setTooltipOpen] = useState({}); 
    const toggleTooltip = (areaid) => {
        setTooltipOpen(prevState => ({
            ...prevState,
            [areaid]: !prevState[areaid]
        }));
    };
    
  
    const tableColumns = [
        {
            name: "Profile",
            cell: row => (
                <div class="social-img">
                    <img src='https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg' className='leaderCardimg' alt="" />
                </div>
            ),
        },
 
        {
            name: "Name",
            cell: row => (
                <div>
                    <h5 style={{ fontSize: '15px' }}>{row.Name}</h5>
                </div>
            ),
        },
        {
            name: "Area id",
            selector: (row) => row.areaid,
        },
        {
            name: "Alerts",
            selector: (row) => row.totalalert,
            center: true,
        },
        {
            name: "Compliance",
            cell: (row) => (
                <div>
                    {row.compliance_percentage}%
                </div>
            ),
            center: true,
        },
        {
            name: "Time spent per week",
            cell: (row) => (
                <div>
                    {row.time} mins
                </div>
            ),
            center: true,
        },
        {
            name: "Target Status",
            cell: row => {
                const uniqueId = `Tooltip-${row.areaid}`; // Unique id for each row based on areaid
                return (
                    <div className="text-center">
                        <Button
                            id={uniqueId}
                            color={row.target === 'Not Set' ? 'dark' : row.target === 'Achieved' ? 'success' : row.target === 'Failed' ? 'danger' : "success"}
                            className="m-0 p-2"
                            style={{
                               borderRadius:'20px'
                                
                            }}
                        >
                        </Button>
                        <Tooltip
                            isOpen={tooltipOpen[row.areaid] || false} // Check tooltipOpen for this specific areaid
                            target={uniqueId}
                            toggle={() => toggleTooltip(row.areaid)} // Toggle only for this row
                            className="p-2"
                        >
                            {row.target === 'Not Set' ? 'Target Not Set' : row.target === 'Achieved' ? "Target Achieved" : row.target == 'Failed' ? 'Target Not Achieved' : ""}
                        </Tooltip>
                    </div>
                );
            },
            center: true,
        },
        {
            name: "Points",
            selector: (row) =>   row.points
            ,
            center: true,
        },
    ];
    if (filterType !== 'today' && filterTable.length>0) {
        tableColumns.push({
            name: `Avg time spent per ${filterType === 'weekly' ? 'week' :filterType === 'monthly' ? 'month':null}`,
            cell: (row) => (
                <div>
                     {filterType === 'weekly' ? '12 mins' :filterType === 'monthly' ? '16 mins':null}
                </div>
            ),
            center: true,
        });
    }

    const chartData = {
        series: [
            {
                name: "Progress",
            },
        ],
        options: {
            chart: {
                height: 50,
                type: "line",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            grid: {
                show: false,
            },
            xaxis: {
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                categories: ["Jan", "Feb", "Mar"],
            },
            yaxis: {
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            markers: {
                size: 0,
            },
            tooltip: {
                enabled: false,
            },
            title: {
                text: undefined,
            },
        },
    };
    const customStyles = {
        table: {
          style: { 
            padding:'0px !important',
            borderCollapse: "collapse",
            borderRadius: "20px 20px 0 0", // Top left and right border-radius
            overflow: "hidden", // Ensure rounded corners are visible
            backgroundColor: "transparent !important",
          },
        },
        headRow: {
            style: { 
              borderTopLeftRadius: '10px !important',
              borderTopRightRadius: '10px !important',
              borderBottom: 'none !important',

              // padding: '20px !important',
            //   paddingInline:'10px',
            },
          },
        rows: {
          style: {
            border: "none",
            wordBreak: "break-word",
            wordWrap: "break-word",
            overflow: "visible",
            padding: '0px',
            transition: "transform 0.3s ease, box-shadow 0.3s ease", // Transition for scaling and shadow
          },
        },
        cells: {
          style: {
            border: "none",
            // padding: "8px",
            margin: "0",
            wordBreak: "break-word",
            wordWrap: "break-word",
            overflow: "visible",
            transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition on hover
          },
        },
        headCells: {
          style: {
            // padding: "8px",
            margin: "0",
            padding:'0',
            wordBreak: "break-word",
            wordWrap: "break-word",
            overflow: "visible", 
          },
        },
      };
      
    return (
        <>
            <Table data={data} columns={tableColumns} height={50} customStyles={customStyles} className='table'/>
        </>
    );
}

export default DataTable;
