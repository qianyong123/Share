import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.less';
import router from './router'
import Header from '@/components/Header'
// import Footers from '@/components/Footer'



const {Footer, Content } = Layout;

class App extends React.Component {

  render() {
    return (
      <Router>
        <Layout style={{height:'100%'}}>
          <Header />
          <Content className="Content">
            <Switch>
              {
                router.map(r => {
                  return (
                    <Route key={r.path} exact={r.exact || false} path={r.path}>
                      {r.component}
                    </Route>
                  )
                })
              }
               <Redirect form="*" to="/error" />
            </Switch>
          </Content>
          {/* <Footer>
            <Footers />
          </Footer> */}
        </Layout>
     
      </Router>



    )
  }
}



export default App;
