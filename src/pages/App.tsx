import { useContext, useEffect } from 'react'
import { PokemonList } from '../Components/PokemonList'
import '../style.scss'
import { getFirstPokemonList } from '../services/pokeApi'
import { type usePokeStoreI, type ItemFromList } from '../utils/types'
import { PokeContext } from '../Context/PokeContext'

export const App = () => {
  const {
    pokemonList,
    loadingPokemonList,
    setLoadingPokemonList,
    setPokemonList,
    setNextListUrl
  } = useContext<usePokeStoreI>(PokeContext)

  const getPokemonList = async () => {
    setLoadingPokemonList()
    await getFirstPokemonList()
      .then((res: { results: ItemFromList[], next: string }) => {
        setPokemonList(false, res.results)
        setNextListUrl(res.next)
      })
  }

  useEffect(() => {
    void getPokemonList()
  }, [])

  return (
    <main>
      <section>
        <PokemonList
          loading={loadingPokemonList}
          list={pokemonList}
        />
      </section>
    </main>
  )
}
