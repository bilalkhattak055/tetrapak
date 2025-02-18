import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Card, Container, Row, Col, CardBody, CardHeader } from 'react-bootstrap'
import Loader3 from '../../../../CommonElements/Spinner/loader3'
import SkeletonLoader from '../../../../CommonElements/Spinner/SkeletonLoader'
import { RecentOrderChart } from "./analytics_data_temp";
import ReactApexChart from "react-apexcharts";
import { ArrowDown, ArrowUp } from "react-feather";
import "../AIModelReports/custom.css";
import { getWeek } from "../../../../_helper/helper";
import { dummyJSON } from "../../../../Data/staticData/data";
import ApexInteractiveHeatmap from "./components/HeatMap";
import ProgressBars from "./components/ProgressBars";
import AlertsTrendChart from "./components/AlertsTrendChart";
import AreaService from "../../../../api/areaService";
import { getCurrentWeekNumber } from "../../../../utils/getCurrentWeekNumber";
import CameraService from "../../../../api/cameraService";
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import { analyticsPageService } from "../../../../api/analyticsPageService";
import AccuracyCardDesign from "./New componens/Cards/AccuracyCardDesign";
import HeroSection from "./New componens/HeroSection";

// new grapghs
import Newprogresbar from './New componens/Grapgh/ProgressBar'
import NewDonutChart from './New componens/Grapgh/NewDonutChart'
import NewHeatMap from "./New componens/Grapgh/NewHeatMap";
import NewTrendAlerts from './New componens/Grapgh/NewLineChart'
import NewBarChart from "./New componens/Grapgh/NewBarChart";
import { useWindowSize } from './New componens/CustomHook/Check_Screen_Width'
const AnalyticsPage = () => {
    const { width } = useWindowSize(); 
    const [loadingForDonut, setLoadingForDonut] = useState(true)
    const [loadingForBars, setLoadingForBars] = useState(false)
    const [heatmapLoader, setHeatmapLoader] = useState(false)
    const [connectivityLoader, setConnectivityLoader] = useState(true)
    const [acuuracyLoader, setAccuracyLoader] = useState(true)
    const [accuracyPercent, setAccuracyPercent] = useState()
    const [accuracySectionData, setAccuracySectionData] = useState({
        aiAccuracy: undefined,
        connectivity: undefined,
        highSeverityAlerts: undefined,
        maxAlerts: undefined
    })
    const [severityAlertsData, setSevirityAlertsData] = useState()
    const [severityLoader, setSevirityLoader] = useState(true)
    const [recentOrderChart, setRecentOrderChart] = useState(RecentOrderChart)
    const [DonutSeries, setDonutSeries] = useState()
    const [extractedData, setExtractedData] = useState({
        maxAlerts: 0,
        module: '',
        camera: '',
        owner: '',
        subArea: '',
    })
    const [CurrentWeek, setCurrentWeek] = useState(undefined)
    const [heatmapData, setHeatmapData] = useState({
        areas: [],
        subAreas: [],
        areaOwner: [],
        data: [],
    });
    const [progressData, setProgressData] = useState(undefined);
    const [week, setWeek] = useState(undefined);
    const [chartData, setChartData] = useState({
        categories: [],
        series: [],
    });
    const [loader, setLoader] = useState(false);

    //   api calling for new design
    useEffect(() => {
        fetchSevirityData()
        setHeatmapLoader(true)
        fetchAnalyticsBars()
        fetchAnlyticsData()
        fetchHeatmapData()
        // fetchConnectivity()
        modelAccuracy()

        //parse JSON data
        const parseJSONData = () => {
            const parsedData = JSON.parse(dummyJSON); // Parse the JSON
            const newSeries = parsedData.complianceData.series; // Extract the series data

            //top right section data 
            setAccuracySectionData(prevState => ({
                ...prevState,
                aiAccuracy: parsedData?.aiAccuracy,
                highSeverityAlerts: parsedData?.highSeverityAlerts,
                maxAlerts: parsedData?.maxAlerts,
            }));

            //progress bars
            setWeek(parsedData.week);
            // setProgressData(parsedData?.progressData);

            //heatmap
            // setHeatmapData(parsedData.heatmapData);

            // Set dynamic categories and series for chart
            setChartData({
                categories: parsedData.alertsTrendChart.categories,
                series: parsedData.alertsTrendChart.series,
            });



        };
        parseJSONData();

        // setLoader(true);
        const curr_date = new Date().toLocaleDateString("en-CA");
        // let unsubscribe = fetchAlerts(curr_date);
        const now = new Date();
        const year = now.getFullYear();
        const week = getWeek(now);
        const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
        setCurrentWeek(maxWeek);
        // return () => unsubscribe;
    }, []);
 
    const tooltipContent = [
        { label: 'Max alerts by', value: 'AO-1 ( Adil )' },
        { label: 'Sub Area', value: 'Palletizing corridor' },
        { label: 'Alerts', value: '10' }
    ] 
    async function fetchAnalyticsBars() {
        setLoadingForBars(true)
        try {
            const payload = {
                areaname: ''
            }
            const res = await AreaService.fetchAnalyticsProgressGbl(payload)
            if (res.status == 200) {
                const updatedData = res?.data?.progressData.map(item => ({
                    ...item,
                    tooltipContent: [
                        { label: 'Max alerts by', value: `${item.area_with_max_alerts} (${item.area_owner})` },
                        { label: 'Sub Area', value: `${item.subarea_with_max_alerts}` },
                        { label: 'Alerts', value: `${item.max_alerts}` },
                    ]
                }));

                setProgressData(updatedData);
            }
            setLoadingForBars(false)
        } catch (err) {
            console.log('Analytics page, Progress bars section error', err)
            setLoadingForBars(false)
        }
    }
    async function fetchAnlyticsData() {
        const payload = {
            area: ''
        }
        try {
            const res = await AreaService.fetchAnalyticsPercentGbl(payload)
            if (res.status == 200) {
                // Update the chart state with the new series data
                setRecentOrderChart((recentOrderChart) => ({
                    ...recentOrderChart,
                    series: res?.data?.complianceData?.series,  // Update series with parsed data
                }));
            }
            setLoadingForDonut(false)
        } catch (err) {
            console.log("Analytics page, Donut chart error", err)
            setLoadingForDonut(false)
        }

    }
    async function fetchSevirityData() {
        try {
            const res = await analyticsPageService.highSevrityF()
            if (res.status == 200) {
                setSevirityAlertsData(res?.data)

            }
            setSevirityLoader(false)

        } catch (err) {
            setSevirityLoader(false)
            console.log("High sevirity data Error", err)

        }

    }
    function processHeatmapDat(heatmapData) {
        const areas = heatmapData.areas;
        const areaOwner = heatmapData.areaOwner;
        const subAreas = heatmapData.subAreas;
        const data = heatmapData.data;

        let maxAlerts = 0;
        let module = '';
        let cameraIndex = -1;

        // Find the module with maximum alerts
        data.forEach((moduleData) => {
            moduleData.data.forEach((alerts, index) => {
                if (alerts > maxAlerts) {
                    maxAlerts = alerts;
                    module = moduleData.name;
                    cameraIndex = index;
                }
            });
        });

        // Extract the corresponding area, owner, and sub-area
        const camera = areas[cameraIndex];
        const owner = areaOwner[cameraIndex];
        const subArea = subAreas[cameraIndex];

        return { maxAlerts, module, camera, owner, subArea };
    }
    async function fetchHeatmapData() {
       const week=getCurrentWeekWithYear();
        try {
            const payload={
                user_id:JSON.parse(localStorage.getItem('userData')).id,
                "shift": "",
                "weekly": week,
                "month": ""
            }
            const res = await AreaService.fetchAnalyticsHeatmapGbl(payload)
            if (res.status == 200) {
                setHeatmapData(res?.data?.heatmapData);
            }
            // Process the heatmap data to find the required values
            const extractedData = processHeatmapDat(res?.data?.heatmapData);

            // Update the state with processed data
            setExtractedData(extractedData);
            setHeatmapLoader(false)
        } catch (err) {
            console.log("Analytics page, Heatmap chart error", err)
            setHeatmapLoader(false)
        }

    }
     
    useEffect(() => {
        setLoader(true)
        CameraService.getAllLiveCameras()
            .then((res) => {
                const response = res?.data?.data;
                const conn_percentage =
                    response?.length > 0
                        ? Math.round(
                            (response?.filter((i) => i?.active === true)?.length /
                                response?.length) *
                            100
                        ).toFixed(0)
                        : 0;

                setAccuracySectionData(prevState => ({
                    ...prevState,
                    connectivity: {
                        value: conn_percentage,
                        trend: conn_percentage > 50 ? "up" : "down",
                        status: conn_percentage > 0 ? "All Systems operational" : "Systems are down"
                    }
                }));
                setConnectivityLoader(false)
            })
            .catch((e) => {
                setConnectivityLoader(false)
                console.log(e);
            });
    }, []);

    async function modelAccuracy() {
        const payload = {
            week: getCurrentWeekWithYear(),
        };
        try {
            const res = await AreaService.getModelAccuracyChart(payload);
            if (res?.statusText?.toLocaleLowerCase() == 'ok') {
                const models = res?.data?.totalAlertsChart;
                const totalValue = models.reduce((sum, model) => sum + model.value, 0);
                // Calculate the average percentage
                const averagePercentage = (totalValue / models.length).toFixed(0) || 0;
                setAccuracyPercent(averagePercentage)
            }
            setAccuracyLoader(false)
        } catch (err) {
            console.log('Ai accuracy error'.err)
            setAccuracyLoader(false)
        }
    }
    const cardClass = `d-flex flex-column mb-0 gap-2 p-2 p-md-2 justify-content-center`
 
    const [SmallCardsData, setSmallCardsData] = useState({
        accuracy: '',
        connectivity: '',
        highalerts: ''
    })

    useEffect(() => {

        setSmallCardsData({
            accuracy: accuracyPercent,
            connectivity: accuracySectionData.connectivity,
            highalerts: accuracySectionData.highSeverityAlerts,
            maxalerts: accuracySectionData.maxAlerts
        })

    }, [accuracyPercent, accuracySectionData])

    return (
        <Fragment>
         

                {/* Hero section cards */}
               
                {width < 1400 ?
                    <Row>
                        <HeroSection data={SmallCardsData} severityAlertsData={extractedData} width={width} />
                        <Col xs='12' >
                            <Card className="px-3" style={{ borderRadius: '24px' }}>
                                <Row>
                                    <Col xxl='12' lg='6' md='12' className="border">
                                    
                                        <NewDonutChart seriess={recentOrderChart.series} />
                                    </Col>
                                    <Col xxl='12' lg='6' md='12' className="border">

                                        <NewBarChart
                                            progressData={progressData}
                                            week={week}
                                            loadingForBars={loadingForBars}
                                        />
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                        <Col xs='12'>
                            <NewTrendAlerts chartData={chartData} />
                        </Col>
                        <Col xs='12'>
                            <NewHeatMap
                                heatmapData={heatmapData}
                                moduleLength={progressData?.length}
                            />
                        </Col>

                    </Row> : <>
                        <Row style={{ 
                            // height: 'calc(100vh - 122px)', 
                            overflowY: 'hidden' }}>
                            {/* First Column - Sticky */}
                            <Col xxl='4' >
                                <Card
                                    className="px-3 m-0"
                                    style={{
                                        borderRadius: '24px',
                                        // position: 'sticky',
                                        // top: 0,
                                        // height: 'calc(100vh - 122px)',
                                        // overflowY: 'auto',
                                    }}
                                > 
                                    <Row style={{ height: '100%' }}>
                                        <Col xxl='12' lg='6' md='12'>
                                            <NewDonutChart seriess={recentOrderChart.series} />
                                        </Col>
                                        <Col xxl='12' lg='6' md='12'>
                                            <NewBarChart
                                                progressData={progressData}
                                                week={week}
                                                loadingForBars={loadingForBars}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            {/* Second Column - Scrollable */}
                            <Col xxl='8' className="pb-2 custom-scroll" style={{ overflowY: 'auto', 
                                // height: 'calc(100vh - 80px)' 
                                }}>
                                <style jsx>{`
                                    .custom-scroll {
                                        /* Firefox */
                                        scrollbar-width: thin;
                                        scrollbar-color: #175fa4 #f1f1f1;
                                    }

                                    /* Webkit browsers (Chrome, Safari, Edge) */
                                    .custom-scroll::-webkit-scrollbar {
                                        width: 8px; /* Width of the scroll bar */
                                    }

                                    .custom-scroll::-webkit-scrollbar-thumb {
                                        background-color: #175fa4; /* Color of the thumb */
                                        border-radius: 10px; /* Rounded corners of the thumb */
                                    }

                                    .custom-scroll::-webkit-scrollbar-track {
                                        background-color: #f1f1f1; /* Background color of the track */
                                    }
                                    `}</style>
                                <Row>
                                    <HeroSection data={SmallCardsData} severityAlertsData={extractedData} />
                                    <Col xs='12'>
                                        <NewTrendAlerts chartData={chartData} />
                                    </Col>
                                    <Col xs='12'>
                                        <NewHeatMap
                                            heatmapData={heatmapData}
                                            moduleLength={progressData?.length}
                                        />
                                    </Col>
                                    
                                </Row>
                            </Col>
                        </Row>
                       
                    </>} 
        </Fragment>
    );
};

export default AnalyticsPage;
