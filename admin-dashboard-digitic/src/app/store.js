import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/customer/userSlice.js";
import productReducer from "../features/product/productSlice.js";
import brandReducer from "../features/brand/brandSlice.js";
import productCategoryReducer from "../features/productCategory/pCategorySlice.js";
import colorReducer from "../features/color/colorSlice.js";
import blogReducer from "../features/blog/blogSlice.js";
import blogCategoryReducer from "../features/blogCategory/blogCategorySlice.js";
import enquireReducer from "../features/enquire/enquireSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import tagReducer from "../features/tag/tagSlice.js";
import couponReducer from "../features/coupon/couponSlice.js";
import sizeReducer from "../features/size/sizeSlice.js";

// create store

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    enquire: enquireReducer,
    order: orderReducer,
    tag: tagReducer,
    coupon: couponReducer,
    size: sizeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export store

export default store;
