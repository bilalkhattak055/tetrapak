import React, { useState } from "react";
import { Modal, FormGroup, Label } from "reactstrap";
import loader from '../../asset/loader.svg'

const Authentication = ({ isOpen, toggle }) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                centered
                className="modal-dialog-centered d-flex align-items-center justify-content-center"
                style={{ maxWidth: "450px" }}
            >
                <div className="p-4 w-100 rounded-lg" style={{ border: "4px solid #023F88", backgroundColor: "#fff" }}>
                    <div className="text-center">
                        <img className="mb-2" src={loader} />
                        <h5 className="mb-3" style={{ color: "#023F88" }}>Confirm Your Identity to Proceed!</h5>
                    </div>
                    <FormGroup style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <div className="mb-3" style={{display:"flex", flexDirection:"column"}}>
                        <input className="mb-2 px-4 py-2" style={{borderRadius:"5px",border:"1px solid #C7C9D9"}} placeholder="Enter Email*" type="email" />
                        <input className="px-4 py-2" style={{borderRadius:"5px",border:"1px solid #C7C9D9"}} placeholder="Enter Password*" type="password" />
                        </div>
                        <button className="btn text-white px-4 py-2 shadow-sm "  style={{ backgroundColor: "#023F88", fontSize: "15px" }}>
                            Authenticate
                        </button>
                    </FormGroup>
                </div>
            </Modal>
        </>
    )
}
export default Authentication;