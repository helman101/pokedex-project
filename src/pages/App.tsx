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
        <div className='top-screen-margin m-auto position-relative'>
          <div className="pad left position-absolute" />
          <div className='top-screen d-flex justify-content-center align-items-center border-bottom-0'>
            <div className="points" />
            <div className="square top right position-absolute rounded-2" />
            <div className="square top left position-absolute rounded-2" />
            <div className="ds-frame rounded-3">
              <PokemonInfo />
            </div>
            <div className="square bottom right position-absolute rounded-2" />
            <div className="square bottom left position-absolute rounded-2" />
            <div className="points" />
          </div>
          <div className="pad right position-absolute rounded-1" />
        </div>
      </section>
      <section>
        <div className='middle m-auto rounded-pill mt-1 position-relative d-flex justify-content-around align-items-center'>
          <div className='separator left position-absolute' />
          <div className='mic rounded-pill' />
          <div className='separator right position-absolute' />
          <div className='battery-container h-100 d-flex position-absolute d-flex align-items-center'>
            <div className="battery off rounded-pill" />
            <div className="battery on rounded-pill" />
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
