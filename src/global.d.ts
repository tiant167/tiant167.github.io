export interface Article {
  id: string
  title: string,
  createdAt: Date,
  content: string,
}

export type StateType = {count: { articles: Article[], count: number }}
