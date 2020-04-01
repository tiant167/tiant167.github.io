import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import moment from 'moment';
import css from './detail.less'
import articles from '../../data/articles'


export default class Detail extends React.Component<RouteComponentProps<{id: string}>, {article?: any,content: string}> {
  constructor(props: RouteComponentProps<{id: string}>) {
    super(props)
    const { match: { params } } = props;
    const id = params.id
    const article = articles.find(item => item.id === id)
    this.state = {
      article,
      content: '',
    }
  }

  async componentDidMount() {
    if (this.state.article) {
      console.log('111111111', this.state.article.content)
      const file = await fetch(this.state.article.content)
      const content = await file.text()

      console.log('this.state.article', content)
      this.setState({
        content,
      })
    }
  }

  render() {
    if (!this.state.article) {
      return (
        <Redirect to="/404" />
      )
    }
    return (
      <div>
        {/* <h2>{ this.state.article.title }</h2> */}
        <em>Written in { moment(this.state.article.createdAt).format('YYYY-MM-DD') }</em>
        <ReactMarkdown className={css.DetailMarkdown} source={this.state.content} />
      </div>
    )
  }
}
