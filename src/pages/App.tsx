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
        <div className='bottom-screen-margin m-auto position-relative'>
          <div className="cross-wrapper position-absolute">
            <div className="cross rounded">
              <div className="cross-line top position-absolute"></div>
              <div className="cross-line right position-absolute"></div>
              <div className="cross-line bottom position-absolute"></div>
              <div className="cross-line left position-absolute"></div>
            </div>
          </div>
          <div className="bottom-screen d-flex justify-content-center align-items-start border-top-0">
            <div className="frame-wrapper px-5 pt-4 pb-5">
              <div className="ds-frame rounded-3">
                <PokemonList
                  loading={loadingPokemonList}
                  list={pokemonList}
                />
              </div>
            </div>
          </div>
          <div className="button-wrapper position-absolute">
            <div className="btn top rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">Y</div>
            <div className="btn right rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">X</div>
            <div className="btn bottom rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">B</div>
            <div className="btn left rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center">A</div>
          </div>
        </div>
      </section>
    </main>
  )
}
