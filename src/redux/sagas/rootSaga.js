import { takeEvery, put, call } from 'redux-saga/effects'
import { getNews, getNewsIds } from '../../api/api'
import { setNews } from '../actions/actionCreator'
import { GET_NEWS, SET_NEWS_ERROR, LOADING } from '../constants'
import { get100NewsIds } from '../../utils/get100NewsIds'

export function* handleNews() {
  try {
    const allNewsIds = yield call(getNewsIds)

    if (allNewsIds) {
      const newsIds = yield get100NewsIds(allNewsIds)
      const news = yield getNews(newsIds)
      yield put(setNews(news))
      yield put({ type: LOADING, payload: false })
    } else {
      yield put({
        type: SET_NEWS_ERROR,
        payload: 'Error fetching news :('
      })
      yield put({ type: LOADING, payload: false })
    }
  } catch (e) {
    yield put({
      type: SET_NEWS_ERROR,
      payload: 'Error fetching news :('
    })
    yield put({ type: LOADING, payload: false })
    console.error(e)
  }
}

export function* newsWatcher() {
  yield put({ type: LOADING, payload: true })
  yield takeEvery(GET_NEWS, handleNews)
}
