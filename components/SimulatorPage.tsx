
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SharingType, Device } from '../types';
import { TOTAL_BANDWIDTH, MAX_DEVICES, MIN_DEVICES } from '../constants';
import DeviceCard from './DeviceCard';
import BandwidthVisualizer from './BandwidthVisualizer';

const SimulatorPage: React.FC = () => {
  const [numDevices, setNumDevices] = useState<number>(4);
  const [sharingType, setSharingType] = useState<SharingType>(SharingType.EQUAL);
  const [devices, setDevices] = useState<Device[]>([]);

  const initializeDevices = useCallback((count: number) => {
    const newDevices: Device[] = [];
    for (let i = 1; i <= count; i++) {
      newDevices.push({
        id: i,
        name: `Device ${i}`,
        demand: 25,
        allocated: 0,
        priority: i,
      });
    }
    setDevices(newDevices);
  }, []);

  useEffect(() => {
    initializeDevices(numDevices);
  }, [numDevices, initializeDevices]);
  
  const deviceDependencies = JSON.stringify(devices.map(d => ({ demand: d.demand, priority: d.priority })));

  useEffect(() => {
    const calculateAllocations = (currentDevices: Device[]): Device[] => {
      if (currentDevices.length === 0) return [];

      let remainingBandwidth = TOTAL_BANDWIDTH;
      const totalDemand = currentDevices.reduce((sum, d) => sum + d.demand, 0);

      switch (sharingType) {
        case SharingType.EQUAL: {
          const equalShare = TOTAL_BANDWIDTH / currentDevices.length;
          return currentDevices.map(d => ({ ...d, allocated: equalShare }));
        }

        case SharingType.PRIORITY: {
          const sortedByPriority = [...currentDevices].sort((a, b) => a.priority - b.priority);
          const allocatedDevices: Device[] = [];
          
          for (const device of sortedByPriority) {
            const allocation = Math.min(device.demand, remainingBandwidth);
            allocatedDevices.push({ ...device, allocated: allocation });
            remainingBandwidth -= allocation;
          }
          
          return allocatedDevices.sort((a, b) => a.id - b.id);
        }

        case SharingType.STATISTICAL: {
          if (totalDemand === 0) {
            const equalShare = TOTAL_BANDWIDTH / currentDevices.length;
            return currentDevices.map(d => ({ ...d, allocated: equalShare }));
          }
          if (totalDemand <= TOTAL_BANDWIDTH) {
            return currentDevices.map(d => ({ ...d, allocated: d.demand }));
          }
          return currentDevices.map(d => ({
            ...d,
            allocated: (d.demand / totalDemand) * TOTAL_BANDWIDTH,
          }));
        }

        case SharingType.TDM:
        case SharingType.FDM: {
          const share = TOTAL_BANDWIDTH / currentDevices.length;
          return currentDevices.map(d => ({ ...d, allocated: share }));
        }

        default:
          return currentDevices.map(d => ({ ...d }));
      }
    };

    setDevices(prevDevices => calculateAllocations(prevDevices));

  }, [sharingType, deviceDependencies]);


  const handleDemandChange = (id: number, newDemand: number) => {
    setDevices(prevDevices =>
      prevDevices.map(d =>
        d.id === id ? { ...d, demand: Math.max(0, newDemand) } : d
      )
    );
  };
  
  const handlePriorityChange = (id: number, newPriority: number) => {
    setDevices(prevDevices => 
      prevDevices.map(d => d.id === id ? { ...d, priority: newPriority } : d)
    );
  };
  
  const totalAllocated = devices.reduce((sum, d) => sum + d.allocated, 0);
  const utilization = (totalAllocated / TOTAL_BANDWIDTH) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold text-center mb-1 text-white">Bandwidth Sharing Simulator</h1>
      <div className="text-center mb-8">
        <p className="text-slate-400 text-sm">Total Available Bandwidth</p>
        <p className="text-3xl font-bold text-sky-400">{TOTAL_BANDWIDTH} Mbps</p>
      </div>

      <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-750 rounded-lg shadow-xl border border-slate-700 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-600 backdrop-blur-sm"
          >
            <label htmlFor="numDevices" className="block text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">
              Number of Devices
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="numDevices"
                min={MIN_DEVICES}
                max={MAX_DEVICES}
                value={numDevices}
                onChange={(e) => setNumDevices(parseInt(e.target.value))}
                className="flex-1 h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="bg-sky-500/20 border border-sky-500 rounded-lg px-4 py-2 min-w-max">
                <span className="text-2xl font-bold text-sky-400">{numDevices}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-600 backdrop-blur-sm"
          >
            <label className="block text-sm font-semibold text-slate-200 mb-4 uppercase tracking-wider">Sharing Method</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.values(SharingType).map(type => (
                    <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSharingType(type)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                          sharingType === type
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/50'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    >
                        {type}
                    </motion.button>
                ))}
            </div>
          </motion.div>
        </div>
      </div>

      <BandwidthVisualizer devices={devices} sharingType={sharingType} />
      
      <AnimatePresence>
        {(sharingType === SharingType.TDM || sharingType === SharingType.FDM) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
              <h4 className="font-bold text-lg text-sky-400 mb-2">{sharingType} Explained</h4>
              <p className="text-slate-300 text-sm">
                {sharingType === SharingType.TDM
                  ? "Time-Division Multiplexing gives the full bandwidth to each device for a small slice of time, cycling through them rapidly. The animation shows the 'time slot' moving from one device to the next, granting it exclusive access."
                  : "Frequency-Division Multiplexing splits the total bandwidth into dedicated, smaller frequency channels for each device. Each colored block represents a device's exclusive, non-interfering channel."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {devices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onDemandChange={handleDemandChange}
            onPriorityChange={handlePriorityChange}
            isInteractive={sharingType === SharingType.PRIORITY || sharingType === SharingType.STATISTICAL}
            isPriorityMode={sharingType === SharingType.PRIORITY}
            numDevices={numDevices}
          />
        ))}
      </div>

      <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <h3 className="text-xl font-bold mb-4 text-white">Network Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Total Bandwidth Utilization</p>
            <p className="text-2xl font-bold text-sky-400">{utilization.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Network Latency</p>
            <p className="text-2xl font-bold text-sky-400">{(Math.random() * 20 + 10).toFixed(0)}ms</p>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <h4 className="text-md font-bold text-sky-400 mb-3">Metric Definitions</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-white">Satisfaction Ratio</p>
              <p className="text-xs text-slate-400">Percentage of a device's bandwidth demand that is being fulfilled. Shows how well a device's network needs are being met (allocated / demand × 100). Green indicates 90% or above, yellow 70-90%, orange below 70%.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Utilization Efficiency</p>
              <p className="text-xs text-slate-400">Percentage of total network bandwidth allocated to this device. Indicates how much of the overall network capacity is dedicated to serving this device (device allocation / total bandwidth times 100).</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Network Latency</p>
              <p className="text-xs text-slate-400">Time delay in milliseconds for data transmission across the network. Simulated value showing typical network response times in different conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SimulatorPage;