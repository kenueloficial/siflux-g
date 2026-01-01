
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreVertical, Download, X, Save, Upload, Tag, Box, DollarSign, Loader2, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { db } from '../databaseService';

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', sku: '', price: 0, stock: 0, category: 'Geral', status: 'active', type: 'physical'
  });

  const loadProducts = async () => {
    setLoading(true);
    const data = await db.getAll<Product>('products');
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async () => {
    if (!newProduct.name || !newProduct.sku) return alert('Preencha os campos obrigatórios');
    const product: Product = {
      ...newProduct as Product,
      id: Date.now().toString()
    };
    await db.put('products', product);
    setIsModalOpen(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este produto?')) {
      await db.delete('products', id);
      loadProducts();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black">Novo Produto</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="p-10 space-y-6">
              <input 
                type="text" placeholder="Nome do Produto" 
                className="w-full px-5 py-3 rounded-xl border"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="SKU" className="w-full px-5 py-3 rounded-xl border"
                  value={newProduct.sku}
                  onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                />
                <input 
                  type="number" placeholder="Preço" className="w-full px-5 py-3 rounded-xl border"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
              </div>
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black shadow-lg shadow-indigo-100"
              >
                Salvar no Banco de Dados
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">Persistência real via IndexedDB.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600 w-10 h-10" /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-bold text-slate-400 uppercase">
                  <th className="px-6 py-4">Produto</th>
                  <th className="px-6 py-4">Estoque</th>
                  <th className="px-6 py-4">Preço</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold">{p.name} <span className="block text-[10px] text-slate-400">{p.sku}</span></td>
                    <td className="px-6 py-4">{p.stock} un</td>
                    <td className="px-6 py-4 font-black">R$ {p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-black uppercase">Ativo</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => handleDelete(p.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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

export default ProductList;
