import React, { useEffect, useState } from 'react'; 
import { Modal, Button, Form, Dropdown, DropdownButton, Row, Col, FormGroup } from 'react-bootstrap';
import { Card, CardBody, Input } from 'reactstrap';
import Select from 'react-select';
import { Typeahead } from 'react-bootstrap-typeahead';  
import '../NewDesignPreviousTickets/style.css'
import { IoMdClose } from "react-icons/io";
import { errorToast } from '../../../../../../_helper/helper';
import { priorityOptions } from '../../Staticdata/data';
import AreaService from '../../../../../../api/areaService';

const GenerateTicket = ({ modal,toggle,modileOptions,areaOption,NewTicket,setselectedTicket,modalType,setdataforDisplay,dataforDisplay,seteditCount,AreaMode }) => {
  // State variables to handle form data
 const [loading, setloading] = useState(false)
   
const filtered_Sub_Area = NewTicket?.areas?.flatMap(areaid => {
    const matchedArea = areaOption.find(a => a.area_id == areaid.id);
    return matchedArea ? matchedArea.sub_areas.map(sub => ({
      id: sub.id,
      name: sub.name
    })) : [];
})  
const fileterdAreas=areaOption?.map(area=>({
    id: area.area_id,
    name: area.area_name,
    label:`${area.area_name}, ${area.area_owner}`,
    owner:area.area_owner,
    disabled: !area.active
})) 
console.log(NewTicket)
const handleSubmit=async()=>{
  setloading(true)
  if(NewTicket.areas?.length==0 || NewTicket.models?.length==0 || NewTicket.sub_areas?.length==0 || !NewTicket.query || !NewTicket.priority){
    errorToast('Please fill all the fields');
    setloading(false)
    return
  }
  console.log(NewTicket)
    const generate={
      generated_by:JSON.parse(localStorage.getItem('userData'))?.id,
      areas:NewTicket.areas.map(item=>item.id),
      sub_areas:NewTicket.sub_areas.map(item=>item.id),
      models:NewTicket.models.map(item=>item.id),
      priority:NewTicket.priority,
      query:NewTicket.query,
      ticket_id:NewTicket?.id
    }  
    if(modalType=='Generate'){  
      await AreaService.generatenewticket(generate).then((resp)=>{ 
        const newFormatofTicket={
          ...resp.data.data,
          areas:resp.data.data.areas?.map(item=>({
            id:item.id,
            name:item.area_name,
            owner:item.owner
          })),
          models:resp.data.data.models?.map(item=>({
            id:item.module_id,
            name:item.module_name, 
          })),
          sub_areas:resp.data.data.sub_areas.map(item=>({
            id:item.module_id,
            name:item.module_name, 
          })),
          factory:{
            name:JSON.parse(localStorage.getItem('userData'))?.factory?.name
          }
        } 
          setdataforDisplay([
              ...dataforDisplay,
              newFormatofTicket
          ])
          setloading(false);
          toggle();
      }).catch((err) => {
        console.log(err)
          if (err?.status === 404) {
            errorToast(err?.statusText);
          } else {
            errorToast(err?.response?.data?.message);
          }
        });
      
    }
    else{
      await AreaService.editticket(generate).then((resp)=>{
        console.log(resp.data);
        const newFormatofTicket={
          ...resp.data.data,
          areas:resp.data.data.areas?.map(item=>({
            id:item.id,
            name:item.area_name,
            owner:item.owner
          })),
          models:resp.data.data.models?.map(item=>({
            id:item.module_id,
            name:item.module_name, 
          })),
          sub_areas:resp.data.data.sub_areas.map(item=>({ 
            sub_area_id:item.id,
            name:item.name, 
          })),
          factory:{
            name:JSON.parse(localStorage.getItem('userData'))?.factory?.name
          }
        }  
          const updatedlist=dataforDisplay?.filter(item=>item.id !== newFormatofTicket.id)
          setdataforDisplay([
              ...updatedlist,
              newFormatofTicket
          ]);
          setloading(false); 
          toggle();
      }).catch((err)=>{
        if (err?.status === 404) {
          errorToast(err?.statusText);
        } else {
          errorToast(err?.response?.data?.message);
        }
      })
      
    } 
    // toggle();
}

// useEffect(() => { 
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`; 
//   setloading(false)
//    if(modalType == 'Generate'){
//     setselectedTicket(
//         {   
//             id:Math.floor(Math.random() * 900) + 100,
//             module: [],
//             generated_by: JSON.parse(localStorage.getItem('name')),
//             sub_area: [],
//             priority: '',
//             query: '',
//             status: 'pending', 
//             issue_date:formattedDate
//           }
//     )
//    }
//    else{
//     setselectedTicket({
//         ...NewTicket,
//         issue_date:formattedDate
//     })
//    }
// }, [modal])  
 
  return (
    <Modal show={modal} onHide={toggle}  centered  className='custom-modal' >
        <div style={{padding:'24px 30px'}}> 
            <div className='d-flex justify-content-between align-items-center '>
            <p style={{fontSize:'24px',fontWeight:'500'}} className='m-0'>{modalType || ''} Ticket</p>
            <IoMdClose size={20} onClick={toggle} style={{cursor:'pointer'}} />
            </div>
            <p className='f-light'> { modalType == 'Edit' && `ID: ${NewTicket?.id}` } </p>

      <Modal.Body className='p-0' >
        <Form>
          {/* Select Area - Typeahead */}
          <FormGroup   className='formGrupCustom'>
            {AreaMode?null:<Form.Label className='subHeading' >Select Areas</Form.Label>}
            <Col>
            {AreaMode?<>
            {NewTicket.areas?.map((item)=>(
            <Row>
            <Col xs='6'>
            <Form.Label className='subHeading' >Area Name</Form.Label>
            <Input type='input' value={item.name} readOnly /></Col>
            <Col xs='6'>
            <Form.Label className='subHeading' >Area Owner</Form.Label>
            <Input type='input' value={item.owner} readOnly /></Col>
            </Row>
            ))}
            
            </>:<>
           {console.log(fileterdAreas)}
              <Typeahead
                id="areas"
                multiple
                labelKey={'label'}
                onChange={(e)=>{setselectedTicket({
                    ...NewTicket,
                    areas:e
                })}}
                options={fileterdAreas}
                selected={NewTicket.areas}
                placeholder="Select Areas..."  
                renderMenuItemChildren={(option) => {
                  return (
                    <div style={{ opacity: option.disabled ? 0.5 : 1 }}>
                      {option.label}
                    </div>
                  );
                }}
              />
              <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,areas:fileterdAreas})}}>Select all</button>
              {NewTicket.areas?.length>0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,areas:[]})}}>Clear all</button>}
              </div>
              </>}
            </Col>
          </FormGroup>

          {/* Select Subarea - Typeahead */}
          {NewTicket.areas?.length>0 &&
          <FormGroup  className='formGrupCustom'>
            <Form.Label className='subHeading' >Select Subareas</Form.Label>
            <Col >
              <Typeahead
                id="sub_areas"
                multiple
                labelKey={'name'}
                onChange={(e)=>{setselectedTicket({
                    ...NewTicket,
                    sub_areas:e
                })}}
                options={filtered_Sub_Area}
                selected={NewTicket.sub_areas}
                placeholder="Select Subareas..."
              />
               <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,sub_areas:filtered_Sub_Area})}}>Select all</button>
              {NewTicket.sub_areas?.length > 0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,sub_areas:[]})}}>Clear all</button>}
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
                    models:e
                })}}
                options={modileOptions}
                selected={NewTicket.models}
                placeholder="Select Modules..."
              />
               <div className='d-flex justify-content-end mt-2'>
              <button className='selectallbtn' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,models:modileOptions})}}>Select all</button>
              {NewTicket.models?.length>0 && <button className='clearallbtn ms-2' onClick={(e)=>{e.preventDefault();setselectedTicket({...NewTicket,models:[]})}}>Clear all</button>}
              
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
      {loading? <div className="spinner">
                      {/* <Loader /> */}
                    </div>:
                          
      <button  style={{width:'100%',padding:"8px",background:'#175FA4',color:'white',borderRadius:'8px'}} className='btn mt-3' onClick={handleSubmit}>
        {loading?'Loading...':'Submit'}
        </button>
      }
      </div> 
       
    </Modal>
  );
}

export default GenerateTicket;
