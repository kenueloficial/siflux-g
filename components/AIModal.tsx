
import React from 'react';
import { 
  Sparkles, 
  Mic, 
  ArrowUp, 
  Paperclip, 
  Settings, 
  Grid, 
  BarChart2, 
  FileText, 
  PieChart,
  X,
  Command,
  ChevronRight
} from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Background Decorative Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-xl shadow-blue-200 mb-6 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Silflux AI <span className="text-blue-600">Assist</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Como posso ajudar sua empresa agora?</p>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl">
            {[
              { label: 'Fluxo de Caixa Mensal', icon: BarChart2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Produtos Sem Estoque', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-50' },
              { label: 'Previsão de Vendas', icon: PieChart, color: 'text-indigo-500', bg: 'bg-indigo-50' }
            ].map((chip) => (
              <button key={chip.label} className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-600 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <chip.icon className={`w-4 h-4 mr-2 ${chip.color}`} />
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="w-full max-w-2xl">
            <div className="bg-white border-2 border-slate-100 shadow-xl rounded-[2rem] p-4 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
              <div className="flex items-start">
                <textarea 
                  placeholder="Pergunte qualquer coisa sobre vendas, estoque ou financeiro..." 
                  className="w-full min-h-[50px] max-h-[150px] bg-transparent border-none focus:ring-0 text-base md:text-lg placeholder-slate-400 text-slate-800 resize-none py-2 px-2 custom-scrollbar"
                  rows={1}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50 px-2">
                <div className="flex items-center space-x-3">
                   <div className="flex items-center bg-slate-100 rounded-full p-0.5 pr-2.5 cursor-pointer hover:bg-slate-200 transition-colors">
                      <div className="w-6 h-4 bg-white rounded-full shadow-sm mr-2 border border-slate-200 relative">
                        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Turbo</span>
                   </div>
                   <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                   <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Mic className="w-4 h-4" /></button>
                </div>
                <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all hover:scale-110">
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center text-xs text-slate-400 font-bold uppercase tracking-widest">
              <Command className="w-3 h-3 mr-2" /> Powered by Gemini 3.1
           </div>
           <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
              <span className="hover:text-slate-600 cursor-pointer">Privacidade</span>
              <span className="hover:text-slate-600 cursor-pointer">Ajustes</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
