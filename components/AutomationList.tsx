import React from 'react';
import { Zap, Play, Pause, MoreHorizontal, Plus, ArrowRight } from 'lucide-react';
import { Automation } from '../types';

const AutomationList: React.FC = () => {
  const automations: Automation[] = [
    { id: '1', name: 'Notificar Cliente - Envio', trigger: 'Pedido Enviado', active: true, executions: 1240 },
    { id: '2', name: 'E-mail Carrinho Abandonado', trigger: 'Checkout Incompleto', active: true, executions: 45 },
    { id: '3', name: 'Alerta Estoque Baixo', trigger: 'Estoque < Mínimo', active: false, executions: 0 },
    { id: '4', name: 'Boas Vindas Novos Leads', trigger: 'Novo Contato (CRM)', active: true, executions: 89 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
       <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Automações</h1>
                <p className="text-sm text-gray-500 mt-1">Crie fluxos de trabalho para economizar tempo.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Nova Automação
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 gap-4">
            {automations.map((auto) => (
                <div key={auto.id} className={`bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between transition-all ${auto.active ? 'border-l-4 border-l-indigo-500 border-y-gray-200 border-r-gray-200' : 'border-gray-200 opacity-75'}`}>
                    <div className="flex items-center space-x-6">
                        <div className={`p-3 rounded-full ${auto.active ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{auto.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-700">Gatilho: {auto.trigger}</span>
                                <ArrowRight className="w-4 h-4 mx-2 text-gray-300" />
                                <span>Enviar E-mail</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Execuções (30d)</p>
                            <p className="text-xl font-bold text-gray-900">{auto.executions}</p>
                        </div>
                        
                        <div className="h-8 w-px bg-gray-200"></div>

                        <div className="flex items-center space-x-4">
                            <button className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors ${
                                auto.active 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}>
                                {auto.active ? <><Pause className="w-3 h-3 mr-1"/> Ativo</> : <><Play className="w-3 h-3 mr-1"/> Pausado</>}
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationList;