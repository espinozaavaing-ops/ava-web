import React from 'react';
import { Row, Col, Typography, Timeline } from 'antd';
import content from '../content.json';
import Separador from './Separador';
import '../index.css';

const { Title, Paragraph } = Typography;

export default function HistoryTimeline() {
  
  // Mapeamos los datos del JSON
  const timelineItems = content.history.map((item, index) => ({
    // Pasamos el año como el "dot" personalizado
    dot: <div className="custom-timeline-year-dot">{item.year}</div>,
    children: (
      // Aplicamos tu clase de tarjeta estilizada
      <div className="timeline-card-event">
        <Title level={5} style={{ marginTop: 0, marginBottom: 6, color: 'var(--ava-primary-color)', fontWeight: 600 }}>
          {item.title}
        </Title>
        <Paragraph style={{ color: '#444', lineHeight: 1.7, margin: 0, fontSize: '14.5px' }}>
          {item.desc}
        </Paragraph>
      </div>
    ),
  }));

  return (
    <div className="section-container section-white">
      
      {/* ENCABEZADO BASE DE TUS SECCIONES */}
      <Row gutter={[48, 48]} align="middle">
        <Col xs={24}>
          <Title 
            level={2} 
            style={{ color: 'var(--ava-primary-color)', marginBottom: 20, textAlign: 'center', fontWeight: 700 }}
          >
            Nuestra Historia
          </Title>
          <Separador />
        </Col>
      </Row>

      {/* LÍNEA TEMPORAL MAQUETADA */}
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col xs={24} md={20} lg={16}>
          <div className="history-timeline-container">
            <Timeline
              mode="left" // Línea a la izquierda, igual que tu diseño en Bootstrap
              items={timelineItems}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}