import React, { useEffect, useState, useRe, useRef,useContext } from "react";
import { Download, FileText, Mail, Send, Type } from "react-feather";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import './header.css'
import { toast } from "react-toastify";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useLocation } from 'react-router-dom';
import LiveAnalysis from '../../../assets/ExcelData/Live_Analytics.xlsx';
import CameraConfig from '../../../assets/ExcelData/Camera_Configuration.xlsx';
import LiveAlert from '../../../assets/ExcelData/Live_Alerts.xlsx'
import TargetControl from '../../../assets/ExcelData/Targets_and_Controls.xlsx'
import Reports from '../../../assets/ExcelData/Reports.xlsx'
import AreaService from "../../../api/areaService";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { errorToast, successToast } from "../../../_helper/helper";
import { PulseLoader } from 'react-spinners';
import liveAlertContext from '../../../_helper/formData/LiveAlert/LiveAlert';
import liveAnalyticContext from '../../../_helper/formData/LiveAnalytics/LiveAnalytics'
import AreaAnalysisContext from '../../../_helper/formData/AreaAnalysis/AreaAnalysisContext'
import generateExcelForAiModel from './ExcelFunctions/AiModuleFunction'
import Unilog from '../../../assets/images/logo/uni-logo.jpeg'
import SubAreaContext from '../../../_helper/formData/SubAreaAnalysis/SubAreaContext'
import TargetContext from '../../../_helper/formData/TargetControl/TargetControlContext'
import "jspdf-autotable";

