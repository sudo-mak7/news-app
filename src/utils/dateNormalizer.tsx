export const dateNormalizer = (time: number) => {
  const getDate = new Date(time * 1000).toLocaleDateString() + ' ('
  const getHours = new Date(time * 1000).getHours() + ':'
  const getMinutes = new Date(time * 1000).getMinutes() < 10
    ? '0' + new Date(time * 1000).getMinutes() + ')'
    : new Date(time * 1000).getMinutes() + ')'

  return  getDate + getHours + getMinutes
}