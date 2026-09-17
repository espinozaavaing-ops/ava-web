import React from 'react';

export default function ConfigPanel({
  step,
  selections,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onFinish,
  isSubmitting = false
}) {
  if (!step) return null;

  const currentSelections = selections[step.stepId] || [];
  const canProceed = !step.required || currentSelections.length > 0;

  // La adición real al carrito ocurre una sola vez, en InstrumentBuilder.handleAddToCart
  // (recibido aquí como onFinish). Este panel solo debe delegar el evento, nunca llamar
  // addToCart directamente, para evitar duplicar la línea del carrito en un solo clic.
  const handleFinish = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onFinish) {
      onFinish(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{step.label}</h2>
        {step.helpText && <p className="text-gray-500">{step.helpText}</p>}
      </div>

      <div className="flex-grow overflow-y-auto mb-6 pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {step.options.map((option) => {
            const isSelected = currentSelections.includes(option.code);
            return (
              <div 
                key={option.code}
                className={`
                  p-4 border-2 rounded-xl cursor-pointer transition-all flex items-start
                  ${isSelected ? 'border-blue-900 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
                `}
                onClick={() => onSelectOption(step.stepId, option.code, step.multiSelect)}
              >
                <div className={`
                  w-5 h-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center border transition-colors
                  ${step.multiSelect ? 'rounded' : 'rounded-full'}
                  ${isSelected ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-300 bg-white'}
                `}>
                  {isSelected && <span className="text-xs font-bold">{'\u2713'}</span>}
                </div>
                <div>
                  <div className="font-bold text-gray-800 flex items-center">
                    <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs mr-2 font-mono">{option.code}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{option.label}</div>
                  {option.description && option.description !== option.label && (
                    <div className="text-xs text-gray-500 mt-2">{option.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100 mt-auto">
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className={`px-6 py-2.5 rounded font-medium transition-colors ${isFirst ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Anterior
        </button>
        
        {!isLast ? (
          <button 
            onClick={onNext}
            disabled={!canProceed}
            className={`px-8 py-2.5 rounded font-medium transition-colors ${canProceed ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={!canProceed || isSubmitting}
            className={`px-8 py-2.5 rounded font-medium transition-colors ${canProceed && !isSubmitting ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            🛒 Agregar a Cotización
          </button>
        )}
      </div>
    </div>
  );
}