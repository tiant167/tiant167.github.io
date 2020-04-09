import { StateType } from "../global";
import { connect } from "react-redux";
import Detail from "../components/Detail";
import { RouteComponentProps } from "react-router-dom";

const mapStateToProps = (state: StateType, ownProps: RouteComponentProps<{id: string}>) => {
  const { match: { params } } = ownProps
  const id = params.id
  return { article: state.find(item => item.id === id) }
}

export default connect(mapStateToProps)(Detail)
