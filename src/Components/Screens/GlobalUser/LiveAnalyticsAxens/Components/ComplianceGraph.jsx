import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import "./ComplianceGraph.css"
import ProgressWithTooltip from './ProgressWithToolTip';

const ComplianceChart = ({ data, isLoading }) => {
  const transformData = (apiData) => {
    if (!apiData || !apiData.compliance_summary) return {
      totalCompliance: 0,
      items: []
    };

    const totalCompliance = Math.round(Number(apiData.average_compliance_percentage || 0));

    const moduleColors = {
      'Helmet': '#26b6b4',
      'Boots': '#f3d251',
      'Glasses': '#9f7dff',
      'Mask': '#eaa16b',
      'Gloves': '#44a482'
    };

    const items = apiData.compliance_summary.map(item => ({
      name: item.module,
      compliance: item.compliance_percentage
    ? (item.compliance_percentage % 1 === 0 
        ? item.compliance_percentage.toFixed(0) 
        : item.compliance_percentage.toFixed(1))
    : null, 
      total_records: item.total_records,
      compliance_count: item.compliance_count,
      alert_count: item.alert_count,
      color: moduleColors[item.module] || '#26B6B4'
    }));

    return {
      totalCompliance,
      items
    };
  };

  const transformedData = transformData(data);
  const overallCompliance = Math.round(transformedData.totalCompliance);
  const nonCompliance = Math.round(100 - overallCompliance);

  const chartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    plotOptions: {
      pie: {
        startAngle: 110,
        endAngle: -230,
        donut: {
          size: '70%',
          background: '#E9F8F8',
          labels: {
            show: true,
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000',
              offsetY: 25,
              formatter: function(val) {
                return isLoading ? '...' : `${overallCompliance}%`;
              }
            },
            total: {
              show: true,
              label: '',
              formatter: function() {
                return isLoading ? '...' : `${overallCompliance}%`;
              },
              color: '#000'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 8,
        height: 8,
        radius: 2
      },
      itemMargin: {
        horizontal: 15
      }
    },
    colors: ['#26B6B4', '#FFD023'],
    labels: ['Compliance', 'Non-Compliance'],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return `${Math.round(value)}%`;
        }
      },
      x:{
        formatter: function (value) {
          return `${Math.round(value)}%`;
        }
      }
    },
    stroke: {
      show: true
    },
    fill: {
      type: 'solid'
    }
  };

  const series = [
    overallCompliance,
    nonCompliance
  ];

  return (
    <Card style={{borderRadius:"20px"}}>
      <CardBody>
        <CardTitle tag="h6" className="text-center mb-2 mt-2">
          Overall Compliance
        </CardTitle>

        <div className="mb-5" style={{ position: 'relative' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '220px' }}>
              <Spinner color="primary" />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#E6FFFF',
                  zIndex: 0
                }}
              />
              <Chart
                options={chartOptions}
                series={series}
                type="donut"
                height={220}
              />
            </>
          )}
        </div>

        <div>
          {!isLoading && transformedData.items.map((item, index) => (
            <div 
            key={index} 
            className="d-flex align-items-center" 
            style={{ marginBottom: '16px', lineHeight: '1.5' }}
          >
            <div 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: item.color,
                marginRight: '12px',
                flexShrink: 0
              }}
            />
            <span style={{ 
              width: '70px', 
              fontSize: '14px',
              color: '#333',
              fontWeight: '500'
            }}>
              {item.name} 
            </span>
            <div
            style={{ 
              flex: '1', 
              height: '8px',
              backgroundColor: '#DEDFE4',
              borderRadius: '4px',
              position: 'relative'  
            }}  
            >
              <ProgressWithTooltip 
                bgColor={item.color}
               barValue={item.compliance}
               data={item}
              />
            </div>
            {/* <div 
              style={{ 
                flex: '1', 
                height: '8px',
                backgroundColor: '#DEDFE4',
                borderRadius: '4px',
                position: 'relative'  
              }}
              data-tooltip={`Compliance: ${item.compliance}%`} 
              className="progress-bar-tooltip"
            >
              <div 
                style={{
                  height: '100%',
                  width: `${item.compliance}%`,
                  backgroundColor: item.color,
                  borderRadius: '4px',
                }}
              />
            </div> */}
          
            <span style={{ 
              width: '60px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              textAlign: 'right'
            }}>
              {item.compliance}%
            </span>
            
          </div>
          
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ComplianceChart;