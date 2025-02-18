import React, { useContext } from "react";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Sign from "../Auth/Sign";
import PrivateRoute from "./PrivateRoute";
import { classes } from "../Data/Layouts";
import OtpVerification from '../Components/Pages/otpPage'
import SessionTimeout from '../popups/sessionTimeout'
import PopupStateContext from "../_helper/popupState";
import AuthContextProvider from "../Contexts/AuthContext";
import LoginPage from '../Auth/SigninV2';

// setup fake backend

const Routers = () => {
  const login = useState(JSON.parse(localStorage.getItem("login")))[0];
  // console.log('login1', login)
  const [authenticated, setAuthenticated] = useState(false);
  const defaultLayoutObj = classes.find((item) => Object.values(item).pop(1) === "compact-wrapper");
  const layout = localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [role, setRole] = useState(initialRole)
  let roll = JSON.parse(localStorage.getItem('role'))
  const {resyncRole} = useContext(PopupStateContext)
 

  useEffect(() => {
    let abortController = new AbortController();
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return () => {
      abortController.abort();
    };
  }, []);
// console.log('roleeeee', role)
  // let role = JSON.parse(localStorage.getItem('role'))

  return (
    // <BrowserRouter basename={"/"}>
    <BrowserRouter basename={'/'}>
      <AuthContextProvider>
      <Suspense fallback={<Loader />}>
      {/* {console.log('fallback')} */}
        <Routes>
          <Route path={"/"} element={<PrivateRoute />}>
            {login || authenticated ? (
              <>
                <Route exact path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default/${role}`} />} />
                <Route exact path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default/${role}`} />} />
              </>
            ) : (
              ""
            )}
            <Route path={`/*`} element={<LayoutRoutes />} />
          </Route>

          <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<LoginPage/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/verification`} element={<OtpVerification />} />
          <Route exact path={`${process.env.PUBLIC_URL}/session-timeout`} element={<SessionTimeout />} />
          {authRoutes?.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))}
        </Routes>
      </Suspense>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Routers;
