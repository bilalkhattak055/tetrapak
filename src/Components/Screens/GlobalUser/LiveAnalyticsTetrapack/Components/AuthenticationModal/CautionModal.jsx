import React, { useState } from "react";
import { Modal, FormGroup, Label, Collapse } from "reactstrap";
import { AlertTriangle, Check } from "lucide-react";
import Authentication from "./Authentication";
import ReprocessModal from "./ReprocessModal";

const CautionModal = ({ isOpen, toggle }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReprocessModalOpen, setIsReprocessModalOpen] = useState(false);
  const [isMismatchOpen, setIsMismatchOpen] = useState(false);

  const toggleReprocessModal = () => setIsReprocessModalOpen(!isReprocessModalOpen);
  const handleOpenReprocessModal = () => {
    setIsReprocessModalOpen(true);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered 
      className="modal-dialog-centered d-flex align-items-center justify-content-center"
      style={{ maxWidth: "700px" }}
    >
      <div className="p-4 w-100 rounded-lg" style={{ border: "4px solid #023F88", backgroundColor: "#fff" }}>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn-close" aria-label="Close" onClick={toggle}></button>
        </div>

        {/* Warning Icon & Title */}
        <div className="text-center">
          <AlertTriangle style={{ color: "#023F88" }} size={50} />
          <h4 className="fw-bold mt-2" style={{ color: "#023F88" }}>Caution Required!</h4>
          <p style={{ color: "#000000", textWrap: "wrap" }}>
            Please review the information carefully before proceeding.
          </p>
          <p style={{ color: "#000000", textWrap: "wrap" }}>
            Is this mis-match correct or wrong?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-3 mb-3">
          <button
            className="btn btn-success px-4 py-3 shadow-sm"
            style={{ fontSize: "15px" }}
            onClick={handleOpenReprocessModal}
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

        {/* Reason Selection and Proceed Button with Transition */}
        <Collapse isOpen={isMismatchOpen}>
          <div className="mt-4 mb-3 d-flex flex-column align-items-center">
            <p className="text-primary text-center" style={{ fontSize: "18px" }}>*Select Reason</p>
            {["reason1", "reason2", "reason3"].map((reason, index) => (
              <FormGroup check className="d-flex" key={reason} style={{ gap: "8px" }}>
                <div
                  className="custom-checkbox"
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
                  }}
                  onClick={() => handleCheckboxChange(reason)}
                >
                  {selectedReasons.includes(reason) && <Check size={14} color="#023F88" />}
                </div>

                <Label
                  check
                  htmlFor={reason}
                  className={`fw-semibold ${selectedReasons.includes(reason) ? "text-primary" : "text-muted"}`}
                  style={selectedReasons.includes(reason) ? { color: "#023F88" } : {}}
                >
                  Reason number {index + 1}
                </Label>
              </FormGroup>
            ))}
            <div className="text-center mt-3">
              <button
                className="btn text-white px-4 py-3 shadow-sm"
                onClick={handleOpenModal}
                style={{ backgroundColor: "#023F88", fontSize: "15px" }}
              >
                Proceed Further
              </button>
            </div>
          </div>
        </Collapse>
      </div>

      <ReprocessModal isOpen={isReprocessModalOpen} toggle={toggleReprocessModal} />
      <Authentication isOpen={isModalOpen} toggle={toggleModal} />
    </Modal>
  );
};

export default CautionModal;
