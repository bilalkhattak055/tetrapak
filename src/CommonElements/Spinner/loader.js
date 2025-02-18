import React from "react";
import { Row, Col } from "reactstrap";
import { ClipLoader} from 'react-spinners';

// const Loader1 = () => {
//   return (
//     <Row>
//       <Col sm="12" style={{ margin: "40px 0px" }}>
//         <h5 className="sub-title mb-0 text-center">{"Loading"}</h5>
//         <div className="loader-box">
//           <div className="loader-17"></div>
//         </div>
//       </Col>
//     </Row>
//   );
// };
// export default Loader1;

// export const SquareLoader = () => {
//   return (
//     <div className="loader-box" style={{ padding: 0, margin: 0, height: 60 }}>
//       <div
//         className="loader-38"
//         style={{
//           fontSize: 30,
//         }}
//       ></div>
//     </div>
//   );
// };
const MyComponent = () => { 
  return (
    <div  className="w-100 d-flex justify-content-center align-items-center" style={{height: 'calc(100vh - 300px)'}}>
       <ClipLoader  size={55} color="#1E67D6" />
    </div>
  ); 
}

export default MyComponent;


export const Loader3 = () => {
  return (
    <div className="loader-box" style={{padding:0, margin:0, height:60}}>
      <div className="loader-38" style={{ fontSize: 25 }}></div>
    </div>
  );
};