export const getPaginatedNewsIds = (allNewsIds: number[]) => {
  if (Array.isArray(allNewsIds)) {
    const paginatedNews = []

    for (let i: number = 0; i <= Math.ceil(allNewsIds.length / 10); i === 0 ? i++ : i * 10) {
        paginatedNews.push(allNewsIds.splice(0, 10))
    }

    return paginatedNews
  }
}