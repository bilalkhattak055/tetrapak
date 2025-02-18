import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { H3 } from '../../../../AbstractElements'

export default function MainGate({ mainCard }) {
  return (
    <>
      {mainCard && (
        <Row style={{  margin: '0', padding: '0' }} className='m-0 p-0'>
          <Col
            style={{ padding: '0' }}
            xl='12' lg='12' md='12' sm='12' xs='12'
            className="p-4 d-flex align-items-start"
          >
            <H3 >{mainCard.roomName} Room</H3>
          </Col>
          <Col
            style={{  height: '532px', padding: '0' }}
            xl='12' lg='12' md='12' sm='12' xs='12'
            className="m-0 p-0"
          >
         
            <iframe
                           src={mainCard.video}
                           className='iframee'
                            width='100%'
                            height='532px'
                            title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '0px 0px 26px 26px' }}
                            >
                            </iframe>
          </Col>
        </Row>
      )}
    </>
  )
}
