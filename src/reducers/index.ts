import { ActionTypes, Actions } from "../actions";
import { StateType } from "../global";

export default (state: StateType = { articles: [], count: 0 }, action: ActionTypes) => {
  switch (action.type) {
    case Actions.addArticle:
      return Object.assign({}, state, {articles: [
        ...state.articles,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          createdAt: new Date()
        }
      ]})
    case Actions.increment:
      return Object.assign({}, state, { count: state.count + 1 })
    default:
      return state
  }
}
