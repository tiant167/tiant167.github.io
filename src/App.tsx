import React from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import Detail from './containers/Detail';
import CreateForm from './components/CreateForm';


const store = createStore(rootReducer)

const About = () => (
  <div>About Page</div>
)

function App() {
  return (
    // 要用 HashRouter，因为放在 github page 上 BrowserRouter 会 404
    <Provider store={store}>
      <Router>
        <Layout>
          {/* exact 是因为 / 会匹配所有的 path */}
          <Route exact path="/" component={Home} />
          <Route path="/p/:id" component={Detail} />
          <Route path="/about" component={About} />
          <Route path="/create" component={CreateForm} />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
