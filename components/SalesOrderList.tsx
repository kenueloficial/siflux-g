
import React from 'react';
import { ShoppingCart, Package, Check, Truck, AlertCircle, Search, Filter, FileCode, Plus } from 'lucide-react';
import { SalesOrder, ViewState } from '../types';

interface SalesOrderListProps {
  onChangeView?: (view: ViewState) => void;
}

const SalesOrderList: React.FC<SalesOrderListProps> = ({ onChangeView }) => {
  const orders: SalesOrder[] = [
    { id: 'PED-1005', customerName: 'Tech Solutions Ltda', status: 'pending_payment', total: 1200.00, date: '25/10/2025' },
    { id: 'PED-1004', customerName: 'Bruno Silva', status: 'paid', total: 450.90, date: '25/10/2025' },
    { id: 'PED-1003', customerName: 'Maria Oliveira', status: 'picking', total: 89.90, date: '24/10/2025' },
    { id: 'PED-1002', customerName: 'Loja do Zé', status: 'shipped', total: 3200.00, date: '23/10/2025' },
    { id: 'PED-1001', customerName: 'Consultório Dr. Silva', status: 'delivered', total: 150.00, date: '20/10/2025' },
  ];

  const getStatusBadge = (status: SalesOrder['status']) => {
    switch (status) {
      case 'pending_payment':
        return <span className="flex items-center text-yellow-700 bg-yellow-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-yellow-100"><AlertCircle className="w-3 h-3 mr-1"/> Pendente Pgto</span>;
      case 'paid':
        return <span className="flex items-center text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-100"><Check className="w-3 h-3 mr-1"/> Pago / Faturar</span>;
      case 'picking':
        return <span className="flex items-center text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-purple-100"><Package className="w-3 h-3 mr-1"/> Separação</span>;
      case 'shipped':
        return <span className="flex items-center text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-indigo-100"><Truck className="w-3 h-3 mr-1"/> Enviado</span>;
      case 'delivered':
        return <span className="flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-100"><Check className="w-3 h-3 mr-1"/> Entregue</span>;
      default:
        return <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs">Desconhecido</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-10 py-8 flex flex-col gap-6 sticky top-0 z-20 shadow-sm">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Pedidos</h1>
                <p className="text-sm text-slate-500 font-medium">Controle de faturamento e ciclo de entrega.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onChangeView && onChangeView('nfe-emissor')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 flex items-center transition-all text-sm"
              >
                  <FileCode className="w-4 h-4 mr-2" /> Emitir NFe Avulsa
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all text-sm flex items-center">
                  <Plus className="w-4 h-4 mr-2" /> Novo Pedido
              </button>
            </div>
        </div>
        <div className="flex gap-4">
           <div className="relative flex-1 max-w-lg group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3.5 border-none rounded-2xl bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-50 focus:bg-white transition-all text-sm"
                placeholder="Pesquisar pedido, cliente ou valor..."
              />
            </div>
             <button className="px-5 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold flex items-center shadow-sm text-sm hover:bg-slate-50 transition-all">
               <Filter className="w-4 h-4 mr-2 text-slate-500" /> Filtros Avançados
             </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-10 custom-scrollbar">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Código</th>
                <th className="px-8 py-5">Cliente</th>
                <th className="px-8 py-5">Emissão</th>
                <th className="px-8 py-5 text-right">Total Pedido</th>
                <th className="px-8 py-5 text-center">Status Operacional</th>
                <th className="px-8 py-5 text-center">Fiscal</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-black text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-900 font-bold">
                    {order.customerName}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-xs text-slate-500 font-medium">
                    {order.date}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-900 font-black text-right">
                    {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    {order.status === 'paid' ? (
                       <button 
                        onClick={() => onChangeView && onChangeView('nfe-emissor')}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100"
                        title="Emitir NFe para este pedido"
                       >
                         <FileCode className="w-4 h-4" />
                       </button>
                    ) : (
                       <span className="text-[10px] font-black text-slate-300 uppercase">Aguardando</span>
                    )}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-all font-bold text-xs uppercase tracking-widest p-2">Gerenciar</button>
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

export default SalesOrderList;
