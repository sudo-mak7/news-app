import { CommentsInterface } from '@common/types/commentsInterface'

export interface AnswerSectionComponentInterface {
  isCollapsed: boolean,
  answers: CommentsInterface[],
  isLoading: boolean
}