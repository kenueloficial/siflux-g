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
  Plus,
  ChevronRight,
  Command
} from 'lucide-react';

const AIAgent: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      
      {/* Abstract Background Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Actions (Absolute to sit over content if needed) */}
      <div className="absolute top-6 right-8 z-20">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5">
          <Plus className="w-4 h-4 mr-2" /> New Chat
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10 max-w-5xl mx-auto w-full">
        
        {/* Greeting Section */}
        <div className="text-center mb-12 relative">
            {/* Floating 3D-like Element */}
            <div className="absolute -right-24 -top-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-xl opacity-30 hidden lg:block"></div>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
                Hi, good to see you!
            </h1>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 tracking-tight pb-2">
                How can I assist you today?
            </h2>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className="flex items-center px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all group">
                <BarChart2 className="w-5 h-5 mr-2 text-blue-500 group-hover:text-blue-600" />
                <span className="font-medium">Market Trends Research</span>
            </button>
            <button className="flex items-center px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all group">
                <FileText className="w-5 h-5 mr-2 text-purple-500 group-hover:text-purple-600" />
                <span className="font-medium">Generate ERP Reports</span>
            </button>
            <button className="flex items-center px-5 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-600 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 transition-all group">
                <PieChart className="w-5 h-5 mr-2 text-cyan-500 group-hover:text-cyan-600" />
                <span className="font-medium">Create Data Visualization</span>
            </button>
        </div>

        {/* Input Area Container */}
        <div className="w-full max-w-3xl relative">
            <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2rem] p-4 transition-shadow focus-within:shadow-blue-100 focus-within:border-blue-300">
                
                {/* Text Input */}
                <div className="flex items-start mb-2">
                    <div className="mt-2 ml-2 mr-3">
                        <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                    </div>
                    <textarea 
                        placeholder="Ask Silflux about your stock, sales, or finance..." 
                        className="w-full min-h-[60px] max-h-[200px] bg-transparent border-none focus:ring-0 text-lg placeholder-slate-400 text-slate-800 resize-none py-2 custom-scrollbar"
                        rows={1}
                    />
                </div>

                {/* Input Controls */}
                <div className="flex items-center justify-between pl-2 pr-1">
                    
                    {/* Left: Toggles */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-slate-100 rounded-full p-1 pr-3 cursor-pointer hover:bg-slate-200 transition-colors">
                            <div className="w-8 h-5 bg-white rounded-full shadow-sm mr-2 border border-slate-200 relative">
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-slate-400 rounded-full"></div>
                            </div>
                            <span className="text-xs font-semibold text-slate-600">Speed</span>
                        </div>
                         <div className="flex items-center bg-slate-100 rounded-full p-1 pr-3 cursor-pointer hover:bg-slate-200 transition-colors">
                             <span className="bg-slate-800 text-white text-[10px] font-bold px-1.5 rounded ml-1 mr-2">PRO</span>
                            <span className="text-xs font-semibold text-slate-600">Model</span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2">
                        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                            <ArrowUp className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Bottom Toolbar (Inside Input Box) */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-6 px-2">
                     <button className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Grid className="w-4 h-4 mr-2 text-slate-400" />
                        Tools
                     </button>
                     <button className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Settings className="w-4 h-4 mr-2 text-slate-400" />
                        Settings
                     </button>
                     <button className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Paperclip className="w-4 h-4 mr-2 text-slate-400" />
                        Attach Files
                     </button>
                </div>
            </div>

            {/* Advanced Models Bar */}
            <div className="mt-6 bg-slate-100/80 backdrop-blur rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/80 transition-colors border border-slate-200">
                <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 ml-2">Enable All Advanced Models</span>
                </div>
                <div className="flex items-center space-x-3">
                     <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white"></div>
                     </div>
                     <span className="text-xs font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">4+</span>
                     <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
            </div>
        </div>

      </div>

      {/* Footer */}
      <div className="p-6 text-center">
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-400 font-medium">
              <span className="cursor-pointer hover:text-slate-600">Privacy Policy</span>
              <span className="cursor-pointer hover:text-slate-600">Terms of Service</span>
              <span className="cursor-pointer hover:text-slate-600">Cookie Settings</span>
              <div className="flex items-center cursor-pointer hover:text-slate-600">
                  <span>English (US)</span>
                  <ChevronRight className="w-3 h-3 ml-1 rotate-90" />
              </div>
          </div>
          <p className="text-[10px] text-slate-300 mt-2">© 2025 Silflux. All rights reserved.</p>
      </div>

    </div>
  );
};

export default AIAgent;