import React, { useRef, useState } from "react";
import SubAreaContext from "./SubAreaContext";  // Ensure you import the correct context file

const SubAreaProvider = (props) => {
  const [subAreaFiltersContext, setSubAreaFiltersContext] = useState()
  const [subAreaDetails, setSubAreaDetails] = useState([])



    

    return (
        <SubAreaContext.Provider
            value={{
                subAreaFiltersContext,
                setSubAreaFiltersContext,
                subAreaDetails,
                setSubAreaDetails
              
            }}
        >
            {props.children}
        </SubAreaContext.Provider>
    );
};

export default SubAreaProvider;
