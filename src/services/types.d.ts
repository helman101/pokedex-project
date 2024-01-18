import { type ItemFromList } from '../hooks/PokeStore/types'

export interface ApiListResponse {
  results: ItemFromList[]
  next: string
}
