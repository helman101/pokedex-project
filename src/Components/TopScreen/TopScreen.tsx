import React from 'react'
import { PokemonInfo } from '../PokemonInfo/PokemonInfo'

export const TopScreen = () => {
  return (
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
  )
}
