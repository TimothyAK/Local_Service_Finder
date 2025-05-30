import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomepageTemplate from "./components/pages/HomePage/HomePage.jsx";
import MapPage from "./components/pages/MapPage/MapPage.jsx"; 
import ServicePage from "./components/pages/ServicePage/ServicePage.jsx";
import LoginPage from "./components/pages/LoginPage/LoginPage"; 
import SignUpPage from './components/pages/SignupPage/SignupPage';
import ForgotPassPage from "./components/pages/ForgotPassPage/ForgotPassPage.jsx";
import ResetPassPage from "./components/pages/ResetPassPage/ResetPassPage.jsx";
import HistoryPage from "./components/pages/HistoryPage/HistoryPage.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomepageTemplate />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/reset-pass" element={<ResetPassPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;