import React from 'react';
import { Zap, Plus, ArrowDown, Settings, Trash2, Play } from 'lucide-react';

const AutomationBuilder: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
             <div className="p-2 bg-indigo-100 rounded-lg mr-3 text-indigo-600">
                 <Zap className="w-5 h-5" />
             </div>
             <div>
                 <h1 className="text-lg font-bold text-gray-900">Nova Automação</h1>
                 <p className="text-xs text-gray-500">Workflow visual</p>
             </div>
        </div>
        <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">Cancelar</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
                <Play className="w-3 h-3 mr-2" /> Ativar
            </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-10 bg-slate-100 flex flex-col items-center">
          
          {/* Trigger Block */}
          <div className="w-80 bg-white rounded-xl shadow-md border-l-4 border-indigo-500 p-4 relative group">
              <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 bg-gray-200 rounded-full hover:bg-red-100 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
              </div>
              <div className="text-xs font-bold text-indigo-600 uppercase mb-2 tracking-wider">Gatilho</div>
              <div className="font-bold text-gray-800 mb-1">Pedido de Venda Criado</div>
              <p className="text-xs text-gray-500">Quando um novo pedido entrar no sistema...</p>
              <button className="mt-3 w-full py-1.5 text-xs border border-gray-300 rounded text-gray-600 hover:bg-gray-50 flex items-center justify-center">
                  <Settings className="w-3 h-3 mr-1" /> Configurar
              </button>
          </div>

          {/* Connector */}
          <div className="h-8 w-0.5 bg-gray-300 my-1"></div>
          <div className="p-1 bg-gray-200 rounded-full text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-colors mb-1">
              <Plus className="w-4 h-4" />
          </div>
          <div className="h-8 w-0.5 bg-gray-300 my-1"></div>

          {/* Condition Block */}
          <div className="w-80 bg-white rounded-xl shadow-md border-l-4 border-yellow-500 p-4 relative">
               <div className="text-xs font-bold text-yellow-600 uppercase mb-2 tracking-wider">Condição (Filtro)</div>
               <div className="font-bold text-gray-800 mb-1">Valor {'>'} R$ 500,00</div>
               <p className="text-xs text-gray-500">Se o valor total do pedido for maior que...</p>
          </div>

           {/* Connector */}
          <div className="h-8 w-0.5 bg-gray-300 my-1"></div>
          <ArrowDown className="w-4 h-4 text-gray-300 mb-1" />
          
          {/* Action Block */}
          <div className="w-80 bg-white rounded-xl shadow-md border-l-4 border-green-500 p-4 relative">
               <div className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wider">Ação</div>
               <div className="font-bold text-gray-800 mb-1">Enviar E-mail VIP</div>
               <p className="text-xs text-gray-500">Enviar template "Boas vindas VIP" para o cliente.</p>
          </div>

      </div>
    </div>
  );
};

export default AutomationBuilder;