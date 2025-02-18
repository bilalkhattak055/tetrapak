import React from 'react';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import '../style/style.css'

const NewBarChart = ({ progressData, week, loadingForBars }) => {
    const dummy = [
        {
            "progressId": "progress_Helmet",
            "name": "Person Available Alert",
            "barValue": 94.5,
            "alerts": 89,
            "trend": "trend",
            "percentage": "94.5%",
            "barColor": "success",
            "total_alerts": 0,
            "area_owner": "Nasir ",
            "area_with_max_alerts": "MOULDING ",
            "subarea_with_max_alerts": "MOULDING DEPART ",
            "max_alerts": 53,
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "Final Winding  (Adil) "
                },
                {
                    "label": "Sub Area",
                    "value": "waste window area"
                },
                {
                    "label": "Max Alerts",
                    "value": "53"
                },
                {
                    "label": "Total Alerts",
                    "value": "89"
                }
            ]
        },
        {
            "progressId": "progress_Vest",
            "name": "Grouping",
            "barValue": 82.9,
            "alerts": 124,
            "trend": "trend",
            "percentage": "82.9%",
            "barColor": "success",
            "total_alerts": 0,
            "area_owner": "Kashif, Usman  ",
            "area_with_max_alerts": "STORE",
            "subarea_with_max_alerts": "LOCAL STORE ",
            "max_alerts": 72,
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "AO-6 (Meraj) "
                },
                {
                    "label": "Sub Area",
                    "value": "docking stations"
                },
                {
                    "label": "Max Alerts",
                    "value": "72"
                },
                {
                    "label": "Total Alerts",
                    "value": "124"
                }
            ]
        },
        {
            "progressId": "progress_emergency_exit_blockage",
            "name": "No Go Area",
            "barValue": 100,
            "alerts": 0,
            "trend": "trend",
            "percentage": "100.0%",
            "barColor": "danger",
            "total_alerts": 0,
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "N/A  "
                },
                {
                    "label": "Sub Area",
                    "value": "undefined"
                },
                {
                    "label": "Max Alerts",
                    "value": "undefined"
                },
                {
                    "label": "Total Alerts",
                    "value": "0"
                }
            ]
        },
        {
            "progressId": "progress_machine_guard_open",
            "name": "Machine Guard",
            "barValue": 40,
            "alerts": 20,
            "trend": "trend",
            "percentage": "100%",
            "barColor": "warning",
            "area_owner": "Qaiser ",
            "area_with_max_alerts": "Ali Pump  ",
            "subarea_with_max_alerts": "Ali Pump Doubling",
            "max_alerts": 10,
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "N/A  "
                },
                {
                    "label": "Sub Area",
                    "value": "undefined"
                },
                {
                    "label": "Max Alerts",
                    "value": "undefined"
                },
                {
                    "label": "Total Alerts",
                    "value": "0"
                }
            ]
        },
        {
            "progressId": "progress_machine_guard_open",
            "name": "Machine Visiting",
            "barValue": 100,
            "alerts": 0,
            "trend": "trend",
            "percentage": "100%",
            "barColor": "warning",
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "N/A  "
                },
                {
                    "label": "Sub Area",
                    "value": "undefined"
                },
                {
                    "label": "Max Alerts",
                    "value": "undefined"
                },
                {
                    "label": "Total Alerts",
                    "value": "0"
                }
            ]
        },
        {
            "progressId": "progress_forklift_person_in_same_aisle",
            "name": "Supervisor Presence",
            "barValue": 80.8,
            "alerts": 10,
            "trend": "trend",
            "percentage": "80.8%",
            "barColor": "danger",
            "total_alerts": 0,
            "area_owner": "Qaiser ",
            "area_with_max_alerts": "Ali Pump  ",
            "subarea_with_max_alerts": "Ali Pump Doubling",
            "max_alerts": 10,
            "tooltipContent": [
                {
                    "label": "Max alerts by",
                    "value": "AO-6 (Meraj) "
                },
                {
                    "label": "Sub Area",
                    "value": "DRY Store 1, 2"
                },
                {
                    "label": "Max Alerts",
                    "value": "10"
                },
                {
                    "label": "Total Alerts",
                    "value": "10"
                }
            ]
        }
    ];

    // Function to round number to 1 decimal place
    const roundToOneDecimal = (number) => {
        return Number(number).toFixed(1);
    };
    //function to calculate non compliance:
    const getNonComplianceCount = (total, compliance) => {
        return total - compliance;
    };

    return (
        <Card className='progressbarParent p-0 m-0 custom-scroll' style={{ boxShadow: 'none', height: "320px", overflow: 'auto' }}>
            <style jsx>{`
                .custom-scroll {
                    /* Firefox */
                    scrollbar-width: thin;
                    scrollbar-color: #ECECEC;
                    background-color: white;
                }

                /* Webkit browsers (Chrome, Safari, Edge) */
                .custom-scroll::-webkit-scrollbar {
                    width: 8px; /* Width of the scroll bar */
                }
            `}</style>
            {progressData?.map((item, key) => (
                <CardBody className='py-2 progressbarParentChild ps-0' style={{ borderTop: '1px solid #ececec' }} key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '70%' }}>
                            <h5 style={{ fontSize: '16px' }}>{item.name == 'Emergency Exit' ? 'E.Exit' : item.name}</h5>
                            <div className='mb-1' style={{ width: '100%' }}>
                                <Progress
                                    value={roundToOneDecimal(item.barValue)}
                                    color={item.barValue >= 80 ? 'success' : item.barValue >= 50 && item.barValue < 80 ? 'warning' : item.barValue < 50 ? 'danger' : 'dark'}
                                    style={{ height: '5px' }}
                                />
                            </div>
                        </div>
                     
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/**
                            {item.trend == "uptrend" ?
                                <IoIosArrowRoundUp style={{ fontSize: '25px', color: '#54ba4a' }} /> :
                                <IoIosArrowRoundDown style={{ fontSize: '25px', color: '#ff0000' }} />
                            }
                       */}
                            <span>{roundToOneDecimal(item.barValue)}%</span>
                        </div>
                        
                    </div>
                    <section>

                        <p className='m-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>
                            Total Records: <span style={{ color: 'black' }}>{item.total_records || 0}</span>
                        </p>
                        <p className='m-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>
                            Compliance: <span style={{ color: 'black' }}>{item.compliance_count || 0}</span>
                        </p>

                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>
                            Non-Compliance: <span style={{ color: 'black' }}>
                                {getNonComplianceCount(item.total_records || 0, item.compliance_count || 0)}
                            </span>
                        </p>
                    </section>
                </CardBody>
            ))}
        </Card>
    );
}

export default NewBarChart;

