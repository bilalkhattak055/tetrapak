import React, { useEffect, useState, useRef } from "react";
import AlertCountsChart from "../Target and Controal V2/Component/AlertCount";
import ComplianceTargetsChart from "../Target and Controal V2/Component/ComplianceTarget";
import ReProcessChart from "./Components/Reprocess";
import ModelAnalyticsHeader from "../CameraConfigurationV2/Components/ModelAnalytics";
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';
import { Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import tetraPakGraphService from "../../../../api/TetraPakGraphService";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import download from './asset/download.svg'
import UserTable from "./Components/ActionTable";

const Inspection = () => {
    const [reelsData, setReelsData] = useState({});
    const [reprocessData, setReprocessData] = useState({});
    const [wrongMatchData, setWrongMatchData] = useState({});
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [userID, setUserId]=useState("");
    const [userName, setUserName]=useState("");
    const [userEmail, setEmail]=useState("");
    const [userBypass, setBypass]=useState("");
    const [userReprocess, setReprocess]=useState("");
    const [userWrongMatch,setWrongMatch]=useState("");
    const userid = JSON.parse(localStorage.getItem('userId'));
    console.log("client id is coming:",userid)
  

    const pageRef = useRef(null);
    const [activeFilters, setActiveFilters] = useState({
        week: new Date().getFullYear() + "-W" + String(getWeekNumber()).padStart(2, "0"),
        month: "",
        customStartDate: "",
        filter: "week"
    });
    
    // Get current week number
    function getWeekNumber() {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const dayOfWeek = oneJan.getDay();
        const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
        const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
        return Math.ceil((daysSinceFirstMonday + 1) / 7);
    }

    // Handle filter changes from ModelAnalyticsHeader
    const handleFilterAccept = (filterPayload) => {
        const newActiveFilters = {
            week: filterPayload.week || "",
            month: filterPayload.month || "",
            customStartDate: filterPayload.customStartDate || "",
            filter: filterPayload.filter || "week"
        };
        
        setActiveFilters(newActiveFilters);
        fetchData(newActiveFilters);
    };

    // Reset filters to default (current week)
    const handleFilterReset = () => {
        const defaultFilters = {
            week: new Date().getFullYear() + "-W" + String(getWeekNumber()).padStart(2, "0"),
            month: "",
            customStartDate: "",
            filter: "week"
        };
        
        setActiveFilters(defaultFilters);
        fetchData(defaultFilters);
    };

    // Prepare API payload based on active filters
    const preparePayload = (filters) => {
        const payload = {
            filters: {
                date: "",
                week: "",
                month: "",
                starting: "",
                ending: "",
                shift: ""
            },
            factory_id: 1,
            client_id:userid
        };

        // Only pass one filter type at a time
        if (filters.filter === "week" && filters.week) {
            payload.filters.week = filters.week;
        } else if (filters.filter === "month" && filters.month) {
            payload.filters.month = filters.month;
        } else if (filters.filter === "daily" && filters.customStartDate) {
            payload.filters.date = filters.customStartDate;
        }

        return payload;
    };

    // Fetch data from APIs
    const fetchData = (filters) => {
        const payload = preparePayload(filters);
        
        setLoading(true);
        const reelApi = tetraPakGraphService.getAllReels(payload);
        const reprocessApi = tetraPakGraphService.getReprocessCount(payload);
        const wrongMatchApi = tetraPakGraphService.getWrongCount(payload);
        const userActionDetail=tetraPakGraphService.getUserActionDetails(payload);
    
        Promise.all([reelApi, reprocessApi, wrongMatchApi,userActionDetail])
            .then(([reelsRes, reprocessRes, wrongMatchRes,userActionRes]) => {
                if (reelsRes.data && reelsRes.data.success) {
                    setReelsData(reelsRes.data.data);
                }
                if(reprocessRes.data && reprocessRes.data.success) {
                    setReprocessData(reprocessRes.data.data);
                }
                if(wrongMatchRes.data && wrongMatchRes.data.success) {
                    setWrongMatchData(wrongMatchRes.data.data);
                }
                if(userActionRes.data && userActionRes.data.success){
                     const user = userActionRes.data.data[0];
                    setUserId(user.user_id)
                    setUserName(user.user_name)
                    setEmail(user.user_email)
                    setReprocess(user.sticker_reprocess)
                    setBypass(user.bypass)
                    setWrongMatch(user.total_wrong_mismatch)
                    
                }
                console.log("userid",userID)
                setLoading(false);
            })
            .catch((error) => {
                console.error("API error:", error);
                setLoading(false);
            });
    };
    
    // Format active filter for display
    const getActiveFilterDisplay = () => {
        if (activeFilters.filter === "week" && activeFilters.week) {
            return `Week: ${activeFilters.week}`;
        } else if (activeFilters.filter === "month" && activeFilters.month) {
            const date = new Date(activeFilters.month);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `Month: ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        } else if (activeFilters.filter === "daily" && activeFilters.customStartDate) {
            const date = new Date(activeFilters.customStartDate);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `Date: ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }
        return null;
    };
    
    // Export charts to PDF
    const exportToPDF = async () => {
        try {
            setExporting(true);
            
            // Wait for any loading to complete
            if (loading) {
                await new Promise(resolve => {
                    const checkLoading = setInterval(() => {
                        if (!loading) {
                            clearInterval(checkLoading);
                            resolve();
                        }
                    }, 500);
                });
            }
            
            // Wait a moment for charts to finish rendering
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            
            // Add title
            pdf.setFontSize(16);
            pdf.text("AI Based Reels Inspection System Report", pageWidth / 2, margin, { align: 'center' });
            
            // Add date
            const today = new Date();
            pdf.setFontSize(8);
            pdf.text(`(Generated: ${today.toLocaleDateString()})`, pageWidth - margin, margin, { align: 'right' });
            
            // Add filter information
            const filterDisplay = getActiveFilterDisplay();
            if (filterDisplay) {
                pdf.text(`Filter: ${filterDisplay}`, margin, margin + 8);
            }
            
            let yPosition = margin + 15;
            
            // Find all chart components
            const chartElements = pageRef.current.querySelectorAll('.apexcharts-canvas, .Tabledpt');
            
            // Process each chart
            for (let i = 0; i < chartElements.length; i++) {
                const chart = chartElements[i];
                
                // Find chart title by looking at nearby headings
                let chartTitle = "Chart " + (i + 1);
                const parentCard = chart.closest('.card');
                if (parentCard) {
                    const heading = parentCard.querySelector('.card-title, h5, h4, h3');
                    if (heading) {
                        chartTitle = heading.textContent.trim();
                    }
                }
                
                const canvas = await html2canvas(chart, {
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });
                
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate dimensions
                const imgWidth = pageWidth - (margin * 2);
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Check if we need a new page
                if (yPosition + imgHeight + 10 > pageHeight) {
                    pdf.addPage();
                    yPosition = margin;
                }
                
                // Add chart title
                pdf.setFontSize(12);
                pdf.text(chartTitle, margin, yPosition);
                yPosition += 7;
                
                // Add chart image
                pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
                yPosition += imgHeight + 15;
            }
            
            // Save the PDF
            pdf.save('TetraPak Inspection Report.pdf');
            
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setExporting(false);
        }
    };
    
    // Initial data fetch on component mount
    useEffect(() => {
        fetchData(activeFilters);
    }, []);
    
    return (
        <WeekFilterProvider>
            <div ref={pageRef}>
                <Row className="pt-3">
                    <ModelAnalyticsHeader
                        heading={`AI Based Reels Inspection System`}
                        hideWeekText={true}
                        currentWeek={false}
                        shifts={false}
                        multiShift={false}
                        months={false}
                        modules={false}
                        severity={false}
                        timeFilterOption={true}
                        areas={false}
                        showActions={true}
                        onAccept={handleFilterAccept}
                        onReset={handleFilterReset}
                    />
                    
                    {/* Active Filter Display */}
                    <div className=" mb-1" style={{display:"flex",justifyContent:"space-between"}}>
                    {getActiveFilterDisplay() && (
                        <div>
                            <Badge 
                                pill 
                                bg="primary" 
                                style={{ 
                                    backgroundColor: "#023F88", 
                                    fontSize: "16px", 
                                    padding: "10px 15px" 
                                }}
                            >
                             Active Filter-{getActiveFilterDisplay()}
                            </Badge>
                        </div>
                    )}
                     <Button 
                        variant="primary" 
                        onClick={exportToPDF} 
                        disabled={loading || exporting}
                        style={{ backgroundColor: "#023F88" }}
                    >
                    {exporting ? (
                            <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                Downloading...
                            </>
                        ) : (
                            <div className="shadow-md" style={{display:"flex",gap:"8px",fontSize:"16px",borderRadius:"10px"}}>
                                <img src={download} alt="download pdf"/>
                                Download Report
                            </div>
                        )}
                    </Button>
                    </div>
                    <Col md={6} lg={7}>
                        <div className="p-2">
                            <ComplianceTargetsChart data={reelsData} loading={loading} />
                        </div>
                    </Col>
                    <Col md={6} lg={5} >
                        <div className="p-2">
                            <AlertCountsChart data={wrongMatchData} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="p-3">
                        <ReProcessChart data={reprocessData} loading={loading} />
                    </div>
                </Row>
                <Row>
                    <UserTable
                    id={userID}
                    username={userName}
                    email={userEmail}
                    bypass={userBypass}
                    reprocess={userReprocess}
                    WrongCount={userWrongMatch}
                    />
                </Row>
            </div>
        </WeekFilterProvider>
    );
}

export default Inspection;