import React from 'react'
import DataTable from 'react-data-table-component';
import { useLocation, useNavigate, useParams } from 'react-router';
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { PiWarningDiamondFill } from "react-icons/pi";
import { Container } from 'reactstrap';
import { SlArrowLeft } from "react-icons/sl";
import { Link } from 'react-router-dom';
function ModuleTable() {
   
    const navigate = useNavigate();
  //   const { module, cameraData } = useParams();

  //   console.log('navigating')
  
  // let cameras = [];
  // try {
  //   if (cameraData) {
  //     cameras = JSON.parse(cameraData);
  //   }
  // } catch (error) {
  //   console.error("Failed to parse camera data", error);
  // }

  const location = useLocation();
  const state = location.state || {};

  console.log('Received state:', location); // Fallback to empty object if undefined

  const module = state.module;
  const cameras = state.cameras;

  // Debugging
  console.log('Module:', state);
  console.log('Cameras:', cameras);
  // const { cameras, module } = location.state || {};
  const columns = [
    {
      name: "Sub Area",
      minWidth: "230px",
      selector: (row) => row.gate_no, // Access the Camera ID
      sortable: true,
    },
    {
      name: "Non-Compliance",
      minWidth: "230px",
      selector: (row) => row.gate_alerts_count, // Access the Camera ID
      sortable: true,
    },
,      
{
  name: "Compliance Count",
  selector: (row) => row.gate_compliance_count, // Access Frame value
  sortable: true,
},
{
  name: "Compliance %",
  selector: (row) => {
    return(
        <div 
        style={{width:'70px',backgroundColor:`${row.gate_compliance_percentage >= 80 ? '#E5F5E4' : (row.gate_compliance_percentage<80 && row.gate_compliance_percentage>=60) ? '#DEF2FA' : '#FDE3E3'}`}}
        className={`d-flex justify-content-between align-items-center px-2 rounded-5`}>
            {
                row.gate_compliance_percentage >= 80 ?
                <FaCircleCheck style={{color:'#54BA4A', fontSize:'14px'}} /> : (row.gate_compliance_percentage<80 && row.gate_compliance_percentage>=60) ?
                <PiWarningDiamondFill style={{color:'#26A5DC', fontSize:'20px'}}/> : <IoIosWarning style={{color:'#EF4343', fontSize:'20px'}}/>
            }
            <p className='m-0 p-0'>{row.gate_compliance_percentage==100 || row.gate_compliance_percentage==0 ?row.gate_compliance_percentage.toFixed(0): row.gate_compliance_percentage ? row.gate_compliance_percentage.toFixed(0) : ''}%</p>
        </div>
    )
  },
  sortable: true,
},
    // {
    //   name: "Area Name",
    //   selector: (row) => row.areaName, // Access the Area Name
    //   sortable: true,
    // },
    // {
    //   name: "Area Owner",
    //   selector: (row) => row.areaOwner, // Access the Area Owner
    //   sortable: true,
    // },
    {
      name: "Frames",
      selector: (row) => `${row.gate_frames}`, // Add % for Compliance Percentage
      sortable: true,
    },
  ];
 

  const customStyles = {
    table: {
      style: {
        // borderRadius: "24px", // Rounds the borders of the table
        overflow: "hidden", // Ensures content stays within rounded corners
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
      },
    },
    header: {
      style: {
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        backgroundColor: "#f4f4f4",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #ddd",
      },
    },
    pagination: {
        style: {
          borderBottomLeftRadius: "24px", // Rounds the bottom-left corner of pagination
          borderBottomRightRadius: "24px", // Rounds the bottom-right corner of pagination
        },
      },
  };
  return (
    <Container fluid={true}>
    <div style={{paddingBlock:'16px'}} className='d-flex align-items-center gap-2'>
    <SlArrowLeft onClick={()=> {
     navigate(`${process.env.PUBLIC_URL}/reports/${JSON.parse(localStorage.getItem('role'))}`)
    }} style={{fontSize:'15px', color:'#175FA4', cursor:'pointer'}} />
    <p onClick={()=> {
     navigate(`${process.env.PUBLIC_URL}/reports/${JSON.parse(localStorage.getItem('role'))}`)
    }} style={{fontSize:'20px', color:'#175FA4', cursor:'pointer'}} className='m-0 p-0'>Back</p>
    </div>
    <div style={{paddingBlock:'16px'}}>
    <p style={{fontWeight:'400', fontSize:'20px'}} className='m-0 p-0'>Module: <span style={{fontWeight:'500'}}>{module=='machine_guard_open' ? 'Machine Guard' : module=='emergency_exit_blockage' ? 'Emergency Exit' : module=='forklift_person_in_same_aisle' ? 'MMHE' : module}</span></p>
    </div>
         <DataTable
        // title={`${module} Module`}
        columns={columns}
        data={cameras || []} // Pass the cameras array as data
        pagination
        // highlightOnHover
        customStyles={customStyles}
      />
    </Container>
  )
}

export default ModuleTable