import { Card, Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function LineasProductosCard({ title, description, image }) {
  return (
    <Card
      hoverable
      style={{ borderRadius: 12, overflow: 'hidden', height: '100%', textAlign: 'justify' }}
      cover={
        image ? (
          <div style={{ height: 200, overflow: 'hidden' }}>
            <Image
              src={image}
              alt={title}
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              preview={false}
            />
          </div>
        ) : null
      }
      styles={{ body: { textAlign: 'center', padding: 24 } }}
    >
      <Title level={4} style={{ color: 'var(--ava-primary-color)', marginBottom: 12, }}>
        {title}
      </Title>
      <Paragraph style={{ color: '#666', margin: 0 }}>{description}</Paragraph>
    </Card>
  );
}
