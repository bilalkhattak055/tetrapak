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
import download from './asset/download.svg';
import UserTable from "./Components/ActionTable";
import ReelsDashboard from "./Components/AllReelsData";
import PDFReportTemplate from "./PDF REPORTS/PDFREPORT";
import { generatePdfFilename, getPdfMetadata } from './pdfUtils';

const Inspection = () => {
    const [reelsData, setReelsData] = useState({});
    const [reprocessData, setReprocessData] = useState({});
    const [wrongMatchData, setWrongMatchData] = useState({});
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [userID, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userBypass, setBypass] = useState("");
    const [userReprocess, setReprocess] = useState("");
    const [userWrongMatch, setWrongMatch] = useState("");
    const userid = JSON.parse(localStorage.getItem('userId'));
    const [emailRecipients, setEmailRecipients] = useState(['Support@thedisruptlabs.com','syedsaadali432@gmail.com']); 
    const [ccemailRecipients,setccemailRecipents]=useState(['ahsan.ali@thedisruptlabs.com'])
    const pageRef = useRef(null);
    const pdfReportRef = useRef(null);
    const emailIntervalRef = useRef(null);

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
            client_id: userid
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
        const userActionDetail = tetraPakGraphService.getUserActionDetails(payload);

        Promise.all([reelApi, reprocessApi, wrongMatchApi, userActionDetail])
            .then(([reelsRes, reprocessRes, wrongMatchRes, userActionRes]) => {
                if (reelsRes.data && reelsRes.data.success) {
                    setReelsData(reelsRes.data.data);
                }
                if (reprocessRes.data && reprocessRes.data.success) {
                    setReprocessData(reprocessRes.data.data);
                }
                if (wrongMatchRes.data && wrongMatchRes.data.success) {
                    setWrongMatchData(wrongMatchRes.data.data);
                }
                if (userActionRes.data && userActionRes.data.success) {
                    const user = userActionRes.data.data[0];
                    setUserId(user.user_id)
                    setUserName(user.user_name)
                    setEmail(user.user_email)
                    setReprocess(user.sticker_reprocess)
                    setBypass(user.bypass)
                    setWrongMatch(user.total_wrong_mismatch)
                }
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

    // Generate PDF blob for email attachment
    const generatePdfBlob = async () => {
        // Wait for any loading to complete
        if (loading) {
            await new Promise(resolve => {
                const checkLoading = setInterval(() => {
                    if (!loading) {
                        clearInterval(checkLoading);
                        resolve();
                    }
                }, 200);
            });
        }

        // Small delay to ensure PDF component is fully rendered
        await new Promise(resolve => setTimeout(resolve, 300));

        // Create PDF with professional settings
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Capture the dedicated PDF component
        const canvas = await html2canvas(pdfReportRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate image dimensions to fit page properly
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = pageWidth;
        const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

        // Add image to PDF with multiple pages if needed
        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if content is longer than one page
        while (heightLeft >= 0) {
            position = position - pageHeight; // Move position for next page slice
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Add metadata to PDF
        pdf.setProperties(getPdfMetadata(getActiveFilterDisplay()));

        // Return PDF blob
        return pdf.output('blob');
    };

    // Export to PDF for download
    const exportToPDF = async () => {
        try {
            setExporting(true);

            // Create PDF with professional settings
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            // Capture the dedicated PDF component
            const canvas = await html2canvas(pdfReportRef.current, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate image dimensions to fit page properly
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = pageWidth;
            const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

            // Add image to PDF with multiple pages if needed
            let heightLeft = imgHeight;
            let position = 0;

            // First page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add additional pages if content is longer than one page
            while (heightLeft >= 0) {
                position = position - pageHeight; // Move position for next page slice
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Add metadata to PDF
            pdf.setProperties(getPdfMetadata(getActiveFilterDisplay()));

            // Save the PDF with a clear name that includes filter information and date
            pdf.save(generatePdfFilename(getActiveFilterDisplay()));

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setExporting(false);
        }
    };

    // Send email with PDF report attached
const sendEmailReport = async () => {
    try {
        // If data is still loading, wait until it's complete
        if (loading) {
            console.log("Data is still loading, waiting to send email...");
            return;
        }

        // Generate PDF blob for attachment
        const pdfBlob = await generatePdfBlob();

        // Create a File object from the blob
        const reportFile = new File(
            [pdfBlob],
            generatePdfFilename(getActiveFilterDisplay()),
            { type: 'application/pdf' }
        );

        // Prepare form data for API
        const formData = new FormData();

        // Add each recipient separately - this is key for multiple recipients
        emailRecipients.forEach(email => {
            formData.append('receivers', email);
        });
        
        // Add CC recipients
        ccemailRecipients.forEach(email => {
            formData.append('cc_emails', email);
        });

        // Add subject, body and attachment
        formData.append('subject', `Reels Inspection Report`);
        formData.append('body', `Please find attached the automated TetraPak Reels Inspection Reports.
Summary:
- Total Reels: ${reelsData.total_reels || "N/A"}
- Matched Reels: ${reelsData.match_reels || "N/A"} 
- Mismatched Reels: ${reelsData.mismatch_reels || "N/A"}
- Wrong Mismatches: ${reelsData.wrong_mismatch_reels || "N/A"}

This is an automated email sent by the Disrupt Lab AI Based Reels Inspection System.`);
        formData.append('attachment', reportFile);
        
        const response = await tetraPakGraphService.sendEmail(formData);
        console.log("Email report sent successfully:", response);
    } catch (error) {
        console.error("Error sending email report:", error);
    }
};
    // Initialize automatic email sending at a regular interval
    const initializeAutomaticEmailReports = () => {
        // Clear any existing interval
        if (emailIntervalRef.current) {
            clearInterval(emailIntervalRef.current);
        }

        // Set up new interval to send reports every 5 minutes (300000 ms)
        emailIntervalRef.current = setInterval(() => {
            console.log("Sending scheduled email report...");
            sendEmailReport();
        }, 7200000); // 5 minutes
    };

    // Initial data fetch and email setup on component mount
    useEffect(() => {
        fetchData(activeFilters);
        initializeAutomaticEmailReports();

        // Cleanup on component unmount
        return () => {
            if (emailIntervalRef.current) {
                clearInterval(emailIntervalRef.current);
            }
        };
    }, []);

    // When active filters change, also trigger an immediate email report
    useEffect(() => {
        // Wait for data to be loaded before sending the email
        if (!loading) {
            // Small delay to ensure data is fully processed
            const timer = setTimeout(() => {
                sendEmailReport();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [activeFilters, loading]);

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
                    <div className="mb-1" style={{ display: "flex", justifyContent: "space-between" }}>
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
                                <div className="shadow-md" style={{ display: "flex", gap: "8px", fontSize: "16px", borderRadius: "10px" }}>
                                    <img src={download} alt="download pdf" />
                                    Download Report
                                </div>
                            )}
                        </Button>
                    </div>

                    {/* Chart 1: Compliance Targets */}
                    <Col md={6} lg={7}>
                        <div className="p-2 compliance-chart-section">
                            <ComplianceTargetsChart data={reelsData} loading={loading} />
                        </div>
                    </Col>

                    {/* Chart 2: Alert Counts */}
                    <Col md={6} lg={5}>
                        <div className="p-2 alert-chart-section">
                            <AlertCountsChart data={wrongMatchData} />
                        </div>
                    </Col>
                </Row>

                {/* Chart 3: Reprocess */}
                <Row>
                    <div className="p-3 reprocess-chart-section">
                        <ReProcessChart data={reprocessData} loading={loading} />
                    </div>
                </Row>

                {/* Chart 4: Reels Dashboard */}
                <Row className="reels-dashboard-section">
                    <ReelsDashboard
                        TotalReels={reelsData.total_reels}
                        MatchReels={reelsData.match_reels}
                        MisMatchReels={reelsData.mismatch_reels}
                        WrongMisMatch={reelsData.wrong_mismatch_reels}
                    />
                </Row>

                {/* Chart 5: User Activity */}
                <Row className="user-activity-section">
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

            {/* Hidden PDF Report Template - This is the key to fast, professional PDFs */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '800px', height: 'auto', overflow: 'hidden' }}>
                <PDFReportTemplate
                    ref={pdfReportRef}
                    reelsData={reelsData}
                    wrongMatchData={wrongMatchData}
                    reprocessData={reprocessData}
                    userData={{
                        id: userID,
                        username: userName,
                        email: userEmail,
                        bypass: userBypass,
                        reprocess: userReprocess,
                        WrongCount: userWrongMatch
                    }}
                    filterDisplay={getActiveFilterDisplay()}
                />
            </div>
        </WeekFilterProvider>
    );
}

export default Inspection;