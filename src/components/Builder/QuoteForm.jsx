import React, { useState } from 'react';

export default function QuoteForm({ modelCode, imageSrc, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    detalles: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cotización enviada con éxito para el modelo: ${modelCode}\nPronto un ingeniero se pondrá en contacto.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Summary */}
        <div className="bg-gray-50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center text-center">
          <img src="/LOGO AVA INGENIERIA/LOGOS/Original-01.png" alt="AVA Ingeniería" className="h-12 mb-6 object-contain" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Resumen de Configuración</h3>
          <p className="text-sm text-gray-500 mb-6">Su instrumento personalizado</p>
          
          <div className="bg-white p-4 rounded-lg shadow-inner w-full mb-6 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">CÓDIGO GENERADO:</div>
            <div className="font-mono text-lg font-bold text-blue-900 break-all">{modelCode}</div>
          </div>
          
          <img src={imageSrc || '/img/apt3100.png'} alt="Instrumento" className="max-w-[200px] object-contain drop-shadow-md" />
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:w-2/3 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            &times;
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicitar Cotización Formal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
                <input required type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-shadow" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-shadow" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detalles Adicionales del Proyecto</label>
              <textarea rows="4" name="detalles" value={formData.detalles} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-shadow resize-y"></textarea>
            </div>
            
            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium transition-colors">
                Cancelar
              </button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 font-medium shadow-md hover:shadow-lg transition-all">
                Enviar Solicitud B2B
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
