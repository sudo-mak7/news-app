export const paths = {
  avatarUrl: (): string => 'https://transcount.com/views/images/features/avatar.png',
  hackernewsApiUrl: (): string => 'https://hacker-news.firebaseio.com/v0/',
  newsApiUrl: (): string => paths.hackernewsApiUrl().concat('newstories.json')
}

export const getItemFromApiWithUrlById = (id: number) =>
  paths.hackernewsApiUrl().concat(`item/${ id }.json`)