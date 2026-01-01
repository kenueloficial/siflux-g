
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Cloud, 
  ShieldCheck, 
  Save, 
  ChevronRight,
  Monitor,
  Lock
} from 'lucide-react';
import { ViewState } from '../types';
import { NUVEM_FISCAL_CONFIG } from '../nuvemfiscal_config';

interface SettingsProps {
  onChangeView?: (view: ViewState) => void;
}

const Settings: React.FC<SettingsProps> = ({ onChangeView }) => {
  const [activeTab, setActiveTab] = useState<'fiscal' | 'company'>('fiscal');
  const [fiscalStatus, setFiscalStatus] = useState<{certExpiry: string | null}>({
    certExpiry: null
  });

  const [companyData, setCompanyData] = useState({
    razaoSocial: 'SILFLUX ENTERPRISE LTDA',
    cnpj: '12.345.678/0001-99'
  });

  useEffect(() => {
    const savedFiscal = localStorage.getItem('silflux_nuvemfiscal_config');
    if (savedFiscal) {
      const config = JSON.parse(savedFiscal);
      setFiscalStatus({
        certExpiry: config.certificate?.expiryDate || null
      });
    }

    const savedCompany = localStorage.getItem('silflux_company_data');
    if (savedCompany) {
      setCompanyData(JSON.parse(savedCompany));
    }
  }, []);

  const saveCompanySettings = () => {
    localStorage.setItem('silflux_company_data', JSON.stringify(companyData));
    alert('Dados do emitente salvos com sucesso!');
  };

  const tabs = [
    { id: 'fiscal', label: 'Fiscal & Tributário', icon: Cloud, desc: 'Gestão de Certificado A1' },
    { id: 'company', label: 'Dados do Emitente', icon: Building2, desc: 'CNPJ, Endereço e Logo' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-10 py-8 flex justify-between items-center shrink-0 shadow-sm z-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configurações</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Identidade fiscal e operacional da empresa.</p>
        </div>
        <button 
          onClick={activeTab === 'company' ? saveCompanySettings : () => alert('Configurações salvas.')}
          className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center transition-all"
        >
          <Save className="w-5 h-5 mr-3" /> Salvar Preferências
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 border-r border-slate-200 bg-white p-6 space-y-3 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-start p-5 rounded-2xl transition-all text-left group ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                  : 'hover:bg-slate-50 text-slate-500'
              }`}
            >
              <div className={`p-2.5 rounded-xl mr-4 ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50'}`}>
                <tab.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-black ${activeTab === tab.id ? 'text-white' : 'text-slate-900'}`}>{tab.label}</p>
                <p className={`text-[10px] font-bold uppercase tracking-tight mt-0.5 ${activeTab === tab.id ? 'text-indigo-100' : 'text-slate-400'}`}>{tab.desc}</p>
              </div>
              {activeTab !== tab.id && <ChevronRight className="w-4 h-4 text-slate-300 mt-1" />}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-12 bg-slate-50/50 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {activeTab === 'fiscal' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mr-5">
                           <Cloud className="w-7 h-7" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-slate-900">Módulo Fiscal</h2>
                           <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                             Integração Nuvem Fiscal ativa em 
                             <span className={`font-black uppercase text-[10px] px-2 py-0.5 rounded ${NUVEM_FISCAL_CONFIG.ENVIRONMENT === 'production' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {NUVEM_FISCAL_CONFIG.ENVIRONMENT}
                             </span>
                           </p>
                        </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner">
                         <ShieldCheck className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3">Certificado Digital A1</h3>
                      <p className="text-sm text-slate-500 font-medium mb-10 max-w-sm">
                         Para emitir notas fiscais, você precisa de um certificado A1 instalado e válido.
                      </p>
                      
                      <div className="w-full max-w-md p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between mb-8">
                         <div className="flex items-center gap-4 text-left">
                            <div className={`w-3 h-3 rounded-full ${fiscalStatus.certExpiry ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                               <p className="font-bold text-slate-900 mt-1">{fiscalStatus.certExpiry ? 'Certificado Instalado' : 'Aguardando Certificado'}</p>
                            </div>
                         </div>
                         <button 
                           onClick={() => onChangeView && onChangeView('certificate-config')}
                           className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                         >
                            {fiscalStatus.certExpiry ? 'Gerenciar' : 'Instalar Agora'}
                         </button>
                      </div>
                   </div>
                </section>

                <section className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                   <Lock className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 rotate-12" />
                   <h3 className="text-2xl font-black mb-4 relative z-10">Segurança de Dados</h3>
                   <p className="text-slate-400 font-medium mb-0 max-w-lg relative z-10 leading-relaxed">
                      Suas credenciais e certificados são transmitidos via SSL e armazenados com criptografia AES-256 pela infraestrutura da Nuvem Fiscal. 
                      O Silflux não armazena sua senha de certificado localmente após a transmissão bem-sucedida.
                   </p>
                </section>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-10">
                   <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-6">Dados da Empresa (Emitente)</h2>
                   <div className="flex items-center gap-8">
                      <div className="w-32 h-32 bg-slate-100 rounded-[2rem] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
                         <Monitor className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                         <span className="text-[10px] font-black uppercase text-center">Alterar<br/>Logo</span>
                      </div>
                      <div className="flex-1 space-y-4">
                         <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Razão Social</label>
                            <input 
                              type="text" 
                              value={companyData.razaoSocial}
                              onChange={(e) => setCompanyData({...companyData, razaoSocial: e.target.value})}
                              className="w-full px-5 py-3 rounded-2xl border border-slate-200 font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all" 
                            />
                         </div>
                         <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">CNPJ do Emitente</label>
                            <input 
                              type="text" 
                              value={companyData.cnpj}
                              onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                              className="w-full px-5 py-3 rounded-2xl border border-slate-200 font-mono focus:ring-4 focus:ring-indigo-50 outline-none transition-all" 
                            />
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
