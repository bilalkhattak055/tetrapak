import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { IoIosSend } from "react-icons/io";
import '../../../../Screens/GlobalUser/SupportAndTickets/style/style.css'
import AreaService from '../../../../../api/areaService';
const GenerateTicket = ({ show, handleClose, modeloption, subAreaOptions, areas, generateTicket,smallLoader }) => {
    const [subAreas, setSubAreas] = useState([]);
    const [priority, setPriority] = useState('');
    const [models, setModels] = useState([]);
    const [query, setQuery] = useState(''); 
    // Mock data for sub areas and models
    const modelss = [
        {
            "module_id": 1,
            "module_name": "Helmet"
        },
        {
            "module_id": 2,
            "module_name": "Vest"
        },
        {
            "module_id": 5,
            "module_name": "MMHE"
        }
    ]
    // Handlers for Select All and Clear All in Sub Areas
    const handleSubAreaSelectAll = () => setSubAreas(subAreaOptions);
    const handleSubAreaClearAll = () => setSubAreas([]);

    // Handlers for Select All and Clear All in Models
    const handleModelSelectAll = () => setModels(modeloption);
    const handleModelClearAll = () => setModels([]);

    const handlesubmit = () => {
        // const areass = [
        //     {
        //         area_name: areas?.area_name,
        //         owner:'Meraj'
        //     }
        // ]
      const areass=[];
      areass.push(areas.area_id);
      const modelss=[];
      models.map(model => modelss.push(model.module_id));
      const subareas=[]; 
      subAreas.map(sub=>subareas.push(sub.id))
   
        const ticket = {
            generated_by: JSON.parse(localStorage.getItem('userData')).id,
            // id: Math.floor(100 + Math.random() * 900),
            // area_id: areas?.area_id,
            sub_areas: subareas,
            // sub_areas: subAreas,
            priority: priority,
            // models: models.map(model => ({ name: model.module_name, module_id: model.module_id, })),
            models: modelss,
            query: query,
            // owner: areas?.area_owner,
            areas: areass,
            status: 'pending',
        }  
        console.log(ticket) 
        if (ticket.sub_areas.length <= 0 || ticket.models.length <= 0 || !ticket.priority || !ticket.query) {
            return alert('please fill all fileds');

        }
        generateTicket(ticket);
        // handleClose();

    }
   
useEffect(() => {
    setSubAreas([]);
    setPriority('');
    setModels([]);
    setQuery(''); 
}, [show])

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Generate Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ paddingInline: '25px' }}>
                <Form>
                    {/* Readonly Fields */}
                    <Row>
                        <Col sm='6'>
                            <Form.Group controlId="areaId">
                                <Form.Label>Area ID</Form.Label>
                                <Form.Control type="text" value={areas?.area_id} readOnly />
                            </Form.Group>
                        </Col>
                        <Col sm='6'>
                            <Form.Group controlId="owner">
                                <Form.Label>Owner</Form.Label>
                                <Form.Control type="text" value={areas?.area_owner} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Typeahead for Sub Areas */}
                    <Form.Group controlId="subAreas">
                        <Form.Label>Sub Areas</Form.Label>
                        <Typeahead
                            id="subAreas-typeahead"
                            multiple
                            labelKey={'name'}
                            options={subAreaOptions}
                            placeholder="Choose sub areas..."
                            onChange={setSubAreas}
                            selected={subAreas} 
                        />
                        <Button className='my-3 selectAllbtnforTicket ' onClick={handleSubAreaSelectAll}>Select All</Button>
                        {subAreas.length === 0 ? (
                            null
                        ) : (
                            <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={handleSubAreaClearAll}>Clear All</Button>
                        )}
                    </Form.Group>

                    {/* Dropdown for Priority */}
                    <Form.Group controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            as="select"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Typeahead for Models */}
                    <Form.Group controlId="model">
                        <Form.Label className='mt-3'>Model</Form.Label>
                        <Typeahead
                            id="model-typeahead"
                            labelKey="module_name"
                            multiple
                            options={modeloption || []}
                            placeholder="Choose models..."
                            onChange={setModels}
                            selected={models}
                        />
                        <Button className='my-3 selectAllbtnforTicket' onClick={handleModelSelectAll}>Select All</Button>
                        {models.length === 0 ? (
                            null
                        ) : (
                            <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={handleModelClearAll}>Clear All</Button>
                        )}
                    </Form.Group>

                    {/* Textarea for Query */}
                    <Form.Group controlId="query">
                        <Form.Label>Query</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your query here..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {smallLoader?<div className="spinner">
                       
                    </div>:
                    <button className="button" style={{ '--clr': '#1E67D6' }} onClick={() => {
                        // Handle form submission here
                        handlesubmit();
                    }}>
                        <span className="button-decor"></span>
                        <div className="button-content">
                            <div className="button__icon">
                                <IoIosSend color="#fff" />
                            </div>
                            <span className="button__text">Submit</span>
                        </div>
                    </button>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default GenerateTicket;
