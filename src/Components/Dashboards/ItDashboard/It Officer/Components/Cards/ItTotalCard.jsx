import React ,{useState,useEffect} from 'react';
import { Card, CardBody, Col } from 'reactstrap';

import { FaRegUser } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { MdOutlineFactory } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import '../../../../Super Admin Dashboard/styling/super.css'
import { H6 } from '../../../../../../AbstractElements';
import { FaRegUserCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { LuUserX } from "react-icons/lu";
const ItTotalCard = ({ data }) => {
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [rolee, setRolee] = useState(initialRole);
  const totalItems = data.length; 
  const roleCounts = data.reduce((acc, item) => {
    acc[item.role_name] = (acc[item.role_name] || 0) + 1;
    return acc;
  }, {}); 
  const uniqueRoles = Object.keys(roleCounts); 
  console.log(data)
  return (
    <>
      {/* First card showing the total count */}
      <Col xl='3' lg='3' md='4' sm='6' xs='12'>
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
         <>
          {rolee != role?
            
            <Col xl='3' lg='3' md='4' sm='6' xs='12' key={index}>
          <Card style={{height:'91px'}} className='widget-1'>
           <CardBody>  
             <div className='widget-content'>
               <div className={`widget-round`} style={{border:'0px'}}>
                 <div className={`bg-round ${role == 'it-officer' ? 'bg-success' : role == 'Factory' ? 'bg-secondary' : role == 'Area' ? 'bg-danger' :  'bg-info'}`}>
                  
                   {role === "IT" && <GiPoliceOfficerHead />}
                   {role === "Factory" && <MdOutlineFactory />}
                   {role === "Area" && <GrUserWorker />}
                   {role === "Tech QA" && <MdOutlineSettings />}
                   {role === 'factory' && <AiOutlineGlobal />}
                   {role === "User" && <FaRegUserCircle />} 
                   {role==='Admin' && <RiAdminLine/>}
                   {role==='' && <LuUserX/>}
                 </div>
               </div>
               <div>
               <H6>{role=='it-officer'?'IT -Officer':role==''?'Others':role}</H6>
                 <span className='f-light'>{roleCounts[role]}</span>
               </div>
             </div>
             <div className={`f-w-500`}>
               {/* Optional icon or additional content */}
             </div>
           </CardBody>
         </Card>
         </Col>
         :'' 
          }
         </>
        );
      })}
    </>
  );
};

export default ItTotalCard;
 
