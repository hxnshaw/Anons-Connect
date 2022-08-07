require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//PACKAGES.
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//DATABASE
const connectDB = require("./db/connect");

//ROUTERS
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const searchRouter = require("./routes/searchRouter");
const commentRouter = require("./routes/commentRouter");

app.get("/", (req, res) => {
  return console.log("Anon");
});

//MIDDLEWARE
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET_TOKEN));

//CUSTOM LOGGER (FOR PRACTICE)
app.use((req, res, next) => {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
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
