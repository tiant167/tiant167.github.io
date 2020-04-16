import React from 'react';
import NotFound from './404';
import ReactMarkdown from 'react-markdown'
import { Article } from '../global';
import moment from 'moment';
import css from '../App.module.less'
import Counter from './Counter';


export default class Detail extends React.Component<{
  article?: Article,
  count: number,
  onIncrement: React.EventHandler<any>,
  onDecrement: React.EventHandler<any>,
  onIncrementAsync: React.EventHandler<any>
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
        <Counter
          count={this.props.count}
          onIncrement={this.props.onIncrement}
          onIncrementAsync={this.props.onIncrementAsync}
         ></Counter>
        {/* <h2>{ this.state.article.title }</h2> */}
        <em>Written in { moment(this.props.article.createdAt).format('YYYY-MM-DD') }</em>
        <ReactMarkdown className={css.DetailMarkdown} source={this.props.article.content} />
      </div>
    )
  }
}
