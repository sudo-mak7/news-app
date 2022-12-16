// прочитай про Partial<Type>
export interface CommentsInterface {
  by?: string,
  id?: number,
  parent?: number,
  text?: string,
  time?: number,
  type?: string
  kids?: number[],
  dead?: boolean,
  deleted?: boolean
}
