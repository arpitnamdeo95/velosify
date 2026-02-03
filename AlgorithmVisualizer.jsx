/* --- ALGORITHM VISUALIZER COMPONENT --- */
const AlgorithmVisualizer = () => {
    const { motion, AnimatePresence } = window.Motion;
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [algo, setAlgo] = useState("Bubble Sort");
    const [speed, setSpeed] = useState(50); // Delay in ms
    const [compareIndices, setCompareIndices] = useState([]);
    const [swapIndices, setSwapIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const stopRef = useRef(false);

    const audioCtx = useRef(null);

    useEffect(() => {
        randomize();
        return () => { stopRef.current = true; };
    }, []);

    const playTone = (val) => {
        if (!audioEnabled) return;
        if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.current.state === 'suspended') audioCtx.current.resume();

        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();

        // Map value (0-100) to frequency (200Hz - 600Hz)
        const freq = 200 + (val * 4);

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);

        gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        osc.start();
        osc.stop(audioCtx.current.currentTime + 0.1);
    };

    const randomize = () => {
        if (isSorting) return;
        const newArr = [];
        for (let i = 0; i < 50; i++) newArr.push(Math.floor(Math.random() * 90) + 10);
        setArray(newArr);
        setSortedIndices([]);
        setCompareIndices([]);
        setSwapIndices([]);
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const bubbleSort = async () => {
        const arr = [...array];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) return;
                setCompareIndices([j, j + 1]);
                playTone(arr[j]);
                await sleep(speed);

                if (arr[j] > arr[j + 1]) {
                    setSwapIndices([j, j + 1]);
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                    playTone(arr[j + 1]);
                    await sleep(speed);
                }
                setSwapIndices([]);
            }
            setSortedIndices(prev => [...prev, n - i - 1]);
        }
        setSortedIndices(arr.map((_, i) => i));
        setCompareIndices([]);
    };

    const selectionSort = async () => {
        const arr = [...array];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (stopRef.current) return;
                setCompareIndices([minIdx, j]);
                playTone(arr[j]);
                await sleep(speed);
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
                setSwapIndices([minIdx, i]);
                const temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
                setArray([...arr]);
                playTone(arr[i]);
                await sleep(speed);
                setSwapIndices([]);
            }
            setSortedIndices(prev => [...prev, i]);
        }
        setSortedIndices(arr.map((_, i) => i));
        setCompareIndices([]);
    };

    const insertionSort = async () => {
        const arr = [...array];
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            setCompareIndices([i]);
            await sleep(speed);

            while (j >= 0 && arr[j] > key) {
                if (stopRef.current) return;
                setCompareIndices([j, j + 1]);
                setSwapIndices([j + 1]);
                playTone(arr[j]);
                arr[j + 1] = arr[j];
                setArray([...arr]);
                await sleep(speed);
                j = j - 1;
            }
            arr[j + 1] = key;
            setArray([...arr]);
            playTone(key);
        }
        setSortedIndices(arr.map((_, i) => i));
        setCompareIndices([]);
    };

    const runSimulation = async () => {
        setIsSorting(true);
        stopRef.current = false;
        setSortedIndices([]);

        if (algo === "Bubble Sort") await bubbleSort();
        if (algo === "Selection Sort") await selectionSort();
        if (algo === "Insertion Sort") await insertionSort();

        setIsSorting(false);
    };

    return (
        <div className="flex flex-col h-full space-y-6 animate-fade-in max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                        <Icon name="cpu" className="text-cyan-400" /> SIMULATION CHAMBER
                    </h2>
                    <p className="text-slate-400 mt-2 font-mono text-xs uppercase tracking-[0.2em]">Real-time Algorithmic Visualization Engine</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setAudioEnabled(!audioEnabled)} className={`p-3 rounded-xl border transition-all ${audioEnabled ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-transparent border-slate-700 text-slate-500 hover:text-white'}`}>
                        <Icon name={audioEnabled ? "volume-2" : "volume-x"} size={20} />
                    </button>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-slate-300">
                        <span className="text-slate-500 mr-2">ARRAY SIZE:</span><span className="font-bold text-white">{array.length}</span>
                    </div>
                </div>
            </div>

            {/* STAGE */}
            <div className="flex-1 bg-black/40 border-2 border-dashed border-white/10 rounded-3xl p-8 relative flex items-end justify-center gap-[2px] overflow-hidden min-h-[400px]">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <AnimatePresence>
                    {array.map((val, idx) => {
                        let colorClass = "bg-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.4)]"; // Default
                        if (compareIndices.includes(idx)) colorClass = "bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] z-10 scale-110";
                        if (swapIndices.includes(idx)) colorClass = "bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.6)] z-20 scale-125";
                        if (sortedIndices.includes(idx)) colorClass = "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]";

                        return (
                            <motion.div
                                layout
                                key={idx}
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`w-full rounded-t-md transition-colors duration-100 ${colorClass}`}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* CONTROLS */}
            <Card className="bg-surface-900 border-t border-white/10 p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Algorithm</label>
                            <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                                {["Bubble Sort", "Selection Sort", "Insertion Sort"].map(a => (
                                    <button
                                        key={a}
                                        onClick={() => setAlgo(a)}
                                        disabled={isSorting}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${algo === a ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {a.replace(' Sort', '')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span>Processing Speed</span>
                                <span>{101 - speed}%</span>
                            </div>
                            <input
                                type="range"
                                min="1" max="100"
                                value={101 - speed}
                                onChange={e => setSpeed(101 - parseInt(e.target.value))}
                                disabled={isSorting}
                                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={randomize}
                                disabled={isSorting}
                                className="px-6 py-4 rounded-xl border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white disabled:opacity-50 transition-all"
                            >
                                <Icon name="shuffle" />
                            </button>
                            <button
                                onClick={runSimulation}
                                disabled={isSorting}
                                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Icon name="play" size={16} fill="currentColor" /> RUN SIMULATION
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
