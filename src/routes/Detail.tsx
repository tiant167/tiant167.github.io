import Detail from "../components/Detail"
import { connect } from "dva"
import { StateType } from "../global"
import { RouteComponentProps } from "dva/router"

const mapStateToProps = (state: StateType, ownProps: RouteComponentProps<{id: string}>) => {
  const { match: { params } } = ownProps
  const id = params.id
  return {
    article: state.count.articles.find(item => item.id === id),
    count: state.count.count,
  }
}

export default connect(mapStateToProps)(Detail)
