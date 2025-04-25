import React, { useEffect, useState, useRef } from "react";
import { Modal, Label, Collapse } from "reactstrap";
import { AlertTriangle, Check } from "lucide-react";
import Authentication from "./Authentication";
import { AuthProvider } from "../../context/AuthContext";
import ReprocessModal from "./ReprocessModal";
import tetraPakGraphService from "../../../../../../api/TetraPakGraphService";

const CautionModal = ({ isOpen, toggle }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isReprocessModalOpen, setIsReprocessModalOpen] = useState(false);
  const [isMismatchOpen, setIsMismatchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userid = JSON.parse(localStorage.getItem('userId'));
  
  // Authentication states
  const [authState, setAuthState] = useState(false);
  const [bypassState, setBypassState] = useState(false);
  const [reprocessState, setReprocessState] = useState(false);
  const [wrongMisMatchState, setWrongMisMatchState] = useState(false);
  const [correctMatchState, setCorrectMatchState] = useState(false); 
  const [statusWsConnected, setStatusWsConnected] = useState(false);
  const statusSocketRef = useRef(null);
  const statusIntervalRef = useRef(null);  // Reference for the interval timer

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8064');
    statusSocketRef.current = ws;

    ws.onopen = () => {
      console.log('Status WebSocket connected');
      setStatusWsConnected(true);
      
      // Start sending status updates continuously once connected
      startContinuousStatusUpdates();
    };

    ws.onclose = () => {
      console.log('Status WebSocket disconnected');
      setStatusWsConnected(false);
      stopContinuousStatusUpdates();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatusWsConnected(false);
      stopContinuousStatusUpdates();
    };

    return () => {
      stopContinuousStatusUpdates();
      if (statusSocketRef.current) {
        statusSocketRef.current.close();
      }
    };
  }, []);

  // Function to send status updates through the WebSocket connection
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
        correct_match: correctMatchState 
      };

      statusSocketRef.current.send(JSON.stringify(statusData));
      console.log('Sent status update to backend:', statusData);
    } catch (error) {
      console.error('Error sending status update:', error);
    }
  };

  // Start continuous status updates
  const startContinuousStatusUpdates = () => {
    // Clear any existing interval first
    stopContinuousStatusUpdates();
    
    // Set new interval to send updates every 500ms (0.5 seconds)
    statusIntervalRef.current = setInterval(() => {
      sendStatusUpdate();
    }, 100);
    
    console.log('Started continuous status updates (every 0.5 seconds)');
  };

  // Stop continuous status updates
  const stopContinuousStatusUpdates = () => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
      console.log('Stopped continuous status updates');
    }
  };

  // Watch for changes in authentication states
  useEffect(() => {
    console.log("States changed:", { authState, bypassState, reprocessState, wrongMisMatchState, correctMatchState });
  if (authState || bypassState || reprocessState || wrongMisMatchState || correctMatchState) {
      const resetTimeoutId = setTimeout(() => {
        setAuthState(false);
        setBypassState(false);
        setReprocessState(false);
        setWrongMisMatchState(false);
        setCorrectMatchState(false);
      }, 1000);

      return () => {
        clearTimeout(resetTimeoutId);
      };
    }
  }, [authState, bypassState, reprocessState, wrongMisMatchState, correctMatchState]);

  // Reason -> ID mapping
  const reasonIdMap = {
    "Camera Problem": 1,
    "Time Problem": 2,
    "Detection Problem": 3,
  };

  // Toggle modals
  const toggleReprocessModal = () => setIsReprocessModalOpen(!isReprocessModalOpen);
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  
  // Handler for correct match button
  const handleCorrectMatch = () => {
    // Set the correct match state to true to send to backend
    setCorrectMatchState(true);
    
    // Open the reprocess modal (existing functionality)
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

  // Called after successful authentication or direct submission
  const updateReason = async () => {
    try {
      // Take the first selected reason (or adjust to handle multiple, if needed)
      const validationReasonId = selectedReasons.length > 0 ? reasonIdMap[selectedReasons[0]] : null;

      const payload = {
        inspection_alerts: [
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
        toggle(); // Close the modal after successful update
      }
    } catch (error) {
      console.error("Error updating reasons:", error);
    }
  };

  // Handle reason checkbox toggles
  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason]
    );
  };
  
  console.log("login status from child:", isAuthenticated);
  
  const handleProceedFurther = () => {
    if (isAuthenticated) {
      updateReason();
      return;
    }
    if (selectedReasons.length === 0) return;
    toggleAuthModal();
  };
  
  const handleAuthResult = (result) => {
    setIsAuthenticated(result);
    if (result) {
      console.log("Authentication successful. Now calling updateReason...");
      updateReason();
    } else {
      console.log("Authentication failed in caution modal");
    }
  };
  
  const handleMainModalClose = () => {
    toggle();
    setIsAuthenticated(false);
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

          {/* Status indicator (optional, for debugging) */}
          <div className="text-center mb-2" style={{ fontSize: '12px', color: statusWsConnected ? 'green' : 'red' }}>
            Status WebSocket: {statusWsConnected ? 'Connected' : 'Disconnected'}
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