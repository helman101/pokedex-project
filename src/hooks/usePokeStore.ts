import { useReducer } from 'react'
import { PokeActions, type PokeState } from '../utils/types'

const initialState: PokeState = {
  loading: false,
  pokemonList: []
  // nextListUrl
  // currentPokemon
}

const reducer = (state: PokeState, action: any): PokeState => {
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

  return {
    loading,
    pokemonList,
    currentPokemon,
    nextListUrl,
    dispatch
  }
}
