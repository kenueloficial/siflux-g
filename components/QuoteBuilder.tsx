import React, { useState } from 'react';
import { Trash2, Plus, Printer, Mail, FileCheck } from 'lucide-react';
import { QuoteItem } from '../types';

const QuoteBuilder: React.FC = () => {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', productId: '101', description: 'Consultoria de Implantação (Horas)', quantity: 10, unitPrice: 250, discount: 0, total: 2500 }
  ]);

  const addItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      productId: '',
      description: 'Novo Item',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const calculateTotal = () => items.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orçamento #ORC-2025-001</h1>
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            Em Rascunho
          </span>
        </div>
        <div className="flex space-x-2">
           <button className="px-3 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <Printer className="w-4 h-4 mr-2" /> Imprimir
          </button>
          <button className="px-3 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <Mail className="w-4 h-4 mr-2" /> Enviar Email
          </button>
          <button className="px-3 py-2 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 flex items-center">
            <FileCheck className="w-4 h-4 mr-2" /> Aprovar / Converter
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-8 space-y-8">
        
        {/* Client Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Cliente</h3>
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="font-bold text-gray-900">Tech Solutions Ltda</p>
              <p className="text-sm text-gray-600">CNPJ: 12.345.678/0001-99</p>
              <p className="text-sm text-gray-600">Av. Paulista, 1000 - SP</p>
              <p className="text-sm text-gray-600 mt-2">contato@techsolutions.com.br</p>
            </div>
          </div>
          <div>
             <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Detalhes</h3>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs text-gray-500">Data de Emissão</label>
                 <input type="date" className="block w-full border-gray-300 rounded-md text-sm p-1" defaultValue="2025-10-25" />
               </div>
               <div>
                 <label className="block text-xs text-gray-500">Validade</label>
                 <input type="date" className="block w-full border-gray-300 rounded-md text-sm p-1" defaultValue="2025-11-10" />
               </div>
                <div>
                 <label className="block text-xs text-gray-500">Vendedor</label>
                 <select className="block w-full border-gray-300 rounded-md text-sm p-1 bg-white">
                   <option>Carlos Silva</option>
                 </select>
               </div>
                <div>
                 <label className="block text-xs text-gray-500">Condição Pagto</label>
                 <select className="block w-full border-gray-300 rounded-md text-sm p-1 bg-white">
                   <option>30/60 Dias</option>
                   <option>À Vista</option>
                 </select>
               </div>
             </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Descrição / Produto</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">V. Unit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input 
                      type="text" 
                      className="w-full border-0 border-b border-transparent focus:border-indigo-500 focus:ring-0 p-0 text-sm" 
                      value={item.description} 
                      onChange={(e) => {
                         const newItems = items.map(i => i.id === item.id ? {...i, description: e.target.value} : i);
                         setItems(newItems);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    <input type="number" className="w-16 text-right border border-gray-300 rounded p-1" value={item.quantity} onChange={() => {}} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                     <input type="number" className="w-24 text-right border border-gray-300 rounded p-1" value={item.unitPrice} onChange={() => {}} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button onClick={addItem} className="flex items-center text-sm text-indigo-600 font-medium hover:text-indigo-800">
              <Plus className="w-4 h-4 mr-1" /> Adicionar Linha
            </button>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-3">
             <div className="flex justify-between text-sm text-gray-600">
               <span>Subtotal</span>
               <span>{calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
             </div>
             <div className="flex justify-between text-sm text-gray-600">
               <span>Impostos (aprox 10%)</span>
               <span>R$ 250,00</span>
             </div>
              <div className="flex justify-between text-sm text-gray-600">
               <span>Frete</span>
               <span>R$ 0,00</span>
             </div>
             <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
               <span>Total</span>
               <span>{(calculateTotal() + 250).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuoteBuilder;