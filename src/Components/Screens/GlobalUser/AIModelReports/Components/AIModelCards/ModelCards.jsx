import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import CameraImage from '../../../../../../assets/images/cameras/camera.jpeg';
import { H5, H6 } from '../../../../../../AbstractElements';
import './modelcards.css';


export default function ModelCards({ areaD, allData, data, setCardsData }) {

  const [expandedItems, setExpandedItems] = useState({}); // State to track expanded state for each card
  const [expandedSubAreas, setExpandedSubAreas] = useState({}); // Track expanded sub-area names

  // Set a limit for how many SubAreas to show initially
  const SUBAREA_LIMIT = 1;

  // Function to handle the "See more..." click
  const toggleExpand = (index) => {
    setExpandedItems((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index], // Toggle expanded state for the specific item
    }));
  };

  // Function to handle expanding or collapsing sub-area names
  const toggleSubAreaExpand = (cardIndex, subIndex) => {
    setExpandedSubAreas((prevExpanded) => ({
      ...prevExpanded,
      [`${cardIndex}-${subIndex}`]: !prevExpanded[`${cardIndex}-${subIndex}`], // Toggle expanded state for sub-area
    }));
  };

  const shouldShowSeeMore = (subAreas) => {
    return subAreas.length > SUBAREA_LIMIT;
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  const processData = (data) => {
    // Iterate over each area
    data.forEach((area) => {
      // Create a map to store counts of each SubAreaName
      const subAreaCounts = {};
      const newSubAreas = [];

      // First, count the occurrences of each SubAreaName and collect compliance values
      area.SubAreas.forEach((sub) => {
        if (subAreaCounts[sub.SubAreaName]) {
          subAreaCounts[sub.SubAreaName].count += 1; // Increment count
          subAreaCounts[sub.SubAreaName].compliance.push(sub.Compliance); // Store compliance values
          subAreaCounts[sub.SubAreaName].violation.push(sub.Violations); // Store compliance values
        } else {
          // Initialize the first occurrence
          subAreaCounts[sub.SubAreaName] = {
            count: 1,
            compliance: [sub?.Compliance],
            violation: [sub?.Violations]
          };
        }
      });
      console.log('subAreaCounts', subAreaCounts)

      // Now, iterate over the subAreaCounts to create the new subAreas array
      Object.keys(subAreaCounts).forEach((subAreaName) => {
        console.log('subAreaName', subAreaName);
        
        const complianceValues = subAreaCounts[subAreaName].compliance;
        const violationValues = subAreaCounts[subAreaName].violation;
        console.log("complianceValues",complianceValues)
        console.log("violationValues",violationValues)
        const totalCompliance = complianceValues.reduce((acc, val) => acc + val, 0); // Sum of all compliances
        const totalViolation = violationValues.reduce((acc, val) => acc + val, 0); // Sum of all compliances
        // Calculate the average compliance value
       
        console.log('totalCompliancebb', totalCompliance)
        console.log('totalViolationbbb', totalViolation)
        // const averageCompliance = totalCompliance / complianceValues.length;

        // Calculate the percentage based on the average value
        // const averageCompliancePercentage = (averageCompliance / totalCompliance) * 100; // Convert average to percentage
        // const countCompliancePercent = (compliance, violation) => {
        //   if (violation === 0) {
        //     return 0
        //   }

        //   return Math.round((compliance / (compliance + violation)) * 100).toFixed(0)
        // }

        // const updatedCompliance = countCompliancePercent(item?.Compliance, item?.Violations)

        // Push the processed sub-area data into the newSubAreas array
        newSubAreas.push({
          SubAreaName: subAreaName,
          Cameras: subAreaCounts[subAreaName].count, // Set the count as the camera value
          // Compliance: Math.round(averageCompliancePercentage), // Set the average compliance percentage
          Compliance: totalCompliance,
          Violation : totalViolation

        });
      });
      

      // Update the area's SubAreas with the new calculated data
      area.SubAreas = newSubAreas;
    });

    return data;
  };

  // Example Usage inside useEffect
  useEffect(() => {

    const updatedData = processData(allData); // Process the data
    console.log('Updated Data:', updatedData); // Check if the data is correct

    setCardsData(updatedData); // Set the updated data to state
  }, [allData]);

  const renderTooltip = (compliance) => (
    <Tooltip id="compliance-tooltip">
      {compliance >= 80 ? 'Compliant' : 'Non-Compliant'}
    </Tooltip>
  );
  console.log('dataaaa', data)

  return (
    <Row>
      {data?.map((item, cardIndex) => {
        const isExpanded = expandedItems[cardIndex];
        const visibleSubAreas = isExpanded ? item.SubAreas : item.SubAreas.slice(0, SUBAREA_LIMIT);
        const cardStyle = {
          backgroundColor: hoveredCard === cardIndex ? '#dcdcdc' : 'white',
          transition: 'background-color 0.3s ease',
          height: '100%',
          // minHeight:'250px',
          overflowY: 'auto'
        };

        return (
          <Col xxl={6} xl={6} lg={6} md={12} key={cardIndex}>
            <Card
              style={{
                maxHeight: '400px', backgroundColor: hoveredCard === cardIndex ? '#dcdcdc' : 'white',
                height: '220px'
              }}
              onMouseEnter={() => setHoveredCard(cardIndex)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className=" bg-primary card-header  py-2" >
                {item?.AreaName}
              </div>
              <CardBody style={cardStyle}
                className=" custom-scrollbarrr" >



                {/* <img className="rounded-3" style={{ height: '100%', width: '100%' }} src={CameraImage} alt="Camera" /> */}


                <div className="my-2">
                  <H5 attrH5={{ style: { fontSize: '26px' } }}>{item.AreaOwner}</H5>
                </div>



                <div style={{ width: '100%' }} className="d-flex justify-content-between">
                  <table className="w-100" style={{ backgroundColor: 'transparent', height: '10px', overflowY: 'auto' }}>
                    <thead style={{ backgroundColor: 'transparent' }}>
                      <tr style={{ backgroundColor: 'transparent' }}>
                        <th style={{ fontSize: '12px', textAlign: 'left' }}>Sub Area</th>
                        <th style={{ fontSize: '12px', textAlign: 'center' }}>Cameras</th>
                        <th style={{ fontSize: '12px', textAlign: 'right' }}>Compliance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSubAreas?.map((sub, subIndex) => {
                        const isSubAreaExpanded = expandedSubAreas[`${cardIndex}-${subIndex}`];
                        const subAreaDisplayName = sub.SubAreaName.length > 10 && !isSubAreaExpanded
                          ? `${sub.SubAreaName.slice(0, 10)}...`
                          : sub.SubAreaName;
                          console.log('sub?.Compliance', sub?.Compliance);
                          console.log('sub?.Compliance', sub?.Compliance);
                          


                          const countCompliancePercent = (compliance, violation) => {
                            if (violation === 0) {
                              return 100
                            }
                  
                            return Math.round((compliance / (compliance + violation)) * 100).toFixed(0)
                          }
                          const updatedCompliance = countCompliancePercent(sub?.Compliance, sub?.Violation)

                        return (
                          <>
                            <tr
                              key={subIndex}
                              style={{

                                alignItems: 'center',
                                width: '100%',
                              }}
                            >

                              {/* Sub Area column */}
                              <td
                                style={{
                                  flex: 1,
                                  cursor: sub.SubAreaName.length > 10 ? 'pointer' : 'default',
                                  fontSize: '12px',
                                  textAlign: 'left',
                                  maxWidth: '60px',
                                }}
                                onClick={() => toggleSubAreaExpand(cardIndex, subIndex)}
                              >
                                {sub.SubAreaName
                                  .split(' ') // Split the name by spaces
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                                  .join(' ')}


                              </td>


                              {/* Cameras column */}
                              <td style={{ flex: 1, textAlign: 'center', fontSize: '12px', textAlign: 'center' }}>
                                {sub.Cameras}
                              </td>

                              {/* Compliance column */}
                              <td style={{ flex: 1, alignItems: 'center', fontSize: '12px', textAlign: 'right' }}>
                                {/* <span>{sub.Compliance}%</span> */}
                                <span>{updatedCompliance}%</span>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 100, hide: 100 }}
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
                          </>
                        );
                      })}
                    </tbody>
                  </table>

                </div>



                {/* Conditionally show "See More..." link if there are more than 2 SubAreas */}
                {shouldShowSeeMore(item.SubAreas) && (
                  <div
                    className="text-primary"
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                    onClick={() => toggleExpand(cardIndex)}
                  >
                    {isExpanded ? 'See less...' : 'See more...'}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
