
import React from "react";
import { ScaleLoader  } from 'react-spinners';

const MyComponent = () => { 
  return (
    <div  className="d-flex justify-content-center align-items-center">
       <ScaleLoader  size={20} color="#635470" />
    </div>
  );
}

export default MyComponent;