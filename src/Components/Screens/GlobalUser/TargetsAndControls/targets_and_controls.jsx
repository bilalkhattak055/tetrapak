import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import Chart from "react-apexcharts";
import UpdateTargetModel from "./Components/update_target_model";
import moment from "moment";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { errorToast, getWeek, successToast, } from "../../../../_helper/helper";
import "./targets.css"
import { AiOutlineEdit } from "react-icons/ai";
import { ArrowDown, ArrowUp, Check } from "react-feather";
import { tarConService } from "../../../../api/tarConService";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import TargetControlContext from '../../../../_helper/formData/TargetControl/TargetControlContext'

const TargetsAndControls = ({ area: areaD }) => {
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const {
    targetFiltersContext,
    setTargetFiltersContext,
    targetDetailsContext,
    setTargetDetailsContext,
    setcompliancechartcontext,
    setalertchartcontext,
    complianceRef,
    alertRef
  
} = useContext(TargetControlContext)

  let lastWeekYear = year;
  let lastWeek = week - 1;

  // Handle case when it’s the first week of the year
  if (lastWeek === 0) {
    lastWeekYear = year - 1;
    lastWeek = getWeek(new Date(lastWeekYear, 11, 31)); // Get the last week of the previous year
  }
  const minWeek = `${lastWeekYear}-W${String(lastWeek).padStart(2, "0")}`;

  const [filters, setFilters] = useState({
    week: getCurrentWeekWithYear(),
  });
  const [targetweek, setTargetweek] = useState("");
  const [factoryAreas, setFactoryAreas] = useState([]);
  const [singleCardData, setSingleCardData] = useState()
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [toggleSelection, setToggleSelection] = useState(false);
  const [serverError, setServerError] = useState(undefined)
  const [sendData, setSendData] = useState({})
  const [hundredPercent, setHundredPercent] = useState([])
  const [loader, setLoader] = useState(false);
  const [currentTarget, setcurrentTarget] = useState()
  const dummydata = [
    {
      week: 46,
      year: 2024,
      areas: [
        {
          area_id: "AO-1",
          perc_ded: '-20%',
          owner: "Adil",
          last_week: {
            target: 100,
            alerts: 110,
          },
          current_week: {
            target: 100,
            alerts: 120,
          },
        },

        {
          area_id: "AO-13",
          perc_ded: '-20%',
          owner: "Shahbaz",
          last_week: {
            target: 145,
            alerts: 155,
          },
          current_week: {
            target: 140,
            alerts: 120,
          },
        },
        {
          area_id: "AO-14",
          perc_ded: '-20%',
          owner: "Sheraz",
          last_week: {
            target: 190,
            alerts: 200,
          },
          current_week: {
            target: 180,
            alerts: 160,
          },
        },
        {
          area_id: "AO-15",
          perc_ded: '-20%',
          owner: "Umair Pervaiz",
          last_week: {
            target: 130,
            alerts: 140,
          },
          current_week: {
            target: 120,
            alerts: 100,
          },
        },
      ],
    },
    {
      week: 47,
      year: 2024,
      areas: [
        {
          area_id: "AO-1",
          last_week: {
            target: 100,
            alerts: 90,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Adil",
        },
        {
          area_id: "AO-2",
          last_week: {
            target: 115,
            alerts: 95,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Aftab",
        },
        {
          area_id: "AO-3",
          last_week: {
            target: 135,
            alerts: 110,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Arslan",
        },
        {
          area_id: "AO-4",
          last_week: {
            target: 155,
            alerts: 125,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Ayesha Khaliq",
        },
        {
          area_id: "AO-5",
          last_week: {
            target: 170,
            alerts: 140,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Dr. Amjad",
        },
        {
          area_id: "AO-6",
          last_week: {
            target: 125,
            alerts: 105,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Meraj",
        },
        {
          area_id: "AO-7",
          last_week: {
            target: 85,
            alerts: 70,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Moazzam Ali",
        },
        {
          area_id: "AO-8",
          last_week: {
            target: 195,
            alerts: 165,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Muhammad Shahbaz",
        },
        {
          area_id: "AO-9",
          last_week: {
            target: 65,
            alerts: 55,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Muhammad Wasi",
        },
        {
          area_id: "AO-10",
          last_week: {
            target: 150,
            alerts: 130,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Nazir Sb",
        },
        {
          area_id: "AO-11",
          last_week: {
            target: 95,
            alerts: 85,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Sadia",
        },
        {
          area_id: "AO-12",
          last_week: {
            target: 105,
            alerts: 90,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Shafiq",
        },
        {
          area_id: "AO-13",
          last_week: {
            target: 140,
            alerts: 120,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Shahbaz",
        },
        {
          area_id: "AO-14",
          last_week: {
            target: 180,
            alerts: 160,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Sheraz",
        },
        {
          area_id: "AO-15",
          last_week: {
            target: 120,
            alerts: 100,
          },
          current_week: {
            target: 0,
            alerts: 0,
          },
          perc_ded: '-20%',
          owner: "Umair Pervaiz",
        },
      ],
    },
  ];
  let dummyAlertCount;
  if (areaD) {
    dummyAlertCount = [
      { camera: "Cam-01", current_week_target: 40, actual: 30 },
      { camera: "Cam-02", current_week_target: 10, actual: 10 },
      { camera: "Cam-03", current_week_target: 20, actual: 12 },
      { camera: "Cam-04", current_week_target: 56, actual: 22 },
      { camera: "Cam-05", current_week_target: 26, actual: 12 },
      { camera: "Cam-06", current_week_target: 76, actual: 56 },
      { camera: "Cam-07", current_week_target: 40, actual: 35 },
      { camera: "Cam-08", current_week_target: 20, actual: 8 },
      { camera: "Cam-09", current_week_target: 98, actual: 89 },
      { camera: "Cam-10", current_week_target: 112, actual: 100 },
      { camera: "Cam-11", current_week_target: 145, actual: 123 },
      { camera: "Cam-12", current_week_target: 40, actual: 14 },
      { camera: "Cam-13", current_week_target: 27, actual: 22 },
      { camera: "Cam-14", current_week_target: 59, actual: 46 },
      { camera: "Cam-15", current_week_target: 80, actual: 73 },
    ]
  } else {
    dummyAlertCount = [
      { area: "AO-1", current_week_target: 40, actual: 30 },
      { area: "AO-2", current_week_target: 10, actual: 10 },
      { area: "AO-3", current_week_target: 20, actual: 12 },
      { area: "AO-4", current_week_target: 56, actual: 22 },
      { area: "AO-5", current_week_target: 26, actual: 12 },
      { area: "AO-6", current_week_target: 76, actual: 56 },
      { area: "AO-7", current_week_target: 40, actual: 35 },
      { area: "AO-8", current_week_target: 20, actual: 8 },
      { area: "AO-9", current_week_target: 98, actual: 89 },
      { area: "AO-10", current_week_target: 112, actual: 100 },
      { area: "AO-11", current_week_target: 145, actual: 123 },
      { area: "AO-12", current_week_target: 40, actual: 14 },
      { area: "AO-13", current_week_target: 27, actual: 22 },
      { area: "AO-14", current_week_target: 59, actual: 46 },
      { area: "AO-15", current_week_target: 80, actual: 73 },
    ]
  }
 
  const [targetsData, setTargetsData] = useState({
    safety_compliance: [
      { week: "Week 40", current_week_target: 15, actual: 90 },
      { week: "Week 41", current_week_target: 70, actual: 10 },
    ],
    target_areas: dummydata,
    filter_target_areas: dummydata,
    alert_count: [],
  });


  const [complianceChartData, setComplianceChartData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 300,
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: "25px",
          dataLabels: {
            position: "top",
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 280,
            },
            plotOptions: {
              bar: {
                barHeight: "30px",
                horizontal: true,
              },
            },
            yaxis: {
              labels: {
                rotate: -45,
                rorateAlways: true,
                formatter: function (value) {
                  return "W" + value.toString()?.split(" ")[1];
                },
              },
            },
            grid: {
              show: true,
              borderColor: "#90A4AE",
              strokeDashArray: 0,
              position: "back",
              xaxis: {
                lines: {
                  show: false,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
          },
        },
      ],
      colors: ["#0b76b7", "#41b2ef"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: true,
        categories: areaD ? targetsData?.safety_compliance?.map((i) => i?.week) : [],
        labels: {
          show: true,
          offsetY: 0,
        },
      },
      yaxis: {
        show: true,
        forceNiceScale: true,
        min: 0,
        max: undefined,
        labels: {
          show: true,
          trim: true,
          style: {
            fontSize: "12px",
            fontWeight: "semibold",
            cssClass: "apexcharts-xaxis-label",
          },
          offsetY: 0,
        },
      },

      colors: ["#0b76b7", "#41b2ef"],
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        shared: true,
        y: {
          formatter: function (value) {
            return value;
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "13px",
        fontFamily: "Proxima Nova, sans-serif",
        fontWeight: 400,
        // offsetX: -30,
        offsetY: 10,
        labels: {
          colors: "#757575",
        },
        markers: {
          fillColors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Match legend colors to bars
          radius: 5, // Rounded borders of the legend markers
        },
      },
    },
    series: [
      {
        name: "Target",
        data: targetsData?.safety_compliance?.map((i) => i.current_week_target),
      },
      {
        name: "Alerts",
        data: targetsData?.safety_compliance?.map((i) => i.actual),
      },
    ],
  });

  const [alertCountChartData, setAlertCountChartData] = useState({
    options: {
      chart: {
        type: "bar",
        height: 300,
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 600,
            },
            plotOptions: {
              bar: {
                columnWidth: "60px",
                horizontal: true,
              },
            },
            yaxis: {
              labels: {
                rotate: -45,
                rorateAlways: true,
              },
            },
            grid: {
              show: true,
              borderColor: "#90A4AE",
              strokeDashArray: 0,
              position: "back",
              xaxis: {
                lines: {
                  show: false,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
          },
        },
      ],

      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      xaxis: {
        show: true,
        categories: areaD ? dummyAlertCount.map(item => item.camera) : [],
        labels: {
          show: true,
          offsetY: 0,
        },
        // title: {
        //   // text: area ? 'Cameras' : '',  // This sets the x-axis title
        //   offsetY: -5,     // Optional: Adjust the vertical position of the title if needed
        //   style: {
        //     fontSize: '14px',  // Optional: Customize the font size
        //     fontWeight: 'normal', // Optional: Customize the font weight
        //     color: '#333'       // Optional: Customize the color
        //   }
        // }
      },
      yaxis: {
        show: true,
        forceNiceScale: true,
        min: 0,
        max: undefined,
        labels: {
          show: true,
          trim: true,
          style: {
            fontSize: "12px",
            fontWeight: "semibold",
            cssClass: "apexcharts-xaxis-label",
          },
          offsetY: 0,
        },
      },

      colors: ["#0b76b7", "#41b2ef"],
      fill: {
        opacity: 1,
      },

      dataLabels: {
        enabled: false,
        offsetX: -1,
        offsetY: 1,
        style: {
          fontSize: "9px",
          fontFamily: "Proxima Nova, sans-serif",
          colors: ["white", "black"],
        },
      },
      tooltip: {
        enabled: true,
        intersect: false,
        shared: true,
        x: {
          show: true,
          // formatter: function (value) {
          //   return area ? "Camera: " + value : "Area: " + value;
          // },

        },
        y: {
          formatter: function (value) {
            return value;
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },

      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "13px",
        fontFamily: "Proxima Nova, sans-serif",
        fontWeight: 400,
        offsetX: 20,
        offsetY: 10,
        labels: {
          colors: "#757575",
        },
        // formatter: (w) => {
        //   return w?.toUpperCase();
        // },
      },
    },
    series: [
      {
        name: "Target",
        // data:[],
        data: dummyAlertCount?.map((i) => i.current_week_target),
      },
      {
        name: "Alerts",
        data: [],
        data: dummyAlertCount?.map((i) => i.actual),
      },
    ],
  });


  useEffect(() => {
    // fetchTarAndCon()
    setLoader(true);
    // setFilters({
    //   ...filters,
    //   week: maxWeek,
    // });

    setTargetweek(maxWeek);
    const current_week = moment().week();
    const current_year = moment().year();
    const current_week_data = dummydata?.filter(
      (item) => item?.week === current_week && item?.year === current_year
    );
    if (current_week_data?.length > 0) {
      setFactoryAreas(current_week_data[0]?.areas);
      setTargetDetailsContext(current_week_data[0]?.areas)
    }
    setFactoryAreas(current_week_data[0]?.areas);
    setTargetDetailsContext(current_week_data[0]?.areas)

    const sortedAlertCount = [...dummyAlertCount].sort((a, b) => {
      if (b.target === a.target) {
        return b.actual - a.actual; // If target is equal, sort by actual
      }
      return b.target - a.target; // Otherwise, sort by target
    });
    setTargetsData({ ...targetsData, alert_count: sortedAlertCount })


  }, []);

  const handleweekChange = (e) => {
    const { name, value } = e.target;
    setLoader(true);
    if (value?.trim() !== "") {
      setFilters({
        ...filters,
        [name]: value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: moment().format("YYYY") + "-" + moment().format("MM"),
      });
    }

  };
  const style = {
    width: "155px",
    height: "38px",
    fontSize: 13,
    margin: "10px 3px",
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedAreas(state.selectedRows);
  }, []);

  const [show, setShow] = useState(false);
  const handleShow = (value) => {
    setShow(value);
  };



  const handleUpdate = (area) => {
    console.log(area, 'all details of area')
    const CT = ((area.last_week.alerts - area.current_week.target) / area.last_week.alerts) * 100
    const finaltarget = `-${Math.round(CT / 5) * 5}%`
    setcurrentTarget(finaltarget)

    setSendData(area)
    setShow(!show);

  };

  const handleSave = (updated_target) => {
    console.log('updateddd target', updated_target)
    if (updated_target === '-100%') {
      setHundredPercent((prev) => ([
        ...prev,
        { id: sendData.id }
      ]))
    }


    // Parse the percentage
    const targetPercentage = parseFloat(updated_target.replace('%', '')) / 100;

    // Calculate the new alert target
    const currentAlerts = sendData.last_week.alerts;
    const newTarget = Math.round(currentAlerts + currentAlerts * targetPercentage);

    const updatedFactoryAreas = factoryAreas.map((area) => {
      if (areaD) {
        if (area.Camera_id === sendData.Camera_id) {
          console.log('areaddd', area)
          // Update the target
          return {
            ...area,
            current_week: {
              ...area.current_week,
              target: newTarget,
            },
          };
        }
      } else {
        if (area.id === sendData.id) {
          // Update the target
          return {
            ...area,
            current_week: {
              ...area.current_week,
              target: newTarget,
            },
          };
        }
      }

      return area;
    });
    setFactoryAreas(updatedFactoryAreas);
    setTargetDetailsContext(updatedFactoryAreas)

    const userId = JSON.parse(localStorage.getItem('userData')).id
    const weekupdate = sendData?.current_week?.week.toString().padStart(2, '0');
    const newDate = `${sendData?.current_week?.year}-W${weekupdate}`;
    // const newDate = `${sendData?.current_week?.year}-W${sendData?.current_week?.week}`
    // console.log('newDatenewDate', newDate)
    // console.log('areaID', areaID) 

    let payload;
    if (areaD) {
      payload = {
        user_id: userId,
        week: newDate,
        factory_id: factoryID,
        target: newTarget,
        camera_id: sendData?.id
      }
      if (newTarget !== null && newTarget !== undefined) {
        console.log('area target hit')
        areaEditTargetApi(payload)
      }

    } else {
      payload = {
        user_id: userId,
        week: newDate,
        factory_id: factoryID,
        target: newTarget,
        area_id: sendData?.id
      }

      if (newTarget !== null && newTarget !== undefined) {
        editTargetApi(payload)
      }
    }

    setSendData(null)





  };

  const editTargetApi = async (payload) => {
    try {
      setLoader(true);
      const res = await tarConService.targetEdit(payload)

      if (res.status === 200) {

        const newRes = await fetchTarAndCon()
        if (newRes) {
          successToast('Area Target updated');
          setLoader(false)
        }else {
          setLoader(false)
        }
        
      }
      
    } catch (err) {
      console.log('Edit Target Error:', err)
      setLoader(false)

    }
  }
  const areaEditTargetApi = async (payload) => {
    try {
      setLoader(true);
      tarConService.areaTargetEdit(payload).then((e) => {
        fetchTarAndConArea().then((a) => {
          successToast('Camera Target updated')
          setLoader(false)
        })

      }).catch((e) => {
        console.log(e)
      })

    } catch (err) {
      console.log('Edit Target Error:', err)
    }
  }


  const handleTargetweek = (e) => {
    const { name, value } = e.target;
    setSelectedAreas([]);
    setFactoryAreas([]);
    setToggleSelection(!toggleSelection);

    if (value?.trim() !== "") {
      setTargetweek(value);
      if (value !== "") {
        const selected_target_date = moment(value).format("WW-YYYY").split("-");
        const current_week_data = targetsData?.target_areas?.filter(
          (item) =>
            item?.week === parseInt(selected_target_date[0]) &&
            item?.year === parseInt(selected_target_date[1])
        );
        if (current_week_data?.length > 0) {
          setFactoryAreas(current_week_data[0]?.areas);
          setTargetDetailsContext(current_week_data[0]?.areas)
        }
      }
    } else {
      setTargetweek("");
    }
  };

  const fetchTarAndCon = async () => {
    const id = JSON.parse(localStorage.getItem('userData'))?.id;
    const payload = { ...filters, user_id: id, factory_id: factoryID, };
    setTargetFiltersContext(filters)
    try {
      const res = await tarConService.tarAndCon(payload);

      // console.log("respppppppppp", res)
      // const areasData = res.data.data.target_areas;
      const areasData = res.data.data.target_areas.sort((a, b) => {
        // Sort by `current_week.alerts` in descending order
        return b.current_week.alerts - a.current_week.alerts;
      });

      // console.log(sortedTargetAreas);
      const firstArea = areasData[0]
      const xAxisCategories = [
        `Week ${firstArea?.last_week?.week}`, // Last week's dynamic week number
        `Week ${firstArea?.current_week?.week}`, // Current week's dynamic week number
      ];

      const categories = areasData.map((item) => item.area_id);
      const targetData = areasData.map((item) => item.current_week.target);
      const alertsData = areasData.map((item) => item.current_week.alerts);

      // Calculate totals for current week and last week
      const currentWeekTotals = areasData.reduce(
        (acc, item) => {
          acc.target += item.current_week.target || 0;
          acc.alerts += item.current_week.alerts || 0;
          return acc;
        },
        { target: 0, alerts: 0 }
      );

      const lastWeekTotals = areasData.reduce(
        (acc, item) => {
          acc.target += item.last_week.target || 0;
          acc.alerts += item.last_week.alerts || 0;
          return acc;
        },
        { target: 0, alerts: 0 }
      );

      setalertchartcontext(()=>([
        { name: "Target", data: targetData },
        { name: "Alerts", data: alertsData },
        {categories}
      ]))
      setAlertCountChartData({
        options: {
          ...alertCountChartData.options,
          xaxis: {
            ...alertCountChartData.options.xaxis,
            categories,
          },
          tooltip: {
            ...alertCountChartData.options.tooltip,
            custom: function ({ series, seriesIndex, dataPointIndex, value }) {
              const data = areasData[dataPointIndex]; // Correctly reference data
              const area = data ? data.area_id : "N/A"; // Default to N/A if undefined
              const owner = data ? data.owner : "N/A"; // Default to N/A if undefined
              const alerts = data ? data.current_week.alerts : 'N/A';
              const target = data ? data.current_week.target : 'N/A';
              return `
              <div style="padding: 5px; font-size: 14px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
                <strong>Area:</strong> ${area} <br>
                <strong>Owner:</strong> ${owner} <br>
                <hr style="margin: 10px 0;">
                <strong>Alerts:</strong> ${alerts} <br>
                <strong>Target:</strong> ${target === 'null' ? 'N/A' : target} <br>
              </div>
                
              `;
            }
          },
        },
        series: [
          { name: "Target", data: targetData },
          { name: "Alerts", data: alertsData },
        ],
      });

      // Update compliance chart with total data
      setcompliancechartcontext(()=>([
        {
          name: "Target",
          data: [lastWeekTotals.target, currentWeekTotals.target],
        },
        {
          name: "Alerts",
          data: [lastWeekTotals.alerts, currentWeekTotals.alerts],
        },
      ]))
      setComplianceChartData({
        ...complianceChartData,
        series: [
          {
            name: "Target",
            data: [lastWeekTotals.target, currentWeekTotals.target],
          },
          {
            name: "Alerts",
            data: [lastWeekTotals.alerts, currentWeekTotals.alerts],
          },

        ],
        options: {
          ...complianceChartData.options,
          xaxis: {
            ...complianceChartData.options.xaxis,
            categories: xAxisCategories
          } // Set dynamic week numbers here
        },
        // series: [
        //   {
        //     name: "Current Week Target",
        //     data: [currentWeekTotals.target],
        //   },
        //   {
        //     name: "Current Week Alerts",
        //     data: [currentWeekTotals.alerts],
        //   },
        //   {
        //     name: "Last Week Target",
        //     data: [lastWeekTotals.target],
        //   },
        //   {
        //     name: "Last Week Alerts",
        //     data: [lastWeekTotals.alerts],
        //   },
        // ],
      });


      setFactoryAreas(areasData);
      setTargetDetailsContext(areasData)
      setLoader(false)
      setServerError(undefined)
    } catch (err) {
      console.log("Targets and Controls Error:", err);
      setServerError(err.message)
      setLoader(false)
    }
  };

  const fetchTarAndConArea = async () => {
    const id = JSON.parse(localStorage.getItem('userData'))?.id;
    const payload = { ...filters, user_id: id, factory_id: factoryID, };

    try {
      const res = await tarConService.areaTarAndCon(payload);


      // Sort the areas data by current week alerts in descending order
      const areasData = res.data.data.target_areas.sort(
        (a, b) => b.current_week.alerts - a.current_week.alerts
      );

      // Get the first area to dynamically set x-axis categories
      const firstArea = areasData[0];
      const xAxisCategories = [
        `Week ${firstArea?.last_week?.week}`, // Last week's dynamic week number
        `Week ${firstArea?.current_week?.week}`, // Current week's dynamic week number
      ];

      const categories = areasData.map((item) => {
        // const parts = item.Camera_id.split('-');
        // this change made by sheheryar
        const parts = item.id.split('-');
        return parts[parts.length - 1]; // Extract the last part of the Camera_id
      });

      const targetData = areasData.map((item) => item.current_week.target);
      const alertsData = areasData.map((item) => item.current_week.alerts);

      // Calculate totals for current week and last week
      const currentWeekTotals = areasData.reduce(
        (acc, item) => {
          acc.target += item.current_week.target || 0;
          acc.alerts += item.current_week.alerts || 0;
          return acc;
        },
        { target: 0, alerts: 0 }
      );

      const lastWeekTotals = areasData.reduce(
        (acc, item) => {
          acc.target += item.last_week.target || 0;
          acc.alerts += item.last_week.alerts || 0;
          return acc;
        },
        { target: 0, alerts: 0 }
      );

      // Set alert count chart data with custom tooltip
      setalertchartcontext(()=>([
        { name: "Target", data: targetData },
        { name: "Alerts", data: alertsData },
        {categories}
      ]))
      setAlertCountChartData({
        options: {
          ...alertCountChartData.options,
          xaxis: {
            ...alertCountChartData.options.xaxis,
            categories,
          },
          tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const area = areasData[dataPointIndex];
              return `
                <div style="padding: 10px; border: 1px solid #ccc; background: #fff;">
                  <strong>Camera ID:</strong> ${area.Camera_id}<br/>
                  <strong>SubArea:</strong> ${area.SubArea_name}<br/>
                  <strong>Target:</strong> ${series[0][dataPointIndex]}<br/>
                  <strong>Alerts:</strong> ${series[1][dataPointIndex]}
                </div>
              `;
            },
          },
        },
        series: [
          { name: "Target", data: targetData },
          { name: "Alerts", data: alertsData },
        ],
      });

      // Update compliance chart with total data
      setcompliancechartcontext(()=>([
        {
          name: "Target",
          data: [lastWeekTotals.target, currentWeekTotals.target],
        },
        {
          name: "Alerts",
          data: [lastWeekTotals.alerts, currentWeekTotals.alerts],
        }
      ]))
      setComplianceChartData({
        ...complianceChartData,
        series: [
          {
            name: "Target",
            data: [lastWeekTotals.target, currentWeekTotals.target],
          },
          {
            name: "Alerts",
            data: [lastWeekTotals.alerts, currentWeekTotals.alerts],
          },
        ],
        options: {
          ...complianceChartData.options,
          xaxis: {
            ...complianceChartData.options.xaxis,
            categories: xAxisCategories,
          },
        },
      });

      setFactoryAreas(areasData);
      setTargetDetailsContext(areasData)
      setLoader(false);
      setServerError(undefined)
    } catch (err) {
      console.log("Targets and Controls Error:", err);
      setServerError(err.message)
      setLoader(false);
    }
  };



  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userData')).id
    const payload = {
      week: filters.week,
      factory_id: factoryID,
      user_id: id,
    }
    if (!areaD) {
      fetchTarAndCon(payload);
    } else {
      fetchTarAndConArea()
    }
  }, [filters]);

  let targetcolor;
  const getStatusMessage = (a, percentageDiff, filters, week) => {
    console.log('filters.weekkkk', filters.week)
    console.log('weekkkk', week)
    switch (true) {
      case Math.abs(percentageDiff) === 0 && a.last_week.alerts !== 0 && a.current_week.target == null && parseInt(filters.week?.split('-')[1].slice(1), 10) === week:
        targetcolor = "black";
        return "Please set a targe";
      case a.last_week.alerts !== 0 && a.current_week.target == null && parseInt(filters.week?.split('-')[1].slice(1), 10) === week:
        targetcolor = "black";
        return "Please set a target";
      case a.last_week.alerts === 0 && a.current_week.target == null && parseInt(filters.week?.split('-')[1].slice(1), 10) === week:
        targetcolor = "black";
        return "Target cannot be set";
      case a.last_week.alerts !== 0 && a.current_week.alerts === 0 && a.current_week.target !== null:
        targetcolor = "#198754";
        return "Zero alert this week";
      case a.current_week.target >= a.current_week.alerts && a.current_week.target !== null:
        targetcolor = "#198754";
        return "Target achieved";
      case a.current_week.target <= a.current_week.alerts && a.current_week.target !== null:
        targetcolor = "#e74c3c";
        return "Target not achieved";
      case a.current_week.target == null:
        targetcolor = "black";
        return "Targer not set"
      default:
        return `${Math.round(Math.abs(percentageDiff)).toFixed(0)}% Alerts ${a.current_week.target < a.current_week.alerts ? 'increased' : 'decreased'} this week`;
    }
  };
  const [activeWeek, setActiveWeek] = useState([]);

  // Update activeWeek state when factoryAreas are loaded
  useEffect(() => {
    if (factoryAreas && factoryAreas.length > 0) {
      setActiveWeek(factoryAreas.map(() => "current"));
    }
  }, [factoryAreas]);

  const handleWeekClick = (week, index) => {
    const newActiveWeek = [...activeWeek]; // Create a shallow copy of the state
    newActiveWeek[index] = week; // Update the specific index
    setActiveWeek(newActiveWeek); // Update the state
  };
  return (
    <Fragment>
      <br />
      <Container fluid>
        {/* HEADER & FILTER */}
        <Row style={{ marginBottom: 0, alignItems: "flex-start" }}>
          <Col
            className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
           
          >
            <h5 style={{ fontSize: 20 }}>Targets And Controls</h5>
            <span className="f-light">{filters.week}</span>
          </Col>
          <Col className="col-12 col-sm-4 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end align-items-end " >
            <div className="filter-row">
              <Input
                className="form-control rounded-3 m-1"
                type="week"
                name="week"
                id="role"
                min={''}
                max={getCurrentWeekWithYear()}
                value={filters?.week}
                style={style}
                onChange={handleweekChange}
              />
            </div>
          </Col>
        </Row>
        {loader ? (
          <Loader1 />
        ) : serverError ? <><div className="w-100 d-flex justify-content-center align-items-center h-100"><div style={{ marginTop: '100px' }} className="d-flex flex-column gap-4 justify-content-center align-items-center"><p className="text-danger">{serverError}</p><p>Will soon resolve the server issue</p></div></div></> : (
          <>
            {/* SAFETY COMPLIANCE  & ALERTS COUNT */}
            <Row>
              <Col  className="col-12 col-sm-12 col-md-4 col-lg-5 col-xl-4 col-xxl-4">
                <p style={{ fontSize: 16, fontWeight: 400, marginBottom: 5, marginLeft: 2, marginTop: 5 }}>
                  Compliance Targets
                </p>
                <Card
                  className="target_card_compliance"
                  style={{ marginBottom: 10 }}
                >
                  <CardBody ref={complianceRef} style={{ padding: "20px 20px 20px 0px" }}>
                    <Chart
                      options={complianceChartData?.options}
                      series={complianceChartData?.series}
                      type="bar"
                      height={complianceChartData?.options?.chart?.height}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col  className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-8 col-xxl-8">
                <p style={{ fontSize: 16, fontWeight: 400, marginBottom: 5, marginLeft: 0, marginTop: 5 }}>
                  Alert Count
                </p>
                <Card
                  className="target_card_alert"
                  style={{ marginBottom: 10 }}
                >
                  <CardBody ref={alertRef} style={{ padding: "20px 20px 20px 0px" }}>
                    <Chart
                      options={alertCountChartData?.options}
                      series={alertCountChartData?.series}
                      type="bar"
                      height={alertCountChartData?.options?.chart?.height}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* FACTORY DROPDOWN & TABLE */}
            <Row style={{ marginBottom: 0, alignItems: "flex-center" }}>
              <Col
                className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <p className="mb-0" style={{ fontSize: 18, fontWeight: 500, marginTop: 5, marginLeft: 2, display: 'inline-block' }}>
                  {areaD ? 'Set Camera Targets' : 'Set Area Targets'}
                </p>
              </Col>
              <Col
                className="col-12 col-sm-4 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
              >
                <div className="filter-row">
                
                </div>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 20 }}>
            


              {
                factoryAreas.map((a, ind) => {
                  const isCurrentActive = activeWeek[ind] === "current";
                  const isLastActive = activeWeek[ind] === "last";
                  // const calculateReduction = (total, current) => {
                  //   return total > 0 ? ((total - current) / total * 100).toFixed(0) : 0; // Avoid divide-by-zero errors
                  // };
                  const calculateReduction = (total, current) => {
                    if (!current) {
                      return 0
                    }
                    if (total > 0) {
                      const percentage = ((total - current) / total) * 100;
                      return Math.round(percentage / 5) * 5; // Round to the nearest multiple of 5
                    }
                    return 0; // Return 0 if total is 0 to avoid divide-by-zero errors
                  };
                  const calculatePercentageDifference = (target, currAlerts) => {
                    console.log('targettarget', target)
                    console.log('currAlertscurrAlerts', currAlerts)
                    
                    if (currAlerts > 0 && target) {
                      const difference = ((currAlerts - target) / target) * 100;
                      // return Math.round(difference / 5) * 5; // Round to the nearest multiple of 5
                      return difference // Round to the nearest multiple of 5
                    }
                    return 0; // Return 0 if previous is 0 to avoid divide-by-zero errors
                  };
                  const percDedd = calculateReduction(a.last_week.alerts, a.current_week.target);
                  const percentageDiff = calculatePercentageDifference(a.current_week.target, a.current_week.alerts);
                  const statusMessage = getStatusMessage(a, percentageDiff, filters, week);
                  console.log('statusmessageff', statusMessage)
                  const percDed = calculateReduction(a.last_week.alerts, a.current_week.target); // Calculate percentage
                  return (
                    <>
                      <Col xxl='4' md='6' sm={12} >
                        <Card className="border shadow" style={{ backgroundColor: '#fff' }}>
                          <div style={{ padding: '8px 18px ' }}  >
                          {!areaD && <h6 className="ellipsis-text mb-0 mt-2">{a.owner}</h6>}
                            {/* {areaD && `Camera #${ind+1}`} */}
                            {areaD && <span className="f-light" style={{fontSize: '13px'}}>{`Camera ID: ${a?.id}`}</span>}
                          </div>
                          <CardBody className="mt-0 pt-0">
                            <div className="d-flex align-items-center gap-2 justify-content-between">
                             
                              {!areaD &&<span className="f-light" style={{fontSize:'13px'}}>{a.area_id}</span> }
                              {areaD &&<span className="f-light" style={{fontSize:'13px', visibility:'hidden'}}>{a.area_id}</span> }
                              

                              <h6 className="ellipsis-text">
                                <span style={{ fontSize: '13px', fontWeight: '200' }} className="f-light"> Reduction Target: </span>
                                {percDed === 0 || !percDed ? <span style={{ fontSize: '13px', fontWeight: '200' }} className='f-light'>N/A</span> : <span style={{ fontSize: '13px', fontWeight: '200' }} className="f-light"> {percDed}% </span>}

                                
                              </h6>

                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                              <div style={{ color: targetcolor, fontSize:'13px' }} className="my-2 d-flex align-items-center gap-2">
                                { a.current_week.target >= a.current_week.alerts && a.current_week.target != null ? (
                                    <Check size={15} color="green" />
                                  ) : ''
                                }
                                {
                                  statusMessage
                                }
                              </div>
                              {maxWeek?.split('-')[1]?.slice(1, 3) == a.current_week.week ?
                                <div style={{width:'max-content', cursor:'pointer'}} onClick={() => handleUpdate(a)} className="d-flex justify-content-center align-items-center"><span style={{fontSize:'13px', cursor:'pointer'}} className="f-light">Set Target</span> <AiOutlineEdit type="button"  style={{ fontSize: '15px', color: '#7e7a7e', fontWeight: '800', cursor: 'pointer' }} /></div>
                                : null}
                            </div>


                            <div className="d-flex justify-content-center align-items-center p-1 rounded-3" style={{ color: 'black', backgroundColor:'#f5f5f5', height:'44px' }}>
                              
                                 <p type='button' onClick={()=> handleWeekClick('current', ind)} className="w-50 m-0 rounded-3 text-center align-content-center" style={{backgroundColor: isCurrentActive ? '#fff' : '#f5f5f5', height:'40px'}}>Current Week</p>
                                 <p type='button' onClick={()=> handleWeekClick('last', ind)} className="w-50 m-0 rounded-3 text-center align-content-center" style={{backgroundColor: isLastActive ? '#fff' : '#f5f5f5', height:'40px'}}>Last Week</p>
                             
                              </div>
                            
                            {isCurrentActive && <div style={{ backgroundColor: 'white' }} className="rounded-3 p-2 my-2">
                              <div style={{ color: '#7e7a7e', fontWeight: '600' }} className="">
                                <div style={{ color: 'black', fontSize: '18px' }} className="p-0 m-0 text-center d-flex justify-content-between border-bottom border-2 pb-2"> 
                                  <p style={{ fontWeight: '100', color: '#7e7a7e' }} className="p-0 m-0 ">Target</p>
                                  <p> {a.current_week.target === null ? 'N/A' : a.current_week.target}</p>
                                 
                                </div>
                                <div style={{ color: 'black', fontSize: '18px' }} className="p-0 m-0 text-center d-flex justify-content-between pt-2">
                                  <p style={{ fontWeight: '100', color: '#7e7a7e' }} className="p-0 m-0">Alerts</p>
                                  <p>{a.current_week.alerts}</p>
                                </div>
                              </div>
                            </div>}
                            {/* <div style={{ color: '#7e7a7e' }}>Last Week</div> */}
                            {isLastActive && <div style={{ backgroundColor: 'white' }} className="rounded-3 p-2 my-2">
                              <div style={{ color: '#7e7a7e', fontWeight: '600' }} className="">
                                <div style={{ color: 'black', fontSize: '18px' }} className="p-0 m-0 text-center d-flex justify-content-between border-bottom border-2 pb-2">
                                  <p style={{ fontWeight: '100', color: '#7e7a7e' }} className="p-0 m-0">Target</p>
                                  <p> {a.last_week.target || 'N/A'}</p>
                           
                                </div>
                                <div style={{ color: 'black', fontSize: '18px' }} className="p-0 m-0 text-center d-flex justify-content-between pt-2">
                                  <p style={{ fontWeight: '100', color: '#7e7a7e' }} className="p-0 m-0">Alerts</p>
                                  <p>{a.last_week.alerts}</p>
                                </div>

                              </div>
                            </div>}
                          
                            

                          </CardBody>
                        </Card>
                      </Col>
                    </>
                  )
                })
              }



            </Row>
          </>
        )}
        {show && (
          <UpdateTargetModel
            data={sendData}
            handleSave={handleSave}
            handleShow={handleShow}
            targetweek={targetweek}
            showModal={show}
            selectedAreas={selectedAreas}
            selectedweek={targetweek}
            currentTarget={currentTarget}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default TargetsAndControls;
