import React from 'react';
import dva from 'dva'
import { Route, Router } from 'dva/router';
import Layout from './components/Layout';
import Home from './components/Home';
import { ActionTypes } from './actions';
import Detail from './routes/Detail';
import CreateForm from './components/CreateForm';

// 创建应用
const app = dva();

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// 注册 Model
app.model({
  namespace: 'count',
  state: { articles: [{id: '123', title:'123', createdAt: new Date(), content: '123'}], count: 0 },
  reducers: {
    addArticle(state, action: ActionTypes) { return Object.assign({}, state, {articles: [
      ...state.articles,
      {
        id: action.id,
        title: action.title,
        content: action.content,
        createdAt: new Date()
      }
    ]}) },
    increment(state) {
      return Object.assign({}, state, { count: state.count + 1 })
    }
  },
  effects: {
    *incrementAsync(action, { call, put }) {
      yield call(delay, 1000)
      // put 不需要 namespace
      yield put({ type: 'increment' })
    }
  },
});

// 注册视图
app.router((api) =>
  <Router history={api!.history}>
    <Layout>
      {/* exact 是因为 / 会匹配所有的 path */}
      <Route exact path="/" component={Home} />
      <Route path="/p/:id" component={Detail} />
      <Route path="/about" component={About} />
      <Route path="/create" component={CreateForm} />
    </Layout>
  </Router>
);

const About = () => (
  <div>About Page</div>
)

export default app
