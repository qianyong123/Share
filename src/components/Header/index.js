
import React, { useState, useEffect } from 'react'
import {
  Link,
} from "react-router-dom";
import { Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import router from '@/router'

const { SubMenu } = Menu;


function Index(props) {

  const [current, setCurrent] = useState('/home')
  const [iswidth, setIsWidth] = useState(true)
  const navs = router.filter(i => i.hide !== true)
  useEffect(() => {
    if (document.body.clientWidth > 800) {
      setIsWidth(true)
    } else setIsWidth(false)

    window.onresize = function () {
      if (document.body.clientWidth > 800) {
        setIsWidth(true)
      } else setIsWidth(false)
    }

  }, [])

  const handleClick = e => {
    setCurrent(e.key);
  };

  const styles = {fontSize:'16px',fontWeight:'400'}
  
  return (
    <div className="headers">
      <h2>Share</h2>
      <div>
        {
          iswidth
            ?
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              {navs.map(item => {
                return (
                  <Menu.Item key={item.path}>
                    <Link style={styles} to={item.path}>{item.name}</Link>
                  </Menu.Item>
                )
              })}
            </Menu>
            :

            <Menu onClick={handleClick} selectedKeys={[current]}>

              <SubMenu icon={<UnorderedListOutlined style={{ fontSize: "20px" }} />}>
                {navs.map(item => {
                  return (
                    <Menu.Item key={item.path}>
                      <Link style={styles} to={item.path}>{item.name}</Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            </Menu>
        }
      </div>
    </div>
  );
}



export default Index
