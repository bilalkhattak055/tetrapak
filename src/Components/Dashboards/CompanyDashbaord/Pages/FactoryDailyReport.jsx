import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import img from '../../../../assets/images/dashboard/vieww.svg'
import ViewAllButton from '../../../Common/newButton/index'

import AlertList from "../../../Tables/DatatableForArea/DataTable/Index";
import {
  areaTableData,
  tableColumnsForArea,
} from "../../../../Data/Table/DummyTableData";
import smallCards from "../../CompanyDashbaord/StaticData/Data";
import ForkLiftTotalCard from "../../CompanyDashbaord/Components/ForkLiftTotalCard";
import Chart from "react-apexcharts";
import "./../../GlobalDashboard/AreawiseReports/production/production.css";



import { Loader } from "react-feather";

import { Link } from "react-router-dom";
import { areas, factories, modules } from "../../../../Data/staticData/data";
import AllFilters from "../../../Common/allFilters/AllFilters";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { H4, P } from "../../../../AbstractElements";
import AreaSpalineChartClass from "../../../Charts/ApexCharts/AreaSpalineChart";
import { areaSpaline } from "../../../Charts/ApexCharts/apexData";

const FactoryDailyReport = () => {
  // bellow editing done for the filter  ------------xxx------------xxx-------------------
  const mainTitle = 'Daily Reports'
  const type = 'Area'

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ensure the date object is correctly set to the local time zone
    const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [role, setRole] = useState(initialRole)
  const [dateHeading, setDateHeading] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthFormatChange, setmonthFormatChange] = useState()
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [year, setYear] = useState()
  const [selectedYear, setSelectedYear] = useState(new Date());
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7); // Add 7 days to the selected date
  const endDateString = endDate.toISOString().split('T')[0];


  const formattedEndDate = formatDate(endDateString)
  endDate.setDate(today.getDate() + 7);

  const handleChange = (event) => {
    const value = event.target.value; // value in yyyy-mm format
    setSelectedMonth(value);

    const [year, month] = value.split('-');
    // Correctly adjust month index for Date object
    const monthIndex = Number(month) - 1; // Convert 1-based month to 0-based index
    const monthName = new Date(year, monthIndex, 1).toLocaleString('default', { month: 'long' });

    setmonthFormatChange(`${monthName} ${year}`);
  };


  const handleYear = (date) => {
    if (date) {
      setSelectedYear(date);
      setIsDatePickerVisible(!isDatePickerVisible)
    }
  };
  useEffect(() => {

    setDateHeading(`${formattedStartDate}`);



  }, [])


  // end ------------xxx------------xxx-------------------



  const [data, setData] = useState(areaTableData);
  const [newData, setNewData] = useState(undefined);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loader, setLoader] = useState(false);






  const [allData, setAllData] = useState({
    donut: {
      series: [40, 40, 20],
    },
    barChart: {
      series: [450, 350, 250],
    },
    areaSpaline: areaSpaline,

    smallCards: smallCards,
  });
  const [columns, setColumns] = useState(tableColumnsForArea);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Alerts", // Your title here
      align: "left",
      floating: false,
      offsetX: 7,
      offsetY: 10,
      style: {
        fontSize: "15px", // Font size of the title
        color: "#6d6f70", // Title color, you can change it dynamically
        fontFamily: "Arial",
        fontWeight: "400",
      },
    },
    plotOptions: {
      bar: {
        distributed: true, // Different colors for each bar
        borderRadius: 5, // Rounds the top borders of bars
        columnWidth: "70%", // Increase bar width, adjust as needed
        horizontal: false,
      },
    },
    colors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Custom colors for each bar
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Helmet Module", "Emergency Exit", "Machine Guard"],
      // categories: ["Helmet Module", "Emergency Exit", "Machine Guard"],
      labels: {
        style: {
          colors: ["#6D6F70"], // Color for the x-axis values
          fontSize: "12px",
        },
      },
      title: {
        // text: 'Category'
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#6D6F70"], // Color for the y-axis values
          fontSize: "12px",
        },
      },
      title: {
        // text: 'Alerts'
      },
    },
    legend: {
      show: true,
      position: "right", // Legends on the right
      floating: false, // Legends don't float, fixed to the right
      offsetY: 170, // Vertically center the legend
      offsetX: 0, // Adjust X offset to move the legend to the right
      formatter: function (label, opts) {
        const series = opts.w.globals.series[0]; // Access the data array
        const total = series.reduce((acc, val) => acc + val, 0);
        const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(
          0
        );
        return `<div style="width:150px; display:flex; justify-content:space-between; align-items:center;">${label} <span>${percentage}%</span></div>`;
      },
      markers: {
        fillColors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Match legend colors to bars
        radius: 5, // Rounded borders of the legend markers
      },
      labels: {
        colors: "#6D6F70", // Color for legend text
        fontSize: "12px",
      },
    },
    series: [
      {
        name: "Alerts",
        data: [], // Data for each bar
        // data: allData.barChart.series, // Data for each bar
      },
    ],
  });


  //fetch dashboard dashboard data
  // useEffect(() => {
  //   setLoader(true);
  //   let unsubscribe = fetchDashboard();
  //   return () => unsubscribe;
  // }, []);
  // const fetchDashboard = () => {

  //   AreaService.getAreaDashboard(9)
  //     .then((res) => {
  //       const resp = res?.data?.data;
  //       // console.log('respppppptt', resp)
  //       // Set Modules Line Graph
  //       const helmet_data = {
  //         name: "Helmet Module",
  //         data: sortbyHour(resp?.daily_alerts)?.map((item) => item?.value),
  //       };
  //       console.log('resp?.daily_alerts', resp?.daily_alerts)
  //       // console.log('helmet_data', helmet_data)
  //       const updatedSeries = [...areaSpaline?.series];
  //       updatedSeries.splice(1, 0, helmet_data); // Insert at index 1

  //       // Update the state with the modified series
  //       setAllData({
  //         ...allData,
  //         areaSpaline: {
  //           ...areaSpaline,
  //           series: updatedSeries,
  //         },
  //       });

  //       // Set Helmet Card and Graph (Analytics)
  //       const helmet_card = smallCards?.findIndex(
  //         (i) => i.title === "Helmet Module"
  //       );
  //       console.log("helmet_cardddd", helmet_card)
  //       // console.log("helmet_cardddd resp", resp)
  //       if (helmet_card) {
  //         smallCards[helmet_card].total =
  //           resp?.total_helmet_modules?.toString();
  //         smallCards[helmet_card].chart.series[0].data = sortbyMonth(
  //           resp?.monthly_alerts
  //         )?.map((item) => item?.value);
  //       }

  //       // Set Current Month Alerts
  //       setChartOptions({
  //         ...chartOptions,
  //         series: [
  //           {
  //             name: "Alerts",
  //             data: resp?.current_month_alerts?.map((item) => item?.value),
  //           },

  //         ],
  //         xaxis: {
  //           ...chartOptions.xaxis,
  //           categories: resp?.current_month_alerts?.map(i => i?.title)
  //         }
  //       });

  //       // const recent_alerts=[...data]
  //       const updated_alerts = [
  //         ...resp?.recent_alert.slice(0, 2),
  //         ...areaTableData,
  //       ]?.map((i, index) => ({
  //         ...i,
  //         id: index + 1,
  //         image:
  //           "https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww", // Replace with the actual image path
  //       }));
  //       setData(updated_alerts);

  //       setLoader(false);


  //     })
  //     .catch((e) => {
  //       setLoader(false);
  //     });
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchDashboard();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);


  //ftch all alerts
  // useEffect(() => {

  //   let unsubscribe = fetchAlerts();
  //   return () => unsubscribe;
  // }, []);

  // const fetchAlerts = () => {
  //   console.log('bilal')
  //   AreaService.getRecentAlerts(9)
  //     .then((res) => {
  //       const resp= res?.data?.data 
  //       // console.log('alerts resppp dashboard', resp)
  //       const onlyHelmetModuleData = resp?.filter((helmet)=> helmet.module == 'Helmet Module')
  //       const todayDate = new Date().toISOString().split('T')[0]
  //       const yesterday = new Date();
  //       yesterday.setDate(yesterday.getDate() - 1)
  //       const previousDate = yesterday.toISOString().split('T')[0]
  //       const todayData = onlyHelmetModuleData?.filter((data)=> data.date === todayDate)
  //       const yesterdayData = onlyHelmetModuleData?.filter((data)=> data.date === previousDate)

  //       console.log("yesterdayData", yesterdayData)

  //       //data in two hours
  //       // function getHour(time) {
  //       //   const [hour, modifier] = time.split(' ')[1].split(':');
  //       //   return modifier.toLowerCase() === 'pm' && parseInt(hour) !== 12
  //       //     ? parseInt(hour) + 12
  //       //     : parseInt(hour);
  //       // }
  //       function getHour(time) {
  //         // console.log("getHour called with time:", time);  // Log the input to the function
  //         try {
  //           const [hourStr, minuteStr] = time.split(':');
  //           // console.log("hourStr", hourStr, "minuteStr", minuteStr);  // Log after splitting

  //           const [minute, period] = minuteStr.split(' ');
  //           // console.log("minute", minute, "period", period);  // Log the extracted minute and AM/PM

  //           let hour = parseInt(hourStr);

  //           // Convert 12-hour format to 24-hour format
  //           if (period.toLowerCase() === 'pm' && hour !== 12) {
  //             hour += 12;
  //           } else if (period.toLowerCase() === 'am' && hour === 12) {
  //             hour = 0;  // Midnight case
  //           }
  //           console.log("Returning hour:", hour);  // Log the final hour value
  //           return hour;
  //         } catch (error) {
  //           console.error("Error in getHour function:", error);
  //           return null;  // Return null if there is an error
  //         }
  //       }
  //       console.log('bilal3')
  //       // 4. Initialize 2-hour interval counters
  //       const intervalCounts = Array(12).fill(0); // 12 intervals for 24 hours (each 2 hours)
  //       // 5. Count the number of alerts in each 2-hour interval
  //       try {
  //         yesterdayData.forEach(alert => {
  //           const hour = getHour(alert.time);
  //           const intervalIndex = Math.floor(hour / 2); 
  //           intervalCounts[intervalIndex]++;
  //         });
  //       } catch (error) {
  //         console.error("Error processing alerts:", error);
  //       }
  //       // console.log('bilal 4')
  //       // yesterdayData.forEach(alert => {
  //       //   const hour = getHour(alert.time);
  //       //   const intervalIndex = Math.floor(hour / 2); // e.g., 8:00 AM falls in index 4 (interval from 8-10 AM)
  //       //   intervalCounts[intervalIndex]++;
  //       // });

  //       console.log('bilal 5')
  //       console.log('intervalCounts', intervalCounts)



  //       setLoader(false);
  //     })
  //     .catch((e) => {
  //       setLoader(false);
  //     });
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchAlerts();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);


  const sortbyHour = (list) => {
    return list?.sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };
  const sortbyMonth = (list) => {
    return list?.sort((a, b) => parseInt(a.month) - parseInt(b.month));
  };

  function handleDeleteClick(row) {
    const filteredd = data.filter((item) => item !== row);
    setData(filteredd);
  }


  const startDat = today.toLocaleDateString('en-CA');
  const [startDate, setStartDate] = useState(startDat);
  const [selectedDate, setSelectedDate] = useState(startDat);
  const [filters, setFilters] = useState({
    module: "",
    area: "",
    factory: "",
  });
  let formattedStartDate;
  if (startDate) {
    formattedStartDate = formatDate(startDate); // Current date in yyyy-mm-dd format
  }
  //filters end

  const donut = {
    options: {
      grid: {
        padding: {
          top: 20,
          bottom: 30,
          left: 20,
          right: 20,
        },
      },
      chart: {
        height: 380,
        type: "donut",
        toolbar: {
          show: false,
        },
      },
      labels: ["Helmet Module", "Emergency Exit", "Machine Guard"], // Labels for each section
      colors: ["#0b76b7", "#41b2ef", "#bde3fa"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        markers: {
          size: 7,
          shape: "square",
        },
        formatter: function (label, opts) {
          const series = opts.w.globals.series;
          const total = series.reduce((acc, val) => acc + val, 0);
          const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(
            0
          );
          return `<div style="width:160px; display:flex; justify-content:space-between; align-items:center; color: #6D6F70;">${label} <span>${percentage}%</span></div>`;
        },
        labels: {
          colors: ["#6D6F70"], // Color for legend text
          fontSize: "12px",
        },
        offsetX: 0,
        offsetY: -7,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%", // Increase the size of the donut
            labels: {
              show: true,
              name: {
                show: false,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#373d3f",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "30px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "bold",
                color: "#6D6F70", // Set the color for the value inside the donut
                offsetY: 16,
                formatter: function (val) {
                  return val + "%";
                },
              },
              total: {
                show: true,
                color: "#6D6F70", // Set the color for the total
                formatter: function (w) {
                  // Find and return the maximum value from the series
                  const maxValue = Math.max(...w.globals.seriesTotals);
                  return `${maxValue}%`;
                },
              },
            },
          },
        },
      },
    },
    series: allData.donut.series, // Your data
  };

  function handleDateChange(e) {
    console.log("ppe date");
    if (!e.target.value) {
      setSelectedDate("");
      setStartDate("");
      return; // Exit the function
    }

    const date = new Date(e.target.value); // Selected date
    const newDate = date.toISOString().split('T')[0]
    const formattedNewDate = formatDate(newDate)
    setSelectedDate(newDate)
    console.log('daily date', selectedDate)
    setDateHeading(formattedNewDate);
    // setOpenDate(true)



    setSelectedDate(e.target.value);
    if (!selectedDate) {
      // setData(assignDatesToData(dataArray, dates)); // Reset to the original data if date is cleared
      return;
    }

    // 2. Apply the date filter
    // const filteredData = newData.filter((item) => item.date === selectedDate);
    // setAllDataa(filteredData); // Update the filtered data
  }

  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
    // applyFilters({ ...filters, [field]: e.target.value });
  };
  const style = { width: "158px", height: "48px" };
  // filters functions end

  return (
    <Fragment>
      <Container className="dashboard-first-page" fluid={true}>
        {loader ? (
          <div style={{ marginTop: 90 }} ><Loader1 /></div>
        ) : (
          <>
            {/* DATE FILTER */}
            {/* <Row className="mb-4">
              <Col xs="12" lg="5">
                <H4>{mainTitle ? mainTitle : "Refrigeration Area"}</H4>
              </Col>
              <Col xs="12" lg="7" className="d-flex justify-content-end">
                <AllFilters
                  handleInputChange={handleInputChange}
                  style={style}
                  selectedDate={selectedDate}
                  startDate={startDate}
                  handleDateChange={handleDateChange}
                  typedate={"date"}
                  dateInputShow={true}
                />
              </Col>
            </Row> */}
            <Row className="d-flex justify-content-between align-items-center mb-4"  >



              <>
                <Col xs='12' lg='5' >

                  <H4>Day - <span style={{ color: 'black' }}>{dateHeading}</span></H4>
                </Col>

                <AllFilters
                  handleInputChange={handleInputChange} style={style} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
                />
              </>


            </Row>
            {/* MODULES , ANALYTICS & MODULES PERCENTAGE */}
            <Row xs="12" className="mt-2">
              <AreaSpalineChartClass areaSpaline={allData?.areaSpaline} colSize={'6'} />

              <Col xs="12" xl="6" xxl="3">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                  Analytics
                </P>
                <Card className="area-carddd" style={{ marginBottom: 10 }}>
                  {allData?.smallCards.map((data, index) => (
                    <ForkLiftTotalCard
                      data={data}
                      TotalFont="20px"
                      BarWidth="130"
                      padding='14px'
                      ParentMargin='m-1'
                    />
                  ))}
                </Card>
              </Col>
              <Col xs="12" xl="6" xxl="3">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                  Modules Overall Percentage
                </P>
                <Card className="area-cardd">
                  <Chart
                    options={donut.options}
                    series={donut.series}
                    type="donut"
                    height={donut.options.chart.height}
                  />
                </Card>
              </Col>
            </Row>

            {/* CURRENT MONTH ALERTS & RECENT ALERTS */}
            <Row>
              <Col xs="12" xxl="5">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                  Module Results
                </P>
                <Card className="area-card-bar">
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="bar"
                    height={chartOptions.chart.height}
                  />
                </Card>
              </Col>
              <Col xs="12" xxl="7">
                <Row xs='12' >
                  <Col xs='12' className="d-flex justify-content-between">
                    <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                      Recent Alerts
                    </P>
                    <Link to={`${process.env.PUBLIC_URL}/dashboard/reports/${role}`}>
                      <ViewAllButton btnText='View All' icon={img} />
                    </Link>

                  </Col>
                </Row>
                <AlertList
                  dummytabledata={data}
                  tableColumns={columns}
                  noCardHeader={true}
                  pagination_options={[]}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* Previous Code */}
      {/* <GlobalDashboard newData={AllData} type='Production' /> */}
    </Fragment>
  );
};

export default FactoryDailyReport;

