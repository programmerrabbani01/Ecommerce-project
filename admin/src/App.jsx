import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router/router.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllWishlist } from "./features/user/userApiSlice.js";
import { getAllProducts } from "./features/products/productsApiSlice.js";
import { getAllBlog } from "./features/blogs/blogApiSlice.js";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllBlog());

    if (user) {
      dispatch(getAllWishlist());
    }
  }, [dispatch, user]);

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     dispatch(loggedInUser());
  //   }
  // }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
