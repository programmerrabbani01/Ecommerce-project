import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import notFound from "./middlewares/notFount.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import blogRoute from "./routes/blogRoute.js";
import blogCategoryRoute from "./routes/blogCategoryRoute.js";
import productCategoryRoute from "./routes/productCategoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import tagRoute from "./routes/tagRoute.js";
import couponRoute from "./routes/couponRoute.js";
import colorRoute from "./routes/colorRoute.js";
import enqRoute from "./routes/enqRoute.js";
// init express

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// static folder

app.use(express.static(path.join(path.resolve() + "/public")));

// routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/blogCategory", blogCategoryRoute);
app.use("/api/v1/productCategory", productCategoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/coupon", couponRoute);
app.use("/api/v1/color", colorRoute);
app.use("/api/v1/enq", enqRoute);
app.use("/api/v1/auth", authRoute);

// error handlers

app.use(errorHandler);

// 404 not found handler

app.use(notFound);

// export app

export default app;
