import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent';
import editIcon from '../../../../assets/SuperAdminIcons/Edit.png';
import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png';
import { Col, Input, Row, Card, CardBody } from 'reactstrap';
import './../styling/super.css';
import RoleModal from '../Components/Form/Modal';
import PermissionModal from '../Components/Form/PermissionModal';
import search from '../../../../assets/SuperAdminIcons/Search.png';
import { H4 } from '../../../../AbstractElements';
import AddButton from '../../../Common/newButton/index'
import SearchBar from '../../../Common/Search Input/searchInput'

export default function Permissions() {
    const [data, setData] = useState([
        {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "IT Officer",
            date: "2024-08-01",
            action: "Approved",
            Phone: "+92313778899",
            permissions: [
                { name: 'Download Reports', isActive: false },
                { name: 'View Reports', isActive: true },
                { name: 'Create Reports', isActive: false },
                { name: 'Update Reports', isActive: true },
                { name: 'Delete Reports', isActive: false }
            ]
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            Phone: "+92313778899",
            role: 'factory',
            date: "2024-08-02",
            action: "Pending",
            permissions: [
                { name: 'Download Reports', isActive: false },
                { name: 'View Reports', isActive: true },
                { name: 'Create Reports', isActive: true },
                { name: 'Update Reports', isActive: false },
                { name: 'Delete Reports', isActive: false }
            ]
        },
        {
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            Phone: "+92313778899",
            role: "Factory",
            date: "2024-08-03",
            action: "Rejected",
            permissions: [
                { name: 'Download Reports', isActive: true },
                { name: 'View Reports', isActive: true },
                { name: 'Create Reports', isActive: true },
                { name: 'Update Reports', isActive: false },
                { name: 'Delete Reports', isActive: true }
            ]
        },
        {
            name: "Emily Davis",
            Phone: "+92313778899",
            email: "emily.davis@example.com",
            role: "Area",
            date: "2024-08-04",
            action: "Approved",
            permissions: [
                { name: 'Download Reports', isActive: true },
                { name: 'View Reports', isActive: true },
                { name: 'Create Reports', isActive: false },
                { name: 'Update Reports', isActive: true },
                { name: 'Delete Reports', isActive: false }
            ]
        },
        {
            name: "William Brown",
            email: "william.brown@example.com",
            role: "Tech QA",
            Phone: "+92313778899",
            date: "2024-08-05",
            action: "Pending",
            permissions: [
                { name: 'Download Reports', isActive: false },
                { name: 'View Reports', isActive: true },
                { name: 'Create Reports', isActive: true },
                { name: 'Update Reports', isActive: false },
                { name: 'Delete Reports', isActive: false }
            ]
        }
    ]);

    const [activePermissions, setActivePermissions] = useState([]);
    const initialRole = JSON.parse(localStorage.getItem('role'))
    const roleSplit = initialRole.split('-').map(el => el.charAt(0).toUpperCase() + el.slice(1))
    const [role, setRole] = useState(roleSplit.join(' '));

    function settingLocal() {
        const uniquePermissions = Array.from(new Set(data[0].permissions.map(permission => permission.name)))

        setActivePermissions(prev => [
            ...prev,
            ...uniquePermissions.map((permissionName, index) => ({
                sNo: index + 1,
                permission: permissionName,
                timestamp: new Date().toLocaleString(), // Current timestamp
                createdBy: role // Using the role fetched from localStorage
            }))
        ]);
    }

    useEffect(() => {
        settingLocal()


    }, [])








    // Map these unique permissions to the activePermissions array

    console.log('active permissions', activePermissions)


    const tableColumns = [
        {
            name: 'S.No',
            selector: row => row.sNo,
            sortable: true,
        },
        {
            name: 'Permission',
            selector: row => row.permission,
            sortable: true,
        },
        {
            name: 'Timestamp',
            selector: row => row.timestamp,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row.createdBy,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    </button>
                    <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            ),
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({
        CreatedBy: role,
        Permission: '',
    });
    const [searchItem, setSearchItem] = useState('')
    const [filteredRows, setFilteredRows] = useState(undefined)
    const [selectedRow, setselectedRow] = useState()
    const handleEditClick = (row) => {
        setFormData({
            ...formData,
            Permission: row.permission,
            sNo: row.sNo
        })
        setModalType('Edit Permission');
        toggleModal();
        console.log(formData, 'edit from data')
    };

    const saveNotification = (message, status) => {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const newNotification = {
            operation: message,
            status,
            timestamp: new Date().toLocaleString(),
            role: role
        };
        notifications.push(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
    };


    const handleDeleteClick = (row) => {
        const updatedData = activePermissions.filter((e) => e.permission !== row.permission);
        setActivePermissions(updatedData);
        saveNotification(`Permission '${row.permission}' deleted`, 'Success');
    };

    const handleAddRole = () => {
        setModalType('Add Permission');
        toggleModal();
    };
    const toggleModal = () => setModalOpen(!modalOpen);
    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(formData)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!formData.Permission) {
            alert('Please fill all the fields');
            return;
        }
        if (modalType == 'Add Permission') {
            const newPermission = {
                sNo: activePermissions.length + 1,
                permission: formData.Permission,
                timestamp: new Date().toLocaleString(),
                createdBy: role,
            };
            const findingSamePermission = activePermissions.filter((e) => {
                return e.permission == newPermission.permission
            })
            if (findingSamePermission.length > 0) {
                return alert('Permission alredy exist')
            }
            setActivePermissions([...activePermissions, newPermission]);
            saveNotification(`Permission '${formData.Permission}' added`, 'Success');
        }
        else if (modalType == 'Edit Permission') {
            console.log(formData);
            const findingSamePermission = activePermissions.filter((e) => {
                return e.permission == formData.Permission
            })
            if(findingSamePermission.length>0){
                console.log(findingSamePermission)
                alert('Permission alredy exist')
                return
            }
            const existingPermissionIndex = activePermissions.findIndex(permission => permission.sNo === formData.sNo);
            if (existingPermissionIndex === -1) {
                alert('Permission not found');
                return;
            }
            const updatedPermissions = activePermissions.map((permission, index) => {
                if (index === existingPermissionIndex) {
                    return {
                        ...permission,
                        permission: formData.Permission,
                        timestamp: new Date().toLocaleString(),
                    };
                }
                return permission;
            });
            setActivePermissions(updatedPermissions);
            saveNotification(`Permission '${formData.Permission}' added`, 'Success');
        }
        toggleModal();
        setFormData('')
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchItem(value);

        // Filter activePermissions based on the search input
        const filtered = activePermissions.filter(item =>
            item.permission.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredRows(filtered);
    };


    console.log(role, 'permissions')

    return (
        <Container fluid={true} style={{ paddingTop: '30px', border: '0px solid' }}>
            <H4>
                Permissions
            </H4>
            <Row className='mb-3'>
                <Col xl='6' lg='6' md='6' sm='6'>
                    
                    <SearchBar onchange={handleSearch}/>
                </Col>
                <Col xl='6' lg='6' md='6' sm='6' className='d-flex justify-content-xl-end justify-content-lg-end justify-content-sm-end justify-content-start align-items-start'>
                    
                    <AddButton btnText='Add Permission +' onClick={handleAddRole} />
                </Col>
            </Row>


            <DataTableComponent tableColumns={tableColumns} onRowClick={handleEditClick} staticData={filteredRows ? filteredRows : activePermissions} />
            <PermissionModal
                handleInput={handleInput}
                formData={formData}
                isOpen={modalOpen} toggle={toggleModal} modalType={modalType}
                handleSave={handleSave}
                role={role}

            />
        </Container>
    );
}
