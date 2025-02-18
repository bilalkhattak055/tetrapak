import React, { useRef, useState } from "react";
import AreaAnalysisContext from "./AreaAnalysisContext";  // Ensure you import the correct context file

const AreaAnalysisProvider = (props) => {
  const [areaFiltersContext, setAreaFiltersContext] = useState()
  const [areaDetails, setAreaDetails] = useState([])



    

    return (
        <AreaAnalysisContext.Provider
            value={{
                areaFiltersContext,
                setAreaFiltersContext,
              areaDetails,
              setAreaDetails
              
            }}
        >
            {props.children}
        </AreaAnalysisContext.Provider>
    );
};

export default AreaAnalysisProvider;
