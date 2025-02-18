import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import HeadingAndSearch from "../../../Common/headingAndSearch";
import { UsersText, UserText } from "../../../../Constant";
import UserList from "../../../Tables/DataTable/Index";
import {
  dummytabledata,
  tableColumns,
} from "../../../../Data/Table/Defaultdata";
import PopupStateContext from "../../../../_helper/popupState";
import {
  applyDynamicFilters,
  createRoleFilter,
  createSearchFilter,
  dateFilter,
} from "../../../../utils/dynamicFilter";
import InputAndButtonSearch from "../../../Common/InputAndButtonSearch/InputAndButtonSearch";

const Index = () => {
  const { setAddUser } = useContext(PopupStateContext);
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);
  const [filterData, setfilteredData] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [dateValue, setDateValue] = useState(undefined)
  const searchPlaceHolder = "Search by name, email and role...";
  const roles = dummytabledata && [
    ...new Set(
      dummytabledata.map((data) => data.role).map((el) => el.props.btnText)
    ),
  ];


  // Function to update filters dynamically
  const applyFilters = () => {
    const data = dummytabledata
    const filters = [
      createRoleFilter(roleValue), // Apply role filter
      dateFilter(dateValue),
      createSearchFilter(searchValue, ["name", "email", "role"]), 
      
     
    ];

    const filtered = applyDynamicFilters(data, filters);
    setfilteredData(filtered);
  };

  // Handle search input change
  const searchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); 
  };

  // Handle role selection change
  const handleInputChange = (e, key) => {

    if(key === 'date') {
      setDateValue(e.target.value)
    }
    if(key==='role'){
      setRoleValue(e.target.value.trim().toLowerCase()); 
    }
  };


  useEffect(() => {
    applyFilters(); 
  }, [searchValue, roleValue, dateValue]);

  return (
    <Fragment>
      {/* <Container className="dashboard-first-page" fluid={true}> */}
      <Container   fluid={true}>
        <section className="">
          <InputAndButtonSearch
            handleInputChange={handleInputChange}
            searchChange={searchChange}
            searchPlaceHolder={searchPlaceHolder}
            role={role}
            roles={roles}
          />
        </section>
        

        <section className="data-table">
          <UserList
            title={UsersText}
            dummytabledata={filterData ? filterData : dummytabledata}
            tableColumns={tableColumns}
          />
        </section>
      </Container>
    </Fragment>
  );
};

export default Index;
