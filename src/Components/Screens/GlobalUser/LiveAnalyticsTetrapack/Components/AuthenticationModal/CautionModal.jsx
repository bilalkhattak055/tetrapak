import React, { useEffect, useState } from "react";
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
  const [userId, setUserId] = useState(null);

  const getUserId = (id) => {
    setUserId(id);
    console.log("user id is there in parent", id);
  }

  // Reason -> ID mapping
  const reasonIdMap = {
    "Camera Problem": 1,
    "Time Problem": 2,
    "Detection Problem": 3,
  };

  // Toggle modals
  const toggleReprocessModal = () => setIsReprocessModalOpen(!isReprocessModalOpen);
  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  // Called after successful authentication
  const updateReason = async () => {
    try {
      // Take the first selected reason (or adjust to handle multiple, if needed)
      const validationReasonId = selectedReasons.length > 0 ? reasonIdMap[selectedReasons[0]] : null;

      const payload = {
        inspection_alerts: [
          {
            client_id: 1,
            factory_id: 1,
            user_id: userId,
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
        // If you want to close the CautionModal after a successful update, call toggle() here
        // toggle();
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

          {/* Action buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3 mb-3">
            <button
              className="btn btn-success px-4 py-3 shadow-sm"
              style={{ fontSize: "15px" }}
              onClick={toggleReprocessModal}
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
      />

      {/* Authentication Modal */}
      <Authentication
        isOpen={isAuthModalOpen}
        toggle={toggleAuthModal}
        authOption={handleAuthResult} 
        isAuthenticated={handleAuthResult}  
        userid={getUserId} />
    </AuthProvider>
  );
};

export default CautionModal;