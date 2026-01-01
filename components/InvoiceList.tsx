
import React from 'react';
import { FileText, Download, Search, Filter, RefreshCw, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const InvoiceList: React.FC = () => {
  const invoices = [
    { id: '000.001.234', series: '1', customer: 'Tech Solutions Ltda', issued: '25/10/2025', total: 1200.00, status: 'Autorizada' },
    { id: '000.001.233', series: '1', customer: 'Bruno Silva', issued: '24/10/2025', total: 450.90, status: 'Autorizada' },
    { id: '000.001.232', series: '1', customer: 'Loja do Zé', issued: '23/10/2025', total: 3200.00, status: 'Cancelada' },
    { id: '000.001.231', series: '1', customer: 'Maria Oliveira', issued: '23/10/2025', total: 89.90, status: 'Rejeitada' },
  ];

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Autorizada': return <span className="flex items-center text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-100"><CheckCircle className="w-3 h-3 mr-1"/> Autorizada</span>;
          case 'Cancelada': return <span className="flex items-center text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-100"><XCircle className="w-3 h-3 mr-1"/> Cancelada</span>;
          case 'Rejeitada': return <span className="flex items-center text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-orange-100"><AlertCircle className="w-3 h-3 mr-1"/> Rejeitada</span>;
          default: return null;
      }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notas Fiscais Emitidas</h1>
            <p className="text-sm text-gray-500 mt-1">Histórico de NFe e NFS-e transmitidas à SEFAZ.</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm flex items-center text-sm">
              <RefreshCw className="w-4 h-4 mr-2" /> Atualizar Status
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
                placeholder="Buscar por número, cliente ou chave..."
              />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Filter className="w-4 h-4 mr-2" />
               Status
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Série</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destinatário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emissão</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status SEFAZ</th>
                <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{inv.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.series}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inv.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.issued}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                      {inv.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(inv.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-indigo-600 mr-3" title="Baixar XML">
                          <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-indigo-600" title="Baixar PDF">
                          <Download className="w-4 h-4" />
                      </button>
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

export default InvoiceList;
