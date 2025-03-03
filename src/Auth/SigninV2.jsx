import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { isAuthenticateUser } from './authHelper';
import { BarLoader } from 'react-spinners';
import api from '../api/api';
import { isTokenExpired } from '../_helper/helper';
import Enums from './Enum';
import { Btn } from '../AbstractElements';
import AxenLogin from '../assets/images/logo/TetraLogo.svg';
import Disrupt from './Disrupt.svg';
import DesignTop from './DesignTop.svg';
import DesignBottom from './DesignBottom.svg';
import DesignBottom2 from './DesignBottom2.svg';
import Axens1 from './preview.png';


const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
//sign in kl
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftPanel: (isMobile) => ({
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '52%',
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  }),
  dashboardContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 0,
  },
  dashboardImage: {
    width: '100%',
    height: '95%',
    //zIndex: 2,
    //filter: 'drop-shadow(-10px 0px 10px rgba(0, 0, 0, 0.40))', 
    objectFit: 'contain',
    //objectPosition: 'right', 
  },
  rightPanel: (isMobile) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '2rem 0' : '2rem',
    minHeight: '100vh',
    width: isMobile ? '100%' : '56%',
    marginLeft: isMobile ? 0 : '50%',
  }),
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    //padding: '0 15px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  logoTop: {
    width: 'auto',
    height: 'auto',
    marginBottom: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    marginBottom: '20px', // Add spacing below the login card
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 9999,
  },
  colorinput: {
    color: '#635470 !important',
  },
  DesignTop1: {
    position: 'absolute',
    top: '-58px',
    right: '39px',
    opacity: '0.4',
    zIndex: 1,
  },
  DesignTop2: {
    width: 'auto',
    position: 'absolute',
    top: '-55px',
    right: '186px',
    opacity: '0.4',
    zIndex: 1,
  },
  DesignBottom1: {
    width: 'auto',
    position: 'absolute',
    opacity: '0.4',
    bottom: '-80px',
    left: '17px',
    zIndex: 1,
  },
  DesignBottom2: {
    width: 'auto',
    position: 'absolute',
    opacity: '0.4',
    bottom: '-80px',
    left: '168px',
    zIndex: 1,
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [togglePassword, setTogglePassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();
  const isMobile = width <= 990;

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success('Please Sign in.');
    }
  }, [location.state]);

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
        }

        const user_role = JSON.parse(localStorage.getItem('role'));

        switch (user_role) {
          case Enums.FACTORY:
            navigate(`${process.env.PUBLIC_URL}/dashboard/default/${Enums.FACTORY}`, {
              state: { showToast: true },
            });
            break;
          case Enums.QA:
            navigate(`${process.env.PUBLIC_URL}/dashboard/defaultqa/${Enums.QA}`, {
              state: { showToast: true },
            });
            break;
          default:
            navigate(`${process.env.PUBLIC_URL}/dashboard/default/${Enums.DEFAULT}`, {
              state: { showToast: false },
            });
        }
      } else {
        setError('Invalid email or password');
        toast.error('Incorrect Username or Password!');
      }
    } catch (err) {
      setError('An error occurred during login');
      toast.error('Login failed. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <div style={styles.loaderContainer}>
          <BarLoader color="#023F88" />
        </div>
      ) : (
        <div style={styles.wrapper}>
          <div style={styles.leftPanel(isMobile)}>
            <div style={styles.dashboardContainer}>
              <img src={Axens1} alt="Axen1" style={styles.dashboardImage} />
            </div>
            {/** 
            <img src={DesignTop} alt="design" style={styles.DesignTop1} />
            <img src={DesignTop} alt="design" style={styles.DesignTop2} />
            <img src={DesignBottom} alt="design" style={styles.DesignBottom1} />
            <img src={DesignBottom2} alt="design" style={styles.DesignBottom2} />
          */}
          </div>

          <div style={styles.rightPanel(isMobile)}>
            <div style={styles.contentWrapper}>
              {/**<img src={AxenLogin} alt="Axen Logo" style={styles.logoTop} />*/}

              <Card style={styles.card}>
                <CardBody>
                  <div className="text-left mb-5">
                    <h1 style={{ textAlign: 'left', fontWeight: 'bold' }}>
                      Hi, <span style={{ color: '#023F88' }}>Welcome Back!</span>
                    </h1>
                    <p style={{ textAlign: 'left', fontSize: '20px', marginTop: '8px' }}>
                      Are you <span style={{ fontWeight: 700,color:"#023F88" }}>Ready</span> to Check <span style={{ fontWeight: 700,color:"#023F88" }}>Inspection Stats</span> ?
                    </p>
                  </div>

                  {error && (
                    <Alert color="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit} className='mt-2'>
                    <FormGroup className="mb-1">
                      <Label for="email" className="mb-1">
                        Email Address
                      </Label>
                      <Input
                        styles={styles.colorinput}
                        color="#635470"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-1">
                      <Label for="password" className="mb-1">
                        Password
                      </Label>
                      <div style={styles.passwordWrapper}>
                        <Input
                          id="password"
                          type={togglePassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                        <div
                          style={styles.eyeIcon}
                          onClick={() => setTogglePassword(!togglePassword)}
                        >
                          {togglePassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </div>
                      </div>
                    </FormGroup>

                    <div className="mb-3">
                      <a href={`${process.env.PUBLIC_URL}/resetpassword`} style={{ color: "#555770",fontSize:"13px" }}>
                       Forgot Password ? Click Here
                      </a>
                    </div>

                    <Btn
                      attrBtn={{
                        color: 'secondary',
                        className: 'sign-btn d-block w-100 ',
                        type: 'submit',
                      }}
                    >
                      Sign In
                    </Btn>
                  </Form>
                </CardBody>
              </Card>
            </div>
            <img src={Disrupt} alt="disrupt logo"  />
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}