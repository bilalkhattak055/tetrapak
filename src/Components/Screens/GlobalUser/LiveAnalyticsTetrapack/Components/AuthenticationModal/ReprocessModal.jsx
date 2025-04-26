import React, { useState } from 'react';
import { Modal, FormGroup } from "reactstrap";
import loader from '../../asset/process2.svg';
import left from '../../asset/left.svg';
import Authentication from './Authentication';
import tetraPakGraphService from '../../../../../../api/TetraPakGraphService';

const ReprocessModal = ({ isOpen, toggle, onAuthStatusChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [conveyorResponse, setConveyorResponse] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const userid = JSON.parse(localStorage.getItem('userId'));
    

    // Define operation type IDs as constants
    const OPERATION_TYPE = {
        REPROCESS: 1,
        BYPASS: 2
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setConveyorResponse(null);
    };
    
    const handleConveyorResponse = (response) => {
        setConveyorResponse(response);
    };
    
    const handleClose = () => {
        setSelectedOption(null);
        setConveyorResponse(null);
        // Reset authentication states when closing the modal
        if (onAuthStatusChange) {
            onAuthStatusChange({
                authState: false,
                bypassState: false,
                reprocessState: false
            });
        }
        toggle();
    };
    
    const handleBack = () => {
        if (selectedOption === 'reprocess' && conveyorResponse === null) {
            setSelectedOption(null);
        }
        else if (selectedOption === 'reprocess' && conveyorResponse === 'yes') {
            setConveyorResponse(null);
        }
        else if (selectedOption === 'reprocess' && conveyorResponse === 'no') {
            setConveyorResponse(null);
        }
        else if (selectedOption === 'bypass') {
            setSelectedOption(null);
        }
    };

    const showBackButton = selectedOption !== null;
    
    const handleProceedFurther = () => {
        if (selectedOption === 'bypass') {
            handleOpenModal();
        } else if (selectedOption === 'reprocess' && conveyorResponse === 'no') {
            handleClose();
        }
    };
    
    // Modified updateProcess to use dynamic operation_type_id
    const updateProcess = async () => {
        try {
          const operationTypeId = selectedOption === 'reprocess' ? OPERATION_TYPE.REPROCESS : OPERATION_TYPE.BYPASS;
      
          const payload = {
            inspection_operations: [
              {
                client_id: 1,
                factory_id: 1,
                user_id: userid,
                object_id: 3,
                operation_type_id: operationTypeId
              },
            ],
          };
      
          console.log(`Calling API with operation_type_id: ${operationTypeId} for ${selectedOption}`);
      
          const response = await tetraPakGraphService.updateSyncRow(payload);
          if (response) {
            if (onAuthStatusChange) {
              onAuthStatusChange({
                authState: true,
                bypassState: selectedOption === 'bypass',
                reprocessState: selectedOption === 'reprocess'
              });
            }
            handleClose();
          }
        } catch (error) {
          console.error("Error updating operations:", error);
        }
      };
      
    
    const handleAuthResult = (result) => {
        setIsAuthenticated(result);
        if (result) {
            console.log(`Authentication successful. Now calling updateProcess for ${selectedOption}...`);
            updateProcess();
            // Close the authentication modal
            setIsModalOpen(false);
        } else {
            console.log("Authentication failed in reprocess modal");
        }
    };
    
    return (
        <>
                <Modal
                    isOpen={isOpen}
                    toggle={handleClose}
                    centered
                    className="modal-dialog-centered d-flex align-items-center justify-content-center"
                    style={{ maxWidth: "500px" }}
                >
                    <div className="p-4 w-100 rounded-lg" style={{ border: "4px solid #023F88", backgroundColor: "#fff" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Back button */}
                            {showBackButton ? (
                                <button
                                    type="button"
                                    className="btn border-0 d-flex align-items-center p-0"
                                    style={{ color: "#023F88" }}
                                    onClick={handleBack}
                                >
                                    <img src={left} style={{ width: "60px", marginRight: "-10px", marginTop: "10px" }} alt="Back arrow" />
                                    <span>Back</span>
                                </button>
                            ) : (
                                <div></div> /* Empty div to maintain flexbox spacing */
                            )}

                            {/* Close button */}
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                        </div>

                        <div className="text-center">
                            <img className="mb-2" src={loader} alt="Process icon" />
                            <h5 className="mb-3" style={{ color: "#023F88" }}>Reprocess</h5>

                            {/* Initial state - option selection */}
                            {!selectedOption && (
                                <p className="mb-3" style={{ color: "#023F88" }}>
                                    Do you want to{" "}
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        <a
                                            onClick={() => handleOptionSelect('bypass')}
                                            style={{
                                                color: "#0E0D0B",
                                                fontWeight: 500,
                                                textDecoration: "underline",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Bypass
                                        </a>
                                        <span style={{ color: "#0E0D0B", fontWeight: 600 }}>OR</span>
                                        <a
                                            onClick={() => handleOptionSelect('reprocess')}
                                            style={{
                                                color: "#0E0D0B",
                                                fontWeight: 500,
                                                textDecoration: "underline",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Reprocess
                                        </a>
                                    </span>
                                </p>
                            )}

                            {/* Show conveyor question when reprocess is selected */}
                            {selectedOption === 'reprocess' && conveyorResponse === null && (
                                <p className="mb-3" style={{ color: "#023F88" }}>
                                    Did you change the sticker for reprocessing?
                                </p>
                            )}

                            {/* Show authentication message when conveyor response is yes */}
                            {selectedOption === 'reprocess' && conveyorResponse === 'yes' && (
                                <p className="mb-3" style={{ color: "#023F88" }}>
                                    Authentication required to proceed
                                </p>
                            )}

                            {/* When bypass is selected or conveyor response is no */}
                            {(selectedOption === 'bypass' || (selectedOption === 'reprocess' && conveyorResponse === 'no')) && (
                                <p className="mb-3" style={{ color: "#023F88" }}>
                                    Are you sure you want to bypass and run the conveyer?
                                </p>
                            )}
                        </div>

                        <FormGroup style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {/* Initial state - no buttons */}
                            {!selectedOption && null}

                            {/* Bypass option selected - show proceed button */}
                            {selectedOption === 'bypass' && (
                                <button
                                    onClick={handleOpenModal}
                                    className="btn text-white px-4 py-2 shadow-sm"
                                    style={{ backgroundColor: "#023F88", fontSize: "15px" }}
                                >
                                    Proceed Further
                                </button>
                            )}

                            {/* Reprocess selected, show Yes/No buttons for conveyor question */}
                            {selectedOption === 'reprocess' && conveyorResponse === null && (
                                <div className="d-flex gap-3">
                                    <button
                                        onClick={() => handleConveyorResponse('yes')}
                                        className="btn text-white px-4 py-2 shadow-sm"
                                        style={{ backgroundColor: "#28a745", fontSize: "15px" }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => handleConveyorResponse('no')}
                                        className="btn text-white px-4 py-2 shadow-sm"
                                        style={{ backgroundColor: "#dc3545", fontSize: "15px" }}
                                    >
                                        No
                                    </button>
                                </div>
                            )}

                            {/* If conveyor response is yes, show authenticate button */}
                            {selectedOption === 'reprocess' && conveyorResponse === 'yes' && (
                                <button
                                    onClick={handleOpenModal}
                                    className="btn text-white px-4 py-2 shadow-sm"
                                    style={{ backgroundColor: "#023F88", fontSize: "13px" }}
                                >
                                    Proceed to Authenticate
                                </button>
                            )}

                            {/* If conveyor response is no, show proceed button (same as bypass) */}
                            {selectedOption === 'reprocess' && conveyorResponse === 'no' && (
                                <button
                                    onClick={handleProceedFurther}
                                    className="btn text-white px-4 py-2 shadow-sm"
                                    style={{ backgroundColor: "#023F88", fontSize: "15px" }}
                                >
                                    Proceed Further
                                </button>
                            )}
                        </FormGroup>
                    </div>
                    {/* Pass the selected option to Authentication component */}
                    <Authentication
                        isOpen={isModalOpen}
                        toggle={toggleModal}
                        authOption={selectedOption}
                        isAuthenticated={handleAuthResult}
                    />
                </Modal>
            
        </>
    );
};

export default ReprocessModal;