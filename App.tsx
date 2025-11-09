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
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar />
        <main className="flex-1 flex flex-col container mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/read" element={<ReadPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;