import React, { useState } from "react";
import { Modal, FormGroup, Label } from "reactstrap";
import { AlertTriangle, Check } from "lucide-react";
import Authentication from "./Authentication";

const CautionModal = ({ isOpen, toggle }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
      
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
          <AlertTriangle style={{color:"#023F88"}} size={50} />
          <h4 className=" fw-bold mt-2" style={{color:"#023F88"}}>Caution Required!</h4>
          <p style={{color:"#000000",textWrap:"wrap"}}>Please review the information carefully before proceeding.</p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-success px-4 py-3 shadow-sm "style={{fontSize:"15px" }}>Correct</button>
          <button className="btn text-white px-4 py-3 shadow-sm "  style={{ backgroundColor: "#DC3545",fontSize:"15px" }}>
            Miss match
          </button>
        </div>

        {/* Reason Selection */}
        <div className="mt-4 mb-3 d-flex flex-column align-items-center">
          <p className="text-primary text-center" style={{fontSize:"18px"}}>*Select Reason</p>

          {["reason1", "reason2", "reason3"].map((reason, index) => (
            <FormGroup check className="d-flex" key={reason} style={{ gap: "8px" }}>
              <div
                className="custom-checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  border: selectedReasons.includes(reason) ? "2px solid #023F88" : "2px solid #000000",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent:"center",
                  alignItems:"center",
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
        </div>

        {/* Proceed Button */}
        <div className="text-center">
          <button className="btn text-white px-4 py-3 shadow-sm" onClick={handleOpenModal} style={{ backgroundColor: "#023F88",fontSize:"15px"}}>
            Proceed Further
          </button>
        </div>
      </div>
      <Authentication isOpen={isModalOpen} toggle={toggleModal}/>
    </Modal>
  );
};

export default CautionModal;
