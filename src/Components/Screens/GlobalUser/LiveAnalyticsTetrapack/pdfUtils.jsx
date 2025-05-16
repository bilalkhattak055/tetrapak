
export const generatePdfFilename = (filterDisplay) => {
  const date = new Date();
  const timestamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  
  // Format filter info for filename
  let filterInfo = '';
  if (filterDisplay) {
    filterInfo = filterDisplay
      .replace(/:/g, '-')
      .replace(/\s/g, '_')
      .replace(/[^\w-]/g, '');
  } else {
    filterInfo = 'All_Data';
  }
  
  return `TetraPak_Inspection_Report_${filterInfo}_${timestamp}.pdf`;
};

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
                      
  return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// Calculate compliance percentage
export const calculateCompliancePercentage = (data) => {
  if (!data || !data.total_reels || data.total_reels === 0) return 0;
  return Math.round((data.match_reels / data.total_reels) * 100);
};

// Get color based on value range
export const getStatusColor = (value, thresholds = { good: 90, warning: 70 }) => {
  if (value >= thresholds.good) return '#4CAF50'; // Green
  if (value >= thresholds.warning) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

// Format numbers for display (with commas)
export const formatNumber = (num) => {
  if (num === undefined || num === null) return 'N/A';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format percentage for display
export const formatPercentage = (value) => {
  if (value === undefined || value === null) return 'N/A';
  return `${Math.round(value)}%`;
};

// Group data for reports
export const groupDataByProperty = (data, property) => {
  if (!data || !Array.isArray(data)) return {};
  
  return data.reduce((grouped, item) => {
    const key = item[property];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
};

// Generate PDF metadata
export const getPdfMetadata = (filterDisplay) => {
  return {
    title: 'TetraPak Inspection Report',
    subject: `AI Based Reels Inspection System ${filterDisplay || ''}`,
    author: 'TetraPak Monitoring System',
    keywords: 'inspection, report, data analysis, reels, compliance',
    creator: 'TetraPak Analytics Platform'
  };
};