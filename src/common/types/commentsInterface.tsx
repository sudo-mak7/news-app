interface Comments {
  by: string,
  id: number,
  parent: number,
  text: string,
  time: number,
  type: string
  kids: number[],
  dead: boolean,
  deleted: boolean
}

export type CommentsInterface = Partial<Comments>