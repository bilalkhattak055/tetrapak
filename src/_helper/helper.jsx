import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import SweetAlert from 'sweetalert2';

export const isTokenExpired = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data?.accessToken) {
      const tokenData = jwtDecode(data?.accessToken);
      const expirationTimestamp = tokenData.exp;
      const currentTimestamp = Date.now() / 1000; // Convert milliseconds to seconds
      const isExpired = currentTimestamp > expirationTimestamp;
      if (isExpired) {
        // toast.info("Token has expired, Please Login again");
        window.location.href = `/login`;
        localStorage.removeItem("userData");
        localStorage.setItem("authenticated", JSON.stringify(false));
        localStorage.setItem("login", JSON.stringify(false));
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

export const getWeek = (date) => {
  const target = new Date(date.valueOf());
  const dayNum = (date.getUTCDay() + 6) % 7; // Adjusting to get correct day number
  target.setUTCDate(target.getUTCDate() + 4 - dayNum); // Set to Thursday of the week
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1)); // Start of the year
  return Math.ceil(((target - yearStart) / 86400000 + 1) / 7); // Calculate week number
};

export const infoToast = (message) =>
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    pauseOnFocusLoss: true,
});
export const successToast = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    pauseOnFocusLoss: true,
});
export const errorToast = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    pauseOnFocusLoss: true,
});

  export const ShowDisclaimer = (text) => {
    Swal.fire({
      html: `<p class="disclaimer-text">${text}</p>`, // Use HTML to add custom styles
      icon: "info",
      iconColor: "#023F88",
      showCancelButton: false,
      cancelButtonText: "Cancel",
      reverseButtons: false,
      cancelButtonColor: "#bd2130",
      confirmButtonText: "Close",
      showConfirmButton: true,
    });
  };
  
  // Add custom styles for font size, alignment, etc.
  const style = document.createElement('style');
  style.innerHTML = `
    .swal2-popup {
      font-size: 16px; /* Default font size */
      text-align: center; /* Center text by default */
       text-wrap: pretty;
    }
    
    /* Custom styling for the disclaimer text */
    .disclaimer-text {
      font-size: 16px;
      line-height: 1.5; /* Adjust line spacing */
      margin: 0;
      text-wrap: pretty;
    }
  
    /* Media queries for responsive font size adjustments */
    @media (max-width: 768px) {
      .disclaimer-text {
        font-size: 14px; /* Smaller screens */
      }
    }
  `;
  document.head.appendChild(style);

  export const OptionToggle = ({onClick=()=>{}, isExpanded=true }) =>{
    return <span
    onClick={onClick}
    style={{
      color: "blue",
      cursor: "pointer",
      textDecoration: "underline",
      marginLeft: "5px",
      fontSize:11
    }}
  >
    {isExpanded ? "See Less" : "See More"}
  </span>
  }

  export const truncateName = (name, length) => {
    if (name?.length > length) {
      return name?.substring(0, length); 
    }
    return name; // Return the original name if it's within the limit
  };


  export const  sortAreaList =(dataList) =>{
    return dataList?.sort((a, b) => {
      // Extract the number part from the area name
      const numA = parseInt(a.area.match(/\d+/)[0]);
      const numB = parseInt(b.area.match(/\d+/)[0]);
      return numA - numB;
    })
  }


  export const showInfoAlert = (text,confirmText) =>{
    return  SweetAlert.fire({
      text: text,
      icon: "info",
      iconColor: "#bd2130",
      confirmButtonText: confirmText ? confirmText :'OK',
      allowOutsideClick: false
      
  })
  }

  export const showConfirmationAlert = (text,confirmText) =>{
    return  SweetAlert.fire({
      title: text,
      icon: "warning",
      iconColor: "#bd2130",
      cancelButtonText: 'Cancel',
      confirmButtonText: confirmText ? confirmText :'Delete',
      cancelButtonColor: "#bd2130", 
      reverseButtons: true,
      showCancelButton: true,
      allowOutsideClick: true
      
  })
  }