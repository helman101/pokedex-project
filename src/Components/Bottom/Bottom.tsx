import React, { useContext } from 'react'
import { PokemonList } from '../PokemonList/PokemonList'
import { type usePokeStoreI } from '../../hooks/PokeStore/types'
import { PokeContext } from '../../Context/PokeContext'
import { CrossPad } from '../CrossPad/CrossPad'
import { ButtonPad } from '../ButtonPad/ButtonPad'

export const Bottom = () => {
  const {
    pokemonList,
    loadingPokemonList
  } = useContext<usePokeStoreI>(PokeContext)

  return (
    <section>
      <div className='bottom-screen-margin m-auto position-relative'>
        <CrossPad />
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
        <ButtonPad />
      </div>
    </section>
  )
}
