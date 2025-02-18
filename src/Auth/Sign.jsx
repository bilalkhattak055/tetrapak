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
import { BarLoader    } from 'react-spinners';
import api from "../api/api";
import { isTokenExpired } from '../_helper/helper'; 

const Signin = ({ selected }) => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const [loader, setloader] = useState(false);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState("");
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);

  useEffect(() => {
    localStorage.setItem("profileURL", man);

    if (location.state?.showToast) {
      toast.success("Please Sign in.");
    }
  }, [value, location.state]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setloader(true)
    setValue(man);
    setName(localStorage.getItem("name") || "Emay Walter");
    const auth= await isAuthenticateUser(email, password, setRole);
    if (auth) {

      // for set access token in header
      const getInfoLocal = JSON.parse(localStorage.getItem('userData'));
      if(getInfoLocal?.accessToken  && !isTokenExpired() ){ 
        api.defaults.headers.common['Authorization'] = getInfoLocal?.accessToken;
        api.defaults.headers.common['Token-Type'] = getInfoLocal?.accessToken ? "jwt": "none";
      }
      console.log(getInfoLocal,'users data set')
      // ----------------x------------------------x-----------------------

      const user_role=JSON.parse(
        localStorage.getItem("role")
      );
      if(user_role === 'factory'){
        if(JSON.parse(localStorage.getItem('userData'))?.id == 129){
          history(
            `${process.env.PUBLIC_URL}/dashboard/summary/${user_role}`,
            { state: { showToast: true } }
          );
        }
        else{
          history(
            `${process.env.PUBLIC_URL}/dashboard/default/${user_role}`,
            { state: { showToast: true } }
          );
        }
        setloader(false)
      }
      else if(user_role === "qa"){
        history(
          `${process.env.PUBLIC_URL}/dashboard/defaultqa/${user_role}`,
          { state: { showToast: true } }
        );
        setloader(false)
      }
      else{
        history(
          `${process.env.PUBLIC_URL}/dashboard/default/${user_role}`,
          { state: { showToast: false } }
        );
        setloader(false)
      }
     
    }
    else {
      setloader(false)
      toast.error("Incorrect Username or Password!");
    }
  };

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
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form" onSubmit={loginAuth}>
                  <H2
                    attrH2={{
                      className: "w-100 text-center ",
                      style: { color: "#1A3D6F" },
                    }}
                  >
                    Login
                  </H2>
                  {loader?<div className="w-100 d-flex justify-content-center mt-4">
                    <BarLoader />
                  </div>:
                  <>
                  <FormGroup className="form-Group">
                    <Input
                      className="form-control sign-input"
                      type="email"
                      required
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />

                    <Mail className="Email-icon" width={20} height={20} />
                  </FormGroup>
                  <FormGroup className="position-relative margin-bottom-1">
                    <div className="position-relative">
                      <Input
                        className="form-control sign-input"
                        placeholder="Password"
                        required
                        type={togglePassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <div
                        className="show-hide"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        <span>
                          {togglePassword ? (
                            <Eye width={20} height={20} />
                          ) : (
                            <EyeOff width={18} height={18} />
                          )}
                        </span>
                      </div>
                    </div>
                  </FormGroup>

                  <div className="mb-4">
                    <Link to={`${process.env.PUBLIC_URL}/resetpassword`} className="link-underline-primary forgot-password">
                      {ForgotPassword}
                    </Link>
                  </div>
                  <Btn
                    attrBtn={{
                      color: "#1A3D6F",
                      className: "sign-btn d-block w-100 mt-2",
                      style: { BackgroundColor: "#1A3D6F" },
                      type: "submit",
                      // onClick: (e) => loginAuth(e)
                    }}
                  >
                    {SignIn}
                  </Btn>
                  </>
                  }
                  
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
