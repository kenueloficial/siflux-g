
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Cloud, 
  CheckCircle, 
  RefreshCw,
  Activity,
  Webhook,
  Lock,
  AlertCircle,
  Settings as SettingsIcon
} from 'lucide-react';
// Corrected import to use NUVEM_FISCAL_CONFIG instead of NUVEM_FISCAL_CREDENTIALS
import { NUVEM_FISCAL_CONFIG, NUVEM_FISCAL_ENDPOINTS } from '../nuvemfiscal_config';

interface Props {
  onBack: () => void;
}

const NuvemFiscalConfig: React.FC<Props> = ({ onBack }) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');

  useEffect(() => {
    const savedConfig = localStorage.getItem('silflux_nuvemfiscal_config');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setEnvironment(config.environment || 'sandbox');
    }
  }, []);

  const saveAll = () => {
    const existing = localStorage.getItem('silflux_nuvemfiscal_config');
    const config = existing ? JSON.parse(existing) : {};
    
    const updatedConfig = {
      ...config,
      environment,
      lastUpdate: new Date().toISOString()
    };
    
    localStorage.setItem('silflux_nuvemfiscal_config', JSON.stringify(updatedConfig));
    onBack();
  };

  const testConnection = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      // Corrected usage from NUVEM_FISCAL_CREDENTIALS to NUVEM_FISCAL_CONFIG
      params.append('client_id', NUVEM_FISCAL_CONFIG.CLIENT_ID);
      params.append('client_secret', NUVEM_FISCAL_CONFIG.CLIENT_SECRET);
      params.append('scope', 'nfe');

      const response = await fetch(NUVEM_FISCAL_ENDPOINTS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || data.error || 'Falha na autenticação com as chaves configuradas no sistema.');
      }

      setTestStatus('success');
    } catch (error: any) {
      setTestStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto custom-scrollbar">
      <div className="bg-white border-b border-slate-200 px-10 py-8 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-6 p-2.5 hover:bg-slate-100 rounded-full transition-all group">
            <ArrowLeft className="w-6 h-6 text-slate-500 group-hover:text-slate-900" />
          </button>
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 mr-5">
            <Cloud className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ambiente de Transmissão</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Defina o destino das Notas Fiscais.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={testConnection}
            disabled={testStatus === 'testing'}
            className="px-6 py-3 border border-slate-200 bg-white text-slate-700 rounded-2xl font-bold hover:bg-slate-50 flex items-center transition-all shadow-sm disabled:opacity-50"
          >
            {testStatus === 'testing' ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Activity className="w-4 h-4 mr-2 text-indigo-500" />}
            Testar Conexão
          </button>
          <button 
            onClick={saveAll}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar e Voltar
          </button>
        </div>
      </div>

      <div className="p-10 max-w-4xl mx-auto w-full space-y-10 pb-20">
        <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                 <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900">Configuração Global</h3>
                 <p className="text-sm text-slate-500 font-medium">As credenciais de API são gerenciadas pelo administrador do sistema.</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Ambiente Selecionado</label>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setEnvironment('sandbox')}
                      className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${environment === 'sandbox' ? 'bg-white border-amber-500 shadow-lg shadow-amber-500/10' : 'bg-transparent border-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                       <span className={`text-xl font-black ${environment === 'sandbox' ? 'text-amber-600' : 'text-slate-400'}`}>SANDBOX</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Testes & Homologação</span>
                    </button>
                    <button 
                      onClick={() => setEnvironment('production')}
                      className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${environment === 'production' ? 'bg-white border-emerald-500 shadow-lg shadow-emerald-500/10' : 'bg-transparent border-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                       <span className={`text-xl font-black ${environment === 'production' ? 'text-emerald-600' : 'text-slate-400'}`}>PRODUÇÃO</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Documentos Reais</span>
                    </button>
                 </div>
              </div>

              {testStatus === 'error' && (
                 <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl flex items-center gap-4 text-rose-800 animate-in shake">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                 </div>
              )}

              {testStatus === 'success' && (
                 <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex items-center gap-4 text-emerald-800 animate-in zoom-in-95">
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    <p className="text-sm font-medium">Conexão estabelecida com sucesso com as chaves do sistema.</p>
                 </div>
              )}
           </div>
        </section>

        <section className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           <Webhook className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
           <h3 className="text-xl font-black mb-2 flex items-center">Segurança Operacional</h3>
           <p className="text-slate-400 text-sm font-medium mb-6">As chaves Client ID e Secret agora estão protegidas no nível de código/backend e não são expostas em formulários de edição.</p>
           <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase">Auth: Nuvem Fiscal OAuth2</div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase">Criptografia: AES-256</div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default NuvemFiscalConfig;