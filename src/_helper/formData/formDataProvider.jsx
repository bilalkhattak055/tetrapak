import React, { useState } from "react";
import Context from "./index";

const FormDataProvider = (props) => {
    const [AddUserData, setAddUserData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        id: 27,
        status: true,
        passwordReneval: '90 Days',
        inAppNotification: true,
        emailNotification: true,
        emailNotifications: [],
        whatsappNotification: true,
        whatsappNotifications: [],
        Areas: [],
        factories: [],
        subArea: []
    });

  return (
    <Context.Provider
      value={{
        ...props,
        AddUserData,
        setAddUserData  
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default FormDataProvider;
