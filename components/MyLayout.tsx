import { FunctionComponent } from "react";
import { Layout } from 'antd';
import MyHeader from "./MyHeader";
import '../styles.less'

const {Content, Footer} = Layout

const MyLayout: FunctionComponent = props => {
  return (
    <Layout>
      <MyHeader />
      <Content style={{ padding: '50px',marginTop: 64 }}>{props.children}</Content>
      <Footer style={{ textAlign: 'center' }}>Created by <a href="https://github.com/tiant167">@tiant167</a></Footer>
    </Layout>
  )
}
export default MyLayout
