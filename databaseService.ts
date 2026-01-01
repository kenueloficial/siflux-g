
import { Product, Contact, SalesOrder, FinancialRecord, PurchaseOrder, Quote } from './types';

const DB_NAME = 'SilfluxERP';
const DB_VERSION = 3;

export class DatabaseService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        // Fix: Added 'quotes' to the list of object stores to avoid runtime errors in QuoteList component
        const stores = ['products', 'contacts', 'sales_orders', 'finance', 'purchase_orders', 'settings', 'quotes'];
        stores.forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id' });
          }
        });
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (e) => reject(e);
    });
  }

  private getStore(name: string, mode: IDBTransactionMode = 'readonly') {
    if (!this.db) throw new Error('DB not initialized');
    return this.db.transaction(name, mode).objectStore(name);
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve) => {
      const request = this.getStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  async put<T>(storeName: string, data: T): Promise<void> {
    return new Promise((resolve) => {
      const request = this.getStore(storeName, 'readwrite').put(data);
      request.onsuccess = () => resolve();
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    return new Promise((resolve) => {
      const request = this.getStore(storeName, 'readwrite').delete(id);
      request.onsuccess = () => resolve();
    });
  }

  async seedIfEmpty() {
    const products = await this.getAll<Product>('products');
    if (products.length === 0) {
      const initialProducts: Product[] = [
        { id: '1', name: 'Notebook Pro M3', sku: 'NTB-001', price: 12500, stock: 15, category: 'Hardware', status: 'active', type: 'physical' },
        { id: '2', name: 'Monitor 4K 32"', sku: 'MON-045', price: 3200, stock: 8, category: 'Hardware', status: 'active', type: 'physical' }
      ];
      for (const p of initialProducts) await this.put('products', p);
    }
    
    const contacts = await this.getAll<Contact>('contacts');
    if (contacts.length === 0) {
       const initialContacts: Contact[] = [
         { id: '1', name: 'Empresa Exemplo LTDA', role: 'Cliente', email: 'contato@exemplo.com', phone: '1199999999', company: 'Exemplo', type: 'company', document: '12.345.678/0001-00' }
       ];
       for (const c of initialContacts) await this.put('contacts', c);
    }
  }
}

export const db = new DatabaseService();
