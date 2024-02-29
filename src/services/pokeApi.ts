import { useContext } from 'react'
import { PokeContext } from '../Context/PokeContext'
import { type usePokeStoreI, type CurrentPokemon, type ItemFromList } from '../hooks/PokeStore/types'
import { BASE_POKE_URL } from './constants'
import { type ApiListResponse } from './types'
import { type FilterListItem } from '../hooks/FilterStore/types'

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

export const usePokeApi = () => {
  const {
    setLoadingPokemonList,
    setPokemonList,
    setNextListUrl,
    setCurrentPokemon,
    setLoadingCurrentPokemonData,
    setLoadingInfinityScroll
  } = useContext<usePokeStoreI>(PokeContext)

  // Gets first list of pokemon by pokedex order
  const getFirstPokemonList = async () => {
    const query = `${BASE_POKE_URL}pokemon`

    try {
      setLoadingPokemonList()
      const list: ApiListResponse = await client(query)
      setPokemonList(false, list.results)
      setNextListUrl(list.next)
    } catch (err: unknown) {
      if (err instanceof ErrorEvent) {
        throw new Error(err.message)
      }
    }
  }

  // Gets a list of pokemon using the saved nextUrl on store
  const getPokemonListFromUrl = async (url: string) => {
    try {
      setLoadingInfinityScroll()
      const list: ApiListResponse = await client(url)
      setPokemonList(true, list.results)
      setNextListUrl(list.next)
    } catch (err: unknown) {
      if (err instanceof ErrorEvent) {
        throw new Error(err.message)
      }
    }
  }

  // Gets all info of a selected pokemon
  const getPokemonInfo = async (pokemonName: string) => {
    const query = `${BASE_POKE_URL}pokemon/${pokemonName}`

    try {
      setLoadingCurrentPokemonData()
      const info = await client(query)
      const renamedInfo: CurrentPokemon = {
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
      setCurrentPokemon(renamedInfo)
    } catch (err: unknown) {
      if (err instanceof ErrorEvent) {
        throw new Error(err.message)
      }
    }
  }

  // Gets the list of pokemon types
  const getPokemonTypeList = async () => {
    const query = `${BASE_POKE_URL}type`

    try {
      const types = await client(query)

      // Maps through array generating an array of objects containing a name and a value
      const mappedTypes: FilterListItem[] = types.results.map(
        (type: FilterListItem) => (
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
  const getPokemonGenerationList = async () => {
    const query = `${BASE_POKE_URL}generation`

    try {
      const gens = await client(query)

      // Maps through array generating an array of objects containing a name and a value
      const mappedGens: FilterListItem[] = gens.results.map(
        (gen: FilterListItem, i: number) => (
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
  const getPokemonListByGen = async (gen: string) => {
    const query = `${BASE_POKE_URL}generation/${gen}`

    try {
      setLoadingPokemonList()
      const pokeList: { pokemon_species: ItemFromList[] } = await client(query)
      setPokemonList(false, pokeList.pokemon_species)
      setNextListUrl(undefined)
    } catch (err: unknown) {
      if (err instanceof ErrorEvent) {
        throw new Error(err.message)
      }
    }
  }

  // Gets a list of pokemon by type
  const getPokemonListByType = async (type: string) => {
    const query = `${BASE_POKE_URL}type/${type}`

    try {
      setLoadingPokemonList()
      const pokeList = await client(query)
      // Maps through array taking only the object (pokemon) containing name and url of the pokemon
      const mappedList: ItemFromList[] = pokeList.pokemon.map((item: { pokemon: ItemFromList }) => item.pokemon)
      setPokemonList(false, mappedList)
      setNextListUrl(undefined)
    } catch (err: unknown) {
      if (err instanceof ErrorEvent) {
        throw new Error(err.message)
      }
    }
  }

  return {
    getFirstPokemonList,
    getPokemonGenerationList,
    getPokemonTypeList,
    getPokemonInfo,
    getPokemonListByGen,
    getPokemonListByType,
    getPokemonListFromUrl
  }
}
