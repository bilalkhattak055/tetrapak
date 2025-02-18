import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, Col, Row, Input } from 'reactstrap';
import search from '../../../../../assets/SuperAdminIcons/Search.png';
import ItDataTable from '../Components/Table/ItDataTable';
import { Link, useNavigate } from 'react-router-dom';
import { H3, H4 } from '../../../../../AbstractElements';
import DetailsButton from '../../../../Common/newButton/index'
import SearchInput from '../../../../Common/Search Input/searchInput'
import '../Styling/itStyle.css'
import itService from '../../../../../api/itService';
import { errorToast } from '../../../../../_helper/helper';
import Loader from '../../../../../CommonElements/Spinner/loader'
import { formatAccumulatedTime } from '../../../../../utils/ms';
const ItLogs = () => {

    const Navigate = useNavigate()
    const [filters, setFilters] = useState({
        creator: '',
        status: ''
    })

    const tableData = [
        {
            logID: 12,
            active: 'Active',
            createdBy: 'Super Admin',
            userName: "John Doe",
            userEmail: "john.doe@example.com",
            userRole: "IT Officer",
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
            accumulatedTime: '10 min',
            loginTime: 'last active 1 day ago',
            logoutTime: '2mins'
        },
        // {
        //     id: 27,
        //     status: 'Active',
        //     createdBy: 'It Officer',
        //     name: "Jane Smith",
        //     email: "jane.smith@example.com",
        //     Phone: "+92313778899",
        //     role: 'factory',
        //     date: "2024-08-02",
        //     action: "Pending",
        //     permissions: [
        //         { name: 'ITOfficer', isActive: false },
        //         { name: 'factory', isActive: true },
        //         { name: 'Factory', isActive: true },
        //         { name: 'Area', isActive: false },
        //         { name: 'TechQA', isActive: false }
        //     ],
        //     LockoutDuration: '5 min',
        //     LockoutTime: 'last active 3 hours ago',
        // },
        // {
        //     id: 30,
        //     status: 'Inactive',
        //     createdBy: 'It Officer',
        //     name: "Michael Johnson",
        //     email: "michael.johnson@example.com",
        //     Phone: "+92313778899",
        //     role: "Factory",
        //     date: "2024-08-03",
        //     action: "Rejected",
        //     permissions: [
        //         { name: 'ITOfficer', isActive: true },
        //         { name: 'factory', isActive: true },
        //         { name: 'Factory', isActive: true },
        //         { name: 'Area', isActive: false },
        //         { name: 'TechQA', isActive: true }
        //     ],
        //     LockoutDuration: '23 min',
        //     LockoutTime: 'last active 3 day ago',
        // },

    ]
    const navigateClick =(row)=> {
        const userRolee = JSON.parse(localStorage.getItem('role'))
        Navigate(`${process.env.PUBLIC_URL}/dashboard/Detaillogs/${userRolee}`, {state: {logs: row}})
    }
    const tableColumns = [
        {
            name: 'ID',
            selector: row => row.logID,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.userEmail,
            // sortable: true,
        },
        // {
        //     name: 'Created By',
        //     selector: row => row.createdBy,
        // },
        // {
        //     name: 'Status',
        //     selector: row => row.active,
        // },
        {
            name: 'Login Time',
            selector: row => row.loginTime,
            // sortable: true,
        },
        {
            name: 'Logout Time',
            selector: row => row.logoutTime,
        },
        {
            name: 'Login Duration',
            selector: row => row.accumulatedTime,
            // sortable: true,
        },
        {
            name: 'Details',
            cell: row => (
                <div className='m-1' 
                onClick={()=> navigateClick(row)}
                // to={{
                //    pathname: `${process.env.PUBLIC_URL}/dashboard/Detaillogs/it-officer`,
                //    state: {logs: row}
                // }}
                >
                      {  console.log('rowbb', row)}
                    <DetailsButton btnText='Details' />
                </div>
            ),
            // sortable: true,
        },
    ]
    const [showDetails, setshowDetails] = useState(false)
    const [tableDataa, setTableData] = useState(tableData)
    const handleDetails = () => {
        setshowDetails(!showDetails);
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(undefined);
    const [logsLoader, setLogsLoader] = useState(false)
    useEffect(() => {
        setLogsLoader(true)
        getAllLogs()
    }, [])
    const handleSearch = (e) => {
        // const value = e.target.value.toLowerCase();
        // setSearchTerm(value);

        const value = e.target.value.trim().toLowerCase();
        if (!e.target.value.trim()) {
            filterDataa(filters);  // Reapply the button filters when search input is cleared
            return;
        }

        const filterVar = filteredData ? filteredData : tableDataa

        const filtered = filterVar.filter(item =>
            item.userName.toLowerCase().includes(value) ||
            item.userEmail.toLowerCase().includes(value) ||
            item.userRole.toLowerCase().includes(value) ||
            item.active.toLowerCase().includes(value)
            // item.createdBy.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
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
        let filteredData = tableDataa;
        if (currentFilters.creator) {
            filteredData = filteredData.filter((item) => item.createdBy === currentFilters.creator);
        }
        if (currentFilters.status) {
            filteredData = filteredData.filter((item) => item.status === currentFilters.status);
        }

        setFilteredData(filteredData);
    };


    
    const getAllLogs = async () => {
        try {
            const res = await itService.getLogs()
            if (res.status === 200) {
                const logs = res?.data?.data;
                console.log('logsss', logs)
                const updated = logs.map((l) => ({
                    ...l,
                    active: l.active ? l.active = 'Active' : l.active = 'In Active',
                    accumulatedTime: formatAccumulatedTime(l.accumulatedTime)

                }))
                setTableData(updated)
            } else {
                errorToast('error occured during fetching logs')
            }
            setLogsLoader(false)
        } catch (err) {
            console.log('err', err)
            errorToast(err.message)
            setLogsLoader(false)
        }


    }

    const creaters = tableDataa && [...new Set(tableDataa.map((item) => item.createdBy))]
    const statuses = tableDataa && [...new Set(tableDataa.map((item) => item.status))]
    return (
        <div>

            <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>
                <div>
                    <H4>
                        User Logs
                    </H4>
                    {logsLoader ? <><Loader /></> : (<><Row className='d-flex justify-content-between mb-3'>
                        <Col xl='6' md='5' xs='12'>
                            {/* <Card className='shadow-none'>
                                <CardBody className='d-flex justify-content-start align-content-center' style={{ padding: '12px 12px 12px 20px' }}>
                                    <img src={search} alt="search icon" style={{ width: '16px', height: '16px', marginRight: '15px', marginTop: '2px' }} />
                                    <input
                                        type="text"
                                        placeholder='Search '
                                        onChange={handleSearch}
                                        style={{ width: '100%', border: '0px', fontSize: '16px', padding: '0px', margin: '0px' }}

                                    />
                                </CardBody>
                            </Card> */}
                            <SearchInput onchange={handleSearch} />
                        </Col>
                        <Col xl='6' md='7 mt-0' xs='12' sm='mt-2' className='d-flex justify-content-end gap-1 filtersbtnforitlogs'>
                            {/* <FilterButton filters={creaters} firstOption='Creator Filter' OnChange={handleFilterChange} inputChangeText={'creator'} /> */}
                            {/* <FilterButton filters={statuses} firstOption='Status Filter' OnChange={handleFilterChange} inputChangeText={'status'} /> */}

                        </Col>

                    </Row>
                        <ItDataTable
                            tableColumns={tableColumns}
                            staticData={filteredData ? filteredData : tableDataa}
                        /></>)}
                </div>



            </Container>
        </div>
    );
}

function FilterButton({ filters, firstOption, OnChange, inputChangeText }) {
    return <Input
        className='form-control rounded-3'
        type='select'
        name='role'
        id='role'
        style={{ width: '145px', fontSize: '15px', height: '47px' }}
        // value={formData.role}
        onChange={(e) => OnChange(e, inputChangeText)}
    >
        <option value=''>{firstOption}</option>
        {filters.map((item, i) => (
            <option key={i} value={item}>{item}</option>
        ))}
    </Input>



}

export default ItLogs;
