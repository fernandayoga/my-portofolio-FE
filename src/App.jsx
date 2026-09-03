import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <main className="xl:ml-72 flex-1 min-h-screen w-full">
            <div className="max-w-[1920px] mx-auto px-[30px]">
              <AnimatedRoutes />
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
