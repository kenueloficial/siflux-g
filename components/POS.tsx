
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Minus, Plus, LogOut, Loader2, CheckCircle } from 'lucide-react';
import { db } from '../databaseService';
import { Product, SalesOrder, FinancialRecord } from '../types';

interface POSProps { onExit: () => void; }

const POS: React.FC<POSProps> = ({ onExit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    db.getAll<Product>('products').then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const addToCart = (p: Product) => {
    const existing = cart.find(i => i.id === p.id);
    if (existing) setCart(cart.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i));
    else setCart([...cart, { ...p, qty: 1 }]);
  };

  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const handleFinish = async () => {
    if (cart.length === 0) return;
    setStatus('processing');
    
    // Gerar Pedido Real
    const order: SalesOrder = {
      id: `POS-${Date.now()}`,
      customerName: 'Consumidor Final',
      status: 'paid',
      total,
      date: new Date().toLocaleDateString()
    };
    await db.put('sales_orders', order);

    // Gerar Financeiro Real
    const finance: FinancialRecord = {
      id: `FIN-${Date.now()}`,
      description: `Venda PDV ${order.id}`,
      entity: 'Consumidor Final',
      dueDate: new Date().toLocaleDateString(),
      amount: total,
      status: 'paid',
      type: 'receivable'
    };
    await db.put('finance', finance);

    // Baixar Estoque Real
    for (const item of cart) {
      const p = products.find(prod => prod.id === item.id);
      if (p) {
        await db.put('products', { ...p, stock: p.stock - item.qty });
      }
    }

    setStatus('success');
    setTimeout(() => {
      setCart([]);
      setStatus('idle');
      // Recarregar estoque local
      db.getAll<Product>('products').then(setProducts);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <div className="flex-1 flex flex-col p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black">Frente de Caixa</h1>
          <button onClick={onExit} className="p-4 bg-white/5 rounded-2xl hover:bg-rose-500 transition-all"><LogOut /></button>
        </div>

        {loading ? <Loader2 className="animate-spin mx-auto" /> : (
          <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {products.map(p => (
              <button 
                key={p.id} 
                onClick={() => addToCart(p)}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:bg-indigo-600 transition-all group"
              >
                <p className="text-xl font-black mb-1">{p.name}</p>
                <p className="text-slate-400 font-bold group-hover:text-white/80">R$ {p.price.toFixed(2)}</p>
                <p className="text-[10px] mt-2 font-bold opacity-50 uppercase">Disponível: {p.stock} un</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-[450px] bg-white text-slate-900 flex flex-col shadow-2xl">
        <div className="p-8 border-b">
          <h2 className="text-2xl font-black flex items-center gap-3">
             <ShoppingCart className="text-indigo-600" /> Carrinho Atual
          </h2>
        </div>

        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-black">{item.name}</p>
                <p className="text-xs text-slate-400">{item.qty}x R$ {item.price.toFixed(2)}</p>
              </div>
              <p className="font-black text-indigo-600">R$ {(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-50 space-y-6">
          <div className="flex justify-between text-3xl font-black">
            <span>Total</span>
            <span className="text-indigo-600">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            disabled={status !== 'idle' || cart.length === 0}
            onClick={handleFinish}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center transition-all ${
              status === 'success' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'
            }`}
          >
            {status === 'idle' && 'Finalizar Venda'}
            {status === 'processing' && <Loader2 className="animate-spin mr-2" />}
            {status === 'success' && <CheckCircle className="mr-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default POS;
