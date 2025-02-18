import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import vid1 from './../../../assets/video/vid1.mp4';
import thumbnail from '../../../../assets/video/thumbnail.png';
// import newVid from './../../../assets/video/newVideo.mp4';
import './styling/liveCamera.css'
import MainGate from './../Components/mainComponent';
import Gates from './../Components/Gates';

export default function CameraFeed() {
  const cardsData = [
    { gate: 1, roomName: 'Generator', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1', thumbnail:thumbnail },
    { gate: 2, roomName: 'Factory', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1', thumbnail:thumbnail},
    { gate: 3, roomName: 'Labor', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1', thumbnail:thumbnail },
    { gate: 4, roomName: 'Store', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1', thumbnail:thumbnail},
    { gate: 5, roomName: 'Compliance', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1', thumbnail:thumbnail },
    { gate: 5, roomName: 'Compliance', video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1' , thumbnail:thumbnail},

  ];

  const [mainCard, setMainCard] = useState(cardsData[0]);
  const [activeRoom, setActiveRoom] = useState(cardsData[0].roomName); // Lifted state

  return (
    <Container className='mx-1' fluid={true}>
      <Row style={{ paddingBlock: '60px' }}>
        <Col xl="12" lg="12" md="12" sm="12" xs="12">
          <p style={{ fontSize: '30px', fontWeight: '600' }} className="m-0 p-0">
            Live Camera
          </p>
        </Col>
        <Col style={{marginTop:'30px'}} xl="12" lg="12" md="12" sm="12" xs="12">
          <Row className=" px-2 flex-lg-row  flex-column-reverse flex-xs-column-reverse"  >
            <Col style={{marginLeft:'0px'}} className=' p-0 mainCard'
              xl="8" lg="7" md="12" sm="12" xs="12"
           
            >
              <MainGate mainCard={mainCard} />
            </Col>
            <Col 
            className=' d-flex flex-row flex-md-row flex-lg-column gateCard py-0'
              xl="4" lg="5" md="12" sm="12" xs="12"
           
            >
              {cardsData.map((gate,key) => (
                <div key={key}>
          <Gates 
            key={gate.gate} 
            gate={gate} 
            setMainCard={setMainCard} 
            mainCard={mainCard} 
            activeRoom={activeRoom} 
            setActiveRoom={setActiveRoom}
          />
          </div>
        ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
