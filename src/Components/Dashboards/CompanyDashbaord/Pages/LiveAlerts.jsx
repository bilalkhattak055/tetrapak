import React, { useState } from 'react'
import DataTableComponent from '../Components/datatablefactory'
import { Container } from 'react-bootstrap'
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import search from '../../../../assets/SuperAdminIcons/Search.png'
import editIcon from '../../../../assets/SuperAdminIcons/Edit.png';
import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png';
import './../Pages/styling/liveCamera.css'
import { filterItems } from '../../../../_helper/helperFunctions/filter'
import { H4 } from '../../../../AbstractElements'
export default function LiveAlerts() {
    const [searchItem, setSearchItem] = useState('')
    const initialRole = JSON.parse(localStorage.getItem('role'))
    const [role, setRole] = useState(initialRole)
    const [filteredData, setFilteredData] = useState(undefined)
    const [filters, setFilters] = useState({
        factory: '',
        area: '',
        module: '',
        date: ''
    })
    


    const [data, setData] = useState([
        {
            camera: '1',
            date: '2024-04-02',
            time: '10:20 AM',
            factory: 'ICF',
            area: 'Warehouse',
            module: 'PPE Module',
            violation: 'Helmet',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
        // Add more objects here if you want more rows
        {
            camera: '3',
            date: '2024-09-14',
            time: '10:20 AM',
            factory: 'ICF',
            area: 'Production',
            module: 'PPE Module',
            violation: 'Helmet',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
        {
            camera: '4',
            date: '2024-09-13',
            time: '10:20 AM',
            factory: 'Foods',
            area: 'Production',
            module: 'Emergency Exit',
            violation: 'Helmet',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
        {
            camera: '5',
            date: '2024-09-12',
            time: '10:20 AM',
            factory: 'Foods',
            area: 'Production',
            module: 'Emergency Exit',
            violation: 'vest',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
        {
            camera: '7',
            date: '2024-09-11',
            time: '10:20 AM',
            factory: 'RYK',
            area: 'Warehouse',
            module: 'MachineGuard',
            violation: 'vest',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
        {
            camera: '8',
            date: '2024-09-10',
            time: '10:20 AM',
            factory: 'RYK',
            area: 'Distribution',
            module: 'Forklift',
            violation: 'vest',
            image: 'https://plus.unsplash.com/premium_photo-1663040345603-fe0968d5d514?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VyfGVufDB8fDB8fHww', // Replace with the actual image path
        },
    ]);


    const tableColumns = [
        {
            name: 'Camera',
            selector: row => row.camera,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true,
        },
        {
            name: 'Factory',
            selector: row => row.factory,
            sortable: true,
        },
        {
            name: 'Area',
            selector: row => row.area,
            sortable: true,
        },
        {
            name: 'Module',
            selector: row => row.module,
            sortable: true,
        },
        {
            name: 'Violation',
            selector: row => row.violation,
            sortable: true,
        },
        {
            name: 'Image',
            cell: row => (
                <img src={row.image} alt="Violation" style={{ width: '70px', height: '50px', borderRadius: '10px', marginBlock: '10px' }} />
            ),
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    {/* <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    </button> */}
                    <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            ),
        },
    ];

    const filter = (i) => {
        console.log("iii", i)
        const searchItem = i.toLowerCase()
        return data.filter(item =>
            item.camera.toLowerCase().includes(searchItem) ||
            item.factory.toLowerCase().includes(searchItem) ||
            item.area.toLowerCase().includes(searchItem) ||
            item.violation.toLowerCase().includes(searchItem) ||
            item.model.toLowerCase().includes(searchItem)
        );
    }

    function handleSearch(e) {
        const value = e.target.value
        //    const filtered = filter(value)
        const filtered = filterItems(data, value, ['camera', 'factory', 'area', 'violation', 'module'])
        setFilteredData(filtered)

    }
    function handleDeleteClick(row) {
        const filteredd = data.filter((item) => item !== row)
        setData(filteredd);
    }

    const factories = data && [...new Set(data.map((item) => item.factory))]
    const Area = data && [...new Set(data.map((ar)=> ar.area))] 
    const module = data && [...new Set(data.map((mod)=> mod.module))] 

//filters
const handleInputChange = (e, field) => {
    setFilters({
        ...filters,
        [field]: e.target.value
    });
    applyFilters({ ...filters, [field]: e.target.value });
};

// Function to apply all filters
const applyFilters = (currentFilters) => {
    let filtered = data;
    
    // Apply factory filter
    if (currentFilters.factory) {
        filtered = filtered.filter(item => item.factory === currentFilters.factory);
    }

    // Apply area filter
    if (currentFilters.area) {
        filtered = filtered.filter(item => item.area === currentFilters.area);
    }

    // Apply module filter
    if (currentFilters.module) {
        filtered = filtered.filter(item => item.module === currentFilters.module);
    }
     // Apply date filter
     if (currentFilters.date) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.date);
          const selectedDate = new Date(currentFilters.date);
          return itemDate.getTime() === selectedDate.getTime();
        });
      }

    setFilteredData(filtered);
};

    return (
        <>
            <Container className='mt-4' fluid={true}>
                <Row className=' header d-flex justify-content-between align-items-center permissioncolres'>
                    <Col xl='9' lg='8' md='8' sm='8' xs='12' className='permissioncolresCol' style={{paddingTop:'30px'}}>
                         <H4>
                        Live Alerts
                        </H4>
                    </Col>

                </Row>
                <Row xs='12'>
                    <Col xs='12' xxl='4'>
                        <Card className='shadow-none' >
                            <CardBody className='d-flex justify-content-start align-content-center' style={{ padding: '12px 12px 12px 20px' }}>
                                <img src={search} alt="search icon" style={{ width: '16px', height: '16px', marginRight: '15px', marginTop: '2px' }} />
                                <input
                                    type="text"
                                    placeholder='Search activity'
                                    // value={searchItem}
                                    onChange={handleSearch}
                                    style={{ width: '100%', border: '0px', fontSize: '16px', padding: '0px' }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs='12' xxl='8'>
                        <div className='d-flex w-100 gap-3 justify-content-end'>
                          {role === 'factory' && <div>
                                <FormGroup>

                                    {/* <Label for='role'>Factory</Label> */}
                                    <Input
                                        className='form-control rounded-3'
                                        type='select'
                                        name='role'
                                        id='role'
                                        style={{width: '158px', height: '48px'}}
                                    // value={formData.role}
                                    onChange={(e)=> handleInputChange(e, 'factory')}
                                    >

                                        
                                        <option value='' selected>Select Factory</option>
                                        {factories && factories.map((factory, index) => (
                                            <option key={index} value={factory}>{factory}</option>
                                        ))}
                                        
                                    </Input>

                                </FormGroup>

                            </div>}
                            <div>
                                <FormGroup>

                                    {/* <Label for='role'>Factory</Label> */}
                                    <Input
                                        className='form-control rounded-3'
                                        type='select'
                                        name='role'
                                        id='role'
                                        style={{width: '158px', height: '48px'}}
                                    // value={formData.role}
                                    onChange={(e)=> handleInputChange(e, 'area')}
                                    >
                                      <option value='' selected>Select Area</option>
                                        {Area && Area.map((area, index) => (
                                            <option key={index} value={area}>{area}</option>
                                        ))}
                                        
                                    </Input>
                                    

                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup>

                                    {/* <Label for='role'>Factory</Label> */}
                                    <Input
                                        className='form-control rounded-3'
                                        type='select'
                                        name='role'
                                        id='role'
                                        style={{width: '158px', height: '48px'}}
                                    // value={formData.role}
                                    onChange={(e)=> handleInputChange(e, 'module')}
                                    >
                                        <option value='' selected>Select Module</option>
                                        {module && module.map((mod, index) => (
                                            <option key={index} value={mod}>{mod}</option>
                                        ))}
                                        
                                    </Input>
                               

                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup>

                                    {/* <Label for='role'>Factory</Label> */}
                                    <Input
                                        className='form-control rounded-3'
                                        type='date'
                                        name='role'
                                        id='role'
                                        style={{width: '158px', height: '48px'}}
                                    onChange={(e)=> handleInputChange(e, 'date')}
                                    >
                                        
                                        
                                    </Input>
                               

                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
                <DataTableComponent tableColumns={tableColumns} staticData={filteredData ? filteredData : data} />
            </Container>
        </>
    )
}



