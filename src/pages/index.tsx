import React from 'react';
import css from './index.less';
import Category from '@/components/Category';
import articles from '../assets/articles';

// global.less 并没有成功

export default class Index extends React.Component<
  {},
  { articles: Article[] }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.setState({
      articles,
    });
  }

  render() {
    return (
      <div>
        <h1 className={css.CategoryHeader}>My Blog</h1>
        <Category data={this.state.articles} />
      </div>
    );
  }
}
