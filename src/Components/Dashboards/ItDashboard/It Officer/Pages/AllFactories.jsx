import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Col, Container, Input, Label, Media, Row } from 'reactstrap'
import deleteIcon from '../../../../../assets/SuperAdminIcons/Delete.png';
import editIcon from '../../../../../assets/SuperAdminIcons/Edit.png';
import SearchBar from '../../../../Common/Search Input/searchInput'
import { H4 } from '../../../../../AbstractElements';
import ItDataTable from '../Components/Table/ItDataTable';
import Loader from '../../../../../CommonElements/Spinner/loader'
import AddButton from '../../../../Common/newButton/index'
import FactoryService from '../../../../../api/factoryService';
import ConfirmationModals from '../Components/ConifrmationModal/Confirmation_Modal';
import { errorToast, successToast } from '../../../../../_helper/helper';


const AllFactories = () => {
  const navigate = useNavigate()
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [role, setRole] = useState(initialRole)
  const [deletedUser, setdeletedUser] = useState({});
  const [formData, setFormData] = useState({
    ID: '',
    name: '',
    email: '',
    status: true,
    createdBy: role,
  });
  const [data, setData] = useState([])
  const [dataAfterFilteration, setDataAfterFilteration] = useState(undefined)
  const [selectedRow, setSelectedRow] = useState(null);
  const [showloader, setshowloader] = useState(false);
  const [statuschangeModal, setstatuschangeModal] = useState(false);
  const statusToggle = () => setstatuschangeModal(!statuschangeModal);
  const [ConfirmationModal, setConfirmationModal] = useState(false);
  const confirmationToggle = () => setConfirmationModal(!ConfirmationModal);
  const [togStatus, setTogStatus] = useState('')

  const handlestatusreq = (row) => {
    const newRow = row;
    newRow.id = newRow.factory_id;
    console.log('newRownewRow', newRow)
    setdeletedUser(newRow)
    statusToggle();
  }
  const handleStatusChange = async (row) => {
    let act = row?.active
    console.log('rowrrr', row)

    try{
      const res = await FactoryService.changeFactoryStatus(row?.factory_id)
      if(res.status === 200) {
        if(dataAfterFilteration) {
          dataAfterFilteration?.map((d) => {
            if (d.factory_id === row.factory_id) {
              // Make a new object with the updated "active" property
              d.active = false;
            }
            return d; // Return the modified object
          });
          
          // Update the state with the modified data
          setData(data);
        }else {
          data?.map((d) => {
            if (d.factory_id === row.factory_id) {
              // Make a new object with the updated "active" property
              d.active = false;
            }
            return d; // Return the modified object
          });
          
          // Update the state with the modified data
          setData(data);
          
        }
        statusToggle();
      }else {
        errorToast(res?.message)
      }
    }catch(err) {
      errorToast(err.message)
    }
    
  };

  const handleEditClick = (row) => {
    navigate(`${process.env.PUBLIC_URL}/dashboard/add-factory/${role}`, { state: { factory: row } })
  };

  const handleAddUserClick = () => {
    navigate(`${process.env.PUBLIC_URL}/dashboard/add-factory/${JSON.parse(localStorage.getItem('role'))}`, { state: { type: 'add' } })

  };
  const handleDeleteClick = async (row) => {
    const newRow = row;
    newRow.id = newRow.factory_id;
    console.log('newRownewRow', newRow)
    setdeletedUser(newRow)
    confirmationToggle()
  };

  const filterData = (e) => {
    const normalizedSearchInput = e.target.value.trim().toLowerCase();
    console.log('this is normal', normalizedSearchInput)
    if (!e.target.value.trim()) {
      setDataAfterFilteration(data)  // Reapply the button filters when search input is cleared
      return;
    }

    const filterVar = dataAfterFilteration ? dataAfterFilteration : data

    console.log('filterVar', filterVar)


    const filtering = filterVar.filter((item) => {
      const name = item.name.toLowerCase();
      const id = String(item?.factory_id)
      // const role = item.role.toLowerCase();//////
      // const createdBy = item.createdBy.toLowerCase();
      // const status = item.status.toLowerCase();
      // const email = item.email.toLowerCase();
      return name.includes(normalizedSearchInput) || id.includes(normalizedSearchInput)
    });

    setDataAfterFilteration(filtering);
  };

  const tableColumns = [
    {
      name: 'ID',
      selector: row => row.factory_id,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at,
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
              checked={row?.active}
              onChange={() => handlestatusreq(row)}

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

  useEffect(() => {
    setshowloader(true)
    getAllFactories()
  }, [])

  async function getAllFactories() {
    const res = await FactoryService.getAllFactories()
    console.log(res, 'resss')
    setData(res?.data?.data)
    setshowloader(false)
  }
  const DeleteUser=async(row)=>{
    console.log('from final click',row);
    try {
        const res = await FactoryService.deleteFactory(row.factory_id);
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
        // errorToast('Error while deleting user');
        // confirmationToggle();
    }
      
}

  return (
    <>
      <Container fluid={true} className='' style={{ paddingTop: '30px', border: '0px solid' }}>

        {showloader ? <Loader /> : <>

          <H4>All Factories</H4>

          <Row className='d-flex justify-content-between align-items-start mb-3'>
            <Col xs='12' md='8' lg='5' xl='4'>
              <SearchBar onchange={(e) => { filterData(e) }} />
            </Col>
            <Col xl='2' lg='3' xs='12' sm='12' md='4' className='d-flex align-items-center  justify-content-xs-end justify-content-sm-end justify-content-md-end adduserbtn'>
              <AddButton btnText='Add Factory +' height={'47px'} onClick={handleAddUserClick} />
            </Col>


          </Row>
          <div >
            <ItDataTable
              tableColumns={tableColumns}
              staticData={dataAfterFilteration ? dataAfterFilteration : data}
            />
          </div>



          <ConfirmationModals
            modal={statuschangeModal}
            toggle={statusToggle}
            user={deletedUser}
            body={`Are you sure you want to change status of this Factory?`}
            header={'Status Change Confirmation'}
            actionbtn={'Update'}
            handleConfirm={handleStatusChange}
            type={'status change'}
          />
          <ConfirmationModals
            modal={ConfirmationModal}
            toggle={confirmationToggle}
            user={deletedUser}
            body={`Are you sure you want to delete this Factory?`}
            header={'Delete Confirmation'}
            actionbtn={'Delete'}
            handleConfirm={DeleteUser}
          />

        </>}
      </Container>
    </>
  )
}



export default AllFactories
