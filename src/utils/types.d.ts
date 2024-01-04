export interface PokeState {
  loadingPokemonList: boolean
  loadingCurrentPokemonData: boolean
  loadingInfinityScroll: boolean
  pokemonList: ItemFromList[]
  nextListUrl?: string
  currentPokemon: CurrentPokemon
}

export type CurrentPokemon = PokemonID | Pokemon

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

export interface ItemFromList {
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
  setLoadingPokemonList = 'SET_LOADING_POKEMON_LIST',
  setLoadingCurrentPokemonData = 'SET_LOADINGCURRENT_POKEMON_DATA',
  setLoadingInfinityScroll = 'SET_LOADING_INFINITY_SCROLL',
  setPokemonList = 'SET_POKEMON_LIST',
  setCurrentPokemon = 'SET_CURRENT_POKEMON',
  setNextListUrl = 'SET_NEXT_LIST_URL',
}

export interface usePokeStoreI extends PokeState {
  setLoadingPokemonList: () => void
  setLoadingCurrentPokemonData: () => void
  setLoadingInfinityScroll: () => void
  setPokemonList: (append: boolean, pokemonList: ItemFromList[]) => void
  setCurrentPokemon: (currentPokemon: PokemonID | Pokemon) => void
  setNextListUrl: (nextListUrl: string) => void
}

export type Action =
  | {
    type:
    | PokeActions.setLoadingPokemonList
    | PokeActions.setLoadingCurrentPokemonData
    | PokeActions.setLoadingInfinityScroll
  }
  | { type: PokeActions.setNextListUrl, payload: string }
  | { type: PokeActions.setCurrentPokemon, payload: Pokemon | PokemonID }
  | { type: PokeActions.setPokemonList, payload: { append: boolean, pokemonList: ItemFromList[] } }
