import React, { useState, useEffect, useContext } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Media, Row } from 'reactstrap';
// import search from '../../../../assets/SuperAdminIcons/Search.png';
import search from '../../../../../assets/SuperAdminIcons/Search.png';
import editIcon from '../../../../../assets/SuperAdminIcons/Edit.png';
import deleteIcon from '../../../../../assets/SuperAdminIcons/Delete.png';
import ItTotalCard from '../Components/Cards/ItTotalCard';
import '../../../Super Admin Dashboard/styling/super.css';
import AddForm from '../Components/Forms/AddForm';
import ItDataTable from '../Components/Table/ItDataTable';
import AddUserForm from '../../../Super Admin Dashboard/Components/Form/AddUserForm';
import { H2, H3, H4 } from '../../../../../AbstractElements';
import { Lock } from 'react-feather';
import { applyButtonFilters } from '../../../../../_helper/helperFunctions/filter';
import '../Styling/itStyle.css'
import { FormGroup } from 'react-bootstrap';
import AddButton from '../../../../Common/newButton/index'
import SearchBar from '../../../../Common/Search Input/searchInput'
import { useLocation, useNavigate } from 'react-router';
import formDataContext from '../../../../../_helper/formData';
import AddUser from './AddUser';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText } from 'reactstrap';
import AreaService from '../../../../../api/areaService';
import Loader from '../../../../../CommonElements/Spinner/loader'
import { errorToast,successToast } from '../../../../../_helper/helper';
import ConfirmationModals from '../Components/ConifrmationModal/Confirmation_Modal';
const ItDashboard = ({ typee }) => {
    const navigate = useNavigate()
    const [allpermissions, setAllPermissions] = useState([
        { routeofPermission: 'PPE Model', isActive: false },
        { routeofPermission: 'Emergency Exit', isActive: false },
        { routeofPermission: 'Machine Guard', isActive: false },
        { routeofPermission: 'Fork Lift', isActive: false },
        // { routeofPermission: 'TechQA', isActive: false }
    ])
    const tableData = [
        {
            userId: '9099',
            id: 12,
            status: true,
            createdBy: 'Super Admin',
            name: "John Doe",
            email: "john.doe@example.com",
            role: 'factory',
            date: "2024-08-01",
            action: "Approved",
            phone: "92313778899",
            passwordReneval: "50 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },

            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "bilal@gmail.com",
                "ali@gmail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923123432342", "+923534535345"
            ]
        },
        {
            userId: '9098',
            id: 53,
            status: true,
            createdBy: 'Super Admin',
            name: "Wajahat",
            email: "wajahat@example.com",
            role: "it-officer",
            date: "2024-08-01",
            action: "Approved",
            phone: "+92313778899",
            passwordReneval: "50 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },

            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "bilal@gmail.com",
                "ali@gmail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923123432342", "+923534535345"
            ]
        },
        {
            userId: '9097',
            id: 46,
            status: true,
            createdBy: 'IT Officer',
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "92313778899",
            role: 'factory',
            date: "2024-08-02",
            action: "Pending",
            passwordReneval: "40 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: true },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: false,
            emailNotifications: [],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923123432342", "+923534535345"
            ]
        },
        {
            userId: '9096',
            id: 30,
            status: false,
            createdBy: 'IT Officer',
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            phone: "92313778899",
            role: "Factory",
            date: "2024-08-03",
            action: "Rejected",
            passwordReneval: "12 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: false },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "Foods@mail.com",
                "uniliver@mail.com"
            ],
            whatsappNotification: false,

        },
        {
            userId: '9095',
            id: 29,
            status: true,
            createdBy: 'IT Officer',
            name: "Emily Davis",
            phone: "92313778899",
            email: "emily.davis@example.com",
            role: "Area",
            date: "2024-08-04",
            action: "Approved",
            passwordReneval: "21 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: true },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "global@mail.com",
                "ali@mail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923134324234", "+92334234234"
            ]
        },
        {
            userId: '9094',
            id: 33,
            status: true,
            createdBy: 'IT Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            role: "Tech QA",
            phone: "92313778899",
            date: "2024-08-05",
            action: "Pending",
            passwordReneval: "19 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "it@mail.com",
                "ali@gmail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923123432342", "+923534535345"
            ]
        },
        {
            userId: '9093',
            id: 21,
            status: false,
            createdBy: 'IT Officer',
            name: "William Brown",
            phone: "92313778899",
            email: "william.brown@example.com",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            passwordReneval: "15 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "unilever@mail.com",
                "Foods@mail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+92312343342342", "+9235344234234"
            ]
        },
        {
            userId: '9092',
            id: 36,
            status: true,
            createdBy: 'IT Officer',
            name: "William Brown",
            email: "william.brown@example.com",
            phone: "92313778899",
            role: "Area",
            date: "2024-08-05",
            action: "Pending",
            passwordReneval: "45 Days",
            permissions: [
                { routeofPermission: 'PPE Model', isActive: false },
                { routeofPermission: 'Emergency Exit', isActive: true },
                { routeofPermission: 'Machine Guard', isActive: false },
                { routeofPermission: 'Fork Lift', isActive: true },
            ],
            inAppNotification: true,
            emailNotification: true,
            emailNotifications: [
                "bilal@gmail.com",
                "ali@gmail.com"
            ],
            whatsappNotification: true,
            whatsappNotifications: [
                "+923123432342", "+923534535345"
            ]
        }
    ];

    const location = useLocation()
    const { AddUserData, setAddUserData } = useContext(formDataContext)
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [dataAfterFilteration, setDataAfterFilteration] = useState(undefined)
    const [selectedRow, setSelectedRow] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const initialRole = JSON.parse(localStorage.getItem('role'))
    const [role, setRole] = useState(initialRole)
    const [showloader, setshowloader] = useState(true);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const confirmationToggle = () => setConfirmationModal(!ConfirmationModal);
    const [deletedUser, setdeletedUser] = useState({});
    const [statuschangeModal, setstatuschangeModal] = useState(false);
    const statusToggle = () => setstatuschangeModal(!statuschangeModal);
    const [filters, setFilters] = useState({
        role: '',
        creator: '',
        status: '',
        id: ''
    })

    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        permissions: [
            { routeofPermission: 'PPE Model', isActive: false },
            { routeofPermission: 'Emergency Exit', isActive: false },
            { routeofPermission: 'Machine Guard', isActive: false },
            { routeofPermission: 'Fork Lift', isActive: false },
        ],
        id: 27,
        status: true,
        createdBy: role,
        passwordReneval: '90 Days',
        inAppNotification: true,
        emailNotification: true,
        emailNotifications: [],
        whatsappNotification: true,
        whatsappNotifications: [],
        Areas: [],
        factories: [],
        subArea: []
    });
    // useEffect(() => {
    //     console.log(formData, 'Updated formData');
    //     const settingRole = 'IT Officer'; 
    //       const newRole = localStorage.getItem('role')
    //     setRole(newRole);
    // }, [formData,role]);
    const toggleModal = () => setModal(!modal);

    const handleEditClick = (row) => {
        
        // successToast('Edit will be done in a while');
        // return
        setFormData(row);
        setSelectedRow(row);
        setAddUserData(row)
        navigate(`${process.env.PUBLIC_URL}/dashboard/add-user/${role}`, { state: { type: 'edit' } })
        // navigate(`${process.env.PUBLIC_URL}/dashboard/add-user/${role}`)
        setModalType('edit');
        toggleModal();
    };

    const handleDeleteClick =async (row) => {
        setdeletedUser(row)
        confirmationToggle()
        
        
        
        
        const newNotification = {
            operation: `${row.role} - User ${row.name} was Deleted`,
            status: `Success`,
            timestamp: new Date().toLocaleString(),
            role: role
        };

        const notificationsIT = JSON.parse(localStorage.getItem('notificationsIT')) || [];
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        // console.log('this is notification op', newNotification.operation)
        notificationsIT.push(newNotification);
        notifications.push(newNotification);
        localStorage.setItem('notificationsIT', JSON.stringify(notificationsIT));
        localStorage.setItem('notifications', JSON.stringify(notifications));
    };

    const handleAddUserClick = () => {

        // previous add user by modal Code //
        setFormData({
            name: '', email: '', role: '', date: new Date().toLocaleDateString(),
            role: "",
            action: "",
        });
       
        // setModalType('add');
        // toggleModal();
        // END previous add user by modal Code//

        //New Add user Code
        navigate(`${process.env.PUBLIC_URL}/dashboard/add-user/${JSON.parse(localStorage.getItem('role'))}`, { state: { type: 'add' } })



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
                status: 'Active',
                createdBy: role,
                passwordReneval: '90 Days'
            }));
        }

        console.log({ [name]: type === 'checkbox' ? checked : e.target.value });
        setTimeout(20000, console.log(formData, 'from set time out'))
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
    // useEffect(()=> {
    //   if(AddUser.name !== '', location.state?.addUser === true){
    //     location.state.addUser = false
    //     const newData = [...data, AddUserData, AddUserData.date='2024-10-05', AddUserData.id='34'
    //     ];
    //     console.log(newData)
    //     setData(newData)
    //     location.state.addUser = false
    //     }
    // }, [AddUserData, location])
    useEffect(() => {
        if (AddUserData.name !== '' && location.state?.addUser === true) {
            // Check if all required fields in AddUserData are present and valid
            if (AddUserData.name && AddUserData.email && AddUserData.role) {
                // Create new data only if AddUserData is valid
                const newData = [
                    ...data,
                    {
                        ...AddUserData,
                        date: '2024-10-05', // or dynamically set
                        id: '34' // or generate dynamically
                    }
                ]; 
                setData(newData);
                // Reset addUser state
                location.state.addUser = false;
            } else {
                // Handle empty data case, e.g., show an alert or log an error
                console.warn('Invalid AddUserData: Missing required fields');
            }
        }
    }, [AddUserData, location]);

    const handleSave = () => {

        if (!formData.name || !formData.password || !formData.email || !formData.role) {
            alert('Please fill all the fields');
            return;
        }
        else if ((formData.permissions) == undefined) {
            alert('Select atleast one permission')
            return;
        }

        const checkingEmial = formData.email.includes('@');
        if (checkingEmial == false) {
            alert('please enter correct email')
            return
        }

        if (modalType === 'edit') {
            setData(data.map(item => item === selectedRow ? formData : item));
            console.log("selected row", selectedRow)
            var newNotification = {
                operation: `${formData.role} - User ${formData.name} was Updated`,
                status: `Success`,
                timestamp: new Date().toLocaleString(),
                role: role

            };
        } else {
            const newData = [...data, formData];
            console.log(newData)
            setData(newData);

            // Create a new notification
            var newNotification = {
                operation: `${formData.role} - User ${formData.name} Created`,
                status: `Success`,
                timestamp: new Date().toLocaleString(),
                role: role

            };

            // Save the notification to localStorage
        }
        const notificationsIT = JSON.parse(localStorage.getItem('notificationsIT')) || [];
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        // console.log('this is notification op', newNotification.operation)
        notificationsIT.push(newNotification);
        notifications.push(newNotification);
        localStorage.setItem('notificationsIT', JSON.stringify(notificationsIT));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        toggleModal();
        setAllPermissions([
            { routeofPermission: 'PPE Model', isActive: false },
            { routeofPermission: 'Emergency Exit', isActive: false },
            { routeofPermission: 'Machine Guard', isActive: false },
            { routeofPermission: 'Fork Lift', isActive: false },
            // { routeofPermission: 'TechQA', isActive: false }
        ])
    };

    const handleFilterChange = (e, field) => {
        setFilters((prev) => ({
            ...prev,
            [field]: e.target.value
        }))

        filterDataa({ ...filters, [field]: e.target.value })
        // setDataAfterFilteration(fil);
    }

    const filterDataa = (currentFilters) => {
        console.log(currentFilters)
        let filteredData = data;
        console.log('filteredDataaa', filteredData)
        if (currentFilters.role) {
            filteredData = filteredData.filter((item) => item.role_name === currentFilters.role);
        }
        if (currentFilters.creator) {
            filteredData = filteredData.filter((item) => item.createdBy === currentFilters.creator);
        }
        if (currentFilters.status) {
            filteredData = filteredData.filter((item) => item.status === (currentFilters.status === 'Active' ? true : false));

            // filteredData = filteredData.filter((item) => item.status === currentFilters.status);
        }

        setDataAfterFilteration(filteredData);
    };

    const filterData = (e) => {
        const normalizedSearchInput = e.target.value.trim().toLowerCase();
        console.log('this is normal', normalizedSearchInput)
        if (!e.target.value.trim()) {
            filterDataa(filters);  // Reapply the button filters when search input is cleared
            return;
        }

        const filterVar = dataAfterFilteration ? dataAfterFilteration : data

        const filtering = filterVar.filter((item) => {
            const name = item.name.toLowerCase();
            // const role = item.role.toLowerCase();
            // const createdBy = item.createdBy.toLowerCase();
            // const status = item.status.toLowerCase();
            const email = item.email.toLowerCase();
            return name.includes(normalizedSearchInput) || email.includes(normalizedSearchInput);
        });

        setDataAfterFilteration(filtering);
    };

    const handleStatusChange = async(row) => {
console.log(row)
        // const updatedData = data.map(item =>
        //     item.id === row.id ? { ...item, status: !item.status } : item
        // );
        // setData(updatedData);
        // console.log('Updated data:', updatedData);

        // // If filtering is active, reapply the filters
        // if (filters.role || filters.creator || filters.status) {
        //     filterDataa(filters);
        // }
        // Toggle status for the selected row in the original data
        try {
            const res=await AreaService.updateUserStatusIT(row.id);
            console.log(res);
            if(res.status==200){
                const updatedData = data.map(item =>
                    item.id === row.id ? { ...item, status: !item.status } : item
                );
                console.log(updatedData )
                // Set the updated data in state
                setData(updatedData);
                successToast('Status updated')
                // If filters are applied, reapply them to the filtered data
                if (filters.role || filters.creator || filters.status) {
                    filterDataa(filters, updatedData);
                } else {
                    setDataAfterFilteration(null); // Reset the filtered data if no filters are applied
                }
            statusToggle();
            }
             
        } catch (error) {
            errorToast('Error while updating status');
            statusToggle();
        }
        
    };

    const tableColumns = [
        {
            name: 'User ID',
            selector: row => row.id,
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
            selector: row => row.role_name,
        },
        // {
        //     name: 'Created By',
        //     selector: row => row.createdBy,
        // },
        {
            name: 'Password Reneval',
            selector: row => '50 Days',
        },

        {
            name: 'Created At',
            selector: row => {
                // row.created_at
                const issueDateUTC = new Date(row.created_at + " UTC");
                const issueDateUTC_into_local = new Date(issueDateUTC.toString());
                return issueDateUTC_into_local.toLocaleString() || row.created_at
            },
            sortable: true,
        },
        {
            name: 'Status',
            // sortable: true,

            cell: row => (

                <Media body className={`text-end switch-size d-flex justify-content-center align-items-center  `} style={{ width: '100%' }}>
                    <Label className="switch mt-2" style={{ marginLeft: '15px' }}>
                        <Input
                            type="checkbox"
                            checked={row.status}
                            onChange={() =>handlestatusreq(row)}

                        />
                        <span className={`switch-state`} style={{ height: '25px', width: '45px' }}></span>
                    </Label>
                </Media>

            ),
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
                    {/* <button onClick={hancleRenewPassword} style={{ border: 'none', background: 'none' }}> 
                        <Lock color='#c5cee0' width={20} />
                    </button> */}
                </div>
            ),
        },
    ];

    const hancleRenewPassword = () => {
        newPasstoggle();
    }

    const roles = data && [...new Set(data.map((item) => item.role_name))]
    const creaters = data && [...new Set(data.map((item) => item.created_by))]
    const statuses = data && [...new Set(data.map((item) => item.status ? 'Active' : 'Inactive'))];
    console.log('statuses', statuses);

    // ---------------------x---------------------x----------------------
    const [newpassmodal, setnewpassmodal] = useState(false)
    const newPasstoggle = () => setnewpassmodal(!newpassmodal);
    const [newPass, setNewPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPass(!showPass);
    };
    const generatePassword = () => {
        const length = 12; // Length of the password
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
        let password = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        setNewPass(password); // Set the generated password in the input field
      };
const FetchUsersData=async()=>{
    console.log('api calling');
     const res=await AreaService.getAllUserForit();
     setData(res.data.data)
     console.log(res) 
     if(res.status==200){
         setshowloader(false)
     }
     else{
         errorToast('Error while fetching data')
     }
}
const DeleteUser=async(row)=>{
    console.log('from final click',row);
    try {
        const res=await AreaService.deleteUserforIT(row.id);
        console.log(res,'selected data');
        if(res.status==200){
            successToast('User Deleted');
            setData(data.filter(item => item !== row));
            confirmationToggle();
            return
        }else{
            errorToast('Error while deleting user');
            confirmationToggle();
        }
    } catch (error) {
        errorToast('Error while deleting user');
        confirmationToggle();
    }
      
}
const handlestatusreq=(row)=>{
    setdeletedUser(row)
    statusToggle();
}
 
useEffect(() => {  
    FetchUsersData();
}, []);

    return (
        <>
            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <H4 attrH4={{ className: 'mb-3' }}>{typee === 'super' ? 'Super Admin Dashboard' : 'IT Officer Dashboard'}</H4>
             
                {showloader? <Loader/>:<>
                <Row>
                    <ItTotalCard data={data} />
                </Row>
                <H4>Member List</H4>
         
                <Row className='d-flex justify-content-between align-items-start mb-3'>
                    <Col xs='12' md='8' lg='5' xl='4'>
                        <SearchBar onchange={(e) => { filterData(e) }} />
                    </Col>
                    <Col xl='2' lg='3' xs='12' sm='12' md='4' className='d-flex align-items-center  justify-content-xs-end justify-content-sm-end justify-content-md-end justify-content-xl-start adduserbtn'>
                        <AddButton btnText='Add User +' height={'47px'} onClick={handleAddUserClick} />
                    </Col>
                    <Col xl='6 mt-0' lg='12' md='12' xs='12' className='d-flex justify-content-md-end justify-content-start flex-wrap gap-1 filetrsGroupbtns'>
                       
                       
                            <FilterButton filters={roles} firstOption='Select Role' OnChange={handleFilterChange} inputChangeText={'role'} />
                            {/* <FilterButton filters={creaters} firstOption='Created by' OnChange={handleFilterChange} inputChangeText={'creator'} /> */}
                            {/* <FilterButton filters={statuses} firstOption='Select Status' OnChange={handleFilterChange} inputChangeText={'status'} /> */}
 
                    </Col>

                </Row>
                <div >
                    <ItDataTable
                        tableColumns={tableColumns}
                        staticData={dataAfterFilteration ? dataAfterFilteration : data}
                    // onRowClick={handleEditClick}
                    />
                </div>
                {/* <AddForm
                    modal={modal}
                    toggleModal={toggleModal}
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    modalType={modalType}
                    handleCheckboxChange={handleCheckboxChange}
                /> */}
                <AddUserForm
                    modal={modal}
                    toggleModal={toggleModal}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    modalType={modalType}
                    handleCheckboxChange={handleCheckboxChange}
                    allpermissions={allpermissions}
                    typee={typee}
                // setAllPermissions={setAllPermissions}
                />
                <ConfirmationModals
                    modal={ConfirmationModal} 
                    toggle={confirmationToggle} 
                    user={deletedUser} 
                    body={`Are you sure you want to delete this user?`} 
                    header={'Delete Confirmation'} 
                    actionbtn={'Delete'}
                    handleConfirm={DeleteUser}
                />
                <ConfirmationModals
                    modal={statuschangeModal} 
                    toggle={statusToggle} 
                    user={deletedUser} 
                    body={`Are you sure you want to change status of this user?`} 
                    header={'Status Change Confirmation'} 
                    actionbtn={'Update'}
                    handleConfirm={handleStatusChange}
                    type={'status change'}
                />

                <Modal isOpen={newpassmodal} toggle={()=>{newPasstoggle();setNewPass('')}}>
                    <ModalHeader toggle={()=>{newPasstoggle();setNewPass('')}}>Generate Password</ModalHeader>
                    <ModalBody className='px-4'>
                        <InputGroup>
                            <Input
                                type={showPass ? "text" : "password"} 
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                placeholder="Enter new password"
                            />
                            <InputGroupText onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPass ? 'Hide' : 'Show'}
                            </InputGroupText>
                        </InputGroup>
                        <div className='d-flex justify-content-end w-100'>
                        <Button color="primary" onClick={generatePassword} className='mt-3'>Generate Password</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {newPass==''?'':
                        <Button color="primary" onClick={()=>{newPasstoggle();setNewPass('')}} className='mx-2'>Save</Button>
                        }
                        <Button color="dark" onClick={()=>{newPasstoggle();setNewPass('')}} className='mx-2'>Close</Button>
                    </ModalFooter>
                </Modal>
                </>}
            </Container>
        </>
    );
};

function FilterButton({ filters, firstOption, OnChange, inputChangeText }) {
    return <Input
        className='form-control rounded-3'
        type='select'
        name='role'
        id='role'
        style={{ width: '143px', fontSize: '15px', height: '47px' }}
        // value={formData.role}
        onChange={(e) => OnChange(e, inputChangeText)}
    >
        <option value='' >{firstOption}</option>
        {filters.map((item, i) => (
            <option key={i} value={item} >{item} {console.log('itemmm', item)}</option>
        ))}
    </Input>
 



}
export default ItDashboard;


