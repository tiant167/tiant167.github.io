import * as _ from 'lodash'

export enum Actions {
  addArticle = 'ADD_ARTICLE'
}
export const addArticle = (title: string, content: string) => ({
  type: Actions.addArticle,
  title,
  id: _.kebabCase(title),
  content,
})


export type ActionTypes = ReturnType<typeof addArticle>
