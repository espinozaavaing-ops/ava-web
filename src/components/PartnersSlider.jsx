import React from 'react';
import { Row, Col, Typography } from 'antd';
import Separador from './Separador';
import '../index.css';

const { Title } = Typography;

const PartnersSlider = ({ partners }) => {
  return (

    <div className="section-container section-white">
      
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24}>
          <Title 
            level={2} 
            style={{ 
              color: 'var(--ava-primary-color)', 
              marginBottom: 20, 
              textAlign: 'center', 
              fontWeight: 700 
            }}
          >
           NUESTROS ALIADOS COMERCIALES
          </Title>
          <Separador />
        </Col>
      </Row>

      {/* BLOQUE 2: EL CONTENIDO (El carrusel) */}
      <Row gutter={[48, 48]}>
        <Col xs={24}>
          <div className="logos-container">
            <div className="logos-slide">
              {/* Primera tanda de logos */}
              {partners.map((partner, index) => (
                <a key={`p1-${index}`} href={partner.url} target="_blank" rel="noopener noreferrer">
                  <img src={partner.img} alt={partner.name} />
                </a>
              ))}
              {/* Segunda tanda para el efecto infinito */}
              {partners.map((partner, index) => (
                <a key={`p2-${index}`} href={partner.url} target="_blank" rel="noopener noreferrer">
                  <img src={partner.img} alt={partner.name} />
                </a>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PartnersSlider;


