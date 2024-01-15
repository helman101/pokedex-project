import { type ReactNode, createContext } from 'react'
import { initialState, usePokeStore } from '../hooks/usePokeStore'
import { type usePokeStoreI } from '../utils/types'

export const PokeContext = createContext<usePokeStoreI>({
  setLoadingPokemonList: () => {},
  setLoadingCurrentPokemonData: () => {},
  setLoadingInfinityScroll: () => {},
  setPokemonList: () => {},
  setCurrentPokemon: () => {},
  setNextListUrl: () => {},
  ...initialState
})

interface Props {
  children: ReactNode
}

export const PokeProvider = ({ children }: Props) => {
  const pokeStore = usePokeStore()

  return (
    <PokeContext.Provider value={pokeStore}>
      {children}
    </PokeContext.Provider>
  )
}
