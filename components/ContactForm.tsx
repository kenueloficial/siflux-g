
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, MessageSquare, Plus, ShoppingBag, Tag, ShieldCheck, Building2, Save } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'fiscal'>('info');

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto custom-scrollbar">
      {/* Header Contextual */}
      <div className="bg-white border-b border-slate-200 px-10 py-8 flex justify-between items-start sticky top-0 z-30 shadow-sm">
        <div className="flex items-center">
            <div className="h-20 w-20 rounded-[1.8rem] bg-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-100 mr-6">
                AS
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ana Souza</h1>
                <p className="text-sm text-slate-500 font-medium">Gerente de Compras @ Tech Solutions Ltda</p>
                <div className="flex mt-3 gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Cliente VIP</span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700">Tecnologia</span>
                </div>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 font-bold shadow-sm transition-all">Editar</button>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center">
               <Save className="w-5 h-5 mr-2" /> Salvar Alterações
            </button>
        </div>
      </div>

      <div className="p-10">
         <div className="max-w-5xl mx-auto space-y-10">
            
            <nav className="flex space-x-12 border-b border-slate-200">
               <button 
                  onClick={() => setActiveTab('info')}
                  className={`pb-4 px-1 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'info' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
               >
                  Dados de Contato
               </button>
               <button 
                  onClick={() => setActiveTab('fiscal')}
                  className={`pb-4 px-1 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'fiscal' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
               >
                  Fiscal (NFe/NFS-e)
               </button>
            </nav>

            {activeTab === 'info' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-4">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8">
                      <h3 className="text-xl font-black text-slate-900 mb-6">Informações Gerais</h3>
                      <div className="space-y-6">
                          <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">E-mail Corporativo</label>
                              <div className="flex items-center text-slate-900 font-bold p-3 bg-slate-50 rounded-xl border border-slate-100">
                                  <Mail className="w-4 h-4 mr-3 text-indigo-500" /> ana.souza@tech.com
                              </div>
                          </div>
                          <div>
                              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Telefone / WhatsApp</label>
                              <div className="flex items-center text-slate-900 font-bold p-3 bg-slate-50 rounded-xl border border-slate-100">
                                  <Phone className="w-4 h-4 mr-3 text-indigo-500" /> +55 11 99999-8888
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8">
                     <h3 className="text-xl font-black text-slate-900 mb-6">Métricas do Cliente</h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 rounded-[2rem] text-center border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Comprado</p>
                           <p className="text-2xl font-black text-indigo-600">R$ 45.2k</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] text-center border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Inadimplência</p>
                           <p className="text-2xl font-black text-emerald-600">0%</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'fiscal' && (
               <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                           <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900">Configurações Fiscais Obrigatórias</h3>
                           <p className="text-sm text-slate-500 font-medium">Estes dados são validados pela SEFAZ no momento da emissão.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-x-8 gap-y-10">
                         <div className="col-span-6 md:col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">CNPJ / CPF *</label>
                            <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-mono" defaultValue="12.345.678/0001-99" />
                         </div>
                         <div className="col-span-6 md:col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Inscrição Estadual</label>
                            <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none font-mono" defaultValue="123.456.789.111" />
                         </div>
                         <div className="col-span-6 md:col-span-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Indicador de IE</label>
                            <select className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-indigo-50 text-sm font-bold">
                               <option value="1">1 - Contribuinte ICMS</option>
                               <option value="2">2 - Contribuinte Isento</option>
                               <option value="9">9 - Não Contribuinte</option>
                            </select>
                         </div>
                         <div className="col-span-6">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 mt-4 flex items-center">
                               <MapPin className="w-4 h-4 mr-2 text-indigo-500" /> Endereço de Faturamento (SEFAZ)
                            </h4>
                            <div className="grid grid-cols-6 gap-6">
                               <div className="col-span-4">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none" placeholder="Logradouro" defaultValue="Av. Paulista" />
                               </div>
                               <div className="col-span-2">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none" placeholder="Número" defaultValue="1000" />
                               </div>
                               <div className="col-span-2">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none" placeholder="Bairro" defaultValue="Bela Vista" />
                               </div>
                               <div className="col-span-2">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none" placeholder="Município" defaultValue="São Paulo" />
                               </div>
                               <div className="col-span-1">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-center font-bold" placeholder="UF" defaultValue="SP" />
                               </div>
                               <div className="col-span-1">
                                  <input type="text" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none text-center font-mono text-xs" placeholder="IBGE" defaultValue="3550308" />
                                </div>
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

export default ContactForm;
