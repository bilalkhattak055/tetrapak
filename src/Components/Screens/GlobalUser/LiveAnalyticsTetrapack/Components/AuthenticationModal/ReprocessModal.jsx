import React, { useState } from 'react';
import { Modal, FormGroup, Label } from "reactstrap";
import loader from '../../asset/process2.svg';
import left from '../../asset/left.svg';
import Authentication from './Authentication';

const ReprocessModal = ({ isOpen, toggle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [conveyorResponse, setConveyorResponse] = useState(null);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to handle option selection
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        // Reset conveyor response when changing options
        setConveyorResponse(null);
    };

    // Function to handle conveyor response
    const handleConveyorResponse = (response) => {
        setConveyorResponse(response);
    };

    // Function to reset all states when modal closes
    const handleClose = () => {
        setSelectedOption(null);
        setConveyorResponse(null);
        toggle();
    };

    // Function to handle back button
    const handleBack = () => {
        // If on conveyor response screen, go back to option selection
        if (selectedOption === 'reprocess' && conveyorResponse === null) {
            setSelectedOption(null);
        }
        // If on authentication screen, go back to conveyor question
        else if (selectedOption === 'reprocess' && conveyorResponse === 'yes') {
            setConveyorResponse(null);
        }
        // If on proceed screen after selecting no, go back to conveyor question
        else if (selectedOption === 'reprocess' && conveyorResponse === 'no') {
            setConveyorResponse(null);
        }
        // If on bypass screen, go back to option selection
        else if (selectedOption === 'bypass') {
            setSelectedOption(null);
        }
    };

    // Determine if back button should be visible
    const showBackButton = selectedOption !== null;

    return (
        <>
            <Modal
                isOpen={isOpen}
                toggle={handleClose}
                centered
                className="modal-dialog-centered d-flex align-items-center justify-content-center"
                style={{ maxWidth: "550px" }}
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
                                Do you want to {" "}
                                <a
                                    onClick={() => handleOptionSelect('bypass')}
                                    style={{ color: "#0E0D0B", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
                                >
                                    Bypass
                                </a>
                                /
                                <a
                                    onClick={() => handleOptionSelect('reprocess')}
                                    style={{ color: "#0E0D0B", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
                                >
                                    Reprocess
                                </a>
                            </p>
                        )}

                        {/* Show conveyor question when reprocess is selected */}
                        {selectedOption === 'reprocess' && conveyorResponse === null && (
                            <p className="mb-3" style={{ color: "#023F88" }}>
                                Do you want to run conveyer again?
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
                                Are you sure you dont want to stop conveyer?
                            </p>
                        )}
                    </div>

                    <FormGroup style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        {/* Initial state - no buttons */}
                        {!selectedOption && null}

                        {/* Bypass option selected - show proceed button */}
                        {selectedOption === 'bypass' && (
                            <button
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
                                Procced to Authenticate
                            </button>
                        )}

                        {/* If conveyor response is no, show proceed button (same as bypass) */}
                        {selectedOption === 'reprocess' && conveyorResponse === 'no' && (
                            <button

                                className="btn text-white px-4 py-2 shadow-sm"
                                style={{ backgroundColor: "#023F88", fontSize: "15px" }}
                            >
                                Proceed Further
                            </button>
                        )}
                    </FormGroup>
                </div>
                <Authentication isOpen={isModalOpen} toggle={toggleModal} />
            </Modal>
        </>
    );
};

export default ReprocessModal;