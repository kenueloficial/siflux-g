
import React from 'react';
import { Save, ArrowLeft, Globe, Key, RefreshCw } from 'lucide-react';

interface Props {
    onBack?: () => void;
}

const IntegrationConfig: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center">
          {onBack && (
              <button onClick={onBack} className="mr-4 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="w-6 h-6" />
              </button>
          )}
          <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow-sm mr-4">
              Sh
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurar Shopify</h1>
            <p className="text-sm text-gray-500 mt-1">E-commerce • Sincronização de pedidos e estoque</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Auth */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Autenticação</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL da Loja</label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                https://
                            </span>
                            <input type="text" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="sualoja.myshopify.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin API Access Token</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key className="h-4 w-4 text-gray-400" />
                            </div>
                            <input type="password" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 border rounded-md py-2" placeholder="shpat_..." />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Você pode gerar este token nas configurações de Apps da Shopify.</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-end">
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                        <RefreshCw className="w-4 h-4 mr-1" /> Testar Conexão
                    </button>
                </div>
            </div>

            {/* Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">Sincronização</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="sync_orders" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="sync_orders" className="font-medium text-gray-700">Importar Pedidos Automaticamente</label>
                            <p className="text-gray-500">Pedidos pagos na Shopify serão criados como Pedidos de Venda no ERP.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="sync_stock" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="sync_stock" className="font-medium text-gray-700">Sincronizar Estoque</label>
                            <p className="text-gray-500">Quando o estoque mudar no ERP, atualizar na Shopify.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default IntegrationConfig;
