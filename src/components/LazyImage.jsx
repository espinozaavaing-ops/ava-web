import React, { useState, useEffect } from 'react';
import { Image, Spin } from 'antd';

export default function LazyImage({ src, alt, width, height, style, preview = false }) {
  const [loading, setLoading] = useState(true);

  // Si la imagen cambia (por ejemplo en un slider), reiniciamos el estado de carga
  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: width || '100%', 
        height: height || '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5', // Fondo neutro de respaldo
        overflow: 'hidden'
      }}
    >
      {/* Indicador de carga (Spin) centrado de forma absoluta */}
      {loading && (
        <div style={{
          position: 'absolute',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spin size="medium" />
        </div>
      )}

      {/* Componente de Ant Design con el disparador onLoad */}
      <Image
        src={src}
        alt={alt}
        width={width || "100%"}
        height={height || "100%"}
        preview={preview}
        style={{
          ...style,
          opacity: loading ? 0 : 1, // Se mantiene invisible hasta que carga por completo
          transition: 'opacity 0.3s ease-in-out' // Efecto suave de aparición
        }}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // Si la imagen falla, quitamos el spin para no trabar la vista
      />
    </div>
  );
}