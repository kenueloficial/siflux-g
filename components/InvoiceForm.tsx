
import React, { useState } from 'react';
import { 
  Save, 
  Send, 
  Eye, 
  Cloud, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck,
  Search,
  ChevronRight,
  Printer,
  FileCode,
  ArrowLeft,
  Truck,
  CreditCard,
  MapPin,
  Building2,
  Package,
  Plus,
  Info
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const InvoiceForm: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('recipient');
  const [emissionStatus, setEmissionStatus] = useState<'idle' | 'validating' | 'signing' | 'transmitting' | 'success' | 'error'>('idle');
  const [log, setLog] = useState<string[]>([]);

  const tabs = [
    { id: 'recipient', label: '1. Destinatário', icon: Building2 },
    { id: 'items', label: '2. Itens', icon: Package },
    { id: 'transport', label: '3. Transporte', icon: Truck },
    { id: 'payment', label: '4. Pagamento', icon: CreditCard },
  ];

  const addLog = (msg: string) => setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const handleTransmit = async () => {
    setLog([]);
    setEmissionStatus('validating');
    addLog('Iniciando validação de campos obrigatórios...');
    
    // Simulação do Workflow Técnico Real
    await new Promise(r => setTimeout(r, 1200));
    addLog('Schema XML 4.00 validado com sucesso.');
    
    setEmissionStatus('signing');
    addLog('Solicitando assinatura digital à Nuvem Fiscal...');
    await new Promise(r => setTimeout(r, 1000));
    addLog('Documento assinado digitalmente.');
    
    setEmissionStatus('transmitting');
    addLog('Transmitindo lote para SEFAZ-SP...');
    await new Promise(r => setTimeout(r, 2000));
    
    setEmissionStatus('success');
    addLog('Nota Autorizada. Protocolo: 135240001234567');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-6 p-2.5 hover:bg-slate-100 rounded-full transition-all group">
            <ArrowLeft className="w-6 h-6 text-slate-500 group-hover:text-slate-900" />
          </button>
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg shadow-indigo-100">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Emissor Oficial NFe</h1>
            <div className="flex items-center text-[10px] font-black mt-1 uppercase tracking-widest text-emerald-600">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
               Ambiente: Sandbox / Homologação
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center transition-all shadow-sm">
            <Eye className="w-4 h-4 mr-2" /> Gerar Preview
          </button>
          
          <button 
            onClick={handleTransmit}
            disabled={emissionStatus !== 'idle'}
            className={`px-10 py-2.5 rounded-xl shadow-lg text-sm font-black flex items-center transition-all ${
                emissionStatus === 'success' 
                ? 'bg-emerald-600 text-white shadow-emerald-100' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {emissionStatus === 'idle' && <><Send className="w-4 h-4 mr-2" /> Emitir NFe v4.0</>}
            {emissionStatus === 'validating' && <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Validando Schema...</>}
            {emissionStatus === 'signing' && <><ShieldCheck className="w-4 h-4 mr-2 animate-bounce" /> Assinando via Cloud...</>}
            {emissionStatus === 'transmitting' && <><Cloud className="w-4 h-4 mr-2 animate-pulse" /> Transmitindo SEFAZ...</>}
            {emissionStatus === 'success' && <><CheckCircle className="w-4 h-4 mr-2" /> Autorizada!</>}
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-slate-100 px-8 flex-shrink-0">
        <nav className="flex space-x-12 h-16 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all relative h-full border-b-2 ${
                activeTab === tab.id 
                  ? 'text-indigo-600 border-indigo-600' 
                  : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          
          <div className="lg:col-span-8 space-y-6">
             {/* Destinatário */}
             {activeTab === 'recipient' && (
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 space-y-8 animate-in fade-in">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                     <Building2 className="w-6 h-6 mr-3 text-indigo-600" /> Dados do Destinatário
                   </h3>
                   <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 md:col-span-2">
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Documento (CPF/CNPJ) *</label>
                         <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-mono text-sm" defaultValue="12.345.678/0001-99" />
                      </div>
                      <div className="col-span-6 md:col-span-4">
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Nome / Razão Social *</label>
                         <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold" defaultValue="Tech Solutions Enterprise Ltda" />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Inscrição Estadual</label>
                         <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-mono text-sm" defaultValue="123.456.789.111" />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                         <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Indicador IE</label>
                         <select className="w-full px-5 py-4 rounded-2xl border border-slate-200 font-bold text-sm bg-white">
                            <option value="1">1 - Contribuinte ICMS</option>
                            <option value="2">2 - Contribuinte Isento</option>
                            <option value="9">9 - Não Contribuinte</option>
                         </select>
                      </div>
                   </div>
                </div>
             )}

             {/* Itens */}
             {activeTab === 'items' && (
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 space-y-8 animate-in fade-in">
                   <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                      <h3 className="text-xl font-black text-slate-900 flex items-center">
                        <Package className="w-6 h-6 mr-3 text-indigo-600" /> Itens da Nota
                      </h3>
                      <button className="flex items-center text-xs font-black text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-all uppercase tracking-widest">
                        <Plus className="w-4 h-4 mr-2" /> Inserir do Estoque
                      </button>
                   </div>
                   <div className="space-y-4">
                      <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:bg-white transition-all hover:border-indigo-200 shadow-sm">
                         <div className="flex items-center">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 mr-5">💻</div>
                            <div>
                               <p className="font-black text-slate-900">MacBook Pro M3 Max</p>
                               <div className="flex gap-4 mt-1">
                                  <span className="text-[10px] text-slate-400 font-black uppercase">NCM: 8471.30.12</span>
                                  <span className="text-[10px] text-indigo-500 font-black uppercase">CFOP: 5102</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Total Item</p>
                            <p className="font-black text-slate-900 text-lg">R$ 25.499,00</p>
                         </div>
                      </div>
                   </div>
                </div>
             )}
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center uppercase tracking-tighter">
                  <Info className="w-5 h-5 mr-2 text-indigo-500" /> Log de Transmissão
                </h3>
                <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[10px] text-emerald-400 h-64 overflow-y-auto space-y-2 custom-scrollbar">
                   {log.length === 0 ? (
                      <p className="text-slate-500 italic">Aguardando início do processo...</p>
                   ) : (
                      log.map((entry, i) => <div key={i}>{entry}</div>)
                   )}
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 space-y-6">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-6 tracking-tight">Totais da Operação</h3>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>Valor dos Produtos</span>
                      <span className="text-slate-900">R$ 25.499,00</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span>Base ICMS</span>
                      <span className="text-slate-900">R$ 0,00</span>
                   </div>
                   <div className="border-t border-slate-100 pt-6 mt-6">
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total NFe</span>
                         <span className="text-3xl font-black text-indigo-600">R$ 25.499,00</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
