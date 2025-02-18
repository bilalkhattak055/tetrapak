import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import CommonFIlterButton from '../../../../Common/commonFilterButton/CommonFIlterButton'
// import { Shifts, monthlyDataa, weeklyData, shiftData, dummyJSON } from "../../../../Data/staticData/data";
import { Shifts, monthlyDataa, weeklyData, shiftData, dummyJSON } from "../../../../../Data/staticData/data";
import { Input } from 'reactstrap'
import { TurnoverChart } from '../analytics_data_temp';
import { formatMonth, formatWeek } from '../../../../../utils/formatDate';
import { errorToast, getWeek } from "../../../../../_helper/helper";
import Chart from "react-apexcharts";
import './alertTrend.css'
import { analyticsPageService } from '../../../../../api/analyticsPageService';
import { getCurrentWeekWithYear } from '../../../../../utils/currentWeekWithYear';
// import Loader3 from '../../../../CommonElements/Spinner/loader3'
import Loader3 from '../../../../../CommonElements/Spinner/loader3'
import liveanalyticcontext from '../../../../../_helper/formData/LiveAnalytics/LiveAnalytics'

const AlertsTrendChart = ({ref, chartData, area_ID, filters }) => {
  // const subAreas = ['AO-1', 'AO-2', 'AO-3', 'AO-4', 'AO-5', 'AO-6', 'AO-7', 'AO-8', 'AO-9', 'AO-10', 'AO-11', 'AO-12', 'AO-13', 'AO-14', 'AO-15'];
  // const areaOwner = ['Adil', 'Aftab', 'Arsalan', 'Ayesha Khaliq', 'Dr. Amjad', 'Meraj', 'Moazzam Ali', 'Muhammd Shahbaz', 'Muhammd Wasi', 'Nazir', 'Sadia', 'Shafiq', 'Shahbaz', 'Sheraz', 'Umair Pervaiz'];
  // const areas = ['Helmet', 'Vest', 'E. Exit', 'Gaurd', 'MMHE'];

  const [TurnoverChartState, setTurnoverChartState] = useState(TurnoverChart)
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)

  const {alerttrendcontext, setalerttrenddatacontext} = useContext(liveanalyticcontext)


  useEffect(() => {
  
    if (!chartLoader) {
      setChartLoader(true);
      alertsTrend();
    }

  }, [filters]);
  const [chartLoader, setChartLoader] = useState(false)

  
  

  async function alertsTrend() {

    const area_user = JSON.parse(localStorage.getItem('role'))
    const fils = JSON.parse(localStorage.getItem('dashfilters'))
    const userArea = area_ID ? area_ID : area_user == 'area' ? JSON.parse(localStorage.getItem('userData')).area_ids.name : "";
    let payload;
    if (userArea) {
     
        payload = {
          ...fils,
          area: userArea,
          factory_id: factoryID,
          weekly: filters.weekly,
        };
      }

    
    else {
      
        payload = {
          ...filters,
          factory_id: factoryID,
          weekly: filters.weekly,
        };
    }
    console.log('payloadpayload', payload)
    const controller = new AbortController();

    try {
      const res = await analyticsPageService.alertsTrend(payload, { signal: controller.signal })
      if (res.statusText.toLowerCase() == 'ok') {
        const updatedcategories = res?.data?.categories.map((category, index) => {
          // return Math.ceil(index + 1);  
          return  category
        });
        console.log(updatedcategories,'updated categories')
        setalerttrenddatacontext(res?.data?.series)
        if (filters.month) {
          setTurnoverChartState({
            ...TurnoverChartState,
            series: res?.data?.series,
            options: {
              markers: {
                size: 4,
                hover: {
                  size: 6
                }
              },
              ...TurnoverChartState.options,
              colors: [
                "#635470",
                "#23946C", // helmet
                "#E69151", // boots
                "#8E66FF", // glasses
                "#F1CA32", // mask
                "#26B6B4", // gloves
              ],
              xaxis: {
                categories: updatedcategories,
                labels: {
                  rotate: -45,
                  style: {
                    fontSize: window.innerWidth <= 768 ? '8px' : '12px',
                  },
                  formatter: function (value) {
                    // Find the index of the current value
                    const index = updatedcategories.indexOf(value);

                    console.log('value index', value, index);
                    // Show every 3rd label in the mobile view
                    if (window.innerWidth <= 768) {
                      return index % 3 === 0 ? value : '';
                    }
                    return Math.floor(value);
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
              // xaxis: {
              //   ...prevState.options.xaxis,
              //   categories: updatedcategories
              // }
              xaxis: {
                ...prevState.options.xaxis,
                categories: updatedcategories,
                labels: {
                  rotate: -45,
                  style: {
                    fontSize: window.innerWidth <= 768 ? '8px' : '12px',
                  },
                  // formatter: function (value) {
                  //   return Math.floor(value).toFixed(0);
                  // },
                },
              },
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
    <Card ref={alerttrendcontext} style={{borderRadius:'32px',height:'399px'}}>
      {/* <CardHeader>
        <Row>
          <Col xs="12" sm='7' md='6' className="">
            <h5 className="">Alerts Trend </h5> 
          </Col>
          <Col xs="12" sm='5' md='6'
            className=" d-flex flex-row flex-md-row flex-column flex-wrap justify-content-start justify-content-sm-end align-items-start align-items-sm-end align-items-md-start filter-container gap-2 align-self-end align-md-self-start">
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
      </CardHeader> */}
      <h5 className="px-4 py-3" style={{fontSize:'24px',fontWeight:'500',color:'#383838',}}>Alerts Trend </h5>
 
      {chartLoader ? <div className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute ' style={{height:'100%'}} ><Loader3 /></div> : <>
      <CardBody>
        <Chart
                    options={TurnoverChartState.options}
                    series={TurnoverChartState.series}
                    height={'268px'}
                  />
      </CardBody>
      
      </>}
        {/* <div className="chart-container">
          <Row>
            <Col>
              <div id="chart-widget7">

                {chartLoader ? <div className='d-flex justify-content-center align-items-center w-100 ' ><Loader3 /></div> : <Chart
                  options={TurnoverChartState.options}
                  series={TurnoverChartState.series}
                  height={'268px'}
                />}

              </div>
            </Col>
          </Row>
        </div> */}
 
    </Card>
  )
}

export default AlertsTrendChart
