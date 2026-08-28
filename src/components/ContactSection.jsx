import React from 'react';
import { Row, Col, Typography, Form, Input, Button, Image } from 'antd';
import { WhatsAppOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import content from '../content.json';
import images from '../images.json';
import Separador from './Separador';

const { Title, Paragraph, Text } = Typography;

// 💡 ESTILOS EXTRACTADOS (Mismo patrón que tus otros componentes)
const mainContainerStyle = {
  background: '#f8f9fa',
  padding: '60px 24px',
};

const titleStyle = {
  color: 'var(--ava-primary-color)',
  fontWeight: 700,
  marginBottom: 20,
};

const paragraphStyle = {
  fontSize: 16,
  color: '#555',
  lineHeight: 1.8,
  marginBottom: 24,
  textAlign: 'justify',
};

const locationLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 600,
};

const imageStyle = {
  borderRadius: 16,
  objectFit: 'cover',
  border: '6px solid #ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const submitButtonStyle = {
  backgroundColor: '#25D366',
  borderColor: '#25D366',
  borderRadius: 8,
  fontWeight: 600,
  width: '100%',
};

export default function ContactSection() {
  const [form] = Form.useForm();

  const enviarWhatsApp = (values) => {
    const numeroTelefono = "+584141989331";
    const { name, message: userMessage } = values;

    const opcionesHora = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const currentTime = new Date().toLocaleDateString('es-ES', opcionesHora);
    const textoMensaje = `*Mensaje de contacto desde avaingenieria.com*\n*Fecha y hora:* ${currentTime}\n\n*Nombre:* ${name}\n*Mensaje:* ${userMessage}`;
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(textoMensaje)}`;

    window.open(urlWhatsApp, '_blank');
    form.resetFields();
  };

  return (
    <div className="section-container" style={mainContainerStyle}>
      
      {/* 📍 SECCIÓN 1: NUESTRAS UBICACIONES */}
      <Row gutter={[48, 48]} align="middle" style={{ marginBottom: 48 }}>
  {/* Columna Izquierda: Ocupa el 50% en pantallas medianas/grandes (md={12}) */}
  <Col xs={24} md={12}>
    <Title level={2} style={titleStyle}>
      Nuestras ubicaciones
    </Title>
    <Paragraph style={paragraphStyle}>
      <Text strong>AVA Ingeniería</Text> tiene presencia en ubicaciones estratégicamente posicionadas a lo largo del territorio venezolano para brindar servicio a nuestros potenciales clientes.
    </Paragraph>
    
    {/* 💡 NUEVA SUB-GRILLA INTERNA PARA EL RETÍCULO 2X2 */}
    <Row gutter={[24, 24]}> 
      
      {/* 1. Zona Centro */}
      <Col xs={24} sm={12}>
        <Paragraph style={{ ...paragraphStyle, marginBottom: 0 }}>
          <Text style={{ color: 'var(--ava-primary-color)' }}>
            <EnvironmentOutlined /> <a href="https://maps.app.goo.gl/njUuXsGDYbSMGjd26" target="_blank" rel="noreferrer" style={locationLinkStyle}>Zona Centro:</a>
          </Text>
          <br />Caracas, Distrito Capital 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Victor Valecillos
          </Text>
          <br /><PhoneOutlined /> 0414-8140463 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Amilcar Mestre
          </Text>
          <br /><PhoneOutlined /> 0414-1163330
        </Paragraph>
      </Col>

      {/* 2. Zona Oriente (El Tigre) */}
      <Col xs={24} sm={12}>
        <Paragraph style={{ ...paragraphStyle, marginBottom: 0 }}>
          <Text style={{ color: 'var(--ava-primary-color)' }}>
            <EnvironmentOutlined /> <a href="https://maps.app.goo.gl/RagnFkJYZeQNJV6L9" target="_blank" rel="noreferrer" style={locationLinkStyle}>Zona Oriente:</a>
          </Text>
          <br />El Tigre, Anzoátegui 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Endrih Castellanos
          </Text>
          <br /><PhoneOutlined /> 0414-1989331 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Andres Orozco
          </Text>
          <br /><PhoneOutlined /> 0424-8790342
        </Paragraph>
      </Col>

      {/* 3. Zona Oriente (Punto Fijo) */}
      <Col xs={24} sm={12}>
        <Paragraph style={{ ...paragraphStyle, marginBottom: 0 }}>
          <Text style={{ color: 'var(--ava-primary-color)' }}>
            <EnvironmentOutlined /> <a href="https://maps.app.goo.gl/h56babFebuEacUqG9" target="_blank" rel="noreferrer" style={locationLinkStyle}>Zona Occidente:</a>
          </Text>
          <br />Punto Fijo, Falcón 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Enrique Rodriguez
          </Text>
          <br /><PhoneOutlined /> 0424-8218315
        </Paragraph>
      </Col>

      {/* 4. Zona Occidente */}
      <Col xs={24} sm={12}>
        <Paragraph style={{ ...paragraphStyle, marginBottom: 0 }}>
          <Text style={{ color: 'var(--ava-primary-color)' }}>
            <EnvironmentOutlined /> <a href="https://maps.app.goo.gl/CyeetceGCRktxRhBA" target="_blank" rel="noreferrer" style={locationLinkStyle}>Zona Occidente:</a>
          </Text>
          <br />Maracaibo, Zulia 
          <br />
          <Text strong style={{ color: 'var(--ava-primary-color)' }}>
            Romulo Gonzalez
          </Text>
          <br /><PhoneOutlined /> 0414-6309059
        </Paragraph>
      </Col>

    </Row>
  </Col>
  
  {/* Columna Derecha: Se mantiene fija al 50% al lado de toda la información */}
  <Col xs={24} md={12}>
    <Image 
      src={images.ubicaAva} 
      alt="Ubicaciones AVA"
      width="100%"
      style={imageStyle}
      preview
    />
  </Col>
</Row>

      <Separador />

      {/* 📩 SECCIÓN 2: FORMULARIO DE CONTACTO */}
      <Row gutter={[48, 48]} align="middle" style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Title level={2} style={{ ...titleStyle, textAlign: 'center', marginBottom: 12 }}>
            ¡Contáctanos por WhatsApp!
          </Title>
        </Col>
      </Row>

      <Row gutter={[48, 48]} align="middle">

        <Col xs={24} md={12}>
          <Form
            form={form}
            layout="vertical"
            onFinish={enviarWhatsApp}
            autoComplete="off"
          >
            <Form.Item
              label={<Text strong>Nombre Completo</Text>}
              name="name"
              rules={[{ required: true, message: 'Por favor, introduzca su nombre.' }]}
            >
              <Input size="large" placeholder="Introduzca su nombre" style={{ borderRadius: 6 }} />
            </Form.Item>

            <Form.Item
              label={<Text strong>Email (Opcional)</Text>}
              name="email"
              rules={[{ type: 'email', message: 'Por favor, introduzca un email válido.' }]}
            >
              <Input size="large" placeholder="Introduzca su email" style={{ borderRadius: 6 }} />
            </Form.Item>

            <Form.Item
              label={<Text strong>Mensaje</Text>}
              name="message"
              rules={[{ required: true, message: 'Por favor, escriba su mensaje.' }]}
            >
              <Input.TextArea rows={5} placeholder="Escriba su mensaje aquí..." style={{ borderRadius: 6 }} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                icon={<WhatsAppOutlined />}
                style={submitButtonStyle}
              >
                Contactar por WhatsApp
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </div>
  );
}