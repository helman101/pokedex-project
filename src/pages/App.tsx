import { useContext } from 'react'
import { PokemonList } from '../Components/PokemonList'
import '../style.scss'
import { type usePokeStoreI } from '../hooks/PokeStore/types'
import { PokeContext } from '../Context/PokeContext'

export const App = () => {
  const {
    pokemonList,
    loadingPokemonList
  } = useContext<usePokeStoreI>(PokeContext)

  return (
    <main>
      <section>
        <PokemonList
          loading={loadingPokemonList}
          list={pokemonList}
        />
      </section>
    </main>
  )
}
