import React, { useState } from 'react';
import { Container, Card, CardBody, Col, Row } from 'reactstrap';
import search from '../../../../assets/SuperAdminIcons/Search.png';
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent';
import { Link } from 'react-router-dom';
import { H4 } from '../../../../AbstractElements';
import SearchBar from '../../../Common/Search Input/searchInput'



const Logs = () => {


    const initialRole = JSON.parse(localStorage.getItem('role'))
    const [role, setRole] = useState(initialRole)
    const tableData = [
        {
            id: 12,
            status: 'Active',
            createdBy: 'Super Admin',
            name: "John Doe",
            email: "john.doe@example.com",
            role: "IT Officer",
            date: "2024-08-01",
            action: "Approved",
            Phone: "+92313778899",
            permissions: [
                { name: 'ITOfficer', isActive: false },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: false },
                { name: 'Area', isActive: true },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '10 min',
            LockoutTime: 'last active 1 day ago',
        },
        {
            id: 27,
            status: 'Active',
            createdBy: 'It Officer',
            name: "Jane Smith",
            email: "jane.smith@example.com",
            Phone: "+92313778899",
            role: 'factory',
            date: "2024-08-02",
            action: "Pending",
            permissions: [
                { name: 'ITOfficer', isActive: false },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: true },
                { name: 'Area', isActive: false },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '5 min',
            LockoutTime: 'last active 3 hours ago',
        },
        {
            id: 30,
            status: 'Inactive',
            createdBy: 'It Officer',
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            Phone: "+92313778899",
            role: "Factory",
            date: "2024-08-03",
            action: "Rejected",
            permissions: [
                { name: 'ITOfficer', isActive: true },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: true },
                { name: 'Area', isActive: false },
                { name: 'TechQA', isActive: true }
            ],
            LockoutDuration: '23 min',
            LockoutTime: 'last active 3 day ago',
        },
        {
            id: 29,
            status: 'Active',
            createdBy: 'It Officer',
            name: "Emily Davis",
            Phone: "+92313778899",
            email: "emily.davis@example.com",
            role: "Area",
            date: "2024-08-04",
            action: "Approved",
            permissions: [
                { name: 'ITOfficer', isActive: true },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: false },
                { name: 'Area', isActive: true },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '25 min',
            LockoutTime: 'last active 8 hours ago',
        },
        {
            id: 33,
            status: 'Inactive',
            createdBy: 'It Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            role: "Tech QA",
            Phone: "+92313778899",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { name: 'ITOfficer', isActive: false },
                { name: 'factory', isActive: true },
                { name: 'Factory', isActive: true },
                { name: 'Area', isActive: false },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '13 min',
            LockoutTime: 'last active 6 day ago',
        },
        {
            id: 21,
            status: 'Active',
            createdBy: 'It Officer',
            name: "William Brown",
            Phone: "+92313778899",
            email: "william.brown@example.com",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { name: 'ITOfficer', isActive: true },
                { name: 'factory', isActive: false },
                { name: 'Factory', isActive: true },
                { name: 'Area', isActive: true },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '45 min',
            LockoutTime: 'last active 3 day ago',
        },
        {
            id: 36,
            status: 'Inactive',
            createdBy: 'It Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            Phone: "+92313778899",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { name: 'ITOfficer', isActive: true },
                { name: 'factory', isActive: false },
                { name: 'Factory', isActive: true },
                { name: 'Area', isActive: true },
                { name: 'TechQA', isActive: false }
            ],
            LockoutDuration: '29 min',
            LockoutTime: 'last active 1 hour ago',
        }
    ]
    const tableColumns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            // sortable: true,
        },
        {
            name: 'Lockout Time',
            selector: row => row.LockoutTime,
            // sortable: true,
        },
        {
            name: 'Lockout Duration',
            selector: row => row.LockoutDuration,
            // sortable: true,
        },
        {
            name: 'Details',
            cell: row => (
                <Link to={`${process.env.PUBLIC_URL}/dashboard/logs/Details/${role}`}>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className='btn btn-primary' onClick={handleDetails}>Details</button>
                    </div>
                </Link>
            ),
            // sortable: true,
        },

        // {
        //     name: 'Action',
        //     cell: row => (
        //         <div className='d-flex align-items-center justify-content-center'>
        //             <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
        //                 <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '2px' }} />
        //             </button>
        //             <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
        //                 <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
        //             </button>

        //                 <MdLockPerson style={{width: '20px', height: '20px',color:'#c5cee0'}}/>
        //         </div>
        //     ),
        // },
    ]
    const [showDetails, setshowDetails] = useState(false)
    const handleDetails = () => {
        setshowDetails(!showDetails);
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(undefined); 
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
         
        const filtered = tableData.filter(item =>
            item.name.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value) ||
            item.role.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value) ||
            item.createdBy.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };
    return (
        <div>

            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <H4>Logs</H4>
                <div>
                    {/* <h3 className='superadminheading' style={{ border: '0px solid', paddingBottom: '30px', fontWeight: '600', lineHeight: '40px', marginTop: '20px' }}>Log</h3> */}
                    <Row className='d-flex justify-content-between mb-3'>
                        <Col md='6' sm='8' xs='12'>
                       
                            <SearchBar   onchange={handleSearch}/>
                        </Col>

                    </Row>
                    <DataTableComponent
                        tableColumns={tableColumns}
                        staticData={filteredData ? filteredData : tableData}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Logs;
