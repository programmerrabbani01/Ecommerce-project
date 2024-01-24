// create public router

import Layout from "../components/Layout.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Login from "../pages/Login.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import SignUp from "../pages/SignUp.jsx";

const publicRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
];

// export public router

export default publicRouter;
