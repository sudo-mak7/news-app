export const getLoadingStateSelector = state => state.loading.isLoading
export const getNewsSelector = state => state.news.news || []
export const getNewsIdSelector = state => state.setCurrentNewsId.id
export const getCurrentNewsSelector = state => state.currentNews.currentNews
export const getCommentsSelector = state => state.setComments.comments
