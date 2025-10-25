import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SimulatorPage from './components/SimulatorPage';
import ReadPage from './components/ReadPage';
import AboutPage from './components/AboutPage'; // Import the new page

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/read" element={<ReadPage />} />
            <Route path="/about" element={<AboutPage />} /> {/* Add the new route */}
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;