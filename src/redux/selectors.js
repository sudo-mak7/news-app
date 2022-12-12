export const getNewsIdsSelector = state => state.newsIds.newsIds
export const getNewsIdsLoaderSelector = state => state.newsIds.loading
export const getNewsIdsErrorSelector = state => state.newsIds.error

export const getNewsSelector = state => state.news.news
export const getNewsLoaderSelector = state => state.news.loading
export const getNewsErrorSelector = state => state.news.error

export const getCurrentNewsSelector = state => state.currentNews.currentNews
export const getCurrentNewsLoaderSelector = state => state.currentNews.loading
export const getCurrentNewsErrorSelector = state => state.currentNews.error

export const getNewsByIdSelector = state => state.setCurrentNewsId.id

export const getCommentsSelector = state => state.setComments.comments
export const getCommentsLoaderSelector = state => state.setComments.loading
export const getCommentsErrorSelector = state => state.setComments.error

export const getCurrentPageNumberSelector = state => state.setCurrentPageNumber.currentPage
export const getCurrentPageNewsSelector = state => state.setCurrentPageNews.currentPageNews
export const getPagesLeftSelector = state => state.setPagesLeft.pagesLeft
