import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import About from "../pages/About";
import Achievements from "../pages/Achievements";
import Projects from "../pages/Projects";
import DetailProject from "../pages/DetailProject";
import Dashboard from "../pages/Dashboard";
import ChatRoom from "../pages/ChatRoom";
import Contact from "../pages/Contact";
import AskBot from "../pages/AskBot";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<DetailProject />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ask-bot" element={<AskBot />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
