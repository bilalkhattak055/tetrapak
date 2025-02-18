// export function getCurrentWeekNumber() {
//     const today = new Date();
//     const startOfYear = new Date(today.getFullYear(), 0, 1);
//     const daysSinceStartOfYear = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));
    
//     // Calculate the ISO week number
//     const weekNumber = Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);
//     return weekNumber;
//   }


export function getCurrentWeekNumber() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfWeek = startOfYear.getDay(); // 0 = Sunday, 6 = Saturday

  // Calculate the number of days since Jan 1
  const daysSinceStartOfYear = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));

  // Calculate the week number
  let weekNumber = Math.ceil((daysSinceStartOfYear + dayOfWeek + 1) / 7);

  // Handle the case for early January (Two-Day Rule)
  if (weekNumber === 53) {
      weekNumber = 1;
  }

  return weekNumber.toString().padStart(2, '0');
}
