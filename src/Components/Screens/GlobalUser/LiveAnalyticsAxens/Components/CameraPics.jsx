import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import ImageZoom from '../../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';

const CameraPics = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const openModal = (index) => {
    setActiveModalIndex(index);
    setShowModal(true);
  };
//set
  const closeModal = () => {
    setActiveModalIndex(null);
    setShowModal(false);
  };

  return (
    <>
      {/* Properly aligned header and button */}
      <Row className="align-items-center d-flex justify-content-between flex-nowrap">
        <Col xs="auto">
          <h4 className="mb-0">Latest Alerts</h4>
        </Col>
        <Col xs="auto">
          <Button
            className="shadow-sm"
            color="secondary"
            size="md"
            tag="a"
            href="/live_alerts/factory"
          >
            See More <i className="bi bi-arrow-right"></i>
          </Button>
        </Col>
      </Row>

      {/* Alerts Grid */}
      <Row className="gy-3 mt-1">
        {data.map((item, index) => (
          <Col key={index} xs="12" sm="6" md="4">
            <div
              className="position-relative overflow-hidden shadow-sm"
              style={{
                aspectRatio: '16 / 9',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#080808e6',
              }}
            >
              <img
                src={item.image}
                alt={`Camera ${index + 1}`}
                className="img-fluid w-100 h-100 border rounded"
                onClick={() => openModal(index)}
                style={{ cursor: 'pointer', objectFit: 'contain' }}
              />
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      {showModal && activeModalIndex !== null && (
        <ImageZoom
          photo={data[activeModalIndex].image}
          setIsOpen={setShowModal}
          setShowModal={setShowModal}
          imageData={{
            image_url: data[activeModalIndex].image,
          }}
          cameraTable={true}
        />
      )}
    </>
  );
};

export default CameraPics;
