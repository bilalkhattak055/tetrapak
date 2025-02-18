import React,{useState,useEffect} from 'react'
import { Container,Row,Col } from 'reactstrap'
import Loader1 from "../../../../CommonElements/Spinner/loader";
import { errorToast,getWeek } from '../../../../_helper/helper';
import AreaService from '../../../../api/areaService';
import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
import SubareaCardd from './Subare_Analysis_Component/SubareaCard'
import TextFormatcheck from '../../../../CommonFunctions/TextFormatCheck'
import CommonHeading from '../../../Common/commonHeading/CommonHeading';
export default function NewSubareaAnalysis() { 
    const dummy=[
      {
        "areaName": "MOULDING  ",
        "areaOwner": "Mr. Fida Khan Shareef ",
        "totalCameras": 7,
        "subareaName": "MOULDING DEPART ",
        "alerts": 53,
        "calculated": "100",    
        "compliance": "87",
        "Modules": [
            "Person Available Alert",
            'Grouping',
            'Supervisor Presence',
            'Machine Guard'
        ]
    },
    {
      "areaName": "STORE   ",
      "areaOwner": " Kashif, Usman  ",
      "totalCameras": 6,
      "subareaName": "LOCAL STORE ",
      "alerts": 72,
      "calculated": "100",
      "compliance": "70",
      "Modules": [
        "Person Available Alert",
        'Grouping',
        'Supervisor Presence',
        'Machine Guard'
    ]
  },
  {
    "areaName": "Ali Pump   ",
    "areaOwner": "Qaiser",
    "totalCameras": 15,
    "subareaName": "Ali Pump Doubling ",
    "alerts": 10,
    "calculated": "100",
    "compliance": "95",
    "Modules": [
        "Person Available Alert",
        'Grouping',
        'Supervisor Presence',
        'Machine Guard'
    ]
},
    ]
  return (
    <div>
        <br />
        <Container fluid={true}>
          <CommonHeading text={'Sub Area Analysis'}/>
        <Row >
                {dummy.map((owner, index) => (
                    <Col
                        sm="12"
                        md="6"
                        xxl='4'
                        xl='6'
                        key={index}
                        >
                        <SubareaCardd
                            percentage={owner.compliance}
                            cameras={owner.totalCameras}
                            areaname={TextFormatcheck(owner.areaName)}
                            areamanager={owner.areaOwner}
                            maintitle={TextFormatcheck(owner.subareaName)} 
                            alerts={owner.alerts}
                            // alertstat={owner.alertstat}
                            moduleLabel={owner.Modules}
                            moduleBackgroundColor={owner.moduleBackgroundColor}
                            moduleFontColor={owner.moduleFontColor}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}

