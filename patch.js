/* --- DATA & CONTENT --- */
const DSA_MASTER_DATA = [
    {
        id: "arrays",
        label: "Arrays & RAM",
        position: { x: 150, y: 100 },
        status: "unlocked",
        learningContent: {
            title: "Arrays & Memory Architecture",
            summary: "The fundamental building block of data storage. Elements stored in contiguous memory.",
            deepDive: `### Internal Memory Layout
When you declare \`int arr[5]\`, the OS allocates a *continuous* block of memory. 
If the base address is 1000 and integer size is 4 bytes, the elements are at:
- \`arr[0]\`: 1000
- \`arr[1]\`: 1004
- \`arr[2]\`: 1008
...
This allows the CPU to fetch data using the formula: 
> \`Address = Base + (Index * Size)\`

**Why is this important?**
1. **O(1) Random Access:** No iteration needed.
2. **Spatial Locality:** CPU caches load chunks of memory. Arrays are cache-friendly.`,
            complexityAnalysis: {
                access: "O(1) - The fastest possible look-up.",
                search: "O(n) - Must scan one by one (if unsorted).",
                insertion: "O(n) - Must shift subsequent elements.",
                deletion: "O(n) - Must shift to fill the gap.",
                space: "O(n) - Strictly linear."
            },
            realWorldApplications: [
                "Basis for Hash Tables (Buckets).",
                "Image Buffers (Pixels stored linearly).",
                "Matrix Operations in Machine Learning."
            ],
            pitfalls: [
                "Index Out Of Bounds (#1 Error).",
                "Memory Fragmentation (Large arrays need contiguous blocks).",
                "Fixed size limits (in low-level languages)."
            ],
            codeSnippets: {
                python: `# Dynamic Array (List)
import sys
arr = [1, 2, 3]
# Python lists store POINTERS to objects, not raw values.
# This adds overhead but allows mixed types.`,
                java: `// Static Array
int[] arr = new int[5]; // Fast, stack-allocated references.

// Dynamic Array
ArrayList<Integer> list = new ArrayList<>(); // Resizes by 1.5x`,
                cpp: `// Raw Array
int arr[5]; 

// Vector (Dynamic)
std::vector<int> v; 
// Uses doubling strategy when capacity is reached.`
            }
        },
        questions: [
            { id: "arr_1", title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", xp: 10 },
            { id: "arr_2", title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", xp: 10 },
            { id: "arr_3", title: "Contains Duplicate", link: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", xp: 10 }
        ]
    },
    {
        id: "linkedlist",
        label: "Linked Lists",
        position: { x: 300, y: 300 },
        dependencies: ["arrays"],
        status: "unlocked",
        learningContent: {
            title: "Linked Lists & Pointers",
            summary: "Nodes scattered in memory, connected by references (pointers). Dynamic and flexible.",
            deepDive: `### The Pointer Chain
Unlike arrays, Linked Lists do strictly **NOT** require contiguous memory. Each node contains:
1. \`Data\`: The value.
2. \`Next\`: Address of the next node.

**Visualizing structure:**
\`[Head: 1000] -> [Data: 5 | Next: 5020] -> [Data: 8 | Next: 200] -> NULL\`

**Why use them?**
- **Dynamic Size:** No pre-allocation needed.
- **Efficient Insertions:** \`O(1)\` if you have the pointer (no shifting).`,
            complexityAnalysis: {
                access: "O(n) - Must traverse from Head.",
                search: "O(n) - Linearly follow pointers.",
                insertion: "O(1) - Just rewire pointers (at head/known location).",
                deletion: "O(1) - Rewire pointers.",
                space: "O(n) - Extra memory for pointers."
            },
            realWorldApplications: [
                "Browser History (Back/Forward).",
                "Undo/Redo Functionality (Stacks).",
                "Blockchains (Hash Pointers link blocks)."
            ],
            pitfalls: [
                "Losing the Head reference (Memory Leak).",
                "Null Pointer Exceptions (Segfaults).",
                "Poor Cache Locality (Scanning is slow)."
            ],
            codeSnippets: {
                python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(1)
head.next = ListNode(2)`,
                java: `class Node {
    int data;
    Node next;
}
// Java's Garbage Collector handles deleted nodes automatically.`,
                cpp: `struct Node {
    int data;
    Node* next;
};
// Manual memory management required (delete node).`
            }
        },
        questions: [
            { id: "ll_1", title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", xp: 10 },
            { id: "ll_2", title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", xp: 10 }
        ]
    },
    {
        id: "recursion",
        label: "Recursion",
        position: { x: 450, y: 100 },
        status: "unlocked",
        learningContent: {
            title: "Recursion & The Stack",
            summary: "Solving problems by breaking them into smaller, self-similar sub-problems.",
            deepDive: `### The Call Stack Visualization
Every recursive call pushes a new **Stack Frame** onto memory.
Frame contains:
- Local variables
- Return address
- Parameters

**Example: Factorial(3)**
1. \`fact(3)\` -> pushes to stack. Calls \`fact(2)\`.
2. \`fact(2)\` -> pushes. Calls \`fact(1)\`.
3. \`fact(1)\` -> Base case! Returns 1.
4. \`fact(2)\` resumes. Returns 2 * 1.
5. \`fact(3)\` resumes. Returns 3 * 2.

**Key Rule:**
Always define a **Base Case** to stop the recursion, otherwise: \`StackOverflowError\`.`,
            complexityAnalysis: {
                access: "N/A - It's a method.",
                search: "O(n) - Depth of recursion tree.",
                insertion: "N/A",
                deletion: "N/A",
                space: "O(h) - Height of the recursion tree (Stack depth)."
            },
            realWorldApplications: [
                "DOM Tree Traversal (HTML Parsing).",
                "JSON Serialization/Deserialization.",
                "Divide & Conquer Algorithms (Merge Sort, Quick Sort)."
            ],
            pitfalls: [
                "Stack Overflow (Infinite Recursion).",
                "Re-calculating same states (Fix with Memoization/DP).",
                "High memory overhead compared to Iteration."
            ],
            codeSnippets: {
                python: `def factorial(n):
    if n <= 1: return 1 # Base Case
    return n * factorial(n-1) # Recursive Case`,
                java: `public int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
                cpp: `int dfs(Node* root) {
    if (!root) return 0;
    return 1 + max(dfs(root->left), dfs(root->right));
}`
            }
        },
        questions: [
            { id: "rec_1", title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy", xp: 10 },
            { id: "rec_2", title: "Fibonacci Number", link: "https://leetcode.com/problems/fibonacci-number/", difficulty: "Easy", xp: 10 }
        ]
    }
];

/* --- TOPIC DEEP DIVE COMPONENT (SLIDE-OVER) --- */
const TopicDeepDive = ({ node, onClose }) => {
    const { motion, AnimatePresence } = window.Motion;
    const [activeSection, setActiveSection] = useState('theory');
    const sections = [
        { id: 'theory', label: 'Theory' },
        { id: 'complexity', label: 'Complexity' },
        { id: 'code', label: 'Polyglot Code' },
        { id: 'pitfalls', label: 'Pitfalls' }
    ];

    // Markdown Parser
    const renderMarkdown = (text) => {
        if (!text) return { __html: '' };
        return { __html: window.marked ? window.marked.parse(text) : text };
    };

    // Syntax Highlight Trigger
    useEffect(() => {
        if (window.Prism) window.Prism.highlightAll();
    }, [activeSection, node]);

    if (!node || !node.learningContent) return null;
    const content = node.learningContent;

    const scrollTo = (id) => {
        setActiveSection(id);
        document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full md:w-[85%] lg:w-[65%] h-full bg-[#030304] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative"
            >
                {/* Header */}
                <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold border border-brand-500/30">
                            <Icon name="book-open" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">{content.title}</h2>
                            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">{node.label} MODULE</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <Icon name="x" size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex relative">
                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 pb-32 space-y-20 scroll-smooth">
                        {/* 1. Theory */}
                        <section id="sec-theory" className="space-y-6">
                            <div className="flex items-center gap-3 text-brand-400 border-b border-brand-500/20 pb-2 mb-6">
                                <Icon name="book" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Deep Theory</h3>
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed font-light">{content.summary}</p>
                            <div className="prose prose-invert prose-p:text-slate-400 prose-headings:text-white prose-strong:text-brand-400 max-w-none">
                                <div dangerouslySetInnerHTML={renderMarkdown(content.deepDive)} />
                            </div>
                        </section>

                        {/* 2. Complexity */}
                        <section id="sec-complexity" className="space-y-6">
                            <div className="flex items-center gap-3 text-purple-400 border-b border-purple-500/20 pb-2 mb-6">
                                <Icon name="activity" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Complexity Analysis</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(content.complexityAnalysis).map(([key, val]) => (
                                    <div key={key} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col hover:border-purple-500/30 transition-colors">
                                        <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">{key}</span>
                                        <span className="text-sm font-bold text-white">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Code Implementation */}
                        <section id="sec-code" className="space-y-6">
                            <div className="flex items-center gap-3 text-emerald-400 border-b border-emerald-500/20 pb-2 mb-6">
                                <Icon name="code" size={20} />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Polyglot Implementation</h3>
                            </div>
                            <div className="space-y-8">
                                {Object.entries(content.codeSnippets).map(([lang, code]) => (
                                    <div key={lang} className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d12]">
                                        <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lang}</span>
                                            <button className="text-xs text-brand-400 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(code)}>COPY</button>
                                        </div>
                                        <pre className={`language-${lang} !m-0 !bg-transparent text-xs md:text-sm custom-scrollbar`}>
                                            <code>{code}</code>
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Pitfalls & Apps */}
                        <section id="sec-pitfalls" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center gap-3 text-red-400 border-b border-red-500/20 pb-2 mb-6">
                                        <Icon name="alert-triangle" size={20} />
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Common Pitfalls</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {content.pitfalls.map((p, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                                <span className="text-red-500 mt-1">✕</span> {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 text-blue-400 border-b border-blue-500/20 pb-2 mb-6">
                                        <Icon name="globe" size={20} />
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Industry Use</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {content.realWorldApplications.map((app, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                                <span className="text-blue-500 mt-1">✓</span> {app}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="h-32 text-center flex flex-col items-center justify-center text-slate-600 space-y-4">
                            <Icon name="check-circle" size={40} className="opacity-20" />
                            <p className="text-xs uppercase tracking-[0.3em]">Module Review Complete</p>
                        </div>
                    </div>

                    {/* Sidebar TOC */}
                    <div className="hidden lg:block w-64 bg-black/20 border-l border-white/5 p-6 space-y-2 sticky top-0">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Table of Contents</p>
                        {sections.map(s => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between group ${activeSection === s.id ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                            >
                                {s.label}
                                {activeSection === s.id && <motion.div layoutId="toc-active" className="w-1.5 h-1.5 rounded-full bg-brand-400" />}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
