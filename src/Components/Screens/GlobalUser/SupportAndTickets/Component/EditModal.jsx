// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import { Input } from 'reactstrap';
// import '../style/style.css';
// import { IoIosSend } from "react-icons/io";

// const AreaOwnerModal = ({moduleOptions, toggleModal, isOpen, updatedTicket, formatDate, setTicketsData, TicketsData }) => {
//     const [selectedAreaOwner, setSelectedAreaOwner] = useState([]);
//     const [selectedAreaId, setSelectedAreaId] = useState([]);
//     const [selectedSubarea, setSelectedSubarea] = useState([]);
//     const [model, setModel] = useState('');
//     const [priority, setPriority] = useState('');
//     const [query, setQuery] = useState('');
//     const [allAreaIds, setAllAreaIds] = useState([]);
//     const [models, setModels] = useState([]);

//     const modelOptions = ['Helmet', 'Vest', 'Emergency Exit', 'MMHE', 'Machine Guard'];
//     const priorityOptions = ['High', 'Medium', 'Low'];

//     const areaOwnerData = [
//         {
//           name: 'Adil',
//           areas: [
//             {
//               id: 'AO-1, Adil',
//               subareas: [
//                 'Roof Tops (Palletizing)',
//                 'Palletizing 1,2 & 3',
//                 'palletizing office',
//                 'palletizing corridor',
//                 'waste window area'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Aftab',
//           areas: [
//             {
//               id: 'AO-2, Aftab',
//               subareas: [
//                 'Roof Tops (Service Building)',
//                 'Ammonia Compressor room',
//                 'Catch pit area',
//                 'Ref workshop',
//                 'Ref Control Room',
//                 'Ammonia CCR',
//                 'Diffusion tank'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Arslan',
//           areas: [
//             {
//               id: 'AO-3, Arslan',
//               subareas: [
//                 'Void Area (Production, Mixing)',
//                 'Admin Building Roof Top',
//                 'AHU Room above Canteen',
//                 'Main Asset scrap yard',
//                 'motor / panel scrap yard',
//                 'R&D front side scrap yard',
//                 'Contractor Workshops',
//                 'DP store area',
//                 'engineering store',
//                 'safety office',
//                 'safety storage area',
//                 'engineering store placement yard',
//                 'Fabrication workshop & surrounding area',
//                 'Lathe Machine Workshop',
//                 'MAMz workshop'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Ayesha Khaliq',
//           areas: [
//             {
//               id: 'AO-4, Ayesha Khaliq',
//               subareas: [
//                 'Roof Tops (Cone Baking)',
//                 'Cone Baking',
//                 'Mixing',
//                 'LI room',
//                 'aging room',
//                 'chocolate plant',
//                 'mixing pits',
//                 'oil/glucose decanting area',
//                 'sauce plant',
//                 'chilled room',
//                 'day store area',
//                 'mixing control room',
//                 'tank form'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Dr.Amjab',
//           areas: [
//             {
//               id: 'AO-5, Dr.Amjab',
//               subareas: [
//                 'OHC',
//                 'Medical Roof Top'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Meraj',
//           areas: [
//             {
//               id: 'AO-6, Meraj',
//               subareas: [
//                 'Roof Tops (Dry Store)',
//                 'Roof Tops (Pulp Store)',
//                 'Scrap Yard (Packmat area/ drums)',
//                 'Dry Store 1, 2',
//                 'chemical store',
//                 'dry store driver room',
//                 'docking stations',
//                 'washrooms',
//                 'Pulp Store',
//                 'Hot room',
//                 'flavour room',
//                 'Pallet washing room'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Moazzam Ali',
//           areas: [
//             {
//               id: 'AO-7, Moazzam Ali',
//               subareas: [
//                 'Machine Parts Room',
//                 'Ultra Clean',
//                 'Production floor',
//                 'production offices',
//                 'TPM room',
//                 'Day store',
//                 'Parts room',
//                 'room 10',
//                 'OPC chemical room'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Muhammza Shahbaz',
//           areas: [
//             {
//               id: 'AO-8, Muhammza Shahbaz',
//               subareas: [
//                 'ETP',
//                 'Boiler',
//                 'Air compressor',
//                 'boiler control room',
//                 'HFO tank',
//                 'water filter area'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Muhammza Wasi',
//           areas: [
//             {
//               id: 'AO-9, Muhammza Wasi',
//               subareas: [
//                 'Roof Tops (Canteen)',
//                 'Roof Tops (Security)',
//                 'Time Office',
//                 'ETMS',
//                 'Medical OHC',
//                 'Security Office',
//                 'Parkings',
//                 'Cycle Stand',
//                 'Smoking Area',
//                 'Area between Multan road gate to inner factory entrance gate',
//                 'Admin Building',
//                 'reception',
//                 'canteen',
//                 'kitchen',
//                 'galleries',
//                 'washrooms',
//                 'locker area',
//                 'masjid',
//                 'changing rooms',
//                 'waiting area',
//                 'girls room',
//                 'exit routes',
//                 'brains lab',
//                 'recharge room',
//                 "Humail's office",
//                 'meeting rooms',
//                 'IT room',
//                 'Outside Taris'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Nazir Sb',
//           areas: [
//             {
//               id: 'AO-10, Nazir Sb',
//               subareas: [
//                 'Solar Area (Panels, Transformer rooms & entire area)',
//                 'Diesel Storage area',
//                 'earth pit area',
//                 'electrical power house',
//                 'LT room',
//                 'HT room',
//                 'gen set area',
//                 'transformer room',
//                 'ammonia soft starter room'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Sadia',
//           areas: [
//             {
//               id: 'AO-11, Sadia',
//               subareas: [
//                 'R&D Innovation Centre (Complete)'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Shafiq',
//           areas: [
//             {
//               id: 'AO-12, Shafiq',
//               subareas: [
//                 'QA',
//                 'Pathogen Lab',
//                 'QA storeroom'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Shahbaz',
//           areas: [
//             {
//               id: 'AO-13, Shahbaz',
//               subareas: [
//                 'LPG Area',
//                 'Pump House',
//                 'Water treatment plant & roof',
//                 'Biomass Boiler (including fuel storage shed)'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Sheraz',
//           areas: [
//             {
//               id: 'AO-14, Sheraz',
//               subareas: [
//                 'Roof Tops (Cold Stores)',
//                 'Wooden Pallets Area',
//                 'FG BOF',
//                 'Cold Store 1&2',
//                 'Cold store offices',
//                 'Dispatch area'
//               ]
//             }
//           ]
//         },
//         {
//           name: 'Umair Pervaiz',
//           areas: [
//             {
//               id: 'AO-15, Umair Pervaiz',
//               subareas: [
//                 'UE Projects',
//                 'Projects Store'
//               ]
//             }
//           ]
//         }
//       ];

