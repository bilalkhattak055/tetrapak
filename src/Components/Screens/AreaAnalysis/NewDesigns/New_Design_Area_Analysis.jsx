import React,{useState,useEffect} from 'react'
import {   Row, Col, Container,  } from "reactstrap";
import SubareaCard from './Area_Analysis_Components/Area_Analysis_Card'
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { errorToast,getWeek } from '../../../../_helper/helper';
import AreaService from '../../../../api/areaService';
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
 
const New_Design_Area_Analysis =()=> {
  const currentWeekk = getCurrentWeekWithYear();
  const [loader, setloader] = useState(true);
  const [allData, setAllData] = useState([]);
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  
  const [areaData, setareaData] = useState([]);
 
  useEffect(() => {
    const payload = {
      // safety_area: area_id ? [area_id] : filters.areas ,
      // shift: filters.shifts ,
      // start_date: filters.starting!=='' ? formatDate(filters.starting) : filters.date=='' ? '' : formatDate(filters.date),
      // end_date: filters.ending!=='' ? formatDate(filters.ending) : filters.date=='' ? '' : formatDate(filters.date),
      week: currentWeekk,
      factory_id:factoryID,
      user_id:JSON.parse(localStorage.getItem('userData'))?.id
    };
    getAiReportsCardsFunc(payload);
  }, []); 

  async function getAiReportsCardsFunc(payload) {
    setloader(true); 
    try{
     const res = await AreaService.getAiReportsCards(payload); 
     console.log(res.data)
    setAllData(res.data); 
    setloader(false); 
  } catch (error) {
    console.log(error);
    errorToast('Erroe while fetching areas')
  }
  }
  return (
    <div> 
      <br />
     <Container fluid={true}> 
      <h4 className="mb-4">Area Owner Analysis</h4>
      {loader?<Loader1/>: 
     <Row> 
        {allData.map((owner, index) => (
          <Col
            sm="6"
            md="4"
            lg="3" 
            key={index}
            >
            <SubareaCard
              name={owner.AreaOwner}
              percentage={owner.AreaCompliance?.toFixed(0)}
              cameras={owner.Cameras}
              area={owner.AreaName}
              items={owner} 
              allDataa={owner}
            />
          </Col>
        ))}
      </Row>
}
     </Container>
    </div>
  )
}

export default New_Design_Area_Analysis;
