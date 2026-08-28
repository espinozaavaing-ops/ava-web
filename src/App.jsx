import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuoteProvider } from './context/QuoteContext';
import ScrollToTop from './components/ScrollToTop'; 
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services'; 
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDmr from './pages/BlogDmr';

// Importación de los catálogos de servicios industriales
import AutomatizacionControl from './components/AutomatizacionControl';
import Telecom from './components/Telecom'; 
import Instrumentacion from './components/Instrumentacion';
import Producto from './pages/Producto';
import Configurador from './pages/Configurador';

export default function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <MainLayout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* 👇 AQUÍ ABRE SERVICES */}
            <Route path="/services" element={<Services />}>
              <Route index element={<AutomatizacionControl />} />
              <Route path="automatizacion" element={<AutomatizacionControl />} />
              <Route path="automatizacion/:category" element={<AutomatizacionControl />} />
              <Route path="telecomunicaciones" element={<Telecom />} />
              <Route path="telecomunicaciones/:category" element={<Telecom />} />
              <Route path="instrumentacion" element={<Instrumentacion />} />
              <Route path="instrumentacion/:category" element={<Instrumentacion />} />
            </Route> 
            {/* 👆 AQUÍ TIENE QUE CERRARSE SERVICES COMPLETAMENTE */}

            {/* 🚀 EL PRODUCTO DEBE ESTAR LIBRE AQUÍ AFUERA */}
            <Route path="/producto/:id" element={<Producto />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDmr />} />

            {/* Builder de Instrumentos */}
            <Route path="/builder" element={<Configurador />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QuoteProvider>
  );
}