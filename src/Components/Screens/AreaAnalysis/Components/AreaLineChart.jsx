import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import CommonFIlterButton from '../../../Common/commonFilterButton/CommonFIlterButton'
// import { Shifts, monthlyDataa, weeklyData, shiftData, dummyJSON } from "../../../../Data/staticData/data";
import { Shifts, monthlyDataa, weeklyData, shiftData, dummyJSON } from "../../../../Data/staticData/data";
import { Input } from 'reactstrap'
import { TurnoverChart } from '../../GlobalUser/LiveAnalytics/analytics_data_temp';
import { formatMonth, formatWeek } from '../../../../utils/formatDate';
import { getWeek } from "../../../../_helper/helper";
import Chart from "react-apexcharts";
import '../../GlobalUser/LiveAnalytics/components/alertTrend.css'
import { analyticsPageService } from '../../../../api/analyticsPageService';
import { getCurrentWeekWithYear } from '../../../../utils/currentWeekWithYear';
// import Loader3 from '../../../../CommonElements/Spinner/loader3'
import Loader3 from '../../../../CommonElements/Spinner/loader3'

const AreaLineChart = ({ chartData,id }) => {
    console.log(id,'from area line chartt')
  // const subAreas = ['AO-1', 'AO-2', 'AO-3', 'AO-4', 'AO-5', 'AO-6', 'AO-7', 'AO-8', 'AO-9', 'AO-10', 'AO-11', 'AO-12', 'AO-13', 'AO-14', 'AO-15'];
  // const areaOwner = ['Adil', 'Aftab', 'Arsalan', 'Ayesha Khaliq', 'Dr. Amjad', 'Meraj', 'Moazzam Ali', 'Muhammd Shahbaz', 'Muhammd Wasi', 'Nazir', 'Sadia', 'Shafiq', 'Shahbaz', 'Sheraz', 'Umair Pervaiz'];
  // const areas = ['Helmet', 'Vest', 'E. Exit', 'Gaurd', 'MMHE'];
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;

  const [TurnoverChartState, setTurnoverChartState] = useState(TurnoverChart)
  const [monthlyData, setMonthlyData] = useState(monthlyDataa)
  const [CurrentWeek, setCurrentWeek] = useState(maxWeek)
  const [focusClass, setFocusClass] = useState('')
  const [filters, setFilters] = useState({
    weekly: getCurrentWeekWithYear(),
    month: '',
    shift: ''
  })
  // const applyFilters = (name) => {
  //   if (name === "shift") {
  //     setTurnoverChartState({
  //       ...TurnoverChartState,
  //       series: shiftData.series,
  //       options: {
  //         ...TurnoverChartState.options,
  //         xaxis: { categories: shiftData.categories },
  //       },
  //     });
  //   }

  //   if (name === "week") {
  //     setTurnoverChartState({
  //       ...TurnoverChartState,
  //       series: weeklyData.series,
  //       options: {
  //         ...TurnoverChartState.options,
  //         xaxis: { categories: weeklyData.categories },
  //       },
  //     });
  //   }

  //   if (name === "month") {

  //     setTurnoverChartState({
  //       ...TurnoverChartState,
  //       series: monthlyData.series,
  //       options: {
  //         ...TurnoverChartState.options,
  //         xaxis: {
  //           categories: monthlyData.categories,
  //           labels: {
  //             rotate: -45,
  //             style: {
  //               fontSize: window.innerWidth <= 768 ? '8px' : '12px',
  //             },
  //             // formatter: function (value, index) {
  //             //   console.log('value index', value, index)
  //             //   return window.innerWidth <= 768 ? (index % 5 === 0 ? value : '') : value;
  //             // },
  //             formatter: function (value) {
  //               // Find the index of the current value
  //               const index = monthlyData.categories.indexOf(value);

  //               console.log('value index', value, index);
  //               // Show every 3rd label in the mobile view
  //               if (window.innerWidth <= 768) {
  //                 return index % 3 === 0 ? value : '';
  //               }
  //               return value;
  //             },
  //           },
  //         },
  //         tooltip: {
  //           enabled: true,
  //           x: {
  //             formatter: function (value) {
  //               return 'Day ' + value;
  //             },
  //           },
  //         },
  //         // xaxis: {
  //         //   categories: monthlyData?.categories,  
  //         //   labels: {
  //         //     rotate: -45,
  //         //     style: {
  //         //       fontSize: window.innerWidth <= 768 ? '10px' : '12px', 
  //         //     },
  //         //   },
  //         // }
  //       },
  //     });
  //   }
  // }

  // useEffect(() => {
  //   alertsTrend()
  //   if (filters.month || filters.weekly) {
  //     setFocusClass('custom-input')
  //   }
  // }, [filters.month, filters.weekly]);

  useEffect(() => {
    // const payload = {
    //   ...filters
    // };
    // setChartLoader(true)
    // alertsTrend()
    console.log("useEffect triggered", filters);
    if (!chartLoader) {
      setChartLoader(true);
      alertsTrend();
    }

  }, [filters]);
  const [chartLoader, setChartLoader] = useState(false)

  const handleMonthChange = (e) => {
    const { name, value } = e.target;

    console.log(name, 'name', value, 'value')
    setFilters({
      ...filters,
      weekly: '',
      [name]: value,
    });
  }



  const handleWeekChange = (e) => {
    const { value } = e.target;

    setFilters({
      ...filters,
      month: '',
      weekly: value,
    });
  

  }
  const handleInputChange = (e, field) => {
    const { value } = e.target;

    setFilters({
      ...filters,
      [field]: value,
    });
  



  };



  async function alertsTrend() {
    const area_user = JSON.parse(localStorage.getItem('role'))
    const userArea = id || ''
    let payload;
    if(userArea) {
      payload = {
        ...filters,
        area: userArea
      };
    }else {
       payload = {
      ...filters
    };
    } 
    const controller = new AbortController();
   
    try {
      const res = await analyticsPageService.alertsTrend(payload, { signal: controller.signal })
      console.log('resssssss', res)
      if (res.statusText.toLowerCase() == 'ok') {
        if (filters.month) {

          setTurnoverChartState({
            ...TurnoverChartState,
            series: res?.data?.series,
            options: {
              ...TurnoverChartState.options,
              xaxis: {
                categories: res?.data?.categories,
                labels: {
                  rotate: -45,
                  style: {
                    fontSize: window.innerWidth <= 768 ? '8px' : '12px',
                  },
                  formatter: function (value) {
                    // Find the index of the current value
                    const index = res?.data?.categories.indexOf(value);

                    console.log('value index', value, index);
                    // Show every 3rd label in the mobile view
                    if (window.innerWidth <= 768) {
                      return index % 3 === 0 ? value : '';
                    }
                    return value;
                  },
                },
              },
              tooltip: {
                enabled: true,
                x: {
                  formatter: function (value) {
                    return 'Day ' + value;
                  },
                },
              },
            },
          });
        } else {
          setTurnoverChartState(prevState => ({
            ...prevState,
            series: res?.data?.series,
            options: {
              ...prevState.options,
              xaxis: {
                ...prevState.options.xaxis,
                categories: res?.data?.categories
              }
            }
          }));
        }


        setChartLoader(false)
      }
    } catch (err) {
      console.log('Alerts Trend Chart Error', err)
      setChartLoader(false)
      return () => controller.abort(); // Abort previous request on cleanup
    }

  }

  const renderFilters = () => {
    const transformFilterValue = (value, key) => {
      if (key === 'month') {
        return formatMonth(value);
      }
      if (key === 'weekly') {
        return formatWeek(value);
      }
      return value;
    };

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => ['shift', 'month', 'weekly'].includes(key) && Boolean(value))
      .map(([key, value]) => transformFilterValue(value, key));

    return activeFilters.length >= 2
      ? `${activeFilters[0]} and ${activeFilters[1]}`
      : activeFilters.length === 1
        ? activeFilters[0]
        : "";
  };

  console.log('TurnoverChartState', TurnoverChartState)
  const filterButtonstyle = { width: "155px", height: "38px", fontSize: 13, margin: "0" };
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col xs="12" sm='7' md='6' className="">
            <h5 className="">Alerts Trend </h5><span className="f-light alerts-trend-span">
              For {renderFilters() ? renderFilters() : 'Year 2024'}
            </span>
          </Col>
          <Col xs="12" sm='5' md='6'
            className=" d-flex flex-row flex-md-row flex-column justify-content-start justify-content-sm-end align-items-start align-items-sm-end align-items-md-start filter-container gap-2 align-self-end align-md-self-start">
            <CommonFIlterButton
              data={Shifts}
              handleInputChange={handleInputChange}
              style={filterButtonstyle}
              selectedItem={filters?.shift}
              firstOption={"Select Shift"}
              inputChangeOption={"shift"}
              clName={` ${filters?.shift && focusClass} filter-button-size`}
            />
            <div className="d-flex rounded-3 position-relative flex-column flex-md-row  gap-2 gap-md-0">
              {!filters.weekly && (
                <span
                  className="filters-weekly-span"
                >
                  Select Week
                </span>
              )}
              <Input
                className={`filter-button-size margin-for-weekly input-border-class-weekly m-0 mr-sm-2 
                          //  ${(filters.weekly && focusClass) ? focusClass : ''}`
                }
                type="week"
                name="week"
                id="week"
                max={CurrentWeek}
                value={filters.weekly || ''}
                placeholder="Select Week"
                style={{ ...filterButtonstyle }}  // Remove right border-radius for the first button
                onChange={handleWeekChange}
              />
              {!filters.month && (
                <span className="filter-month-span">
                  Select Month
                </span>
              )}
              <Input
                className={`filter-button-size input-border-class-month m-0 ${(filters.month && focusClass) ? focusClass : ''}`}
                type="month"
                name="month"
                id="month"
                max={new Date().toISOString().slice(0, 7)}
                value={filters.month || ''}
                style={{ ...filterButtonstyle }}
                onChange={handleMonthChange}

              />
            </div>

          </Col>

        </Row>
      </CardHeader>
      <CardBody className="p-0 p-md-4" >
        <div className="chart-container">
          <Row>
            <Col>
              <div id="chart-widget7">

                {chartLoader ? <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '350px' }}><Loader3 /></div> : <Chart
                  options={TurnoverChartState.options}
                  series={TurnoverChartState.series}
                  height={320}
                />}

              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

export default AreaLineChart 
