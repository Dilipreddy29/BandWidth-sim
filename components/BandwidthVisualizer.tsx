
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Device, SharingType } from '../types';
import { TOTAL_BANDWIDTH } from '../constants';

interface BandwidthVisualizerProps {
  devices: Device[];
  sharingType: SharingType;
}

const COLORS = ['#0ea5e9', '#ec4899', '#22c55e', '#f97316', '#8b5cf6', '#eab308', '#64748b', '#ef4444', '#14b8a6', '#d946ef'];

const BandwidthVisualizer: React.FC<BandwidthVisualizerProps> = ({ devices, sharingType }) => {
  const [activeTdmDeviceIndex, setActiveTdmDeviceIndex] = useState(0);

  useEffect(() => {
    if (sharingType !== SharingType.TDM || devices.length === 0) return;
    const interval = setInterval(() => {
      setActiveTdmDeviceIndex(prevIndex => (prevIndex + 1) % devices.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [sharingType, devices.length]);

  const renderFDM = () => (
    <div className="w-full bg-slate-700 rounded-lg h-12 flex overflow-hidden">
      <AnimatePresence>
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            layout
            initial={{ width: 0 }}
            animate={{ width: `${(device.allocated / TOTAL_BANDWIDTH) * 100}%` }}
            exit={{ width: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="h-full flex items-center justify-center"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          >
            <div className="text-center px-1">
              <span className="text-xs font-bold text-white block truncate">{device.name}</span>
              <span className="text-[10px] text-sky-200 block">{device.allocated.toFixed(1)} Mbps</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderTDM = () => (
    <div className="w-full relative h-12 rounded-lg bg-slate-700 flex">
      {devices.map((device, index) => (
        <div key={device.id} className="flex-1 flex items-center justify-center text-sm text-slate-400">
          {device.name}
        </div>
      ))}
      <motion.div
        layout
        animate={{ x: `${activeTdmDeviceIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-0 left-0 h-full rounded-lg border-2 border-sky-400 bg-sky-500/20"
        style={{ width: `${100 / devices.length}%` }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <span className="text-white font-bold text-xs md:text-sm">Active Slot</span>
            <span className="text-sky-200 text-[10px] md:text-xs">{TOTAL_BANDWIDTH} Mbps</span>
        </div>
      </motion.div>
    </div>
  );

  const renderDefaultChart = () => (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={devices} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Mbps', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
        <Tooltip cursor={{fill: 'rgba(14, 165, 233, 0.1)'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
        <Bar dataKey="allocated" name="Allocated" unit=" Mbps" radius={[4, 4, 0, 0]}>
          {devices.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700 mb-8 min-h-[300px] flex flex-col justify-center">
      <h3 className="text-xl font-bold mb-4 text-white">Live Allocation</h3>
      {sharingType === SharingType.FDM && renderFDM()}
      {sharingType === SharingType.TDM && renderTDM()}
      {[SharingType.EQUAL, SharingType.PRIORITY, SharingType.STATISTICAL].includes(sharingType) && renderDefaultChart()}
    </div>
  );
};

export default BandwidthVisualizer;