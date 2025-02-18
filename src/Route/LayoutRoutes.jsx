import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../Layout/Layout';
import { routes } from './Routes';

const LayoutRoutes = () => {
  const initialRole = JSON.parse(localStorage.getItem('role')) || '';
  const [role, setRole] = useState(initialRole)
  const [roleRoutes, setRoleRoutes] = useState([])

  useEffect(() => {

    const storedRole = JSON.parse(localStorage.getItem('role'));
    setRole(storedRole);
    if (storedRole) {
      setRoleRoutes(routes[storedRole]);
    }

  }, [role]);
  return (
    <>
      <Routes>
          <Route element={<AppLayout />} >
            {roleRoutes && roleRoutes?.map(({ path, Component }, i) => (
              <Route key={i} path={`${path}/${role}`} element={Component} />
            ))}
          </Route>
      </Routes>
    </>
  );
};

export default LayoutRoutes;