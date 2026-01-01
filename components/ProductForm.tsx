
import React, { useState } from 'react';
import { Save, X, ShieldCheck, HelpCircle, Package, DollarSign, Info, Warehouse, Tag } from 'lucide-react';

const ProductForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fiscal');

  const tabs = [
    { id: 'info', label: 'Básico', icon: Info },
    { id: 'price', label: 'Precificação', icon: DollarSign },
    { id: 'fiscal', label: 'Fiscal (SEFAZ)', icon: ShieldCheck },
    { id: 'stock', label: 'Estoque', icon: Warehouse },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-10 py-8 flex items-center justify-between shadow-sm z-30 shrink-0">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mr-5 shadow-xl shadow-indigo-100">
             <Package className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cadastro Técnico</h1>
            <p className="text-sm text-slate-500 font-medium">Configuração avançada para emissão de documentos fiscais.</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-3 border border-slate-200 bg-white rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Descartar
          </button>
          <button className="px-10 py-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 text-sm font-black hover:bg-indigo-700 transition-all flex items-center">
            <Save className="w-5 h-5 mr-3" />
            Salvar Registro
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="bg-white border-b border-slate-100 px-10 shrink-0">
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

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          
          {activeTab === 'info' && (
            <div className="bg-white shadow-sm border border-slate-200 rounded-[2.5rem] p-10 space-y-10 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-6 gap-8">
                  <div className="col-span-6 md:col-span-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Descrição Comercial *</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold" placeholder="Nome completo do produto" />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">GTIN / EAN</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-mono" placeholder="789..." />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'fiscal' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white shadow-sm border border-slate-200 rounded-[2.5rem] p-10">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Configurações Tributárias (NFe 4.0)</h3>
                    <p className="text-sm text-slate-500 font-medium">Dados fundamentais para validação jurídica do documento.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-10">
                  <div className="md:col-span-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NCM (Nomenclatura Comum) *</label>
                      <HelpCircle className="w-4 h-4 text-slate-300 cursor-help" />
                    </div>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-mono text-sm" placeholder="8471.30.12" />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">CEST (Substituição Tributária)</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-mono text-sm" placeholder="21.031.00" />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Origem da Mercadoria</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-bold">
                      <option value="0">0 - Nacional</option>
                      <option value="1">1 - Estrangeira (Importação Direta)</option>
                      <option value="2">2 - Estrangeira (Mercado Interno)</option>
                      <option value="5">5 - Nacional (Conteúdo Importado {'>'} 40%)</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Unidade de Medida Comercial</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-center" defaultValue="UN" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <Tag className="absolute -top-10 -right-10 w-48 h-48 opacity-5 -rotate-12" />
                <h4 className="font-black text-xl mb-8 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
                  Regras de ICMS / PIS / COFINS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CSOSN (Simples Nacional)</label>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500">
                        <option>101 - Tributada com Permissão de Crédito</option>
                        <option>102 - Tributada sem Permissão de Crédito</option>
                        <option>400 - Não Tributada pelo Simples</option>
                        <option>500 - ICMS Cobrado Anteriormente (ST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CFOP Padrão (Saída Interna)</label>
                      <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500" defaultValue="5102" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Situação Tributária PIS/COFINS</label>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500">
                        <option>01 - Operação Tributável (Aliq. Básica)</option>
                        <option>07 - Operação Isenta de Contribuição</option>
                        <option>08 - Operação sem Incidência</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CFOP Padrão (Saída Interestadual)</label>
                      <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500" defaultValue="6102" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
