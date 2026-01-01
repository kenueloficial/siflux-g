
import React from 'react';
import { Search, Check, Cloud } from 'lucide-react';
import { ViewState } from '../types';

interface Props {
  onChangeView: (view: ViewState) => void;
}

const IntegrationMarketplace: React.FC<Props> = ({ onChangeView }) => {
  const integrations = [
    { id: 'nuvem-fiscal', name: 'Nuvem Fiscal', category: 'Fiscal / NFe', description: 'Emissão de NF-e, NFS-e e CT-e com mensageria automática.', color: 'bg-blue-600', installed: true, icon: Cloud },
    { id: 'mercado-pago', name: 'Mercado Pago', category: 'Pagamentos', description: 'Receba pagamentos via PIX, Cartão e Boleto.', color: 'bg-blue-500', installed: true },
    { id: 'correios', name: 'Correios', category: 'Logística', description: 'Cálculo de frete e geração de etiquetas SEDEX/PAC.', color: 'bg-yellow-500', installed: true },
    { id: 'shopify', name: 'Shopify', category: 'E-commerce', description: 'Sincronize produtos e pedidos da sua loja virtual.', color: 'bg-green-500', installed: false },
    { id: 'whatsapp', name: 'WhatsApp API', category: 'Comunicação', description: 'Envie notificações automáticas de status de pedido.', color: 'bg-green-600', installed: false },
    { id: 'google-drive', name: 'Google Drive', category: 'Arquivos', description: 'Salva backup de notas fiscais automaticamente.', color: 'bg-blue-600', installed: false },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
         <h1 className="text-2xl font-bold text-gray-900">Integrações</h1>
         <p className="text-sm text-gray-500 mt-1">Conecte o Silflux às ferramentas que você já usa.</p>
         <div className="mt-4 relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Buscar integração..."
              />
         </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((app) => (
                  <div 
                    key={app.id} 
                    onClick={() => app.id === 'nuvem-fiscal' ? onChangeView('nuvem-fiscal-config') : onChangeView('integration-config')}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                              {app.icon ? <app.icon className="w-6 h-6" /> : app.name.substring(0, 2)}
                          </div>
                          {app.installed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="w-3 h-3 mr-1" /> Instalado
                              </span>
                          ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200">
                                  Disponível
                              </span>
                          )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{app.name}</h3>
                      <span className="text-xs text-indigo-600 font-medium mb-2">{app.category}</span>
                      <p className="text-sm text-gray-500 flex-1">{app.description}</p>
                      <button className={`mt-4 w-full py-2 rounded-lg text-sm font-medium border ${
                          app.installed 
                          ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                          : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      }`}>
                          {app.installed ? 'Configurar' : 'Conectar'}
                      </button>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default IntegrationMarketplace;
