import React, { useState } from "react";
import Context from "./index";

const PopupStateProvider = (props) => {
  const [sessionTimeout, setSessionTimeout] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [resyncRole, setResyncRole] = useState(false);

  return (
    <Context.Provider
      value={{
        ...props,
        sessionTimeout,
        setSessionTimeout,
        addUser,
        setAddUser,
        resyncRole,
        setResyncRole,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default PopupStateProvider;
