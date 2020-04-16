import { StateType } from '../global'
import { connect } from 'dva';
import Category from '../components/Category';

const mapStateToProps = (state: StateType) => ({
  data: state.count.articles
})

export default connect(mapStateToProps)(Category)
