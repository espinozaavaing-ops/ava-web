import React from 'react';
import { Tabs, Typography } from 'antd';
import {
  SettingOutlined,
  WifiOutlined,
  DashboardOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import content from '../content.json'; // 👈 Importamos el JSON aquí
import '../index.css';

const { Title, Paragraph, Text } = Typography;

const areas = [
  { key: 'automatizacion', label: 'Automatización y Control', icon: <SettingOutlined />, jsonKey: 'automation' },
  { key: 'telecomunicaciones', label: 'Telecomunicaciones', icon: <WifiOutlined />, jsonKey: 'telecom' },
  { key: 'instrumentacion', label: 'Instrumentación', icon: <DashboardOutlined />, jsonKey: 'instrumentacion' },
];

export default function Services() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detectamos la sección activa
  const currentArea = areas.find(area => location.pathname.includes(area.key)) || areas[0];
  const currentTab = currentArea.key;

  // Extraemos los datos del banner dinámico según la sección en la que estemos
  const bannerData = content[currentArea.jsonKey]?.banner;

  const handleTabChange = (key) => {
    navigate(`/services/${key}`); 
  };

  const tabItems = areas.map((area) => ({
    key: area.key,
    label: <span>{area.icon} {area.label}</span>,
    children: <></>, 
  }));

  return (
    <div className="services-master-container">
      
      {bannerData && (
  <header 
    className="automation-banner"
    style={{
      // Añadimos comillas simples internas dentro de url('') para evitar conflictos de rutas
      backgroundImage: bannerData.bgImage 
        ? `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('${bannerData.bgImage}')`
        : 'none',
      backgroundColor: '#1e3a8a', // Color de respaldo sólido por si la imagen falla
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '80px 40px',
      color: '#fff'
    }}
  >
    <div className="banner-content" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Text className="banner-subtitle" style={{ color: '#8cb043', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
        {bannerData.subtitle}
      </Text>
      <Title level={1} className="banner-title" style={{ color: '#fff', margin: 0, fontWeight: 800, fontSize: '36px' }}>
        {bannerData.title}
      </Title>
      <Paragraph className="banner-desc" style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: 1.6, marginTop: '12px', maxWidth: '800px', marginBottom: 0 }}>
        {bannerData.desc}
      </Paragraph>
    </div>
  </header>
)}

      <div className="section-tabs-container" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#fff' }}>
        <Tabs 
          activeKey={currentTab} 
          onChange={handleTabChange}
          centered 
          items={tabItems} 
          className="custom-nav-tabs"
          destroyOnHidden={true}
        />
      </div>

      <div className="services-content-render" style={{ marginTop: '20px' }}>
        <Outlet />
      </div>

    </div>
  );
}