import React, { useState,useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import search from '../../../../assets/SuperAdminIcons/Search.png';
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent';
import editIcon from '../../../../assets/SuperAdminIcons/Edit.png';
import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png'; 
import AddUserForm from '../Components/Form/AddUserForm';
import UserCards from '../Components/userCards/UserCards';
import './../styling/super.css'
import { MdLockPerson } from "react-icons/md"; 


const SuperDashboard = () => {
   
   const [allpermissions, setAllPermissions] = useState([
    { routeofPermission: 'PPE Model', isActive: false },
    { routeofPermission: 'Emergency Exit', isActive: false },
    { routeofPermission: 'Machine Guard', isActive: false },
    { routeofPermission: 'Fork Lift', isActive: false },
    // { routeofPermission: 'TechQA', isActive: false }
])
   
   
    const tableData = [
        {
            id:12,
            status:'Active',
            createdBy:'Super Admin',
            name: "John Doe",
            email: "john.doe@example.com",
            role: "IT Officer",
            date: "2024-08-01",
            action: "Approved",
            Phone: "+92313778899",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
                
            ]
        },
        {
            id:27,
            status:'Active',
            createdBy:'It Officer',
            name: "Jane Smith",
            email: "jane.smith@example.com",
            Phone: "+92313778899",
            role: 'factory',
            date: "2024-08-02",
            action: "Pending",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: true },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        },
        {
            id:30,
            status:'Inactive',
            createdBy:'It Officer',
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            Phone: "+92313778899",
            role: "Factory",
            date: "2024-08-03",
            action: "Rejected",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: false },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        },
        {
            id:29,
            status:'Active',
            createdBy:'It Officer',
            name: "Emily Davis",
            Phone: "+92313778899",
            email: "emily.davis@example.com",
            role: "Area",
            date: "2024-08-04",
            action: "Approved",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: true },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        },
        {
            id:33,
            status:'Inactive',
            createdBy:'It Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            role: "Tech QA",
            Phone: "+92313778899",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        },
        {
            id:21,
            status:'Active',
            createdBy:'It Officer',
            name: "William Brown",
            Phone: "+92313778899",
            email: "william.brown@example.com",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        },
        {
            id:36,
            status:'Inactive',
            createdBy:'It Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            Phone: "+92313778899",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ]
        }
    ];
    const [data, setData] = useState(tableData)
    const [searchInput, setSearchInput] = useState()
    const [dataAfterFilteration, setDataAfterFilteration] = useState([])
    const [selectedRow, setSelectedRow] = useState(null); 
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [role, setRole] = useState('')
    // const [formData, setFormData] = useState({ });
    // const [formData, setFormData] = useState({ name: '', email: '', role: '', date: '', action: '' });
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        permissions:[
            { routeofPermission: 'PPE Model', isActive: false },
            { routeofPermission: 'Emergency Exit', isActive: false },
            { routeofPermission: 'Machine Guard', isActive: false },
            { routeofPermission: 'Fork Lift', isActive: false },
        ],
        id:51,
        status:'Active',
        createdBy:role,
    });
    
    const toggleModal = () => setModal(!modal);

    const handleEditClick = (row) => {
        console.log(row)
        setFormData(row);
        setSelectedRow(row);
        setModalType('edit');
        toggleModal();
    };

    const handleDeleteClick = (row) => {
        setData(data.filter(item => item !== row));
        const newNotification = {
            operation: `${row.role} - User ${row.name} was Deleted` ,
            status: `Success`,
            timestamp: new Date().toLocaleString(),
            role:role

            
        };
       
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        console.log('this is notification op', newNotification.operation)
        notifications.push(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
    };

    const handleAddUserClick = () => {
        setFormData({ name: '', email: '', role: '', date: '', 
            role: "",
            action: "", });
        setModalType('add');
        toggleModal();
    };

    const handleInputChange = (e) => {
        const { name, type, checked } = e.target;
        console.log('handle input')
        
        if (type === 'checkbox') {
            const updatedPermissions = formData.permissions.map(permission =>
                permission.routeofPermission === name
                    ? { ...permission, isActive: checked }
                    : permission
            );

            console.log('updated permissions', updatedPermissions)

            
    
            setFormData(prevFormData => ({
                ...prevFormData,
                permissions: updatedPermissions
            }));
        } 
        else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: e.target.value,
                id:27,
                status:'Active',
                createdBy:role,
            }));
        }
    
        console.log({ [name]: type === 'checkbox' ? checked : e.target.value });
        setTimeout(20000,console.log(formData,'from set time out'))
    };
  

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
       
        // Update the specific permission in the allpermissions array
        const updatedPermissions = allpermissions.map(permission =>
            permission.routeofPermission === name
                ? { ...permission, isActive: checked }
                : permission
        );
    
        // Update the allpermissions state with the updated permissions
        setAllPermissions(updatedPermissions);
    
        // Ensure form data also persists the state properly
        setFormData(prevFormData => ({
            ...prevFormData,
            permissions: updatedPermissions // Store the updated permissions in the form data
        }));
    
   
    };
    
    
    const handleSave = () => {
        if (!formData.name || !formData.password || !formData.email || !formData.phone || !formData.role ) {
            alert('Please fill all the fields');
            return;
        }
        
        if (modalType === 'edit') {
            setData(data.map(item => item === selectedRow ? formData : item));
            var newNotification = {
                operation: `${formData.role} - User ${formData.name} was Updated` ,
                status: `Success`,
                timestamp: new Date().toLocaleString(),
                role:role

                
            };
        } else {
            const newData = [...data, formData];
            console.log(newData)
            setData(newData);
    
            // Create a new notification
            var newNotification = {
                operation: `${formData.role} - User ${formData.name} Created` ,
                status: `Success`,
                timestamp: new Date().toLocaleString(),
                role:role
                
            };
    
            // Save the notification to localStorage
        }
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        console.log('this is notification op', newNotification.operation)
        notifications.push(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        toggleModal();

    };
    

    const filterData = () => {
        const normalizedSearchInput = (searchInput || '').trim().toLowerCase();
        console.log('this is normal', normalizedSearchInput)
        if (normalizedSearchInput.length === 0) {
            setDataAfterFilteration([]);
            return;
        }
        
        const filtering = data.filter((item) => {
            const normalizedItemName = item.name.toLowerCase();
            const normalizedItemRole = item.role.toLowerCase();
            return normalizedItemName.includes(normalizedSearchInput) 
        });
    
        setDataAfterFilteration(filtering);
    };
    

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
            name: 'Role',
            selector: row => row.role,
            // sortable: true,

            // cell: row => (
            //     <div style={{ background: '#267DEA', color: 'white', border: '0px', padding: '10px 18px', borderRadius: '10px', width: '80%', textAlign: 'center' }}>
            //         {row.role}
            //     </div>
            // ),
        },
        {
            name: 'Created By',
            selector: row => row.createdBy,
            // sortable: true,

            // cell: row => (
            //     <div style={{ background: '#267DEA', color: 'white', border: '0px', padding: '10px 18px', borderRadius: '10px', width: '80%', textAlign: 'center' }}>
            //         {row.createdBy}
            //     </div>
            // ),
        },
        {
            name: 'Created At',
            selector: row => row.date,
            // sortable: true,
        },
        {
            name: 'Password Renewal',
            selector: row => row.date,
            // sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='d-flex align-items-center justify-content-center'>
                    <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '2px' }} />
                    </button>
                    <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                     
                        <MdLockPerson style={{width: '20px', height: '20px',color:'#c5cee0'}}/>
                </div>
            ),
        },
    ];
    useEffect(() => { 
          const newRole = localStorage.getItem('role')
        setRole(JSON.parse(newRole));
    }, [formData,role]);
    
    return (
        <> 
            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <h3 className='superadminheading' style={{ border: '0px solid', paddingBottom: '30px',  fontWeight: '600', lineHeight: '40px', marginTop:'20px' }}>Super Admin Dashboard</h3>
               <Row>
                <UserCards data={data}/>
               </Row>
                <Row className='d-flex justify-content-between '>
                    <Col xl='10' lg='8' md='8' sm='8' xs='12'>
                        <Card className='shadow-none'>
                            <CardBody className='d-flex justify-content-start align-content-center' style={{ padding: '12px 12px 12px 20px' }}>
                                <img src={search} alt="search icon" style={{ width: '16px', height: '16px', marginRight: '15px', marginTop: '2px' }} />
                                <input
                                    type="text"
                                    placeholder='Search by Name or Role'
                                    style={{ width: '100%', border: '0px', fontSize: '16px', padding: '0px', margin: '0px' }}
                                    onChange={(e) => { setSearchInput(e.target.value); filterData(); }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl='2' lg='4' md='4' sm='4' xs='12' className='d-flex justify-content-start justify-content-sm-end justify-content-md-end justify-content-lg-end justify-content-xl-end align-items-start addUser'>
                    <button
                            className='btn'
                            style={{ background: '#1C3664', borderRadius: '10px', color: 'white', padding: '12px 20px 12px 20px', fontWeight: '400px' }}
                            onClick={handleAddUserClick}
                        >
                            Add User <span className='px-1 font-weight-bolder'>+</span>
                        </button>
            {/* <button type="button" className="btn btn-primary"  onClick={handleAddUserClick} style={{ fontSize: '14px', padding: '2px 12px' }}>Add User +</button> */}

                    </Col>
                </Row>
                <Card>
                    <h4 className='px-3 py-3'>Members List</h4>
                    <div style={{ background: '#EFF4FA' }}>
                        <DataTableComponent
                            tableColumns={tableColumns}
                            staticData={dataAfterFilteration.length > 0 ? dataAfterFilteration : data}
                            onRowClick={handleEditClick}
                        />
                    </div>
                </Card>
                <AddUserForm
                    modal={modal}
                    toggleModal={toggleModal}
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    modalType={modalType}
                    handleCheckboxChange={handleCheckboxChange}
                    allpermissions={allpermissions}
                    setAllPermissions={setAllPermissions}
                />
            </Container>
        </>
    );
};

export default SuperDashboard;
