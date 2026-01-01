
import React, { useState } from 'react';
import { Save, Plus, Trash2, Mail } from 'lucide-react';

const PurchaseOrderForm: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, product: 'Tecido Algodão Cru', qtd: 100, unit: 'KG', cost: 15.50, total: 1550.00 },
  ]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Pedido de Compra</h1>
          <p className="text-sm text-gray-500 mt-1">Cotação e solicitação para fornecedores.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancelar</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar Pedido
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Header Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor</label>
                      <select className="block w-full rounded-md border-gray-300 border shadow-sm p-2 bg-white">
                          <option>Indústria de Tecidos ABC Ltda</option>
                          <option>Fornecedor XYZ</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Entrega</label>
                      <input type="date" className="block w-full rounded-md border-gray-300 border shadow-sm p-2" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Condição de Pagamento</label>
                      <input type="text" className="block w-full rounded-md border-gray-300 border shadow-sm p-2" placeholder="Ex: 30/60 Dias" />
                  </div>
              </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700">Itens do Pedido</h3>
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                      <Plus className="w-4 h-4 mr-1" /> Adicionar Produto
                  </button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qtd</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Unidade</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Custo Unit.</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-6 py-3"></th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                      {items.map(item => (
                          <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <input type="number" className="w-20 text-right border rounded p-1 border-gray-300" defaultValue={item.qtd} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.unit}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <input type="number" className="w-24 text-right border rounded p-1 border-gray-300" defaultValue={item.cost} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                                  R$ {item.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <button className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                  <div className="w-64 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                          <span>Subtotal</span>
                          <span>R$ 1.550,00</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                          <span>Frete</span>
                          <input type="text" className="w-20 text-right border rounded p-0.5 text-sm" placeholder="0,00" />
                      </div>
                      <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>R$ 1.550,00</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
