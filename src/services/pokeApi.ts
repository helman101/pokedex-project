import { type CurrentPokemon, type ItemFromList } from '../hooks/PokeStore/types'
import { BASE_POKE_URL } from './constants'
import { type ApiListResponse } from './types'

const client = async (url: string) => {
  try {
    const raw = await fetch(url)
    const res = await raw.json()
    return res
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets first list of pokemon by pokedex order
export const getFirstPokemonList = async () => {
  const query = `${BASE_POKE_URL}pokemon`

  try {
    const list: ApiListResponse = await client(query)
    return list
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets a list of pokemon using the saved nextUrl on store
export const getPokemonListFromUrl = async (url: string) => {
  try {
    const list: ApiListResponse = await client(url)
    return list
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets all info of a selected pokemon
export const getPokemonInfo = async (pokemonName: string) => {
  const query = `${BASE_POKE_URL}pokemon/${pokemonName}`

  try {
    const info = await client(query)
    const renameInfo: CurrentPokemon = {
      id: info.id,
      name: info.name,
      height: info.height,
      weight: info.weight,
      types: info.types.map((obj: { type: ItemFromList }) => obj.type.name.charAt(0).toLocaleUpperCase() + obj.type.name.slice(1)),
      stats: info.stats.map((obj: { stat: ItemFromList, base_stat: number }) => ({ name: obj.stat.name, baseStat: obj.base_stat })),
      sprites: {
        backDefault: info.sprites.back_default,
        backShiny: info.sprites.back_shiny,
        frontDefault: info.sprites.front_default,
        frontShiny: info.sprites.front_shiny
      }
    }
    return renameInfo
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets the list of pokemon types
export const getPokemonTypeList = async () => {
  const query = `${BASE_POKE_URL}type`

  try {
    const types = await client(query)

    // Maps through array generating an array of objects containing a name and a value
    const mappedTypes = types.results.map(
      (type: ItemFromList) => (
        {
          name: type.name.charAt(0).toLocaleUpperCase() + type.name.slice(1),
          value: type.name
        }))
      .slice(0, -2)

    return mappedTypes
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets a list of pokemon generations
export const getPokemonGenerationList = async () => {
  const query = `${BASE_POKE_URL}generation`

  try {
    const gens = await client(query)

    // Maps through array generating an array of objects containing a name and a value
    const mappedGens = gens.results.map(
      (gen: ItemFromList, i: number) => (
        { name: `Gen ${i + 1}`, value: gen.name }
      )
    )
    return mappedGens
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets a list of pokemon by generation
export const getPokemonListByGen = async (gen: string) => {
  const query = `${BASE_POKE_URL}generation/${gen}`

  try {
    const pokeList = await client(query)
    return pokeList.pokemon_species
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}

// Gets a list of pokemon by type
export const getPokemonListByType = async (type: string) => {
  const query = `${BASE_POKE_URL}type/${type}`

  try {
    const pokeList = await client(query)
    // Maps through array taking only the object (pokemon) containing name and url of the pokemon
    const mappedList = pokeList.pokemon.map((item: { pokemon: ItemFromList }) => item.pokemon)
    return mappedList
  } catch (err: unknown) {
    if (err instanceof ErrorEvent) {
      throw new Error(err.message)
    }
  }
}
