import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import Activities from "./pages/Activities.tsx";
import Activity from "./pages/Activity.tsx";
import Boats from "./pages/Boats.tsx";
import Instructors from "./pages/Instructors.tsx";
import Boat from "./pages/Boat.tsx";
import Instructor from "./pages/Instructor.tsx";
import ActivityEdit from "./pages/ActivityEdit.tsx";
import ActivityCreate from "./pages/ActivityCreate.tsx";
import BoatEdit from "./pages/BoatEdit.tsx";
import BoatCreate from "./pages/BoatCreate.tsx";
import InstructorEdit from "./pages/InstructorEdit.tsx";
import InstructorCreate from "./pages/InstructorCreate.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<App />} />
            <Route path="activities">
                <Route index element={<Activities />} />
                <Route path=":id" element={<Activity />} />
                <Route path=":id/edit" element={<ActivityEdit />} />
                <Route path="create" element={<ActivityCreate />} />
            </Route>
            <Route path="boats">
                <Route index element={<Boats />} />
                <Route path=":id" element={<Boat />} />
                <Route path=":id/edit" element={<BoatEdit />} />
                <Route path="create" element={<BoatCreate />} />
            </Route>
            <Route path="instructors">
                <Route index element={<Instructors />} />
                <Route path=":id" element={<Instructor />} />
                <Route path=":id/edit" element={<InstructorEdit />} />
                <Route path="create" element={<InstructorCreate />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
