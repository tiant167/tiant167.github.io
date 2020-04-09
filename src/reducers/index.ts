import { ActionTypes, Actions } from "../actions";
import { StateType } from "../global";

export default (state: StateType = [], action: ActionTypes) => {
  switch (action.type) {
    case Actions.addArticle:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          createdAt: new Date()
        }
      ]
    default:
      return state
  }
}
