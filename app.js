const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const viewRouter = require("./routes/viewRoutes");
const artworkRouter = require("./routes/artworkRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const artistRouter = require("./routes/artistRoutes");
const cartRouter = require("./routes/cartRoutes");
// const categoryRouter = require("./routes/categoryRoutes");
// const commentRouter = require("./routes/commentRoutes");
const AppError = require("./util/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// - Serving static files
app.use(express.static(path.join(__dirname, "public")));

// - Set security HTTP headers
app.use(helmet());

// - Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
// -- All the routes which start with /api will be limited
app.use("/api", limiter);

// - Body parser, reading data from the body into req.body
app.use(express.json());
app.use(cookieParser());

// - Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// - Data sanitization against XSS
app.use(xss());

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdnjs.cloudflare.com"
  );
  next();
});

// 3) ROUTES

app.use("/", viewRouter);
app.use("/api/v1/artworks", artworkRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/artists", artistRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);
// app.use("/api/v1/categories", categoryRouter);
// app.use("/api/v1/comments", commentRouter);
app.all("*", (req, res, next) => {
  next(new AppError("Page not found!", 404));
});

app.use(globalErrorHandler);

module.exports = app;