const DownloadButton = ({ totalNotifications, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm();
  
  const { liveAlertData,totalLiveAlerts,modelandreports, filtersContext, imageRef } = useContext(liveAlertContext); 
  const { overAllComplaince,
    setOverAllComplaince,
    progressContext,
    setProgressContext,
    aiAccuracyContext,
    setAiAccuracyContext,
    cameraCountContext,
    setCameraCountContext,
    camerafilterscontext,
    highestAlerts,
    setHighestAlerts,
    highSeverityContext,
    sethighSeverityContext,
    heatmapcontext,
  alerttrendcontext,
  heatdatacontext,
  alerttrenddatacontext,
  dashfiltercontext,
  totalcamerascontext,
  livecamerascontext,
  inactivecamerascontext,
  camerasdatacontext,
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
  techQaContext






} = useContext(liveAnalyticContext)
  const {areaFiltersContext,
    setAreaFiltersContext,
    areaDetails,
    setAreaDetails} = useContext(AreaAnalysisContext)
    const {
      subAreaFiltersContext,
      setSubAreaFiltersContext,
      subAreaDetails,
      setSubAreaDetails
    
  } = useContext(SubAreaContext)

  const {
    targetFiltersContext,
    setTargetFiltersContext,
    targetDetailsContext,
    setTargetDetailsContext,
    compliancechartcontext,
    alertchartcontext,
    complianceRef,
    alertRef
  
} = useContext(TargetContext)

  

  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false)
  const [downloadType, setDownloadType] = useState('')
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [duration, setDuration] = useState('daily');
  const todayy = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayy);
  const [currentWeek, setcurrentWeek] = useState('');
  const [currentYear, setcurrentYear] = useState('')
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState();
  const [newFilters, setNewFilters] = useState({
    identifier: 'date',
    module: "",
    severity: "",
    shift: "",
    date: todayy,
    week: "",
    month: "",
    starting: "",
    ending: "",

  });
  const toggle = () => setModal(!modal);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };
  const handleDurationChange = (event) => {
    const { value } = event.target;
    setDuration(value);
    // Reset date when changing duration type
    setSelectedDate('');
  };

  const handleDateChange = (e) => {
    const { value, name } = e.target
    console.log(value, name, 'selected date')
    if (name == 'date') {
      setNewFilters({
        ...newFilters,
        identifier: name,
        date: value,
        month: '',
        week: ''
      })
    }
    else if (name == 'week') {
      setNewFilters({
        ...newFilters,
        identifier: name,
        week: value,
        date: '',
        month: ''
      })
    }
    else if (name == 'month') {
      setNewFilters({
        ...newFilters,
        identifier: name,
        month: value,
        date: '',
        week: ''

      })
    }
    setSelectedDate(value);
  };
  
  const handleSubmitEmail = (data) => {

    toast.success(`Send in ${downloadType} format to ${data.email}`);
    reset({
      email: ''  // Clear the email field after submission
    });

    setNotificationDropDown(false)

  };
 
  const handleClick = (type) => {
    if (type === "email") {
      setShow((prev) => !prev)
    }

    setDownloadType(type)

    
  }
  useEffect(() => {
    if (alerttrendcontext.current) {
      console.log('Alert Trend Context Loaded:', alerttrendcontext.current);
    }
    else  if (alertRef.current) {
      console.log('Alert Trend Context Loaded:', alerttrendcontext.current);
    }
  }, [alerttrendcontext, alertRef]);
  const handlePDFdownload = async () => {
    toast.success("Downloading started"); 
    // const current=location.pathname.split('/')[2] 
    const input = document.body;
    console.log('pdf download live alert reports', liveAlertData)
    console.log('these are filters', filtersContext)
    const current = location.pathname.split('/');
    const currentRoute = current.find(element => namesToFind.includes(element.toLowerCase())) || '';
    console.log('ye hai current route', current)
    console.log('leaders context', leaderscontext)
    if(current.includes('alerts') || current.includes('areaanalysis/alerts') || current.includes('sub-area-analysis/alerts') || current.includes('live_alerts')){
       const pdf = new jsPDF("p", "mm", "a4");
            pdf.setFont("helvetica");
      
            // Page dimensions
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            let yOffset = margin;
      
            // Helper function to check page break
            const checkPageBreak = (requiredSpace) => {
              if (yOffset + requiredSpace > pageHeight - margin) {
                pdf.addPage();
                addHeaderFooter();
                yOffset = 40; // Start after header
              }
            };
      
            // Add header and footer to each page
            const addHeaderFooter = () => {
              pdf.setFillColor(255, 255, 255); // White background
              pdf.rect(0, 0, pageWidth, 25, "F");
      
              // Add logos
              const logoHeight = 20;
              const logoWidth = 20;
              const marr = 5;
              pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
              // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
            };
      
            // Add first page header
            addHeaderFooter();
      
            // Main title
            yOffset = 40; // Start after header
            pdf.setFontSize(24);
            pdf.setTextColor(30, 41, 59); // slate-800
            pdf.setFont("helvetica", "bold");
            pdf.text("Live Alerts Report", pageWidth / 2, yOffset, { align: "center" });
            yOffset += 20;


            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Selected Filters", margin, yOffset);
            yOffset += 5;
      
            // Display each filter in a cleaner format
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
      
            // Iterate over each filter
            Object.entries(filtersContext).forEach(([key, value]) => {
              if (value ) {
                // Capitalize key and join array values if necessary
                const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                const displayValue = Array.isArray(value)
                  ? value.join(", ")
                  : String(value);
      
                // Add each filter entry as a separate line
                if(displayValue.length>0){

                  pdf.text(`${displayKey!=='Approval' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
                  yOffset += 8;
                }
              }
              else{
                return ''
              }
            });
            yOffset += 10;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Total Alerts: ${modelandreports.totalAlerts}`, margin, yOffset);
            yOffset += 15;

            


            const addImageFromRef = async (pdf, ref, x, y, width, height) => {
              if (ref && ref.complete) {
                const canvas = await html2canvas(ref, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', x, y, width, height);
              } else {
                pdf.text("Image not available", x, y);
              }
            };
            const imagePromises = [];
            

            liveAlertData.forEach(async (alert, index) => {
              checkPageBreak(60); // Check before adding new alert
          
              pdf.setFontSize(14);
              pdf.setTextColor(0, 0, 0);
            pdf.setFont("helvetica", "bold");
              pdf.text(`Alert ${index + 1}`, margin, yOffset);
              yOffset += 10;
          
              // if (alert.image) {
              //   const imgWidth = 100;
              //   const imgHeight = 75;
              //   const imgX = (pageWidth - imgWidth) / 2;
          
              //   // Check if ref exists and image is loaded
              //   await addImageFromRef(pdf, imageRef.current[index], imgX, yOffset, imgWidth, imgHeight);
              //   yOffset += imgHeight + 10;
              // }
          
              // List alert details

              const truncateURL = (url, maxLength = 50) => {
                if (url.length <= maxLength) return url;
                
                const start = url.slice(0, 30);  // First 30 characters
                const end = url.slice(-10);      // Last 10 characters
                return `${start}...${end}`;
              };
              
              // Construct alert details with embedded link for the image
              const alertDetails = [
                {
                  text: "Click here to download image..",
                  link: alert.image
                },
                `Area: ${alert.area || "N/A"}`,
                `Camera ID: ${alert.camera_id || "N/A"}`,
                `Camera Name: ${alert.camera_name || "N/A"}`,
                `Date: ${alert.date || "N/A"}`,
                `Module: ${alert.module || "N/A"}`,
                // `Operation Safety ID: ${alert.operation_safety_id || "N/A"}`,
                `Shift: ${alert.shift || "N/A"}`,
                `Subarea: ${alert.subarea || "N/A"}`,
                `Time: ${alert.time || "N/A"}`,
                `Violation: ${alert.violation || "N/A"}`,
                `Violation Area: ${alert.violationArea || "N/A"}`
              ];
              
              // Adding to PDF (Inside Loop)
              alertDetails.forEach((detail) => {
                if (typeof detail === "object" && detail.link) {
                  // Handle links
            pdf.setFont("helvetica", "normal");
                  pdf.setTextColor(0, 0, 255);  // Blue color to indicate a link
                  pdf.textWithLink(detail.text, margin + 5, yOffset, { url: detail.link });
                } else {
                  // Handle normal text
                  pdf.setTextColor(0, 0, 0);
            pdf.setFont("helvetica", "normal");

                  pdf.text(String(detail), margin + 5, yOffset);  // Ensure detail is a string
                }
                yOffset += 10;  // Line spacing
              });
          
              yOffset += 10; // Space between alerts
            });
          
            // Footer with date
            const currentDate = new Date().toLocaleString();
            pdf.setFontSize(10);
            const text = `Generated on: ${currentDate}`;
const textWidth = pdf.getTextWidth(text);
const centerX = (pageWidth - textWidth) / 2;  // Calculate center position

pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally










            pdf.save("Live Alerts.pdf");
    }
    else if (current.includes('default')){
      console.log('highest alerts pdf', highestAlerts)
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica");

      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yOffset = margin;

      // Helper function to check page break
      const checkPageBreak = (requiredSpace) => {
        if (yOffset + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          addHeaderFooter();
          yOffset = 40; // Start after header
        }
      };

      // Add header and footer to each page
      const addHeaderFooter = () => {
        pdf.setFillColor(255, 255, 255); // White background
        pdf.rect(0, 0, pageWidth, 25, "F");

        // Add logos
        const logoHeight = 20;
        const logoWidth = 20;
        const marr = 5;
        pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
        // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
      };

      // Add first page header
      addHeaderFooter();

      // Main title
      yOffset = 40; // Start after header
      pdf.setFontSize(24);
      pdf.setTextColor(30, 41, 59); // slate-800
      pdf.setFont("helvetica", "bold");
      pdf.text("Dashboard Report", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;


      pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Overall Compliance: ${overAllComplaince}%`, margin, yOffset);
            yOffset += 12;


            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Modules Score`, margin, yOffset);
            yOffset += 12;
            
            // Loop through the progressContext array
            progressContext.forEach((item) => {
              // Display specific fields
              checkPageBreak(60); // Check before adding new alert

              pdf.setFontSize(12);
              pdf.setFont("helvetica", "normal");
              
              pdf.text(`Name: ${item.name || "N/A"}`, margin + 5, yOffset);
              yOffset += 8;
            
              pdf.text(`Area Owner: ${item.area_owner || "N/A"}`, margin + 5, yOffset);
              yOffset += 8;
            
              pdf.text(`Area with Max Alerts: ${item.area_with_max_alerts || "N/A"}`, margin + 5, yOffset);
              yOffset += 8;
            
              pdf.text(`Max Alerts: ${item.max_alerts || "N/A"}`, margin + 5, yOffset);
              yOffset += 8;
              
              pdf.setFont("helvetica", "bold");
              pdf.text(`Percentage: ${item.percentage || "N/A"}`, margin + 5, yOffset);
              yOffset += 8;
              
              pdf.setFont("helvetica", "normal");
              pdf.text(`Subarea with Max Alerts: ${item.subarea_with_max_alerts || "N/A"}`, margin + 5, yOffset);
              yOffset += 12; // Space between each module
            });
            
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`AI Accuracy: ${aiAccuracyContext}%`, margin, yOffset);
            yOffset += 12;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Active Cameras: ${cameraCountContext.active_cameras || "N/A"}`, margin, yOffset);
              yOffset += 12;
              pdf.text(`Total Cameras: ${cameraCountContext.total_cameras || "N/A"}`, margin, yOffset);
              yOffset += 12;

              pdf.setFontSize(14);
              pdf.setFont("helvetica", "bold");
              pdf.text(`Highest Alerts`, margin, yOffset);
              yOffset += 12;
             
      
                // Display specific fields
                checkPageBreak(60); // Check before adding new alert
              
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "normal");
              
                pdf.text(`Alerts: ${highestAlerts?.max_alerts?.alert_count || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Area Owner: ${highestAlerts?.max_alerts?.area_owner || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Module: ${
                  (highestAlerts?.max_alerts?.object === 'forklift_person_in_same_aisle' ? 'MMHE' :
                    highestAlerts?.max_alerts?.object === 'emergency_exit_blockage' ? 'Emergency Exit' :
                    highestAlerts?.max_alerts?.object) || "N/A"
                }`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Area: ${highestAlerts?.max_alerts?.area || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.setFont("helvetica", "bold");
                pdf.text(`Shift: ${highestAlerts?.max_alerts?.shift_name || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.setFont("helvetica", "normal");
                pdf.text(`Subarea: ${highestAlerts?.max_alerts?.sub_area || "N/A"}`, margin + 5, yOffset);
                yOffset += 12; // Space between each module
             
                checkPageBreak(60); // Check before adding new alert

                pdf.setFontSize(14);
                pdf.setFont("helvetica", "bold");
                pdf.text(`High Severity Alerts`, margin, yOffset);
                yOffset += 12;
              
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "normal");
              
                pdf.text(`Alerts: ${highestAlerts?.highSeverity?.alert_count || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Area Owner: ${highestAlerts?.highSeverity?.area_owner || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Module: ${
                  (highestAlerts?.highSeverity?.object === 'forklift_person_in_same_aisle' ? 'MMHE' :
                    highestAlerts?.highSeverity?.object === 'emergency_exit_blockage' ? 'Emergency Exit' :
                    highestAlerts?.highSeverity?.object) || "N/A"
                }`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.text(`Area: ${highestAlerts?.highSeverity?.area || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.setFont("helvetica", "bold");
                pdf.text(`Shift: ${highestAlerts?.highSeverity?.shift_name || "N/A"}`, margin + 5, yOffset);
                yOffset += 8;
              
                pdf.setFont("helvetica", "normal");
                pdf.text(`Subarea: ${highestAlerts?.highSeverity?.sub_area || "N/A"}`, margin + 5, yOffset);
                yOffset += 12; // Space between each module
             
                const captureAndAddImage = async (ref, title) => {
                  if (ref.current) {
                    const canvas = await html2canvas(ref.current, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pageWidth - 30;  // Fit image to page width
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Maintain aspect ratio
              
              
                    pdf.addImage(imgData, 'PNG', 15, yOffset, imgWidth, imgHeight);
                    yOffset += imgHeight + 5;  // Add space after the image
                   
                  }
                };
              
            
                  // Capture and add heatmap snapshot
                  await captureAndAddImage(heatmapcontext, 'Heatmap Snapshot');
              
                  // Capture and add alert trend snapshot
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  checkPageBreak(90)
                  await captureAndAddImage(alerttrendcontext, 'Alert Trend Snapshot');


                 
                  const currentDate = new Date().toLocaleString();
                  pdf.setFontSize(10);
                  const text = `Generated on: ${currentDate}`;
      const textWidth = pdf.getTextWidth(text);
      const centerX = (pageWidth - textWidth) / 2;  // Calculate center position
      
      pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
console.log('progress pdf', progressContext)
      pdf.save("Dashboard.pdf");
    }

    else if (current.includes('areaanalysis')){
      
        console.log('area analysis filters', areaDetails)
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFont("helvetica");
  
        // Page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        let yOffset = margin;
  
        // Helper function to check page break
        const checkPageBreak = (requiredSpace) => {
          if (yOffset + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            addHeaderFooter();
            yOffset = 40; // Start after header
          }
        };
  
        // Add header and footer to each page
        const addHeaderFooter = () => {
          pdf.setFillColor(255, 255, 255); // White background
          pdf.rect(0, 0, pageWidth, 25, "F");
  
          // Add logos
          const logoHeight = 20;
          const logoWidth = 20;
          const marr = 5;
          pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
          // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
        };
  
        // Add first page header
        addHeaderFooter();
  
        // Main title
        yOffset = 40; // Start after header
        pdf.setFontSize(24);
        pdf.setTextColor(30, 41, 59); // slate-800
        pdf.setFont("helvetica", "bold");
        pdf.text("Area Analysis Report", pageWidth / 2, yOffset, { align: "center" });
        yOffset += 20;


        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Selected Filters", margin, yOffset);
        yOffset += 10;
  
        // Display each filter in a cleaner format
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
  
        // Iterate over each filter
        Object.entries(areaFiltersContext).forEach(([key, value]) => {
          if (value ) {
            // Capitalize key and join array values if necessary
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : String(value);
  
            // Add each filter entry as a separate line
            if(displayKey!=='Factory_id' && displayKey!=='User_id' && displayKey!=='Safety_area'){

              pdf.text(`${displayKey!=='Factory_id' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
              yOffset += 8;
            }
          }
          else{
            return ''
          }
        });
        yOffset += 15;



        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text('Area Details', margin, yOffset);
        yOffset += 10;
        
        // Loop through areaDetails and display each entry
        areaDetails.forEach((area, index) => {
          pdf.setFontSize(12);
          pdf.setFont("helvetica", "normal");
        
          pdf.text(`Area ${index + 1}:`, margin, yOffset);
          yOffset += 8;
        
          pdf.text(`Area Name: ${area.AreaName || "N/A"}`, margin + 10, yOffset);
          yOffset += 8;
        
          pdf.text(`Area Owner: ${area.AreaOwner || "N/A"}`, margin + 10, yOffset);
          yOffset += 8;
        
          pdf.text(`Area Compliance: ${area.AreaCompliance || "N/A"}`, margin + 10, yOffset);
          yOffset += 8;
        
          pdf.text(`Cameras: ${area.SubAreas?.length || 0}`, margin + 10, yOffset);
          yOffset += 10;  // Space between area entries
          checkPageBreak(60)
        });
        

  
                    const currentDate = new Date().toLocaleString();
                    pdf.setFontSize(10);
                    const text = `Generated on: ${currentDate}`;
        const textWidth = pdf.getTextWidth(text);
        const centerX = (pageWidth - textWidth) / 2;  // Calculate center position
        
        pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
  console.log('progress pdf', progressContext)
        pdf.save("Area Analysis Report.pdf");
      
    }
    else if (current.includes('sub-area-analysis')){
console.log('sub area pdf', subAreaDetails)
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica");

      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yOffset = margin;

      // Helper function to check page break
      const checkPageBreak = (requiredSpace) => {
        if (yOffset + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          addHeaderFooter();
          yOffset = 40; // Start after header
        }
      };

      // Add header and footer to each page
      const addHeaderFooter = () => {
        pdf.setFillColor(255, 255, 255); // White background
        pdf.rect(0, 0, pageWidth, 25, "F");

        // Add logos
        const logoHeight = 20;
        const logoWidth = 20;
        const marr = 5;
        pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
        // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
      };

      // Add first page header
      addHeaderFooter();

      // Main title
      yOffset = 40; // Start after header
      pdf.setFontSize(24);
      pdf.setTextColor(30, 41, 59); // slate-800
      pdf.setFont("helvetica", "bold");
      pdf.text("Sub Area Analysis Report", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;


      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Selected Filters", margin, yOffset);
      yOffset += 10;

      // Display each filter in a cleaner format
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      // Iterate over each filter
      Object.entries(subAreaFiltersContext).forEach(([key, value]) => {
        if (value ) {
          // Capitalize key and join array values if necessary
          const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
          const displayValue = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          // Add each filter entry as a separate line
          if(displayKey!=='Factory_id' && displayKey!=='User_id' && displayKey!=='Safety_area'){

            pdf.text(`${displayKey!=='Factory_id' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
            yOffset += 8;
          }
        }
        else{
          return ''
        }
      });
      yOffset += 15;



      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text('Sub Area Details', margin, yOffset);
      yOffset += 10;
      
      // Loop through areaDetails and display each entry
      subAreaDetails.forEach((area, index) => {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
      
        pdf.text(`Sub Area ${index + 1}:`, margin, yOffset);
        yOffset += 8;

        pdf.setFont("helvetica", "normal");
        pdf.text(`Sub Area Name: ${area.subareaName || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Area Name: ${area.areaName || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Area Owner: ${area.areaOwner || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.setFont("helvetica", "bold");
        pdf.text(`Compliance: ${area.compliance || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;

        pdf.setFont("helvetica", "normal");
        pdf.text(`Alerts: ${area.alerts || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Cameras: ${area.totalCameras}`, margin + 10, yOffset);
        yOffset += 8;  // Space between area entries

        pdf.text(`Modules: ${area.Modules.map((a)=>a) || "N/A"}`, margin + 10, yOffset);
        yOffset += 10;

        checkPageBreak(60)
      });
      


                  const currentDate = new Date().toLocaleString();
                  pdf.setFontSize(10);
                  const text = `Generated on: ${currentDate}`;
      const textWidth = pdf.getTextWidth(text);
      const centerX = (pageWidth - textWidth) / 2;  // Calculate center position
      
      pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
console.log('progress pdf', progressContext)
      pdf.save("Sub Area Analysis Report.pdf");



    }
    else if (current.includes('targets')){
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica");
      console.log('targetdetails', targetDetailsContext)
      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yOffset = margin;

      // Helper function to check page break
      const checkPageBreak = (requiredSpace) => {
        if (yOffset + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          addHeaderFooter();
          yOffset = 40; // Start after header
        }
      };

      // Add header and footer to each page
      const addHeaderFooter = () => {
        pdf.setFillColor(255, 255, 255); // White background
        pdf.rect(0, 0, pageWidth, 25, "F");

        // Add logos
        const logoHeight = 20;
        const logoWidth = 20;
        const marr = 5;
        pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
        // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
      };

      // Add first page header
      addHeaderFooter();

      // Main title
      yOffset = 40; // Start after header
      pdf.setFontSize(24);
      pdf.setTextColor(30, 41, 59); // slate-800
      pdf.setFont("helvetica", "bold");
      pdf.text("Target And Controls Report", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;


     
             
                const captureAndAddImage = async (ref, title) => {
                  if (ref.current) {
                    const canvas = await html2canvas(ref.current, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const imgWidth = pageWidth - 30;  // Fit image to page width
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Maintain aspect ratio
              
                    pdf.setFontSize(14);
                    pdf.setFont("helvetica", "bold");
                    pdf.text(`${title}`, margin, yOffset);
                    yOffset += 5; 

                    pdf.addImage(imgData, 'PNG', 15, yOffset, imgWidth, imgHeight);
                    yOffset += imgHeight + 5;  // Add space after the image
                  }
                };
              
                pdf.setFontSize(14);
                pdf.setFont("helvetica", "bold");
                pdf.text("Selected Filters", margin, yOffset);
                yOffset += 10;
          
                // Display each filter in a cleaner format
                pdf.setFontSize(11);
                pdf.setFont("helvetica", "normal");
          
                // Iterate over each filter
                Object.entries(targetFiltersContext).forEach(([key, value]) => {
                  if (value ) {
                    // Capitalize key and join array values if necessary
                    const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                    const displayValue = Array.isArray(value)
                      ? value.join(", ")
                      : String(value);
          
                    // Add each filter entry as a separate line
                    if(displayKey!=='Factory_id' && displayKey!=='User_id' && displayKey!=='Safety_area'){
          
                      pdf.text(`${displayKey!=='Factory_id' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
                      yOffset += 8;
                    }
                  }
                  else{
                    return ''
                  }
                });
                yOffset += 15;
          
                  // Capture and add heatmap snapshot
                  await captureAndAddImage(complianceRef, 'Compliance Targets');
              
                  // Capture and add alert trend snapshot
                  await new Promise((resolve) => setTimeout(resolve, 500));

                  checkPageBreak(60)
                  await captureAndAddImage(alertRef, 'Alerts Count');

                 


      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text('Target Details', margin, yOffset);
      yOffset += 10;
      
      // Loop through targetDetailsContext and display each entry
      const calculateReduction = (total, current) => {
        if (!current) {
          return 0
        }
        if (total > 0) {
          const percentage = ((total - current) / total) * 100;
          return Math.round(percentage / 5) * 5; // Round to the nearest multiple of 5
        }
        return 0; // Return 0 if total is 0 to avoid divide-by-zero errors
      };
      targetDetailsContext.forEach((target, index) => {

        const percDed = calculateReduction(target.last_week.alerts, target.current_week.target);



        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
      
        pdf.text(`Target ${index + 1}:`, margin, yOffset);
        yOffset += 8;
      
        pdf.setFont("helvetica", "normal");
        pdf.text(`Factory: ${target.factory_name || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Area Name: ${target.area_id || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Owner: ${target.owner || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;

        pdf.text(`Current Week Target: ${target.current_week?.target || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Current Week Alerts: ${target.current_week?.alerts || 0}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Last Week Target: ${target.last_week?.target || "N/A"}`, margin + 10, yOffset);
        yOffset += 8;
      
        pdf.text(`Last Week Alerts: ${target.last_week?.alerts || 0}`, margin + 10, yOffset);
        yOffset += 8; 
        
        pdf.setFont("helvetica", "bold");
        pdf.text(`Reduction Target: ${`${percDed}%` || "N/A"}`, margin + 10, yOffset);
        yOffset += 12;
        // Space between each entry

        checkPageBreak(60)
      });
      

      const currentDate = new Date().toLocaleString();
      pdf.setFontSize(10);
      const text = `Generated on: ${currentDate}`;
const textWidth = pdf.getTextWidth(text);
const centerX = (pageWidth - textWidth) / 2;  // Calculate center position

pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally

console.log('progress pdf', progressContext)
      pdf.save("Targets.pdf");
    }
    else if (current.includes('camera_configuration')){
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFont("helvetica");

      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yOffset = margin;

      // Helper function to check page break
      const checkPageBreak = (requiredSpace) => {
        if (yOffset + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          addHeaderFooter();
          yOffset = 40; // Start after header
        }
      };

      // Add header and footer to each page
      const addHeaderFooter = () => {
        pdf.setFillColor(255, 255, 255); // White background
        pdf.rect(0, 0, pageWidth, 25, "F");

        // Add logos
        const logoHeight = 20;
        const logoWidth = 20;
        const marr = 5;
        pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
        // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
      };

      // Add first page header
      addHeaderFooter();

      // Main title
      yOffset = 40; // Start after header
      pdf.setFontSize(24);
      pdf.setTextColor(30, 41, 59); // slate-800
      pdf.setFont("helvetica", "bold");
      pdf.text("Camera Configurations Report", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Total Cameras: ${totalcamerascontext || "N/A"}`, margin, yOffset);
        yOffset += 12;
        pdf.text(`Live Cameras: ${livecamerascontext || "N/A"}`, margin, yOffset);
        yOffset += 12;
        pdf.text(`Inactive Cameras: ${inactivecamerascontext || "N/A"}`, margin, yOffset);
        yOffset += 12;


        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text('Camera Configurations', margin, yOffset)
        yOffset += 12;
        camerasdatacontext.forEach((camera,index)=>{
          checkPageBreak(60)

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "bold");
          pdf.text(`Camera ${index+1}`, margin+5,yOffset)
        yOffset += 12;
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Camera ID:  ${camera.camera_id || "N/A"}`, margin+5,yOffset)
        yOffset += 8;
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Camera Name:  ${camera.camera_name || "N/A"}`, margin+5,yOffset)
        yOffset += 8;

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Area:  ${camera.area || "N/A"}`, margin+5,yOffset)
        yOffset += 8;

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Area Owner:  ${camera.area_owner || "N/A"}`, margin+5,yOffset)
        yOffset += 8;

          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Sub Area:  ${camera.sub_area || "N/A"}`, margin+5,yOffset)
        yOffset += 8;
console.log('modules', camera.modules)
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Modules:  ${camera.modules.map((m)=>m.module_name) || "N/A"}`, margin+5,yOffset)
        yOffset += 8;
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Last Active:  ${camera.last_active || "N/A"}`, margin+5,yOffset)
        yOffset += 8;
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "bold");
          pdf.text(`Status:  ${camera.active ? 'Active' : 'Inactive' || "N/A"}`, margin+5,yOffset)
        yOffset += 12;

        checkPageBreak(60)


        })
    

                  const currentDate = new Date().toLocaleString();
                  pdf.setFontSize(10);
                  const text = `Generated on: ${currentDate}`;
      const textWidth = pdf.getTextWidth(text);
      const centerX = (pageWidth - textWidth) / 2;  // Calculate center position
      
      pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
console.log('progress pdf', progressContext)
      pdf.save("Cameras Report.pdf");

    }
    else if(current.includes('leaderboard')){
    
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFont("helvetica");
  
        // Page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        let yOffset = margin;
  
        // Helper function to check page break
        const checkPageBreak = (requiredSpace) => {
          if (yOffset + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            addHeaderFooter();
            yOffset = 40; // Start after header
          }
        };
  
        // Add header and footer to each page
        const addHeaderFooter = () => {
          pdf.setFillColor(255, 255, 255); // White background
          pdf.rect(0, 0, pageWidth, 25, "F");
  
          // Add logos
          const logoHeight = 20;
          const logoWidth = 20;
          const marr = 5;
          pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
          // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
        };
  
        // Add first page header
        addHeaderFooter();
  
        // Main title
        yOffset = 40; // Start after header
        pdf.setFontSize(24);
        pdf.setTextColor(30, 41, 59); // slate-800
        pdf.setFont("helvetica", "bold");
        pdf.text("Leaderboard Report", pageWidth / 2, yOffset, { align: "center" });
        yOffset += 20;
  
       
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Selected Filters", margin, yOffset);
        yOffset += 8;
  
        // Display each filter in a cleaner format
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
  
        // Iterate over each filter
        Object.entries(leaderpagefilterscontext).forEach(([key, value]) => {
          if (value ) {
            // Capitalize key and join array values if necessary
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : String(value);
  
            // Add each filter entry as a separate line
            if(displayKey!=='Factory_id' && displayKey!=='User_id' && displayKey!=='Safety_area'){
  
              pdf.text(`${displayKey!=='Factory_id' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
              yOffset += 8;
            }
          }
          else{
            return ''
          }
        });
        yOffset += 12;

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Top 3 Ranks", margin, yOffset);
        yOffset += 12;



   

        
          leaderscontext.forEach((leader,index)=>{
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Rank ${index+1}`, margin+5, yOffset);
            yOffset += 12
            
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`${leader.Name}`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Points: ${leader.points}`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Area: ${leader.areaid}`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Compliance: ${leader.compliance_percentage}%`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Total Alerts: ${leader.totalalert}`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Target: ${leader.target}`, margin+5, yOffset);
            yOffset += 8;

            pdf.setFontSize(14);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Time Spent: ${leader.time} minutes`, margin+5, yOffset);
            yOffset += 12;

            checkPageBreak(60)
          })

         
         
        
          // Table columns and rows
          const columns = [
            "Name",
            "Area ID",
            "Total Alerts",
            "Compliance (%)",
            "Time",
            "Target",
            "Points"
          ];
        
          const rows = tabledatacontext.map((leader) => [
            leader.Name || "N/A",
            leader.areaid || "N/A",
            leader.totalalert || "N/A",
            leader.compliance_percentage || "N/A",
            leader.time || "N/A",
            leader.target || "N/A",
            leader.points || "N/A"
          ]);
        
          // Add the table below the title
          pdf.autoTable({
            head: [columns],
            body: rows,
            startY: 120, // Start the table at y-coordinate 30 (below the title)
            styles: {
              font: "helvetica",
              fontSize: 14,
              halign: "center",
              valign: "middle",
              borderRadius:'10px'
            },
            headStyles: {
              fillColor: [30, 103, 214], // Header background color
              textColor: 255, // Header text color
              fontStyle: "bold",
              borderRadius:'10px'
            },
            bodyStyles: {
              fillColor: [245, 245, 245], // Row background color
              textColor: 0,
              borderRadius:'10px'
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255], // Alternate row background color
            },
            columnStyles: {
              0: { halign: "left" }, // Align the first column to the left
            },
          });

  
                    const currentDate = new Date().toLocaleString();
                    pdf.setFontSize(10);
                    const text = `Generated on: ${currentDate}`;
        const textWidth = pdf.getTextWidth(text);
        const centerX = (pageWidth - textWidth) / 2;  // Calculate center position
        
        pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
  console.log('progress pdf', progressContext)
        pdf.save("Leaderboard Report.pdf");
  
      
    }
    else if(current.includes('defaultqa')){
      const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFont("helvetica");
  
        // Page dimensions
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        let yOffset = margin;
  
        // Helper function to check page break
        const checkPageBreak = (requiredSpace) => {
          if (yOffset + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            addHeaderFooter();
            yOffset = 40; // Start after header
          }
        };
  
        // Add header and footer to each page
        const addHeaderFooter = () => {
          pdf.setFillColor(255, 255, 255); // White background
          pdf.rect(0, 0, pageWidth, 25, "F");
  
          // Add logos
          const logoHeight = 20;
          const logoWidth = 20;
          const marr = 5;
          pdf.addImage(Unilog, "JPEG", marr, 5, logoWidth, logoHeight); // UniLogo
          // pdf.addImage(Disrupt, 'PNG', pageWidth - margin - 35, 5, 40, logoHeight); // Disrupt Icon
        };
  
        // Add first page header
        addHeaderFooter();
  
        // Main title
        yOffset = 40; // Start after header
        pdf.setFontSize(24);
        pdf.setTextColor(30, 41, 59); // slate-800
        pdf.setFont("helvetica", "bold");
        pdf.text("QA Dashboard", pageWidth / 2, yOffset, { align: "center" });
        yOffset += 20;

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Selected Filters", margin, yOffset);
        yOffset += 5;
  
        // Display each filter in a cleaner format
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
  
        // Iterate over each filter
        Object.entries(filtersContext).forEach(([key, value]) => {
          if (value ) {
            // Capitalize key and join array values if necessary
            const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : String(value);
  
            // Add each filter entry as a separate line
            if(displayValue.length>0){

              pdf.text(`${displayKey!=='Approval' ? `${displayKey}:` : ''} ${displayValue!=='Select Approval' ? displayValue : ''}`, margin + 5, yOffset);
              yOffset += 8;
            }
          }
          else{
            return ''
          }
        });
        yOffset += 10;

        const captureAndAddImage = async (ref, title) => {
          if (ref.current) {
            const canvas = await html2canvas(ref.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pageWidth - 30;  // Fit image to page width
            const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Maintain aspect ratio
      
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`${title}`, margin, yOffset);
            // yOffset += 5; 

            pdf.addImage(imgData, 'PNG', 15, yOffset, imgWidth, imgHeight+10);
            yOffset += imgHeight ;  // Add space after the image
          }
        };

        // checkPageBreak(150)
        await captureAndAddImage(techQaContext.techComplianceRef, '');
              
        // Capture and add alert trend snapshot
        await new Promise((resolve) => setTimeout(resolve, 500));
// pdf.addPage()
        await captureAndAddImage(techQaContext.accuracyRef, '');
        checkPageBreak(60)

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Total Alerts: ${modelandreports.totalAlerts}`, margin, yOffset);
        yOffset += 12;

        pdf.text(`Verified Alerts: ${totalLiveAlerts.verified}`, margin, yOffset);
        yOffset += 12;

        pdf.text(`Accepted Alerts: ${totalLiveAlerts.accepted}`, margin, yOffset);
        yOffset += 12;

        pdf.text(`Rejected Alerts: ${totalLiveAlerts.rejected}`, margin, yOffset);
        yOffset += 12;

        pdf.text(`Pending Alerts: ${totalLiveAlerts.pending}`, margin, yOffset);
        yOffset += 15;


        const addImageFromRef = async (pdf, ref, x, y, width, height) => {
          if (ref && ref.complete) {
            const canvas = await html2canvas(ref, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', x, y, width, height);
          } else {
            pdf.text("Image not available", x, y);
          }
        };
        const imagePromises = [];
        

        liveAlertData.forEach(async (alert, index) => {
          checkPageBreak(60); // Check before adding new alert
      
          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "bold");
          pdf.text(`Alert ${index + 1}`, margin, yOffset);
          yOffset += 10;
      
          // if (alert.image) {
          //   const imgWidth = 100;
          //   const imgHeight = 75;
          //   const imgX = (pageWidth - imgWidth) / 2;
      
          //   // Check if ref exists and image is loaded
          //   await addImageFromRef(pdf, imageRef.current[index], imgX, yOffset, imgWidth, imgHeight);
          //   yOffset += imgHeight + 10;
          // }
      
          // List alert details

          const truncateURL = (url, maxLength = 50) => {
            if (url.length <= maxLength) return url;
            
            const start = url.slice(0, 30);  // First 30 characters
            const end = url.slice(-10);      // Last 10 characters
            return `${start}...${end}`;
          };
          
          // Construct alert details with embedded link for the image
          const alertDetails = [
            {
              text: "Click here to download image..",
              link: alert.image
            },
            `Area: ${alert.area || "N/A"}`,
            `Camera ID: ${alert.camera_id || "N/A"}`,
            `Camera Name: ${alert.camera_name || "N/A"}`,
            `Date: ${alert.date || "N/A"}`,
            `Module: ${alert.module || "N/A"}`,
            // `Operation Safety ID: ${alert.operation_safety_id || "N/A"}`,
            `Shift: ${alert.shift || "N/A"}`,
            `Subarea: ${alert.subarea || "N/A"}`,
            `Time: ${alert.time || "N/A"}`,
            `Violation: ${alert.violation || "N/A"}`,
            `Violation Area: ${alert.violationArea || "N/A"}`
          ];
          
          // Adding to PDF (Inside Loop)
          alertDetails.forEach((detail) => {
            if (typeof detail === "object" && detail.link) {
              // Handle links
        pdf.setFont("helvetica", "normal");
              pdf.setTextColor(0, 0, 255);  // Blue color to indicate a link
              pdf.textWithLink(detail.text, margin + 5, yOffset, { url: detail.link });
            } else {
              // Handle normal text
              pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");

              pdf.text(String(detail), margin + 5, yOffset);  // Ensure detail is a string
            }
            yOffset += 10;  // Line spacing
          });
          checkPageBreak(80)
          
        });

        const currentDate = new Date().toLocaleString();
        pdf.setFontSize(10);
        const text = `Generated on: ${currentDate}`;
const textWidth = pdf.getTextWidth(text);
const centerX = (pageWidth - textWidth) / 2;  // Calculate center position

pdf.text(text, centerX, pageHeight - 10);  // Centered horizontally
console.log('progress pdf', progressContext)
pdf.save("QADashboard.pdf");

    }

    

    // html2canvas(input, { scale: 2 }).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save('UAM');
    // });
  };
  
 
  const namesToFind = ['camera_configuration', 'factory', 'reports', 'targets', 'live_alerts'];
  function createAndDownloadExcel(moduleData, overallData) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const dataForExcel = [
      { Module: `Date: ${overallData.date}` },
      {},
      { Module: "Module", Total: "Total", "Accuracy": "Accuracy %", Correct: "Correct", Wrong: "Wrong" },
      {
        Module: 'Over all',
        Total: overallData.correct + overallData.wrong,
        Correct: overallData.correct,
        Wrong: overallData.wrong,
        "Accuracy": overallData.percentage,
      },
      {},

      // Assuming you want headers again for modules, if not, remove this line
      { Module: "Module", Total: "Total", "Accuracy": "Accuracy %" },

      // Module-specific data with empty fields for the 'Date' column
      ...moduleData.map(item => ({
        Module: item.name,
        Total: item.value,
        "Accuracy": `${item.value}%`, // Assuming 100% correctness if value > 0
      }))
    ];
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compliance Data");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    saveAs(blob, 'live Alerts.xlsx');
  }
  const fetchdataforTECHQA = async () => {
    setloading(true)
    try {
      const payload1 = {
        safety_area: [],
        shift: [],
        start_date: newFilters.date ? formatDate(newFilters.date) : '',
        end_date: newFilters.date ? formatDate(newFilters.date) : '',
        week: newFilters.week,
        month: newFilters.month,
      };
      console.log(payload1);
      const res = await AreaService.getOperationID(payload1);
      const res2 = await AreaService.getModelAccuracyChart(payload1)

      const total = res?.data?.ids.accepted.length + res?.data?.ids.rejected.length
      const correct = res?.data?.ids.accepted.length
      const wrong = res?.data?.ids.rejected.length
      const percentage = correct / total * 100
      const firstcolumn = {
        date: selectedDate,
        correct: correct,
        wrong: wrong,
        percentage: percentage.toFixed(2)
      }
      const secondcolumn = res2.data.totalAlertsChart
      createAndDownloadExcel(secondcolumn, firstcolumn)
      setloading(false);
      successToast('Download Completed');
      toggle();
    } catch (error) {
      setloading(false);
      errorToast('Error while fetching data')
    }

  }
  const getcurrentweekORmotn = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDays = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNo = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
    const week = `${now.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
    const year = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    setcurrentWeek(week);
    setcurrentYear(year);
    console.log(week, year, 'current year and month')

  }
  function creaExelForLiveAlertsFactory(liveAlertData) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Define headers and format data for Excel without the 'image' field
    const headers = {
        operation_safety_id: "Operation Safety ID",
        VioSeverity: "Violation Severity",
        module: "Module",
        violation: "Violation",
        violationArea: "Violation Area",
        camera_name: "Camera Name",
        date: "Date",
        time: "Time",
        shift: "Shift",
        camera_id: "Camera ID"
    };

    // Transform liveAlertData to include only necessary fields and headers
    const dataForExcel = liveAlertData.map(alert => ({
        operation_safety_id: alert.operation_safety_id,
        VioSeverity: alert.VioSeverity,
        module: alert.module,
        violation: alert.violation,
        violationArea: alert.violationArea,
        camera_name: alert.camera_name,
        date: alert.date,
        time: alert.time,
        shift: alert.shift,
        camera_id: alert.camera_id,
    }));

    // Prepend headers to data
    dataForExcel.unshift(headers);

    // Create worksheet and add the data
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, { skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, "LiveAlertData");

    // Write workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a blob for download
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Use saveAs to trigger the download
    saveAs(blob, 'LiveAlerts.xlsx');
}
  const getLiveAlertDataforFactory=async()=>{
    if(liveAlertData){
      creaExelForLiveAlertsFactory(liveAlertData);
      successToast('Excel file downloaded.')
    }
    else{
      errorToast('Empty data response')
    }
  }
  const handleExcelDownload = () => {
    const current = location.pathname.split('/');
    const currentRoute = current.find(element => namesToFind.includes(element.toLowerCase())) || '';
    
     

    // Check for 'default' and 'qa' conditions
    if (current.includes('default') && current.includes('qa')) {
      toggle();
      getcurrentweekORmotn();
    }
    else if(current.includes('alerts') || current.includes('areaanalysis/alerts') || current.includes('sub-area-analysis/alerts') || current.includes('live_alerts') || current.includes('default/alerts')){
      // alert('hello live alert');
      getLiveAlertDataforFactory()
      return
    }
   
    else if(current.includes('reports')){
      generateExcelForAiModel(modelandreports)
      return
    }
    else if (current.includes('defaultqa')) {
      console.log('tech qa context', techQaContext);
    
      // Create the heading for Module, Accuracy, and Total AI Accuracy
      const moduleAccuracyHeading = [["Module", "Accuracy"]];
      const totalAiAccuracyHeading = [["Total AI Accuracy"]]; // New heading for Total AI Accuracy
    
      // Prepare rows for Modules and their corresponding Accuracy values
      const moduleAccuracyRows = techQaContext.complianceData.map(item => [
        item.name,    // Module name
        item.value,   // Accuracy value
      ]);
    
      // Add the Total AI Accuracy row (using the value from techQaContext.aiAccuracy)
      const totalAiAccuracyRow = [[techQaContext.aiAccuracy]];
    
      // Headers for liveAlertData
      const headers = {
        operation_safety_id: "Operation Safety ID",
        VioSeverity: "Violation Severity",
        module: "Module",
        violation: "Violation",
        violationArea: "Violation Area",
        camera_name: "Camera Name",
        date: "Date",
        time: "Time",
        shift: "Shift",
        camera_id: "Camera ID"
      };
    
      // Transform liveAlertData to include only necessary fields and headers
      const dataForExcel = liveAlertData.map(alert => ([
        alert.operation_safety_id,
        alert.VioSeverity,
        alert.module,
        alert.violation,
        alert.violationArea,
        alert.camera_name,
        alert.date,
        alert.time,
        alert.shift,
        alert.camera_id
      ]));
    
      // Prepend headers to data
      const dataWithHeaders = [Object.values(headers), ...dataForExcel];
    
      // Add the new section for Alerts (Total Alerts, Verified, Accepted, Rejected, Pending)
      const alertsHeading = [["Total Alerts", "Verified", "Accepted", "Rejected", "Pending"]];
      
      const alertsRow = [
        modelandreports.totalAlerts,           // Total Alerts
        totalLiveAlerts.verified,             // Verified
        totalLiveAlerts.accepted,             // Accepted
        totalLiveAlerts.rejected,             // Rejected
        totalLiveAlerts.pending,              // Pending
      ];
    
      // Combine all sections: Module Accuracy, Total AI Accuracy, Live Alert Data, and the new Alerts Section
      const moduleAccuracySection = [
        ...moduleAccuracyHeading,  // Add "Module" and "Accuracy" headers
        ...moduleAccuracyRows,     // Add rows for Module names and Accuracy values
        [],                       // Add an empty row for separation
        ...totalAiAccuracyHeading, // Add Total AI Accuracy heading
        ...totalAiAccuracyRow,     // Add Total AI Accuracy value
        [],          
        ...alertsHeading,          // Add the new Alerts section headers
        alertsRow,  
        [],             // Add an empty row for separation
        ...dataWithHeaders,        // Add the liveAlertData with headers
        [],                       // Add an empty row for separation
                       // Add the row with data for Total Alerts, Verified, Accepted, Rejected, Pending
      ];
    
      // Create a worksheet from the combined data
      const worksheet = XLSX.utils.aoa_to_sheet(moduleAccuracySection);
    
      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Module Accuracy Data");
    
      // Export to Excel file
      XLSX.writeFile(workbook, "ModuleAccuracyData.xlsx");
    }
    
    
    else if(current.includes('areaanalysis')){
      console.log('now working on area anaylsis excel', areaFiltersContext)
      const dateValue =
      areaFiltersContext.week !== ''
        ? areaFiltersContext.week
        : areaFiltersContext.month !== ''
        ? areaFiltersContext.month
        : 'All';

    const shiftValue = areaFiltersContext.shift !== '' ? areaFiltersContext.shift : 'All';

    // Prepare data for Excel
    const data = areaDetails.map(area => ({
      Compliance: area.AreaCompliance,
      Area: area.AreaName,
      Owner: area.AreaOwner,
      Cameras: area.SubAreas.length,
      Date: dateValue, // Add Date column
      Shift: shiftValue, // Add Shift column
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AreaAnalysis");

    // Export to Excel
    XLSX.writeFile(workbook, "AreaAnalysis.xlsx");
    }
    else if(current.includes('sub-area-analysis')){
      console.log('sub area analysis excel', subAreaFiltersContext)
      const dateValue =
      subAreaFiltersContext.week !== ''
        ? subAreaFiltersContext.week
        : subAreaFiltersContext.month !== ''
        ? subAreaFiltersContext.month
        : 'All';

    const shiftValue = subAreaFiltersContext.shift !== '' ? subAreaFiltersContext.shift : 'All';

    // Determine Area Filter value
    const areaFilterValue =
      subAreaFiltersContext.safety_area && subAreaFiltersContext.safety_area.length > 0
        ? subAreaFiltersContext.safety_area.join(', ') // Convert array to comma-separated string
        : 'All';

    // Prepare data for Excel
    const data = subAreaDetails.map(subArea => ({
      'Sub Area': subArea.subareaName,
      Owner: subArea.areaOwner,
      Area: subArea.areaName,
      Compliance: subArea.compliance,
      Cameras: subArea.totalCameras,
      Modules: subArea.Modules.join(', '), // Convert array to comma-separated string
      Alerts: subArea.alerts,
      Date: dateValue, // Add Date column
      Shift: shiftValue, // Add Shift column
      'Area Filter': areaFilterValue, // Add Area Filter column
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SubAreaAnalysis");

    // Export to Excel
    XLSX.writeFile(workbook, "SubAreaAnalysis.xlsx");
    }
    else if(current.includes('leaderboard')){
      console.log('leadercontext excel', tabledatacontext)
      const dateValue =
      leaderpagefilterscontext.week !== ''
        ? leaderpagefilterscontext.week
        : leaderpagefilterscontext.month !== ''
        ? leaderpagefilterscontext.month
        : 'All';

    // Prepare data for Top 3 Leaders
    const top3Leaders = leaderscontext.slice(0, 3).map(leader => ({
      Name: leader.Name,
      "Area ID": leader.areaid,
      Compliance: leader.compliance,
      "Compliance Percentage": `${leader.compliance_percentage}%`,
      Points: leader.points,
      Target: leader.target,
      Time: `${leader.time} mins`,
      Alerts: leader.totalalert,
      Date: dateValue,
    }));

    // Prepare data for Remaining Leaders
    const remainingLeaders = tabledatacontext.map(leader => ({
      Name: leader.Name,
      "Area ID": leader.areaid,
      Compliance: leader.compliance,
      "Compliance Percentage": `${leader.compliance_percentage}%`,
      Points: leader.points,
      Target: leader.target,
      Time: `${leader.time} mins`,
      Alerts: leader.totalalert,
      Date: dateValue,
    }));

    // Add headings and combine data
    const worksheetData = [
      ["Top 3 Leaders:"],
      [],
      ["Name", "Area ID", "Compliance", "Compliance Percentage", "Points", "Target", "Time", "Alerts", "Date"],
      ...top3Leaders.map(Object.values),
      [],
      ["Remaining Leaders:"],
      [],
      ["Name", "Area ID", "Compliance", "Compliance Percentage", "Points", "Target", "Time", "Alerts", "Date"],
      ...remainingLeaders.map(Object.values),
    ];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leaderboard");

    // Export to Excel
    XLSX.writeFile(workbook, "Leaderboard.xlsx");
  
    }
    else if(current.includes('camera_configuration')){
      console.log('cameras excel', camerasdatacontext)
      const filtersHeading = [["Filters"]];
      const filtersData = [
        {
          Area: camerafilterscontext.area && camerafilterscontext.area.length > 0
            ? camerafilterscontext.area.map(area => area.area_name).join(', ') // Extract area_name from each area
            : 'All',
          "Sub Area": camerafilterscontext.sub_area && camerafilterscontext.sub_area.length > 0
            ? camerafilterscontext.sub_area.map(sub => sub.name).join(', ') // Extract name from each sub_area
            : 'All',
          Modules: camerafilterscontext.module!=='' ? camerafilterscontext.module : 'All',
          Status: camerafilterscontext.status!=='' ? camerafilterscontext.status : 'All'
        },
      ];
    const filtersTable = [
      ["Area", "Sub Area", "Modules","Status"],
      ...filtersData.map(Object.values),
    ];

    // Prepare data for Total Cameras, Live Cameras, and Inactive Cameras
    const totalCamerasData = [["Total Cameras"], [totalcamerascontext]];
    const liveCamerasData = [["Live Cameras"], [livecamerascontext]];
    const inactiveCamerasData = [["InActive Cameras"], [inactivecamerascontext]];

    // Prepare Camera Data
    const cameraDataHeader = [
      "Area",
      "Sub Area",
      "Status",
      "Camera ID",
      "Camera Name",
      "Modules",
      "Last Active",
    ];

    const cameraDataRows = camerasdatacontext.map(camera => ({
      Area: camera.area,
      "Sub Area": camera.sub_area || "All",
      Status: camera.active==true ? 'Active' : 'InActive' || "Unknown",
      "Camera ID": camera.camera_id,
      "Camera Name": camera.camera_name,
      Modules: (camera.modules || []).map(module => module.module_name || "Unknown").join(', '), // Join module names
      "Last Active": camera.last_active || "N/A",
    }));

    const cameraData = [cameraDataHeader, ...cameraDataRows.map(Object.values)];

    // Combine all data into a single worksheet
    const worksheetData = [
      ...filtersHeading,
      [],
      ...filtersTable,
      [],
      ...totalCamerasData,
      [],
      ...liveCamerasData,
      [],
      ...inactiveCamerasData,
      [],
      ["Camera Data"],
      [],
      ...cameraData,
    ];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CameraConfiguration");

    // Export to Excel
    XLSX.writeFile(workbook, "CameraConfiguration.xlsx");
    }
    else if(current.includes('default')){
      console.log('excel progress', progressContext)
      console.log('accuracy excel', aiAccuracyContext)
      console.log('camera count excel', cameraCountContext)
      console.log('highest alerts excel', highestAlerts)
      console.log('high severity excel', highSeverityContext)
      console.log('heatmap excel', heatdatacontext)
      console.log('alert trend excel', alerttrenddatacontext)
      console.log('dashfilters', dashfiltercontext)

      const filtersHeading = [["Filters"]]; // Heading for Filters
      const filtersColumns = ["Date", "Shift"]; // Column names
      const filtersData = [
        [
          dashfiltercontext?.weekly !== "" ? dashfiltercontext?.weekly : dashfiltercontext.month, // Choose between weekly or monthly
          dashfiltercontext.shift !== "" ? dashfiltercontext.shift : "All", // Display "All" if shift is empty
        ],
      ];
      const filtersSection = [
        ...filtersHeading, // Add the "Filters" heading
        filtersColumns,    // Add column headers ("Date", "Shift")
        ...filtersData,    // Add data for the filters
      ];
            
      const overAllComplianceSection = [["Over All Compliance"], [overAllComplaince]];

      // Modules Data Section
      const modulesDataHeading = [["Modules Data"]];
      const modulesDataHeader = [
        "Name",
        "Alerts",
        "Area Owner",
        "Area with Max Alerts",
        "Sub Area with Max Alerts",
        "Max Alerts",
        "Percentage",
      ];
  
      const modulesDataRows = progressContext.map(module => ({
        Name: module.name,
        Alerts: module.alerts,
        "Area Owner": module.area_owner,
        "Area with Max Alerts": module.area_with_max_alerts,
        "Sub Area with Max Alerts": module.subarea_with_max_alerts,
        "Max Alerts": module.max_alerts,
        Percentage: module.percentage,
      }));
  
      const modulesDataSection = [
        ...modulesDataHeading,
        modulesDataHeader,
        ...modulesDataRows.map(Object.values),
      ];
  
      // Highest Alerts Section
      const highestAlertsHeading = [["Highest Alerts"]];
      const highestAlertsHeader = [
        "Alert Count",
        "Area",
        "Area Owner",
        "Module",
        "Shift Name",
        "Sub Area",
      ];
  
      const highestAlertsRow = {
        "Alert Count": highestAlerts.max_alerts?.alert_count,
        Area: highestAlerts.max_alerts.area,
        "Area Owner": highestAlerts.max_alerts.area_owner,
        Object: highestAlerts.max_alerts.object,
        "Shift Name": highestAlerts.max_alerts.shift_name,
        "Sub Area": highestAlerts.max_alerts.sub_area,
      };
  
      const highestAlertsSection = [
        ...highestAlertsHeading,
        highestAlertsHeader,
        Object.values(highestAlertsRow),
      ];
  
      // High Severity Alerts Section
      const highSeverityHeading = [["High Severity Alerts"]];
      const highSeverityHeader = [
        "Alert Count",
        "Area",
        "Area Owner",
        "Module",
        "Shift Name",
        "Sub Area",
      ];
  
      const highSeverityRow = {
        "Alert Count": highestAlerts.highSeverity.alert_count,
        Area: highestAlerts.highSeverity.area,
        "Area Owner": highestAlerts.highSeverity.area_owner,
        Object: highestAlerts.highSeverity.object,
        "Shift Name": highestAlerts.highSeverity.shift_name,
        "Sub Area": highestAlerts.highSeverity.sub_area,
      };
  
      const highSeveritySection = [
        ...highSeverityHeading,
        highSeverityHeader,
        Object.values(highSeverityRow),
      ];

      const totalCamerasHeading = [["Total Cameras","Live Cameras"]];
      const liveCamerasHeading = [["Live Cameras"]];
      const aiAccuracyHeading = [["AI Accuracy"]];
    
      // Data for Total Cameras and Live Cameras
      const totalCamerasData = [
        [ cameraCountContext.total_cameras,cameraCountContext.active_cameras], // Total Cameras data
        // [ cameraCountContext.active_cameras],  // Live Cameras data
      ];
    
      // Data for AI Accuracy
      const aiAccuracyData = [
        [ aiAccuracyContext], // AI Accuracy data
      ];
    
      // Combine the headings and data into sections
      const totalCamerasSection = [
        ...totalCamerasHeading,
        ...totalCamerasData,
      ];
    
      // const liveCamerasSection = [
      //   ...liveCamerasHeading,
      //   ...totalCamerasData.slice(1), // Skip the first row of Total Cameras to avoid repetition
      // ];
    
      const aiAccuracySection = [
        ...aiAccuracyHeading,
        ...aiAccuracyData,
      ];


      const role = JSON.parse(localStorage.getItem('userData'))?.role_name
      // Heatmap Data Section
      const heatmapHeading = [["Heatmap Data"]];
      const areasMergedHeading = [[""]]; // Add Areas as a merged heading
      let heatmapHeader = []
      if(role=='Area'){
       heatmapHeader = ["", ...heatdatacontext.camera_mapping_id.map((c)=>`Cam ${c.split('-').slice(-1)[0]}`)]; // Columns for areas
       console.log('fire', heatmapHeader)
      }
      else{

        heatmapHeader = ["", ...heatdatacontext.areas]; // Columns for areas
      }
      const heatmapRows = heatdatacontext.data.map(module => [
        module.name, // First column is the module name
        ...module.data.map(value => value == -1 ? '-' : `${value} alerts`), // Append "alert" to each value in module.data
      ]);
      
      const heatmapSection = [
        ...heatmapHeading,
        ...areasMergedHeading, // Add the Areas heading
        heatmapHeader, // Add area names as the header row
        ...heatmapRows, // Add rows for each module
      ];
      
      // Add the merges to span the "Areas" heading across all columns
      const heatmapMerges = [
        {
          s: { r: 2, c: 0 }, // Starting cell (row 3, column 1)
          e: { r: 2, c: heatmapHeader.length - 1 }, // Ending cell (row 3, last column)
        },
      ];

      
  
      // Alert Trend Data Section
      let alertTrendHeader;
if (dashfiltercontext?.weekly !== "") {
  // If weekly is defined, show days of the week
  alertTrendHeader = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
} else if (dashfiltercontext.month !== "") {
  // If monthly is defined, calculate dates for the month
  const month = dashfiltercontext.month; // Format: YYYY-MM
  const year = parseInt(month.split("-")[0], 10); // Extract year
  const monthIndex = parseInt(month.split("-")[1], 10) - 1; // Month index for Date object (0-based)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate(); // Get days in the month

  // Generate complete dates in MM-DD format
  alertTrendHeader = [
    "",
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const day = (i + 1).toString().padStart(2, "0"); // Ensure two-digit day (e.g., 01, 02)
      const monthString = (monthIndex + 1).toString().padStart(2, "0"); // Ensure two-digit month
      return `${monthString}-${day}`; // Format as MM-DD
    }),
  ];
}

      // Map the alert trend data into rows
      let alertTrendRows = []
     if(alerttrenddatacontext){

        alertTrendRows = alerttrenddatacontext?.map(module => [
         module?.name, // Module name as the first column
         ...module?.data, // Data for the 7 days as subsequent columns
       ]);
     }
     
      
      // Combine the header and rows into a section
      const alertTrendSection = [
        ["Alert Trend Data"], // Add section heading
        alertTrendHeader, // Add column headers (days of the week)
        ...alertTrendRows, // Add rows with module names and their respective data
      ];
  
      // Combine all data into one worksheet
      const worksheetData = [
        ...filtersSection, // Add Filters Section at the top
  [],
        ...overAllComplianceSection,
        [],
        ...modulesDataSection,
        [],
        ...totalCamerasSection,
        // [],
        // ...liveCamerasSection,
        [],
        ...aiAccuracySection,
        [],
        ...highestAlertsSection,
        [],
        ...highSeveritySection,
        [],
        ...heatmapSection,
        [],
        ...alertTrendSection,
      ];
  
      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const boldStyle = { font: { bold: true } };

      // Bold the "Alert Trend Data" heading
      worksheet["A1"].s = boldStyle;
      
      // Bold the column headers (row 2)
      alertTrendHeader.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 1, c: colIndex }); // Row 2, all columns
        if (worksheet[cellAddress]) {
          if (!worksheet[cellAddress].s) {
            worksheet[cellAddress].s = {}; // Initialize the style object
          }
          worksheet[cellAddress].s.font = { bold: true }; // Apply bold style
        }
      });
      
      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DefaultContext");
  
      // Export to Excel
      XLSX.writeFile(workbook, "Dashboard.xlsx");
    }
    else if (current.includes('targets')) {
      console.log('excel filters', targetFiltersContext);
      console.log('excel details', targetDetailsContext);
      console.log('excel compliance', compliancechartcontext);
      console.log('excel alert', alertchartcontext);
      const calculateReduction = (total, current) => {
        if (!current) {
          return 0;
        }
        if (total > 0) {
          const percentage = ((total - current) / total) * 100;
          return Math.round(percentage / 5) * 5; // Round to the nearest multiple of 5
        }
        return 0; // Return 0 if total is 0 to avoid divide-by-zero errors
      };
      // Filter Section
      const filterHeading = [["Filters"]]; // "Filter" as the column heading
    
      // Get the week value from targetFiltersContext
      const weekValue = targetFiltersContext.week !== "" ? targetFiltersContext.week : "No Week Selected"; // Default if not set
      
      // Create the data with the week value below the header
      const filterData = [
        ["Week", weekValue], // Week value below the header
      ];
    
      // Combine the Filter heading and data
      const filterSection = [
        ...filterHeading,
        
        ...filterData,
      ];
    
      // Compliance Chart Section (Targets and Alerts)
      const currentWeek = targetFiltersContext.week;
      const previousWeek = getPreviousWeek(currentWeek); // Function to get the previous week

    const complianceHeading = [["Compliance Targets"]]
      // Create the headings for the columns
      const complianceChartHeader = ["", `Week ${previousWeek}`, `Week ${currentWeek.split("-W")[1]}`]; // Week headings
      
      // Create the rows for "Targets" and "Alerts"
      const complianceChartRows = compliancechartcontext.map(item => [
        item.name, // "Target" or "Alerts"
        ...item.data, // Add the data values for the current and previous weeks
      ]);
      
      // Combine the header and rows for Compliance Targets
      const complianceChartSection = [
        complianceHeading,
        
        complianceChartHeader, // Column headings for Week and Previous Week
        ...complianceChartRows, // Add the rows for Targets and Alerts
      ];
      
      const alertCountHeading = [["Alert Count"]]; // Heading for Alert Count

      // Categories (columns) from alertchartcontext.categories
      const categories = alertchartcontext[2].categories;
      console.log('these are categoress', alertchartcontext[2])
    
      // Data for "Target" and "Alerts"
      const alertDataRows = alertchartcontext.slice(0, 2).map(item => [
        item.name, // "Target" or "Alerts"
        ...item.data.map(value => value === null ? '-' : value) // Add data values for the categories
      ]);
    
      // Combine the Alert Count heading, categories, and rows for Target and Alerts
      const alertCountSection = [
        ...alertCountHeading, // Add "Alert Count" heading
        ["", ...categories], // Add categories as columns
        ...alertDataRows,    // Add rows for Target and Alerts
      ];
    
      
      
      // Prepare the Factory Targets Section
      const factoryTargetsHeading = [["Area Targets"]]; // Heading for Factory Targets
      
      // Define column headings for each Area ID
      const areaIds = targetDetailsContext.map(item => item.area_id); // Extract Area IDs
      
      // Add "Percentage Deduction" to the column headers
      const factoryTargetsColumns = ["Area", "Current Week Targets", "Current Week Alerts","Last Week Targets","Last Week Alerts", "% Deduction", ""]; // New column for Percentage Deduction
      const factoryAlertsColumns = ["Area ID", "Current Week", "Last Week"];
      
      // Prepare rows for Targets under each Area ID
      const factoryTargetsRows = targetDetailsContext.map(item => {
        const percDed = calculateReduction(item.last_week.alerts, item.current_week.target); // Calculate the percentage deduction
        return [
          item.area_id,               // Area ID
          item.current_week.target || 'N/A',   // Current Week Target
          item.current_week.alerts || 'N/A',
          item.last_week.target || 'N/A',
          item.last_week.alerts || 'N/A',
        
          percDed,                    // Percentage Deduction
        ];
      });
      
      // Prepare rows for Alerts under each Area ID
      const factoryAlertsRows = targetDetailsContext.map(item => [
        item.area_id,                // Area ID
        item.current_week.alerts,    // Current Week Alerts
        item.last_week.alerts,       // Last Week Alerts
      ]);
      
      // Combine the "Factory Targets" heading, column headers, and data rows
      const factoryTargetsSection = [
        ...factoryTargetsHeading,       // Add "Factory Targets" heading
        factoryTargetsColumns,          // Add column headers (Area IDs, Current Week, Last Week, Percentage Deduction)
        ...factoryTargetsRows,          // Add rows for Targets
                // Add rows for Alerts
      ];

  // Combine all sections (Filter, Alert Count, and Factory Targets) into one worksheet
  const worksheetData = [
    ...filterSection,         // Add Filter Section at the top
    [],                        // Add an empty row for separation
    ...complianceChartSection,
    []
,    ...alertCountSection,      // Add Alert Count Section below
    [],                        // Add an empty row for separation
    ...factoryTargetsSection,  // Add Factory Targets Section below
  ];
    
      // Create a worksheet from the combined sections
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
      // Apply bold style to headers (Filter and Compliance Chart Headers)
      // const boldStyle = { font: { bold: true } };
    
      // // Bold "Filter" heading
      // worksheet["A1"].s = boldStyle;
    
      // // Bold "Compliance Chart" headers (current and previous week headers)
      // complianceChartHeader.forEach((_, colIndex) => {
      //   const cellAddress = XLSX.utils.encode_cell({ r: 1, c: colIndex }); // Row 2, all columns
      //   if (worksheet[cellAddress]) {
      //     if (!worksheet[cellAddress].s) {
      //       worksheet[cellAddress].s = {}; // Initialize the style object
      //     }
      //     worksheet[cellAddress].s.font = { bold: true }; // Apply bold style
      //   }
      // });
    
      // Create a new workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Combined Report");
    
      // Export to Excel file
      XLSX.writeFile(workbook, "ComplianceReport.xlsx");
    
      // Helper function to get the previous week (simple example, assumes week is just a number)
      function getPreviousWeek(week) {
        // Extract the week number from the format "YYYY-WXX"
        const weekNumber = parseInt(week.split("-W")[1], 10); // Extract week number after "W"
        
        // Calculate the previous week number
        const previousWeekNumber = weekNumber - 1;
      
        // If the week number is less than 1, handle it as overflow (e.g., Week 1 -> Week 52)
        if (previousWeekNumber < 1) {
          return `52`; // Adjust this if necessary based on your specific year logic
        }
      
        // Return the previous week number, ensuring it's always two digits
        return previousWeekNumber.toString().padStart(2, "0");
      }
      
    }
    
    
  
      

  
     else {
      // Mapping for routes and their corresponding download details
      const downloadMap = {
        global: { url: LiveAnalysis, fileName: 'LiveAnalytics' },
        reports: { url: Reports, fileName: 'Reports.xlsx' },
        targets: { url: TargetControl, fileName: 'TargetandControl.xlsx' },
        // live_alerts: { url: LiveAlert, fileName: 'LiveAlert.xlsx' },
        // camera_configuration: { url: CameraConfig, fileName: 'CameraConfiguration.xlsx' }
      };

      // Generic function to create and trigger a download
      const triggerDownload = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      if (currentRoute) {
        const downloadInfo = downloadMap[currentRoute];
        if (downloadInfo) {
           toast.success("Downloading started");
          console.log(modelandreports,'from context')
          // triggerDownload(downloadInfo.url, downloadInfo.fileName);
        } else {
          errorToast('Error: Route configuration not found for download');
        }
      } else {
        errorToast('Error: No valid route found for download');
      }
    }
  };

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotificationDropDown(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef])

useEffect(() => {
   if(modal==false){
    setNewFilters({
      ...newFilters,
      date: todayy,
      month:'',
      week:'',
    });
    setDuration('daily');
    setSelectedDate(todayy)
   }
}, [modal])
 
useEffect(() => {
  const current = location.pathname.split('/');
  setcurrentPage(current);
}, [location.pathname])

  return (
    <li className="onhover-dropdown"

    >
      <div
        className="notification-box"
        onClick={() => setNotificationDropDown(!notificationDropDown)}
      >
        <Download size={20} />
        <span className="badge rounded-pill badge-secondary">
          {totalNotifications}
        </span>
      </div>
      <div
        ref={dropdownRef}
        className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active showForSelectEmail" : ""
          }`
        }
      >
        <h6 className="f-18 mb-0 dropdown-title">Download Options</h6>
        <ul>
          <li onClick={handlePDFdownload} className="b-l-primary border-4">
            <p>
              Download PDF{" "}
              <span>
                <Type color={"#1e67d6"} size={18} />
              </span>
            </p>
          </li>
          {!currentPage?.includes('support') ?  
          <li onClick={handleExcelDownload} className="b-l-success border-4">
            <p>
              Download Excel
              <span className="font-success">
                <FileText color={"#1e67d6"} size={18} />
              </span>
            </p>
          </li>
          :null}
          <li onClick={() => handleClick('email')} className="b-l-danger border-4">
            <p>
              Send as Email
              <span>
                <Mail color={"#1e67d6"} size={18} />
              </span>
            </p>
          </li>
          {show && <form className="mt-3" onSubmit={handleSubmit(handleSubmitEmail)}>

            {/* <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} /> */}
            <Label className="text-start" for="email">Email</Label>
            <FormGroup className="d-flex justify-content-between gap-2">
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    placeholder="Enter your email"
                    onClick={() => setNotificationDropDown(true)}
                  />
                )}
              />

              <Button color="light" className="download-btn-noti">
                <Send color='#ffffff' style={{ color: 'white' }} className="send-btn-noti" />
              </Button>

            </FormGroup>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}

          </form>
          }
        </ul>

        {/* modal */}
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Download Accuracy Report</ModalHeader>
            <ModalBody style={{ paddingInline: '25px' }}>
              <FormGroup>
                <Label for="durationSelect">Choose a duration:</Label>
                <Input type="select" name="duration" id="durationSelect" value={duration} onChange={handleDurationChange}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Input>
              </FormGroup>
              {duration === 'daily' && (
                <Input
                  type="date"
                  name="date"
                  value={selectedDate}
                  max={todayy}
                  onChange={(e) => handleDateChange(e, 'daily')}
                />
              )}
              {duration === 'weekly' && (
                <Input
                  type="week"
                  name="week"
                  max={currentWeek}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e, 'weekly')}
                />
              )}
              {duration === 'monthly' && (
                <Input
                  type="month"
                  name="month"
                  max={currentYear}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e, 'monthly')}
                />
              )}
            </ModalBody>
            <ModalFooter>
              {loading ? <PulseLoader /> : <>
                <Button color="primary" onClick={() => { fetchdataforTECHQA(); }}>Download</Button>{' '}
                <Button color="secondary" onClick={() => {
                  setSelectedDate(todayy);
                  toggle();
                }}>Cancel</Button>
              </>}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </li>
  );
};

export default DownloadButton;
