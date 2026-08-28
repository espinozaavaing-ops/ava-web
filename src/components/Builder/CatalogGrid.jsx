import React, { useEffect, useState } from 'react';
import QuoteForm from './QuoteForm';

export default function CatalogGrid({ onSelectInstrument }) {
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [quoteProduct, setQuoteProduct] = useState(null);

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch catalog');
        return res.json();
      })
      .then(data => setCatalog(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="text-center p-16 text-red-600 w-full">
        <h2 className="text-2xl font-bold">Error de Carga</h2>
        <p>No se pudo cargar la lista de productos.</p>
      </div>
    );
  }

  if (catalog.length === 0) {
    return <div className="text-center p-16 text-gray-500">Cargando catálogo...</div>;
  }

  const categories = ['Todos', 'Instrumentación', 'Telecomunicaciones', 'Automatización'];

  const filteredCatalog = catalog.filter(item => {
    if (selectedCategory === 'Todos') return true;
    const category = item.category || 'Instrumentación';
    return category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Catálogo de Equipos y Soluciones</h2>
        <p className="text-gray-600 text-lg">Seleccione el producto que desea configurar o cotizar</p>
      </div>

      {/* Selector de Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-900 text-white shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cuadrícula de Productos */}
      {filteredCatalog.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay productos disponibles en esta categoría por el momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCatalog.map(item => {
            const isConfigurable = item.configurable !== false && Boolean(item.file);
            const itemCategory = item.category || 'Instrumentación';

            return (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col"
              >
                <div 
                  className="h-48 w-full bg-cover bg-center bg-no-repeat bg-gray-50 border-b border-gray-100"
                  style={{ backgroundImage: `url('/${item.image || 'img/catalog/pressure.png'}')` }}
                ></div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded mb-3">
                      {itemCategory}
                    </span>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {item.description || 'Equipo de alta confiabilidad para procesos industriales y comunicaciones.'}
                    </p>
                  </div>

                  {isConfigurable ? (
                    <button 
                      onClick={() => onSelectInstrument(item.file, item.image)}
                      className="w-full py-2 bg-blue-900 text-white font-medium rounded hover:bg-blue-800 transition-colors"
                    >
                      Configurar
                    </button>
                  ) : (
                    <button 
                      onClick={() => setQuoteProduct(item)}
                      className="w-full py-2 bg-green-700 text-white font-medium rounded hover:bg-green-600 transition-colors"
                    >
                      Solicitar Cotización
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Cotización Directa para Productos Estándar */}
      {quoteProduct && (
        <QuoteForm 
          modelCode={quoteProduct.name} 
          imageSrc={quoteProduct.image ? `/${quoteProduct.image}` : '/img/catalog/pressure.png'}
          onClose={() => setQuoteProduct(null)} 
        />
      )}
    </div>
  );
}