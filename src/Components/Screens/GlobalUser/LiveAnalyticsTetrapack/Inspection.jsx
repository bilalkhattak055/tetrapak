import AlertCountsChart from "../Target and Controal V2/Component/AlertCount";
import ComplianceTargetsChart from "../Target and Controal V2/Component/ComplianceTarget";
import ModelAnalyticsHeader from "../CameraConfigurationV2/Components/ModelAnalytics";
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';
import { Row, Col } from "react-bootstrap";

const Inspection = () => {
    return (

        <WeekFilterProvider>
            <Row className="pt-3">
            <ModelAnalyticsHeader
                heading={`AI Based Reels Inspection System`}
                hideWeekText={true}
                currentWeek={true}
                shifts={false}
                multiShift={false}
                months={false}
                modules={false}
                severity={false}
                timeFilterOption={false}
                areas={false}
                showActions={true}
            />
                <Col md={6} lg={7}>
                    <div className="p-2">
                        <ComplianceTargetsChart />
                    </div>
                </Col>
                <Col md={6} lg={5} >
                    <div className="p-2">
                        <AlertCountsChart />
                    </div>
                </Col>
            </Row>
        </WeekFilterProvider>

    );
}
export default Inspection;