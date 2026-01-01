import React from 'react';
import { Plus, Search, Filter, ShoppingBag } from 'lucide-react';

const PurchaseOrderList: React.FC = () => {
  const orders = [
    { id: 'PC-1001', supplier: 'Fornecedor A', date: '20/10/2025', delivery: '25/10/2025', value: 5400.00, status: 'Aguardando Aprovação' },
    { id: 'PC-1002', supplier: 'Tech Parts Ltd', date: '22/10/2025', delivery: '30/10/2025', value: 12300.50, status: 'Enviado' },
    { id: 'PC-1003', supplier: 'Embalagens Sul', date: '24/10/2025', delivery: '26/10/2025', value: 890.00, status: 'Recebido Parcialmente' },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes('Aguardando')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('Enviado')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Recebido')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Pedidos de Compra</h1>
                <p className="text-sm text-gray-500 mt-1">Gerencie aquisições e relacionamento com fornecedores.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
            </button>
        </div>
        
         <div className="flex space-x-4">
           <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Buscar pedido ou fornecedor..."
              />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Filter className="w-4 h-4 mr-2" />
               Filtrar Status
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Pedido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emissão</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrega Prev.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.delivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {order.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <button className="text-indigo-600 hover:text-indigo-900">Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderList;