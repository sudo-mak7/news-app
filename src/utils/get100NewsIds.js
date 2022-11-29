export const get100NewsIds = (allNewsIds) => {
  if (Array.isArray(allNewsIds)) {
    return allNewsIds.reverse().splice(0, 5)
  }
}