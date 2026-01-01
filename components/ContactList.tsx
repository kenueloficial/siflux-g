
import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, UserPlus, Loader2, Trash2, X } from 'lucide-react';
import { Contact } from '../types';
import { db } from '../databaseService';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '', email: '', phone: '', document: '', type: 'company', role: 'Cliente'
  });

  const loadContacts = async () => {
    setLoading(true);
    const data = await db.getAll<Contact>('contacts');
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => { loadContacts(); }, []);

  const handleSave = async () => {
    if (!newContact.name || !newContact.document) return alert('Nome e Documento são obrigatórios');
    const contact: Contact = {
      ...newContact as Contact,
      id: Date.now().toString(),
      company: newContact.name || ''
    };
    await db.put('contacts', contact);
    setIsModalOpen(false);
    loadContacts();
    setNewContact({ name: '', email: '', phone: '', document: '', type: 'company', role: 'Cliente' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Excluir contato?')) {
      await db.delete('contacts', id);
      loadContacts();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black">Novo Contato</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="p-10 space-y-4">
              <input 
                type="text" placeholder="Nome Completo / Razão Social" 
                className="w-full px-5 py-3 rounded-xl border"
                value={newContact.name}
                onChange={e => setNewContact({...newContact, name: e.target.value})}
              />
              <input 
                type="text" placeholder="CPF / CNPJ" 
                className="w-full px-5 py-3 rounded-xl border"
                value={newContact.document}
                onChange={e => setNewContact({...newContact, document: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="email" placeholder="E-mail" 
                  className="w-full px-5 py-3 rounded-xl border"
                  value={newContact.email}
                  onChange={e => setNewContact({...newContact, email: e.target.value})}
                />
                <input 
                  type="text" placeholder="Telefone" 
                  className="w-full px-5 py-3 rounded-xl border"
                  value={newContact.phone}
                  onChange={e => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black shadow-lg"
              >
                Salvar Contato
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CRM & Contatos</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold flex items-center shadow-lg"
        >
          <UserPlus className="w-4 h-4 mr-2" /> Novo Contato
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {loading ? <Loader2 className="animate-spin mx-auto mt-20 text-indigo-600" /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all">
                <div className="flex justify-between">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center font-black text-indigo-600">
                    {contact.name.charAt(0)}
                  </div>
                  <button onClick={() => handleDelete(contact.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="mt-4 font-black text-slate-900 truncate">{contact.name}</h3>
                <p className="text-xs text-indigo-600 font-bold mb-4">{contact.document}</p>
                <div className="space-y-2 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {contact.email || 'N/A'}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {contact.phone || 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
