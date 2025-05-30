import React, { useState, useEffect, useRef } from 'react';
import MissandMatch from './Components/MissandMatchCard';
import MissMatch from './Components/MismatchCard';
import ReelCard from './Components/ReelCard';
import LiveCameraComparison from './Components/LiveCamera';
import { Row, Col, Container } from 'reactstrap';
import { AuthProvider } from './context/AuthContext';
import tetraPakGraphService from '../../../../api/TetraPakGraphService';

const AnalyticsTetra = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1450);
  const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 1280);
  const userid = JSON.parse(localStorage.getItem('userId'));
  const [reelsData, setReelsData] = useState({
    total_reels: "0",
    match_reels: "0",
    missMatch_reels: "0",
    wrong_mismatch: "0",
    match_reel: false,
    mismatch_reel: false,
  });
  const [imageUrls, setImageUrls] = useState({
    raw_image: null,
    crop_a: null,
    crop_b: null
  });
  const [wsConnected, setWsConnected] = useState(false);
  
  // Use ref to store the latest reelsData without causing re-renders
  const reelsDataRef = useRef(reelsData);
  const lastApiCallTime = useRef(0);
  const apiCallInterval = useRef(null);

  // Update ref whenever reelsData changes
  useEffect(() => {
    reelsDataRef.current = reelsData;
  }, [reelsData]);

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
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received reel data:', data);
          setReelsData({
            total_reels: data.total_reels,
            match_reels: data.match_reels,
            missMatch_reels: data.mismatch_reels,
            wrong_mismatch: data.wrong_mismatch,
            match_reel: data.match_reel || false,
            mismatch_reel: data.mismatch_reel || false
          });
          if (data.image_urls) {
            setImageUrls({
              raw_image: data.image_urls.raw_image,
              crop_a: data.image_urls.crop_a,
              crop_b: data.image_urls.crop_b
            });

            console.log("Raw image:", data.image_urls.raw_image);
            console.log("Crop A:", data.image_urls.crop_a);
            console.log("Crop B:", data.image_urls.crop_b);
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
        reconnectTimer = setTimeout(() => {
          console.log('Attempting to reconnect WebSocket...');
          connectWebSocket();
        }, 5000);
      };
    };
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1330);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cameraImages = [
    imageUrls.raw_image || 'https://t4.ftcdn.net/jpg/03/11/07/61/360_F_311076193_tNZbw0YPAfHHV1wZ0NuV0AftLardNBa7.jpg',
  ];
  const barcodeData = [
    {
      value: '112233',
      image: imageUrls.crop_a || 'https://4.imimg.com/data4/UC/KX/MY-11948983/tetrapack01-jpg9b31ec1b-be17-4364-a714-de28ee086ed1original.jpg'
    },
    {
      value: '445566',
      image: imageUrls.crop_b || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_7uyoAUjK3THhC0ZDv0eoj7FmlJ2oW47nA&s'
    }
  ];

  // Function get latest date
  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const safeParseInt = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  console.log("Latest Data nhi:", safeParseInt(reelsData.missMatch_reels));

  // Reels Data API call sync - using ref to get latest data
  const FetchReelsData = async () => {
    const latestDate = getTodayDate();
    const currentReelsData = reelsDataRef.current;

    const Payload = {
      inspection_alert_counts: [
        {
          client_id: 1,
          factory_id: 1,
          object_id: 1,
          model_id: 1,
          count: parseInt(currentReelsData.missMatch_reels),
          date: latestDate
        },
        {
          client_id: 1,
          factory_id: 1,
          object_id: 2,
          model_id: 1,
          count: parseInt(currentReelsData.match_reels),
          date: latestDate
        },
        {
          client_id: 1,
          factory_id: 1,
          object_id: 3,
          model_id: 1,
          count: parseInt(currentReelsData.wrong_mismatch),
          date: latestDate
        }
      ]
    };

    try {
      const SyncRow = await tetraPakGraphService.updateSyncRow(Payload);
      if (!SyncRow.ok) {
        console.error("Data Fetching Failed");
        return null;
      } else {
        const data = await SyncRow.json();
        console.log("API call successful:", data);
        return data;
      }
    } catch (error) {
      console.error("Error during sync:", error);
      throw error;
    }
  };

  // Set up the API call interval only once when component mounts
  useEffect(() => {
    // Initial API call after 2 minutes
    const initialTimeout = setTimeout(() => {
      const currentReelsData = reelsDataRef.current;
      const hasValidData = parseInt(currentReelsData.match_reels) > 0 || 
                          parseInt(currentReelsData.missMatch_reels) > 0 || 
                          parseInt(currentReelsData.wrong_mismatch) > 0;
      
      if (hasValidData) {
        console.log("Initial API call after 2 minutes");
        FetchReelsData();
        lastApiCallTime.current = Date.now();
      }
    }, 120000); // 2 minutes

    // Set up recurring interval every 2 minutes
    apiCallInterval.current = setInterval(() => {
      const currentReelsData = reelsDataRef.current;
      const hasValidData = parseInt(currentReelsData.match_reels) > 0 || 
                          parseInt(currentReelsData.missMatch_reels) > 0 || 
                          parseInt(currentReelsData.wrong_mismatch) > 0;
      
      if (hasValidData) {
        console.log("Scheduled API call triggered successfully");
        FetchReelsData();
        lastApiCallTime.current = Date.now();
      }
    }, 120000); // 2 minutes

    return () => {
      if (initialTimeout) clearTimeout(initialTimeout);
      if (apiCallInterval.current) clearInterval(apiCallInterval.current);
    };
  }, []); // Empty dependency array - runs only once on mount

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