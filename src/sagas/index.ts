import { put, takeEvery, all, call } from 'redux-saga/effects'
import { Actions } from '../actions'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  yield delay(1000)
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000)
  console.log('Async incr')
  yield put({ type: Actions.increment })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    call(helloSaga),
    call(watchIncrementAsync)
  ])
}
