import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Coffee, 
  Utensils, 
  IceCream, 
  Apple,
  ChevronLeft,
  CreditCard
} from 'lucide-react';

interface SelfServiceProps {
    onExit: () => void;
}

const SelfService: React.FC<SelfServiceProps> = ({ onExit }) => {
  const [activeCategory, setActiveCategory] = useState('Cafés');
  const [cart, setCart] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const products = [
    { id: 1, name: 'Espresso Intenso', price: 8.00, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80', desc: 'Grãos selecionados, torra escura.' },
    { id: 2, name: 'Cold Brew', price: 12.00, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80', desc: 'Infusão a frio por 18h.' },
    { id: 3, name: 'Latte Canela', price: 14.50, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', desc: 'Espresso, leite vaporizado e canela.' },
    { id: 4, name: 'Capuchino', price: 10.00, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80', desc: 'Clássico italiano cremoso.' },
    { id: 5, name: 'Mocha Branco', price: 16.00, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80', desc: 'Chocolate branco suíço.' },
    { id: 6, name: 'Latte Avelã', price: 15.50, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80', desc: 'Toque de xarope de avelã.' },
  ];

  const categories = [
    { id: 'Cafés', icon: Coffee },
    { id: 'Sobremesas', icon: IceCream },
    { id: 'Lanches', icon: Apple },
    { id: 'Refeições', icon: Utensils },
    { id: 'Sucos', icon: Apple },
    { id: 'Chás', icon: Coffee },
  ];

  const sizes = [
    { label: 'Pequeno', icon: 'P' },
    { label: 'Médio', icon: 'M' },
    { label: 'Grande', icon: 'G' },
  ];

  const addToCart = (product: any) => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
          setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item));
      } else {
          setCart([...cart, { ...product, qty: 1 }]);
      }
  };

  const updateQty = (id: number, delta: number) => {
      setCart(cart.map(item => {
          if (item.id === id) {
              return { ...item, qty: Math.max(0, item.qty + delta) };
          }
          return item;
      }).filter(item => item.qty > 0));
  };

  const calculateTotal = () => {
      return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  if (showPayment) {
      return (
          <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-10">
              <div className="bg-white text-slate-900 p-12 rounded-3xl max-w-md w-full text-center shadow-2xl">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Pagamento</h2>
                  <p className="text-slate-500 mb-8">Aproxime seu cartão ou celular da maquininha.</p>
                  <div className="text-4xl font-extrabold text-slate-900 mb-8">
                      R$ {calculateTotal().toFixed(2)}
                  </div>
                  <div className="animate-pulse text-sm font-bold text-indigo-600 mb-8">Aguardando processamento...</div>
                  <button 
                    onClick={() => setShowPayment(false)}
                    className="w-full py-4 rounded-xl border border-slate-200 font-bold text-slate-500 hover:bg-slate-50"
                  >
                      Cancelar
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* Sidebar (Dark) */}
      <div className="w-32 bg-[#111827] flex flex-col items-center py-8 space-y-4 flex-shrink-0 shadow-2xl z-10">
          <div 
            onClick={onExit}
            className="text-white/50 hover:text-white mb-4 cursor-pointer transition-colors"
          >
              <ChevronLeft className="w-8 h-8" />
          </div>
          
          <div className="flex flex-col space-y-4 flex-1 w-full px-4 overflow-y-auto no-scrollbar">
              {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 ${activeCategory === cat.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105' : 'bg-[#1f2937] text-slate-400 hover:bg-[#374151] hover:text-white'}`}
                  >
                      <cat.icon className="w-8 h-8 mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{cat.id}</span>
                  </button>
              ))}
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="px-10 py-8 flex justify-between items-end bg-slate-100">
              <div className="flex-1">
                   <h2 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Bem-vindo ao Nexus Café</h2>
                   <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">O que deseja pedir hoje?</h1>
              </div>
              
              <div className="relative group w-96">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                   <input 
                    type="text" 
                    placeholder="Buscar produtos..." 
                    className="w-full pl-14 pr-4 py-4 rounded-2xl border-none bg-white shadow-sm text-lg placeholder-slate-400 focus:ring-4 focus:ring-orange-500/20 focus:shadow-md transition-all"
                   />
               </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                      <div key={product.id} onClick={() => addToCart(product)} className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-white relative group hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                          <div className="relative mb-5 rounded-[2rem] overflow-hidden h-64 w-full shadow-inner">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-orange-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                  <Plus className="w-6 h-6" />
                              </div>
                          </div>
                          
                          <div className="px-2">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{product.name}</h3>
                                  <span className="text-xl font-bold text-orange-600">R$ {product.price.toFixed(2)}</span>
                              </div>
                              <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">{product.desc}</p>

                              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                                  {sizes.map(size => (
                                      <button key={size.label} className="flex flex-col items-center justify-center w-10 h-10 rounded-full border-2 border-slate-100 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 text-xs font-bold text-slate-400 transition-all">
                                          <span>{size.icon}</span>
                                      </button>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Cart Panel (Right) */}
      <div className="w-[450px] bg-white h-full flex flex-col shadow-2xl z-20 flex-shrink-0 border-l border-slate-100">
          <div className="p-8 border-b border-slate-100 bg-white">
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-3 text-orange-500" />
                  Seu Pedido
              </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                      <ShoppingBag className="w-16 h-16 mb-4" />
                      <p className="text-lg font-medium">Seu carrinho está vazio</p>
                  </div>
              ) : (
                  cart.map((item) => (
                      <div key={item.id} className="flex items-center group bg-slate-50 p-4 rounded-3xl border border-transparent hover:border-orange-100 transition-colors">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 ml-4">
                              <h4 className="text-base font-bold text-slate-900 leading-tight">{item.name}</h4>
                              <p className="text-sm text-orange-600 font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex flex-col items-center space-y-2 ml-2">
                              <button 
                                 onClick={() => updateQty(item.id, 1)}
                                 className="w-8 h-8 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors shadow-sm"
                              >
                                  <Plus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-bold">{item.qty}</span>
                              <button 
                                 onClick={() => updateQty(item.id, -1)}
                                 className="w-8 h-8 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors shadow-sm"
                              >
                                  <Minus className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  ))
              )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base font-medium text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900">R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-dashed border-slate-300 pt-4 mt-2 flex justify-between text-2xl font-extrabold text-slate-900">
                      <span>Total</span>
                      <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
              </div>

              <button 
                disabled={cart.length === 0}
                onClick={() => setShowPayment(true)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-slate-900/20 hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  Finalizar Pedido
                  <CreditCard className="w-6 h-6 ml-3" />
              </button>
          </div>
      </div>

    </div>
  );
};

export default SelfService;