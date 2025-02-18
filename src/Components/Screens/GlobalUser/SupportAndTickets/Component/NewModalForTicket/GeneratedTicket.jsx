import React, { useEffect, useState } from 'react'; 
import { Modal, Button, Form, Dropdown, DropdownButton, Row, Col, FormGroup } from 'react-bootstrap';
import { Card, CardBody, Input } from 'reactstrap';
import Select from 'react-select';
import { Typeahead } from 'react-bootstrap-typeahead';  
import '../NewDesignPreviousTickets/style.css'
import { IoMdClose } from "react-icons/io";
import { errorToast } from '../../../../../../_helper/helper';
import { priorityOptions } from '../../Staticdata/data';
const GenerateTicket = ({ modal,toggle,modileOptions,areaOption,NewTicket,setselectedTicket,modalType,setdataforDisplay,dataforDisplay }) => {
  // State variables to handle form data
  
   
const filtered_Sub_Area = NewTicket?.area.flatMap(area => {
    const matchedArea = areaOption.find(a => a.id === area.id);
    return matchedArea ? matchedArea.sub_areas.map(sub => ({
      id: sub.id,
      name: sub.name
    })) : [];
})  
const fileterdAreas=areaOption.map(area=>({
    id: area.id,
    name: area.name,
    label:`${area.name}, ${area.owner}`,
    owner:area.owner
}))   

const handleSubmit=()=>{
    if(NewTicket.area.length==0 || NewTicket.module.length==0 || NewTicket.sub_area.length==0 || !NewTicket.query || !NewTicket.priority){
       errorToast('Please fill all the fields');
       return
    }
    if(modalType=='Generate'){  
        setdataforDisplay([
            ...dataforDisplay,
            NewTicket
        ])
    }
    else{
        const updatedlist=dataforDisplay?.filter(item=>item.id !== NewTicket.id)
        setdataforDisplay([
            ...updatedlist,
            NewTicket
        ])
    } 
    toggle();
}

useEffect(() => { 
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
   if(modalType == 'Generate'){
    setselectedTicket(
        {   
            id:Math.floor(Math.random() * 900) + 100,
            module: [],
            generated_by: JSON.parse(localStorage.getItem('name')), 
            area: [],
            sub_area: [],
            priority: '',
            query: '',
            status: 'pending', 
            issue_date:formattedDate
          }
    )
   }
   else{
    setselectedTicket({
        ...NewTicket,
        issue_date:formattedDate
    })
   }
}, [modal]) 
  return (
    <Modal show={modal} onHide={toggle}  centered  className='custom-modal' >
        <div style={{padding:'24px 30px'}}> 
            <div className='d-flex justify-content-between align-items-center '>
            <p style={{fontSize:'24px',fontWeight:'500'}} className='m-0'>{modalType || ''} Ticket</p>
            <IoMdClose size={20} onClick={toggle} style={{cursor:'pointer'}} />
            </div>

      <Modal.Body className='p-0' >
        <Form>
          {/* Select Area - Typeahead */}
          <FormGroup   className='formGrupCustom'>
            <Form.Label className='subHeading' >Select Areas</Form.Label>
            <Col>
              <Typeahead
                id="area"
                multiple
                labelKey={'label'}
                onChange={(e)=>{setselectedTicket({
                    ...NewTicket,
                    area:e
                })}}
                options={fileterdAreas}
                selected={NewTicket.area}
                placeholder="Select Areas..."
              />
              <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,area:fileterdAreas})}}>Select all</button>
              {NewTicket?.area.length>0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,area:[]})}}>Clear all</button>}
              </div>
            </Col>
          </FormGroup>

          {/* Select Subarea - Typeahead */}
          {NewTicket.area?.length>0 &&
          <FormGroup  className='formGrupCustom'>
            <Form.Label className='subHeading' >Select Subareas</Form.Label>
            <Col >
              <Typeahead
                id="subArea"
                multiple
                labelKey={'name'}
                onChange={(e)=>{setselectedTicket({
                    ...NewTicket,
                    sub_area:e
                })}}
                options={filtered_Sub_Area}
                selected={NewTicket.sub_area}
                placeholder="Select Subareas..."
              />
               <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,sub_area:filtered_Sub_Area})}}>Select all</button>
              {NewTicket?.sub_area.length > 0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,sub_area:[]})}}>Clear all</button>}
              </div>
            </Col>
          </FormGroup>
            }

          {/* Select Module - Typeahead */}
          <FormGroup   className='formGrupCustom'>
            <Form.Label className='subHeading' >Select Modules</Form.Label>
            <Col >
              <Typeahead
                id="module"
                multiple
                labelKey={'name'}
                onChange={(e)=>{setselectedTicket({
                    ...NewTicket,
                    module:e
                })}}
                options={modileOptions}
                selected={NewTicket.module}
                placeholder="Select Modules..."
              />
               <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,module:modileOptions})}}>Select all</button>
              {NewTicket?.module.length>0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,module:[]})}}>Clear all</button>}
              
              </div>
            </Col>
          </FormGroup>

          {/* Priority Dropdown */}
           
          <FormGroup   className='formGrupCustom'>
            <Form.Label className='subHeading' >Priority</Form.Label>
            <Col> 
              <Select
                id="priority"
                value={priorityOptions.find(item => item.value === NewTicket.priority) || 'Select priority'}
                onChange={e => setselectedTicket({
                    ...NewTicket,
                    priority:e.value
                })}
                options={priorityOptions}
                placeholder="Select Priority"
              />
            </Col>
          </FormGroup>
         

          {/* Query - Textarea */}
          <FormGroup  className='formGrupCustom'>
            <Form.Label className='subHeading'>Query</Form.Label>
            <Col >
                <Form.Control
                as="textarea"
                id="query"
                value={NewTicket.query}
                onChange={e => setselectedTicket({
                    ...NewTicket,
                    query:e.target.value
                })}
                placeholder="Describe your query..."  
                />
            </Col>
            </FormGroup>

        </Form>
      </Modal.Body>
 
      <button  style={{width:'100%',padding:"8px",background:'#175FA4',color:'white',borderRadius:'8px'}} className='btn mt-3' onClick={handleSubmit}>Submit</button>
      </div> 
       
    </Modal>
  );
}

export default GenerateTicket;
