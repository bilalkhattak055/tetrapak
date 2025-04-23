// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a custom hook for using the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // State for authentication and options
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    bypassSelected: false,
    reprocessSelected: false,
    authTimestamp: null,
  });

  // Effect to handle expiration of authentication after 30 seconds
  useEffect(() => {
    let timer;
    
    if (authState.isAuthenticated && authState.authTimestamp) {
      console.log("Setting auth context timeout");
      timer = setTimeout(() => {
        console.log("Auth context timeout reached");
        setAuthState(prevState => ({
          ...prevState,
          isAuthenticated: false,
          bypassSelected: false,
          reprocessSelected: false,
        }));
      }, 30000); // 30 seconds
    }

    return () => {
      if (timer) {
        console.log("Clearing auth context timeout");
        clearTimeout(timer);
      }
    };
  }, [authState.isAuthenticated, authState.authTimestamp]);

  // Handle authentication with option tracking
  const handleAuthentication = (authenticated, option) => {
    if (authenticated) {
      console.log(`Setting authentication with option: ${option}`);
      setAuthState({
        isAuthenticated: true,
        bypassSelected: option === 'bypass',
        reprocessSelected: option === 'reprocess',
        authTimestamp: new Date().getTime(),
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        bypassSelected: false,
        reprocessSelected: false,
        authTimestamp: null,
      });
    }
  };

  // Value to be provided to consumers
  const contextValue = {
    ...authState,
    handleAuthentication,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
