require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//PACKAGES.
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
//security packages
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

//CLOUDINARY SETUP
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//DATABASE
const connectDB = require("./db/connect");
//const sqlDatabase = require("./utils/database");

//ROUTERS
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const searchRouter = require("./routes/searchRouter");
const commentRouter = require("./routes/commentRouter");

//MYSQL
// sqlDatabase
//   .execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.get("/", (req, res) => {
//   return console.log("Anon");
// });

//MIDDLEWARE
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

//setup security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 20 * 60 * 1000, //20 minutes
    max: 100, //100 requests per 20 minutes,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET_TOKEN));
app.use(fileUpload({ useTempFiles: true }));

//CUSTOM LOGGER (FOR PRACTICE)
app.use((req, res, next) => {
  console.log("------------------------------");
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  console.log("------------------------------");

  next();
});

//MOUNT ROUTERS.
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/search/posts", searchRouter);
app.use("/api/v1/comments", commentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8888;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
