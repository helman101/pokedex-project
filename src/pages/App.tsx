import { useContext } from 'react'
import { PokemonList } from '../Components/PokemonList/PokemonList'
import '../style.scss'
import { type usePokeStoreI } from '../hooks/PokeStore/types'
import { PokeContext } from '../Context/PokeContext'
import { PokemonInfo } from '../Components/PokemonInfo/PokemonInfo'

export const App = () => {
  const {
    pokemonList,
    loadingPokemonList
  } = useContext<usePokeStoreI>(PokeContext)

  return (
    <main className='game-font'>
      <section>
        <div className='top-screen d-flex justify-content-center align-items-center border-bottom-0'>
          <div className="ds-frame rounded-3">
            <PokemonInfo />
          </div>
        </div>
      </section>
      <section>
        <PokemonList
          loading={loadingPokemonList}
          list={pokemonList}
        />
      </section>
    </main>
  )
}
