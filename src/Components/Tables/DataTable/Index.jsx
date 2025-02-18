import React, { Fragment,useEffect,useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from './DataTableComponent';
import './table.css'

const DataTables = ({title, noCardHeader, dummytabledata, tableColumns}) => {
  const [dataa, setdataa] = useState(dummytabledata)
 console.log(dummytabledata,'child component')
  const handleRowClick=(e)=>{
    console.log('hello row',e)
  }
  const handleDelete=(e)=>{ 
    const deleteRow=dataa.filter((pointer)=>{
      console.log(e.id,pointer.id)
      return e.id != pointer.id
    }) 
    setdataa(deleteRow)
  }
  useEffect(() => {
     setdataa(dummytabledata)
  }, [dummytabledata])
  

  return (
    <Fragment>
      {/* <Breadcrumbs parent="Table" title="Data Tables" mainTitle="Data Tables" /> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Card>
              {noCardHeader ? <></> : <HeaderCard title={title} />}
              <CardBody className='card-body-table'>
                <DataTableComponent dummytabledata={dataa} 
                tableColumns={tableColumns} handleDelete={handleDelete}  handleRowClick={handleRowClick} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default DataTables;
