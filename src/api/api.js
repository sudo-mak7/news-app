import { getNewsApiUrlId, newsApiUrl } from './url'

export const getNewsIds = async () => {
  try {
    const request = await fetch(newsApiUrl)
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
      const request = await fetch(getNewsApiUrlId(ids[i]))
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
      const request = await fetch(getNewsApiUrlId(ids[i]))
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
      const request = await fetch(getNewsApiUrlId(ids[i]))
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
    const request = await fetch(getNewsApiUrlId(id))
    return await request.json()
  }
  catch (e) {
    console.error(e)
    return false
  }
}