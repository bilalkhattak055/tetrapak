// 
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { IoAddOutline } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import './livealerts.css'
import { RxCross2 } from "react-icons/rx";

const NewImageZoom = ({ photo, setIsOpen, setShowModal, imageData, cameraTable }) => {
  const [zoomLevel, setZoomLevel] = useState(1); // State to keep track of the zoom level
  const [modalWidth, setModalWidth] = useState('80%'); // Default width of modal
  const [modalHeight, setModalHeight] = useState('80%'); // Default width of modal

  const closeModal = () => {
    setIsOpen(false);
    setShowModal(false); 
  };

  // Handle window resize for responsive modal
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
    //    if(width < 450){
    //     setModalWidth('90%'); // For smaller screens, make it 95% of the viewport
    //     setModalHeight('50vh')
    //   }
    //   else if(width < 700) {
    //     setModalWidth('90%'); // For smaller screens, make it 95% of the viewport
    //     setModalHeight('70vh')
    //   }
      
    //   else {
    //     setModalWidth('100%');  
    //     setModalHeight('70vh')

    //   }
    setModalWidth('100%');  
        setModalHeight('70vh')
    };

    // Initial check when component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

 

  return (
    <>
     <Modal
  style={{
    zIndex: 1000,
    height:modalHeight,
    width: modalWidth, // Dynamically set the width based on screen size
    maxWidth: 'none', // Prevent Bootstrap from capping width at default sizes
    padding: '0px',
   // Center the modal horizontally
    position: 'relative',
    top: '50%', // Adjust for centering vertically
    transform: 'translateY(-50%)', // Ensure the modal is vertically centered
  }}
  className='modalclass m-0 p-0'    
  isOpen={true}
  toggle={closeModal}
  centered={true}
  backdrop={true}
>
        <ModalBody style={{ padding: '0px', overflow: 'hidden',width:'100vw' }}>
          <div className='p-0 m-0' style={{ position: 'relative', height: '100%', width: '100%' }}>
    
            <RxCross2 className='ms-2 mt-1'  style={{position:'absolute',top:'0px',zIndex:'2' , fontSize:'30px',color:'white'}} onClick={closeModal}/>
            <TransformWrapper initialScale={1}>
           
            {({ zoomIn, zoomOut, resetTransform }) => (
                <>           
                
                <div
              style={{
                overflow: 'hidden', // Hide overflow content outside the container
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none', // Prevent image selection
              }}
            >
                <TransformComponent> 
              <img
                style={{
                //   transform: `scale(${zoomLevel})`,
                //   transformOrigin: 'center', // Ensure the image scales from the center
                //   transition: 'transform 0.3s ease-in-out', // Smooth zooming transition
                  maxWidth: '100%',
                  maxHeight: modalHeight,
                //   minWidth:'100%',
                  width: '100vw',
                  height: modalHeight
                
                }}
                src={photo}
                alt="Zoomed"
              />
                </TransformComponent>
            </div>

            {/* Zoom controls */}
            <div
             
              style={{
                width: '200px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#202020',
                borderRadius: '12px',
                maxWidth: '270px',
                position: 'absolute',
                top: '10px',
                right: '10px',
                userSelect: 'none', // Prevent selection of controls
                padding:'12px 16px 12px 16px'
              }}
            >
              <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomIn()}>
                <IoAddOutline style={{ color: 'white', cursor: 'pointer' }} />
              </div>
              <div className="p-0 m-0 d-flex align-items-center" style={{ backgroundColor: 'transparent', border: 'none' }} onClick={()=>zoomOut()}>
                <GrSubtract style={{ color: 'white', cursor: 'pointer' }} />
              </div>

              <button className="btn  btn-sm rounded-5 newResetHoverBTN" style={{color:'white', border:'1px solid white'}}  onClick={()=>resetTransform()}>
                Reset
              </button>
            </div>

            
          
            </>

            )}
            </TransformWrapper>
          </div>
         
{/* Dark overlay with details */}
            <div
              style={{ 
               display:'flex',
               justifyContent:'start',
               flexDirection:'column',
               background:'black', 
               flexWrap:'wrap'
              }}
              className='p-3'
            >
              {imageData.cameraName && <p className='mb-1' style={{ margin: 0,color:'white', }}>Camera Name: {imageData.cameraName}</p>}
              {imageData.violation && <p className='mb-1' style={{ margin: 0,color:'white',  }}>Violation: {imageData.violation}</p>}
              {imageData.date && <p className='mb-1' style={{margin: 0,color:'white', }}>{cameraTable ? "Last Active:" : ''} {imageData.date} {imageData.time && <span className='ms-2' style={{ margin: '' ,color:'white' }}> {imageData.time}</span>}</p>} 
            </div>
          
        </ModalBody>
      </Modal>
    </>
  );
}; 
export default NewImageZoom;