//     // Initialize allAreaIds once when the component mounts
//     useEffect(() => {
//         const ids = areaOwnerData.flatMap(owner => owner.areas.map(area => area.id));
//         setAllAreaIds(ids);
//     }, []);

//     // Set initial data when the modal opens or updatedTicket changes
//     useEffect(() => {
//         if (isOpen && updatedTicket) {
//             const owner = areaOwnerData.find(o => o.name === updatedTicket.owner);
//             setSelectedAreaOwner(owner ? [owner] : []);
//             setSelectedAreaId(updatedTicket.areas);
//             setSelectedSubarea(updatedTicket.subAreas);
//             setModel(updatedTicket.models[0]);
//             setPriority(updatedTicket.priority);
//             setQuery(updatedTicket.query);
//             setModels(updatedTicket.models)
//         }
//     }, [isOpen, updatedTicket]);

//     // Automatically populate area IDs based on selected Area Owner
//     useEffect(() => {
//         if (selectedAreaOwner.length > 0) {
//             const ownerAreas = selectedAreaOwner[0].areas.map(area => area.id);
//             setSelectedAreaId(prevSelectedIds => [
//                 ...new Set([...prevSelectedIds, ...ownerAreas]) // Add new IDs without duplicates
//             ]);
//         }
//     }, [selectedAreaOwner]);

//     // Dynamically filter subareas based on selected area IDs
//     const filteredSubareas = selectedAreaId.length > 0
//         ? areaOwnerData
//             .flatMap(owner => owner.areas)
//             .filter(area => selectedAreaId.includes(area.id))
//             .flatMap(area => area.subareas.map(sub => ({ sub })))
//         : [];

//     const handleSubmit = () => {
//         const formattedData = {
//             areas: selectedAreaId,
//             id: updatedTicket.id,
//             models: models, // Use the array of selected models
//             owner: selectedAreaOwner.map(owner => owner.name).join(''),
//             priority:priority,
//             query,
//             status: 'Pending',
//             subAreas: selectedSubarea,
//             ticketDate: formatDate()
//         };

//         if (
//             formattedData.areas.length === 0 ||
//             formattedData.models.length === 0 ||
//             formattedData.subAreas.length === 0 ||
//             // !formattedData.owner ||
//             !formattedData.priority ||
//             !formattedData.query
//         ) {
//             alert('Please fill all the fields');
//             return;
//         }

