export const get100NewsIds = (allNewsIds) => {
  if (Array.isArray(allNewsIds)) {
    return allNewsIds.splice(0, 10)
  }
}