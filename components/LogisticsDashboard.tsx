import React from 'react';
import { Truck, Package, CheckSquare, Clock, Box } from 'lucide-react';

const LogisticsDashboard: React.FC = () => {
  // Mock Data for Kanban-like board
  const columns = [
    { id: 'todo', title: 'A Separar', icon: CheckSquare, count: 12, color: 'bg-blue-500' },
    { id: 'picking', title: 'Em Separação', icon: Package, count: 3, color: 'bg-yellow-500' },
    { id: 'packing', title: 'Conferência / Embalagem', icon: Box, count: 5, color: 'bg-purple-500' },
    { id: 'done', title: 'Expedido / Coletar', icon: Truck, count: 28, color: 'bg-green-500' },
  ];

  const orders = [
    { id: '#1045', customer: 'Bruno Silva', items: 3, status: 'todo', time: '2h atrás' },
    { id: '#1046', customer: 'Loja do Zé', items: 15, status: 'todo', time: '4h atrás' },
    { id: '#1042', customer: 'Maria Oliveira', items: 2, status: 'picking', operator: 'João', time: '10min' },
    { id: '#1040', customer: 'Tech Corp', items: 8, status: 'packing', operator: 'Ana', time: '30min' },
    { id: '#1039', customer: 'Pedro Santos', items: 1, status: 'done', courier: 'Correios', tracking: 'OJ123BR' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Painel de Expedição</h1>
           <p className="text-sm text-gray-500 mt-1">Gerencie o fluxo de pedidos do pagamento ao envio.</p>
        </div>
        <div className="flex space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Correios: 15h30</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Jadlog: 17h00</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full space-x-6 min-w-max">
          {columns.map((col) => (
            <div key={col.id} className="flex flex-col w-80 bg-gray-100 rounded-xl h-full border border-gray-200">
              <div className="p-4 bg-white rounded-t-xl border-b border-gray-100 flex justify-between items-center">
                 <div className="flex items-center">
                    <div className={`p-1.5 rounded-md mr-2 ${col.color}`}>
                        <col.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-700">{col.title}</h3>
                 </div>
                 <span className="bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-full text-sm">
                     {col.count}
                 </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {orders.filter(o => o.status === col.id).map(order => (
                      <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-indigo-600">{order.id}</span>
                              <span className="text-xs text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" /> {order.time}
                              </span>
                          </div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{order.customer}</h4>
                          <p className="text-xs text-gray-500 mb-3">{order.items} itens</p>
                          
                          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                              {col.id === 'done' ? (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      {order.courier}
                                  </span>
                              ) : (
                                  <span className="text-xs text-gray-400">
                                      {order.operator ? `Op: ${order.operator}` : 'Aguardando...'}
                                  </span>
                              )}
                              <button className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                  Ver
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;