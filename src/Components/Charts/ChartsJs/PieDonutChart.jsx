import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import './pie.css'

const PieDonutChart = (
    { setChartOptions, id, clasName, width, height, chartOptions }
) => {

    // const DonutHeight = height || 280

    return (
        <div className={clasName} id={id} style={{ width: '100%' }}>
            <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="donut"
                height={chartOptions.options.chart.height}
                width={width}
            />
        </div>
    );
};

export default PieDonutChart;
