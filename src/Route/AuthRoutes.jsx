import ErrorPage1 from '../Components/Pages/ErrorPages/ErrorPage400';
import ErrorPage2 from '../Components/Pages/ErrorPages/ErrorPage401';
import ErrorPage3 from '../Components/Pages/ErrorPages/ErrorPage403';
import ErrorPage4 from '../Components/Pages/ErrorPages/ErrorPage404';
import Logins from '../Auth/Signin';
import Error500 from '../Components/Pages/ErrorPages/ErrorPage500';
import Error503 from '../Components/Pages/ErrorPages/ErrorPage503';
import RegisterSimple from '../Components/Pages/Authentication/RegisterSimple';
import ForgetPassword from '../Auth/ForgetPassword';

export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Logins /> },
  { path: `${process.env.PUBLIC_URL}/resetpassword`, Component: <ForgetPassword /> },

  //Error
  { path: `${process.env.PUBLIC_URL}/pages/errors/error400/:layout`, Component: <ErrorPage1 /> },
  { path: `${process.env.PUBLIC_URL}/pages/errors/error401`, Component: <ErrorPage2 /> },
  { path: `${process.env.PUBLIC_URL}/pages/errors/error403/:layout`, Component: <ErrorPage3 /> },
  { path: `${process.env.PUBLIC_URL}/pages/errors/error404/:layout`, Component: <ErrorPage4 /> },
  { path: `${process.env.PUBLIC_URL}/pages/errors/error500/:layout`, Component: <Error500 /> },
  { path: `${process.env.PUBLIC_URL}/pages/errors/error503/:layout`, Component: <Error503 /> },
  { path: `${process.env.PUBLIC_URL}/pages/authentication/register-simple`, Component: <RegisterSimple /> },
];
