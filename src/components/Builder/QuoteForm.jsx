import React, { useState } from 'react';

export default function QuoteForm({ cartItems = [], onSuccess, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí se enviaría la data al backend/Nodemailer
      console.log('Enviando cotización con items:', cartItems, 'y datos:', formData);
      
      // Simulación de envío exitoso
      setTimeout(() => {
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (error) {
      console.error('Error al enviar cotización:', error);
      setIsSubmitting(false);
    }
  };

  // Determinar la imagen principal a mostrar en el panel izquierdo
  const firstItemImage = cartItems.length > 0 && cartItems[0].image ? cartItems[0].image : null;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg">
      
      {/* Panel Izquierdo: Resumen dinámico y Marca */}
      <div className="w-full md:w-1/3 bg-slate-50 p-5 rounded-lg border border-slate-200 flex flex-col items-center text-center">
        {/* Logo de Ava Ingeniería */}
        <div className="h-14 flex items-center justify-center mb-4">
          <img 
            src="/assets/ORIGINAL.png" 
            alt="AVA Ingeniería" 
            className="max-h-full w-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/ORIGINAL.png';
            }}
          />
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1">
          {cartItems.length > 1 ? 'Resumen de Cotización' : 'Detalles de la Solicitud'}
        </h3>
        
        <p className="text-xs text-gray-500 mb-4">
          {cartItems.length > 0 
            ? `${cartItems.length} producto(s) en la lista` 
            : 'Solicitud B2B directa'}
        </p>

        {/* Vista dinámica de imágenes / lista */}
        <div className="w-full bg-white p-3 rounded-md border border-gray-200 mb-4 text-left max-h-48 overflow-y-auto">
          {cartItems.length > 0 ? (
            <ul className="space-y-2 divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.cartItemId || item.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                  <span className="font-medium text-gray-700 truncate pr-2">{item.name}</span>
                  <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    x{item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">Sin productos seleccionados</p>
          )}
        </div>

        {/* Muestra la imagen individual solo si existe 1 producto con imagen específica */}
        {cartItems.length === 1 && firstItemImage && (
          <div className="w-32 h-32 mx-auto flex items-center justify-center p-2 bg-white rounded border">
            <img src={firstItemImage} alt={cartItems[0].name} className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </div>

      {/* Panel Derecho: Formulario */}
      <div className="w-full md:w-2/3">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitar Cotización Formal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre Completo *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Empresa *</label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Detalles Adicionales del Proyecto</label>
            <textarea
              name="details"
              rows="3"
              value={formData.details}
              onChange={handleChange}
              placeholder="Indica condiciones de entrega, ubicación de la obra o especificaciones adicionales..."
              className="w-full p-2 text-sm border rounded-md focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 text-sm font-medium"
              >
                Volver
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-bold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud B2B'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}