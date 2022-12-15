export const avatarUrl = 'https://transcount.com/views/images/features/avatar.png'
export const newsApiUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json'

export const getItemFromApiWithUrlById = (id: number) => {
  return `https://hacker-news.firebaseio.com/v0/item/${ id }.json`
}