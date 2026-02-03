import React, { useState, useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft, X, ExternalLink, Play, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomNode from './CustomNode';

import { getLayoutedElements } from '../../utils/layout';

const nodeTypes = {
    roadmapNode: CustomNode,
    roadmapRoot: CustomNode, // For now, use same style or customize
};

const RoadmapViewer = ({ data, onBack }) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() =>
        getLayoutedElements(data.nodes, data.edges),
        [data]
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    const closeDrawer = () => setSelectedNode(null);

    return (
        <div className="h-screen w-full bg-[#05050a] relative overflow-hidden text-slate-200 font-sans">
            {/* HEADER / BACK BUTTON */}
            <Panel position="top-left" className="z-50 !m-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-brand-500/50 transition-all group active:scale-95 shadow-2xl"
                >
                    <ArrowLeft size={18} className="text-brand-400 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">[ EXIT ROADMAP ]</span>
                </button>
            </Panel>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                onPaneClick={closeDrawer}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={true}
                zoomOnDoubleClick={false}
            >
                <Background color="#1e293b" gap={20} size={1} />
                <Controls className="!bg-slate-900 !border-slate-800 !fill-slate-400 [&_button]:!border-slate-800" />
            </ReactFlow>

            {/* TOPIC DRAWER */}
            <AnimatePresence>
                {selectedNode && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 right-0 w-full md:w-[450px] bg-[#0a0a0f] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-brand-400">
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">Module</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
                                        {selectedNode.data.label}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeDrawer}
                                    className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                                {/* Description */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Context Protocol</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                        {selectedNode.data.description || "System overview for this node is not yet decrypted. Accessing standard learning protocols."}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Mastery Status</h4>
                                    <button className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all
                    ${selectedNode.data.status === 'done'
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/20 active:scale-[0.98]'}`}
                                    >
                                        {selectedNode.data.status === 'done' ? (
                                            <><CheckCircle size={16} /> Mark Incomplete</>
                                        ) : (
                                            'Mark as Complete'
                                        )}
                                    </button>
                                </div>

                                {/* Resources */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Learning Relics</h4>
                                    <div className="grid gap-3">
                                        {(selectedNode.data.resources || []).length > 0 ? (
                                            selectedNode.data.resources.map((res, i) => (
                                                <a
                                                    key={i}
                                                    href={res.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-brand-500/30 transition-all active:scale-[0.99]"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center group-hover:text-brand-400 transition-colors">
                                                            {res.type === 'video' ? <Play size={18} fill="currentColor" /> : <FileText size={18} />}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors">{res.title}</div>
                                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{res.type}</div>
                                                        </div>
                                                    </div>
                                                    <ExternalLink size={14} className="text-slate-600 group-hover:text-brand-400 transition-colors" />
                                                </a>
                                            ))
                                        ) : (
                                            <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                                                <p className="text-xs text-slate-500 font-mono">NO RESOURCES LOCATED</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-8 border-t border-white/5 bg-black/40">
                                <div className="flex items-center gap-3 text-brand-400/60 font-mono text-[10px] uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                                    Neural Link Established
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoadmapViewer;
