const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI || "mongodb+srv://rrohitchavan724:g4g7R6mF8HTEOiBz@digitalflakecluster.v06dl.mongodb.net/digitalflakefinal?retryWrites=true&w=majority&appName=digitalflakecluster",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "ERT38905U39HEUIGERT98R2U9EWHFBWEHJBF29224",
  EMAIL_USER: 'r.rohitchavan724@gmail.com',
  EMAIL_PASS:'hmoj pipc tagu laun'
};

module.exports = config;
