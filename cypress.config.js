import { defineConfig } from "cypress";

const config = {
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        studentClientBaseUrl: "http://localhost:3000",
        lecturerClientBaseUrl: "http://localhost:3001",
        adminClientBaseUrl: "http://localhost:3002",
        env: {
            login_url: "auth/login",
            home_url: "/home",
            class_feed_url: "/classes/feeds/",
            classes_url: "/classes",
            profile_url: "/user/profile",
            reset_password_url: "/user/reset-password",
        },
    },
};

export default defineConfig(config);
