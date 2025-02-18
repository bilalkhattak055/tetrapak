import React, { useRef, useState } from "react";
import TargetControlContext from "./TargetControlContext";  // Ensure you import the correct context file

const TargetControlProvider = (props) => {
  const [targetFiltersContext, setTargetFiltersContext] = useState()
  const [targetDetailsContext, setTargetDetailsContext] = useState([])
  const [compliancechartcontext, setcompliancechartcontext] = useState([])
  const [alertchartcontext, setalertchartcontext] = useState([])
  const complianceRef = useRef()
  const alertRef = useRef()



    

    return (
        <TargetControlContext.Provider
            value={{
                targetFiltersContext,
                setTargetFiltersContext,
                targetDetailsContext,
                setTargetDetailsContext,
                complianceRef,
                alertRef,
                compliancechartcontext,
                setcompliancechartcontext,
                alertchartcontext,
                setalertchartcontext
              
            }}
        >
            {props.children}
        </TargetControlContext.Provider>
    );
};

export default TargetControlProvider;
