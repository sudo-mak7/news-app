import { RootState } from './store'

export const getNewsIdsSelector = (state: RootState) => state.newsIds.newsIds
export const getNewsIdsLoaderSelector = (state: RootState) => state.newsIds.loading
export const getNewsIdsErrorSelector = (state: RootState) => state.newsIds.error

export const getNewsSelector = (state: RootState) => state.news.news
export const getNewsLoaderSelector = (state: RootState) => state.news.loading
export const getNewsErrorSelector = (state: RootState) => state.news.error

export const getCurrentNewsSelector = (state: RootState) => state.currentNews.currentNews
export const getCurrentNewsLoaderSelector = (state: RootState) => state.currentNews.loading
export const getCurrentNewsErrorSelector = (state: RootState) => state.currentNews.error

export const getNewsByIdSelector = (state: RootState) => state.setCurrentNewsId.id

export const getCommentsSelector = (state: RootState) => state.setComments.comments
export const getCommentsLoaderSelector = (state: RootState) => state.setComments.loading
export const getCommentsErrorSelector = (state: RootState) => state.setComments.error

export const getCurrentPageNumberSelector = (state: RootState) => state.setCurrentPageNumber.currentPage
export const getCurrentPageNewsSelector = (state: RootState) => state.setCurrentPageNews.currentPageNews
export const getPagesLeftSelector = (state: RootState) => state.setPagesLeft.pagesLeft