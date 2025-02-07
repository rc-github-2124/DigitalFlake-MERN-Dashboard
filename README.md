Configuration

This project requires a config.js file in the src directory to store environment variables. Since sensitive information should not be committed to version control, follow these steps to set up  configuration:

Steps:

1. Create a new file in the src directory named config.js.


2. Copy the following template into config.js:

module.exports = {
  PORT: 8000,
  MONGO_URI: "your_mongo_uri",
  JWT_SECRET: "your_jwt_secret",
  JWT_EXPIRES_IN: "1d",
  AWS_ACCESS_KEY_ID: "your_aws_access_key",
  AWS_SECRET_ACCESS_KEY: "your_aws_secret_key",
  AWS_REGION: "your_aws_region",
  RESET_TOKEN_EXPIRY: "your_reset_token_expiry",
  FRONTEND_RESET_LINK: "your_frontend_reset_link"
};


3. Replace the placeholder values with your actual credentials.
