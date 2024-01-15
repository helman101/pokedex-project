import { type ItemFromList } from '../utils/types'

export interface ApiListResponse {
  results: ItemFromList[]
  next: string
}
