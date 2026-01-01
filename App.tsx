
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import PurchaseOrderList from './components/PurchaseOrderList';
import ReceivingForm from './components/ReceivingForm';
import ContactList from './components/ContactList';
import SalesOrderList from './components/SalesOrderList';
import FinanceCenter from './components/FinanceCenter';
import Settings from './components/Settings';
import POS from './components/POS';
import AIChatWidget from './components/AIChatWidget';
import CertificateConfig from './components/CertificateConfig';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import IntegrationMarketplace from './components/IntegrationMarketplace';
import IntegrationConfig from './components/IntegrationConfig';
import { ViewState } from './types';
import { db } from './databaseService';
import { Sparkles, X, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    db.init().then(() => {
      db.seedIfEmpty().then(() => setDbReady(true));
    });
  }, []);

  const renderView = () => {
    if (!dbReady) return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse">Sincronizando Banco de Dados...</p>
      </div>
    );

    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'products-list': return <ProductList />;
      case 'purchase-orders': return <PurchaseOrderList />;
      case 'receiving': return <ReceivingForm />;
      case 'crm-contacts': return <ContactList />;
      case 'sales-orders': return <SalesOrderList onChangeView={setCurrentView} />;
      case 'pos': return <POS onExit={() => setCurrentView('dashboard')} />;
      case 'finance-center': return <FinanceCenter />;
      case 'settings': return <Settings onChangeView={setCurrentView} />;
      case 'certificate-config': return <CertificateConfig onBack={() => setCurrentView('settings')} />;
      case 'nfe-emissor': return <InvoiceForm onBack={() => setCurrentView('sales-orders')} />;
      case 'nfe-list': return <InvoiceList />;
      case 'integration-marketplace': return <IntegrationMarketplace onChangeView={setCurrentView} />;
      case 'integration-config': return <IntegrationConfig onBack={() => setCurrentView('integration-marketplace')} />;
      default: return <Dashboard />;
    }
  };

  if (currentView === 'pos') {
    return <div className="h-screen w-screen overflow-hidden bg-slate-50">{renderView()}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 relative">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-hidden relative bg-slate-50">
          {renderView()}
        </main>
      </div>
      <AIChatWidget isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
      <button 
        onClick={() => setIsAIChatOpen(!isAIChatOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all z-50 group ${
          isAIChatOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-gradient-to-br from-indigo-600 to-blue-600 hover:scale-110'
        }`}
      >
        {isAIChatOpen ? <X className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
      </button>
    </div>
  );
};

export default App;
