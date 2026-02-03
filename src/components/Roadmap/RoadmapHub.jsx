import React, { useState } from 'react';
import RoadmapViewer from './RoadmapViewer';
import frontendData from '../../data/roadmaps/frontend.json';
import { Map, Code, BookOpen, LayoutDashboard, Compass } from 'lucide-react';

const ROADMAP_METADATA = [
    {
        id: "frontend-2026",
        title: "Frontend Development",
        desc: "Master the art of building immersive user interfaces.",
        icon: <Code size={24} />,
        color: "from-brand-500/20 to-cyan-500/10",
        data: frontendData
    },
    {
        id: "backend-2026",
        title: "Backend Development",
        desc: "Architect scalable APIs and robust databases.",
        icon: <LayoutDashboard size={24} />,
        color: "from-purple-500/20 to-brand-500/10",
        data: frontendData // Placeholder
    }
];

const RoadmapHub = () => {
    const [view, setView] = useState('hub');
    const [activeRoadmap, setActiveRoadmap] = useState(null);

    if (view === 'roadmap' && activeRoadmap) {
        return (
            <RoadmapViewer
                data={activeRoadmap.data}
                onBack={() => setView('hub')}
            />
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade-in p-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-[10px] font-black uppercase tracking-widest border border-brand-500/20 shadow-[0_0_15px_rgba(var(--brand-500),0.2)]">
                        Career Ecosystem v2.0
                    </span>
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter leading-none uppercase">
                    Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">Roadmaps</span>
                </h2>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
                    Structured Learning Protocols for the Global Workforce
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ROADMAP_METADATA.map((roadmap) => (
                    <div
                        key={roadmap.id}
                        onClick={() => {
                            setActiveRoadmap(roadmap);
                            setView('roadmap');
                        }}
                        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-900/60 transition-all hover:border-brand-500/50 hover:bg-[#0a0a0f] cursor-pointer active:scale-[0.98] shadow-2xl"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${roadmap.color} opacity-40 group-hover:opacity-60 transition-opacity`} />

                        <div className="relative p-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                {roadmap.icon}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase leading-none">{roadmap.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-8">{roadmap.desc}</p>

                            <div className="flex items-center gap-4">
                                <div className="px-4 py-2 bg-brand-500 text-black font-black text-[10px] uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(var(--brand-500),0.4)] group-hover:shadow-[0_0_40px_rgba(var(--brand-500),0.6)] transition-all">
                                    Initiate Learning
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Locked Path */}
                <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-white/5 bg-transparent flex flex-col items-center justify-center p-10 grayscale opacity-40">
                    <Compass size={48} className="text-slate-600 mb-6" />
                    <h3 className="text-xl font-bold text-slate-600 uppercase tracking-widest">More Paths Locked</h3>
                    <p className="text-xs text-slate-700 font-mono mt-2">Awaiting Neural Synchronization</p>
                </div>
            </div>
        </div>
    );
};

export default RoadmapHub;
