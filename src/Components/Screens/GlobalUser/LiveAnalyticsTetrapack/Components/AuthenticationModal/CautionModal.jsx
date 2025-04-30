import React, { useEffect, useState, useRef } from "react";
import { Modal, Label, Collapse } from "reactstrap";
import { AlertTriangle, Check } from "lucide-react";
import Authentication from "./Authentication";
import { AuthProvider } from "../../context/AuthContext";
import ReprocessModal from "./ReprocessModal";
import tetraPakGraphService from "../../../../../../api/TetraPakGraphService";
import useMismatchStore from "../../Zustand/Store";

const CautionModal = ({ isOpen, toggle }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isReprocessModalOpen, setIsReprocessModalOpen] = useState(false);
  const [isMismatchOpen, setIsMismatchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userid = JSON.parse(localStorage.getItem('userId'));
  
  // Use Zustand store for mismatch button state
  const { mismatchButtonState, setMismatchButtonState } = useMismatchStore();
  
  // Authentication states
  const [authState, setAuthState] = useState(false);
  const [bypassState, setBypassState] = useState(false);
  const [reprocessState, setReprocessState] = useState(false);
  const [wrongMisMatchState, setWrongMisMatchState] = useState(false);
  const [correctMatchState, setCorrectMatchState] = useState(false);
  const [statusWsConnected, setStatusWsConnected] = useState(false);
  const statusSocketRef = useRef(null);
  const intervalRef = useRef(null);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8064');
    statusSocketRef.current = ws;

    ws.onopen = () => {
      console.log('Status WebSocket connected');
      setStatusWsConnected(true);
    };

    ws.onclose = () => {
      console.log('Status WebSocket disconnected, attempting reconnect in 3 seconds...');
      setStatusWsConnected(false);
      setTimeout(() => {
        connectWebSocket(); // Attempt to reconnect
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatusWsConnected(false);
    };

    return ws;
  };

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Watch for changes in mismatchButtonState from Zustand store
  useEffect(() => {
    if (statusWsConnected && statusSocketRef.current) {
      try {
        const statusData = {
          auth_state: authState,
          bypass_state: bypassState,
          reprocess_state: reprocessState,
          wrong_mismatch: wrongMisMatchState,
          correct_match: correctMatchState,
          mismatch_button_pressed: mismatchButtonState // Use Zustand state directly
        };

        statusSocketRef.current.send(JSON.stringify(statusData));
        console.log('Sent mismatch button state to backend:', statusData);
      } catch (error) {
        console.error('Error sending mismatch button update:', error);
      }
    }
  }, [mismatchButtonState, statusWsConnected, authState, bypassState, reprocessState, wrongMisMatchState, correctMatchState]);

  // Function to send status updates through the existing WebSocket connection
  const sendStatusUpdate = () => {
    if (!statusSocketRef.current || statusSocketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('Status WebSocket not connected. Cannot send update.');
      return;
    }

    try {
      const statusData = {
        auth_state: authState,
        bypass_state: bypassState,
        reprocess_state: reprocessState,
        wrong_mismatch: wrongMisMatchState,
        correct_match: correctMatchState,
        mismatch_button_pressed: mismatchButtonState // Use Zustand state directly
      };

      statusSocketRef.current.send(JSON.stringify(statusData));
      console.log('Sent status update to backend:', statusData);
    } catch (error) {
      console.error('Error sending status update:', error);
    }
  };

  // Watch for changes in authentication states and send updates
  useEffect(() => {
    if (statusWsConnected) {
      sendStatusUpdate();
    }
  }, [authState, bypassState, reprocessState, wrongMisMatchState, correctMatchState, mismatchButtonState, statusWsConnected]);
  
  // Set up interval for periodic status updates
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Create new interval
    intervalRef.current = setInterval(() => {
      sendStatusUpdate();
    }, 6000); // Update every 6 seconds
    
    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [authState, bypassState, reprocessState, wrongMisMatchState, correctMatchState, mismatchButtonState, statusWsConnected]);

  const reasonIdMap = {
    "Camera Problem": 1,
    "Time Problem": 2,
    "Detection Problem": 3,
  };

  const toggleReprocessModal = () => setIsReprocessModalOpen(!isReprocessModalOpen);
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  
  // Handler for correct match button
  const handleCorrectMatch = () => {
    // Set the correct match state to true to send to backend
    setCorrectMatchState(true);
    // Set mismatch button state to true in Zustand store
    setMismatchButtonState(true);
    toggleReprocessModal();
  };
  
  const handleAuthStatusChange = (statusUpdate) => {
    console.log("Auth status changed:", statusUpdate);
    // Only update if the values are actually changing
    if (statusUpdate.authState !== authState) {
      setAuthState(statusUpdate.authState);
    }
    if (statusUpdate.bypassState !== bypassState) {
      setBypassState(statusUpdate.bypassState);
    }
    if (statusUpdate.reprocessState !== reprocessState) {
      setReprocessState(statusUpdate.reprocessState);
    }
  };

  const updateReason = async () => {
    try {
      const validationReasonId = selectedReasons.length > 0 ? reasonIdMap[selectedReasons[0]] : null;

      const payload = {
        inspection_alert_validation: [
          {
            client_id: 1,
            factory_id: 1,
            user_id: userid,
            object_id: 3,
            validation_reason_id: validationReasonId,
            model_id: 1,
            frame_id: 1,
          },
        ],
      };

      const response = await tetraPakGraphService.updateSyncRow(payload);
      if (!response) {
        console.log("Data Fetching Failed");
      } else {
        console.log("Update successful");
        // Set wrong mismatch state to true to send to backend
        setWrongMisMatchState(true);
        // Set mismatch button state to true in Zustand store
        setMismatchButtonState(true);
        toggle(); // Close the modal after successful update
      }
    } catch (error) {
      console.error("Error updating reasons:", error);
    }
  };

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason]
    );
  };
  
  const handleProceedFurther = () => {
    if (isAuthenticated) {
      updateReason();
      return;
    }
    if (selectedReasons.length === 0) return;
    toggleAuthModal();
  };
  const handleAuthResult = (result) => {
    console.log("Auth result received:", result);
    setIsAuthenticated(result);
    if (result) {
        console.log("Authentication successful. Now calling updateReason...");
        updateReason();
        
        // Reset all state flags
        setCorrectMatchState(false);
        setWrongMisMatchState(false);
        setAuthState(false);
        setBypassState(false);
        setReprocessState(false);
        setMismatchButtonState(false);
        toggleAuthModal();
    } else {
        console.log("Authentication failed in caution modal");
    }
};

