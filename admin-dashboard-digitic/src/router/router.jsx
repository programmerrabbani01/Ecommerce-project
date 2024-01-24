import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter.jsx";
import PrivateRouter from "./privateRouter.jsx";

// create browser router

const router = createBrowserRouter([...publicRouter, ...PrivateRouter]);

// export browser router

export default router;
