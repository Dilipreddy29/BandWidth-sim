import React from 'react';
import { motion } from 'framer-motion';
import { Device } from '../types';
import { TOTAL_BANDWIDTH } from '../constants';

interface DeviceCardProps {
  device: Device;
  onDemandChange: (id: number, newDemand: number) => void;
  onPriorityChange: (id: number, newPriority: number) => void;
  isInteractive: boolean;
  isPriorityMode: boolean;
  numDevices: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDemandChange, onPriorityChange, isInteractive, isPriorityMode, numDevices }) => {
  const allocatedPercentage = (device.allocated / TOTAL_BANDWIDTH) * 100;
  const satisfactionRatio = device.demand > 0 ? (device.allocated / device.demand) * 100 : 100;
  const utilizationEfficiency = (device.allocated / TOTAL_BANDWIDTH) * 100;
  const priorityOptions = Array.from({ length: numDevices }, (_, i) => i + 1);

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-emerald-400';
    if (value >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-white">{device.name}</h3>
          {isPriorityMode && <span className="text-xs font-semibold bg-yellow-500 text-slate-900 px-2 py-0.5 rounded-full">P{device.priority}</span>}
        </div>
        <p className="text-sm text-slate-400 mb-1">
          Allocated: <span className="font-semibold text-sky-400">{device.allocated.toFixed(1)} Mbps</span>
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
          <motion.div
            className="bg-sky-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${allocatedPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-sm text-slate-400 mb-3">
          Demand: <span className="font-semibold text-slate-200">{device.demand.toFixed(1)} Mbps</span>
        </p>

        <div className="bg-slate-700 p-3 rounded-lg space-y-2 mb-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-500 font-medium">Satisfaction</p>
              <p className={`text-sm font-bold ${getMetricColor(satisfactionRatio)}`}>
                {satisfactionRatio.toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Utilization</p>
              <p className="text-sm font-bold text-sky-400">
                {utilizationEfficiency.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        {isPriorityMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700/50 p-3 rounded-lg border border-yellow-500/30"
          >
            <label htmlFor={`priority-${device.id}`} className="text-xs font-semibold text-slate-300 uppercase mb-2 block tracking-wider">
              Priority Level
            </label>
            <select
              id={`priority-${device.id}`}
              value={device.priority}
              onChange={(e) => onPriorityChange(device.id, parseInt(e.target.value))}
              className="w-full bg-slate-600 border border-slate-500 text-white text-sm rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 p-2 font-semibold"
            >
              {priorityOptions.map(p => (
                <option key={p} value={p}>Priority {p}</option>
              ))}
            </select>
          </motion.div>
        )}
        {isInteractive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700/50 p-3 rounded-lg border border-emerald-500/30"
          >
            <label className="text-xs font-semibold text-slate-300 uppercase mb-3 block tracking-wider">
              Adjust Demand
            </label>
            <div className="flex items-center justify-between gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDemandChange(device.id, Math.max(0, device.demand - 10))}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg w-10 h-10 flex items-center justify-center text-lg font-bold transition-all"
              >
                −
              </motion.button>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={device.demand}
                  onChange={(e) => onDemandChange(device.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDemandChange(device.id, device.demand + 10)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 rounded-lg w-10 h-10 flex items-center justify-center text-lg font-bold transition-all"
              >
                +
              </motion.button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-slate-400">Current: </span>
              <span className="text-sm font-bold text-emerald-400">{device.demand.toFixed(1)} Mbps</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeviceCard;