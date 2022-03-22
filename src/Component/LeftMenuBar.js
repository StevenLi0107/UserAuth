import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Menu } from "antd";
import {
  MailOutlined,PieChartOutlined, DesktopOutlined,ContainerOutlined,   
  AppstoreOutlined,
  SettingOutlined,
  FileImageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function LeftMenuBar() {

  const { SubMenu } = Menu;
  const [collapsed, setcollapsed] = useState(false);
  useEffect(() => {
    // alert(collapsed)
  }, [collapsed])
  
  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };
  function handleClick(e) {
    // console.log('click', e);
  }
  return (
    <div>
      <div style={{  }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          //  onClick={handleClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
         <Menu.Item key="1" icon={<PieChartOutlined />}>
         <Link to="/menu-setting">Menu Setting</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/add-hero-slider">Add Hero Slider</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
          <Link to="/home-page-setting">Home Page Setting</Link>
          </Menu.Item>
        
          <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="/contact-page-setting">Contact Page Setting</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            {" "}
            <Link to="/about-page-setting">About Page Setting</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingOutlined />}>
            {" "}
            <Link to="/blog-page-setting">Blog Page Setting</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FileImageOutlined />}>
            {" "}
            <Link to="/page-banner">Page Banner</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<FileImageOutlined />}>
            {" "}
            <Link to="/footer-setting">Footer Setting</Link>
          </Menu.Item>

          <Menu.Item key="9" icon={<FileImageOutlined />}>
            {" "}
            <Link to="/portfolio-setting">Portfolio  Setting</Link>
          </Menu.Item>
          
         
        
        </Menu>
      </div>
    </div>
  );
}
