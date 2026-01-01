import React from 'react';
import { CheckSquare, MapPin, Box, ArrowLeft } from 'lucide-react';

const PickingList: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-100 max-w-md mx-auto border-x border-gray-200 shadow-xl overflow-hidden">
      {/* Header Mobile Style */}
      <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md z-10">
          <div className="flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <div>
                  <h2 className="font-bold text-lg">Separação #PED-1003</h2>
                  <p className="text-xs text-indigo-200">Maria Oliveira • 3 Itens</p>
              </div>
          </div>
          <div className="text-right">
              <div className="text-xs font-bold bg-indigo-800 px-2 py-1 rounded">Prioridade Alta</div>
          </div>
      </div>

      {/* Picking Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Item 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
             <div className="flex justify-between items-start mb-2">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-bold bg-yellow-100 text-yellow-800">
                    <MapPin className="w-3 h-3 mr-1" /> RUA A-05
                 </span>
                 <span className="text-gray-400 text-xs">SKU: CAM-001-AZ-P</span>
             </div>
             <h3 className="text-lg font-bold text-gray-800 mb-1">Camiseta Algodão Premium</h3>
             <p className="text-sm text-gray-500 mb-3">Cor: Azul, Tam: P</p>
             
             <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                 <div className="text-center">
                     <span className="block text-xs text-gray-500 uppercase">Solicitado</span>
                     <span className="block text-xl font-bold text-gray-900">2</span>
                 </div>
                 <div className="text-center">
                      <span className="block text-xs text-gray-500 uppercase">Coletado</span>
                      <input type="number" className="w-16 text-center text-xl font-bold border-gray-300 rounded-md p-1" defaultValue={0} />
                 </div>
                 <button className="p-3 bg-gray-200 rounded-full text-gray-500 hover:bg-green-500 hover:text-white transition-colors">
                     <CheckSquare className="w-6 h-6" />
                 </button>
             </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-300 opacity-75">
             <div className="flex justify-between items-start mb-2">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-bold bg-gray-100 text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" /> RUA B-12
                 </span>
                 <span className="text-gray-400 text-xs">SKU: TEN-023-40</span>
             </div>
             <h3 className="text-lg font-bold text-gray-800 mb-1">Tênis Esportivo X</h3>
             <p className="text-sm text-gray-500 mb-3">Tam: 40</p>
             
             <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                 <div className="text-center">
                     <span className="block text-xs text-gray-500 uppercase">Solicitado</span>
                     <span className="block text-xl font-bold text-gray-900">1</span>
                 </div>
                 <div className="text-center">
                      <span className="block text-xs text-gray-500 uppercase">Coletado</span>
                      <input type="number" className="w-16 text-center text-xl font-bold border-gray-300 rounded-md p-1" defaultValue={0} />
                 </div>
                 <button className="p-3 bg-gray-200 rounded-full text-gray-500">
                     <Box className="w-6 h-6" />
                 </button>
             </div>
          </div>

      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-gray-200">
          <button className="w-full bg-indigo-600 text-white font-bold text-lg py-3 rounded-lg shadow hover:bg-indigo-700">
              Finalizar Separação
          </button>
      </div>
    </div>
  );
};

export default PickingList;