import React, { useState, useEffect } from 'react';
import MissandMatch from './Components/MissandMatchCard';
import MissMatch from './Components/MismatchCard';
import ReelCard from './Components/ReelCard';
import LiveCameraComparison from './Components/LiveCamera';
import { Row, Col } from 'reactstrap';

const AnalyticsTetra = () => {
  // Determine the layout based on screen width
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1450);

  // State to hold incoming reel data from the backend
  const [reelsData, setReelsData] = useState({
    total_reels: "0",
    match_reels: "0",
    missMatch_reels: "0",
    wrong_mismatch: "0"
  });

  // State for image URLs
  const [imageUrls, setImageUrls] = useState({
    camera1: null,
    camera2: null,
    camera3:null,
    barcode1: null,
    barcode2: null
  });

  // State to track WebSocket connection status
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    // WebSocket connection setup
    let socket = null;
    let reconnectTimer = null;
    
    const connectWebSocket = () => {
      // Create a WebSocket connection to the reel data server
      const wsUrl = 'ws://localhost:8062';
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('WebSocket connection established to reel data server.');
        setWsConnected(true);
        // Clear any reconnect timers if connection is successful
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received reel data:', data);
          
          // Update the state with the new reel data
          setReelsData({
            total_reels: data.total_reels,
            match_reels: data.match_reels,
            missMatch_reels: data.mismatch_reels,
            wrong_mismatch: data.wrong_mismatch
          });
          
          // Update image URLs if they're provided
          if (data.image_urls) {
            setImageUrls({
              camera1: data.image_urls.camera1,
              camera2: data.image_urls.camera2,
              camera3: data.image_urls.camera3,
              barcode1: data.image_urls.barcode1,
              barcode2: data.image_urls.barcode2
            });
          }
        } catch (err) {
          console.error('Error parsing reel data:', err);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWsConnected(false);
      };

      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        setWsConnected(false);
        
        // Attempt to reconnect after 5 seconds
        reconnectTimer = setTimeout(() => {
          console.log('Attempting to reconnect WebSocket...');
          connectWebSocket();
        }, 5000);
      };
    };

    // Initial connection
    connectWebSocket();

    // Clean up the socket when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, []); // Empty dependency ensures this runs once on mount

  // Handle screen resize events to update layout
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1330);
    };

    window.addEventListener('resize', handleResize);
    // Trigger the handler immediately for initial layout.
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use live images from server if available, otherwise use defaults
  const cameraImages = [
    imageUrls.camera1 || 'https://t4.ftcdn.net/jpg/03/11/07/61/360_F_311076193_tNZbw0YPAfHHV1wZ0NuV0AftLardNBa7.jpg',
];

  // Create proper barcode data objects for each barcode image
  const barcodeData = [
    { 
      value: '112233', 
      image: imageUrls.camera2 || 'https://4.imimg.com/data4/UC/KX/MY-11948983/tetrapack01-jpg9b31ec1b-be17-4364-a714-de28ee086ed1original.jpg'
    },
    // Add a second barcode for the UI layout
    { 
      value: '445566', 
      image: imageUrls.camera3 || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_7uyoAUjK3THhC0ZDv0eoj7FmlJ2oW47nA&s'
    }
  ];

  console.log("Camera Images:", cameraImages);
  console.log("Barcode Data:", barcodeData);

  return (
    <Row>
      <h1 className='mt-4'>
        <span style={{ color: "#0E0D0B" }}>Welcome to </span>
        <span style={{ color: "#023F88" }}>Tetra Pak Inspection Dashboard!</span>
      </h1>
      <h5 className='mt-1 mb-3' style={{ color: "#535353" }}>
        Here are some summary for you to check
        {!wsConnected && <span style={{ color: "red" }}> (Connecting to data source...)</span>}
      </h5>

      {isLargeScreen ? (
        <>
          <Col lg={6} xl={3}>
            <ReelCard totalReels={reelsData.total_reels} />
          </Col>
          <Col xl={6}>
            <MissandMatch MissandMatch={reelsData.missMatch_reels} Match={reelsData.match_reels} />
          </Col>
          <Col lg={6} xl={3}>
            <MissMatch Mismatch={reelsData.wrong_mismatch} />
          </Col>
        </>
      ) : (
        // Original layout for smaller screens
        <>
          <Col lg={6}>
            <ReelCard totalReels={reelsData.total_reels} />
          </Col>
          <Col lg={6}>
            <MissandMatch MissandMatch={reelsData.missMatch_reels} Match={reelsData.match_reels} />
          </Col>
          <Col>
            <MissMatch Mismatch={reelsData.wrong_mismatch} />
          </Col>
        </>
      )}

      <LiveCameraComparison
        images={cameraImages}
        barcodeData={barcodeData}
      />
    </Row>
  );
};

export default AnalyticsTetra;