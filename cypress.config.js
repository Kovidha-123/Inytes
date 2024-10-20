const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = defineConfig({
  
  e2e: {

    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Implement node event listeners here

      // Set timeouts
      config.defaultCommandTimeout = 10000; // Default timeout for commands (10 seconds)
      config.requestTimeout = 10000; // Timeout for API requests (10 seconds)
      config.responseTimeout = 30000; // Timeout for waiting for responses (30 seconds)

      // Return the modified config
      return config;
    },
    env: {
      RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, // Access your site key
    },
  },
});


