import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter.jsx";
import privetRouter from "./privetRouter.jsx";

// create browser router

const router = createBrowserRouter([...publicRouter, ...privetRouter]);

// export default router

export default router;
