import React from 'react';
import { Tabs } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extrae la última parte de la URL para saber qué Tab iluminar
  const currentTab = location.pathname.split('/').pop();

  const navItems = [
    { key: 'instrumentacion', label: 'Instrumentación' },
    { key: 'automatizacion', label: 'Automatización y control' },
    { key: 'telecomunicaciones', label: 'Telecomunicaciones' },
    { key: 'ipc', label: 'IPC-Servicios Especializados' },
  ];

  const handleTabChange = (key) => {
    navigate(`/services/${key}`); // Te redirige a /services/automatizacion, etc.
  };

  return (
    <div className="services-master-container">
      {/* Tu barra de navegación superior compartida */}
      <div className="section-tabs-container" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <Tabs 
          activeKey={currentTab} 
          onChange={handleTabChange}
          centered 
          items={navItems} 
          className="custom-nav-tabs"
        />
      </div>

      {/* 🚀 IMPORTANTE: Aquí se inyectarán dinámicamente tus páginas hijas */}
      <div className="services-content-render">
        <Outlet />
      </div>
    </div>
  );
}