export const getPaginatedNewsIds = (allNewsIds) => {
  if (Array.isArray(allNewsIds)) {
    const paginatedNews = []

    for (let i = 0; i < allNewsIds.length / 10; i === 0 ? i++ : i * 10) {
      paginatedNews.push(allNewsIds.splice(0, 10))
    }

    return paginatedNews
  }
}