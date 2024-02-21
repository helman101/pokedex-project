import { type ChangeEvent, useEffect, useContext } from 'react'
import { getFirstPokemonList, getPokemonGenerationList, getPokemonListByGen, getPokemonListByType, getPokemonTypeList } from '../../services/pokeApi'
import { FiltersRadio } from './FiltersRadio'
import { type FilterListItem, FiltersEnum } from '../../hooks/FilterStore/types.d'
import { type ItemFromList, type usePokeStoreI } from '../../hooks/PokeStore/types'
import { PokeContext } from '../../Context/PokeContext'
import { useFilterStore } from '../../hooks/FilterStore/useFilterStore'
import styles from './styles.module.scss'
import { type ApiListResponse } from '../../services/types'

export const Filters = () => {
  const {
    typeFilter,
    genFilter,
    typeList,
    genList,
    checkedFilter,
    setTypeList,
    setGenList,
    setGenFilter,
    setTypeFilter,
    setCheckedFilter
  } = useFilterStore()

  const {
    setLoadingPokemonList,
    setPokemonList,
    setNextListUrl
  } = useContext<usePokeStoreI>(PokeContext)

  const getPokemonList = async () => {
    setLoadingPokemonList()
    const res: ApiListResponse | undefined = await getFirstPokemonList()
    if (res) {
      setPokemonList(false, res.results)
      setNextListUrl(res.next)
    }
  }

  const getPokemonByType = async () => {
    setLoadingPokemonList()
    const res: ItemFromList[] | undefined = await getPokemonListByType(typeFilter)
    if (res) {
      setPokemonList(false, res)
      setNextListUrl(undefined)
    }
  }

  const getPokemonByGen = async () => {
    setLoadingPokemonList()
    const res: ItemFromList[] | undefined = await getPokemonListByGen(genFilter)
    if (res) {
      setPokemonList(false, res)
      setNextListUrl(undefined)
    }
  }

  const getTypeList = async () => {
    const list: FilterListItem[] | undefined = await getPokemonTypeList()
    if (list) setTypeList(list)
  }

  const getGenList = async () => {
    const list: FilterListItem[] | undefined = await getPokemonGenerationList()
    if (list) setGenList(list)
  }

  useEffect(() => {
    void getTypeList()
    void getGenList()
  }, [])

  useEffect(() => {
    if (checkedFilter === FiltersEnum.all) {
      void getPokemonList()
    }
    if (checkedFilter === FiltersEnum.generation) {
      void getPokemonByGen()
    }
    if (checkedFilter === FiltersEnum.type) {
      void getPokemonByType()
    }
  }, [checkedFilter, typeFilter, genFilter])

  return (
    <div className='game-font h-100 d-flex align-items-center justify-content-center'>
      <div className={`${styles.filtersWrapper} rounded-3`}>
        <div className={`${styles.filters} px-2 py-5 rounded-3`}>
          <div className='px-1'>
            <h3 className='mb-4 text-center'>Filters</h3>
            <div className='mb-2 mt-3'>
              <FiltersRadio
                filterName={FiltersEnum.all}
                isCheck={checkedFilter === FiltersEnum.all}
                onChange={() => { setCheckedFilter(FiltersEnum.all) }}
              />
              <FiltersRadio
                filterName={FiltersEnum.type}
                isCheck={checkedFilter === FiltersEnum.type}
                onChange={() => { setCheckedFilter(FiltersEnum.type) }}
              />
              {checkedFilter === 'type' && (
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  value={typeFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setTypeFilter(e.target.value)
                  }}
                >
                  {typeList.map((type, i) =>
                    <option key={i} value={type.value}>
                      {type.name}
                    </option>
                  )}
                </select>
              )}
            </div>
            <div>
              <FiltersRadio
                filterName={FiltersEnum.generation}
                isCheck={checkedFilter === FiltersEnum.generation}
                onChange={() => { setCheckedFilter(FiltersEnum.generation) }}
              />
              {checkedFilter === FiltersEnum.generation && (
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  value={genFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setGenFilter(e.target.value)
                  }}
                >
                  {genList.map((gen, i) =>
                    <option key={i} value={gen.value}>
                      {gen.name}
                    </option>
                  )}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
