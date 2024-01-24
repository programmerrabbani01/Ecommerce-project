import ForGotPassword from "../pages/ForGotPassword.jsx";
import Login from "../pages/Login.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import PublicGard from "./PublicGard.jsx";

// create public router

const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forGotPassword",
        element: <ForGotPassword />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
    ],
  },
];

// export public router

export default publicRouter;
