
export type Newsletter = {
  id: number
  date: string
  widthPhoto?: number
  news: News[]
}

export type News = {
  order: number;
  category: string;
  url: string;
  image: string;
  title: string;
  summary: string
  widthPhoto: number
}

export type Reverse = {
  rever: string;
  first: string;
  last: string;
}