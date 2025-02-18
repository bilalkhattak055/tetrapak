// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const PrivateRoute = () => {
//   const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));
//   const [authenticated, setAuthenticated] = useState(false);
//   const location = useLocation()
//   console.log('location22', location)

//   useEffect(() => {
//     setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
//     localStorage.setItem("authenticated", authenticated);
//     localStorage.setItem("login", login);
//   }, []);
//   return login || authenticated ? <Outlet /> : <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
// };

// export default PrivateRoute;


import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')))
  const location = useLocation();
 

  useEffect(() => {
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    const auth = JSON.parse(localStorage.getItem("authenticated"))
    localStorage.setItem("authenticated", auth);
    localStorage.setItem("login", login);
    setRole(JSON.parse(localStorage.getItem('role')))

  }, [authenticated, login, location, role,]);

  if (!login) {
    return <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
  }
  const checkNullinUrl =()=> {
    const currUrl = location.pathname;
    if(currUrl.includes(null) || currUrl.includes(undefined)) {
      return false
    }
    return true
  }
  if(!checkNullinUrl()) {
    localStorage.clear();
    return <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
  }
  const checkRoleInURL = () => {
    const currentURL = location.pathname;
    console.log(currentURL,'from login setup')
    if(currentURL !== '/') {
      return currentURL.includes(role);
    }
    return true
  };

  if (!checkRoleInURL()) {
    console.log(!checkRoleInURL())
    return <Navigate exact to={`${process.env.PUBLIC_URL}/pages/errors/error401`} />;
  }
 
 

  return <Outlet />;
};

export default PrivateRoute;

