import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { supabase } from './lib/supabase';
import Sidebar from './components/Layout/Sidebar';
import RoadmapHub from './components/Roadmap/RoadmapHub';

// Bridge for legacy icon usage
const Icon = ({ name, size = 18, className = "" }) => {
    // Convert kebab-case to PascalCase for Lucide components
    const pascalName = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    const LucideIcon = LucideIcons[pascalName] || LucideIcons.Zap;
    return <LucideIcon size={size} className={className} />;
};

const App = () => {
    const [session, setSession] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [tab, setTab] = useState('roadmaps'); // Default to the new upgrade!
    const [isExpanded, setIsExpanded] = useState(true);

    // Persistence Logic
    const storageKey = useMemo(() => session?.user?.id ? `velosify_user_${session.user.id}` : 'velosify_guest', [session]);
    const [data, setData] = useState(() => {
        const base = {
            themeColor: 'violet',
            goalName: 'GATE 2026',
            examDate: '2026-02-01',
            totalTime: 0,
            syllabus: [],
            kanban: { todo: [], doing: [], done: [] },
            flashcards: [],
            resources: [],
            dsa: [],
            focus: { timeLeft: 1500, initialTime: 1500, isActive: false },
            roadmapProgress: {}
        };
        const s = localStorage.getItem('velosify_guest'); // Simplification for now
        if (s) {
            try { return { ...base, ...JSON.parse(s) }; } catch (e) { return base; }
        }
        return base;
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }, [data, storageKey]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoadingAuth(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
    };

    if (loadingAuth) return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#05050a]">
            <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-500 animate-[spin_3s_linear_infinite] shadow-[0_0_50px_rgba(var(--brand-500),0.4)] flex items-center justify-center">
                    <div className="w-10 h-10 bg-black rounded-xl" />
                </div>
                <div className="text-brand-400 font-mono text-xs uppercase tracking-[0.5em] animate-pulse">Initializing Neural Link...</div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#05050a] text-slate-200">
            <Sidebar
                tab={tab}
                setTab={setTab}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                logout={logout}
            />

            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                {/* VELOSIFY TOP BAR - HUD */}
                <header className="sticky top-0 z-30 p-8 flex justify-between items-center pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 pointer-events-auto shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Online // Session Active</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pointer-events-auto">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Global Progress</div>
                                <div className="text-sm font-black text-white">42%</div>
                            </div>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 w-[42%] shadow-[0_0_10px_rgba(var(--brand-500),0.5)]" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 pt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tab === 'roadmaps' && <RoadmapHub />}
                            {tab === 'dashboard' && (
                                <div className="py-20 text-center flex flex-col items-center gap-6">
                                    <Icon name="layout-dashboard" size={64} className="text-slate-800" />
                                    <h3 className="text-2xl font-black text-slate-700 uppercase tracking-tight">System Module Legacy</h3>
                                    <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">Migration in Progress // Connect to old hub for access</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default App;
