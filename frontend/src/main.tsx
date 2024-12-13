import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import Activities from "./pages/Activities.tsx";
import Boats from "./pages/Boats.tsx";
import Instructors from "./pages/Instructors.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/boats" element={<Boats />} />
                <Route path="/instructors" element={<Instructors />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
