import React, { useEffect, useState } from 'react';
import { useQuoteCart } from '../../context/QuoteContext';

const DEFAULT_CATEGORY = 'Instrumentación';
const FALLBACK_IMAGE = '/img/catalog/pressure.png';

const getImageSrc = (image) => (image ? `/${image.replace(/^\/+/, '')}` : FALLBACK_IMAGE);

const getBrandsForCategory = (items, category) => {
  const relevantItems = category === 'Todos'
    ? items
    : items.filter(item => (item.category || DEFAULT_CATEGORY).toLowerCase() === category.toLowerCase());

  return ['Todos', ...Array.from(new Set(relevantItems.map(item => item.brand).filter(Boolean)))];
};

export default function CatalogGrid({ onSelectInstrument }) {
  const [catalog, setCatalog] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todos');

  const { addToCart } = useQuoteCart();

  useEffect(() => {
    fetch('/data/catalog.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch catalog');
        return res.json();
      })
      .then(data => setCatalog(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Al cambiar de categoría, si la marca seleccionada ya no aplica a ella, se reinicia a "Todos".
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(prevBrand => {
      const availableBrands = getBrandsForCategory(catalog, category);
      return availableBrands.includes(prevBrand) ? prevBrand : 'Todos';
    });
  };

  const handleAddToCartDirect = (item) => {
    const itemCategory = item.category || DEFAULT_CATEGORY;

    const cartItem = {
      id: item.id || `item-${(item.name || 'producto').toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name,
      image: getImageSrc(item.image),
      description: item.description || 'Equipo de alta confiabilidad para procesos industriales y comunicaciones.',
      category: itemCategory,
      quantity: 1
    };

    addToCart(cartItem);
    alert(`¡${item.name} agregado a la lista de cotización!`);
  };

  if (error) {
    return (
      <div className="text-center p-16 text-red-600 w-full">
        <h2 className="text-2xl font-bold">Error de Carga</h2>
        <p>No se pudo cargar la lista de productos.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center p-16 text-gray-500">Cargando catálogo...</div>;
  }

  const categories = ['Todos', 'Instrumentación', 'Telecomunicaciones', 'Automatización'];

  const brands = getBrandsForCategory(catalog, selectedCategory);

  const filteredCatalog = catalog.filter(item => {
    const category = item.category || DEFAULT_CATEGORY;
    const categoryMatch = selectedCategory === 'Todos' || category.toLowerCase() === selectedCategory.toLowerCase();
    const brandMatch = selectedBrand === 'Todos' || (item.brand || '').toLowerCase() === selectedBrand.toLowerCase();
    return categoryMatch && brandMatch;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Catálogo de Equipos y Soluciones</h2>
        <p className="text-gray-600 text-lg">Seleccione el producto que desea configurar o cotizar</p>
      </div>

      {/* Selector de Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
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

      {/* Selector de Marcas */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {brands.map(brand => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
              selectedBrand === brand
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {brand}
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
          {filteredCatalog.map((item, index) => {
            const isConfigurable = item.configurable !== false && Boolean(item.file);
            const itemCategory = item.category || DEFAULT_CATEGORY;

            return (
              <div
                key={item.id || `catalog-item-${index}`}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 flex flex-col"
              >
                <div
                  className="h-48 w-full bg-cover bg-center bg-no-repeat bg-gray-50 border-b border-gray-100"
                  style={{ backgroundImage: `url('${getImageSrc(item.image)}')` }}
                ></div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {itemCategory}
                      </span>
                      {item.brand && (
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded">
                          {item.brand}
                        </span>
                      )}
                    </div>
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
                      onClick={() => handleAddToCartDirect(item)}
                      className="w-full py-2 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      🛒 Agregar a Cotización
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}