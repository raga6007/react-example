// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    UserOutlined,
    LoadingOutlined
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    UserOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
  };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
          id: 'util-typography',
          title: 'View User',
          type: 'item',
          url: '/user/list',
          icon: icons.UserOutlined
      },
      {
        id: 'util-color',
        title: 'Color',
        type: 'item',
        url: '/color',
        icon: icons.BgColorsOutlined
      },
      {
        id: 'util-shadow',
        title: 'Shadow',
        type: 'item',
        url: '/shadow',
        icon: icons.BarcodeOutlined
      },
      {
        id: 'ant-icons',
        title: 'Ant Icons',
        type: 'item',
        url: '/icons/ant',
        icon: icons.AntDesignOutlined,
        breadcrumbs: false
      }
    ]
  };
  
  export default utilities;
  