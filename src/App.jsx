import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";
import Profile from "./pages/Profile";
import Header from "./components/Hero/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-property"
                element={
                  <ProtectedRoute>
                    <AddProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/properties/:id"
                element={
                  <ProtectedRoute>
                    <PropertyDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-property/:id"
                element={
                  <ProtectedRoute>
                    <EditProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
