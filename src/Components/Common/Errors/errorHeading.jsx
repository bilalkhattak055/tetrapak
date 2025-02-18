import React from "react";
import { AlertCircle } from "react-feather";

const ErrorHeading = ({text, marginTop}) => {
  return (
    <center style={{ marginTop:marginTop?marginTop: "15%" }}>
      <AlertCircle color="grey" />
      <h5 className="txt-grey" style={{ color: "grey" }}>
        {text ? text : "No Data Found"}
      </h5>
    </center>
  );
};

export default ErrorHeading;
