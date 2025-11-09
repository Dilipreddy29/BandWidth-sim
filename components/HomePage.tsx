import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center flex flex-col items-center justify-center flex-1 py-12"
    >
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Welcome to the <span className="text-sky-400">Bandwidth Sharing Simulator</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8">
          Explore how network bandwidth is distributed among multiple devices using various sharing and multiplexing techniques. Visualize the dynamics of data flow in a simplified, interactive environment.
        </p>
        <div className="bg-slate-800 p-6 rounded-lg shadow-xl mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-sky-400 mb-3">What is Bandwidth Sharing?</h2>
            <p className="text-slate-300">
                Bandwidth sharing is the method of dividing a network's total data capacity among multiple devices. Since the total bandwidth is a finite resource, how it's shared is crucial for performance. This simulator lets you explore different strategies—from simple equal splits to dynamic, demand-based allocations—to see how they affect each device's speed and the overall network efficiency.
            </p>
        </div>
        <Link to="/simulator">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg shadow-sky-500/20"
          >
            Go to Simulator
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default HomePage;