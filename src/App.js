import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from './util/loadable'
import './App.less';
import router, { routerChild } from './router'
import Headers from '@/components/Header'
import Footers from '@/components/Footer'

const Home = loadable(() => import('./pages/Home'))
const Note = loadable(() => import('./pages/Note'))
const Detail = loadable(() => import('./pages/Detail'))
const UploadText = loadable(() => import('./pages/UploadText'))
const Admin = loadable(() => import('./pages/Admin'))
const Error = loadable(() => import('./pages/Error'))

const { Footer, Content } = Layout;

// const Home2 = () => {
//   <Layout style={{ height: '100%' }}>
//     <Headers />
//     <Content className="Content">
//       <Switch>     
//         {/* {
//         router.map(r => {
//           return (
//             <Route key={r.path} exact={r.exact || false} path={r.path}>
//               {r.component}
//             </Route>
//           )
//         })
//       } */}
//       {/* <Redirect form="*" to="/error" /> */}
//       </Switch>
//     </Content>
//     <Footer>
//       <Footers />
//     </Footer>
//   </Layout>
// }

class App extends React.Component {

  componentDidMount() {
    console.log('首次渲染')
  }



  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {
            routerChild.map(r => {
              return (
                <Route key={r.path} path={r.path} component={r.component} />
              )
            })
          }
          <Route path="/Admin" component={Admin} />
          <Route path="/error" component={Error} />
          <Redirect form="*" to="/" />
        </Switch>

      </Router>



    )
  }
}



export default App;
