import React, { useState } from 'react';
import CatalogGrid from '../components/Builder/CatalogGrid';
import InstrumentBuilder from '../components/Builder/InstrumentBuilder';

export default function Configurador() {
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  const handleSelectInstrument = (jsonPath, imagePath) => {
    setSelectedInstrument({ path: jsonPath, image: imagePath });
  };

  const handleBackToCatalog = () => {
    setSelectedInstrument(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Page Header (Only show when in catalog) */}
      {!selectedInstrument && (
        <div className="bg-blue-900 text-white py-12 px-4 mb-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Instrument Builder</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Configure su equipo de medición a medida seleccionando las especificaciones técnicas requeridas para su proceso industrial.
            </p>
          </div>
        </div>
      )}

      {selectedInstrument ? (
        <div className="max-w-7xl mx-auto md:py-8 md:px-4">
          <div className="bg-white md:rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <InstrumentBuilder 
              instrumentPath={selectedInstrument.path} 
              instrumentImage={selectedInstrument.image}
              onBackToCatalog={handleBackToCatalog} 
            />
          </div>
        </div>
      ) : (
        <CatalogGrid onSelectInstrument={handleSelectInstrument} />
      )}
    </div>
  );
}
