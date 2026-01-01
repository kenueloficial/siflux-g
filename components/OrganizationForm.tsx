
import React from 'react';
import { Building2, MapPin, Globe, Phone, Plus, Users, FileText } from 'lucide-react';

const OrganizationForm: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start">
        <div className="flex items-center">
            <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 mr-4">
                <Building2 className="w-8 h-8" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tech Solutions Ltda</h1>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>CNPJ: 12.345.678/0001-99</span>
                    <span className="mx-2">•</span>
                    <span className="text-indigo-600 font-medium">Cliente Ativo</span>
                </div>
            </div>
        </div>
        <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm">Editar</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Negócio
            </button>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Col 1: Details */}
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Dados da Empresa</h3>
                  <div className="space-y-4">
                      <div className="flex items-start text-sm">
                          <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                          <span className="text-gray-900">Av. Paulista, 1000, CJ 101<br/>São Paulo - SP, 01310-100</span>
                      </div>
                      <div className="flex items-center text-sm">
                          <Globe className="w-4 h-4 mr-3 text-gray-400" />
                          <a href="#" className="text-indigo-600 hover:underline">www.techsolutions.com.br</a>
                      </div>
                      <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-3 text-gray-400" />
                          <span className="text-gray-900">(11) 3000-0000</span>
                      </div>
                  </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Contatos Vinculados</h3>
                      <button className="text-xs text-indigo-600 hover:underline">Adicionar</button>
                  </div>
                  <div className="space-y-3">
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 mr-3">AS</div>
                          <div>
                              <p className="text-sm font-bold text-gray-900">Ana Souza</p>
                              <p className="text-xs text-gray-500">Gerente de Compras</p>
                          </div>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 mr-3">JP</div>
                          <div>
                              <p className="text-sm font-bold text-gray-900">João Pereira</p>
                              <p className="text-xs text-gray-500">Diretor Financeiro</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Col 2: Related Entities */}
          <div className="lg:col-span-2 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                       <h3 className="text-lg font-bold text-gray-900 mb-1">R$ 45.000</h3>
                       <p className="text-xs text-gray-500">Total Vendido (LTV)</p>
                   </div>
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                       <h3 className="text-lg font-bold text-gray-900 mb-1">2 Oportunidades</h3>
                       <p className="text-xs text-gray-500">Em aberto no Pipeline</p>
                   </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                   <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                       <h3 className="font-bold text-gray-800">Histórico de Pedidos</h3>
                   </div>
                   <table className="min-w-full divide-y divide-gray-200">
                       <tbody className="bg-white divide-y divide-gray-200">
                           <tr>
                               <td className="px-6 py-4 text-sm font-bold text-indigo-600">#PED-1005</td>
                               <td className="px-6 py-4 text-sm text-gray-500">25/10/2025</td>
                               <td className="px-6 py-4 text-sm font-bold text-gray-900">R$ 12.000,00</td>
                               <td className="px-6 py-4 text-right">
                                   <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Aguardando Pgto</span>
                               </td>
                           </tr>
                           <tr>
                               <td className="px-6 py-4 text-sm font-bold text-indigo-600">#PED-0988</td>
                               <td className="px-6 py-4 text-sm text-gray-500">10/09/2025</td>
                               <td className="px-6 py-4 text-sm font-bold text-gray-900">R$ 33.000,00</td>
                               <td className="px-6 py-4 text-right">
                                   <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Entregue</span>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
          </div>

      </div>
    </div>
  );
};

export default OrganizationForm;
