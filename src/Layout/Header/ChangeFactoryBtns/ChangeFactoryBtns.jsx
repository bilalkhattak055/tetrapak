import React, { Fragment, useState, useLayoutEffect, useContext, useEffect } from "react";
import { Button, ButtonGroup } from "reactstrap";
import FactoryService from "../../../api/factoryService";
import { errorToast, infoToast, showConfirmationAlert, successToast } from "../../../_helper/helper";
import '../../Sidebar/side.css'
export default function ChangeFactoryBtns() {
    const [activeButton, setActiveButton] = useState("ICF");
    const [selectedFactory, setSelectedFactory] = useState("");
    const [factoryList, setFactoryList] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));
    const fetchFactories = () => {
        FactoryService.getAllFactories()
          .then((res) => {
            setFactoryList(res.data?.data);
            const user = JSON.parse(localStorage.getItem("userData"));
            setSelectedFactory(user ?user?.factory?.id: 0) 
          })
          .catch((e) => {});
      };
      const handleFilterChangeNew = (e) => {
        // const val=parseInt(e.target.value)
       
        const selectedFactoryID= factoryList.find(item=>item.name==e);
        const val=selectedFactoryID?.factory_id  
        if(val !== 0){
        var get_user_data=JSON.parse(localStorage.getItem('userData')) 
        showConfirmationAlert("Are you sure you want to change your factory?","Yes")
        .then((result) => {
          if (result.value) {
            const payload = {
              user_id: get_user_data?.id,
              factory_id: val,
            };
            setSelectedFactory(e);
            FactoryService.updateUserFactory(payload)
              .then((res) => {
                if (res?.status === 200) {
                  successToast(res?.data?.message);
                  get_user_data.factory={ id:res?.data?.data?.factory_id, name:res?.data?.data?.factory_name}
                  localStorage.setItem('userData',JSON.stringify(get_user_data)) 
                  window.location.reload();
                  
                } else {
                  infoToast(res?.data?.message);
                }
              })
              .catch((err) => {
                if (err?.status === 404) {
                  errorToast(err?.statusText);
                } else {
                  errorToast(err?.response?.data?.message);
                }
              });
          }
        })
        .catch((error) => {});
      } 
      };
      
      useEffect(() => {
        setActiveButton(user?.factory?.name)
        fetchFactories();
      }, [])
  return (
    <div className="d-flex  justify-content-center align-items-center  "    >
    <Button
         // color='primary'  
         onClick={() => handleFilterChangeNew("ICF")}
         // outline={activeButton !== "ICF"}
         className={`${activeButton=="ICF"?'activatedFactory ':'deactivatedFactory'}`}
       >
         ICF Factory
       </Button>
       <Button
         // color='primary' 
         onClick={() => handleFilterChangeNew("RYK")}
         // outline={activeButton !== "RYK"}
         className={`${activeButton=="RYK"?'activatedFactory ':'deactivatedFactory'}`}
       >
         RYK Factory
       </Button>
   </div>
  )
}
