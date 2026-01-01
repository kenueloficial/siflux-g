import React from 'react';
import { MoreHorizontal, Plus, Calendar, DollarSign } from 'lucide-react';
import { Opportunity } from '../types';

const Pipeline: React.FC = () => {
  // Mock Data
  const stages = [
    { id: 'prospect', title: 'Prospecção', color: 'border-t-blue-500' },
    { id: 'qualification', title: 'Qualificação', color: 'border-t-yellow-500' },
    { id: 'proposal', title: 'Proposta Enviada', color: 'border-t-purple-500' },
    { id: 'negotiation', title: 'Negociação', color: 'border-t-orange-500' },
    { id: 'won', title: 'Fechado Ganho', color: 'border-t-green-500' },
  ];

  const opportunities: Opportunity[] = [
    { id: '1', title: 'Implantação ERP', company: 'Tech Solutions', value: 15000, stage: 'prospect', owner: 'Ana' },
    { id: '2', title: 'App Delivery', company: 'Burger King', value: 45000, stage: 'qualification', owner: 'Carlos' },
    { id: '3', title: 'Consultoria Cloud', company: 'Amazon', value: 12000, stage: 'proposal', owner: 'Ana' },
    { id: '4', title: 'Website Institucional', company: 'Advocacia Lima', value: 5000, stage: 'negotiation', owner: 'Carlos' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline de Vendas</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Oportunidade
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-100 p-6">
        <div className="flex h-full space-x-4">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col w-80 bg-gray-100 rounded-lg h-full max-h-full">
              {/* Column Header */}
              <div className={`p-3 bg-white rounded-t-lg border-t-4 shadow-sm ${stage.color} mb-2 flex justify-between items-center`}>
                <h3 className="font-semibold text-gray-700">{stage.title}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {opportunities.filter(op => op.stage === stage.id).length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                {opportunities
                  .filter((op) => op.stage === stage.id)
                  .map((op) => (
                    <div key={op.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {op.company}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{op.title}</h4>
                      
                      <div className="flex items-center text-gray-500 text-sm mt-3">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{op.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 border-t pt-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          12 Out
                        </div>
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white">
                          {op.owner.charAt(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-sm hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-1" /> Adicionar
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;