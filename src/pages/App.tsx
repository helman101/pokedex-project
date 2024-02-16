import { useContext } from 'react'
import { PokemonList } from '../Components/PokemonList/PokemonList'
import '../style.scss'
import { type usePokeStoreI } from '../hooks/PokeStore/types'
import { PokeContext } from '../Context/PokeContext'
import { TopScreen } from '../Components/TopScreen/TopScreen'
import { Middle } from '../Components/Middle/Middle'

export const App = () => {
  const {
    pokemonList,
    loadingPokemonList
  } = useContext<usePokeStoreI>(PokeContext)

  return (
    <main className='game-font'>
      <TopScreen />
      <Middle />
      <section>
        <PokemonList
          loading={loadingPokemonList}
          list={pokemonList}
        />
      </section>
    </main>
  )
}
