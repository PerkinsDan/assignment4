import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";
console.log("isProduction", isProduction);

// Define the backend URL based on the environment
const backendUrl = isProduction
    ? "https://assignment4-fop.onrender.com"
    : "http://localhost:3000";

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: backendUrl,
                secure: false,
            },
        },
    },
    plugins: [react()],
});
