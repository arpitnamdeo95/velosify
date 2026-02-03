import React, { useState } from 'react';
import {
    LayoutDashboard,
    Map,
    Code,
    BookOpen,
    CheckSquare,
    Layers,
    Database,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ tab, setTab, isExpanded, setIsExpanded, logout }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: 'roadmaps', icon: <Map size={20} />, label: 'Roadmaps' },
        { id: 'dsa', icon: <Code size={20} />, label: 'DSA Tracker' },
        { id: 'syllabus', icon: <BookOpen size={20} />, label: 'Syllabus' },
        { id: 'projects', icon: <CheckSquare size={20} />, label: 'Kanban' },
        { id: 'flashcards', icon: <Layers size={20} />, label: 'Neural Recall' },
        { id: 'resources', icon: <Database size={20} />, label: 'Data Vault' },
        { id: 'hr-prep', icon: <Users size={20} />, label: 'HR Protocol' },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-brand-500 text-black rounded-xl shadow-lg ring-1 ring-brand-400/50"
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-[55] bg-[#07070c]/90 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out lg:static
        ${mobileOpen ? 'translate-x-0 w-72 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full lg:translate-x-0'}
        ${isExpanded ? 'w-72' : 'w-24'}`}
            >
                {/* Logo Section */}
                <div className={`p-8 flex items-center gap-4 ${!isExpanded && 'lg:justify-center lg:px-4'}`}>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(var(--brand-500),0.4)] ring-1 ring-white/20 shrink-0">
                        V
                    </div>
                    {isExpanded && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-black text-2xl tracking-tighter text-white uppercase"
                        >
                            Velosify
                        </motion.span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
                    <div className={`text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-4 ${!isExpanded && 'hidden'}`}>
                        Core Systems
                    </div>

                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setTab(item.id); setMobileOpen(false); }}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative
                ${tab === item.id
                                    ? 'text-white bg-brand-500/10 shadow-[inset_0_0_20px_rgba(var(--brand-500),0.1)] border border-brand-500/20'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'}
                ${!isExpanded && 'lg:justify-center'}`}
                        >
                            {tab === item.id && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-brand-500 rounded-r-full shadow-[0_0_15px_rgba(var(--brand-500),1)]"
                                />
                            )}
                            <div className={`${tab === item.id ? 'text-brand-400' : 'group-hover:text-brand-400'} transition-colors`}>
                                {item.icon}
                            </div>
                            {isExpanded && (
                                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 bg-[#05050a]/40">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`hidden lg:flex w-full items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:text-brand-400 transition-all ${!isExpanded && 'justify-center'}`}
                    >
                        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                        {isExpanded && <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Collapse Shell</span>}
                    </button>

                    <button
                        onClick={logout}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-2 ${!isExpanded && 'lg:justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isExpanded && <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
