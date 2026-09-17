import React, { useState } from 'react';
import { useConfigurator } from './useConfigurator';
import Timeline from './Timeline';
import ConfigPanel from './ConfigPanel';
import { useQuoteCart } from '../../context/QuoteContext';

export default function InstrumentBuilder({ instrumentPath, instrumentImage, onBackToCatalog }) {
  const configurator = useConfigurator();
  const { addToCart } = useQuoteCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Cargar datos del instrumento cuando cambie la ruta
  React.useEffect(() => {
    if (instrumentPath) {
      configurator.loadInstrument(instrumentPath);
    }
  }, [instrumentPath]);

  if (configurator.loading) {
    return <div className="text-center p-16 text-gray-500">Cargando datos del instrumento...</div>;
  }

  if (configurator.error) {
    return (
      <div className="text-center p-16 text-red-600">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{configurator.error}</p>
        <button onClick={onBackToCatalog} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded">
          Volver al Catálogo
        </button>
      </div>
    );
  }

  if (!configurator.data) return null;

  const currentStep = configurator.steps[configurator.currentStepIndex];

  // Función para guardar el equipo configurado en el carrito global
  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    addToCart(configurator.data.instrument, {
      generatedCode: configurator.modelCode,
      details: configurator.selections,
    });
    alert(`¡${configurator.data.instrument.name} (${configurator.modelCode}) agregado a la lista de cotización!`);

    if (onBackToCatalog) {
      onBackToCatalog();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] bg-gray-50">
      
      {/* Barra superior de navegación */}
      <div className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToCatalog}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-800 hover:bg-blue-700 transition-colors border border-blue-700"
            title="Volver al Catálogo"
          >
            ←
          </button>
          <div>
            <div className="text-xs text-blue-200 uppercase tracking-wide">Configurando</div>
            <h1 className="text-lg font-bold m-0">{configurator.data.instrument.name}</h1>
          </div>
        </div>
      </div>

      <Timeline 
        steps={configurator.steps}
        currentStepIndex={configurator.currentStepIndex}
        selections={configurator.selections}
        onStepClick={configurator.goToStep}
      />

      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full p-4 md:p-6 gap-6 relative">
        
        {/* Columna izquierda: Imagen y Código */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex-grow flex items-center justify-center min-h-[250px]">
            <img 
              src={instrumentImage || '/img/apt3100.png'} 
              alt={configurator.data.instrument.name}
              className="max-w-full max-h-[300px] object-contain drop-shadow-lg"
            />
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-gray-900 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Código de Modelo</span>
              <span className="text-xs font-bold text-green-400">{configurator.progress}% completo</span>
            </div>
            <div className="p-4 bg-gray-800 flex justify-between items-center">
              <div className="font-mono text-xl font-bold tracking-widest text-white break-all">
                {configurator.modelCode}
              </div>
            </div>
            {configurator.isComplete && (
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                🛒 Agregar a Cotización
              </button>
            )}
          </div>
        </div>

        {/* Columna derecha: Panel de opciones */}
        <div className="md:w-2/3 h-full">
          <ConfigPanel 
            step={currentStep}
            selections={configurator.selections}
            onSelectOption={configurator.selectOption}
            onNext={configurator.nextStep}
            onPrev={configurator.prevStep}
            isFirst={configurator.currentStepIndex === 0}
            isLast={configurator.currentStepIndex === configurator.steps.length - 1}
            onFinish={handleAddToCart}
            isSubmitting={isAddingToCart}
          />
        </div>

      </div>
    </div>
  );
}