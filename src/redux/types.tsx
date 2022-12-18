import * as React from 'react'
import { CommentsInterface } from '@common/types/commentsInterface'
import { NewsInterface } from '@common/types/newsInterface'

export interface fetchAnswersInterface {
  id: number,
  setAnswersState: React.Dispatch<React.SetStateAction<CommentsInterface[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<any>>
}

export interface CommentsStateInterface {
  comments: CommentsInterface[],
  loading: boolean,
  error: any
}

export interface CurrentNewsStateInterface {
  currentNews: NewsInterface,
  loading: boolean,
  error: any
}

export interface NewsByIdStateInterface {
  id: number
}

export interface NewsIdsStateInterface {
  newsIds: [number][],
  loading: boolean,
  error: any
}

export interface NewsStateInterface {
  news: NewsInterface[],
  loading: boolean,
  error: any
}

export interface PaginationStateInterface {
  currentPage: number,
  currentPageNews: NewsInterface[],
  pagesLeft: number
}