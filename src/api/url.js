export const avatarUrl = 'https://transcount.com/views/images/features/avatar.png'
export const newsApiUrl = 'https://hacker-news.firebaseio.com/v0/beststories.json'

export const getItemFromApiWithUrlById = (id) => {
  return `https://hacker-news.firebaseio.com/v0/item/${ id }.json`
}