//         const updatedTicketsData = TicketsData.map(ticket =>
//             ticket.id === updatedTicket.id ? formattedData : ticket
//         );

//         setTicketsData(updatedTicketsData); // This updates the state with the modified data
//         console.log(formattedData);
//         toggleModal(); // Close the modal after updating
//     };

//     const handleSelectAllAreaIds = () => {
//         setSelectedAreaId(allAreaIds);
//     };

//     const handleClearAllAreaIds = () => {
//         setSelectedAreaId([]);
//     };

//     const handleSelectAllSubareas = () => {
//         setSelectedSubarea(filteredSubareas.map(sub => sub.sub));
//     };

//     const handleClearAllSubareas = () => {
//         setSelectedSubarea([]);
//     };

//     const handleSelectAllModels = () => {
//         setModels(modelOptions);
//     };

//     const handleClearAllModels = () => {
//         setModels([]);
//     };

//     return (
//         <Modal show={isOpen} onHide={toggleModal} size="lg" className='p-0'>
//             <Modal.Header  closeButton>
//             <Modal.Title style={{paddingRight:'15px'}}>Edit Ticket</Modal.Title>
//             </Modal.Header>
//             <Modal.Body style={{paddingInline:'25px'}} >
//                 <Form>
//                     <Row >
//                         {/* <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Area Owner</Form.Label>
//                                 <Typeahead
//                                     id="area-owner-typeahead"
//                                     labelKey="name"
//                                     onChange={selected => setSelectedAreaOwner(selected)}
//                                     options={areaOwnerData}
//                                     placeholder="Choose an area owner..."
//                                     selected={selectedAreaOwner}
//                                     clearButton
//                                 />
//                             </Form.Group>
//                         </Col> */}
//                         <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Area ID</Form.Label>
//                                 <Typeahead
//                                     id="area-id-typeahead"
//                                     labelKey="id"
//                                     multiple
//                                     onChange={selected => setSelectedAreaId(selected.map(item => item.id))}
//                                     options={allAreaIds.map(id => ({ id }))}
//                                     placeholder="Select area IDs..."
//                                     selected={selectedAreaId.map(id => ({ id }))}

//                                 />
//                                 <div className='d-flex justify-content-end mt-2'>
//                                     {selectedAreaId.length > 0 ?
//                                         <Button variant="danger" className='m-2 cancelAllbtnforTicket' onClick={handleClearAllAreaIds}>Clear All</Button>
//                                         : ''
//                                     }
//                                     <Button variant="primary" className='m-2 mx-0 selectAllbtnforTicket' onClick={handleSelectAllAreaIds}>Select All</Button>
//                                 </div>
//                             </Form.Group>
//                         </Col>
//                         <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Priority</Form.Label>
//                                 <Input type='select' value={priority}
//                                  onChange={(e) => {setPriority(e.target.value)}}
//                                 >
//                                     {priorityOptions.map((opt, idx) => (
//                                         <option key={idx} onClick={() => setPriority(opt)}>
//                                             {opt}
//                                         </option>
//                                     ))}
//                                 </Input>
//                             </Form.Group>
//                         </Col>

//                         <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Subarea</Form.Label>

//                                 <Typeahead
//                                     id="subarea-typeahead"
//                                     labelKey="sub"
//                                     multiple
//                                     onChange={selected => setSelectedSubarea(selected.map(item => item.sub))}
//                                     options={filteredSubareas}
//                                     placeholder="Select subareas..."
//                                     selected={selectedSubarea.map(sub => ({ sub }))}

//                                 />
//                                 <div className='d-flex justify-content-end mt-2'>
//                                     {selectedSubarea.length > 0 ?
//                                         <Button variant="danger" className='m-2 cancelAllbtnforTicket' onClick={handleClearAllSubareas}>Clear All</Button>
//                                         : ''}
//                                     <Button variant="primary" className='m-2 mx-0 selectAllbtnforTicket' onClick={handleSelectAllSubareas}>Select All</Button>
//                                 </div>
//                             </Form.Group>
//                         </Col>
//                         <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Model</Form.Label>

//                                 <Typeahead
//                                     id="model-typeahead"
//                                     labelKey="model"
//                                     multiple // Enable multiple selections
//                                     onChange={selected => setModels(selected.map(item => item.model))}
//                                     options={modelOptions.map(model => ({ model }))}
//                                     placeholder="Select models..."
//                                     selected={models.map(model => ({ model }))} // Multi-selection state handling

