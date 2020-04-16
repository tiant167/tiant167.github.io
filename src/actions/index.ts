import * as _ from 'lodash'

export enum Actions {
  addArticle = 'ADD_ARTICLE',
  increment = 'INCREMENT',
  incrementAsync = 'INCREMENT_ASYNC',
}
export const addArticle = (title: string, content: string) => ({
  type: Actions.addArticle,
  title,
  id: _.kebabCase(title),
  content,
})

export const increment = () => ({
  type: Actions.increment
})

export type ActionTypes = any
