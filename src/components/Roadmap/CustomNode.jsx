import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomNode = ({ data, selected }) => {
    const isDone = data.status === 'done';

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative px-6 py-4 rounded-xl border-2 transition-all duration-300 min-w-[180px] text-center shadow-xl
        ${selected ? 'ring-2 ring-brand-400 ring-offset-4 ring-offset-[#05050a]' : ''}
        ${isDone ? 'bg-emerald-500/10 border-emerald-500 text-emerald-100 shadow-emerald-500/20' :
                    'bg-slate-800/80 border-slate-700 text-slate-100 hover:border-brand-500/50'}`}
        >
            <Handle type="target" position={Position.Top} className="!bg-slate-600 !w-3 !h-3 !border-none" />

            <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-bold tracking-tight uppercase">{data.label}</div>
                {isDone && (
                    <div className="absolute -top-3 -right-3 bg-emerald-500 text-black rounded-full p-1 shadow-lg">
                        <CheckCircle2 size={16} strokeWidth={3} />
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !w-3 !h-3 !border-none" />
        </motion.div>
    );
};

export default memo(CustomNode);
