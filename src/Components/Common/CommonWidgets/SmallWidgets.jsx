import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { H4 } from '../../../AbstractElements';
import SvgIcon from '../Component/SvgIcon';
import CountUp from 'react-countup';
import './widget.css';

const SmallWidgets = ({ data, mainClass }) => {
  return (
    <Card className={`small-widget ${mainClass ? mainClass : ''}`}>
      <CardBody className={data.color}>
        {/* <span className='f-light'>{data.title}</span> */}
        <p className="para justify-items-center align-items-center px-3 py-2 rounded mb-2" style={{backgroundColor: data.gateColor, width:'fit-content' }}>
        {data.title}
      </p>
        <div className='d-flex align-items-end gap-4 justify-content-between'>
          <H4>
            <CountUp suffix={data.suffix ? data.suffix : ''} prefix={data.prefix ? data.prefix : ''} duration={0} separator=',' end={data.total} />
          </H4>
          <span className={`font-${data.color} f-12 f-w-500`}>
            <i className={`icon-arrow-${data.gros < 50 ? 'down' : 'up'}`} />
            <span>
              {data.gros < 50 ? '-' : '+'}
              {data.gros}%
            </span>
            <span className='card-left text-capitalize'>{data.gros < 50 ? ' down' : ' up'}</span>
          </span>
        </div>
       
      </CardBody>
    </Card>
  );
};

export default SmallWidgets;
