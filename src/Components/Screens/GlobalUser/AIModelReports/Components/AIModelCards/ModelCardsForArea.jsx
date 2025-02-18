import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import CameraImage from '../../../../../../assets/images/cameras/camera.jpeg';
import { H5, H6 } from '../../../../../../AbstractElements';
import './modelcards.css';

export default function ModelCards({ areaD, allData, data, setCardsData }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  // Example Usage inside useEffect
  useEffect(() => {
    setCardsData(allData); // Set the updated data to state
  }, [allData]);

  const renderTooltip = (compliance) => (
    <Tooltip id="compliance-tooltip">
      {compliance >= 80 ? 'Compliant' : 'Non-Compliant'}
    </Tooltip>
  );

  return (
    <Row>
      {data[0]?.SubAreas?.map((item, cardIndex) => {

        const cardStyle = {
          backgroundColor: hoveredCard === cardIndex ? '#dcdcdc' : 'white',
          transition: 'background-color 0.3s ease',
          height: '100%',
          // minHeight:'250px',
          overflowY: 'auto'
        };
        const countCompliancePercent = (compliance, violation) => {
          if (violation === 0) {
            return 100
          }

          return Math.round((compliance / (compliance + violation)) * 100).toFixed(0)
        }

        const updatedCompliance = countCompliancePercent(item?.Compliance, item?.Violations)
        console.log('updatedCompliance', updatedCompliance)

        return (
          <Col className='d-flex gap-2' xxl={4} xl={6} lg={6} md={12} key={cardIndex}>
            <Card
              style={{
                width: '100%',
                backgroundColor: hoveredCard === cardIndex ? '#dcdcdc' : 'white',
                height: 'auto'
              }}
              onMouseEnter={() => setHoveredCard(cardIndex)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className=" bg-primary card-header  py-2" >
                {/* {item?.AreaName} */}
                {item?.SubAreaName}
              </div>
              <CardBody style={cardStyle}
                className=" custom-scrollbarrr">
                <div style={{ width: '100%' }} className="d-flex justify-content-between">
                  <table className="w-100" style={{ backgroundColor: 'transparent', height: '10px', overflowY: 'auto' }}>
                    <thead style={{ backgroundColor: 'transparent' }}>
                      <tr style={{ backgroundColor: 'transparent' }}>

                        <th style={{ fontSize: '12px', textAlign: 'left' }}>CamerasID</th>
                        <th style={{ fontSize: '12px', textAlign: 'right' }}>Compliance</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr
                        // key={subIndex}
                        style={{

                          alignItems: 'center',
                          width: '100%',
                        }}
                      >


                        {/* Cameras column */}
                        <td style={{ flex: 1, textAlign: 'center', fontSize: '12px', textAlign: 'left' }}>
                          {/* {sub.Cameras} */}
                          {item?.Cameras}

                        </td>

                        {/* Compliance column */}
                        <td style={{ flex: 1, alignItems: 'center', fontSize: '12px', textAlign: 'right' }}>
                          {/* <span>{sub.Compliance}%</span> */}
                          {/* {item?.Compliance}% */}
                          {updatedCompliance}%
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 100, hide: 100 }}
                            // overlay={renderTooltip(item?.Compliance)}
                            overlay={renderTooltip(updatedCompliance)}
                          >
                            <Button
                              className="rounded-circle p-1 m-1"
                              variant={`${updatedCompliance >= 80 ? 'success' : 'danger'}`}
                            ></Button>
                          </OverlayTrigger>
                        </td>

                      </tr>
                      <br />

                    </tbody>
                  </table>

                </div>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
