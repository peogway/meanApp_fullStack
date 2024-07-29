const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const morgan = require("morgan");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const users = require("./routes/users");
const dashboard = require("./routes/dashboard");
const config = require("./utils/config");

const session = require("express-session");

// Connect To Database
// mongoose.set("strictQuery", false)
logger.info("connecting to", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDb:", error.message);
  });

const app = express();

const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static("production/browser"));

// Body Paser Middleware
app.use(bodyParser.json());

// Session Middleware
app.use(passport.initialize());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
}));

// Passport Middleware
require("./utils/passport")(passport);

// configuring morgan's tokens
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// Routes
app.use("/users", users);
app.use("/dashboard", dashboard);

// Catch-all route to serve Angular index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "production/browser/index.html"));
});

// ErrorHandler Middleware
app.use(middleware.errorHandler);

// Start Sever
app.listen(port, () => {
  console.log("Server running on port ", port);
});
