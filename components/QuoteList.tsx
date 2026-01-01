
import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, Search, Plus, Loader2, X, Trash2 } from 'lucide-react';
import { Quote } from '../types';
import { db } from '../databaseService';

const QuoteList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState<Partial<Quote>>({ customerName: '', total: 0 });

  const loadQuotes = async () => {
    setLoading(true);
    const data = await db.getAll<Quote>('quotes');
    setQuotes(data);
    setLoading(false);
  };

  useEffect(() => { loadQuotes(); }, []);

  const handleSave = async () => {
    if (!newQuote.customerName || !newQuote.total) return alert('Preencha os dados');
    const quote: Quote = {
      id: `ORC-${Date.now()}`,
      customerName: newQuote.customerName,
      total: Number(newQuote.total),
      status: 'draft',
      date: new Date().toLocaleDateString()
    };
    await db.put('quotes', quote);
    setIsModalOpen(false);
    loadQuotes();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Excluir orçamento?')) {
      await db.delete('quotes', id);
      loadQuotes();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 p-10">
            <h2 className="text-2xl font-black mb-6">Novo Orçamento</h2>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Nome do Cliente" 
                className="w-full px-5 py-3 rounded-xl border"
                onChange={e => setNewQuote({...newQuote, customerName: e.target.value})}
              />
              <input 
                type="number" placeholder="Valor Total" 
                className="w-full px-5 py-3 rounded-xl border"
                onChange={e => setNewQuote({...newQuote, total: Number(e.target.value)})}
              />
              <button onClick={handleSave} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black">Gerar Orçamento</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orçamentos</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Novo Orçamento
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {loading ? <Loader2 className="animate-spin mx-auto mt-20" /> : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="min-w-full divide-y">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-bold text-slate-400 uppercase">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-indigo-600">{q.id}</td>
                    <td className="px-6 py-4 font-bold">{q.customerName}</td>
                    <td className="px-6 py-4 text-slate-500">{q.date}</td>
                    <td className="px-6 py-4 font-black">R$ {q.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] font-black uppercase">Rascunho</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => handleDelete(q.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteList;
