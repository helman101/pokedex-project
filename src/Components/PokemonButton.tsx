import React from 'react'
import { type ItemFromList } from '../utils/types'

interface Props {
  id: number
  pokemon: ItemFromList
  selected?: boolean
  onClick: () => void
}

export const PokemonButton = ({ id, pokemon, selected, onClick }: Props) => {
  return (
    <div className={`${selected ? 'selected' : ''} btn-wrapper p-1 rounded w-100`}>
      <button
        className={`${selected ? 'selected' : ''} pokemon-btn btn game-font d-flex align-items-center py-4 px-3 rounded w-100`}
        onClick={onClick}
        >
        <small className='mb-0'>{`N°${id}`}</small>
        <div className='flex-fill'>
          <small className='mb-0'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</small>
        </div>
      </button>
    </div>
  )
}
