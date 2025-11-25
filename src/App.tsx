import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing/Landing";
import { Reclutamiento } from "./pages/Reclutamiento/Reclutamiento";
import { Admin } from "./pages/Admin/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reclutamiento" element={<Reclutamiento />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
