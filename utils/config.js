require("dotenv").config();

let PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGODB_URI
  : "mongodb+srv://peogway2403:peogway2403@cluster0.3alumgy.mongodb.net/meanApp?retryWrites=true&w=majority&appName=Cluster0";
// : "mongodb://localhost:27017/";
const secret = "secret here";
module.exports = {
  MONGODB_URI,
  PORT,
  secret,
};
