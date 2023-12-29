import React from 'react'
import { type PokemonFromList } from '../utils/types'

interface Props {
  id: number
  pokemon: PokemonFromList
  selected?: boolean
  onClick: () => void
}

export const PokemonButton = ({ id, pokemon, selected, onClick }: Props) => {
  return (
    <div className={`${selected ? 'selected' : ''} btn-wrapper p-1 rounded`}>
      <button
        className={`${selected ? 'selected' : ''} pokemon-btn btn digital-font d-flex py-4 px-4 rounded`}
        onClick={onClick}
        >
        <h4 className='mb-0'>{`N° ${id}`}</h4>
        <div className='flex-fill'>
          <h4 className='mb-0'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
        </div>
      </button>
    </div>
  )
}
