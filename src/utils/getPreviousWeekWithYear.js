
export function getPreviousWeekWithYear() {
    const today = new Date();
  
    // Set the target to the nearest Thursday for consistency
    const dayOfWeek = today.getUTCDay(); // 0 is Sunday, 6 is Saturday
    const nearestThursday = new Date(today.getTime());
    nearestThursday.setUTCDate(today.getUTCDate() + (3 - (dayOfWeek + 6) % 7));
  
    // Subtract 7 days to get the previous week
    nearestThursday.setUTCDate(nearestThursday.getUTCDate() - 7);
  
    // Get the year and the start of the year (January 1st)
    const year = nearestThursday.getUTCFullYear();
    const startOfYear = new Date(Date.UTC(year, 0, 1));
  
    // Calculate the week number
    const weekNumber = Math.ceil((((nearestThursday - startOfYear) / 86400000) + startOfYear.getUTCDay() + 1) / 7);
  
    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
  }
  