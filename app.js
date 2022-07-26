require("dotenv").config();
require("express-async-errors");

//EXPRESS.
const express = require("express");
const app = express();

//PACKAGES.
const morgan = require("morgan");

//ROUTERS
app.get("/", (req, res) => {
  return console.log("Anon");
});

//MIDDLEWARE
const connectDB = require("./db/connect");

app.use(morgan("tiny"));

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
