import React from 'react'
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from 'react-router-dom';
import { FlagOutlined, FieldTimeOutlined, CarOutlined, UserOutlined, GlobalOutlined} from '@ant-design/icons';

import icon from '../images/logo.png';

const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size="small"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">F1 Stats</Link>
            </Typography.Title>
            </div>
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
        

    </div>
  )
}

export default Navbar