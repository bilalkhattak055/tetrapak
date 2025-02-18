import React, { Fragment, useContext, useState } from 'react'
import { Container } from 'reactstrap'
import HeadingAndSearch from '../../../Common/headingAndSearch'
import { UsersText, UserText } from '../../../../Constant'
import UserList from '../../../Tables/DataTable/Index'
import { dummytabledata, tableColumns } from '../../../../Data/Table/Defaultdata'
import PopupStateContext from '../../../../_helper/popupState'


const Index = () => {

  const {setAddUser} = useContext(PopupStateContext)
  const [searchValue, setSeachValue] = useState('')
  const data = dummytabledata
  const [users, setUsers] = useState(data)
  const [fiterUser, setFilerUser] = useState()
  const [deleted, setDeleted] = useState()


  const searchChange=(e)=> {
    const value = e.target.value;
    console.log(users)
    const filter = users.filter((user)=> (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
      // user.role.toLowerCase().includes(searchValue)
    ))
    setFilerUser(filter)
  }

  const handleDelete=(id)=> {
    const newData = dummytabledata.filter((item)=> item.id !== id)
    console.log(newData)
    setUsers(newData)
  }


  console.log("users", users)


  console.log("fiterUser", fiterUser)
  return (
    <Fragment>
      <Container className="dashboard-first-page" fluid={true}>
        <section className="">
          <HeadingAndSearch title={UserText} setAdd={setAddUser} fiterUser={fiterUser} setFilerUser={setFilerUser} searchValue={searchValue} setSeachValue={setSeachValue} searchChange={searchChange} />
          {/* title={ITSupport} setAdd={setAddUser} fiterUser={fiterUser} setFilerUser={setFilerUser} searchValue={searchValue} setSeachValue={setSeachValue} searchChange={searchChange} */}
        </section>


        <section className="data-table">
          <UserList title={UsersText} dummytabledata={fiterUser ? fiterUser : users} tableColumns={tableColumns} handleDelete={handleDelete} />
        </section>
      </Container>
    </Fragment>
  )
}

export default Index;
