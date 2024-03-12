import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice.js";
import productReducer from "../features/products/productSlice.js";
import blogReducer from "../features/blogs/blogSlice.js";

// create store

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    product: productReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export store

export default store;
