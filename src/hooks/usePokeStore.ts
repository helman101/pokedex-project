import { useReducer } from 'react'
import {
  type Action,
  PokeActions,
  type PokeState,
  type PokemonFromList,
  type PokemonID,
  type Pokemon
} from '../utils/types'

const initialState: PokeState = {
  loading: false,
  pokemonList: []
  // nextListUrl
  // currentPokemon
}

const reducer = (state: PokeState, action: Action): PokeState => {
  const { type } = action

  if (type === PokeActions.loading) {
    return {
      ...state,
      loading: true
    }
  }

  if (type === PokeActions.setPokemonList) {
    return {
      ...state,
      loading: false,
      pokemonList: action.payload
    }
  }

  if (type === PokeActions.setCurrentPokemon) {
    return {
      ...state,
      loading: false,
      currentPokemon: action.payload
    }
  }

  if (type === PokeActions.setNextListUrl) {
    return {
      ...state,
      nextListUrl: action.payload
    }
  }

  return state
}

export const usePokeStore = () => {
  const [{
    loading,
    pokemonList,
    currentPokemon,
    nextListUrl
  }, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => { dispatch({ type: PokeActions.loading }) }
  const setPokemonList = (pokemonList: PokemonFromList[]) => {
    dispatch({ type: PokeActions.setPokemonList, payload: pokemonList })
  }
  const setCurrentPokemon = (currentPokemon: PokemonID | Pokemon) => {
    dispatch({ type: PokeActions.setCurrentPokemon, payload: currentPokemon })
  }
  const setNextListUrl = (nextListUrl: string) => {
    dispatch({ type: PokeActions.setNextListUrl, payload: nextListUrl })
  }

  return {
    loading,
    pokemonList,
    currentPokemon,
    nextListUrl,
    setLoading,
    setPokemonList,
    setCurrentPokemon,
    setNextListUrl
  }
}
