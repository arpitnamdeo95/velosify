/* --- LANDING PAGE --- */
const LandingPage = ({ onLogin }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [typedText, setTypedText] = useState("");
    const heroRef = useRef(null);

    useEffect(() => {
        const textOptions = ["Analyzing Potential...", "Optimizing Focus...", "System Ready."];
        let textIdx = 0, charIdx = 0, isDeleting = false, timeout;
        const type = () => {
            const currentText = textOptions[textIdx];
            if (isDeleting) { setTypedText(currentText.substring(0, charIdx - 1)); charIdx--; }
            else { setTypedText(currentText.substring(0, charIdx + 1)); charIdx++; }
            if (!isDeleting && charIdx === currentText.length) timeout = setTimeout(() => { isDeleting = true; type(); }, 2000);
            else if (isDeleting && charIdx === 0) { isDeleting = false; textIdx = (textIdx + 1) % textOptions.length; timeout = setTimeout(type, 500); }
            else timeout = setTimeout(type, isDeleting ? 50 : 100);
        };
        timeout = setTimeout(type, 100);
        return () => clearTimeout(timeout);
    }, []);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        setMousePos({ x: (e.clientX - left) / width - 0.5, y: (e.clientY - top) / height - 0.5 });
    };

    return (
        <div className="min-h-screen text-white font-sans selection:bg-brand-500/30 overflow-hidden relative">
            {/* Background Ambience / Digital Rain Placeholder */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="scifi-grid-animated absolute inset-0"></div>
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#05050a] to-transparent z-10"></div>
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#05050a] to-transparent z-10"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent py-6">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(var(--brand-500),0.5)]">V</div>
                        <span className="font-bold text-lg tracking-tight">VELOSIFY</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="hidden md:block text-slate-400 hover:text-white text-sm font-medium transition-colors">Modules</button>
                        <button onClick={onLogin} className="px-4 py-2 bg-white text-black hover:bg-brand-500 hover:text-white font-bold rounded-lg transition-all text-[10px] uppercase tracking-widest transform hover:scale-105 active:scale-95">Access Terminal</button>
                    </div>
                </div>
            </nav>

            {/* SECTION 1: HERO */}
            <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden" onMouseMove={handleMouseMove}>
                <div className="z-10 text-center max-w-5xl px-6 relative">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-mono uppercase tracking-widest animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-brand-500"></span> Neural Link Established
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-400 to-slate-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">UPGRADE YOUR BRAIN.</h1>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 drop-shadow-[0_0_30px_rgba(var(--brand-500),0.4)]">HACK YOUR PLACEMENT.</h1>
                    <div className="h-8 mb-12 font-mono text-brand-400 text-lg md:text-xl tracking-[0.2em] uppercase">&gt; {typedText}<span className="animate-blink">_</span></div>
                    <button onClick={onLogin} className="group relative px-8 py-4 bg-brand-600 text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(var(--brand-500),0.5)] border border-brand-400/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_0.5s_infinite]"></div>
                        <span className="relative flex items-center gap-3 uppercase tracking-widest text-sm"><Icon name="zap" size={20} className="fill-white" /> Initialize System</span>
                    </button>
                </div>
            </section>

            {/* SECTION 2: VISUAL SHOWCASE */}
            <section className="py-20 px-6 perspective-1000 relative z-20 -mt-20">
                <div ref={heroRef} className="max-w-6xl mx-auto transform-style-3d transition-transform duration-100 ease-out will-change-transform" style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)` }}>
                    <div className="relative rounded-3xl border border-white/10 bg-surface-900/80 backdrop-blur-xl shadow-[0_0_100px_rgba(var(--brand-500),0.15)] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                        <div className="h-12 border-b border-white/10 flex items-center px-6 gap-4">
                            <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/50"></div><div className="w-3 h-3 rounded-full bg-yellow-500/50"></div><div className="w-3 h-3 rounded-full bg-emerald-500/50"></div></div>
                            <div className="flex-1 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest">Velosify v2.0 // Neural Interface Active</div>
                        </div>
                        <div className="p-8 grid grid-cols-12 gap-6 opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="col-span-3 space-y-4"><div className="h-32 rounded-xl bg-white/5 border border-white/5 animate-pulse"></div><div className="h-16 rounded-xl bg-brand-500/10 border border-brand-500/20"></div><div className="h-48 rounded-xl bg-white/5 border border-white/5"></div></div>
                            <div className="col-span-6 space-y-6">
                                <div className="h-24 rounded-xl bg-gradient-to-r from-brand-900/50 to-blue-900/50 border border-white/10 flex items-center justify-center"><Icon name="activity" className="text-brand-400 w-12 h-12" /></div>
                                <div className="grid grid-cols-2 gap-4"><div className="h-40 rounded-xl bg-white/5 border border-white/5 p-4"><div className="w-8 h-8 rounded bg-brand-500/20 mb-3"></div><div className="h-2 w-20 bg-white/20 rounded mb-2"></div><div className="h-2 w-12 bg-white/10 rounded"></div></div><div className="h-40 rounded-xl bg-white/5 border border-white/5 p-4"><div className="w-8 h-8 rounded bg-emerald-500/20 mb-3"></div><div className="h-2 w-20 bg-white/20 rounded mb-2"></div><div className="h-2 w-12 bg-white/10 rounded"></div></div></div>
                            </div>
                            <div className="col-span-3 space-y-4"><div className="h-64 rounded-xl bg-white/5 border border-white/5"></div><div className="h-28 rounded-xl bg-white/5 border border-white/5"></div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: BENTO GRID */}
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tighter">
                    SYSTEM <span className="text-brand-400">ARCHETYPE</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[800px] md:h-[600px]">
                    {/* Box 1 */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 backdrop-blur-md p-8 hover:border-brand-500/50 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform"><Icon name="monitor" size={28} /></div>
                            <h3 className="text-2xl font-bold mb-3">Deep Work Protocol</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">Engage the Focus Engine. High-intensity 90-minute sprints. Block distractions and enter pure flow state.</p>
                            <div className="mt-auto rounded-xl bg-black/40 border border-white/5 h-48 relative overflow-hidden flex items-center justify-center"><div className="text-4xl font-mono text-white font-black tracking-tighter">25:00</div><div className="absolute inset-0 border-2 border-brand-500/20 rounded-xl animate-pulse"></div></div>
                        </div>
                    </div>
                    {/* Box 2 */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 backdrop-blur-md p-8 hover:border-emerald-500/50 transition-all">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Icon name="database" size={24} /></div><span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Striver Sheet</span></div><h3 className="text-xl font-bold mb-2">DSA Tracker</h3><p className="text-slate-400 text-xs">Curated algorithm sheets. Track progress through graphs and heaps.</p></div>
                            <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden"><div className="h-full bg-emerald-500 w-[65%] shadow-[0_0_10px_currentColor]"></div></div>
                        </div>
                    </div>
                    {/* Box 3 */}
                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 backdrop-blur-md p-6 hover:border-pink-500/50 transition-all"><div className="relative z-10"><div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4"><Icon name="zap" size={20} /></div><h3 className="text-lg font-bold mb-2">Neural Flashcards</h3><p className="text-slate-400 text-xs">Spaced repetition for long-term retention.</p></div></div>
                    {/* Box 4 */}
                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 backdrop-blur-md p-6 hover:border-blue-500/50 transition-all"><div className="relative z-10"><div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4"><Icon name="activity" size={20} /></div><h3 className="text-lg font-bold mb-2">Analytics</h3><p className="text-slate-400 text-xs">Visualized growth heatmaps and velocity charts.</p></div></div>
                </div>
            </section>

            {/* SECTION 4: FOOTER */}
            <footer className="border-t border-white/5 bg-[#030305] relative z-10">
                <div className="overflow-hidden py-3 bg-brand-900/10 border-b border-white/5">
                    <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-[10px] font-mono text-brand-400 font-bold uppercase tracking-[0.3em] flex gap-12">
                        <span>SYSTEM STATUS: ONLINE</span><span>USERS: ACTIVE</span><span>VERSION: 2.0.4</span><span>LATENCY: 12ms</span><span>ENCRYPTION: AES-256</span>
                        <span>SYSTEM STATUS: ONLINE</span><span>USERS: ACTIVE</span><span>VERSION: 2.0.4</span><span>LATENCY: 12ms</span><span>ENCRYPTION: AES-256</span>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center text-white font-bold">V</div><div><div className="font-bold text-white tracking-tight">VELOSIFY</div><div className="text-[10px] text-slate-500">Neural Study OS</div></div></div>
                    <div className="flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Icon name="globe" size={14} /> React</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Icon name="database" size={14} /> Firebase</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Icon name="layers" size={14} /> Tailwind</div>
                    </div>
                    <div className="text-xs text-slate-600 font-mono">Built by <span className="text-white">Arpit Namdeo</span></div>
                </div>
            </footer>
        </div>
    );
};
