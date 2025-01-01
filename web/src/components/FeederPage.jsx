import React, { useState } from 'react';
import { Layout, List, Typography, Divider, Button, Card } from 'antd';
import {
  PlusOutlined,
  FileTextOutlined,
  MailOutlined,
  FolderOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import './FeederPage.css';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const FeederPage = () => {
  const [activeFilter, setActiveFilter] = useState('所有文章');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      title: 'The Year in Space: Amazon’s Project Kuiper',
      source: 'GeekWire',
      time: '36 分钟前',
      image: 'https://via.placeholder.com/150',
      content: 'Amazon’s Project Kuiper aims to deliver global internet connectivity using satellites.',
    },
    {
      title: 'These Were Our Favorite Tech Stories From Around the Web in 2024',
      source: 'Singularity Hub',
      time: '1 小时前',
      image: 'https://via.placeholder.com/150',
      content: 'A roundup of the most impactful tech stories from 2024.',
    },
    {
      title: 'ByteDance denies reported $7 billion plan for NVIDIA chips',
      source: 'TechNode',
      time: '7 小时前',
      image: 'https://via.placeholder.com/150',
      content: 'ByteDance refutes reports of massive NVIDIA chip purchases for AI expansion.',
    },
  ];

  const filterConfig = {
    '所有文章': {
      title: '所有文章',
      icon: <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      dataSource: articles,
      type: 'filter',
    },
    '未读': {
      title: '未读文章',
      icon: <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      dataSource: articles.slice(0, 2),
      type: 'filter',
    },
    '文件夹 1': {
      title: '文件夹 1',
      icon: <FolderOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      dataSource: articles.slice(0, 1),
      type: 'folder',
    },
    '文件夹 2': {
      title: '文件夹 2',
      icon: <FolderOutlined style={{ marginRight: '8px', color: '#1890ff' }} />,
      dataSource: articles.slice(1, 2),
      type: 'folder',
    },
  };

  const handleFilterClick = (filterKey) => {
    setActiveFilter(filterKey);
    setSelectedArticle(null); // 清空选中状态
  };

  const handleAddFolder = () => {
    console.log('添加文件夹');
  };

  const handleFilterSubscriptions = () => {
    console.log('过滤订阅源');
  };

  return (
    <Layout style={{ background: '#fff', height: '100vh', display: 'flex' }}>
      {/* 左侧内容导航 */}
      <Sider
        width={240}
        style={{
          background: '#f9f9f9',
          padding: '16px',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <List
          size="small"
          bordered={false}
          split={false}
          dataSource={Object.keys(filterConfig).filter((key) => filterConfig[key].type === 'filter')}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleFilterClick(item)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: activeFilter === item ? '#e6f4ff' : 'transparent',
              }}
              className="nav-item-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {filterConfig[item].icon}
                <Text strong>{item}</Text>
              </div>
            </List.Item>
          )}
        />

        <Divider />

        {/* 文件夹部分 */}
        <List
          size="small"
          bordered={false}
          split={false}
          dataSource={Object.keys(filterConfig).filter((key) => filterConfig[key].type === 'folder')}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleFilterClick(item)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: activeFilter === item ? '#e6f4ff' : 'transparent',
              }}
              className="nav-item-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {filterConfig[item].icon}
                <Text strong>{item}</Text>
              </div>
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          style={{
            marginTop: '8px',
            transition: 'all 0.3s',
            borderRadius: '4px',
          }}
          className="nav-item-hover"
          onClick={handleAddFolder}
        >
          添加文件夹
        </Button>

        <Divider />

        {/* 过滤订阅源 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          className="nav-item-hover"
          onClick={handleFilterSubscriptions}
        >
          <FilterOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          <Text type="secondary">过滤订阅源</Text>
        </div>
      </Sider>

      {/* 中间文章列表 */}
      <Content
        style={{
          flex: '1 1 auto',
          padding: 0,
          borderRight: '1px solid #f0f0f0',
          overflowY: 'auto',
          minWidth: '400px',
        }}
      >
        <Title level={4} style={{ marginTop: '12px', paddingLeft: '15px',paddingBottom: '15px',borderBottom: '1px solid #f0f0f0' }}>
          {filterConfig[activeFilter].title}
        </Title>
        <List
          itemLayout="vertical"
          dataSource={filterConfig[activeFilter].dataSource}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              style={{
                cursor: 'pointer',
                padding: '0px 16px',
                transition: 'all 0.3s',
                backgroundColor: selectedArticle?.title === item.title ? '#e6f4ff' : 'transparent',
                borderLeft: selectedArticle?.title === item.title ? '3px solid #1890ff' : '3px solid transparent'
              }}
              className="article-item-hover"
              onClick={() => setSelectedArticle(item)}
            >
              <List.Item.Meta
                title={
                  <a style={{ 
                    color: selectedArticle?.title === item.title ? '#1890ff' : 'rgba(0, 0, 0, 0.85)'
                  }}>
                    {item.title}
                  </a>
                }
                description={`${item.source} · ${item.time}`}
              />
            </List.Item>
          )}
        />
      </Content>

      {/* 右侧详细内容 */}
      <Content
        style={{
          flex: '0 0 650px',  
          overflowY: 'auto',
         
          
        }}
      >
        {selectedArticle ? (
          <Card
            title={selectedArticle.title}
            bordered={false}
          >
            <Text type="secondary">
              {selectedArticle.source} · {selectedArticle.time}
            </Text>
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                margin: '16px 0',
              }}
            />
            <p>{selectedArticle.content}</p>
          </Card>
        ) : (
          <Text type="secondary">未选择文章。在左边的栏中打开一个文章来开始阅读。</Text>
        )}
      </Content>
    </Layout>
  );
};

export default FeederPage;
