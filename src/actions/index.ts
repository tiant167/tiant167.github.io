import * as _ from 'lodash'

export enum Actions {
  addArticle = 'count/addArticle',
  increment = 'count/increment',
  incrementAsync = 'count/incrementAsync',
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
