// environment
require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// import controller
const stripeController = require("./controllers/stripeController");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.static("./public"));

// stripe payment route
app.post("/stripe", stripeController);

// invoking erro handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