const handleMainModalClose = () => {
    setMismatchButtonState(false);
    setIsAuthenticated(false);
    setCorrectMatchState(false);
    setWrongMisMatchState(false);
    setAuthState(false);
    setBypassState(false);
    setReprocessState(false);
    
    toggle();
};

  return (
    <AuthProvider>
      <Modal
        isOpen={isOpen}
        toggle={handleMainModalClose}
        centered
        className="modal-dialog-centered d-flex align-items-center justify-content-center"
        style={{ maxWidth: "700px" }}
      >
        <div
          className="p-4 w-100 rounded-lg"
          style={{ border: "4px solid #023F88", backgroundColor: "#fff" }}
        >
          {/* Modal header */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleMainModalClose}
            ></button>
          </div>

          {/* Modal content */}
          <div className="text-center">
            <AlertTriangle style={{ color: "#023F88" }} size={50} />
            <h4 className="fw-bold mt-2" style={{ color: "#023F88" }}>
              Caution Required!
            </h4>
            <p style={{ color: "#000000" }}>
              Please review the information carefully before proceeding.
            </p>
            <p style={{ color: "#000000" }}>
              Is this mis-match correct or wrong?
            </p>
          </div>

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3 mb-3">
            <button
              className="btn btn-success px-4 py-3 shadow-sm"
              style={{ fontSize: "15px" }}
              onClick={handleCorrectMatch}
            >
              Correct
            </button>
            <button
              className="btn text-white px-4 py-3 shadow-sm"
              style={{ backgroundColor: "#DC3545", fontSize: "15px" }}
              onClick={() => setIsMismatchOpen(!isMismatchOpen)}
            >
              Wrong Miss match
            </button>
          </div>

          {/* Reason selection for "Wrong Mismatch" */}
          <Collapse isOpen={isMismatchOpen}>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p
                className="text-primary mb-3"
                style={{ fontSize: "18px", color: "#0d6efd" }}
              >
                *Select Reason
              </p>
              {["Camera Problem", "Time Problem", "Detection Problem"].map(
                (reason) => (
                  <div
                    className="d-flex align-items-center mb-2 w-100 justify-content-center"
                    key={reason}
                  >
                    <div
                      style={{ width: "150px" }}
                      className="d-flex align-items-center"
                    >
                      <div
                        className="custom-checkbox me-2"
                        style={{
                          width: "20px",
                          height: "20px",
                          border: selectedReasons.includes(reason)
                            ? "2px solid #023F88"
                            : "2px solid #000000",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          backgroundColor: "white",
                        }}
                        onClick={() => handleCheckboxChange(reason)}
                      >
                        {selectedReasons.includes(reason) && (
                          <Check size={14} color="#023F88" />
                        )}
                      </div>
                      <Label
                        className={
                          selectedReasons.includes(reason)
                            ? "text-primary mb-0"
                            : "text-dark mb-0"
                        }
                        style={
                          selectedReasons.includes(reason)
                            ? { color: "#023F88" }
                            : {}
                        }
                      >
                        {reason}
                      </Label>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="text-center mt-4">
              <button
                className="btn text-white px-4 py-2 shadow-sm"
                onClick={handleProceedFurther}
                style={{ backgroundColor: "#023F88", fontSize: "15px" }}
                disabled={selectedReasons.length === 0}
              >
                {isAuthenticated ? "Submit" : "Proceed Further"}
              </button>
            </div>
          </Collapse>
        </div>
      </Modal>

      {/* Reprocess Modal */}
      <ReprocessModal
        isOpen={isReprocessModalOpen}
        toggle={toggleReprocessModal}
        onAuthStatusChange={handleAuthStatusChange}
      />
      
      {/* Authentication Modal */}
      <Authentication
        isOpen={isAuthModalOpen}
        toggle={toggleAuthModal}
        authOption={handleAuthResult}
        isAuthenticated={handleAuthResult}
      />
    </AuthProvider>
  );
};

export default CautionModal;