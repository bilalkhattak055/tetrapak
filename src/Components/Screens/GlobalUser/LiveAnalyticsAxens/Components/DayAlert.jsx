import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, Spinner } from 'reactstrap';
import AreaService from '../../../../../api/areaService';

const DayViolationGraph = ({ currentFilter, selectedWeek, selectedMonth, selectedShift }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ChartCategories, setChartCategories] = useState([])
  const [chartOptions, setchartOptions] = useState({
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: '#FFFFFF'
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    markers: {
      size: 4,
      hover: {
        size: 6
      }
    },
    grid: {
      show: true,
      borderColor: '#F0F0F0',
      strokeDashArray: 1,
      position: 'back',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    colors: ['#26b6b4', '#f3d251', '#9f7dff', '#eaa16b', '#44a482', '#8B5CF6'],
    xaxis: {
      categories: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ] ,
      tickPlacement: 'on',
      tickAmount: 7,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        rotate: 0,
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#64748B'
        }
      }
    },
    yaxis: {
      // min: 0,
      // max: chartData ? Math.ceil(Math.max(...chartData.series.flatMap(s => s.data)) * 1.2) : 100, 
      // tickAmount: 6,
      labels: {
        formatter: (value) => value.toFixed(0), // Ensure integer labels
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#64748B'
        }
      }
    }
  })
  

  const processChartData = (data) => {
    if (!data || !data.series) return null;

    // Get the last 7 days of data
    const getLastSevenDays = (series) => {
      const length = series.data.length;
      return series.data.slice(Math.max(length - 7, 0));
    };

    // Process each series to get last 7 days and ensure proper formatting
    const processedSeries = data.series.map(series => ({
      name: series.name.toLowerCase(),
      data: getLastSevenDays(series).map(value => Number(value) || 0)
    }));

    return {
      series: processedSeries
    };
  };
  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay(); // Get the day of the week for January 1st (0 = Sunday, 6 = Saturday)
    
    // Adjust to make Monday the start of the week (ISO standard)
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    
    // Calculate the difference in days and convert to full weeks
    const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };
  const getCurrentMonthFormatted = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const fetchChartData = async () => {
    setLoading(true);
  
    try {
      const weekValue = currentFilter === 'week' ? (selectedWeek || getCurrentWeek()) : ""; // Fallback to current week
      const monthValue = currentFilter === 'month' ? (selectedMonth || getCurrentMonthFormatted()) : "";
  
      const payload = {
        factory_id: JSON.parse(localStorage.getItem('userData'))?.factory?.id || 1,
        weekly: weekValue,
        month: monthValue,
        shift: selectedShift || "",
        area: ""
      };
  
      const response = await AreaService.getlineChart(payload);
      const filteredSeries = response?.data?.series?.filter(item => item.name !== 'Total');
  
      setchartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { ...prevOptions.xaxis, categories: response.data.categories },
      }));
  
      setChartData(filteredSeries);
    } catch (error) {
      console.error("Error fetching line chart data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchChartData();
  }, [currentFilter, selectedWeek, selectedMonth, selectedShift]);
 
  if (loading) {
    return (
      <Card className="rounded-4 shadow-sm">
        <CardBody className="d-flex justify-content-center align-items-center" style={{ height: '416px' }}>
          <Spinner color="primary" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="rounded-4 shadow-sm">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">Alerts Trend</h6>
        </div>
        {chartData && (
          <Chart
            options={chartOptions}
            series={chartData}
            type="line"
            height={429}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default DayViolationGraph;