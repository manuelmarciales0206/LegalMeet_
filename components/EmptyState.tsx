
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'neutral' | 'error';
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'neutral'
}) => {
  const isError = variant === 'error';
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className={`p-4 rounded-full mb-4 ${isError ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className={`text-lg font-bold mb-2 ${isError ? 'text-red-700' : 'text-slate-700'}`}>
        {title}
      </h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={`
            px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm
            ${isError 
              ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' 
              : 'bg-brand-800 text-white hover:bg-brand-900 hover:-translate-y-0.5'
            }
          `}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
