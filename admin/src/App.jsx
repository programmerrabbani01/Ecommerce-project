import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./router/router.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
