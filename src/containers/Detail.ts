import { StateType } from "../global";
import { connect } from "react-redux";
import Detail from "../components/Detail";
import { RouteComponentProps } from "react-router-dom";
import { Actions, ActionTypes } from "../actions";
import { Dispatch } from "react";

const mapStateToProps = (state: StateType, ownProps: RouteComponentProps<{id: string}>) => {
  const { match: { params } } = ownProps
  const id = params.id
  return {
    article: state.articles.find(item => item.id === id),
    count: state.count,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  onIncrement: () => dispatch({ type: Actions.increment }),
  onIncrementAsync: () => dispatch({ type: Actions.incrementAsync }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
