export const avatarUrl = 'https://transcount.com/views/images/features/avatar.png'
export const newsApiUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json'
//сделай базовый урл https://hacker-news.firebaseio.com/v0/  и его уже используй с другим контатом строк
// в стрелочных функциях можно возвращать в одну строку const bla = ()=> some code
export const getItemFromApiWithUrlById = (id: number) => {
  return `https://hacker-news.firebaseio.com/v0/item/${ id }.json`
}
