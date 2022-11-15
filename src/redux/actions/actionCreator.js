import {
  LOADING,
  SET_COMMENTS,
  SET_CURRENT_NEWS,
  SET_CURRENT_NEWS_ID,
  SET_NEWS
} from '../constants'

export const loading = (payload) => ({
  type: LOADING,
  payload
})

export const setNews = (payload) => ({
  type: SET_NEWS,
  payload
})

export const setCurrentNewsId = (payload) => ({
  type: SET_CURRENT_NEWS_ID,
  payload
})

export const setCurrentNews = (payload) => ({
  type: SET_CURRENT_NEWS,
  payload
})

export const setComments = (payload) => ({
  type: SET_COMMENTS,
  payload
})
