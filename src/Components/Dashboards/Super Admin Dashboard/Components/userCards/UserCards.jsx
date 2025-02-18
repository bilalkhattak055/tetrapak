import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

import { FaRegUser } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineFactory } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import '../../styling/super.css'
import { H6 } from '../../../../../AbstractElements';


const UserCards = ({ data }) => {
  // Calculate the total number of items
  const totalItems = data.length;

  // Calculate the count of each role
  const roleCounts = data.reduce((acc, item) => {
    acc[item.role] = (acc[item.role] || 0) + 1;
    return acc;
  }, {});

  // Create an array of unique roles
  const uniqueRoles = Object.keys(roleCounts);

  return (
    <>
      {/* First card showing the total count */}
      <Col xl='3' lg='3' md='4' sm='5' xs='12'>
        <Card style={{height:'91px'}} className='widget-1'>
          <CardBody>
            <div className='widget-content'>
              <div className={`widget-round`} style={{border:'0px'}}>
                <div className='bg-round bg-primary'>
                  <FaRegUser />
                </div>
              </div>
              <div>
             <H6>Total</H6>
                <span className='f-light'>{totalItems}</span>
              </div>
            </div>
            <div className={`f-w-500`}>
              {/* Optional icon or additional content */}
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Cards for each unique role */}
      {uniqueRoles.map((role, index) => {
        return (
          <Col xl='3' lg='3' md='4' sm='5' xs='12' key={index}>
            <Card style={{height:'91px'}} className='widget-1'>
              <CardBody>
                <div className='widget-content'>
                  <div className={`widget-round`} style={{border:'0px'}}>
                    <div className={`bg-round ${role == 'IT Officer' ? 'bg-success' : role == 'Factory' ? 'bg-secondary' : role == 'Area' ? 'bg-danger' :  'bg-info'}`}>
                     
                      {role === "IT Officer" && <GiPoliceOfficerHead />}
                      {role === "Factory" && <MdOutlineFactory />}
                      {role === "Area" && <GrUserWorker />}
                      {role === "Tech QA" && <MdOutlineSettings />}
                      {role === 'factory' && <AiOutlineGlobal />}
                    </div>
                  </div>
                  <div>
                  <H6>{role}</H6>
                    <span className='f-light'>{roleCounts[role]}</span>
                  </div>
                </div>
                <div className={`f-w-500`}>
                  {/* Optional icon or additional content */}
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </>
  );
};

export default UserCards;
