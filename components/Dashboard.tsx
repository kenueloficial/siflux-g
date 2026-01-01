
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Bell, Search, Loader2 } from 'lucide-react';
import { db } from '../databaseService';
import { Product, SalesOrder, FinancialRecord } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, stockCritical: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const products = await db.getAll<Product>('products');
      const orders = await db.getAll<SalesOrder>('sales_orders');
      
      const revenue = orders.reduce((acc, o) => acc + o.total, 0);
      const critical = products.filter(p => p.stock < 5).length;
      
      setStats({ revenue, orders: orders.length, stockCritical: critical });
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Realtime</h1>
        <div className="text-xs bg-indigo-50 text-indigo-600 font-black px-4 py-2 rounded-xl">Conectado: IndexedDB Local</div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <DollarSign className="text-emerald-500 mb-4" />
            <p className="text-xs font-bold text-slate-400 uppercase">Receita Bruta</p>
            <h2 className="text-3xl font-black">R$ {stats.revenue.toLocaleString('pt-BR')}</h2>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <ShoppingCart className="text-indigo-500 mb-4" />
            <p className="text-xs font-bold text-slate-400 uppercase">Total Pedidos</p>
            <h2 className="text-3xl font-black">{stats.orders}</h2>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <Package className="text-rose-500 mb-4" />
            <p className="text-xs font-bold text-slate-400 uppercase">Estoque Crítico</p>
            <h2 className="text-3xl font-black">{stats.stockCritical} <span className="text-xs font-medium text-slate-400">itens {'<'} 5 un</span></h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm">
           <h3 className="font-bold mb-6 text-slate-700">Fluxo de Caixa Consolidado</h3>
           <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{name: 'Hoje', val: stats.revenue}, {name: 'Projeção', val: stats.revenue * 1.2}]}>
                  <Area type="monotone" dataKey="val" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
