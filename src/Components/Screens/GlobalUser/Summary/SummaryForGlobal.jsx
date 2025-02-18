import React, { useState, useEffect } from 'react' 
import LiveAnalyticsScreen from '../LiveAnalytics/live_analytics';
import FactoryService from '../../../../api/factoryService';
import  Loader3  from '../../../../CommonElements/Spinner/loader';

export default function SummaryForGlobal() { 
   const [factoryIDS, setfactoryIDS] = useState(null);
   const [loading, setloading] = useState(true)
 const fetchAllFactories=async()=>{
   try {
    const resp=await FactoryService.getAllFactories();
    const icf = resp.data.data.find(item=>item.name=='ICF')?.factory_id
    const ryk = resp.data.data.find(item=>item.name=='RYK')?.factory_id
    setfactoryIDS({
        ...factoryIDS,
        icf:icf ,
        ryk:ryk 
    }) 
    console.log(icf,ryk,'all factories after');
    setloading(false)
   } catch (error) {
    console.log(error)
   }
 }
useEffect(() => {
    fetchAllFactories()
}, []) 
    return (
        <div>  {loading?<div className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'100%'}}>
            <Loader3/>
        </div>:<>
                <LiveAnalyticsScreen  GlobalSummaryFlag={true} GlobalHeading={true} FactoryID={factoryIDS?.icf} GlobalSubHeading={'ICF factory'} /> 
                <LiveAnalyticsScreen  GlobalSummaryFlag={true} GlobalHeading={false} FactoryID={factoryIDS?.ryk} GlobalSubHeading={'RYK factory'} /> 
        </>}
        </div>
    )
}
