
import React from 'react';
import { Save, Search, AlertTriangle, Check, X } from 'lucide-react';

const InventoryCount: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executando: Contagem Cíclica - Curva A</h1>
          <p className="text-sm text-gray-500 mt-1">Depósito Principal • Iniciado em 25/10/2025</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Pausar</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center shadow-sm">
            <Check className="w-4 h-4 mr-2" />
            Finalizar e Ajustar
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex space-x-4">
         <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Bipar produto..."
              autoFocus
            />
         </div>
         <div className="flex items-center space-x-2 text-sm text-gray-600">
             <input type="checkbox" id="blind" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked readOnly />
             <label htmlFor="blind">Contagem Cega (Ocultar Saldo Sistema)</label>
         </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto / SKU</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo Sistema</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Contagem</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Diferença</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-indigo-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">A-05</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">Camiseta Algodão Premium</div>
                    <div className="text-xs text-gray-500">CAM-001-AZ-P</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-400">***</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input type="number" className="w-20 text-center border border-indigo-300 rounded-md py-1 focus:ring-2 focus:ring-indigo-500 font-bold" defaultValue={148} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-red-600">
                   -2
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Divergente
                    </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">B-12</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Tênis Esportivo X</div>
                    <div className="text-xs text-gray-500">TEN-023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-400">***</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input type="number" className="w-20 text-center border border-gray-300 rounded-md py-1" placeholder="0" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">Pendente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryCount;
