import Link from 'next/link'
import { Layout, Menu } from 'antd';

const {Header, } = Layout
const MyHeader = () => {
  return (
    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
          <Link href="/">
            <a>Home</a>
          </Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link href="/about">
            <a>About</a>
          </Link>
          </Menu.Item>
        </Menu>
      </Header>
  )
}

export default MyHeader
