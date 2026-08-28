import React from 'react';
import { useQuoteCart } from '../context/QuoteContext';

export default function ProductCard({ product }) {
  const { addToCart } = useQuoteCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert(`¡${product.name || product.titulo || 'Producto'} agregado a la lista de cotización!`);
  };

  const title = product.name || product.titulo || product.nombre;
  const image = product.image || product.imagen || product.img;
  const description = product.description || product.descripcion;
  const category = product.category || product.categoria;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      {image && (
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
          <img 
            src={image} 
            alt={title} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {category && (
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block mb-1">
              {category}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-md text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            🛒 Agregar a Cotización
          </button>
        </div>
      </div>
    </div>
  );
}