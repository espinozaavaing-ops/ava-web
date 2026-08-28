const theme = {
  token: {
    colorPrimary: '#0f3b6e',
    colorSuccess: '#9ac931',
    colorInfo: '#4a90e2',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorTextBase: '#333333',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    fontFamily:
      "'Montserrat', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 16,
    borderRadius: 8,
    controlHeight: 40,
    lineHeight: 1.6,
    colorBorder: '#e5e4e7',
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 40,
      primaryShadow: '0 2px 0 rgba(15, 59, 110, 0.1)',
    },
    Card: {
      borderRadius: 12,
      paddingLG: 24,
    },
    Menu: {
      itemBg: 'transparent',
      horizontalItemSelectedColor: '#9ac931',
      itemSelectedColor: '#9ac931',
      darkItemBg: 'var(--ava-primary-color)',
      itemBorderRadius: 8,
    },
    Carousel: {
      dotActiveWidth: 32,
      dotHeight: 4,
      dotWidth: 16,
    },
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 72,
      footerBg: 'var(--ava-primary-color)',
      bodyBg: '#ffffff',
    },
    Input: {
      borderRadius: 8,
      controlHeight: 44,
      paddingInline: 16,
    },
    Typography: {
      titleFontWeight: 700,
    },
    Form: {
      itemMarginBottom: 20,
      labelFontSize: 14,
    },
    Tag: {
      borderRadiusSM: 4,
    },
    Timeline: {
      dotBorderWidth: 2,
    },
  },
};

export default theme;
