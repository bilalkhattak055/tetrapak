import React, { useState, useEffect } from 'react';
import ModelAnalyticsHeader from '../CameraConfigurationV2/Components/ModelAnalytics';
import { WeekFilterProvider, useWeekFilter } from '../../../../Contexts/WeakGlobal';
import PerformanceGrid from './Components/LeaderBCard';
import RankingTable from './Components/LeaderBTable';
import { Container } from 'reactstrap';
import AreaService from '../../../../api/areaService';
import Loader1 from '../../../../CommonElements/Spinner/loader'
//
const LeaderBoardContent = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {CurrentweekForLeaderBoard } = useWeekFilter();
    const factoryID = JSON.parse(localStorage.getItem('userData'))?.factory?.id || 14;

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points;
            }
            if (a.totalalert !== b.totalalert) {
                return a.totalalert - b.totalalert;
            }
            return b.compliance_percentage - a.compliance_percentage;
        });
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const payload = {
                    flag: true,
                    factory_id: factoryID,
                    week: CurrentweekForLeaderBoard
                };

                const res = await AreaService.fetchDataForLeaderBoard(payload);

                if (res.data) {
                    const updatedData = res.data.map(item => ({
                        ...item,
                        time: Math.round(item.time / 60).toFixed(0)
                    }));

                    const finalData = sortData(updatedData);
                    console.log('Sorted Data:', finalData);

                    
                    setPerformanceData(finalData.slice(0, 3));
                    setTableData(finalData.slice(3));
                    setLoading(false)
                } else {
                    console.log('No data returned from fetch operation');
                }
            } catch (error) {
                console.error('Error while fetching leaderboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [CurrentweekForLeaderBoard, factoryID]);

    return (
        <Container fluid>
            <ModelAnalyticsHeader heading="Leaderboard" hideWeekText={true} currentWeekDisable={true} />
            {loading?<Loader1/>:<>
            <PerformanceGrid loading={false} performanceData={performanceData} />
            <RankingTable loading={false} tableData={tableData} />
            </>}
        </Container>
    );
};

const LeaderBoardV2 = () => (
    <WeekFilterProvider>
        <LeaderBoardContent />
    </WeekFilterProvider>
);

export default LeaderBoardV2;