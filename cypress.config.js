import { defineConfig } from "cypress";

const config = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};

export default defineConfig(config);