//                                 />
//                                 <div className='d-flex justify-content-end mt-2'>
//                                     {models.length > 0 ?
//                                         <Button variant="danger" className='m-2 cancelAllbtnforTicket' onClick={handleClearAllModels}>Clear All</Button>
//                                         : ''}
//                                     <Button variant="primary" className='m-2 mx-0 selectAllbtnforTicket' onClick={handleSelectAllModels}>Select All</Button>
//                                 </div>
//                             </Form.Group>
//                         </Col>

//                         <Col lg='6' md='12'>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Query</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     placeholder="Enter your query"
//                                     value={query}
//                                     onChange={e => setQuery(e.target.value)}
//                                 />
//                             </Form.Group>
//                         </Col>

//                     </Row>

//                 </Form>
//             </Modal.Body>

//             <Modal.Footer>
//                 <div style={{paddingRight:'5px'}}>
//                 {/* <Button variant="success" className='m-1' onClick={handleSubmit}>
//                     Update Ticket
//                 </Button>
//                 <Button variant="dark" className='m-1' onClick={toggleModal}>
//                     Close
//                 </Button> */}
//                  <button className="button" style={{ '--clr': '#1E67D6' }} onClick={handleSubmit}>
//       <span className="button-decor"></span>
//       <div className="button-content">
//         <div className="button__icon">
//           <IoIosSend color="#fff" /> {/* Using React Icon */}
//         </div>
//         <span className="button__text">Update</span>
//       </div>
//     </button>
//                 </div>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default AreaOwnerModal;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Input, FormGroup, Label } from 'reactstrap';
import '../style/style.css';
import { IoIosSend } from "react-icons/io";
import { Loader } from 'react-feather';

