import { type PokemonFromList } from '../utils/types'

export interface ApiListResponse {
  results: PokemonFromList
  next: string
}
