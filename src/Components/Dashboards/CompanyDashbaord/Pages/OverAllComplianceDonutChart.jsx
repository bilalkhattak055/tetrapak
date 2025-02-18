import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

const OverAllComplianceDonutChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      },
  });

  useEffect(() => {
    setChartData({
      series: [data?.compliant_count, data?.non_compliant_count],
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
          height: 320, // Constant height across all breakpoints
          type: "donut",
          toolbar: {
            show: false,
          },
        },
        labels: ["Wearing", "Not Wearing"], // Labels for each section
        colors: ["#0b76b7", "#bde3fa"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: "bottom", // Default position for legend

          markers: {
            size: 7,
            shape: "square",
          },
          formatter: function (label, opts) {
            const series = opts?.w?.globals?.series;
            const total = series?.reduce((acc, val) => acc + val, 0);
            const percentage = (
              (series[opts?.seriesIndex] / total) *
              100
            ).toFixed(0);
            return `<div style="width:160px; display:flex; align-items:center; color: #6D6F70;">${label} <span style="padding:0 5px " >${percentage && percentage !=='NaN' ? percentage: "0" }%</span></div>`;
          },
          labels: {
            colors: ["#6D6F70"], // Color for legend text
            fontSize: "12px",
          },
          offsetX: 0,
          offsetY: -10,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "62%", // Increase the size of the donut
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
                    return val;
                  },
                },
                total: {
                  show: true,
                  color: "#6D6F70", // Set the color for the total
                  formatter: function (w) {
                    // let sum = w?.globals?.seriesTotals?.reduce((acc, val) => acc + val, 0);
                    return w?.globals?.seriesTotals[0];
                  },
                },
              },
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <>
      <p
        style={{ fontSize: "17px", fontWeight: "200" }}
        className="heroCardHeadingfactoryHomepage"
      >
        Overall Compliance
      </p>
      <Card style={{ height: "285px", marginRight: -10, marginBottom: 10 }}>
        <ReactApexChart
          options={chartData?.options}
          series={chartData?.series}
          type="donut"
          height={chartData?.options?.chart?.height}
        />
      </Card> 
    </>
  );
};

export default OverAllComplianceDonutChart;
