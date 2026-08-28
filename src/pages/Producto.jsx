import React from 'react';
import { useParams } from 'react-router-dom';
import DetalleEquipo from '../components/DetalleEquipo';
import content from '../content.json';

export default function Producto() {
  const { id } = useParams();

  // Buscador dinámico en el JSON
  const buscarProducto = () => {
    const categorias = content.instrumentacion.categoriesData;
    for (const key in categorias) {
      const productoEncontrado = categorias[key].products.find(p => p.id === id);
      if (productoEncontrado) return productoEncontrado;
    }
    return null;
  };

  const producto = buscarProducto();

  if (!producto) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Producto no encontrado</h2>
        <p>El equipo solicitado no forma parte del catálogo actual.</p>
      </div>
    );
  }

  // 👇 AQUÍ ESTÁ LA CLAVE: Solo retornamos el componente, sin envolverlo en banners.
  return <DetalleEquipo data={producto} />;
}