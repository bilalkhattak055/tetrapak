export const getLastFourDates = () => {
    const dates = [];
    const today = new Date();
  
    // Get the previous 4 dates
    for (let i = 1; i <= 4; i++) {
      const previousDate = new Date();
      previousDate.setDate(today.getDate() - i); // Subtract 'i' days from today
      dates.push(previousDate.toISOString().split('T')[0]); // Format as yyyy-mm-dd
    }
  
    return dates;
  };