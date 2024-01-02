import { BASE_POKE_URL } from './constants'
import { type ApiListResponse } from './types'

export const getFirstPokemonList = async () => {
  const query = `${BASE_POKE_URL}pokemon`
  const list = await fetch(query)
    .then(async (res) => await res.json())
    .then((res: ApiListResponse) => res)

  return list
}

export const getPokemonListFromUrl = async (url: string) => {
  const list = await fetch(url)
    .then(async (res) => await res.json())
    .then((res: ApiListResponse) => res)

  return list
}

export const getPokemonInfo = async (pokemonId: number) => {
  const info = await fetch(`${BASE_POKE_URL}pokemon/${pokemonId}`)
    .then(async (res) => await res.json())
    .then((res) => res)

  return info
}
