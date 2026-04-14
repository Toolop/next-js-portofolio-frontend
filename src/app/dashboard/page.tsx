"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import {
  RefreshCw,
  Plus,
  Maximize2,
  Edit3,
  ExternalLink,
  Cpu,
  Globe,
  Zap,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

const trafficData = [
  { name: "01", value: 400 },
  { name: "02", value: 300 },
  { name: "03", value: 600 },
  { name: "04", value: 800 },
  { name: "05", value: 500 },
  { name: "06", value: 900 },
  { name: "07", value: 700 },
  { name: "08", value: 1100 },
  { name: "09", value: 800 },
  { name: "10", value: 1300 },
  { name: "11", value: 950 },
  { name: "12", value: 1420 },
];

const nodes = [
  {
    id: 1,
    title: "PROJECT_TITAN_V2",
    description: "Full-stack IoT integration for smart-city grid management.",
    tags: ["REACT", "MQTT", "AWS"],
    status: "LIVE_NODE",
    type: "active"
  },
  {
    id: 2,
    title: "QUANTUM_DASHBOARD",
    description: "Financial data visualization suite using real-time API clusters.",
    tags: ["D3.JS", "NEXT.JS", "POSTGRESQL"],
    status: "ARCHIVE_NODE",
    type: "archive"
  }
];

const updateHistory = [
  { year: "2024", role: "SENIOR SYSTEMS ARCHITECT", company: "Global Cyberdyne Systems", status: "PRESENT" },
  { year: "2021", role: "LEAD FRONTEND ENGINEER", company: "Neon Dynamics Corp", status: "2024" },
  { year: "2019", role: "IOT DEVELOPER", company: "SensorLink Labs", status: "2021" },
];

const techMatrix = [
  { name: "SYSTEM_CORE / REACT.JS", value: 98, color: "#81ecff" },
  { name: "NODE_ENGINE / TYPESCRIPT", value: 92, color: "#81ecff" },
  { name: "NETWORK_PROTOCOLS / MQTT", value: 75, color: "#a68cff" },
  { name: "DATA_STORAGE / POSTGRESQL", value: 88, color: "#a68cff" },
];

const Card = ({ children, title, subtitle, action, className = "" }: any) => (
  <div className={`bg-surface-container-low p-6 rounded-sm relative group ${className}`}>
    <div className="flex items-start justify-between mb-6">
      <div>
        <h4 className="text-[10px] text-primary/60 font-black tracking-widest uppercase mb-1">{subtitle}</h4>
        <h3 className="text-sm font-black tracking-tighter text-white uppercase">{title}</h3>
      </div>
      {action && (
        <button className="text-neutral-600 hover:text-primary transition-colors">
          {action}
        </button>
      )}
    </div>
    {children}
  </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase mb-2">SYSTEM_OVERVIEW</h1>
          <p className="text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase">REAL-TIME TELEMETRY AND INTERACTION METRICS</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-sm text-[10px] font-black tracking-widest text-white transition-all">
          <RefreshCw className="w-3 h-3" />
          RECONFIGURE
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="PAGE_TRAFFIC_INDEX" subtitle="METRIC_01" className="lg:col-span-2">
          <div className="flex items-end gap-12 mb-6">
            <div className="text-4xl font-black tracking-tighter text-white">14.2K</div>
            <div className="mb-1">
              <span className="text-primary text-[10px] font-black">+12.4% GAIN</span>
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === trafficData.length - 1 ? "#81ecff" : "#1b2028"} className="hover:fill-primary transition-colors duration-300" />
                  ))}
                </Bar>
                <Tooltip
                  cursor={{ fill: 'rgba(129, 236, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f141a', border: '1px solid rgba(129, 236, 255, 0.1)', borderRadius: '4px' }}
                  itemStyle={{ color: '#81ecff', fontSize: '10px', fontWeight: 'bold' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="INCOMING_CONTACTS" subtitle="METRIC_02">
          <div className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                NEW PROPOSALS
              </div>
              <div className="text-xl font-black text-white">08</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                GENERAL QUERIES
              </div>
              <div className="text-xl font-black text-white">24</div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">RESPONSE LATENCY</span>
                <span className="text-[10px] font-black text-primary">84% OPTIMAL</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Manage Nodes Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase">MANAGE_NODES</h2>
            <p className="text-[10px] text-neutral-500 font-bold tracking-[0.2em] uppercase mt-1">ACTIVE PROJECT DEPLOYMENT AND ASSET CONTROL</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-[10px] font-black tracking-widest text-white">
            <Maximize2 className="w-3 h-3" />
            RECONFIGURE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              whileHover={{ y: -5 }}
              className="bg-surface-container-low p-6 rounded-sm border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <div className="relative aspect-video mb-6 bg-black flex items-center justify-center overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                {node.id === 1 ? (
                  <Globe className="w-20 h-20 text-primary/20 group-hover:text-primary/40 transition-colors" />
                ) : (
                  <Cpu className="w-20 h-20 text-secondary/20 group-hover:text-secondary/40 transition-colors" />
                )}
                <div className="absolute top-4 left-4 z-20">
                  <span className="status-chip">{node.status}</span>
                </div>
              </div>
              <h3 className="text-sm font-black tracking-tighter text-white mb-2">{node.title}</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed mb-6">{node.description}</p>
              <div className="flex flex-wrap gap-2">
                {node.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-black tracking-widest text-neutral-600 border border-neutral-800 px-2 py-1 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          <button className="bg-black/20 border border-dashed border-white/10 rounded-sm p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/5 hover:border-white/20 transition-all group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-600 group-hover:text-primary transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] text-neutral-600 uppercase">INITIALIZE_NEW_NODE</span>
          </button>
        </div>
      </div>

      {/* Bottom Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">UPDATE_HISTORY</h2>
            <button className="text-[10px] font-black text-primary hover:text-white transition-colors flex items-center gap-2">
              <Edit3 className="w-3 h-3" />
              EDIT_JOBS
            </button>
          </div>
          <div className="space-y-4">
            {updateHistory.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 p-6 bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-sm group">
                <div className="text-left">
                  <div className="text-primary text-sm font-black tracking-tighter">{item.year}</div>
                  <div className="text-[9px] text-neutral-600 font-bold">{item.status}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-black text-white group-hover:text-primary transition-colors uppercase">{item.role}</div>
                  <div className="text-[10px] text-neutral-500 font-bold">{item.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">TECHNICAL_MATRIX</h2>
            <button className="text-[10px] font-black text-primary hover:text-white transition-colors flex items-center gap-2">
              <Edit3 className="w-3 h-3" />
              EDIT_SKILLS
            </button>
          </div>
          <div className="space-y-8 p-8 bg-surface-container-low rounded-sm">
            {techMatrix.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-neutral-400 tracking-widest">{item.name}</span>
                  <span className="text-[10px] font-black text-neutral-500">{item.value}% OPTIMAL</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.1 * idx }}
                    className="h-full bg-primary"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 pb-6 border-t border-white/5">
        <p className="text-[9px] text-neutral-700 font-bold tracking-[0.2em] uppercase">
          © 2024 KINETIC_CMS_PLATFORM // NEURAL_INTERFACE_V1.0
        </p>
      </footer>
    </div>
  );
}
