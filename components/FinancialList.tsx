import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Filter, Search, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { FinancialRecord } from '../types';

interface FinancialListProps {
  type: 'payable' | 'receivable';
}

const FinancialList: React.FC<FinancialListProps> = ({ type }) => {
  const isReceivable = type === 'receivable';
  
  // Mock Data
  const records: FinancialRecord[] = isReceivable ? [
    { id: 'REC-001', description: 'Fatura #1005 - Pedido Venda', entity: 'Tech Solutions', dueDate: '25/10/2025', amount: 1200.00, status: 'open', type: 'receivable' },
    { id: 'REC-002', description: 'Mensalidade Contrato #55', entity: 'Consultório Dr. Silva', dueDate: '20/10/2025', amount: 450.00, status: 'overdue', type: 'receivable' },
    { id: 'REC-003', description: 'Venda Balcão', entity: 'Consumidor Final', dueDate: '25/10/2025', amount: 89.90, status: 'paid', type: 'receivable' },
  ] : [
    { id: 'PAG-001', description: 'Fatura Fornecedor ABC', entity: 'Indústria Têxtil SA', dueDate: '30/10/2025', amount: 5400.00, status: 'open', type: 'payable' },
    { id: 'PAG-002', description: 'Aluguel Escritório', entity: 'Imobiliária Central', dueDate: '05/11/2025', amount: 3200.00, status: 'open', type: 'payable' },
    { id: 'PAG-003', description: 'Conta de Luz', entity: 'Enel', dueDate: '15/10/2025', amount: 450.00, status: 'paid', type: 'payable' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open': return <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-100">Aberto</span>;
      case 'paid': return <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-100">Pago</span>;
      case 'overdue': return <span className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium border border-red-100">Vencido</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${isReceivable ? 'bg-green-100' : 'bg-red-100'}`}>
                    {isReceivable ? <ArrowUpRight className="w-6 h-6 text-green-600" /> : <ArrowDownRight className="w-6 h-6 text-red-600" />}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{isReceivable ? 'Contas a Receber' : 'Contas a Pagar'}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isReceivable ? 'Gerencie seus recebimentos e cobranças.' : 'Gerencie seus compromissos financeiros.'}
                    </p>
                </div>
            </div>
            <button className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm flex items-center transition-colors ${isReceivable ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                {isReceivable ? 'Nova Receita' : 'Nova Despesa'}
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
                placeholder="Buscar lançamento..."
              />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Filter className="w-4 h-4 mr-2" />
               Filtrar Vencimento
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{isReceivable ? 'Cliente' : 'Fornecedor'}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm font-medium text-gray-900">{record.description}</div>
                     <div className="text-xs text-gray-500">{record.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.entity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.dueDate}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${isReceivable ? 'text-green-600' : 'text-red-600'}`}>
                    {record.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     {record.status === 'open' && (
                        <button className="text-green-600 hover:text-green-900 mr-3 flex items-center inline-flex">
                            <CheckCircle className="w-4 h-4 mr-1" /> Baixar
                        </button>
                     )}
                     {isReceivable && (
                         <button className="text-gray-400 hover:text-gray-600">
                             <FileText className="w-4 h-4" />
                         </button>
                     )}
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

export default FinancialList;