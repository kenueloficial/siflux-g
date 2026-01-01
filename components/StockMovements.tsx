import React from 'react';
import { ArrowUp, ArrowDown, RefreshCw, ArrowRight, Search, Filter, Calendar } from 'lucide-react';
import { StockMovement } from '../types';

const StockMovements: React.FC = () => {
  const movements: StockMovement[] = [
    { id: 'MOV-001', date: '25/10/2025 14:30', type: 'entry', documentRef: 'NFe #500', quantity: 100, balance: 150, user: 'João Silva' },
    { id: 'MOV-002', date: '25/10/2025 15:45', type: 'exit', documentRef: 'Ped. #1002', quantity: -2, balance: 148, user: 'Sistema' },
    { id: 'MOV-003', date: '24/10/2025 09:00', type: 'adjustment', documentRef: 'Inv. Mensal', quantity: -5, balance: 50, user: 'Maria Costa' },
    { id: 'MOV-004', date: '23/10/2025 11:20', type: 'transfer', documentRef: 'Transf. Dep. A->B', quantity: -20, balance: 55, user: 'Pedro' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entry': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'exit': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'adjustment': return <RefreshCw className="w-4 h-4 text-orange-600" />;
      case 'transfer': return <ArrowRight className="w-4 h-4 text-blue-600" />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'entry': return 'Entrada';
      case 'exit': return 'Saída';
      case 'adjustment': return 'Ajuste';
      case 'transfer': return 'Transferência';
      default: return type;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Movimentações de Estoque (Kardex)</h1>
            <p className="text-sm text-gray-500 mt-1">Histórico completo de entradas e saídas.</p>
          </div>
          <div className="flex space-x-2">
             <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Calendar className="w-4 h-4 mr-2" />
               Outubro 2025
             </button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center shadow-sm text-sm">
               Exportar Relatório
             </button>
          </div>
        </div>

        <div className="flex space-x-4">
           <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Filtrar por produto ou documento..."
              />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Filter className="w-4 h-4 mr-2" />
               Tipo de Movimento
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd.</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.map((move) => (
                <tr key={move.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{move.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <span className="mr-2 bg-gray-100 p-1 rounded">{getTypeIcon(move.type)}</span>
                      {getTypeLabel(move.type)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium cursor-pointer hover:underline">
                    {move.documentRef}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${move.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {move.quantity > 0 ? '+' : ''}{move.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    {move.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {move.user}
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

export default StockMovements;