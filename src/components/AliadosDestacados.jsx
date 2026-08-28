import React from 'react';
import { Row, Col, Typography, Card, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import content from '../content.json';
import Separador from './Separador';

const { Title, Paragraph, Text } = Typography;

export default function AliadosDestacados() {
  const navigate = useNavigate();
  const { title, subtitle, items } = content.brandsData;

  return (
    <section className="section-brands" style={{ backgroundColor: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* ENCABEZADO DE LA SECCIÓN (IDÉNTICO A TU DISEÑO ACTUAL) */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title level={2} style={{ color: 'var(--ava-primary-color, #1e3a8a)', fontWeight: 700, margin: 0, textAlign:'center' }}>
            {title}
          </Title>
          
          <Separador/>

          <Paragraph type="secondary" style={{ fontSize: '16px', maxWidth: '750px', margin: '0 auto', textAlign: 'justify' }}>
            {subtitle}
          </Paragraph>
        </div>

        {/* REJILLA DE SOCIOS COMERCIALES */}
        <Row gutter={[24, 24]}>
          {items.map((brand, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
                bodyStyle={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onClick={() => navigate(brand.targetUrl)}
              >
                {/* Contenedor del Logo con fondo claro e iluminación */}
                <div style={{ 
                  height: '90px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px',
                  width: '100%'
                }}>
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    style={{ maxHeight: '100%', maxWidth: '85%', objectFit: 'contain' }} 
                  />
                </div>

                {/* Etiqueta de Estatus / Relación Comercial */}
                <Tag color="blue" style={{ 
                  backgroundColor: '#f0f5ff', 
                  color: 'var(--ava-primary-color, #1e3a8a)', 
                  border: '1px solid #d6e4ff',
                  borderRadius: '20px',
                  padding: '2px 12px',
                  fontWeight: 600,
                  fontSize: '11px',
                  marginBottom: '16px'
                }}>
                  {brand.status}
                </Tag>

                {/* Breve descripción del valor de la marca */}
                <Paragraph type="secondary" style={{ fontSize: '13px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {brand.desc}
                </Paragraph>

                {/* Indicador de Acción Técnico */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#8cb043', fontWeight: 600, fontSize: '14px' }}>
                  <span>Explorar portafolio</span>
                  <ArrowRightOutlined style={{ fontSize: '12px' }} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    </section>
  );
}