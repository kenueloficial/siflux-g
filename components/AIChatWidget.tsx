
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Paperclip, 
  Mic, 
  MoreHorizontal,
  Bot,
  User,
  Minimize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Sou o assistente Silflux. Como posso ajudar com sua gestão hoje?', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulação de resposta da IA
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Estou processando sua solicitação nos módulos de ERP e Financeiro...',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white rounded-[2rem] shadow-2xl flex flex-col z-[100] border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Chat Header */}
      <div className="bg-indigo-600 p-5 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Bot className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-indigo-600 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">Silflux AI</h3>
            <p className="text-[10px] text-indigo-100 font-medium uppercase tracking-wider">Assistente Inteligente</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-white border border-slate-200 text-slate-400'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
                <div className={`text-[9px] mt-2 font-bold uppercase opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Quick Chips */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
         <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">
           Resumo de Vendas
         </button>
         <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">
           Estoque Baixo
         </button>
      </div>

      {/* Chat Footer / Input */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="bg-slate-100 rounded-2xl p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white border border-transparent focus-within:border-slate-200 transition-all">
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-slate-700"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`p-2 rounded-xl transition-all ${
              inputValue.trim() ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Gemini 2.5 Flash</span>
           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
           <span>Silflux Intelligence</span>
        </div>
      </div>
    </div>
  );
};

export default AIChatWidget;
