// export function getCurrentWeekWithYear() {
//     const today = new Date();
    
//     // Set the target to the nearest Thursday for consistency
//     const dayOfWeek = today.getUTCDay(); // 0 is Sunday, 6 is Saturday
//     const nearestThursday = new Date(today.getTime());
//     nearestThursday.setUTCDate(today.getUTCDate() + (3 - (dayOfWeek + 6) % 7));

//     // Get the year and the start of the year (January 1st)
//     const year = nearestThursday.getUTCFullYear();
//     const startOfYear = new Date(Date.UTC(year, 0, 1));
    
//     // Calculate week number
//     const weekNumber = Math.ceil((((nearestThursday - startOfYear) / 86400000) + startOfYear.getUTCDay() + 1) / 7);

//     return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
// }

export function getCurrentWeekWithYear() {
    const today = new Date();
    
    // Set to the nearest Thursday to align with week calculations
    const dayOfWeek = today.getUTCDay(); // 0 = Sunday, 6 = Saturday
    const nearestThursday = new Date(today.getTime());
    nearestThursday.setUTCDate(today.getUTCDate() + (4 - (dayOfWeek + 6) % 7)); // 4 for Thursday

    // Extract year and start of year
    const year = nearestThursday.getUTCFullYear();
    const startOfYear = new Date(Date.UTC(year, 0, 1));

    // Calculate days since Jan 1 and the ISO weekday of Jan 1 (1=Mon, 7=Sun)
    const jan1Day = (startOfYear.getUTCDay() || 7);  // ISO: Sunday is 7
    const daysSinceJan1 = (nearestThursday - startOfYear) / 86400000;

    // Calculate the week number
    let weekNumber = Math.ceil((daysSinceJan1 + jan1Day - 4) / 7) || 1;

    // Special case for early January when week 1 contains fewer than 4 days
    if (weekNumber === 0) {
        const lastYear = year - 1;
        const lastYearDec29 = new Date(Date.UTC(lastYear, 11, 29)); // Dec 29
        return `${lastYear}-W${getCurrentWeekWithYear(lastYearDec29).split('-W')[1]}`;
    }

    // Two-day rule: If Jan 1 is a Thursday or later, consider it Week 1
    if (jan1Day >= 4) {
        weekNumber = 1;
    }

    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

export const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay();
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
}