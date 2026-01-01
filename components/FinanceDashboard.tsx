import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Filter, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FinanceDashboard: React.FC = () => {
  const data = [
    { name: 'Dia 1', entrada: 4000, saida: 2400 },
    { name: 'Dia 5', entrada: 3000, saida: 1398 },
    { name: 'Dia 10', entrada: 2000, saida: 9800 },
    { name: 'Dia 15', entrada: 2780, saida: 3908 },
    { name: 'Dia 20', entrada: 1890, saida: 4800 },
    { name: 'Dia 25', entrada: 2390, saida: 3800 },
    { name: 'Dia 30', entrada: 3490, saida: 4300 },
  ];

  const transactions = [
    { id: 1, desc: 'Venda #1002 - Tech Solutions', date: 'Hoje, 14:30', type: 'in', value: 1500.00, status: 'Confirmado' },
    { id: 2, desc: 'Pgto Aluguel Escritório', date: 'Ontem, 09:00', type: 'out', value: -3200.00, status: 'Agendado' },
    { id: 3, desc: 'Venda #1001 - Cliente Balcão', date: '23/10', type: 'in', value: 250.00, status: 'Confirmado' },
    { id: 4, desc: 'Compra Fornecedor ABC', date: '22/10', type: 'out', value: -1200.50, status: 'Pago' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fluxo de Caixa</h1>
            <p className="text-sm text-gray-500 mt-1">Visão consolidada das finanças da empresa.</p>
          </div>
          <div className="flex space-x-3">
             <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Calendar className="w-4 h-4 mr-2" />
               Este Mês
             </button>
             <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center shadow-sm text-sm">
               <Filter className="w-4 h-4 mr-2" />
               Filtros
             </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ArrowUpRight className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
             </div>
             <p className="text-gray-500 text-sm font-medium">Total Receitas</p>
             <h3 className="text-2xl font-bold text-gray-900">R$ 45.231,89</h3>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ArrowDownRight className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">+2.1%</span>
             </div>
             <p className="text-gray-500 text-sm font-medium">Total Despesas</p>
             <h3 className="text-2xl font-bold text-gray-900">R$ 32.050,00</h3>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
             </div>
             <p className="text-gray-500 text-sm font-medium">Saldo em Caixa</p>
             <h3 className="text-2xl font-bold text-indigo-900">R$ 13.181,89</h3>
           </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Evolução Diária</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <Tooltip />
              <Area type="monotone" dataKey="entrada" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEntrada)" />
              <Area type="monotone" dataKey="saida" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSaida)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Últimos Lançamentos</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    <Download className="w-4 h-4 mr-1" /> Exportar
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-50">
                    {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-40">{t.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.desc}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                                <span className={t.type === 'in' ? 'text-green-600' : 'text-red-600'}>
                                    {t.value > 0 ? '+' : ''} {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {t.status}
                                </span>
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

export default FinanceDashboard;