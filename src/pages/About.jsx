import { Typography, Card, Row, Col,  Timeline, Space } from 'antd';
import {
  TrophyOutlined,
  BulbOutlined,
  HeartOutlined,
  SafetyOutlined,
  RiseOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import AboutSection from '../components/AboutSection';
import HistoryTimeline from '../components/HistoryTimeline';
import AliadosDestacados from '../components/AliadosDestacados';

const { Title, Paragraph, Text } = Typography;

const principles = [
  {
    icon: <SafetyOutlined style={{ fontSize: 32, color: '#9ac931' }} />,
    title: 'Confiabilidad',
    desc: 'Cumplimos cada compromiso con precisión técnica.',
  },
  {
    icon: <BulbOutlined style={{ fontSize: 32, color: '#9ac931' }} />,
    title: 'Innovación',
    desc: 'Integramos tecnología de punta en cada proyecto.',
  },
  {
    icon: <HeartOutlined style={{ fontSize: 32, color: '#9ac931' }} />,
    title: 'Empatía',
    desc: 'Entendemos las necesidades reales de nuestros clientes.',
  },
  {
    icon: <TrophyOutlined style={{ fontSize: 32, color: '#9ac931' }} />,
    title: 'Integridad',
    desc: 'Actuamos con ética y transparencia.',
  },
  {
    icon: <RiseOutlined style={{ fontSize: 32, color: '#9ac931' }} />,
    title: 'Competitividad',
    desc: 'Ofrecemos la mejor relación costo-beneficio.',
  },
];

const historyItems = [
  { children: '2001 — AVA Ingeniería inicia operaciones en Caracas.' },
  { children: '2005 — Expansión a la zona occidental (Maracaibo).' },
  { children: '2010 — Apertura de sede en zona oriente (El Tigre).' },
  { children: '2015 — Alianzas con Telrad, Autrol, Tek-Trol y Belfone.' },
  { children: '2020 — Más de 50 proyectos entregados en automatización y control.' },
  { children: '2024 — Presencia en Rockwell Automation Fair.' },
];

const locations = [
  {
    zone: 'Zona Centro',
    address: 'Torre Country, 11th Floor, Caracas, Venezuela',
  },
  {
    zone: 'Zona Occidente',
    address: 'Calle 73, Avenida 15A, Maracaibo, Estado Zulia',
  },
  {
    zone: 'Zona Oriente',
    address: 'C.C Los Pinos Local 2-1-FM2-21, El Tigre, Estado Anzoátegui',
  },
];

export default function About() {
  return (
    <>
      <AboutSection />

      <div className="section-container" style={{ backgroundColor: '#f8f9fc'}}>
        <Title level={2} style={{ textAlign: 'center', color: 'var(--ava-primary-color)', marginBottom: 16, fontWeight: 700 }}>
          NUESTROS PRINCIPIOS
        </Title>
        <Paragraph
          type="secondary"
          style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}
        >
          Valores que guían cada uno de nuestros proyectos y relaciones.
        </Paragraph>
        <Row 
          gutter={[24, 24]} 
          justify="center" 
          style={{ display: 'flex', flexWrap: 'wrap' }} // Asegura el comportamiento Flex
        >
          {principles.map((p, idx) => (
            <Col 
              key={idx}
              xs={24} 
              sm={12} 
              // En escritorio (md), anulamos el sistema de 24 columnas y le damos un ancho mínimo cómodo
              style={{ flex: '1 1 220px', maxWidth: '280px' }} 
            >
              {/* 💡 CORRECCIÓN: Eliminamos 'hoverable' y añadimos cursor: 'default' */}
              <Card
                style={{ 
                  borderRadius: 12, 
                  textAlign: 'center', 
                  height: '100%',
                  cursor: 'default' // Evita que aparezca la mano de clic al pasar el mouse
                }}
              >
                <Space direction="vertical" size="small">
                  {p.icon}
                  <Title level={4} style={{ margin: 0, color: 'var(--ava-primary-color)' }}>
                    {p.title}
                  </Title>
                  <Text type="secondary">{p.desc}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <AliadosDestacados/>

      <HistoryTimeline/>

    </>
  );
}
