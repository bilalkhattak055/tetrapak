import React, { Fragment,useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import DataTableModel from "./Components/DataTable";
import AllFilters from "../../../Common/allFilters/AllFilters";
import { useState, useRef } from "react";
import { shifts, weeks } from "../../../../Data/staticData/data";
import { H3, H4, H5 } from "../../../../AbstractElements";
import TotalAlerts from "./Components/Charts/TotalAlerts";
import ModelChart from "./Components/Charts/ModelChart";
import CameraImage from "../../../../assets/images/cameras/camera.jpeg";
import { useEffect } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import AIModal from "./Components/Modal/AIModal";
import {
  area1,
  areaaa,
  dateChoose,
  SA,
  StaticDataForAO6,
} from "./Components/data/staticData";
import "./custom.css";
import { toast } from "react-toastify";
import { errorToast, getWeek } from "../../../../_helper/helper";
import { Typeahead } from "react-bootstrap-typeahead";
import SingleImage from "../../../../Gallery/zoomin/SingleImage";
import DateFilter from "./Components/Dates/DateFilter";
import ModelCards from "./Components/AIModelCards/ModelCards";
import axios from "axios";
import ImageZoom from "../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom";
import html2pdf from "html2pdf.js";
import AreaService from "../../../../api/areaService";
import Unilog from "../../../../assets/images/logo/uni-logo.jpeg";
import Disrupt from "../../../../assets/images/logo/disrupttt.png";
import PptxGenJS from "pptxgenjs";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import ModelCardsForArea from "./Components/AIModelCards/ModelCardsForArea";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import { Filter } from "react-feather";
import { getCurrentWeek } from "../../../../utils/currentWeekWithYear";
import NewCards from "./Components/AIModelCards/NewCards";
import liveAlertContext from '../../../../_helper/formData/LiveAlert/LiveAlert';
import { formatMonth, formatMonth2, formatWeek } from "../../../../utils/formatDate";

const AIModelAndReportsScreen = ({ area: areaD }) => {
  const today = new Date().toISOString().split("T")[0];
  let area_id = undefined;
  const [isOpen, setIsOpen] = useState(false);
  const pageRef = useRef();
  const [modal, setModal] = useState(false);
  const [sub, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Week");
  const style = {
    minWidth: "182px",
    width: "182px",
    maxWidth: "182px",
    height: "38px",
    fontSize: 13,
  };
  const [dateShow, setDateShow] = useState(false);
  const [monthShow, setMonthShow] = useState(false);
  const [weeklyShow, setWeeklyShow] = useState(true);
  const [customDate, setCustomDate] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [loader, setLoader] = useState(true);
  const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  const userID = JSON.parse(localStorage.getItem('userData'))?.id || 0
  const areaIDfromLocal = JSON.parse(localStorage.getItem('userData'))?.area_ids?.id
  const { setmodelandreports,modelandreports } = useContext(liveAlertContext);

  const [chartsData, setChartsData] = useState({
    totalAlertsChart: [],
    modelAccuracyChart: [
      { name: "Helmet", value: 98 },
      { name: "Vest", value: 85 },
      { name: "Emergency Exit", value: 60 },
      { name: "Machine Guard", value: 90 },
      { name: "MMHE", value: 80 },
    ],
  });
  const [newCards, setnewCards] = useState({})
  const filterCardRef = useRef(null);
  const filterButton = useRef(null);

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Get the first day of the year
    const firstDayOfYear = new Date(year, 0, 1);
    const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;

    // Calculate the current week number
    const currentWeekNumber = Math.ceil(
      (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
    );

    // Return the formatted value in YYYY-Wxx format
    return `${year}-W${currentWeekNumber.toString().padStart(2, "0")}`;
  };
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeek(now);
  const maxWeek = `${year}-W${String(week).padStart(2, "0")}`;
  const currentWeekk = getCurrentWeek();

  // const currentWeekk = getCurrentWeek();

  const [filters, setFilters] = useState({
    areas: areaD ? [JSON.parse(localStorage.getItem("userData"))?.area_ids?.name] : [],
    shifts: [],
    date: "",
    week: currentWeekk,
    month: "",
    starting: "",
    ending: "",
  });
console.log('aread', area_id)
  useEffect(() => {
    let getfils = JSON.parse(localStorage.getItem('aifilters'))
      
      if(!getfils) {
       localStorage.setItem('aifilters',JSON.stringify(filters))
      }
      const fils = JSON.parse(localStorage.getItem('aifilters'))
     if(fils.areas.length>0 || fils.shifts.length>0 || fils.date!=='' || fils.month!=='' || fils.week!==currentWeekk || fils.starting!=='' || fils.ending!==''){
      setShowButtons(true)
     }
      if (fils.month!=='') {
      setMonthShow(true);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
      setSelectedOption('Month')
    } else if (fils.date!=='') {
      setMonthShow(false);
      setDateShow(true);
      setWeeklyShow(false);
      setCustomDate(false);
      setSelectedOption('Daily')

    } else if (fils.week!=='' ) {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(true);
      setCustomDate(false);
      setSelectedOption('Week')

    } else if (fils.starting!=='' || fils.ending!=='') {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(true);
      setSelectedOption('Custom')

    }
     
    }, [])

 
  const leftChartRef = useRef(null);
  const rightChartRef = useRef(null);
  const cardRef = useRef(null)
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterCardRef.current &&
        filterButton.current &&
        !filterCardRef.current.contains(event.target) &&
        !filterButton.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    }

    // Add event listener to detect clicks outside of the element
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);
  

  const [isGenerating, setIsGenerating] = useState(false);

  const graphsContainerRef = useRef();

  let print = false;

  function handleButton(type) {
    if (type == "pdf") {
      print = false;
    } else if (type == "print") {
      print = true;
    }
    handlePdfDownload();
  }

  const handlePdfDownload = async () => {
    toast.success("Operation Loading");
    try {
      setIsGenerating(true);

      // Initialize PDF with better default font
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
      pdf.text("AI Model Reports", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;

      // Selected Filters section
      // Selected Filters section
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Selected Filters", margin, yOffset);
      yOffset += 10;

      // Display each filter in a cleaner format
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      // Iterate over each filter
      Object.entries(filters).forEach(([key, value]) => {
        if (value.length > 0) {
          // Capitalize key and join array values if necessary
          const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
          const displayValue = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          // Add each filter entry as a separate line
          pdf.text(`${displayKey}: ${displayValue}`, margin + 5, yOffset);
          yOffset += 8;
        }
      });
      yOffset += 15;

      // Left Chart Section
      if (leftChartRef.current) {
        checkPageBreak(100); // Adjusted height check for chart
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Summary of Alerts", margin, yOffset);
        yOffset += 10;

        const canvas = await html2canvas(leftChartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 20;
      }

      // Right Chart Section
      if (rightChartRef.current) {
        checkPageBreak(100); // Adjusted height check for chart
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Accuracy of AI Models", margin, yOffset);
        yOffset += 10;

        const canvas = await html2canvas(rightChartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 20;
      }


      // if (cardRef.current) {
      //   checkPageBreak(100); // Adjusted height check for chart
      //   pdf.setFontSize(14);
      //   pdf.setFont("helvetica", "bold");
      //   pdf.text("Modules Details", margin, yOffset);
      //   yOffset += 10;

      //   const canvas = await html2canvas(cardRef.current, { scale: 2 });
      //   const imgData = canvas.toDataURL("image/png");
      //   const imgWidth = pageWidth - 2 * margin;
      //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

      //   pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
      //   yOffset += imgHeight + 20;
      // }

      // Area Owner Details section
      // Area Owner Details section
      checkPageBreak(40);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text("Module Details", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 5;


      console.log('pdfing', newCards)

      // Object.keys(newCards)?.forEach((area) => {
      //   checkPageBreak(60);

      //   const areaBoxWidth = pageWidth - 2 * margin;
      //   const areaBoxHeight = area.SubAreas.length * 25 + 30;
      //   let areaYPosition = yOffset;
      //   let isFirstPageForArea = true;

      //   // Function to add background and only area details on the first page
      //   const addAreaBackgroundAndDetails = (height, includeHeader = false) => {
      //     pdf.setFillColor(248, 250, 252);
      //     pdf.roundedRect(
      //       margin,
      //       areaYPosition,
      //       areaBoxWidth,
      //       height,
      //       3,
      //       3,
      //       "F"
      //     );

      //     if (includeHeader) {
      //       // Area Name
      //       pdf.setFontSize(14);
      //       pdf.setFont("helvetica", "bold");
      //       pdf.text(`Area: ${area.AreaName}`, margin + 5, areaYPosition + 10);

      //       // Owner Name
      //       pdf.setFontSize(12);
      //       pdf.setFont("helvetica", "normal");
      //       pdf.text(
      //         `Owner: ${area.AreaOwner}`,
      //         margin + 5,
      //         areaYPosition + 15
      //       );

      //       isFirstPageForArea = false; // Set to false after adding header for the first time
      //     }
      //   };

      //   // Draw initial area box with header details
      //   addAreaBackgroundAndDetails(areaBoxHeight, isFirstPageForArea);

      //   // Adjust initial sub-area position based on header height
      //   let subAreaOffset = areaYPosition + (isFirstPageForArea ? 35 : 15);

      //   area.SubAreas.forEach((subArea) => {
      //     // Check for page break before adding the next sub-area
      //     if (subAreaOffset + 40 > pageHeight - margin) {
      //       pdf.addPage();
      //       addHeaderFooter();
      //       areaYPosition = 40;
      //       subAreaOffset = areaYPosition + 15;

      //       // Redraw background on new page without header
      //       addAreaBackgroundAndDetails(areaBoxHeight, false); // Background only, no header
      //     }

      //     // Add sub-area name
      //     pdf.setFont("helvetica", "bold");
      //     pdf.text(
      //       `• ${subArea.SubAreaName.split(" ")
      //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      //         .join(" ")}`,
      //       margin + 10,
      //       subAreaOffset + 10
      //     );

      //     // Add Cameras and Compliance details below the sub-area name
      //     pdf.setFont("helvetica", "normal");
      //     pdf.text(
      //       `Cameras: ${subArea.Cameras || subArea.Cmaeras}`,
      //       margin + 15,
      //       subAreaOffset + 16
      //     );
      //     pdf.text(
      //       `Compliance: ${subArea.Compliance || "N/A"}`,
      //       margin + 15,
      //       subAreaOffset + 22
      //     );

      //     subAreaOffset += 25; // Move Y position down for the next sub-area
      //   });

      //   yOffset = subAreaOffset + 10; // Adjust Y for the next area section
      // });

      // Save or Print the PDF
     
     
      const areaLabels = {
        Helmet: "Helmet",
        Vest: "Vest",
        emergency_exit_blockage: "Emergency Exit",
        forklift_person_in_same_aisle: "MMHE",
        machine_guard_open: "Machine Guard",
      };
      
      Object.keys(newCards)?.forEach((areaKey) => {
        const area = newCards[areaKey];
        checkPageBreak(60);
      
        const areaBoxWidth = pageWidth - 2 * margin;
        const areaBoxHeight = 7 * 25 + 30; // 7 keys, 25 each, + header space
        let areaYPosition = yOffset;
        let isFirstPageForArea = true;

        const mar =10
      
        const addAreaBackgroundAndDetails = (height, includeHeader = false) => {
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(mar, areaYPosition, areaBoxWidth, height, 3, 3, "F");
      
          if (includeHeader) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(`Module: ${areaLabels[areaKey]}`, margin, areaYPosition + 10);
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "normal");
            // pdf.text(`Owner: ${area.AreaOwner || 'N/A'}`, margin + 5, areaYPosition + 15);
            isFirstPageForArea = false;
          }
        };
      
        addAreaBackgroundAndDetails(areaBoxHeight, isFirstPageForArea);
        let subAreaOffset = areaYPosition + (isFirstPageForArea ? 35 : 15);
      
        const dataToDisplay = [
          { label: "Total Cameras", value: area.total_cameras },
          { label: "Total Frames", value: area.total_frames },
          { label: "Total Events", value: area.total_event },
          { label: "Total Compliance", value: area.total_compliance },
          { label: "Compliance%", value: `${area.total_compliance_percentage || 0}%` },
          { label: "Non Compliance", value: area.total_alerts },
        ];
      
        dataToDisplay.forEach((item) => {
          if (subAreaOffset + 40 > pageHeight - margin) {
            pdf.addPage();
            addHeaderFooter();
            areaYPosition = 40;
            subAreaOffset = areaYPosition + 15;
            addAreaBackgroundAndDetails(areaBoxHeight, false);
          }
      
          pdf.setFont("helvetica", "bold");
          pdf.text(
            `• ${item.label}:`,
            margin + 5,
            subAreaOffset + 5
          );
      
          pdf.setFont("helvetica", "normal");
          pdf.text(
            `${item.value || 'N/A'}`,
            margin + 50,
            subAreaOffset + 5
          );
      
          subAreaOffset += 15;
        });
      
        yOffset = subAreaOffset + 10;
        if (area.camera_data?.length) {
          const tableStartY = subAreaOffset + 10;
          const tableHeaders = ["Camera Name", "Sub Area", "Event", "Frame", "Compliance", "Compliance%", "Non-Compliance"];
          const colWidths = [40, 45, 15, 15, 25, 25, 40];
      
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "bold");
      
          // Draw table header
          let xPosition = margin + 5;
          tableHeaders.forEach((header, index) => {
            pdf.text(header, xPosition-10, tableStartY);
            xPosition += colWidths[index];
          });
      
          let rowY = tableStartY + 10;
          pdf.setFont("helvetica", "normal");
      
          // Draw table rows
          area.camera_data.forEach((camera) => {
            if (rowY + 20 > pageHeight - margin) {
              pdf.addPage();
              addHeaderFooter();
              rowY = 40;
            }
      
            xPosition = margin + 5;
            let newmar = colWidths[0] - 3
            let newmar2 = colWidths[1] - 3
            const rowData = [
              pdf.splitTextToSize(camera.camera_name, newmar),
              pdf.splitTextToSize(camera.sub_area_name, newmar2),
              camera.event,
              camera.frame,
              camera.compliances,
              `${camera.compliance_percentage || 0}%`,
              camera.alerts,
            ];
      
            rowData.forEach((data, index) => {
              if (Array.isArray(data)) {
                data.forEach((line, i) => {
                  pdf.text(`${line || 'N/A'}`, xPosition-10, rowY + (i * 5));
                });
              } else {
                pdf.text(`${data || 'N/A'}`, xPosition-10, rowY);
              }
              xPosition += colWidths[index];
            });
      
            rowY += 10;
          });
          yOffset = rowY + 10;
        }
      });
      
     
     
     
     
     
     
      const pdfBlob = pdf.output("blob");
      if (print) {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const newWindow = window.open(pdfUrl);
        newWindow.onload = () => {
          newWindow.print();
        };
      } else {
        pdf.save("AI_Model_Reports.pdf");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    handlePdfDownload(true); // Pass `true` to print the PDF directly
  };

  function toggleModal() {
    setModal(!modal);
    setSubmit(false);
  }

  const handleDateDrop = (e) => {
    setSelectedOption(e.target.value); // Update the dropdown value based on user selection
    setShowButtons(true);
    if (e.target.value == "Duration") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Month") {
      setMonthShow(true);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Daily") {
      setMonthShow(false);
      setDateShow(true);
      setWeeklyShow(false);
      setCustomDate(false);
    } else if (e.target.value == "Week") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(true);
      setCustomDate(false);
    } else if (e.target.value == "Custom") {
      setMonthShow(false);
      setDateShow(false);
      setWeeklyShow(false);
      setCustomDate(true);
    }
  };

  const [identifier, setIdentifier] = useState("");

  // To handle changes in the Typeahead
  const handleInputChange = (e, field) => {
    setShowButtons(true);
    let value = e.target.value;
    if (field === "week" && value) {
      // When a week is selected, clear both date, month, and custom date range fields
      setIdentifier("week");
      setFilters((prevFilters) => {
        const update ={
        ...prevFilters,
        week: value,
        date: "", // Clear the date
        month: "", // Clear the month
        starting: "", // Clear starting date
        ending: "", // Clear ending date
        }
        localStorage.setItem('aifilters',JSON.stringify(update))
        return update
      });
    } else if (field === "month" && value) {
      setIdentifier("month");
      setFilters((prevFilters) => {
        const update ={
        ...prevFilters,
        week: "",
        date: "", // Clear the date
        month: value, // Clear the month
        starting: "", // Clear starting date
        ending: "", // Clear ending date
        }
        localStorage.setItem('aifilters',JSON.stringify(update))
        return update
      });
    } else if (field === "date" && value) {
      setIdentifier("date");
      setFilters((prevFilters) => {
        const update ={
        ...prevFilters,
        week: "",
        date: value, // Clear the date
        month: "", // Clear the month
        starting: "", // Clear starting date
        ending: "", // Clear ending date
        }
        localStorage.setItem('aifilters',JSON.stringify(update))
        return update
      });
    } else if (field === "starting" || field === "ending") {
      // When a custom date range is selected, clear date, month, and week
      setIdentifier("custom");
      setFilters((prevFilters) => {
        const update ={
        ...prevFilters,
        [field]: value,
        week: "",
        date: "", // Clear the date
        month: "", // Clear the month
        }
        localStorage.setItem('aifilters',JSON.stringify(update))
        return update
      });
    } else {
      setFilters((prevFilters) => {
        const update ={
        ...prevFilters,
        [field]: value,
        }
        localStorage.setItem('aifilters',JSON.stringify(update))
        return update
      });
    }
  };
  const typeHeadChange = (field, selected) => {
    setShowButtons(true);
    setFilters((prevFilters) => {
      const update ={
      ...prevFilters,
      [field]: field=='areas' ? selected.map((a)=>a.split(',')[0]) : selected
      }
      localStorage.setItem('aifilters',JSON.stringify(update))
      return update
    });
  };

  const addRandomCompliance = (areas) => {
    return areas?.map((area) => ({
      ...area,
      SubAreas: area?.SubAreas?.map((subArea) => ({
        ...subArea,
        Compliance: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // Generate a random number between 50 and 100
      })),
    }));
  };

  // Adding random Compliance to area1 data
  const updatedArea1 = addRandomCompliance(area1);

  const [imageData, setImageData] = useState({});

  const [showModal, setShowModal] = useState(false);

  function handleCardClick(item) {
    setImageData({
      cameraName: undefined,
      violation: item.violation,
      areaName: item.AreaName,
      areaOwner: item.AreaOwner,
      subareas: item.SubAreas,
      date: item?.date,
      time: item?.time,
    });
    setShowModal(!showModal);
  }

  const [lastFilter, setLastFilter] = useState(null);
  // const defaultData = chartsData.totalAlertsChart
  const [alertsData, setAlertsData] = useState([]);
  const [totalAlerts, setTotalAlerts] = useState();
  const [series2, setSeries2] = useState([]);
  const [reset, setReset] = useState(false);
  const [allarea, setallarea] = useState([]);
  const [allData, setAllData] = useState([]);
  const [costantAIAccuracy, setcostantAIAccuracy] = useState();

 
  useEffect(() => {
    if (areaD) {
      area_id = JSON.parse(localStorage.getItem("userData"))?.area_ids?.name;
    }

    const fetchData = async () => {
      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${month}/${day}/${year}`;
      };

      const fils = JSON.parse(localStorage.getItem('aifilters'))
      if(!fils) {
        localStorage.setItem('aifilters',JSON.stringify(filters))
      }
      else {
        setFilters(fils)
      } 
      const payload = {
        safety_area: area_id ? [area_id] : fils?.areas,
        factory_id:factoryID,
        shift: fils?.shifts,
        start_date: fils.starting !== '' ? formatDate(fils.starting) : fils.date === '' ? '' : formatDate(fils.date),
        end_date: fils.ending !== '' ? formatDate(fils.ending) : fils.date === '' ? '' : formatDate(fils.date),
        week: fils?.week,
        month: fils?.month,
      };

      // const payload2 = {
      //   safety_area: area_id ? [area_id] : fils?.areas,
      //   factory_id:factoryID,
      //   shift: fils?.shifts,
      //   start_date: fils.starting !== '' ? formatDate(fils.starting) : fils.date === '' ? '' : formatDate(fils.date),
      //   end_date: fils.ending !== '' ? formatDate(fils.ending) : fils.date === '' ? '' : formatDate(fils.date),
      //   week: fils?.week,
      //   month: fils?.month
      // };

      const payload2 = {
        user_id: 1,
        factory_id:factoryID,
        identifier:
          fils.date !== ""
            ? "date"
            : fils.week !== ""
              ? "week"
              : fils.month !== ""
                ? "month"
                : fils.starting !== "" && fils.ending !== ""
                  ? "custom"
                  : "no date",
        filters: fils,
        pagination: {
          page_no: 1,
          per_page: 21,
        },
      };

      const payload1 = {
        safety_area: area_id ? [area_id] : fils?.areas,
        shift: fils?.shifts,
        factory_id:factoryID,
        start_date: "",
        end_date: "",
        week: fils?.week,
        month: fils?.month 
      };

      const payload3 = {
        area_id : areaD ? areaIDfromLocal : '',
        factory_id:factoryID,
        user_id: userID,
        week: fils?.week,
        shift: fils?.shifts,
        areas: fils?.areas,
        date: fils?.date,
        month: fils?.month,
        starting: fils?.starting,
        ending: fils?.ending
      } 
      try {
        // Wait for all API responses, including fetchArea
        

        // for download excel -------------------x-------------------x-----------------------


      const allres =  await Promise.all([
          // getAlertsCharts(payload),
          ModelAccuracyChart(payload2),
          getAiReportsCardsFunc(payload1), 
          NewCardApi(payload3),

          // fetchArea(),
        ]); 

        if(allres){
          setLoader(false); // Stop loader only when all calls resolve
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false); // Ensure loader stops even if there's an error
      }
    };

    fetchData();

    window.scrollTo({
      top: 0, // Scroll to the top
      left: 0, // Ensure it's the horizontal start as well
      behavior: "smooth", // Smooth scrolling behavior
    });
  }, []);

  

  

  //api calls
  const [modelaccuracy, setmodelaccuracy] = useState(0);

  async function fetchArea() {
    const res = await AreaService.getAreaUserTickets(
      JSON.parse(localStorage.getItem("userData"))?.id
    );

    const mappedAreas =
      res?.data?.data?.areas &&
      res?.data?.data?.areas.map((area) => ({
        ...area,
        label: `${area.area_name}, ${area.area_owner}`,
        disabled: !area.active,
      }));
    // setallarea(mappedAreas);
  }

  async function ModelAccuracyChart(payload) {
    const updatedPayload = {
      ...payload,
      filters: {
        ...payload.filters,
        shift: payload.filters.shifts
      }
    }

    delete updatedPayload.filters.shifts 
    const res = await AreaService.getModelAccuracyChart(updatedPayload);
    const data=res?.data  
    const modifiedData = Object.keys(data.compliance_accuracy).map((key) => ({
      name: key, // Category name
      value: data.compliance_accuracy[key] // Data as array
  })); 
    // let modifiedData = res?.data?.totalAlertsChart?.map((item) => { 
    //   if (item.name === "forklift_person_in_same_aisle") {
    //     item.name = "MMHE";
    //   } else if (item.name === "emergency_exit_blockage") {
    //     item.name = "Emergency Exit";
    //   } else if (item.name === "machine_guard_open") {
    //     item.name = "Machine Guard";
    //   }

    //   return item;
    // }); 
    const nonZeroValues = modifiedData
      ?.map((item) => item.value)
      ?.filter((value) => value !== 0);
    // const totalValues = nonZeroValues?.reduce((acc, item) => acc + item, 0);
    // const average = totalValues / nonZeroValues?.length;
    // const roundedAverage = Math.round(average);
    // Set the average to the state
    // modifiedData.push({
    //   name: 'Avg',
    //   value: roundedAverage
    // });
    // setmodelaccuracy(roundedAverage); 
    if (areaD) {
      modifiedData = modifiedData?.filter(
        (dt) =>
          dt.name.toLowerCase() !== "emergency exit" &&
          dt.name.toLowerCase() !== "machine guard"
      );
    }
    setSeries2(modifiedData);
    setcostantAIAccuracy(data.total_accuracy || null);
    setmodelaccuracy(data.average_accuracy || null)
    
  }

  const factorylogged =  JSON.parse(localStorage.getItem("userData"))?.factory?.name;
  const factoryid =  JSON.parse(localStorage.getItem("userData"))?.factory?.name;
 

  async function getAiReportsCardsFunc(payload) {
    // setLoader(true);
    // const res = await AreaService.getAiReportsCards(payload);

    // let updatedData = res?.data;
    let mappedAreas = [];

    // updatedData = updatedData?.sort((a, b) => {
    //   const numA = parseInt(a.AreaName.split("-")[1], 10);
    //   const numB = parseInt(b.AreaName.split("-")[1], 10);
    //   return numA - numB;
    // });

    // Fetch allarea if not already populated
    const payloadd={
      user_id:JSON.parse(localStorage.getItem("userData"))?.id,
      factory_id:factoryID
    }
    const areaRes = await AreaService.GetAllAreas(factoryID);
    // if (areaRes) {
    //   setLoader(false);
    // } 
    mappedAreas =
      areaRes?.data?.data?.areas.map((area) => ({
        ...area,
        label: `${area.area}, ${area.areaOwner}`,
        // disabled: !area.active,
      })) || [];
    setallarea(mappedAreas);

    // updatedData = updatedData.filter((data) =>
    //   mappedAreas?.some((a) => data.AreaName === a.area_name && a.active)
    // );

    // setAllData(updatedData);
  }
 
  async function NewCardApi(payload){
 
    try {
      const res = await AreaService.getAINewCards(payload); 
   
      // setLoader(false) 
      setnewCards(res?.data);
      const summaryChartData = res?.data 
      ? Object.keys(res.data).map(category => ({
          name: category, // Category name like "Helmet", "Gloves", etc.
          data: res.data[category].total_alerts // Extract total alerts for each category
      })) 
      : []; 
      const totalSum = summaryChartData.reduce((sum, item) => sum + item.data, 0);
      setTotalAlerts(totalSum);
      setAlertsData(summaryChartData);
    } catch (error) {
      errorToast('Error while fetching')
    }  
}

  async function getAlertsCharts(payload) {
    const res = await AreaService.getAlertsChart(payload); 
    const desiredOrder = [
      "Emergency Exit",
      "MMHE",
      "Helmet",
      "Vest",
      "Machine Guard",
    ];
    let sortedData = res?.data?.totalAlertsChart?.sort((a, b) => {
      return (
        desiredOrder.indexOf(a?.category) - desiredOrder.indexOf(b?.category)
      );
    });
    if (areaD) {
      sortedData = sortedData?.filter(
        (it) =>
          it.category.toLowerCase() !== "emergency exit" &&
          it.category.toLowerCase() !== "machine guard"
      );
    }
    
    const totAlerts = sortedData?.reduce((acc, curr) => acc + curr.value, 0); 
    setTotalAlerts(totAlerts);
    // setAlertsData(sortedData);
   
  }
  
  async function ApplyFilter() {
 localStorage.setItem('aifilters',JSON.stringify(filters))
 const fils = JSON.parse(localStorage.getItem('aifilters'))

     
    if (dateShow) {
      if (fils?.date == "") {
        errorToast("Choose The Date");
        return;
      }
    } else if (weeklyShow) {
      if (fils?.week == "") {
        errorToast("Choose The Week");
        return;
      }
    } else if (monthShow) {
      if (fils?.month == "") {
        errorToast("Choose The Month");
        return;
      }
    } else if (customDate) {
      if (fils?.starting == "" || fils?.ending == "") {
        errorToast("Choose Both ranges");
        return;
      }
    }
    setLoader(true)

    if (areaD) {
      area_id = JSON.parse(localStorage.getItem("userData"))?.area_ids?.name;
    }

    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };
    const payload = {
      safety_area: area_id ? [area_id] : fils?.areas,
      shift: fils?.shifts,
      factory_id:factoryID,
      start_date:
        fils?.starting !== ""
          ? formatDate(fils?.starting)
          : fils?.date == ""
          ? ""
          : formatDate(fils?.date),
      end_date:
        fils?.ending !== ""
          ? formatDate(fils?.ending)
          : fils?.date == ""
          ? ""
          : formatDate(fils?.date),
      week: fils?.week,
      month: fils?.month,
    };
    const payload3 = {
      area_id : areaD ? areaIDfromLocal : '',
      factory_id:factoryID,
      user_id: userID,
      week:fils?.week,
      shift: fils?.shifts,
      areas: fils?.areas,
      date: fils?.date,
      month: fils?.month,
      starting: fils?.starting,
      ending: fils?.ending
    }

    const payload2 = {
      user_id: 1,
      factory_id:factoryID,
      identifier:
        fils.date !== ""
          ? "date"
          : fils.week !== ""
            ? "week"
            : fils.month !== ""
              ? "month"
              : fils.starting !== "" && fils.ending !== ""
                ? "custom"
                : "no date",
      filters: fils,
      pagination: {
        page_no: 1,
        per_page: 21,
      },
    };

    const allres =  await Promise.all([
      // getAlertsCharts(payload),
      ModelAccuracyChart(payload2),
      getAiReportsCardsFunc(payload),
      NewCardApi(payload3)
      // fetchArea(),
    ]);  

    if(allres){
      setmodelandreports({
        ...modelandreports,
        filters:fils
      })
      setLoader(false); // Stop loader only when all calls resolve
    }
  }

  const shouldShowButton = () => {
    const fils = JSON.parse(localStorage.getItem('aifilters'))
    return (
      fils?.areas.length > 0 ||
      fils?.shifts.length > 0 ||
      fils?.date !== today ||
      fils?.week !== "" ||
      fils?.month !== "" ||
      fils?.starting !== "" ||
      fils?.ending !== ""
    );
  };

  function Reset() {
    setLoader(true)
    setShowButtons(false);
    setReset(!reset);
    setMonthShow(false);
    setWeeklyShow(true);
    setCustomDate(false);
    setSelectedOption("Week");
    setDateShow(false);

    const updatefils= {
      areas: [],
      shifts: [],
      date: "",
      week: currentWeekk,
      month: "",
      starting: "",
      ending: "",
    }
    setFilters({
      areas: [],
      shifts: [],
      date: "",
      week: currentWeekk,
      month: "",
      starting: "",
      ending: "",
    });

    localStorage.setItem('aifilters',JSON.stringify(updatefils))

    const fils = JSON.parse(localStorage.getItem('aifilters'))

    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split("-");
      return `${month}/${day}/${year}`;
    };

    // const payload = {
    //   safety_area: filters.areas ? filters.areas : ['AO-6','AO-7','AO-9'],
    //   shift: filters.shifts ? filters.shifts : ['Shift A', 'Shift B', 'Shift C'],
    //   start_date: formatDate(today),
    //   end_date:  formatDate(today)
    // };
    // const payload2 = {
    //   safety_area: filters.areas ? filters.areas : ['AO-6','AO-7','AO-9'],
    //   shift: filters.shifts ? filters.shifts : ['Shift A', 'Shift B', 'Shift C'],
    //   start_date: formatDate(today),
    //   end_date:  formatDate(today)
    // };
    // console.log('useeffect payload', payload)
    // const payload1 = {
    //   safety_area: filters.areas ? filters.areas : ['AO-6','AO-7','AO-9'],
    //   shift: filters.shifts ? filters.shifts : ['Shift A', 'Shift B', 'Shift C'],
    //   start_date: "",
    //   end_date: "",
    //   week:"",
    //   month: filters.month ? filters.month : currentMonth
    // };
    // getAiReportsCardsFunc(payload1)
    // getAlertsCharts(payload)
    // ModelAccuracyChart(payload2)


    const fetchReset = async () => {
      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${month}/${day}/${year}`;
      };

      const payload = {
        safety_area: area_id ? [area_id] : fils.areas,
        factory_id:factoryID,
        shift: fils.shifts,
        // start_date: filters.starting !== '' ? formatDate(filters.starting) : filters.date === '' ? '' : formatDate(filters.date),
        // end_date: filters.ending !== '' ? formatDate(filters.ending) : filters.date === '' ? '' : formatDate(filters.date),
        week: currentWeekk,
        month: fils.month,
      }; 
      const payload2 = {
        user_id: 1,
        factory_id:factoryID,
        identifier:
          fils.date !== ""
            ? "date"
            : fils.week !== ""
              ? "week"
              : fils.month !== ""
                ? "month"
                : fils.starting !== "" && fils.ending !== ""
                  ? "custom"
                  : "no date",
        filters: fils,
        pagination: {
          page_no: 1,
          per_page: 21,
        },
      };

      const payload1 = {
        safety_area: area_id ? [area_id] : fils.areas,
        shift: fils.shifts,
        factory_id:factoryID,
        start_date: "",
        end_date: "",
        week: currentWeekk,
        month: fils.month ? fils.month : "",
      };

      const payload3 = {
        area_id : areaD ? areaIDfromLocal : '',
        factory_id:factoryID,
        user_id: userID,
        week: fils?.week,
        shift: fils?.shifts,
        areas: fils?.areas,
        date: fils?.date,
        month: fils?.month,
        starting: fils?.starting,
        ending: fils?.ending
      }

      try {
        // Wait for all API responses, including fetchArea
      const allres =  await Promise.all([
          // getAlertsCharts(payload),
          ModelAccuracyChart(payload2),
          getAiReportsCardsFunc(payload1), 
          NewCardApi(payload3),

          // fetchArea(),
        ]); 

        if(allres){
          setLoader(false); // Stop loader only when all calls resolve
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false); // Ensure loader stops even if there's an error
      }
    };

    fetchReset();
  }

  const [email, setEmail] = useState("");

  const handlePPT = async () => {
    const pptx = new PptxGenJS();
    const slideHeightLimit = 6; // Limiting height on each slide to avoid overflow

    // Slide 1: Heading and Logos
    const slide1 = pptx.addSlide();
    slide1.background = { color: "FFFFFF" };

    // slide1.addText("AI Model Reports", {
    //     // Center on a 5.63" tall slide
    //   fontSize: 24,
    //   color: "1E293B",
    //   bold: true,
    //   align:'center',
    //   valign:'middle',
    //   w:'100%',
    //   height:'100%'

    // });
    slide1.addText(
      [
        {
          text: "AI Model Reports",
          options: {
            fontSize: 24,
            color: "1E293B",
            bold: true,
            align: "center",
            valign: "middle",
          },
        },
      ],
      // { x: 1.0, y: 2.5, w: 5, h: 1 }
      { w: "100%", h: "100%" }
    );

    // Add Logos
    slide1.addImage({
      path: Unilog,

      w: "15%",
      h: 1,
    });
    // slide1.addImage({
    //   path: Disrupt,

    //   w: '25%',
    //   x: '73%',
    //   h: 1,
    // });

    // Slide 2: Selected Filters
    const slide2 = pptx.addSlide();
    slide2.background = { color: "FFFFFF" };

    slide2.addText("Selected Filters", {
      x: 0.5,
      y: 0.5,
      fontSize: 20,
      color: "1E293B",
      bold: true,
    });

    let yPosition = 1; // Starting Y position for filter details
    Object.entries(filters).forEach(([key, value]) => {
      const filterText =
        Array.isArray(value) && value.length === 0
          ? "N/A"
          : value
          ? Array.isArray(value)
            ? value.join(", ")
            : String(value)
          : "N/A";

      slide2.addText(
        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${filterText}`,
        {
          x: 0.5,
          y: yPosition,
          fontSize: 14,
          color: "333333",
        }
      );
      yPosition += 0.5;
    });

    // Slide 3: Left Chart Snapshot
    const slide3 = pptx.addSlide();
    slide3.addText("Summary of Alerts", {
      x: 1,
      y: 0.5,
      fontSize: 20,
      color: "1E293B",
      bold: true,
    });

    if (leftChartRef.current) {
      const canvas = await html2canvas(leftChartRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      slide3.addImage({ data: imgData, x: 0.5, y: 1, w: 8, h: 4.5 });
    }

    // Slide 4: Right Chart Snapshot
    const slide4 = pptx.addSlide();
    slide4.addText("Accuracy of AI Models", {
      x: 1,
      y: 0.5,
      fontSize: 20,
      color: "1E293B",
      bold: true,
    });

    if (rightChartRef.current) {
      const canvas = await html2canvas(rightChartRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      slide4.addImage({ data: imgData, x: 0.5, y: 1, w: 8, h: 4.5 });
    }

    // Additional slides for each card in cardsData
    Object.keys(newCards).forEach((key) => {
      const card = newCards[key];
      let slide = pptx.addSlide();
      slide.background = { color: "FFFFFF" };
    
      const areaLabels = {
        Helmet: "Helmet",
        Vest: "Vest",
        emergency_exit_blockage: "Emergency Exit",
        forklift_person_in_same_aisle: "MMHE",
        machine_guard_open: "Machine Guard",
      };
    
      // Display module name as "Area"
      slide.addText(`Module: ${areaLabels[key]}`, {
        x: 0.5,
        y: 0.5,
        fontSize: 20,
        color: "1E293B",
        bold: true,
      });
    
      // Owner section (if available)
      // slide.addText(`Owner: ${card.AreaOwner || "N/A"}`, {
      //   x: 0.5,
      //   y: 1,
      //   fontSize: 16,
      //   color: "333333",
      // });
    
      let yPosition = 1.5;
    
      // Data to display except for camera_data
      const dataToDisplay = [
        { label: "Total Alerts", value: card.total_alerts },
        { label: "Total Cameras", value: card.total_cameras },
        { label: "Total Compliance", value: card.total_compliance },
        { label: "Compliance %", value: `${card.total_compliance_percentage || 0}%` },
        { label: "Total Events", value: card.total_event },
        { label: "Total Frames", value: card.total_frames },
      ];
    
      dataToDisplay.forEach((item) => {
        if (yPosition + 1 > slideHeightLimit) {
          slide = pptx.addSlide();
          yPosition = 0.5;
        }
    
        slide.addText(`${item.label}: ${item.value || 'N/A'}`, {
          x: 0.5,
          y: yPosition,
          fontSize: 14,
          color: "333333",
        });
        yPosition += 0.4;
      });
    
      // Camera Data Table Header
      if (card.camera_data && card.camera_data.length > 0) {
        if (yPosition + 1 > slideHeightLimit) {
          slide = pptx.addSlide();
          yPosition = 0.5;
        }
      
        slide.addText("Camera Data", {
          x: 0.5,
          y: yPosition,
          fontSize: 16,
          bold: true,
          color: "000000",
        });
      
        yPosition += 0.5;
      
        const colWidths = [1.5, 1.5, 1, 1, 1.5, 1.5, 1];  // Widths for each column
        const tableX = 0.5;
        const rowHeight = 0.4;
      
        // Prepare table data (including header)
        const tableRows = [
          [
            { text: "Camera Name", options: { fontSize: 10, bold: true } },
            { text: "Sub Area", options: { fontSize: 10, bold: true } },
            { text: "Event", options: { fontSize: 10, bold: true } },
            { text: "Frame", options: { fontSize: 10, bold: true } },
            { text: "Compliance", options: { fontSize: 10, bold: true } },
            { text: "Compliance %", options: { fontSize: 10, bold: true } },
            { text: "Alerts", options: { fontSize: 10, bold: true } },
          ],
        ];
      
        // Add camera data rows
        card.camera_data.forEach((camera) => {
          tableRows.push([
            { text: camera.camera_name || "N/A", options: { fontSize: 10 } },
            { text: camera.sub_area_name || "N/A", options: { fontSize: 10 } },
            { text: camera.event || "N/A", options: { fontSize: 10 } },
            { text: camera.frame || "N/A", options: { fontSize: 10 } },
            { text: camera.compliances || "N/A", options: { fontSize: 10 } },
            { text: `${camera.compliance_percentage || 0}%`, options: { fontSize: 10 } },
            { text: camera.alerts || "N/A", options: { fontSize: 10 } },
          ]);
        });
      
        // Add table with auto-paging enabled
        slide.addTable(tableRows, {
          x: tableX,
          y: yPosition,
          colW: colWidths,
          rowH: rowHeight,
          border: { pt: 1, color: "000000" },
          autoPage: true,
          autoPageRepeatHeader: true,
          autoPageLineWeight: 1,
          margin: 0.1,
          valign: "middle",
        });
      }
      
      
    });
    
    

    pptx.writeFile("AI_Model_Report_Presentation.pptx");
  };

 useEffect(() => {
  console.log('-----------------x--------------')
    console.log(costantAIAccuracy,'costantAIAccuracy')
    console.log(totalAlerts,'totalAlerts')
    console.log(modelaccuracy,'modelaccuracy')
    console.log(alertsData,'alertsData')
    console.log(newCards,'newCardss for excel')
    console.log(series2,'series2')
  console.log('-----------------x--------------')
  setmodelandreports({
    ...modelandreports,
    totalAccuracy:costantAIAccuracy,
    totalAlerts:totalAlerts,
    summaryofAlerts:alertsData,
    AccuracyOfAiModels:series2,
    AllModulesData:newCards,
    AverageAccuracy:modelaccuracy
  })
 }, [costantAIAccuracy,totalAlerts,modelaccuracy,alertsData,newCards,series2])
 
  return (
    <Fragment>
      {isOpen && (
        <SingleImage
          photo={CameraImage}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <br />

      <div className="p-0 m-0" ref={pageRef}>
        <Container fluid={true}>
          {showModal && (
            <ImageZoom
              // photo={modalData?.image}
              setShowModal={setShowModal}
              photo={CameraImage}
              setIsOpen={setShowModal}
              imageData={imageData}
            />
          )}
          {loader ? (
            <>
              <Loader1 />
            </>
          ) : (
            <>
              <Row className={` my-0 d-flex align-items-start px-1`}>
                <Col xl="6" lg="6" md="6" sm="6" xs="12">
                  <h4 style={{ fontSize: "20px" }}>AI Model and Reports </h4>
                  {console.log("filters_month",filters.month)}
                  <span className="f-light"> {
                  filters.week && formatWeek(filters.week)
                  || 
                  filters.month && formatMonth2(filters.month) 
                  || 
                  filters.starting && `${ filters.starting }  -  ${ filters.ending}` } </span>
                </Col>
                <Col style={{ flexGrow: 0 }}
                  className={` d-flex flex-wrap  justify-content-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end  `}
                  xl="6"
                  lg="6"
                  md="6"
                  sm="6"
                  xs="12"
                >
                  <div
                    type="button"
                    className={`d-flex justify-content-center filter-btnn  ${
                      showFilters && "border_R"
                    }`}
                    ref={filterButton}
                    style={{backgroundColor:"#635470" }}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <p className="m-0" style={{ fontSize: "16px" }}>
                      Filters
                    </p>
                    <span className="d-flex">
                      <Filter color="#fff" size={16} className="ms-2 " />
                    </span>
                  </div>

                  <div className="w-100 d-flex justify-content-end position-relative">
                    {showFilters && (
                      <div
                        style={{ zIndex: "2" }}
                        className={`d-flex align-items-center justify-content-end gap-2 py-3 filter-cardd shadow-sm`}
                        ref={filterCardRef}
                      >
                        <div className="">
                          <DateFilter
                            maxWeek={currentWeekk}
                            allarea={allarea}
                            area={areaD}
                            allData={allData}
                            style={style}
                            shouldShowButton={shouldShowButton}
                            selectedOption={selectedOption}
                            currentWeek={currentWeekk}
                            typeHeadChange={typeHeadChange}
                            filters={filters}
                            handleDateDrop={handleDateDrop}
                            handleInputChange={handleInputChange}
                            dateShow={dateShow}
                            monthShow={monthShow}
                            weeklyShow={weeklyShow}
                            customDate={customDate}
                          />

                          {showButtons && (
                            <>
                              <Button
                                style={{...style, justifySelf:'center'}}
                                className={`mx-2 p-0 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                                onClick={ApplyFilter}
                                color=""
                              >
                                <IoCheckmarkOutline
                                  style={{
                                    color: "#22c65e",
                                    fontSize: "20px",
                                    transform: "rotate(20deg)",
                                  }}
                                />
                                <p
                                  style={{ color: "#22c65e" }}
                                  className="m-0 p-0 "
                                >
                                  {" "}
                                  Accept
                                </p>
                              </Button>
                              <Button
                                style={{...style, justifySelf:'center'}}
                                className={`mx-2 mt-3 rounded-3 shadow-sm d-flex align-items-center justify-content-evenly`}
                                onClick={Reset}
                                color=""
                              >
                                <RxReset
                                  style={{
                                    color: "#4e74d4",
                                    fontSize: "20px",
                                    // transform: "rotate(20deg)",
                                  }}
                                />
                                <p
                                  style={{ color: "#4e74d4" }}
                                  className="m-0 p-0 "
                                >
                                  {" "}
                                  Reset
                                </p>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Card className="p-0 mx-1 mt-3 mb-md-2 md-sm-2">
                <CardBody className="p-0 mb-0 ">
                  <CardHeader className="">
                    <Row className="p-0  m-0 d-flex align-items-center justify-content-between">
                      <Col
                        xl={3}
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        className="p-0 m-0"
                      >
                        <H5 attrH5={{ style: { fontSize: "16px" } }}>
                          Module Analytics -{" "}
                          {filters.week !== ""
                            ? `Week ${filters.week.split("-W")[1]}`
                            : filters.date !== ""
                            ? `Day ${filters.date.split("-")[2]}`
                            : filters.month !== ""
                            ? `${filters.month
                                .replace(
                                  `${filters.month.split("-")[0]}`,
                                  filters.month.split("-")[0].slice(-2)
                                )
                                .replace(
                                  /(\d+)-(\d+)/,
                                  (_, year, month) =>
                                    [
                                      "Jan",
                                      "Feb",
                                      "Mar",
                                      "Apr",
                                      "May",
                                      "Jun",
                                      "Jul",
                                      "Aug",
                                      "Sep",
                                      "Oct",
                                      "Nov",
                                      "Dec",
                                    ][parseInt(month, 10) - 1]
                                )} ${filters.month.split("-")[0].slice(-2)}`
                            : filters.starting &&
                              filters.ending &&
                              `Day ${filters.starting.split("-")[2]} to ${
                                filters.ending.split("-")[2]
                              }`}
                        </H5>

                        {/* {costantAIAccuracy ? (
                          <H5
                            attrH5={{
                              style: { fontSize: "15px", fontWeight: "100" },
                              className: "f-light my-1",
                            }}
                          >
                            Total Accuracy:{" "}
                            <span style={{ fontWeight: "600" }}>
                              {`${(costantAIAccuracy==null || costantAIAccuracy==0 || costantAIAccuracy==undefined || costantAIAccuracy=='NaN') ? 'N/A' : `${costantAIAccuracy}%`}`}
                            </span>
                          </H5>
                        ) : null} */}
                        <H5
                          attrH5={{
                            style: { fontSize: "15px", fontWeight: "100" },
                            className: "f-light my-1",
                          }}
                        >
                          Total Alerts:{" "}
                          <span style={{ fontWeight: "600" }}>
                            {totalAlerts}
                          </span>
                        </H5>
                        <H5
                          attrH5={{
                            style: { fontSize: "15px", fontWeight: "100", minWidth:'200px' },
                            className: "f-light ",
                          }}
                        >
                          Average Accuracy:{" "}
                          <span style={{ fontWeight: "600" }}>
                            {modelaccuracy ? `${modelaccuracy}%` : "N/A"}
                          </span>
                        </H5>
                      </Col>
                      <Col
                        xl={9}
                        lg={9}
                        md={9}
                        sm={12}
                        xs={12}
                        className="p-0 mx-0 my-3 my-xl-0 my-lg-0 my-md-0 my-sm-3 gap-2 d-flex justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-start justify-content-start"
                      >
                        <button
                          className="btn btn-outline-danger ai-mod-sec-buttons"
                          onClick={() => handleButton("pdf")}
                        >
                          PDF
                        </button>
                        <button
                          className="btn btn-outline-primary ai-mod-sec-buttons"
                          onClick={toggleModal}
                        >
                          Email
                        </button>
                        <button
                          className="btn btn-outline-success ai-mod-sec-buttons"
                          onClick={() => handleButton("print")}
                        >
                          Print
                        </button>
                        <button
                          className="btn btn-outline-warning ai-mod-sec-buttons"
                          onClick={handlePPT}
                        >
                          PPT
                        </button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <Row
                    ref={graphsContainerRef}
                    className="graphs-container  pb-0"
                  >
                   
                    <Col
                      style={{ height: "100%" }}
                      ref={leftChartRef}
                      className={`m-0  pb-0`}
                      xl="6"
                      lg="6"
                      md="12"
                      sm="12"
                      xs="12"
                    >
                      <Card className="m-0 ">
                        <CardBody className="m-0 pb-4">
                          <TotalAlerts
                            defaultData={chartsData.totalAlertsChart}
                            data={alertsData}
                            setData={setAlertsData}
                            lastFilter={lastFilter}
                            setLastFilter={setLastFilter}
                            chartsData={chartsData}
                            filters={filters}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col
                      ref={rightChartRef}
                      className={`mt-xl-0 mt-lg-0 mt-md-4 mt-sm-4  `}
                      xl="6"
                      lg="6 "
                      md="12"
                      sm="12"
                      xs="12"
                    >
                      <Card className="m-0">
                        <CardBody className="m-0 pb-4">
                          <ModelChart
                            currentweek={currentWeekk.split('-')[1].slice(1)}
                            series2={series2?.length>0 ? series2 : 0}
                            setSeries2={setSeries2}
                            lastFilter={lastFilter}
                            setLastFilter={setLastFilter}
                            chartsData={chartsData}
                            filters={filters}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Row className="px-1 mt-4">
                <Col ref={cardRef} className="mb-2" xl="12" lg="12" md="12" sm="12" xs="12">
                  {newCards && Object.keys(newCards).length > 0 ? (
                    <>
                          <NewCards   ref={cardRef} data={newCards}/>
                        {/* </>
                      )}
                    </> */}
                    </>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      {/* <img style={{ height: '300px', width: '300px', mixBlendMode: 'multiply' }} src="https://img.freepik.com/premium-vector/search-found-no-data-found-data-empty_1249780-8.jpg" /> */}
                      <H4 attrH4={{ className: "p-5" }}>
                        Area data is not being received yet.
                      </H4>
                    </div>
                  )}
                </Col>
              </Row>
            </>
          )}
          <AIModal
            email={email}
            setEmail={setEmail}
            modal={modal}
            toggleModal={toggleModal}
            sub={sub}
            setSubmit={setSubmit}
          />
        </Container>
      </div>
    </Fragment>
  );
};

export default AIModelAndReportsScreen;
