import { useContext, useEffect, useRef } from 'react'
import { type ItemFromList } from '../utils/types'
import { PokemonButton } from './PokemonButton'
import { PokeContext } from '../Context/PokeContext'
import { getPokemonListFromUrl } from '../services/pokeApi'
import { Loader } from './Loader'
import { Filters } from './Filters/Filters'

interface Props {
  list: ItemFromList[]
  loading: boolean
}

export const PokemonList = ({ list, loading }: Props) => {
  const {
    loadingPokemonList,
    loadingInfinityScroll,
    currentPokemon,
    nextListUrl,
    setCurrentPokemon,
    setPokemonList,
    setNextListUrl,
    setLoadingInfinityScroll
  } = useContext(PokeContext)

  const listRef = useRef<HTMLInputElement>(null)

  const listScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight) {
        if (nextListUrl) {
          setLoadingInfinityScroll()
          void getPokemonListFromUrl(nextListUrl)
            .then((res: { results: ItemFromList[], next: string }) => {
              setPokemonList(true, res.results)
              setNextListUrl(res.next)
            })
        }
      }
    }
  }

  useEffect(() => {
    if (loadingPokemonList) {
      listRef.current?.scrollTo({ top: 0 })
      setCurrentPokemon({ id: 1 })
    }
  }, [loadingPokemonList])

  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='row pokemon-list rounded'>
        <div
          className='col-6 pokemon-col pt-2 d-flex flex-column align-items-center position-relative'
          onScroll={listScroll}
          ref={listRef}
        >
            {loading && <Loader />}
            {!loading &&
              list.map((item: ItemFromList, i: number) =>
                <PokemonButton
                  key={i}
                  id={i + 1}
                  onClick={() => { setCurrentPokemon({ id: i + 1 }) } }
                  pokemon={item}
                  selected={ currentPokemon?.id === i + 1 }/>
              )}
            {loadingInfinityScroll && <Loader />}
        </div>
        <div className='col'>
          <Filters />
        </div>
      </div>
    </div>
  )
}
