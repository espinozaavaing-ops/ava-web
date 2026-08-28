import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Image, Row, Col, Grid, Badge, Space } from 'antd';
import { MenuOutlined, PhoneOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useQuoteCart } from '../context/QuoteContext';
import content from '../content.json';
import images from '../images.json';

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function NavBar({ onOpenCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const [isScrolled, setIsScrolled] = useState(false);

  const { cart } = useQuoteCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPath = location.pathname;

  const activeLink = content.navbar.links.find((link) => {
    if (link.path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(link.path);
  });

  const selectedKey = activeLink ? activeLink.path : '/';

  const menuItems = content.navbar.links.map((link) => ({
    key: link.path,
    label: link.label,
  }));

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setDrawerOpen(false);
  };

  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: screens.md ? '0 48px' : '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <Row align="middle" gutter={12} style={{ flex: screens.md ? 'none' : 1 }}>
          <Col>
            <Image
              src={images.logo}
              alt="AVA Ingeniería"
              preview={false}
              height={52}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </Col>
          {screens.md && (
            <Col>
              <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--ava-primary-color)' }}>
                {content.navbar.brand}
              </span>
            </Col>
          )}
        </Row>

        {screens.md ? (
          <>
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{
                flex: 1,
                justifyContent: 'center',
                minWidth: 0,
                borderBottom: 'none',
              }}
            />
            <Space size="middle">
              <Badge count={totalItems} overflowCount={99} showZero={false}>
                <Button 
                  icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />} 
                  onClick={onOpenCart}
                >
                  Cotización
                </Button>
              </Badge>

              <Button type="primary" icon={<PhoneOutlined />} onClick={() => navigate('/contact')}>
                Contáctanos
              </Button>
            </Space>
          </>
        ) : (
          <Space size="small">
            <Badge count={totalItems} overflowCount={99} showZero={false}>
              <Button
                type="text"
                icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
                onClick={onOpenCart}
              />
            </Badge>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setDrawerOpen(true)}
            />
          </Space>
        )}
      </Header>

      <Drawer
        title={
          <span style={{ fontWeight: 700, color: 'var(--ava-primary-color)' }}>{content.navbar.brand}</span>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderInlineEnd: 'none' }}
        />
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Badge count={totalItems} overflowCount={99} showZero={false} style={{ width: '100%' }}>
            <Button
              block
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                onOpenCart();
                setDrawerOpen(false);
              }}
            >
              Ver Cotización ({totalItems})
            </Button>
          </Badge>

          <Button
            type="primary"
            block
            icon={<PhoneOutlined />}
            onClick={() => {
              navigate('/contact');
              setDrawerOpen(false);
            }}
          >
            Contáctanos
          </Button>
        </div>
      </Drawer>
    </>
  );
}