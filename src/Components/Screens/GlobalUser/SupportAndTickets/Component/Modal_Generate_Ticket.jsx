import React, { useState, useMemo, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ModalGenerateTicket = ({ modal, toggleModal, handleSubmit, type, data, handleTicketfields }) => {
    const areaIDOptions = [
        { id: 0, name: 'SA-1' },
        { id: 1, name: 'SA-2' },
        { id: 2, name: 'SA-3' },
        { id: 3, name: 'SA-4' },
        { id: 4, name: 'SA-5' },
        { id: 5, name: 'SA-6' },
        { id: 6, name: 'SA-7' },
        { id: 7, name: 'SA-8' },
        { id: 8, name: 'SA-9' },
        { id: 9, name: 'SA-10' },
        { id: 10, name: 'SA-11' },
        { id: 11, name: 'SA-12' },
        { id: 12, name: 'SA-13' },
        { id: 13, name: 'SA-14' },
        { id: 14, name: 'SA-15' }
    ]
    const modelOptions = ['Helmet', 'Vest', 'Emergency Exit', 'Forklift', 'Machine Guard'];
    const areaOwnerOptions = [{ name: 'Adil' }, { name: 'Aftab' }, { name: 'Arslan' }, { name: 'Meraj' }, { name: 'Dr.Amjad' }, { name: 'Moazzam Ali' }, { name: 'Muhammad Shahbaz' }, { name: 'Nazir Sb' }, { name: 'Sadia' }, { name: 'Shafiq' }, { name: 'Shahbaz' }, { name: 'Sheraz' }, { name: 'Umair Pervaiz' }];
    const areaOwner = [
        {
            name: 'Adil',
            areas: [
                {
                    id: 'SA-1',
                    subareas: [
                        'Roof Tops (Palletizing)',
                        'Palletizing 1,2 & 3',
                        'palletizing office',
                        'palletizing corridor',
                        'waste window area'
                    ]
                }
            ]
        },
        {
            name: 'Aftab',
            areas: [
                {
                    id: 'SA-2',
                    subareas: [
                        'Roof Tops (Service Building)',
                        'Ammonia Compressor room',
                        'Catch pit area',
                        'Ref workshop',
                        'Ref Control Room',
                        'Ammonia CCR',
                        'Diffusion tank'
                    ]
                }
            ]
        },
        {
            name: 'Arslan',
            areas: [
                {
                    id: 'SA-3',
                    subareas: [
                        'Void Area (Production, Mixing)',
                        'Admin Building Roof Top',
                        'AHU Room above Canteen',
                        'Main Asset scrap yard',
                        'motor / panel scrap yard',
                        'R&D front side scrap yard',
                        'Contractor Workshops',
                        'DP store area',
                        'engineering store',
                        'safety office',
                        'safety storage area',
                        'engineering store placement yard',
                        'Fabrication workshop & surrounding area',
                        'Lathe Machine Workshop',
                        'MAMz workshop'
                    ]
                }
            ]
        },
        {
            name: 'Ayesha Khaliq',
            areas: [
                {
                    id: 'SA-4',
                    subareas: [
                        'Roof Tops (Cone Baking)',
                        'Cone Baking',
                        'Mixing',
                        'LI room',
                        'aging room',
                        'chocolate plant',
                        'mixing pits',
                        'oil/glucose decanting area',
                        'sauce plant',
                        'chilled room',
                        'day store area',
                        'mixing control room',
                        'tank form'
                    ]
                }
            ]
        },
        {
            name: 'Dr.Amjab',
            areas: [
                {
                    id: 'SA-5',
                    subareas: [
                        'OHC',
                        'Medical Roof Top'
                    ]
                }
            ]
        },
        {
            name: 'Meraj',
            areas: [
                {
                    id: 'SA-6',
                    subareas: [
                        'Roof Tops (Dry Store)',
                        'Roof Tops (Pulp Store)',
                        'Scrap Yard (Packmat area/ drums)',
                        'Dry Store 1, 2',
                        'chemical store',
                        'dry store driver room',
                        'docking stations',
                        'washrooms',
                        'Pulp Store',
                        'Hot room',
                        'flavour room',
                        'Pallet washing room'
                    ]
                }
            ]
        },
        {
            name: 'Moazzam Ali',
            areas: [
                {
                    id: 'SA-7',
                    subareas: [
                        'Machine Parts Room',
                        'Ultra Clean',
                        'Production floor',
                        'production offices',
                        'TPM room',
                        'Day store',
                        'Parts room',
                        'room 10',
                        'OPC chemical room'
                    ]
                }
            ]
        },
        {
            name: 'Muhammza Shahbaz',
            areas: [
                {
                    id: 'SA-8',
                    subareas: [
                        'ETP',
                        'Boiler',
                        'Air compressor',
                        'boiler control room',
                        'HFO tank',
                        'water filter area'
                    ]
                }
            ]
        },
        {
            name: 'Muhammza Wasi',
            areas: [
                {
                    id: 'SA-9',
                    subareas: [
                        'Roof Tops (Canteen)',
                        'Roof Tops (Security)',
                        'Time Office',
                        'ETMS',
                        'Medical OHC',
                        'Security Office',
                        'Parkings',
                        'Cycle Stand',
                        'Smoking Area',
                        'Area between Multan road gate to inner factory entrance gate',
                        'Admin Building',
                        'reception',
                        'canteen',
                        'kitchen',
                        'galleries',
                        'washrooms',
                        'locker area',
                        'masjid',
                        'changing rooms',
                        'waiting area',
                        'girls room',
                        'exit routes',
                        'brains lab',
                        'recharge room',
                        "Humail's office",
                        'meeting rooms',
                        'IT room',
                        'Outside Taris'
                    ]
                }
            ]
        },
        {
            name: 'Nazir Sb',
            areas: [
                {
                    id: 'SA-10',
                    subareas: [
                        'Solar Area (Panels, Transformer rooms & entire area)',
                        'Diesel Storage area',
                        'earth pit area',
                        'electrical power house',
                        'LT room',
                        'HT room',
                        'gen set area',
                        'transformer room',
                        'ammonia soft starter room'
                    ]
                }
            ]
        },
        {
            name: 'Sadia',
            areas: [
                {
                    id: 'SA-11',
                    subareas: [
                        'R&D Innovation Centre (Complete)'
                    ]
                }
            ]
        },
        {
            name: 'Shafiq',
            areas: [
                {
                    id: 'SA-12',
                    subareas: [
                        'QA',
                        'Pathogen Lab',
                        'QA storeroom'
                    ]
                }
            ]
        },
        {
            name: 'Shahbaz',
            areas: [
                {
                    id: 'SA-13',
                    subareas: [
                        'LPG Area',
                        'Pump House',
                        'Water treatment plant & roof',
                        'Biomass Boiler (including fuel storage shed)'
                    ]
                }
            ]
        },
        {
            name: 'Sheraz',
            areas: [
                {
                    id: 'SA-14',
                    subareas: [
                        'Roof Tops (Cold Stores)',
                        'Wooden Pallets Area',
                        'FG BOF',
                        'Cold Store 1&2',
                        'Cold store offices',
                        'Dispatch area'
                    ]
                }
            ]
        },
        {
            name: 'Umair Pervaiz',
            areas: [
                {
                    id: 'SA-15',
                    subareas: [
                        'UE Projects',
                        'Projects Store'
                    ]
                }
            ]
        }
    ];
    
    const subareaOptionsData = {
        'SA-1': ['Roof Tops (Palletizing)', 'Palletizing 1,2 & 3', 'palletizing office', 'palletizing corridor', 'waste window area'],
        'SA-2': ['Roof Tops (Service Building)',
            'Ammonia Compressor room',
            'Catch pit area',
            'Ref workshop',
            'Ref Control Room',
            'Ammonia CCR',
            'Diffusion tank'],
        'SA-3': ['Void Area (Production, Mixing)',
            'Admin Building Roof Top',
            'AHU Room above Canteen',
            'Main Asset scrap yard',
            'motor / panel scrap yard',
            'R&D front side scrap yard',
            'Contractor Workshops',
            'DP store area',
            'engineering store',
            'safety office',
            'safety storage area',
            'engineering store placement yard',
            'Fabrication workshop & surrounding area',
            'Lathe Machine Workshop',
            'MAMz workshop'],
        'SA-4': [
            'Roof Tops (Cone Baking)',
            'Cone Baking',
            'Mixing',
            'LI room',
            'aging room',
            'chocolate plant',
            'mixing pits',
            'oil/glucose decanting area',
            'sauce plant',
            'chilled room',
            'day store area',
            'mixing control room',
            'tank form'
        ],
        'SA-5': [
            'OHC',
            'Medical Roof Top'
        ],
        'SA-6': [
            'Roof Tops (Dry Store)',
            'Roof Tops (Pulp Store)',
            'Scrap Yard (Packmat area/ drums)',
            'Dry Store 1, 2',
            'chemical store',
            'dry store driver room',
            'docking stations',
            'washrooms',
            'Pulp Store',
            'Hot room',
            'flavour room',
            'Pallet washing room'
        ],
        'SA-7': [
            'Machine Parts Room',
            'Ultra Clean',
            'Production floor',
            'production offices',
            'TPM room',
            'Day store',
            'Parts room',
            'room 10',
            'OPC chemical room',
        ],
        'SA-8': [
            'ETP',
            'Boiler',
            'Air compressor',
            'boiler control room',
            'HFO tank',
            'water filter area'
        ],
        'SA-9': [
            'Roof Tops (Canteen)',
            'Roof Tops (Security)',
            'Time Office',
            'ETMS',
            'Medical OHC',
            'Security Office',
            'Parkings',
            'Cycle Stand',
            'Smoking Area',
            'Area between Multan road gate to inner factory entrance gate',
            'Admin Building',
            'reception',
            'canteen',
            'kitchen',
            'galleries',
            'washrooms',
            'locker area',
            'masjid',
            'changing rooms',
            'waiting area',
            'girls room',
            'exit routes',
            'brains lab',
            'recharge room',
            "Humail's office",
            'meeting rooms',
            'IT room',
            'Outside Taris',
        ],
        'SA-10': [
            'Solar Area (Panels, Transformer rooms & entire area)',
            'Diesel Storage area',
            'earth pit area',
            'electrical power house',
            'LT room',
            'HT room',
            'gen set area',
            'transformer room',
            'ammonia soft starter room',
        ],
        'SA-11': [
            'R&D Innovation Centre (Complete)'
        ],
        'SA-12': [
            'QA',
            'Pathogen Lab',
            'QA storeroom'
        ],
        'SA-13': [
            'LPG Area',
            'Pump House',
            'Water treatment plant & roof',
            'Biomass Boiler (including fuel storage shed)'
        ],
        'SA-14': [
            'Roof Tops (Cold Stores)',
            'Wooden Pallets Area',
            'FG BOF',
            'Cold Store 1&2',
            'Cold store offices',
            'Dispatch area',
        ],
        'SA-15': [
            'UE Projects',
            'Projects Store'
        ]
      };

    const [selectedAreaIDs, setSelectedAreaIDs] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [selectedSubAreas, setSelectedSubAreas] = useState([]);

    const availableSubAreas = useMemo(() => {
        return selectedAreaIDs.flatMap(areaID =>
            (subareaOptionsData[areaID.name] || []).map(subArea => ({ name: subArea }))
        );
    }, [selectedAreaIDs]);

    useEffect(() => {
        if (modal && type === 'Edit') {
            setSelectedAreaIDs(data.AreaID ? areaIDOptions.filter(option => data.AreaID.includes(option.name)) : []);
            setSelectedModels(data.model ? modelOptions.map(model => ({ name: model })).filter(model => data.model.includes(model.name)) : []);
            setSelectedSubAreas(data.subArea ? data.subArea.map(sub => ({ name: sub })) : []);
        } else if (modal && type === 'Generate') {
            setSelectedAreaIDs([]);
            setSelectedModels([]);
            setSelectedSubAreas([]);
        }
    }, [modal, type]);

    const handleAreaIDChange = (selected) => {
        console.log(selected)
        setSelectedAreaIDs(selected);
        // setSelectedSubAreas([]);
        handleTicketfields('AreaID', selected.map(s => s.name));
    };

    const handleSubAreaChange = (selected) => {
        setSelectedSubAreas(selected);
        handleTicketfields('subArea', selected.map(s => s.name));
    };

    const handleModelChange = (selected) => {
        setSelectedModels(selected);
        handleTicketfields('model', selected.map(s => s.name));
    };

    const handleSelectAllAreaIDs = () => {
        const allSelected = selectedAreaIDs.length === areaIDOptions.length;
        const newSelectedAreaIDs = allSelected ? [] : areaIDOptions;
        setSelectedAreaIDs(newSelectedAreaIDs);
        handleTicketfields('AreaID', newSelectedAreaIDs.map(s => s.name));
    };

    const handleSelectAllSubAreas = () => {
        const allSelected = selectedSubAreas.length === availableSubAreas.length;
        const newSelectedSubAreas = allSelected ? [] : availableSubAreas;
        setSelectedSubAreas(newSelectedSubAreas);
        handleTicketfields('subArea', newSelectedSubAreas.map(s => s.name));
    };

    const handleSelectAllModels = () => {
        const allSelected = selectedModels.length === modelOptions.length;
        const newSelectedModels = allSelected ? [] : modelOptions.map(model => ({ name: model }));
        setSelectedModels(newSelectedModels);
        handleTicketfields('model', newSelectedModels.map(m => m.name));
    };
    const handleAreaOwnerFilteration = ([selected]) => {
        if (selected && selected.name) {
            handleTicketfields('areaOwner', selected.name);
            const areaowner = selected.name; 
             
            const ownerData = areaOwner.find(owner => owner.name === areaowner);
            if (ownerData && ownerData.areas) { 
                const areaIDs = ownerData.areas.map(area => area.id);
                setSelectedAreaIDs(areaIDs);  
                const subareas = subareaOptionsData[areaIDs]; 
                setSelectedSubAreas(subareas.map(subArea => ({ name: subArea }))); 
            } else { 
                setSelectedAreaIDs([]); 
            }
        } else {
            handleTicketfields('areaOwner', ''); 
            console.log('Area owner selection cleared'); 
            setSelectedAreaIDs([]);
        }
    }; 
    console.log(selectedAreaIDs)
    
    return (
        <Modal isOpen={modal} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>{type === 'Generate' ? 'Generate Support Ticket' : 'Edit Ticket'}</ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col md='12' lg="6" >
                    <FormGroup>
                        <Label for="areaOwner">Area Owner</Label>
                        <Typeahead
                            id="areaOwner"
                            labelKey="name"
                            // onChange={([selected]) => {handleTicketfields('areaOwner', selected ? selected.name : '');
                            //  console.log(selected)
                            // }}
                            onChange={handleAreaOwnerFilteration}
                            options={areaOwnerOptions}
                            selected={data.areaOwner ? [areaOwnerOptions.find(owner => owner.name === data.areaOwner)] : []}
                            placeholder="Select Area Owner"
                            clearButton
                        />
                    </FormGroup>
                        </Col>
                        <Col md='12' lg="6"  >
                        
                        <FormGroup>
                            <Label for="Priority">Priority</Label>
                            <Input
                                type="select"
                                name="Priority"
                                id="Priority"
                                value={data.Priority || ''}
                                onChange={e => handleTicketfields('Priority', e.target.value)}
                            >
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Input>
                        </FormGroup>
                            </Col>
                    <Col md='12' lg="6"  >
                    <FormGroup>
                        <Label>Area ID</Label>
                        <div className="d-flex flex-column align-items-end gap-2 mb-2 ">
                            <Typeahead
                                id="AreaID"
                                labelKey="name"
                                multiple
                                options={areaIDOptions}
                                selected={selectedAreaIDs}
                                onChange={handleAreaIDChange}
                                placeholder="Select Area ID"
                                className='w-100'
                            />
                            <Button
                                onClick={handleSelectAllAreaIDs}
                                style={{ height: '38px' }}
                                color={selectedAreaIDs.length === areaIDOptions.length ? 'danger' : 'primary'}
                            >
                                {selectedAreaIDs.length === areaIDOptions.length ? 'Clear All' : 'Select All'}
                            </Button>
                        </div>
                    </FormGroup>
                        
                        </Col>
                        {selectedAreaIDs.length > 0 && (
                        <Col md='12' lg="6"  >
                        <FormGroup>
                            <Label>SubArea</Label>
                            <div className="d-flex flex-column align-items-end gap-2 mb-2 ">
                                <Typeahead
                                    id="SubArea"
                                    labelKey="name"
                                    multiple
                                    options={areaIDOptions}
                                    selected={selectedSubAreas}
                                    onChange={handleSubAreaChange}
                                    placeholder="Select SubArea"
                                    className='w-100'
                                /> 
                                <Button
                                    onClick={handleSelectAllSubAreas}
                                    style={{ height: '38px' }}
                                    color={selectedSubAreas.length === availableSubAreas.length ? 'danger' : 'primary'}
                                >
                                    {selectedSubAreas.length === availableSubAreas.length ? 'Clear All' : 'Select All '}
                                </Button>
                            </div>
                        </FormGroup>
                        </Col>
                    )}
                      
                        <Col md='12' lg="6"  >
                    <FormGroup>
                        <Label for="model">Model</Label>
                        <div className="d-flex flex-column align-items-end gap-2 mb-2 ">
                            <Typeahead
                                id="model"
                                labelKey="name"
                                multiple
                                options={modelOptions.map(model => ({ name: model }))}
                                selected={selectedModels}
                                onChange={handleModelChange}
                                placeholder="Select Model"
                                className='w-100'
                            />
                            <Button
                                onClick={handleSelectAllModels}
                                style={{ height: '38px' }}
                                color={selectedModels.length === modelOptions.length ? 'danger' : 'primary'}
                            >
                                {selectedModels.length === modelOptions.length ? 'Clear All' : 'Select All '}
                            </Button>
                        </div>
                    </FormGroup>
                        
                        </Col>
                        <Col md='12' lg="6"  >
                        
                    <FormGroup>
                        <Label for="query">Query</Label>
                        <Input
                            type="textarea"
                            name="query"
                            id="query"
                            placeholder="Describe your query"
                            value={data.query}
                            onChange={e => handleTicketfields('query', e.target.value)}
                            required
                        />
                    </FormGroup>
                        </Col>
                       
                    </Row>
                   

                    <Button color="primary" onClick={handleSubmit}>
                        {type === 'Generate' ? 'Submit' : 'Edit'}
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default ModalGenerateTicket;





