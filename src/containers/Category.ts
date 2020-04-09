import { StateType } from "../global";
import { connect } from "react-redux";
import Category from "../components/Category";

const mapStateToProps = (state: StateType) => ({
  data: state
})

export default connect(mapStateToProps)(Category)
