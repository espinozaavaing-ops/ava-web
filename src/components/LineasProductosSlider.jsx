import React from 'react';
import { Carousel, Typography, Card, Button } from 'antd';
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import content from '../content.json';
import Separador from './Separador';
import LazyImage from './LazyImage';

const { Title, Text } = Typography;

// Componente personalizado para la flecha de la izquierda
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      left: '-30px',
      zIndex: 10,
      width: '32px',
      height: '32px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <LeftOutlined style={{ color: 'var(--ava-primary-color)', fontSize: '24px' }} />
    <style>{`.slick-prev::before { display: none !important; }`}</style>
  </div>
);

// Componente personalizado para la flecha de la derecha
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '-30px',
      zIndex: 10,
      width: '32px',
      height: '32px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <RightOutlined style={{ color: 'var(--ava-primary-color)', fontSize: '24px' }} />
    <style>{`.slick-next::before { display: none !important; }`}</style>
  </div>
);

export default function LineasProductosSlider() {
  const navigate = useNavigate();
  
  if (!content.services.LineasProductosSlider?.length) return null;

  return (
    /* 💡 AGREGADO: Clase 'product-slider' para aislar los estilos de este carrusel */
    <div className='section-container product-slider' style={{ padding: '0px 24px', background: '#ffffff00' }}>
      
      {/* 💡 ESTILOS CORREGIDOS: Limitados estrictamente a .product-slider para proteger tu Hero banner */}
      <style>{`
        .product-slider .slick-track {
          display: flex !important;
        }
        .product-slider .slick-slide {
          height: auto !important;
          display: flex !important;
          justify-content: center;
        }
        .product-slider .slick-slide > div {
          width: 100%;
          display: flex;
        }
        .product-slider .slick-slide .ant-image, 
        .product-slider .slick-slide .ant-image-mask,
        .product-slider .slick-slide div[style*="background"] {
          background-color: transparent !important;
          background: transparent !important;
        }
      `}</style>

      <Title
        level={2}
        style={{ textAlign: 'center', color: 'var(--ava-primary-color)', marginBottom: 40, fontWeight: 700 }}
      >
        LÍNEAS DE PRODUCTOS
      </Title>

      <Separador />

      <div style={{ maxWidth: 1200, margin: '10px auto', padding: '0 40px', position: 'relative' }}>
        <Carousel
          autoplay
          autoplaySpeed={4000}
          slidesToShow={3}
          slidesToScroll={1}
          dots
          arrows
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
          responsive={[
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
          ]}
        >
          {content.services.LineasProductosSlider.map((slide, idx) => (
            <div key={idx} style={{ outline: 'none', display: 'flex', height: '100%' }}>
              
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  width: '92%', 
                  margin: '15px auto', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 30px)',
                  background: '#ffffff'
                }}
                styles={{
                  body: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    padding: '24px',
                    textAlign: 'justify'
                  }
                }}
                cover={
                  <div
                    style={{
                      height: 180,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent !important',
                      paddingTop: '20px'
                    }}
                  >
                    <LazyImage
                      src={slide.img}
                      alt={slide.title}
                      width={150}
                      height={150}
                      style={{ 
                        objectFit: 'contain',
                        background: 'transparent'
                      }}
                      preview={false}
                    />
                  </div>
                }
              >
                {/* Contenedor del título y descripción */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Title level={4} style={{ color: 'var(--ava-primary-color)', marginBottom: 12, fontSize: 18, textAlign: 'center' }}>
                    {slide.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 14, lineHeight: 1.5, display: 'block', marginBottom: '20px' }}>
                    {slide.desc}
                  </Text>
                </div>

                {/* Botón de acción empujado uniformemente al fondo de la Card */}
                <div style={{ marginTop: 'auto', paddingTop: '10px', width: '100%' }}>
                  <Button 
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    style={{ 
                      width: '100%', 
                      backgroundColor: '#8cb043', 
                      borderColor: '#8cb043',
                      borderRadius: '8px',
                      fontWeight: 600
                    }}
                    onClick={() => navigate(slide.targetUrl || '/portafolio')}
                  >
                    Ver detalles
                  </Button>
                </div>
              </Card>

            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}