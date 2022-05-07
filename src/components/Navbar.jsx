import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from 'react-router-dom';
import { FlagOutlined, FieldTimeOutlined, CarOutlined, UserOutlined, GlobalOutlined, MenuOutlined} from '@ant-design/icons';

import icon from '../images/logo.png';

const Navbar = () => {
const [activeMenu, setActiveMenu] = useState(true);
const [screenSize, setScreenSize] = useState(null);

useEffect(() => {
const handleResize = () => setScreenSize(window.innerWidth);

window.addEventListener('resize', handleResize);

handleResize();

return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
if (screenSize <= 800) {
  setActiveMenu(false);
} else {
  setActiveMenu(true);
}
  }, [screenSize]);

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} shape="square" size="small"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Serverstone</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
              <MenuOutlined/>
              </Button>
            </div>
            {activeMenu && (
              <Menu theme="dark">
           <Menu.Item icon={<CarOutlined />}>
             <Link to="/">Home</Link>
           </Menu.Item>
           <Menu.Item icon={<FieldTimeOutlined />}>
             <Link to="/standings">Standings</Link>
           </Menu.Item>
           <Menu.Item icon={<UserOutlined />}>
             <Link to="/schedule">Schedule</Link>
           </Menu.Item>
           <Menu.Item icon={<GlobalOutlined />}>
             <Link to="/news">News</Link>
           </Menu.Item>
           <Menu.Item icon={<FlagOutlined/>}>
             <Link to="/trackmap">Track Map</Link>
           </Menu.Item>
         </Menu>
            )}
         
        

    </div>
  )
}

export default Navbar