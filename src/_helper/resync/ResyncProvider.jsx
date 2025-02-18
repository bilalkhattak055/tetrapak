import React, { useState } from "react";
import Context from "./index";

const ResyncProvider = (props) => {
  const [resyncForWidth, setResyncForWidth] = useState(false);

  return (
    <Context.Provider
      value={{
        ...props,
        resyncForWidth, setResyncForWidth
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ResyncProvider;
