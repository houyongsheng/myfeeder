import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BookOutlined, PlusOutlined } from '@ant-design/icons';
import FeederPage from './components/FeederPage';

const { Sider, Content } = Layout;

// 菜单项配置
const menuItems = [
  { key: '1', icon: <HomeOutlined />, label: '主页' },
  { key: '2', icon: <BookOutlined />, label: '规则' },
  { key: '3', icon: <PlusOutlined />, label: '添加订阅' },
];

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧导航栏 */}
      <Sider
        width={200}
        theme="dark"
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            height: '32px',
            margin: '16px',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            marginTop: '-10px'
          }}
        >
          MyFeeder
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>

      {/* 主体内容 */}
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ backgroundColor: '#f0f2f5' }}>
          <FeederPage />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
