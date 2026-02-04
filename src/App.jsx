import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Achievements from './pages/Achievements';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import ChatRoom from './pages/ChatRoom';
import Contact from './pages/Contact';
import SmartTalk from './pages/SmartTalk';



function App() {

 

  return (
    <ThemeProvider>
      <Router>
        
        <div className="flex">
          <Sidebar />
          <main className="lg:ml-72 flex-1 min-h-screen w-full">
            <div className="max-w-[1920px] mx-auto px-[30px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat-room" element={<ChatRoom />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/smart-talk" element={<SmartTalk />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
