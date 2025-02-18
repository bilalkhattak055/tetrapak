import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../style/style.css';

export default function DonutChart({ seriess, height, complianceSummary }) {
  console.log('Donut Chart Props:', { seriess, complianceSummary }); // Debugging

  const [series, setSeries] = useState([80, 20]); // Default to [80, 20] for initial render

  // Update the series state when the props change
  useEffect(() => {
    if (seriess && Array.isArray(seriess)) {
      if (seriess.length === 1) {
        const complianceValue = Math.round(seriess[0]);
        setSeries([complianceValue, 100 - complianceValue]); // Calculate non-compliance dynamically
      } else if (seriess.length === 2) {
        setSeries([Math.round(seriess[0]), Math.round(seriess[1])]);
      }
    }
  }, [seriess]);

  // Chart options with simplified tooltip logic
  const chartOptions = {
    chart: {
      type: 'donut',
      height: 240,
    },
    labels: ['Overall compliance', 'Non-compliance'],
    colors: ['#635470', '#cfcad3'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '26px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#635470',
              formatter: function (val) {
                return val + '%';
              },
            },
            total: {
              show: true,
              label: 'Compliance',
              fontSize: '16px',
              color: '#635470',
              formatter: function (w) {
                const compliancePercentage = w.globals.series[0];
                return Math.round(compliancePercentage) + '%';
              },
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 4, colors: ['#ffffff'] },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: { width: '200px', height: '240px' },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: { width: '80%', height: '240px' },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: '100%', height: '240px' },
        },
      },
    ],
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, w }) {
        // Check if complianceSummary has valid data
        if (!complianceSummary || complianceSummary.length === 0) {
          return `<div class="custom-tooltip">
                    <div class="tooltip-title">${w.config.labels[seriesIndex]}</div>
                    <div class="tooltip-total">Total: ${series[seriesIndex]}%</div>
                  </div>`;
        }

        // Generate tooltip for modules
        const moduleDetails = complianceSummary
          .map(module => `
            <div class="module-row">
              <span>${module.module}:</span>
              <span>${module.compliance_percentage.toFixed(1)}%</span>
            </div>
          `)
          .join("");

        // Combine content into a single tooltip
        return `<div class="custom-tooltip">
                  <div class="tooltip-title">${w.config.labels[seriesIndex]}</div>
                  <div class="tooltip-modules">${moduleDetails}</div>
                  <div class="tooltip-total">Total: ${series[seriesIndex]}%</div>
                </div>`;
      },
    },
  };

  return (
    <div className="donut-chart-container">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="donut"
        height={height || 240}
      />
    </div>
  );
}
