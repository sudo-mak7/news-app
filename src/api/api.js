export const getNewsIds = async () => {
  try {
    const request = await fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
    return await request.json()
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getNews = async (ids) => {
  const news = []

  for (let i = 0; i < ids.length; i++) {
    try {
      const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ ids[i] }.json`)
      news.push(await request.json())
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return news
}

export const getComments = async (ids) => {
  const comments = []

  for (let i = 0; i < ids.length; i++) {
    try {
      const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ ids[i] }.json`)
      comments.push(await request.json())
    } catch (e) {
      console.error(e)
      return false
    }
  }

  localStorage.setItem('comments', JSON.stringify(comments))
  return comments
}

export const getAnswers = async (ids) => {
  const answers = []

  for (let i = 0; i < ids.length; i++) {
    try {
      const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ ids[i] }.json`)
      answers.push(await request.json())
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return answers
}

export const getCurrentItemById = async (id) => {
  try {
    const request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    return await request.json()
  }
  catch (e) {
    console.error(e)
    return false
  }
}