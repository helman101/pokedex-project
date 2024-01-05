import { type ItemFromList } from '../utils/types'
import { BASE_POKE_URL } from './constants'
import { type ApiListResponse } from './types'

// Gets first list of pokemon by pokedex order
export const getFirstPokemonList = async () => {
  const query = `${BASE_POKE_URL}pokemon`
  const list = await fetch(query)
    .then(async (res) => await res.json())
    .then((res: ApiListResponse) => res)

  return list
}

// Gets a list of pokemon using the saved nextUrl on store
export const getPokemonListFromUrl = async (url: string) => {
  const list = await fetch(url)
    .then(async (res) => await res.json())
    .then((res: ApiListResponse) => res)

  return list
}

// Gets all info of a selected pokemon
export const getPokemonInfo = async (pokemonId: number) => {
  const info = await fetch(`${BASE_POKE_URL}pokemon/${pokemonId}`)
    .then(async (res) => await res.json())
    .then((res) => res)

  return info
}

// Gets the list of pokemon types
export const getPokemonTypeList = async () => {
  const types = await fetch(`${BASE_POKE_URL}type`)
    .then(async (res) => await res.json())
    .then((res) => res.results)

  // Maps through array generating an array of objects containing a name and a value
  const result = types.map(
    (type: ItemFromList) => (
      {
        name: type.name.charAt(0).toLocaleUpperCase() + type.name.slice(1),
        value: type.name
      }))
    .slice(0, -2)

  return [{ name: 'Select type', value: 'all' }, ...result]
}

// Gets a list of pokemon generations
export const getPokemonGenerationList = async () => {
  const gens = await fetch(`${BASE_POKE_URL}generation`)
    .then(async (res) => await res.json())
    .then((res) => res.results)

  // Maps through array generating an array of objects containing a name and a value
  const result = gens.map((gen: ItemFromList, i: number) => ({ name: `Gen ${i + 1}`, value: gen.name }))

  return [{ name: 'Select generation', value: 'all' }, ...result]
}

// Gets a list of pokemon by generation
export const getPokemonListByGen = async (gen: string) => {
  const pokeList = await fetch(`${BASE_POKE_URL}generation/${gen}`)
    .then(async (res) => await res.json())
    .then((res) => res.pokemon_species)

  return pokeList
}

// Gets a list of pokemon by type
export const getPokemonListBytype = async (type: string) => {
  const pokeList = await fetch(`${BASE_POKE_URL}type/${type}`)
    .then(async (res) => await res.json())
    .then((res) => res.pokemon)

  // Maps through array taking only the object (pokemon) containing name and url of the pokemon
  const result = pokeList.map((item: { pokemon: ItemFromList }) => item.pokemon)

  return result
}
