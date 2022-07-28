require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//PACKAGES.
const morgan = require("morgan");

//DATABASE
const connectDB = require("./db/connect");

//ROUTERS
const authRouter = require("./routes/authRouter");

app.get("/", (req, res) => {
  return console.log("Anon");
});

//MIDDLEWARE
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(morgan("tiny"));

//MOUNT ROUTERS.
app.use("/api/v1/auth", authRouter);

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
