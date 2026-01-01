
import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, FileCode, AlertTriangle, Lock, ShieldCheck } from 'lucide-react';
import { DigitalCertificate } from '../types';
import { NUVEM_FISCAL_CONFIG, NUVEM_FISCAL_ENDPOINTS } from '../nuvemfiscal_config';

interface Props {
  onCertificateUploaded: (cert: DigitalCertificate) => void;
}

const CertificateUpload: React.FC<Props> = ({ onCertificateUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.pfx') && !selectedFile.name.endsWith('.p12')) {
      setError('Formato inválido. Use apenas arquivos .pfx ou .p12');
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const getOAuthToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', NUVEM_FISCAL_CONFIG.CLIENT_ID);
    params.append('client_secret', NUVEM_FISCAL_CONFIG.CLIENT_SECRET);
    params.append('scope', 'nfe');

    const response = await fetch(NUVEM_FISCAL_ENDPOINTS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    if (!response.ok) throw new Error('Falha na autenticação do sistema (Chaves Inválidas).');
    const data = await response.json();
    return data.access_token;
  };

  const processCertificate = async () => {
    if (!file || !password) return;
    
    setIsValidating(true);
    setError('');

    try {
      // 1. Obter Token
      const token = await getOAuthToken();

      // 2. Ler arquivo e enviar
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = (e.target?.result as string).split(',')[1];
        
        const baseUrl = NUVEM_FISCAL_CONFIG.ENVIRONMENT === 'production' 
          ? NUVEM_FISCAL_ENDPOINTS.production 
          : NUVEM_FISCAL_ENDPOINTS.sandbox;

        try {
          const response = await fetch(`${baseUrl}/certificados`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              arquivo: base64String,
              senha: password
            })
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error?.message || 'Falha ao validar certificado. Verifique a senha ou o arquivo.');
          }

          const newCert: DigitalCertificate = {
            filename: file.name,
            cnpj: data.cnpj || 'CNPJ não identificado',
            expiryDate: data.data_vencimento || '',
            subject: data.nome || data.razao_social || 'Proprietário',
            status: 'valid'
          };

          onCertificateUploaded(newCert);
          
        } catch (apiError: any) {
          setError(apiError.message);
        } finally {
          setIsValidating(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'Falha ao processar operação.');
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-2xl flex items-start animate-in fade-in slide-in-from-top-1">
          <AlertTriangle className="w-4 h-4 mr-3 shrink-0 mt-0.5" /> 
          <span>{error}</span>
        </div>
      )}

      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all cursor-pointer group ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept=".pfx,.p12"
            className="hidden"
          />
          <div className="mx-auto w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          </div>
          <h4 className="text-slate-900 font-black text-lg mb-1">Selecionar Certificado</h4>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Formatos PFX ou P12</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                <FileCode className="w-7 h-7" />
              </div>
              <div>
                <p className="font-black text-slate-900 truncate max-w-[200px]">{file.name}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase">Arquivo de Assinatura</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-full text-slate-400 transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha do Arquivo *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insira a senha do certificado"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-mono text-sm"
                />
              </div>
            </div>
            
            <button
              onClick={processCertificate}
              disabled={!password || isValidating}
              className={`w-full py-5 rounded-2xl font-black flex items-center justify-center transition-all shadow-xl ${
                isValidating 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                  Validando na Nuvem Fiscal...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 mr-3" />
                  Instalar Certificado
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateUpload;
