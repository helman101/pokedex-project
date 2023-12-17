import { useReducer } from 'react'
import { type PokeState } from '../utils/types'

const initialState: PokeState = {
  loading: false,
  pokemonList: []
  // nextListUrl
  // currentPokemon
}

const reducer = (state: PokeState, action: any): PokeState => {
  const { type } = action

  if (type === 'LOADING') {
    return {
      ...state,
      loading: true
    }
  }

  if (type === 'SET_POKEMON_LIST') {
    return {
      ...state,
      loading: false,
      pokemonList: action.payload
    }
  }

  if (type === 'SET_CURRENT_POKEMON') {
    return {
      ...state,
      loading: false,
      currentPokemon: action.payload
    }
  }

  if (type === 'SET_NEXT_LIST_URL') {
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
