export const getNewsIds = async () => {
  try {
    const request = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    return await request.json()
  } catch (e) {
    console.error(e)
  }
}

export const getNews = async (newsIds) => {
  try {
    const news = []

    for (let i = 0; i < newsIds.length; i++) {
      const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${newsIds[i]}.json`)
      const newsItem = await request.json()
      news.push(newsItem)

      if (i === newsIds.length - 1) {
        return news
      }
    }
  } catch (e) {
    console.error(e)
  }
}