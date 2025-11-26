import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Landing } from "./pages/Landing/Landing";
import { Reclutamiento } from "./pages/Reclutamiento/Reclutamiento";
import { Admin } from "./pages/Admin/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login/Login";

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
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
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};
