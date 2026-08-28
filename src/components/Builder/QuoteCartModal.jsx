import React from 'react';
import { useQuoteCart } from '../../context/QuoteContext';

export const QuoteCartModal = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cart, removeFromCart, updateQuantity } = useQuoteCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Encabezado */}
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Lista de Cotización ({cart.length} productos)</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-2xl font-bold px-2"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo / Lista de productos */}
        <div className="p-6 overflow-y-auto flex-1">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No has añadido productos a la lista de cotización.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.cartItemId} 
                  className="flex items-center justify-between border-b pb-4 gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-base">{item.name}</h3>
                    <p className="text-sm text-gray-500">Ref / Modelo: <span className="font-mono text-blue-600">{item.reference}</span></p>
                    {item.category && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón eliminar */}
                  <button 
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-red-500 hover:text-red-700 p-2 text-sm font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 font-medium text-sm"
          >
            Seguir explorando
          </button>
          
          {cart.length > 0 && (
            <button 
              onClick={onProceedToCheckout}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium text-sm"
            >
              Solicitar Cotización Completa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};