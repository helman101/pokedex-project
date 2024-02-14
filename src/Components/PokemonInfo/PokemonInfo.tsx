import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { getPokemonInfo } from '../../services/pokeApi'
import { type CurrentPokemon, type usePokeStoreI } from '../../hooks/PokeStore/types'
import { PokeContext } from '../../Context/PokeContext'
import { Loader } from '../Loader/Loader'
import PokemonTypes from '../../assets/pokemon_Types.png'
import { getTypeImagePosition } from './constants'

export const PokemonInfo = () => {
  const {
    loadingCurrentPokemonData,
    currentPokemon,
    setCurrentPokemon,
    setLoadingCurrentPokemonData
  } = useContext<usePokeStoreI>(PokeContext)

  useEffect(() => {
    if (currentPokemon.name) {
      setLoadingCurrentPokemonData()
      void getPokemonInfo(currentPokemon.name)
        .then((res: CurrentPokemon) => { setCurrentPokemon(res) })
    }
  }, [currentPokemon.name])

  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className={`${styles.pokeInfoWrapper} rounded`}>
        <div className={`${styles.pokeInfo} screen rounded d-flex align-items-center justify-content-center`}>
          <div className='row w-100'>
            <div className='col-5 d-flex flex-column justify-content-center'>
              <div className={`${
                  styles.pokeImgWrapper
                } d-flex flex-column justify-content-center align-items-center border border-white rounded-circle`}>
                {loadingCurrentPokemonData
                  ? <Loader color='white' />
                  : (
                      <img
                        className={styles.pokeImg}
                        src={currentPokemon.sprites?.frontDefault}
                        alt={currentPokemon.name}
                        // onLoad={() => { setLoadingCurrentPokemonData() }}
                      />
                    )}
              </div>
            </div>
            <div className='col'>
              <div className={`${styles.stats} d-flex flex-column justify-content-center align-items-center border border-white rounded px-4 py-3`}>
                {loadingCurrentPokemonData
                  ? <Loader color='white' />
                  : (
                      <>
                        <h5 className='text-center mb-4'>
                          {`${
                            currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)
                          }`}
                        </h5>
                        <table className='table table-borderless small'>
                          <tbody>
                            <tr>
                              <th>No.</th>
                              <td className='text-end'>{currentPokemon.id}</td>
                            </tr>
                            <tr>
                              <th style={{ verticalAlign: 'middle' }}><span>Types</span></th>
                              <td className='d-flex justify-content-end flex-wrap' style={{ gap: '0.2rem' }}>
                                {currentPokemon.types?.map(
                                  (type: string, i: number) => (
                                    <div className={styles.typeImage} key={i} style={{ backgroundImage: `url(${PokemonTypes})`, ...getTypeImagePosition[type.toLocaleLowerCase()] }} />
                                  )
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Weight</th>
                              <td className='text-end'>{`${(currentPokemon.weight ?? 0) / 10} kg`}</td>
                            </tr>
                            <tr>
                              <th>Height</th>
                              <td className='text-end'>{`${(currentPokemon.height ?? 0) / 10} m`}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
