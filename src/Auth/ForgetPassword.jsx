import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H2, H4, P } from "../AbstractElements";
import { ForgotPassword, SignIn } from "../Constant";
import { Eye, EyeOff, Mail } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";
import CustomizerContext from "../_helper/Customizer";
import { ToastContainer, toast } from "react-toastify";
import "./sign.css";
import { isAuthenticateUser } from "./authHelper";

const ForgetPassword = ({ selected }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [optBox, setoptBox] = useState(false);
    const [showLoading, setshowLoading] = useState(false);
    const [showResponse, setshowResponse] = useState(false);
    const [email, setemail] = useState('');
    const [showPassFields, setshowPassFields] = useState(false);
    const [efaultOTP, setefaultOTP] = useState(['11', '22', '33', '44']);
    const [optVERIFIED, setotpVERIFIED] = useState(false);
    const [otpverficationMSG, setotpverficationMSG] = useState(false);
    const [checkPasslength, setcheckPasslength] = useState(false);
    const [showConfirmPass, setshowConfirmPass] = useState(false)

    const validatePassword = (password) => {
        console.log(password, 'getting pass')
        const isLongEnough = password.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        if (isLongEnough && hasSpecialChar && hasUpperCase && hasLowerCase) {
            setcheckPasslength(true)
            return true;
        } else {
            setcheckPasslength(false)
            return false;
        }
    };
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
    const handleOtpChange = (value, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        console.log(otp)
    };
    const handleresetReq = () => {
        if (email == '') {
            return alert('please enter your email')
        }
       const emailcheck= validateEmail(email);
       if(emailcheck){
        setoptBox(false)
        setshowLoading(true);
        setshowPassFields(false);
        setotpVERIFIED(false);
        setotpverficationMSG(false)
        setTimeout(() => {
            setshowLoading(false);
            setoptBox(true);
        }, 3000)
    }
    else{
        alert('Please enter valid email')
    }
    }
    const handleNewPassword = () => {
        console.log(newPassword, retypePassword);

        if (checkPasslength == true) {
            setotpVERIFIED(true);
            setotpverficationMSG(false)
            if (newPassword === retypePassword) {
                setTimeout(() => {
                    setshowResponse(true);
                    setotpVERIFIED(false);
                    setotpverficationMSG(false)
                }, 3000)
 
            }
            else {
                setTimeout(() => {
                    setotpVERIFIED(false);
                    setotpverficationMSG(true);
                }, 3000) 
            }
        } else {
            return
        }

    }
    const handleOTPcheck = () => {
        const isMatch = otp.every((value, index) => value === efaultOTP[index]);
        console.log('isMatch', isMatch);

        setotpverficationMSG(false);
        setotpVERIFIED(true)
        if (isMatch == true) {
            setTimeout(() => {
                setoptBox(false);
                setshowPassFields(true);
                setotpVERIFIED(false);
                setotpverficationMSG(false)
            }, 2000)
        }
        else {
            setTimeout(() => {
                setotpVERIFIED(false);
                setotpverficationMSG(true)
            }, 2000)

        }
    }
    useEffect(() => { 
        validatePassword(newPassword);
        if (checkPasslength == false) { setshowConfirmPass(false); setRetypePassword('') }
    }, [newPassword])

    return (
        <Fragment>
            <Container fluid={true} className="p-0 login-page">
                <Row>
                    <Col xs="12">
                        <img
                            className=" login-logo"
                            src={require("../assets/images/logo/login-logo.svg").default}
                            alt=""
                        />
                        <div className="login-card ">
                            <div className="login-main login-tab">
                                <div className="theme-form" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>

                                    <H2
                                        attrH2={{
                                            className: "w-100 text-center mb-3",
                                            style: { color: "#1A3D6F" },

                                        }}
                                    >
                                        Reset password
                                    </H2>
                                    {showResponse ? <>
                                        <p className="text-center">Password reset successfully</p>
                                        <Link to={`${process.env.PUBLIC_URL}/login`}>
                                            <button className="sign-btn d-block w-100 mt-2 btn" >
                                                Go to login page
                                            </button>
                                        </Link>
                                    </> : <>
                                        <div>

                                            <FormGroup className="form-Group d-flex align-items-center">
                                                <Input
                                                    className="form-control sign-input"
                                                    type="email"
                                                    required
                                                    placeholder="Email"
                                                    onChange={(e) => setemail(e.target.value)}
                                                    value={email}
                                                />
                                                <Mail className="Email-icon" width={20} height={20} />
                                            </FormGroup>
                                            <button className="sign-btn d-block w-100 mt-2 btn mb-3" onClick={handleresetReq} >
                                                {showLoading ? 'Loading...' : 'Verify'}
                                            </button>
                                        </div>

                                        {optBox ?
                                            <>
                                                <p className="mb-2">Didn't receive the OTP? <span style={{ color: 'red', cursor: 'pointer' }}>Resend</span></p>
                                                <div className="form-group">
                                                    <label>Enter OTP</label>
                                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            {otp.map((value, index) => (
                                                                <input
                                                                    key={index}
                                                                    type="text"
                                                                    value={value}
                                                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                                                    maxLength="2"
                                                                    placeholder="00"
                                                                    className="optboxcss"
                                                                    style={{ width: '50px', padding: '10px', textAlign: 'center', border: '1px grey', borderRadius: '10px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button className="sign-btn d-block w-100 mt-3 btn" onClick={handleOTPcheck} >
                                                        {optVERIFIED ? 'Verifing OTP...' : ' Verify OTP'}
                                                    </button>
                                                    {otpverficationMSG ? <p className="alert">OTP verification failed, Please enter valid OTP</p> : null}
                                                </div>

                                            </>
                                            : null}

                                        {showPassFields ? <>
                                            <p className={`${checkPasslength ? 'PassLengthCheck' : ''}`} style={{ color: checkPasslength ? 'Green' : 'red' }}>
                                                Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character.
                                            </p>
                                            <div className="form-group">
                                                <label>Enter new password</label>
                                                <input
                                                    type={'password'}
                                                    placeholder="New Password"
                                                    value={newPassword}
                                                    onChange={(e) => { setNewPassword(e.target.value); }}
                                                    className="resetinputfieldsborder"
                                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '0px', borderRadius: '10px' }}
                                                />
                                            </div>
                                            {showConfirmPass ? null : <button className="sign-btn d-block w-100 mt-3 btn" onClick={() => { if (checkPasslength == true) { setshowConfirmPass(true) } }}>
                                                Save
                                            </button>}
                                            {showConfirmPass ?
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        placeholder="Confirm New Password"
                                                        value={retypePassword}
                                                        onChange={(e) => setRetypePassword(e.target.value)}
                                                        className="resetinputfieldsborder"
                                                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '0px', borderRadius: '10px' }}
                                                    />

                                                    <button className="sign-btn d-block w-100 mt-3 btn" onClick={handleNewPassword} >
                                                        {optVERIFIED ? 'Please wait...' : 'Save'}
                                                    </button>
                                                    {otpverficationMSG ? <p className="text-center alert">Password confirmation failed</p> : null}
                                                </div> : null}

                                        </> : null}

                                    </>}
                                    {/* <p style={{ textAlign: 'center', marginTop: '10px' }}>
                                    Already have an password? <span style={{ color: 'blue', cursor: 'pointer' }}>Sign in</span>
                                </p> */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Fragment>
    );
};


export default ForgetPassword;
