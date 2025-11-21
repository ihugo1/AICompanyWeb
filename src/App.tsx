import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { Reclutamiento } from "./pages/Reclutamiento/Reclutamiento";
import { Admin } from "./pages/Admin/Admin";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/reclutamiento" element={<Reclutamiento />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
