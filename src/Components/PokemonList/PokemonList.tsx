import { useContext, useEffect, useRef } from 'react'
import { type ItemFromList } from '../../hooks/PokeStore/types'
import { PokemonButton } from '../PokemonButton/PokemonButton'
import { PokeContext } from '../../Context/PokeContext'
import { getPokemonListFromUrl } from '../../services/pokeApi'
import { Loader } from '../Loader/Loader'
import { Filters } from '../Filters/Filters'
import styles from './style.module.scss'

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
    if (!loadingPokemonList && list.length > 0) {
      listRef.current?.scrollTo({ top: 0 })
      setCurrentPokemon({ name: list[0].name })
    }
  }, [loadingPokemonList, list])

  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='screen d-flex align-items-center justify-content-center'>
        <div className={`h-100 w-100 row ${styles.pokemonList} rounded`}>
          <div
            className={`col-6 ${styles.pokemonCol} pt-2 d-flex flex-column align-items-center position-relative`}
            onScroll={listScroll}
            ref={listRef}
          >
              {loading && <Loader color='orange' />}
              {!loading &&
                list.map((item: ItemFromList, i: number) =>
                  <PokemonButton
                    key={i}
                    id={i + 1}
                    onClick={() => { setCurrentPokemon({ name: item.name }) } }
                    pokemon={item}
                    selected={ currentPokemon.name === item.name }/>
                )}
              {loadingInfinityScroll && <Loader color='orange' />}
          </div>
          <div className='col'>
            <Filters />
          </div>
        </div>
      </div>
    </div>
  )
}
