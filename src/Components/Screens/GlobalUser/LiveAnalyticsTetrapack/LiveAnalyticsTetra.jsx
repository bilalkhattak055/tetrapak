import React, { useState, useEffect } from 'react';
import MissandMatch from './Components/MissandMatchCard';
import MissMatch from './Components/MismatchCard';
import ReelCard from './Components/ReelCard';
import LiveCameraComparison from './Components/LiveCamera';
import { Row, Col,Container} from 'reactstrap';
import { AuthProvider } from './context/AuthContext';
const AnalyticsTetra = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1450);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 1280);

  const [reelsData, setReelsData] = useState({
    total_reels: "0",
    match_reels: "0",
    missMatch_reels: "0",
    wrong_mismatch: "0",
    match_reel: false,
    mismatch_reel: false,
  });

  // Authentication states
  const [authState, setAuthState] = useState(false);
  const [bypassState, setBypassState] = useState(false);
  const [reprocessState, setReprocessState] = useState(false);

  // State for image URLs
  const [imageUrls, setImageUrls] = useState({
    camera1: null,
    camera2: null,
    camera3: null,
    barcode1: null,
    barcode2: null
  });

  // State to track WebSocket connections status
  const [wsConnected, setWsConnected] = useState(false);
  const [statusWsConnected, setStatusWsConnected] = useState(false);

  // Status WebSocket for sending data to backend on port 8064
  useEffect(() => {
    let statusSocket = null;
    let reconnectTimer = null;

    const connectStatusWebSocket = () => {
      const wsUrl = 'ws://localhost:8064';
      statusSocket = new WebSocket(wsUrl);

      statusSocket.onopen = () => {
        console.log('Status WebSocket connection established.');
        setStatusWsConnected(true);

        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }

        // Send initial status when connection is first established
        sendStatusUpdate();
      };

      statusSocket.onerror = (error) => {
        console.error('Status WebSocket error:', error);
        setStatusWsConnected(false);
      };

      statusSocket.onclose = (event) => {
        console.log('Status WebSocket connection closed:', event);
        setStatusWsConnected(false);

        // Attempt to reconnect after 3 seconds
        reconnectTimer = setTimeout(() => {
          console.log('Attempting to reconnect Status WebSocket...');
          connectStatusWebSocket();
        }, 3000);
      };
    };

    // Initial connection
    connectStatusWebSocket();

    // Clean up function
    return () => {
      if (statusSocket) {
        statusSocket.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, []);

  // Function to send status updates to backend
  const sendStatusUpdate = () => {
    if (!statusWsConnected) {
      console.warn('Status WebSocket not connected. Cannot send update.');
      return;
    }

    try {
      const statusData = {
        auth_state: authState,
        bypass_state: bypassState,
        reprocess_state: reprocessState,
        match_reels: reelsData.match_reel,
        missMatch_reels: reelsData.mismatch_reel,
        wrong_mismatch: reelsData.wrong_mismatch !== "0"
      };

      const statusSocket = new WebSocket('ws://localhost:8064');
      statusSocket.onopen = () => {
        statusSocket.send(JSON.stringify(statusData));
        console.log('Sent status update to backend:', statusData);
        statusSocket.close();
      };
    } catch (error) {
      console.error('Error sending status update:', error);
    }
  };

  // Watch for changes in authentication states and send updates
  useEffect(() => {
    if (statusWsConnected) {
      sendStatusUpdate();

      // Set a timeout to reset auth states after 30 seconds
      if (authState) {
        const timeoutId = setTimeout(() => {
          setAuthState(false);
          setBypassState(false);
          setReprocessState(false);
          // Send the updated status after resetting
          sendStatusUpdate();
        }, 30000); // 30 seconds

        return () => clearTimeout(timeoutId);
      }
    }
  }, [authState, bypassState, reprocessState, statusWsConnected]);

  // Effect for WebSocket connection to receive reel data
  useEffect(() => {
    // WebSocket connection setup
    let socket = null;
    let reconnectTimer = null;

    const connectWebSocket = () => {
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
            wrong_mismatch: data.wrong_mismatch,
            match_reel: data.match_reel || false,  // Set default if not provided
            mismatch_reel: data.mismatch_reel || false // Set default if not provided
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
  //medium screen
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen( window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    // Trigger the handler immediately for initial layout.
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("authState changed to", authState, bypassState, reprocessState);
  }, [authState, bypassState, reprocessState]);

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

  return (
    <AuthProvider>
      <Container fluid>
      <Row>
        <h1 className='mt-4'>
          <span style={{ color: "#0E0D0B" }}>Welcome to </span>
          <span style={{ color: "#023F88" }}>Tetra Pak Inspection Dashboard!</span>
        </h1>
        {!wsConnected ? (
          <span style={{ color: "red", fontSize: "18px" }}> (Connecting to data source...)</span>
        ) : (
          <h5 className='mt-1 mb-3' style={{ color: "#535353" }}>
            Here are some summary for you to check
          </h5>
        )}
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
        ) : isMediumScreen ? (
          <>
            <Col lg={6} xl={6}>
              <ReelCard totalReels={reelsData.total_reels} />
              
            </Col>
            <Col lg={6} xl={6}>
            <MissMatch Mismatch={reelsData.wrong_mismatch} />
            </Col>
            <Col>
              <MissandMatch MissandMatch={reelsData.missMatch_reels} Match={reelsData.match_reels} />
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
          matchStatus={reelsData.match_reel}
          mismatchStatus={reelsData.mismatch_reel}
        />
      </Row>
      </Container>
    </AuthProvider>
  );
};

export default AnalyticsTetra;