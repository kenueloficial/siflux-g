
import React from 'react';
import { Search, Calendar, ClipboardList, Plus, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface Props {
    onChangeView?: (view: ViewState) => void;
}

const InventoryList: React.FC<Props> = ({ onChangeView }) => {
  const inventories = [
    { id: 'INV-10/25', name: 'Contagem Cíclica - Curva A', date: '25/10/2025', status: 'Em Contagem', responsible: 'Carlos Silva', progress: 45 },
    { id: 'INV-09/25', name: 'Inventário Geral Mensal', date: '30/09/2025', status: 'Finalizado', responsible: 'Ana Souza', progress: 100 },
    { id: 'INV-08/25', name: 'Contagem Setor Eletrônicos', date: '15/08/2025', status: 'Finalizado', responsible: 'Carlos Silva', progress: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventário de Estoque</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie contagens físicas e ajustes de estoque.</p>
          </div>
          <button 
            onClick={() => onChangeView && onChangeView('inventory-create')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Inventário
          </button>
        </div>

        <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Buscar inventário..."
            />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 gap-4">
            {inventories.map((inv) => (
                <div key={inv.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{inv.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Calendar className="w-4 h-4 mr-1" /> {inv.date}
                                    <span className="mx-2">•</span>
                                    Responsável: {inv.responsible}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            <div className="w-48">
                                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                                    <span>Progresso</span>
                                    <span>{inv.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${inv.status === 'Finalizado' ? 'bg-green-500' : 'bg-indigo-500'}`} 
                                        style={{ width: `${inv.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="text-right min-w-[100px]">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    inv.status === 'Finalizado' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {inv.status}
                                </span>
                            </div>

                            <button 
                                onClick={() => onChangeView && onChangeView('inventory-create')}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                            >
                                <ArrowRight className="w-5 h-5" />
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

export default InventoryList;
