import React, { useContext, useRef, useState } from "react";
import liveAnalyticContext from "./LiveAnalytics";  // Ensure you import the correct context file

const LiveAnalyticProvider = (props) => {
    const [dashfiltercontext, setdashfiltercontext] = useState()
    const [overAllComplaince, setOverAllComplaince] = useState(); 
    const [progressContext, setProgressContext] = useState([]); 
    const [aiAccuracyContext, setAiAccuracyContext] = useState(0); 
    const [cameraCountContext, setCameraCountContext] = useState(0); 
    const [highestAlerts, setHighestAlerts] = useState(0); 
    const [highSeverityContext, sethighSeverityContext] = useState(0); 
    const [heatdatacontext, setheatdatacontext] = useState()
    const [alerttrenddatacontext, setalerttrenddatacontext] = useState()
    const heatmapcontext = useRef()
    const alerttrendcontext = useRef()

//camera status page
    const [totalcamerascontext, settotalcamerascontext] = useState(undefined)
    const [livecamerascontext, setlivecamerascontext] = useState(undefined)
    const [inactivecamerascontext, setinactivecamerascontext] = useState(undefined)
    const [camerasdatacontext, setcamerasdatacontext] = useState([])
    const [camerafilterscontext, setcamerafilterscontext] = useState(undefined)    
    //leaderboard
    const [filteredleaderscontext, setfilteredleaderscontext] = useState([])
    const [leaderscontext, setleaderscontext] = useState([])
    const [filtertablecontext, setfiltertablecontext] = useState([])
    const [filteredtablecontext, setfilteredtablecontext] = useState([])
    const [tabledatacontext, settabledatacontext] = useState([])
    const [leaderpagefilterscontext, setleaderpagefilterscontext] = useState({})

    //techqa
    const techComplianceRef = useRef()
    const accuracyRef = useRef()
    const [techQaContext, setTechQaContext] = useState({
        techComplianceRef: techComplianceRef,
        accuracyRef: accuracyRef,
        complianceData: [],
        aiAccuracy: 0

    })



    

    return (
        <liveAnalyticContext.Provider
            value={{
                overAllComplaince,
                setOverAllComplaince,
                progressContext,
                setProgressContext,
                aiAccuracyContext,
                setAiAccuracyContext,
                cameraCountContext,
                setCameraCountContext,
                highestAlerts,
                setHighestAlerts,
                highSeverityContext,
                sethighSeverityContext,
                heatmapcontext,
                alerttrendcontext,
                heatdatacontext,
                setheatdatacontext,
                alerttrenddatacontext,
                dashfiltercontext,
                setdashfiltercontext,
                setalerttrenddatacontext,
                totalcamerascontext,
                settotalcamerascontext,
                livecamerascontext,
                setlivecamerascontext,
                inactivecamerascontext,
                setinactivecamerascontext,
                camerasdatacontext,
                setcamerasdatacontext,
                filteredleaderscontext,
                setfilteredleaderscontext,
                filtertablecontext,
                setfiltertablecontext,
                filteredtablecontext,
                setfilteredtablecontext,
                tabledatacontext,
                settabledatacontext,
                leaderscontext,
                setleaderscontext,
                leaderpagefilterscontext,
                setleaderpagefilterscontext,
                camerafilterscontext,
                setcamerafilterscontext,
                techQaContext,
                setTechQaContext
                
              
            }}
        >
            {props.children}
        </liveAnalyticContext.Provider>
    );
};

export default LiveAnalyticProvider;
