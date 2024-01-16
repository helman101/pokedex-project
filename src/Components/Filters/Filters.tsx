import React, { type ChangeEvent, useEffect, useContext } from 'react'
import { getFirstPokemonList, getPokemonGenerationList, getPokemonListByGen, getPokemonListByType, getPokemonTypeList } from '../../services/pokeApi'
import { FiltersRadio } from './FiltersRadio'
import { FiltersEnum } from '../../hooks/FilterStore/types.d'
import { type ItemFromList, type usePokeStoreI } from '../../utils/types'
import { PokeContext } from '../../Context/PokeContext'
import { useFilterStore } from '../../hooks/FilterStore/useFilterStore'

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
    await getFirstPokemonList()
      .then((res: { results: ItemFromList[], next: string }) => {
        setPokemonList(false, res.results)
        setNextListUrl(res.next)
      })
  }

  const getPokemonByType = async () => {
    setLoadingPokemonList()
    await getPokemonListByType(typeFilter)
      .then((res: ItemFromList[]) => {
        setPokemonList(false, res)
        setNextListUrl(undefined)
      })
  }

  const getPokemonByGen = async () => {
    setLoadingPokemonList()
    await getPokemonListByGen(genFilter)
      .then((res: ItemFromList[]) => {
        setPokemonList(false, res)
        setNextListUrl(undefined)
      })
  }

  useEffect(() => {
    void getPokemonTypeList()
      .then((res: Array<{ value: string, name: string }>) => { setTypeList(res) })
    void getPokemonGenerationList()
      .then((res: Array<{ value: string, name: string }>) => { setGenList(res) })
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
      <div className="filters-wrapper rounded-3">
        <div className='filters px-2 py-5 rounded-3'>
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
