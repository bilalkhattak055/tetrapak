export const formateDate = (dateString) => {
    if (!dateString) return ''; 

    // Split the dateString into parts
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1; // Convert month to a 0-based index for JavaScript's Date object
    console.log('month Inde', monthIndex)
    const day = dateParts[2].padStart(2, '0'); 
  
    // Get the month name using the month index
    const month = new Date(0, monthIndex).toLocaleString('default', { month: 'long' });
  
    return `${day} ${month}, ${year}`;
  
  };


  export const formatMonth = (monthValue) => {
    const date = new Date(`${monthValue}-01`);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  };

  export const formatWeek = (weekValue) => {
    const [year, week] = weekValue.split('-W');
    return `${year} - Week ${week}`;
  };

  export const formatMonth2 = (monthString) => {
    const date = new Date(monthString + "-01");
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };