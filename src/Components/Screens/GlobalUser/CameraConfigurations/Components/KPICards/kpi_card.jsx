import React from "react";
import { Card, CardBody } from "reactstrap";
import { H4 } from "../../../../../../AbstractElements";
import { ArrowDown, ArrowUp } from "react-feather";
import "./kpi.css"

const KPICard = ({ data, mainClass }) => {
  console.log(data,'data')
  return (
    <Card
      className={`small-widget ${mainClass}`}
      style={{
        // marginRight: data?.marginRight,
        // marginLeft: data?.marginLeft,
        marginBottom: 5,
      }}
    >
      <CardBody className={data.color}>
        <p
          className="para justify-items-center align-items-center px-3 py-2 rounded mb-2"
          style={{ backgroundColor: data.gateColor, width: "fit-content", height: 'fit-content' }}
        >
          {data.title } { data.titleInactive ? data.titleInactive : ''}
        </p>
        <div className="d-flex align-items-end gap-4 justify-content-between">
          <div className="d-flex gap-4 gap-sm-5">
          <H4 attrH4={{className: 'px-3'}}>{data.total}</H4> 
          { data?.InActiveCount ? <H4 attrH4={{className: 'px-3 text-danger'}}>{data.InActiveCount}</H4> : ''}
          </div>
          
          {data?.showPercentage && (
            <span className={`font-${data.color} f-14 f-w-500`}>
              {data.gros > 0 &&  data.gros < 50 ? (
                <ArrowDown size={20} className="font-danger" />
              ) :data.gros > 0 ? (
                <ArrowUp size={20} className="font-success" />
              ): null}
             {data.gros > 0 &&<span
             style={{fontSize:'22px'}}
                className={`px-1 ${ 
                   parseFloat(data.gros) < 50 ? "font-danger" :  "font-success" 
                }`}
              >
                {/* {  parseFloat(data.gros) < 50 ? "-" : "+"} */}
                {data.gros}%
              </span>}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default KPICard;
