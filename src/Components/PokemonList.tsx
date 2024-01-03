import { useContext, useRef } from 'react'
import { type PokemonFromList } from '../utils/types'
import { PokemonButton } from './PokemonButton'
import { PokeContext } from '../Context/PokeContext'
import { getPokemonListFromUrl } from '../services/pokeApi'
import { Loader } from './Loader'

interface Props {
  list: PokemonFromList[]
  loading: boolean
}

export const PokemonList = ({ list, loading }: Props) => {
  const { loadingInfinityScroll, currentPokemon, nextListUrl, setCurrentPokemon, setPokemonList, setNextListUrl, setLoadingInfinityScroll } = useContext(PokeContext)
  const listRef = useRef<HTMLInputElement>(null)

  const listScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight) {
        if (nextListUrl) {
          setLoadingInfinityScroll()
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
        {loading && <Loader />}
        {!loading &&
          list.map((item: PokemonFromList, i: number) =>
            <PokemonButton
              key={i}
              id={i + 1}
              onClick={() => { setCurrentPokemon({ id: i + 1 }) } }
              pokemon={item}
              selected={ currentPokemon?.id === i + 1 }/>
          )}
        {loadingInfinityScroll && <Loader />}
      </div>
    </div>
  )
}
