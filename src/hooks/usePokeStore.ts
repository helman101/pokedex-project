import { useReducer } from 'react'
import {
  type Action,
  PokeActions,
  type PokeState,
  type ItemFromList,
  type usePokeStoreI,
  type CurrentPokemon
} from '../utils/types.d'

export const initialState: PokeState = {
  loadingPokemonList: false,
  loadingInfinityScroll: false,
  loadingCurrentPokemonData: false,
  pokemonList: [],
  // nextListUrl
  currentPokemon: { id: 3 }
}

const reducer = (state: PokeState, action: Action): PokeState => {
  const { type } = action

  if (type === PokeActions.setLoadingPokemonList) {
    return {
      ...state,
      loadingPokemonList: true
    }
  }

  if (type === PokeActions.setLoadingCurrentPokemonData) {
    return {
      ...state,
      loadingCurrentPokemonData: true
    }
  }

  if (type === PokeActions.setLoadingInfinityScroll) {
    return {
      ...state,
      loadingInfinityScroll: true
    }
  }

  if (type === PokeActions.setPokemonList) {
    if (action.payload.append) {
      return {
        ...state,
        loadingInfinityScroll: false,
        pokemonList: [
          ...state.pokemonList,
          ...action.payload.pokemonList
        ]
      }
    }
    return {
      ...state,
      loadingPokemonList: false,
      pokemonList: action.payload.pokemonList
    }
  }

  if (type === PokeActions.setCurrentPokemon) {
    return {
      ...state,
      loadingCurrentPokemonData: false,
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

export const usePokeStore = (): usePokeStoreI => {
  const [{
    loadingPokemonList,
    loadingCurrentPokemonData,
    loadingInfinityScroll,
    pokemonList,
    currentPokemon,
    nextListUrl
  }, dispatch] = useReducer(reducer, initialState)

  const setLoadingPokemonList = () => {
    dispatch({ type: PokeActions.setLoadingPokemonList })
  }
  const setLoadingCurrentPokemonData = () => {
    dispatch({ type: PokeActions.setLoadingCurrentPokemonData })
  }
  const setLoadingInfinityScroll = () => {
    dispatch({ type: PokeActions.setLoadingInfinityScroll })
  }
  const setPokemonList = (append: boolean, pokemonList: ItemFromList[]) => {
    dispatch({ type: PokeActions.setPokemonList, payload: { append, pokemonList } })
  }
  const setCurrentPokemon = (currentPokemon: CurrentPokemon) => {
    dispatch({ type: PokeActions.setCurrentPokemon, payload: currentPokemon })
  }
  const setNextListUrl = (nextListUrl: string) => {
    dispatch({ type: PokeActions.setNextListUrl, payload: nextListUrl })
  }

  return {
    loadingPokemonList,
    loadingCurrentPokemonData,
    loadingInfinityScroll,
    pokemonList,
    currentPokemon,
    nextListUrl,
    setLoadingPokemonList,
    setLoadingCurrentPokemonData,
    setLoadingInfinityScroll,
    setPokemonList,
    setCurrentPokemon,
    setNextListUrl
  }
}