const EditTicketFormModal = ({
  isOpen,
  toggleModal,
  areaOptions = [],
  moduleOptions,
  currentTicket,
  editTicket,
  submitloader
}) => {
  const [selectedAreaIds, setSelectedAreaIds] = useState([]);
  const [selectedSubAreas, setSelectedSubAreas] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [priority, setPriority] = useState('');
  const [query, setQuery] = useState('');
  const [filteredAreaOptions, setFilteredAreaOptions] = useState([]);
  console.log(currentTicket)
  useEffect(() => {
    if (isOpen && currentTicket) {
      const initialAreas = currentTicket.areas.map(area => ({
        area_id: area.area_id,
        label: `${area.area_name}, ${area.owner}`
      }));
      const existingarea = currentTicket.areas.map(area => 
        areaOptions.find(item => item.area_id === area.area_id)
      );
      // console.log(currentTicket,'cuurent ticket')
      // console.log(existingarea,'selected areasas');
      // console.log(areaOptions, 'all optionss')

      // return
      setSelectedAreaIds(existingarea);
      setSelectedSubAreas(currentTicket.sub_areas || []);
      setSelectedModels(currentTicket.models.map(model => ({
        id: model.id,
        label: model.name
      })));
      console.log(areaOptions, 'all optionss')
      setPriority(currentTicket.priority || '');
      setQuery(currentTicket.query || '');

      // Filter area options based on current ticket areas
      const filteredOptions = areaOptions.filter(
        option => !initialAreas.some(area => area.area_id === option.area_id)
      );
      setFilteredAreaOptions(filteredOptions);
    }
  }, [isOpen, currentTicket, areaOptions]);

  const handleSubmit = () => {
    const updatedTicket = {
      generated_by: currentTicket.user_id || 41,
      ticket_id: currentTicket.id,
      areas: selectedAreaIds.map(area => area.area_id),
      sub_areas: selectedSubAreas.map(sub => sub.sub_area_id), // Keep sub_area_id for filtering
      models: selectedModels.map(model => model.id), // Keep model id
      priority,
      query
    };
    if(updatedTicket && !updatedTicket.query || !updatedTicket.priority || updatedTicket.areas.length<=0 || updatedTicket.sub_areas.length<=0 || updatedTicket.models<=0){
      alert('Please fill all the fields')
    }
    else{
      editTicket(updatedTicket)
      
    }
    // updateTicketsData(updatedTicket);
  };

  // Handle changes to area selection
  const handleAreaChange = (selected) => {
    console.log(selected, 'area idssssss')
    setSelectedAreaIds(selected);

  };

  // Handle changes to sub-area selection
  const handleSubAreaChange = (selected) => {
    setSelectedSubAreas(selected);
  };

  // Handle changes to model selection
  const handleModelChange = (selected) => {
    setSelectedModels(selected);
  };



  // Select All Models
  const handleSelectAllModels = () => {
    setSelectedModels(moduleOptions.map(module => ({
      id: module.module_id,
      label: module.module_name
    })));
  };

  return (
    <Modal show={isOpen} onHide={toggleModal} size="lg" className='p-0'>
      <Modal.Header closeButton>
        <Modal.Title style={{ paddingRight: '15px' }}>Edit Ticket</Modal.Title>
        <div>ID: {currentTicket?.id}</div>
      </Modal.Header>
      <Modal.Body style={{ paddingInline: '25px' }} >
        <Form>
          <Row> 
            <Col lg='6' md='12'>
              <Typeahead
                id="area-id-typeahead"
                labelKey="label"
                options={areaOptions}
                onChange={handleAreaChange}
                selected={selectedAreaIds}
                multiple
                placeholder="Select Area IDs..."
                renderMenuItemChildren={(option) => (
                  <div style={{ opacity: option.disabled ? 0.5 : 1 }}>
                    {option.label}
                  </div>
                )}
              />
              <Button className=' my-2 selectAllbtnforTicket' onClick={() => { setSelectedAreaIds(areaOptions.filter(option => !option.disabled)) }}>Select All </Button>
              {selectedAreaIds.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => setSelectedAreaIds([])}>Clear All </Button> : null}
            </Col>

            {/* Priority selection */}
            <Col lg='6' md='12'>
              <Input
                type='select'
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
              >
                <option value=''>Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Input>
            </Col>

            {/* Sub-area selection */}
            {selectedAreaIds.length > 0 && (
              <Col lg='6' md='12' className='mt-4 mt-lg-0'> 
                <Typeahead
                  id="subarea-typeahead"
                  labelKey="name"  // Explicitly setting the labelKey to "name"
                  options={
                    selectedAreaIds.flatMap(area => {
                      const matchedArea = areaOptions.find(a => a.area_id === area.area_id);
                      // Ensure sub_areas is always an array
                      return matchedArea ? matchedArea.sub_areas.map(sub => ({
                        sub_area_id: sub.id,
                        name: sub.name
                      })) : [];
                    })
                  }
                  onChange={handleSubAreaChange}
                  selected={selectedSubAreas}
                  multiple
                  placeholder="Select Subareas..."
                  renderMenuItemChildren={(option) => (
                    <div>{option.name}</div> // Show sub-area name
                  )}
                />

                <Button className='my-2 selectAllbtnforTicket' onClick={() => setSelectedSubAreas(selectedAreaIds.flatMap(area =>
                  areaOptions.find(a => a.area_id === area.area_id)?.sub_areas.map(sub => ({
                    sub_area_id: sub.id,
                    name: sub.name
                  })) || []))}> Select All </Button>
                {selectedSubAreas.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => setSelectedSubAreas([])}>Clear All</Button> : null}
              </Col>
            )}

            {/* Model selection */}
            <Col lg='6' md='12'>
              <Typeahead
                id="model-id-typeahead"
                labelKey="label"
                options={moduleOptions.map(module => ({ id: module.module_id, label: module.module_name }))}
                onChange={handleModelChange}
                selected={selectedModels}
                multiple
                placeholder="Select Models..."
                renderMenuItemChildren={(option) => (
                  <div>{option.label}</div>
                )}
              />
              <Button className='my-2 selectAllbtnforTicket' onClick={handleSelectAllModels}>Select All</Button>
              {selectedModels.length > 0 ? <Button className='my-3 mx-1 cancelAllbtnforTicket' onClick={() => setSelectedModels([])}>Clear All</Button> : null}
            </Col>

            <Col lg='6' md='12'>
              <FormGroup>
                <Input
                  type="textarea"
                  name="query"
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter query details here..."
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ paddingRight: '5px' }}>
          {/* <Button variant="success" className='m-1' onClick={handleSubmit}>
                     Update Ticket
                 </Button>
                 <Button variant="dark" className='m-1' onClick={toggleModal}>
                     Close
                 </Button> */}
                 {submitloader? 
                 <div className="spinner">
                 {/* <Loader /> */}
               </div>
                : 
          <button className="button" style={{ '--clr': '#1E67D6' }} onClick={handleSubmit}>
            <span className="button-decor"></span>
            <div className="button-content">
              <div className="button__icon">
                <IoIosSend color="#fff" /> {/* Using React Icon */}
              </div>
              <span className="button__text">Update</span>
            </div>
          </button>
           }
        </div>

      </Modal.Footer>
    </Modal>
  );
};

export default EditTicketFormModal;










