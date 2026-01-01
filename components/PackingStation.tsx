import React, { useState } from 'react';
import { Scan, CheckCircle, AlertTriangle, Package, Printer, ArrowRight } from 'lucide-react';

const PackingStation: React.FC = () => {
  const [scannedCode, setScannedCode] = useState('');

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <div>
            <h1 className="text-xl font-bold flex items-center">
                <Package className="mr-2" /> Estação de Embalagem #01
            </h1>
            <p className="text-gray-400 text-sm">Operador: João Silva</p>
        </div>
        <div className="text-right">
            <div className="text-3xl font-mono font-bold text-green-400">PED-1003</div>
            <div className="text-sm text-gray-400">Maria Oliveira</div>
        </div>
      </div>

      <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          {/* Left: Scanning Area */}
          <div className="flex-1 flex flex-col space-y-6">
              
              {/* Scanner Input */}
              <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-indigo-500 flex flex-col items-center justify-center text-center">
                  <Scan className="w-16 h-16 text-indigo-500 mb-4 animate-pulse" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Aguardando Leitura</h2>
                  <p className="text-gray-500 mb-6">Bipe o código de barras do produto</p>
                  <input 
                    type="text" 
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    className="w-full max-w-md text-center text-2xl font-mono border-2 border-gray-300 rounded-lg py-3 focus:border-indigo-500 focus:ring-0"
                    placeholder="|||||||||||||||||"
                    autoFocus
                  />
              </div>

              {/* Progress */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Itens do Pedido (1/3)</h3>
                  <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                              <div>
                                  <p className="font-bold text-gray-900">Camiseta Algodão Premium (P)</p>
                                  <p className="text-xs text-gray-500">SKU: CAM-001-AZ-P</p>
                              </div>
                          </div>
                          <span className="text-green-700 font-bold">OK</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg opacity-50">
                           <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"></div>
                              <div>
                                  <p className="font-bold text-gray-900">Camiseta Algodão Premium (P)</p>
                                  <p className="text-xs text-gray-500">SKU: CAM-001-AZ-P</p>
                              </div>
                          </div>
                          <span className="text-gray-400 font-bold">Pendente</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg opacity-50">
                           <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3"></div>
                              <div>
                                  <p className="font-bold text-gray-900">Tênis Esportivo X (40)</p>
                                  <p className="text-xs text-gray-500">SKU: TEN-023-40</p>
                              </div>
                          </div>
                          <span className="text-gray-400 font-bold">Pendente</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right: Actions */}
          <div className="w-1/3 flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Ações do Pedido</h3>
                  <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left disabled:opacity-50" disabled>
                          <div className="flex items-center">
                              <Printer className="w-5 h-5 mr-3 text-gray-500" />
                              <div>
                                  <p className="font-bold text-gray-700">Imprimir Nota Fiscal</p>
                                  <p className="text-xs text-gray-400">Liberado após conferência</p>
                              </div>
                          </div>
                      </button>
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left disabled:opacity-50" disabled>
                          <div className="flex items-center">
                              <Printer className="w-5 h-5 mr-3 text-gray-500" />
                              <div>
                                  <p className="font-bold text-gray-700">Imprimir Etiqueta Envio</p>
                                  <p className="text-xs text-gray-400">Correios SEDEX</p>
                              </div>
                          </div>
                      </button>
                  </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 flex-1">
                  <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" /> Problemas?
                  </h3>
                  <p className="text-sm text-yellow-700 mb-4">Se houver avaria ou falta de produto, relate imediatamente.</p>
                  <button className="w-full py-2 bg-yellow-100 text-yellow-800 font-bold rounded border border-yellow-300 hover:bg-yellow-200">
                      Reportar Ocorrência
                  </button>
              </div>

              <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-green-700 flex items-center justify-center disabled:opacity-50" disabled>
                  Concluir e Despachar <ArrowRight className="ml-2" />
              </button>
          </div>
      </div>
    </div>
  );
};

export default PackingStation;