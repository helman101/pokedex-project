import { type ChangeEvent, useEffect } from 'react'
import { usePokeApi } from '../../services/pokeApi'
import { FiltersRadio } from './FiltersRadio'
import { FiltersEnum } from '../../hooks/FilterStore/types.d'
import { useFilterStore } from '../../hooks/FilterStore/useFilterStore'
import styles from './styles.module.scss'

export const Filters = () => {
  const {
    typeFilter,
    genFilter,
    typeList,
    genList,
    checkedFilter,
    setGenFilter,
    setTypeFilter,
    setCheckedFilter,
    setGenList,
    setTypeList
  } = useFilterStore()

  const {
    getFirstPokemonList,
    getPokemonGenerationList,
    getPokemonTypeList,
    getPokemonListByGen,
    getPokemonListByType
  } = usePokeApi()

  const getTypeList = async () => {
    const list = await getPokemonTypeList()
    if (list) setTypeList(list)
  }

  const getGenList = async () => {
    const list = await getPokemonGenerationList()
    if (list) setGenList(list)
  }

  useEffect(() => {
    void getTypeList()
    void getGenList()
  }, [])

  useEffect(() => {
    if (checkedFilter === FiltersEnum.all) {
      void getFirstPokemonList()
    }
    if (checkedFilter === FiltersEnum.generation) {
      void getPokemonListByGen(genFilter)
    }
    if (checkedFilter === FiltersEnum.type) {
      void getPokemonListByType(typeFilter)
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
