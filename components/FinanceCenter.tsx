
import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  FileText, 
  Plus, 
  Download, 
  TrendingUp,
  Loader2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { db } from '../databaseService';
import { FinancialRecord } from '../types';

const FinanceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'receivables' | 'payables'>('dashboard');
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFinance = async () => {
    setLoading(true);
    const data = await db.getAll<FinancialRecord>('finance');
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => { loadFinance(); }, []);

  const totalIn = records.filter(r => r.type === 'receivable').reduce((acc, r) => acc + r.amount, 0);
  const totalOut = records.filter(r => r.type === 'payable').reduce((acc, r) => acc + r.amount, 0);

  const tabs = [
    { id: 'dashboard', label: 'Fluxo de Caixa', icon: TrendingUp },
    { id: 'receivables', label: 'Contas a Receber', icon: ArrowUpRight },
    { id: 'payables', label: 'Contas a Pagar', icon: ArrowDownRight },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-8 pt-6 shadow-sm z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Centro Financeiro</h1>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-extrabold shadow-lg hover:bg-indigo-700 transition-all flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Novo Lançamento
          </button>
        </div>
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-1 flex items-center text-sm font-bold transition-all border-b-2 ${
                activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {loading ? <Loader2 className="animate-spin mx-auto mt-20" /> : (
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl border shadow-sm">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-2">Saldo Consolidado</p>
                     <h3 className="text-3xl font-black text-indigo-600">R$ {(totalIn - totalOut).toFixed(2)}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border shadow-sm">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-2">Receitas Reais</p>
                     <h3 className="text-3xl font-black text-emerald-500">R$ {totalIn.toFixed(2)}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border shadow-sm">
                     <p className="text-xs font-bold text-slate-400 uppercase mb-2">Despesas Reais</p>
                     <h3 className="text-3xl font-black text-rose-500">R$ {totalOut.toFixed(2)}</h3>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border shadow-sm h-80">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[{name: 'Base', val: 0}, {name: 'Atual', val: totalIn}]}>
                        <Area type="monotone" dataKey="val" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <Tooltip />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
              </>
            )}

            {(activeTab === 'receivables' || activeTab === 'payables') && (
               <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-[10px] font-black text-slate-400 uppercase">
                        <th className="px-8 py-4">Data</th>
                        <th className="px-8 py-4">Descrição</th>
                        <th className="px-8 py-4">Entidade</th>
                        <th className="px-8 py-4 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {records
                        .filter(r => activeTab === 'receivables' ? r.type === 'receivable' : r.type === 'payable')
                        .map(r => (
                          <tr key={r.id} className="hover:bg-slate-50">
                            <td className="px-8 py-4 text-sm">{r.dueDate}</td>
                            <td className="px-8 py-4 text-sm font-bold">{r.description}</td>
                            <td className="px-8 py-4 text-sm">{r.entity}</td>
                            <td className={`px-8 py-4 text-sm font-black text-right ${r.type === 'receivable' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              R$ {r.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceCenter;
