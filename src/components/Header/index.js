
import React, { useState, useEffect, useRef } from 'react'
import {
  Link,
  useLocation
} from "react-router-dom";
import { Menu, Layout } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import router from '@/router'

const { SubMenu } = Menu;
const { Header } = Layout;
const styles = { fontSize: '16px', fontWeight: '400' }

function Index() {
  const [iswidth, setIsWidth] = useState(true)
  const [navs, setNavs] = useState([])
  const [pathname, setPathname] = useState('/Home')
  const path = useLocation().pathname
  const refPath = useRef()

  useEffect(() => {
    const navs2 = router.filter(i => i.hide !== true)
    setNavs(navs2)
    if (document.body.clientWidth > 800) {
      setIsWidth(true)
    } else setIsWidth(false)

    window.onresize = function () {
      if (document.body.clientWidth > 800) {
        setIsWidth(true)
      } else setIsWidth(false)
    }

  }, [])

  useEffect(() => {

    if (path === '/Detail') {
      setPathname(refPath.current)
    } else {
      refPath.current = path
      setPathname(path)
    }
  })

  if (path === '/error' || path === '/admin') {
    return null
  }

  return (
    <Header className="headersBox">
      <div className="headers">
        <h2>Share</h2>
        {
          iswidth
            ?
            <Menu selectedKeys={[pathname === '/' ? '/Home' : pathname]} mode="horizontal">
              {navs.map(item => {
                return (
                  <Menu.Item key={item.path}>
                    <Link style={styles} to={item.path}>{item.name}</Link>
                  </Menu.Item>
                )
              })}
            </Menu>
            :
            <Menu selectedKeys={[pathname === '/' ? '/Home' : pathname]}>
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
    </Header>
  );
}



export default Index
