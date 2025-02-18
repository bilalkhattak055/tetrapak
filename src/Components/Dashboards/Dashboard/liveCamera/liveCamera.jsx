import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import thumbnail from './../../../../assets/video/thumbnail.png';
import './liveCamera.css';
import MainGate from './mainComponent';
import Gates from './Gates';

export default function LiveCamera() {
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
    <Container fluid={true}>
      <Row style={{ paddingBlock: '60px' }}>
        <Col xl="12" lg="12" md="12" sm="12" xs="12">
          <p style={{ fontSize: '34px', fontWeight: '600' }} className="m-0 p-0">
            Live Camera
          </p>
        </Col>
        <Col style={{marginTop:'30px'}} xl="12" lg="12" md="12" sm="12" xs="12">
          <Row className=" flex-lg-row  flex-column-reverse flex-xs-column-reverse"  >
            <Col className='m-0 p-0 mainCard'
              xl="8" lg="7" md="12" sm="12" xs="12"
           
            >
              <MainGate mainCard={mainCard} />
            </Col>
            <Col 
            className=' d-flex flex-row flex-md-row flex-lg-column gateCard py-0'
              xl="4" lg="5" md="12" sm="12" xs="12"
           
            >
              {cardsData.map((gate) => (
          <Gates 
            key={gate.gate} 
            gate={gate} 
            setMainCard={setMainCard} 
            mainCard={mainCard} 
            activeRoom={activeRoom} 
            setActiveRoom={setActiveRoom}
          />
        ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
