import React from 'react';
// 💡 Importamos 'Spin' para el efecto de carga
import { Row, Col, Typography, Image, Button, Empty, Spin } from 'antd';
import { ArrowLeftOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined, LinkedinOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom'; 
import content from '../content.json';
import LazyImage from '../components/LazyImage';
import '../index.css';

const { Title, Paragraph, Text } = Typography;

export default function BlogDmr() {
  const navigate = useNavigate();
  const { slug } = useParams(); 

  // Extraemos dinámicamente el artículo que coincida con el slug
  const data = content.blog.articlesDetails?.[slug];

  // Si alguien escribe un slug que no existe o no tiene datos cargados aún
  if (!data) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <Empty description="El artículo que busca se encuentra en redacción o no existe." />
        <Button type="primary" onClick={() => navigate('/blog')} style={{ marginTop: 20 }}>
          Volver a Noticias
        </Button>
      </div>
    );
  }

  // 💡 Creamos un contenedor contenedor reutilizable con el Spinner centrado para el placeholder
  const imageLoader = (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '100%', 
      background: '#f5f5f5',
      minHeight: '200px'
    }}>
      <Spin size="large" />
    </div>
  );

  return (
    <div className="blog-detail-container" style={{ background: '#fff', minHeight: '100vh' }}>
      
      <div style={{ maxWidth: 1200, margin: '20px auto 0 auto', padding: '0 24px' }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/blog')} style={{ color: 'var(--ava-primary-color)', fontWeight: 600 }}>
          Volver a Noticias
        </Button>
      </div>

      <Row style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 60px 24px' }} gutter={[32, 32]}>
        
        {/* COLUMNA IZQUIERDA (Estilo Revista / Franja Azul) */}
        <Col xs={24} md={9}>
          <div style={{ 
            background: 'var(--ava-primary-color, #1e3a8a)', 
            color: '#fff', 
            padding: '40px 30px', 
            borderRadius: '8px',
            height: '100%' 
          }}>
            <Title level={2} style={{ 
              color: '#fff', 
              fontWeight: 800, 
              fontSize: '26px', 
              lineHeight: 1.3,
              borderBottom: '2px solid #fff',
              paddingBottom: '20px',
              marginBottom: '24px',
              textAlign: 'justify'
            }}>
              {data.sidebar.title}
            </Title>
            
            {data.sidebar.paragraphs.map((p, idx) => (
              <Paragraph key={idx} style={{ color: '#e2e8f0', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px', textAlign: 'justify'}}>
                {p}
              </Paragraph>
            ))}

            <div style={{ marginTop: '40px' }}>
              <div style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                {/* 💡 IMAGEN 1: Ajustada con preview y placeholder */}
                <Image 
                  src={`/assets/blog/${slug}-3.jpg`} 
                  alt="Mesa de capacitación"
                  width="100%"
                  fallback="/assets/curso-dmr/3.jpg"
                  style={{ objectFit: 'cover' }}
                  preview={false}
                  placeholder={imageLoader}
                />
              </div>
              <Text style={{ display: 'block', color: 'var(--ava-primary-color, #1e3a8a)', marginTop: '12px', fontWeight: 700, fontSize: '13px', background: '#fff', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                {data.content.imageFootnote}
              </Text>
            </div>
          </div>
        </Col>

        {/* COLUMNA DERECHA (Contenido Principal) */}
        <Col xs={24} md={15}>
          <div style={{ padding: '10px 0' }}>
            
            <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              {/* 💡 IMAGEN 2: Ajustada con preview y placeholder */}
              <Image 
                src={`/assets/blog/${slug}-1.jpg`} 
                alt="Presentación principal"
                width="100%"
                fallback="/assets/curso-dmr/1.jpg"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
                preview={false}
                placeholder={imageLoader}
              />
            </div>

            <Title level={2} style={{ color: 'var(--ava-primary-color)', fontWeight: 700, lineHeight: 1.3, marginBottom: '24px', textAlign: 'justify' }}>
              {data.content.mainTitle}
            </Title>

            <Paragraph style={{ fontSize: '16px', lineHeight: 1.8, color: '#333', textAlign: 'justify' }}>
              {data.content.paragraphs[0]}
            </Paragraph>

            <Row gutter={[16, 16]} align="middle" style={{ margin: '30px 0' }}>
              <Col xs={24} sm={12}>
                <div style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {/* 💡 IMAGEN 3: Ajustada con preview y placeholder */}
                  <Image 
                    src={`/assets/blog/${slug}-2.jpg`} 
                    alt="Detalle exposición"
                    fallback="/assets/curso-dmr/2.jpg"
                    width="100%"
                    preview={false}
                    placeholder={imageLoader}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <Paragraph style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', margin: 0, textAlign: 'justify' }}>
                  {data.content.paragraphs[1]}
                </Paragraph>
              </Col>
            </Row>

            {data.content.paragraphs[2] && (
              <Paragraph style={{ fontSize: '16px', lineHeight: 1.8, color: '#333', textAlign: 'justify', marginBottom: '32px' }}>
                {data.content.paragraphs[2]}
              </Paragraph>
            )}

            <div style={{ textAlign: 'right', borderTop: '1px solid #e8e8e8', paddingTop: '20px' }}>
              <Text style={{ 
                fontStyle: 'italic', 
                fontWeight: 700, 
                color: 'var(--ava-primary-color)', 
                fontSize: '14px',
                letterSpacing: '0.5px'
              }}>
                {data.content.footerQuote}
              </Text>
            </div>

          </div>
        </Col>
      </Row>

    </div>
  );
}