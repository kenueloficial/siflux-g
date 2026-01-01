
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Settings,
  ShoppingBag,
  Monitor,
  Truck,
  Grid2X2,
  LucideIcon
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

interface MenuItem {
  id: ViewState;
  label: string;
  icon: LucideIcon;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products-list', label: 'Produtos', icon: Package },
    { id: 'purchase-orders', label: 'Pedidos de Compra', icon: ShoppingBag },
    { id: 'receiving', label: 'Entrada de Nota', icon: Truck },
    { id: 'crm-contacts', label: 'Contatos / CRM', icon: Users },
    { id: 'sales-orders', label: 'Pedidos de Venda', icon: ShoppingCart },
    { id: 'pos', label: 'PDV / Caixa', icon: Monitor },
    { id: 'finance-center', label: 'Financeiro', icon: DollarSign },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="w-72 bg-white h-screen flex flex-col border-r border-slate-200 shadow-xl shadow-slate-200/50 z-20 flex-shrink-0">
      <div className="h-20 flex items-center px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-lg">
             <Grid2X2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-900 font-bold text-xl tracking-tight block leading-none">Silflux</span>
            <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">ERP Business</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`w-full group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 mb-1 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 mx-2 mb-2">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
          <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">AD</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">Administrador</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Status: Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
