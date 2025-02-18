import React, { Fragment } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { ColumnChart } from "../../../Constant";
import HeaderCard from "../../Common/Component/HeaderCard";
import Chart from 'react-apexcharts';
import { apexColumnChartsone } from "./apexData";

const ColumnChartClass = () => {
    return (
        <Fragment>
           
                <Card>
                    <HeaderCard title={ColumnChart} />
                    <CardBody>
                        <div id='column-chart'>
                            <Chart options={apexColumnChartsone.options} series={apexColumnChartsone.series} type="bar" height={250} />
                        </div>
                    </CardBody>
                </Card>

        </Fragment>
    )
}

export default ColumnChartClass;