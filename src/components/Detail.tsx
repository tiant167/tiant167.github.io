import React from 'react';
import NotFound from './404';
import ReactMarkdown from 'react-markdown'
import { Article } from '../global';
import moment from 'moment';
import css from '../App.module.less'
import Counter from '../routes/Counter';


class Detail extends React.Component<{
  article?: Article,
}> {

  render() {
    if (!this.props.article) {
      return (
        <NotFound />
      )
    }
    return (
      <div>
        <h3>Claps</h3>
        <Counter></Counter>
        {/* <h2>{ this.state.article.title }</h2> */}
        <em>Written in { moment(this.props.article.createdAt).format('YYYY-MM-DD') }</em>
        <ReactMarkdown className={css.DetailMarkdown} source={this.props.article.content} />
      </div>
    )
  }
}

export default Detail
