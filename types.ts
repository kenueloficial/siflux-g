
// Fix: Added 'inventory-list' and 'inventory-create' to ViewState
export type ViewState = 
  | 'dashboard'
  | 'products-list'
  | 'purchase-orders'
  | 'receiving'
  | 'crm-contacts'
  | 'sales-orders'
  | 'pos'
  | 'finance-center'
  | 'settings'
  | 'certificate-config'
  | 'nfe-emissor'
  | 'nfe-list'
  | 'integration-marketplace'
  | 'integration-config'
  | 'nuvem-fiscal-config'
  | 'inventory-list'
  | 'inventory-create';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive' | 'draft';
  type: 'physical' | 'digital' | 'service';
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  type: 'person' | 'company';
  document: string;
}

export interface SalesOrder {
  id: string;
  customerName: string;
  status: 'pending_payment' | 'paid' | 'picking' | 'packing' | 'shipped' | 'delivered';
  total: number;
  date: string;
}

export interface FinancialRecord {
  id: string;
  description: string;
  entity: string; 
  dueDate: string;
  amount: number;
  status: 'open' | 'paid' | 'overdue';
  type: 'payable' | 'receivable';
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  total: number;
  status: 'draft' | 'sent' | 'received';
}

// Fix: Add missing Opportunity interface for Pipeline component
export interface Opportunity {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: string;
  owner: string;
}

// Fix: Add missing Automation interface for AutomationList component
export interface Automation {
  id: string;
  name: string;
  trigger: string;
  active: boolean;
  executions: number;
}

// Fix: Add missing StockMovement interface for StockMovements component
export interface StockMovement {
  id: string;
  date: string;
  type: 'entry' | 'exit' | 'adjustment' | 'transfer';
  documentRef: string;
  quantity: number;
  balance: number;
  user: string;
}

// Fix: Add missing DigitalCertificate interface for certificate management components
export interface DigitalCertificate {
  filename: string;
  cnpj: string;
  expiryDate: string;
  subject: string;
  status: 'valid' | 'invalid' | 'expired';
}

// Fix: Add missing Quote interface for QuoteList and QuoteBuilder components
export interface Quote {
  id: string;
  customerName: string;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  date: string;
}

// Fix: Add missing QuoteItem interface for QuoteBuilder component
export interface QuoteItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}
