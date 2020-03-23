import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Detail from './components/Detail';
import data from './data'

const About = () => (
  <div>About Page</div>
)

function App() {
  return (
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
