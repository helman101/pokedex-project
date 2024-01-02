import { useContext, useRef } from 'react'
import { type PokemonFromList } from '../utils/types'
import { PokemonButton } from './PokemonButton'
import { PokeContext } from '../Context/PokeContext'
import { getPokemonListFromUrl } from '../services/pokeApi'

interface Props {
  list: PokemonFromList[]
  loading: boolean
}

export const PokemonList = ({ list, loading }: Props) => {
  const { currentPokemon, nextListUrl, setCurrentPokemon, setPokemonList, setNextListUrl } = useContext(PokeContext)
  const listRef = useRef<HTMLInputElement>(null)

  const listScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (nextListUrl) {
          void getPokemonListFromUrl(nextListUrl)
            .then((res: { results: PokemonFromList[], next: string }) => {
              setPokemonList(true, res.results)
              setNextListUrl(res.next)
            })
        }
      }
    }
  }

  return (
    <div className='w-100 d-flex justify-content-center'>
      <div
        className='pokemon-list rounded d-flex flex-column align-items-center position-relative'
        onScroll={listScroll}
        ref={listRef}
      >
        {loading && <p>Loading...</p>}
        {!loading &&
          list.map((item: PokemonFromList, i: number) =>
            <PokemonButton
              key={i}
              id={i + 1}
              onClick={() => { setCurrentPokemon({ id: i + 1 }) } }
              pokemon={item}
              selected={ currentPokemon?.id === i + 1 }/>
          )}
      </div>
    </div>
  )
}
