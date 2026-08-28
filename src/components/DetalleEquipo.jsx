import React from 'react';
import { Row, Col, Typography, Tabs, Card, Breadcrumb, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  SettingOutlined, 
  FileTextOutlined, 
  SafetyCertificateOutlined, 
  ProfileOutlined,
  FilePdfOutlined,
  ArrowLeftOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { useQuoteCart } from '../context/QuoteContext';

const { Title, Paragraph, Text } = Typography;

// 🪐 ESTILOS EN LA RAÍZ (Fuera del componente)
const bannerHeaderStyle = {
  backgroundColor: 'var(--ava-primary-color)', 
  padding: '32px 40px',
  color: '#ffffff',
  marginBottom: '24px'
};

const mainContentStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '40px 24px',
};

const listStyle = {
  paddingLeft: 20,
  lineHeight: '1.8',
  color: '#444',
};

const tabCardStyle = {
  background: '#f8f9fa',
  borderRadius: '0 0 8px 8px',
  borderTop: 'none',
  padding: '24px',
  minHeight: '200px'
};

export default function DetalleEquipo({ data }) {
  const navigate = useNavigate();
  const { addToCart } = useQuoteCart();

  if (!data) return null;

  const { tag, title, img, desc, funcionesClave, pestanas } = data;

  const handleAddToCart = () => {
    addToCart({
      name: title || tag,
      image: img,
      description: desc,
      category: tag
    });
    alert(`¡${title || tag} agregado a la lista de cotización!`);
  };

  // Configuración dinámica de las pestañas
  const tabItems = [
    {
      key: '1',
      label: <span><SettingOutlined /> Características</span>,
      children: (
        <Card style={tabCardStyle}>
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={12}>
              <ul style={listStyle}>
                {pestanas.caracteristicas.columnaIzquierda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
            <Col xs={24} sm={12}>
              <ul style={listStyle}>
                {pestanas.caracteristicas.columnaDerecha.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: '2',
      label: <span><FileTextOutlined /> Especificaciones</span>,
      children: (
        <Card style={tabCardStyle}>
          {Array.isArray(pestanas.especificaciones) ? (
            <ul style={{ ...listStyle, listStyleType: 'disc', paddingLeft: 20 }}>
              {pestanas.especificaciones.map((item, index) => (
                <li key={index} style={{ marginBottom: 8, color: '#444' }}>
                  <Text strong style={{ color: '#111111' }}>{item.etiqueta}:</Text> {item.detail || item.detalle}
                </li>
              ))}
            </ul>
          ) : (
            <Paragraph style={{ color: '#444', lineHeight: 1.7, textAlign: 'justify' }}>
              {pestanas.especificaciones}
            </Paragraph>
          )}
        </Card>
      ),
    },
    {
      key: '3',
      label: <span><ProfileOutlined /> Documentos</span>,
      children: (
        <Card style={tabCardStyle}>
          <ul style={{ ...listStyle, listStyleType: 'none', paddingLeft: 0 }}>
            {pestanas.documentos.map((doc, index) => (
              <li key={index} style={{ marginBottom: 12 }}>
                <FilePdfOutlined style={{ color: '#ff4d4f', marginRight: 8, fontSize: '16px' }} />
                <a 
                  href={doc.url} 
                  target="_blank"             
                  rel="noopener noreferrer"   
                  style={{ textDecoration: 'none', color: '#1890ff', fontWeight: 500 }}
                >
                  {doc.nombre}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      ),
    },
    {
      key: '4',
      label: <span><SafetyCertificateOutlined /> Certificaciones</span>,
      children: (
        <Card style={tabCardStyle}>
          {pestanas.certificaciones && typeof pestanas.certificaciones === 'object' && !Array.isArray(pestanas.certificaciones) ? (
            <Row gutter={[32, 16]}>
              <Col xs={24} sm={12}>
                <ul style={{ ...listStyle, listStyleType: 'none', paddingLeft: 0 }}>
                  {pestanas.certificaciones.columnaIzquierda?.map((cert, index) => (
                    <li key={index} style={{ marginBottom: 12 }}>
                      <FilePdfOutlined style={{ color: '#ff4d4f', marginRight: 8, fontSize: '16px' }} />
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#1890ff', fontWeight: 500 }}
                      >
                        {cert.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col xs={24} sm={12}>
                <ul style={{ ...listStyle, listStyleType: 'none', paddingLeft: 0 }}>
                  {pestanas.certificaciones.columnaDerecha?.map((cert, index) => (
                    <li key={index} style={{ marginBottom: 12 }}>
                      <FilePdfOutlined style={{ color: '#ff4d4f', marginRight: 8, fontSize: '16px' }} />
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#1890ff', fontWeight: 500 }}
                      >
                        {cert.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          ) : (
            <Paragraph style={{ color: '#444', lineHeight: 1.7, textAlign: 'justify' }}>
              {pestanas.certificaciones}
            </Paragraph>
          )}
        </Card>
      ),
    },
  ];

  return (
    <div>
      {/* 🟦 BANNER SUPERIOR */}
      <div style={bannerHeaderStyle}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: 600 }}>
            {tag}
          </Title>
          <Breadcrumb
            style={{ marginTop: 8 }}
            items={[
              { title: <span style={{ color: 'rgba(255,255,255,0.7)' }}>Inicio</span> },
              { title: <span style={{ color: 'rgba(255,255,255,0.7)' }}>Instrumentación</span> },
              { title: <span style={{ color: '#ffffff', fontWeight: 500 }}>{tag}</span> },
            ]}
          />
        </div>
      </div>

      {/* 🏢 CONTENIDO DE DISEÑO */}
      <div style={mainContentStyle}>
        
        {/* ⬅️ BOTÓN VOLVER */}
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)} 
          style={{ marginBottom: 20, paddingLeft: 0, color: 'var(--ava-primary-color)', fontWeight: 700 }}
        >
          Volver al catálogo
        </Button>

        {/* Título Principal */}
        <Title level={3} style={{ color: '#111111', fontWeight: 700, marginBottom: 32, marginTop: 0 }}>
          {title}
        </Title>

        {/* Fila Central: Imagen + Detalles */}
        <Row gutter={[48, 32]} align="top" style={{ marginBottom: 48 }}>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <img src={img} alt={title} style={{ maxWidth: '100%', maxHeight: 400, height: 'auto', objectFit: 'contain' }} />
          </Col>

          <Col xs={24} md={16}>
            <Paragraph style={{ fontSize: 15, lineHeight: 1.7, color: '#333', textAlign: 'justify' }}>
              {desc}
            </Paragraph>

            <Title level={4} style={{ marginTop: 24, marginBottom: 12, color: 'var(--ava-primary-color)' }}>
              Funciones Clave
            </Title>

            <ul style={listStyle}>
              {funcionesClave.map((item, index) => (
                <li key={index}>
                  <Text strong>{item.etiqueta}:</Text> {item.detalle}
                </li>
              ))}
            </ul>

            {/* 🛒 BOTÓN DE AGREGAR A LA COTIZACIÓN */}
            <div style={{ marginTop: 28 }}>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                style={{
                  backgroundColor: '#059669',
                  borderColor: '#059669',
                  fontWeight: 'bold',
                  height: '46px',
                  paddingLeft: '28px',
                  paddingRight: '28px'
                }}
              >
                Agregar a Cotización
              </Button>
            </div>
          </Col>
        </Row>

        {/* 📑 PESTAÑAS */}
        <Row>
          <Col xs={24}>
            <Tabs defaultActiveKey="1" type="card" items={tabItems} style={{ marginBottom: 24 }} />
          </Col>
        </Row>

      </div>
    </div>
  );
}