
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileCode, 
  CheckCircle, 
  Trash2, 
  Calendar,
  Clock
} from 'lucide-react';
import { DigitalCertificate } from '../types';
import CertificateUpload from './CertificateUpload';
import { NUVEM_FISCAL_CONFIG } from '../nuvemfiscal_config';

interface Props {
  onBack: () => void;
}

const CertificateConfig: React.FC<Props> = ({ onBack }) => {
  const [certificate, setCertificate] = useState<DigitalCertificate | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('silflux_nuvemfiscal_config');
    if (saved) {
      const config = JSON.parse(saved);
      if (config.certificate) setCertificate(config.certificate);
    }
  }, []);

  const handleCertificateUploaded = (cert: DigitalCertificate) => {
    setCertificate(cert);
    const saved = localStorage.getItem('silflux_nuvemfiscal_config');
    const config = saved ? JSON.parse(saved) : {};
    config.certificate = cert;
    localStorage.setItem('silflux_nuvemfiscal_config', JSON.stringify(config));
  };

  const removeCertificate = () => {
    if (!confirm('Deseja realmente remover o certificado A1? Isso impedirá a emissão de notas.')) return;
    
    setCertificate(null);
    const saved = localStorage.getItem('silflux_nuvemfiscal_config');
    if (saved) {
      const config = JSON.parse(saved);
      delete config.certificate;
      localStorage.setItem('silflux_nuvemfiscal_config', JSON.stringify(config));
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
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Certificado Digital</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Gerenciamento de Assinatura Eletrônica A1 em modo 
              <span className={`ml-2 px-2 py-0.5 rounded font-black uppercase text-[10px] ${NUVEM_FISCAL_CONFIG.ENVIRONMENT === 'production' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {NUVEM_FISCAL_CONFIG.ENVIRONMENT}
              </span>
            </p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black hover:bg-slate-50 shadow-sm transition-all"
        >
          Voltar ao ERP
        </button>
      </div>

      <div className="p-10 max-w-4xl mx-auto w-full pb-20">
        <div className="grid grid-cols-1 gap-10">
          {certificate ? (
             <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden animate-in zoom-in-95">
                <div className="bg-slate-900 p-12 text-white relative">
                   <ShieldCheck className="absolute top-10 right-10 w-32 h-32 opacity-10 rotate-12" />
                   <div className="flex items-center gap-6 relative z-10">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-indigo-400 border border-white/10">
                         <FileCode className="w-10 h-10" />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black tracking-tight">{certificate.subject}</h2>
                         <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mt-1">CNPJ: {certificate.cnpj}</p>
                      </div>
                   </div>
                </div>
                
                <div className="p-12 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                         <Calendar className="w-6 h-6 text-slate-400" />
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Vencimento</p>
                            <p className="font-bold text-slate-900">{new Date(certificate.expiryDate).toLocaleDateString('pt-BR')}</p>
                         </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                         <Clock className="w-6 h-6 text-slate-400" />
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status do Documento</p>
                            <span className="inline-flex items-center text-emerald-600 font-bold text-sm">
                               <CheckCircle className="w-4 h-4 mr-1.5" /> Válido para Operação
                            </span>
                         </div>
                      </div>
                   </div>

                   <button 
                     onClick={removeCertificate}
                     className="w-full py-5 bg-rose-50 text-rose-600 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all border border-rose-100 flex items-center justify-center"
                   >
                      <Trash2 className="w-5 h-5 mr-3" /> Remover Certificado Instalado
                   </button>
                </div>
             </div>
          ) : (
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
                  Instalar Novo Certificado A1
               </h3>
               <CertificateUpload 
                 onCertificateUploaded={handleCertificateUploaded} 
               />
            </div>
          )}

          <section className="bg-indigo-50 border border-indigo-100 p-10 rounded-[2.5rem]">
             <h4 className="font-black text-indigo-900 mb-2">Orientações de Segurança</h4>
             <p className="text-sm text-indigo-700/80 font-medium leading-relaxed">
                As credenciais da Nuvem Fiscal e o ambiente de transmissão (<strong>{NUVEM_FISCAL_CONFIG.ENVIRONMENT.toUpperCase()}</strong>) são gerenciados no núcleo do sistema. 
                Ao subir o certificado, ele será validado e sincronizado para permitir a assinatura eletrônica dos seus documentos fiscais.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CertificateConfig;
