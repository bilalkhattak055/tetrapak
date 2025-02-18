import React, { useRef, useState } from "react";
import liveAlertContext from "./LiveAlert";  // Ensure you import the correct context file

const LiveAlertDataProvider = (props) => {
    const [liveAlertData, setLiveAlertData] = useState([]); 
    const [totalLiveAlerts, settotalLiveAlerts] = useState({
        verified:0,
        accepted:0,
        rejected:0,
        pending:0
    }); 
    const [modelandreports, setmodelandreports] = useState({
        totalAccuracy:'',
        totalAlerts:'',
        filters:'',
        summaryofAlerts:'',
        AccuracyOfAiModels:'',
        AllModulesData:'',
        AverageAccuracy:''
    })
    const [filtersContext, setFiltersContext] = useState()
    const imageRef = useRef([]);

    return (
        <liveAlertContext.Provider
            value={{
                liveAlertData,
                setLiveAlertData,
                totalLiveAlerts,
                settotalLiveAlerts,
                modelandreports,
                setmodelandreports,
                filtersContext,
                setFiltersContext,
                imageRef,
              
            }}
        >
            {props.children}
        </liveAlertContext.Provider>
    );
};

export default LiveAlertDataProvider;
