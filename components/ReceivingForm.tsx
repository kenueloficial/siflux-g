import React from 'react';
import { Upload, FileText, Check, AlertCircle, ArrowRight } from 'lucide-react';

const ReceivingForm: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Recebimento de Mercadoria</h1>
        <p className="text-sm text-gray-500 mt-1">Importe o XML da Nota Fiscal para dar entrada no estoque.</p>
      </div>

      <div className="max-w-4xl mx-auto w-full p-8 space-y-8">
        {/* Upload Section */}
        <div className="bg-white p-10 rounded-xl shadow-sm border-2 border-dashed border-gray-300 text-center hover:border-indigo-500 transition-colors cursor-pointer group">
            <div className="mx-auto h-16 w-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Arraste o XML da NFe aqui</h3>
            <p className="text-sm text-gray-500 mt-1">ou clique para selecionar do computador</p>
        </div>

        {/* Simulated Preview of Imported XML */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-700">NFe 3524 1000 0000 0000 0123.xml</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">XML Válido</span>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Supplier Info */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Fornecedor (Emitente)</label>
                        <p className="text-lg font-bold text-gray-900">Indústria de Tecidos ABC Ltda</p>
                        <p className="text-sm text-gray-600">CNPJ: 12.345.678/0001-90</p>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Pedido de Compra Vinculado</label>
                        <div className="flex items-center">
                            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border">
                                <option>PC-1001 (R$ 5.400,00)</option>
                                <option>Nenhum (Avulso)</option>
                            </select>
                            <Check className="w-5 h-5 text-green-500 ml-2" />
                        </div>
                         <p className="text-xs text-green-600 mt-1 flex items-center">
                            <Check className="w-3 h-3 mr-1" /> Valores conferem com o pedido
                         </p>
                    </div>
                </div>

                {/* Items Match */}
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3 border-b pb-2">Conferência de Itens</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Produto NFe</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qtd NFe</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Produto Sistema</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-3 py-3 text-sm text-gray-900">Tecido Algodão Cru</td>
                                <td className="px-3 py-3 text-sm text-gray-900">100 KG</td>
                                <td className="px-3 py-3 text-sm text-gray-600">
                                    <select className="block w-full text-sm border-gray-300 rounded-md border p-1">
                                        <option>Matéria Prima - Algodão</option>
                                    </select>
                                </td>
                                <td className="px-3 py-3 text-sm"><Check className="w-4 h-4 text-green-500" /></td>
                            </tr>
                            <tr>
                                <td className="px-3 py-3 text-sm text-gray-900">Linha Poliester Branca</td>
                                <td className="px-3 py-3 text-sm text-gray-900">50 CX</td>
                                <td className="px-3 py-3 text-sm text-gray-600">
                                    <select className="block w-full text-sm border-gray-300 rounded-md border p-1">
                                        <option>Linha Costura Branca</option>
                                    </select>
                                </td>
                                <td className="px-3 py-3 text-sm"><Check className="w-4 h-4 text-green-500" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Financial Preview */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                        <div>
                            <h4 className="text-sm font-bold text-yellow-800">Atenção Financeira</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                                Esta nota gerará 3 parcelas no Contas a Pagar (Vencimentos: 20/11, 20/12, 20/01).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancelar</button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center shadow-sm">
                        Concluir Entrada
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingForm;