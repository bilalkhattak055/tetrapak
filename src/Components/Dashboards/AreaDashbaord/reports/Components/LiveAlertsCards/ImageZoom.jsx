import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { IoAddOutline } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import './livealerts.css'

const ImageZoom = ({ photo, setIsOpen, setShowModal, imageData, cameraTable }) => {
  const [modalWidth, setModalWidth] = useState('80%');
  const [modalHeight, setModalHeight] = useState('80%');

  const closeModal = () => {
    setIsOpen(false);
    setShowModal(false);
    console.log('closing');
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if(width < 450){
        setModalWidth('90%');
        setModalHeight('50vh')
      }
      else if(width < 700) {
        setModalWidth('90%');
        setModalHeight('70vh')
      }
      else {
        setModalWidth('90%');
        setModalHeight('90vh')
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Modal
        style={{
          zIndex: 1000,
          height: modalHeight,
          width: modalWidth,
          maxWidth: 'none',
          padding: '0px',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        className='modalclass'
        isOpen={true}
        toggle={closeModal}
        centered={true}
        backdrop={true}
      >
        <ModalBody style={{ padding: '0px', overflow: 'hidden', width: '90vw' }}>
          <div className='p-0 m-0' style={{ position: 'relative', height: '100%', width: '100%' }}>
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div style={{
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    userSelect: 'none',
                    backgroundColor:"#080808e6"
                  }}>
                    <TransformComponent>
                      <img
                        style={{
                          maxWidth: '100%',
                          maxHeight: modalHeight,
                          width: '100vw',
                          height: modalHeight,
                          objectFit:"contain"
                        }}
                        src={photo}
                        alt="Zoomed"
                      />
                    </TransformComponent>
                  </div>

                  {/* Zoom controls */}
                  <div className="p-2" style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '15px',
                    maxWidth: '270px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    userSelect: 'none',
                  }}>
                    <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomIn()}>
                      <IoAddOutline style={{ color: 'white', cursor: 'pointer' }} />
                    </div>
                    <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomOut()}>
                      <GrSubtract style={{ color: 'white', cursor: 'pointer' }} />
                    </div>
                    <button className="btn btn-outline-warning btn-sm rounded-5" onClick={()=>resetTransform()}>
                      Reset
                    </button>
                  </div>

                  {/* Dark overlay with details */}
                  <div style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'white',
                    padding: '20px',
                  }}>
                    {imageData.cameraName && (
                      <h4 className='' style={{ margin: 0 }}>Camera Name: {imageData.cameraName}</h4>
                    )}
                    {imageData.areaName && (
                      <p className='' style={{ margin: '5px 0' }}>Area: {imageData.areaName}</p>
                    )}
                    {imageData.alertName && (
                      <p className='' style={{ margin: '5px 0' }}>Alert: {imageData.alertName}</p>
                    )}
                    {imageData.lastActive && (
                      <p className='' style={{ margin: '5px 0 0 0' }}>
                        {cameraTable ? "Last Active: " : ''}{imageData.lastActive}
                      </p>
                    )}
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ImageZoom;