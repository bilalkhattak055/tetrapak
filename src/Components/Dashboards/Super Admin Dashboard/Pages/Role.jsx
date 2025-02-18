import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import DataTableComponent from '../Components/Table/DataTable/Datatablecomponent';
import deleteIcon from '../../../../assets/SuperAdminIcons/Delete.png';
import editIcon from '../../../../assets/SuperAdminIcons/Edit.png';
import RoleModal from '../Components/Form/Modal'
import { format } from 'date-fns';
import search from './../../../../assets/SuperAdminIcons/Search.png'
import { H4 } from '../../../../AbstractElements';
import AddButton from '../../../Common/newButton/index'
import SearchBar from '../../../Common/Search Input/searchInput'

const Role = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        CreatedBy: '',
        Role: '',
        timestamp: '',
        CreatedBy: '',
        Code: '',
        Description: '',
        Status: "Success",
    });
    const [filteredData, setFilteredData] = useState([])
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('add');


    // const toggleModal = () => setModal(!modal);

    const tableColumns = [
        {
            name: 'Role',
            selector: row => <div >
                {row.Role}
            </div>,
            sortable: true,
        },
        {
            name: 'timestamp',
            selector: row => row.timestamp,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <div>
                    {
                        row.Status === 'Failed' ? <p className='alert-danger m-0 px-3 py-1 rounded'>{row.Status}</p>
                            : row.Status === 'Success' ? <p className='alert-success px-3 py-1 rounded m-0'>{row.Status}</p>
                                : 'Error'
                    }
                </div>
            ),
        },
        {
            name: 'action',
            cell: row => (
                <div className='d-flex align-items-center justify-content-center'>
                    <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '2px' }} />
                    </button>
                    <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
                        <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            ),
        },
    ];

    const tableData = [
        {
            id: 1, // Add unique id
            Role: "IT Officer",
            timestamp: "2024-08-01",
            action: "Delete",
            Status: "Success",
        },
        {
            id: 2, // Add unique id
            Role: "Area Officer",
            timestamp: "2024-08-01",
            action: "Delete",
            Status: "Failed",
        },
        {
            id: 3, // Add unique id
            Role: "Tech QA",
            timestamp: "2024-08-01",
            action: "Delete",
            Status: "Success",
        },
        {
            id: 4, // Add unique id
            Role: "Factory Officer",
            timestamp: "2024-08-01",
            action: "Delete",
            Status: "Success",
        },
    ];




    const handleDeleteClick = (row) => {
        const updatedData = data.filter((e) => e.Role !== row.Role);
        setData(updatedData);
    };

    const handleEditClick = (row) => {
        setModalType('edit');
        setFormData({
            id: row.id, // Make sure to store the row's id
            Role: row.Role,
            Description: row.Description,
            timestamp: row.timestamp,
            Status: row.Status,
            CreatedBy: row.CreatedBy || ''
        });
        toggleModal();
    };



    const handleAddRole = () => {
        setModalType('add');
        setFormData({
            CreatedBy: '',
            Role: '',
            timestamp: '',
            Code: '',
            Description: '',
            Status: "Success",
        }); // Reset form data when adding a new role
        toggleModal();
    };


    const handleInput = (e) => {
        const { name, value } = e.target;

        console.log(formData)



        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        setFormData({
            ...formData,
            'timestamp': `${year}-${month}-${day}`
        })
        return `${year}-${month}-${day}`;
    };

    const handleSave = () => {
        const date = new Date();
        const formattedDate = formatDate(date);
        console.log('handle save')
        if (modalType === 'edit') {
            const updatedData = data.map(item =>
                item.id === formData.id
                    ? { ...item, ...formData, timestamp: formattedDate }
                    : item
            );

            console.log('updated data', updatedData)
            setData(updatedData);
        } else if (modalType === 'add') {
            const filtered = data.filter(item => item.Role === formData.Role);

            if (filtered.length > 0) {
                alert('Role Exists');
                return;
            }

            if (!formData.Description || !formData.Role.trim()) {
                alert('Please fill all the fields');
                return;
            }

            const newRole = {
                ...formData,
                id: data.length + 1,
                timestamp: formattedDate
            };
            setData([...data, newRole]);
        }

        toggleModal();
    };




    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    useEffect(() => {
        setData(tableData);
    }, []);

    function handleSearch(ev) {
        const input = ev.target.value.toLowerCase()


        const filteredd = data.filter((item) => {
            return item.Role.toLowerCase().includes(input);
        });
        setFilteredData(filteredd)
    }

    return (
        <>
            <Container fluid={true} style={{ paddingTop: '30px', border: '0px solid' }}>
                <Row className='d-flex align-items-center justify-content-between' >
                    <Col xl='12' lg='12' md='12' sm='12' xs='12' className='permissioncolresCol'>
                        <H4>Role</H4>
                    </Col>

                </Row>
              
                <Row className='mb-3'>
                <Col xl='6' lg='6' md='6' sm='6'>
                    
                    <SearchBar onchange={handleSearch} />
                </Col>
                <Col xl='6' lg='6' md='6' sm='6' className='d-flex justify-content-xl-end justify-content-lg-end justify-content-sm-end justify-content-start align-items-start'>
                    
                    <AddButton btnText='Add Role +' onClick={handleAddRole} />
                </Col>
            </Row>
                <DataTableComponent
                    tableColumns={tableColumns}
                    staticData={filteredData.length > 0 ? filteredData : data}
                />

                <RoleModal
                    handleInput={handleInput}
                    handleEditClick={handleEditClick}
                    modalType={modalType}
                    formData={formData}
                    isOpen={modalOpen} toggle={toggleModal} title="Add Role"
                    handleSave={handleSave}
                />
            </Container>
        </>
    );
}

export default Role;

