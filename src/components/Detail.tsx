import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import data from '../data'
import NotFound from './404';
import ReactMarkdown from 'react-markdown'
import { Article } from '../global';
import moment from 'moment';

export default class Detail extends React.Component<RouteComponentProps<{id: string}>, {article?: Article,content: string}> {
  constructor(props: RouteComponentProps<{id: string}>) {
    super(props)
    const { match: { params } } = props;
    const id = params.id
    const article = data.find(item => item.id === id)
    this.state = {
      article,
      content: '',
    }
  }

  async componentDidMount() {
    if (this.state.article) {
      const content = await fetch(this.state.article.content)
      this.setState({
        content: await content.text(),
      })
    }
  }

  render() {
    if (!this.state.article) {
      return (
        <NotFound />
      )
    }
    return (
      <div>
        {/* <h2>{ this.state.article.title }</h2> */}
        <em>Written in { moment(this.state.article.createdAt).format('YYYY-MM-DD') }</em>
        <ReactMarkdown source={this.state.content} />
      </div>
    )
  }
}