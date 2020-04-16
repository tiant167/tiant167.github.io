import { StateType } from "../global"
import { ActionTypes, Actions } from "../actions"
import Counter from "../components/Counter"
import { connect } from "dva"

const mapStateToProps = (state: StateType) => ({
  count: state.count.count
})

const mapDispatchToProps = (dispatch: React.Dispatch<ActionTypes>) => ({
  onIncrement: () => dispatch({ type: Actions.increment }),
  onIncrementAsync: () => dispatch({ type: Actions.incrementAsync }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
