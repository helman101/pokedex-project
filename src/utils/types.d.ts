export interface PokeState {
  loading: boolean
  pokemonList: PokemonFromList[]
  nextListUrl?: string
  currentPokemon?: PokemonID | Pokemon
}

export interface PokemonID {
  id: number
}

export interface Pokemon {
  id: number
  name?: string
  height?: number
  weight?: number
  types?: string[]
  stats?: PokeStat[]
  sprites?: PokeSprites
}

export interface PokemonFromList {
  name: string
  url: string
}

export interface PokeStat {
  name: string
  baseStat: number
}

export interface PokeSprites {
  backDefault: string
  backShiny: string
  frontDefault: string
  frontShiny: string
}

export enum PokeActions {
  loading = 'LOADING',
  setPokemonList = 'SET_POKEMON_LIST',
  setCurrentPokemon = 'SET_CURRENT_POKEMON',
  setNextListUrl = 'SET_NEXT_LIST_URL'
}

export type Action =
  | { type: PokeActions.loading }
  | { type: PokeActions.setCurrentPokemon, payload: Pokemon | PokemonID }
  | { type: PokeActions.setPokemonList, payload: PokemonFromList[] }
  | { type: PokeActions.setNextListUrl, payload: string }
