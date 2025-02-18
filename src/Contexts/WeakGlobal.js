import React, { createContext, useState,useContext} from "react";

// Helper function to get the current week
const getCurrentWeek = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const dayOfWeek = oneJan.getDay(); // Get the day of the week for January 1st (0 = Sunday, 6 = Saturday)
  
  // Adjust to make Monday the start of the week (ISO standard)
  const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
  
  // Calculate the difference in days and convert to full weeks
  const daysSinceFirstMonday = Math.floor((now - firstMonday) / 86400000);
  const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);
  
  return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
};

const WeekFilterContext = createContext();

export const WeekFilterProvider = ({ children }) => {
  const [currentFilter, setCurrentFilter] = useState('week'); 
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const CurrentweekForLeaderBoard = currentFilter === 'week' ? selectedWeek : selectedMonth;
  const setCurrentweekForLeaderBoard = (value) => {
    if (value.includes('W')) {
      setCurrentFilter('week');
      setSelectedWeek(value);
      setSelectedMonth(null);
    } else {
      setCurrentFilter('month');
      setSelectedMonth(value);
      setSelectedWeek(null);
    }
  };

  return (
    <WeekFilterContext.Provider
      value={{
        currentFilter,
        setCurrentFilter,
        selectedWeek,
        setSelectedWeek,
        selectedMonth,
        setSelectedMonth,
        selectedShift,
        setSelectedShift,
        CurrentweekForLeaderBoard,
        setCurrentweekForLeaderBoard,
      }}
    >
      {children}
    </WeekFilterContext.Provider>
  );
};

export const useWeekFilter = () => {
  return useContext(WeekFilterContext);
};

export default WeekFilterProvider;