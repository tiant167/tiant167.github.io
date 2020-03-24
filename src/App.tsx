import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'
import Detail from './components/Detail';
import data from './data'

const About = () => (
  <div>About Page</div>
)

function App() {
  return (
    // 要用 HashRouter，因为放在 github page 上 BrowserRouter 会 404
    <Router>
      <Layout>
        {/* exact 是因为 / 会匹配所有的 path */}
        <Route exact path="/" render={(props) => <Home { ...props } data={data}/>}  />
        <Route path="/p/:id" component={Detail} />
        <Route path="/about" component={About} />
      </Layout>
    </Router>
  );
}

export default App;
