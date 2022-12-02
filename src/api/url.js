export const avatarUrl = 'https://transcount.com/views/images/features/avatar.png'
export const newsApiUrl = 'https://hacker-news.firebaseio.com/v0/beststories.json'

export const getNewsApiUrlId = (id) => {
  return `https://hacker-news.firebaseio.com/v0/item/${ id }.json`
}