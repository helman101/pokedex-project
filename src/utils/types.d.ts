interface PokeState {
  loading: boolean
  pokemonList: PokemonFromList[]
  nextListUrl?: string
  currentPokemon?: PokemonID | Pokemon
}

interface PokemonID {
  id: number
}

interface Pokemon {
  id: number
  name?: string
  height?: number
  weight?: number
  types?: string[]
  stats?: PokeStat[]
  sprites?: PokeSprites
}

interface PokemonFromList {
  name: string
  url: string
}

interface PokeStat {
  name: string
  baseStat: number
}

interface PokeSprites {
  backDefault: string
  backShiny: string
  frontDefault: string
  frontShiny: string
}
