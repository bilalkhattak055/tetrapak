import React, { useState, useEffect } from "react";
import { Modal, FormGroup } from "reactstrap";
import { CheckCircle, XCircle } from "lucide-react";
import loading from "../../asset/loader.svg";
import { isAuthenticateUser } from "../../../../../../Auth/authHelper";
import { isTokenExpired } from "../../../../../../_helper/helper";
import api from "../../../../../../api/api";
import { toast } from "react-toastify";

const Authentication = ({ isOpen, toggle, authOption, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState("idle");
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  // Handle sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoader(true);

    try {
      const auth = await isAuthenticateUser(email, password);

      if (auth) {
        const getInfoLocal = JSON.parse(localStorage.getItem('userData'));
        if (getInfoLocal?.accessToken && !isTokenExpired()) {
          api.defaults.headers.common['Authorization'] = getInfoLocal.accessToken;
          api.defaults.headers.common['Token-Type'] = getInfoLocal.accessToken ? 'jwt' : 'none';
          // Set isAuthenticated to true directly from the parent (passing through props)
          isAuthenticated(true);
          // Update authStatus to show success screen
          setAuthStatus("success");
          localStorage.setItem('userId', JSON.stringify(getInfoLocal?.id));
        }
      } else {
        setError('Invalid email or password');
        toast.error('Incorrect Username or Password!');
        // Update authStatus to show error screen
        setAuthStatus("error");
      }
    } catch (err) {
      setError('An error occurred during login');
      toast.error('Login failed. Please try again.');
      setAuthStatus("error");
    } finally {
      setLoader(false);
    }
  };

  const renderContent = () => {
    switch (authStatus) {
      case "idle":
        return (
          <>
            <div className="text-center">
              <img className="mb-2" src={loading} alt="loader" />
              <h5 className="mb-3" style={{ color: "#023F88" }}>
                Confirm Your Identity to Proceed!
              </h5>
            </div>
            <FormGroup
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  className="mb-2 px-4 py-2"
                  style={{ borderRadius: "5px", border: "2.5px solid #C7C9D9" }}
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="px-4 py-2"
                  style={{ borderRadius: "5px", border: "2.5px solid #C7C9D9" }}
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn text-white px-4 py-2 shadow-sm"
                style={{ backgroundColor: "#023F88", fontSize: "15px" }}
                onClick={handleSubmit}
              >
                Authenticate
              </button>
            </FormGroup>
          </>
        );

      case "success":
        return (
          <div className="text-center p-3">
            <CheckCircle size={50} color="green" />
            <h4 className="mt-3" style={{ color: "green" }}>
              Login Successful!
            </h4>
            <p>You have been authenticated successfully.</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                toggle();
              }}
            >
              Close
            </button>
          </div>
        );

      case "error":
        return (
          <div className="text-center p-3">
            <XCircle size={50} color="red" />
            <h4 className="mt-3" style={{ color: "red" }}>
              Login Failed
            </h4>
            <p>Wrong credentials!</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                setAuthStatus("idle");
              }}
            >
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleClose = () => {
    toggle();
    // Don't reset auth status when closing - we want to maintain the success state
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleClose}
      centered
      className="modal-dialog-centered d-flex align-items-center justify-content-center"
      style={{ maxWidth: "450px" }}
    >
      <div
        className="p-4 w-100 rounded-lg"
        style={{ border: "4px solid #023F88", backgroundColor: "#fff" }}
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        {renderContent()}
      </div>
    </Modal>
  );
};

export default Authentication;
