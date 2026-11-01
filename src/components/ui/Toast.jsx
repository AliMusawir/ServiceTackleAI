import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Toast = () => {
  const { toast, setToast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0F172A] border border-[#334155] shadow-2xl text-slate-100 max-w-md animate-slideIn">
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {!isSuccess && !isError && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
      
      <p className="text-sm font-medium text-slate-200">{toast.message}</p>
      
      <button
        onClick={() => setToast(null)}
        className="ml-auto p-1 text-slate-400 hover:text-slate-200 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
