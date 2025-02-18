import React, { Fragment, useContext ,useState,useEffect} from "react";
import "./itSupport.css";
import { Container } from "reactstrap";
import HeadingAndSearch from "../../../Common/headingAndSearch";
import { ITSupport, MembersList } from "../../../../Constant";
import MemberList from '../../../Tables/DataTable/Index'
import { dummytabledata, tableColumns } from "../../../../Data/Table/Defaultdata";
import PopupStateContext from "../../../../_helper/popupState";
import TableActions from '../../../Common/TableActions/Index' 
import { Trash2, Edit3 } from 'react-feather'

const Index = () => {
  const {setAddUser} = useContext(PopupStateContext) 
  const [search, setsearch] = useState([])
  const [AllData, setAllData] = useState(dummytabledata)
  const [Columns, setColumns] = useState(tableColumns)
      const searchChange=(e)=>{
        e.preventDefault();
        const {name,value} = e.target; 
        const filtering = dummytabledata.filter((item) => {
          const normalizedItemName = item.name.toLowerCase();
          const normalizedItemID = String(item.id).toLowerCase();
          const normalizedItemRole = item.date.toLowerCase();
          const normalizedItemEmail = item.email.toLowerCase();
          return normalizedItemName.includes(value) || normalizedItemID.includes(value) || 
                normalizedItemRole.includes(value) || normalizedItemEmail.includes(value)
      });
      setsearch(filtering)
      console.log(search)
    }
 
    
  return (
    <Fragment>
      <Container className="dashboard-first-page" fluid={true}>
        <section className="">
          <HeadingAndSearch title={ITSupport} setAdd={setAddUser} searchChange={searchChange} />
        </section>

        <section className="data-table">
          <MemberList title={MembersList} dummytabledata={search.length >0? search : AllData }
           tableColumns={tableColumns}   />
        </section>
      </Container>
    </Fragment>
  );
};

export default Index;
