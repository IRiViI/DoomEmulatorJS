export interface Recipe {
  id: string,
  title: string,
  categories: string[],
  ingredients: string[],
  instructions: string[],
  reviews: string[],
  ratings: number[]
}
