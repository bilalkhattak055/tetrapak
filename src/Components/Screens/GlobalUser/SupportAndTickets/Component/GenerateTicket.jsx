import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col, Input, Label, Row } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../style/style.css'
import { IoIosSend } from "react-icons/io";
import { Loader } from 'react-feather';

const priorities = [
  { label: 'High', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Low', value: 3 }
];

const TicketFormModal = ({ GenerateTicket, submitloader, areaOptions, moduleOptions, isOpen, closeModal, toggleModal, setTicketsData, TicketsData, updatedTicket, type, setnewTicket, }) => {
  const [selectedAreaIds, setSelectedAreaIds] = useState([]);
  const [selectedSubAreas, setSelectedSubAreas] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [priority, setPriority] = useState('');
  const [query, setQuery] = useState('');
  const [generatedBy, setgeneratedBy] = useState(JSON.parse(localStorage.getItem('name')))


  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  const handleSubmit = () => {
    const ticketData = {
      // generated_by: generatedBy,
      generated_by: JSON.parse(localStorage.getItem('userData')).id || 41,
      areas: selectedAreaIds.map(area => area.area_id),
      sub_areas: selectedSubAreas.map(sub => sub.id),
      models: selectedModels.map(model => model.module_id),
      priority: priority,
      query: query,
    };
    if (ticketData && !ticketData.query || !ticketData.priority || ticketData.areas.length <= 0 || ticketData.sub_areas.length <= 0 || ticketData.models <= 0) {
      alert('Please fill all the fields')
    }
    else {
      GenerateTicket(ticketData) 
    }
  }
  const handleSelectAllSubAreas = () => {
    const allSubAreas = selectedAreaIds.flatMap(area => area.sub_areas);
    setSelectedSubAreas(allSubAreas);
  };



  useEffect(() => {
    setSelectedAreaIds([]);
    setSelectedSubAreas([]);
    setSelectedModels([]);
    setPriority('');
    setQuery('');
  }, [isOpen])

  return (
    <Modal show={isOpen} onHide={toggleModal} size="lg" className='m-0 p-0'>
      <Modal.Header closeButton>
        <Modal.Title style={{ paddingRight: '15px' }}>Generate a New Ticket</Modal.Title>

      </Modal.Header>
      <Modal.Body style={{ paddingInline: '25px' }}>
        <Row>
          <Col lg='6' md='12'>
            <Typeahead
              id="area-id-typeahead"
              labelKey="label"
              options={areaOptions}
              onChange={setSelectedAreaIds}
              selected={selectedAreaIds}
              multiple
              placeholder="Select Area IDs..."
              renderMenuItemChildren={(option) => {
                return (
                  <div style={{ opacity: option.disabled ? 0.5 : 1 }}>
                    {option.label}
                  </div>
                );
              }}
            />
            <Button className='my-3 selectAllbtnforTicket ' onClick={() => { setSelectedAreaIds(areaOptions.filter(option => !option.disabled)) }}>Select all</Button>
            {selectedAreaIds.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => { setSelectedAreaIds([]) }}>Clear All</Button> : null}
          </Col>
          <Col lg='6' md='12' >
            <Input
              type='select'
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
            >
              <option value=''>Select Priority</option>
              {priorities.map(p => <option value={p.label}>{p.label}</option>)}
            </Input>
          </Col>
          {selectedAreaIds.length > 0 && (
            <Col lg='6' md='12' className='mt-4 mt-lg-0'> 
              <Typeahead
                id="subarea-typeahead"
                labelKey="name"
                options={selectedAreaIds.flatMap(area => area.sub_areas)}
                onChange={setSelectedSubAreas}
                selected={selectedSubAreas}
                multiple
                placeholder="Select Subareas..."
              />
              <Button className='my-3 selectAllbtnforTicket' onClick={handleSelectAllSubAreas}>Select All</Button>
              {selectedSubAreas.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => setSelectedSubAreas([])}>Clear All</Button> : null}
            </Col>
          )}

          <Col lg='6 '  md='12 ' className='mt-3 mt-xxl-0 mt-xl-0 mt-lg-0'>
            <Typeahead
              id="model-typeahead"
              labelKey="module_name"
              options={moduleOptions}
              onChange={(selected) => setSelectedModels(selected)}
              selected={selectedModels.map(model => ({
                module_id: model.module_id,
                module_name: model.module_name
              }))}
              multiple
              placeholder="Select Models..."
              renderMenuItemChildren={(option) => (<div>{option.module_name}</div>)}
            />
            <Button
              onClick={() => setSelectedModels(moduleOptions)} // Sets all models as selected
              className="my-3 selectAllbtnforTicket"
            >
              Select All
            </Button>
            {selectedModels.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => { setSelectedModels([]) }}>Clear all</Button> : null}
          </Col>
          <Col lg='6' md='12'>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query..."
              className="form-control"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ paddingRight: '5px' }}>
          {/* <Button variant="success" className='m-1' onClick={handleSubmit}>
                     Update Ticket
                 </Button>
                 <Button variant="dark" className='m-1' onClick={toggleModal}>
                     Close
                 </Button> */}
                  {submitloader ?
                    <div className="spinner">
                      {/* <Loader /> */}
                    </div>
                    :
                    <button className="button" style={{ '--clr': '#1E67D6' }} onClick={handleSubmit}>
                      <span className="button-decor"></span>
                      <div className="button-content">
                        <div className="button__icon">
                          <IoIosSend color="#fff" />
                        </div>
                        <span className="button__text">Submit</span>
                      </div>
                    </button>
                  }

        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketFormModal;
