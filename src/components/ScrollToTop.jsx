import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 💡 Envía el scroll al tope superior izquierdo de la pantalla de forma inmediata
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que la ruta (URL) cambia

  return null;
}