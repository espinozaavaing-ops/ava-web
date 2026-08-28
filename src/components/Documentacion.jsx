import React from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';
import { FilePdfFilled, DownloadOutlined } from '@ant-design/icons';
import content from '../content.json';
import '../index.css';
import Separador from './Separador';

const { Title, Paragraph } = Typography;

export default function Documentacion() {
  const docData = content.documentacion;

  return (
    <section id="documentacion" style={{ backgroundColor: '#f8f9fc', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* BLOQUE DE ENCABEZADO */}
        <Row justify="center" style={{ textAlign: 'center', marginBottom: 40 }}>
          <Col xs={24} md={16} lg={12}>
            <Title level={1} className="header-line" style={{ color: 'var(--ava-primary-color)', margin: 0, fontWeight: 700, textAlign: 'center' }}>
              {docData.title}
            </Title>

            <Separador/>

            <Paragraph style={{ fontSize: '18px', color: '#555', lineHeight: 1.6 }}>
              {docData.intro}
            </Paragraph>
          </Col>
        </Row>

        {/* REJILLA DE TARJETAS DE DESCARGA */}
        <Row gutter={[24, 24]} justify="center">
          {docData.files.map((file, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                  border: 'none',
                  height: '100%'
                }}
                bodyStyle={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}
              >
                {/* Ícono de PDF con el color rojo nativo del formato */}
                <FilePdfFilled style={{ fontSize: '3.5rem', color: '#dc3545', marginBottom: 20 }} />
                
                {/* Título del documento */}
                <Title level={4} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ava-primary-color)', minHeight: '48px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {file.title}
                </Title>
                
                {/* Botón de descarga con el atributo HTML 'download' nativo */}
                <div style={{ marginTop: 'auto', width: '100%' }}>
                  <Button
                    type="primary"
                    danger
                    shape="round"
                    icon={<DownloadOutlined />}
                    size="large"
                    href={file.path}
                    download
                    style={{
                      paddingLeft: 24,
                      paddingRight: 24,
                      fontWeight: 600,
                      boxShadow: '0 4px 10px rgba(220, 53, 69, 0.2)'
                    }}
                  >
                    Descargar PDF
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    </section>
  );
}