import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { getPokemonInfo } from '../../services/pokeApi'
import { type CurrentPokemon, type usePokeStoreI } from '../../hooks/PokeStore/types'
import { PokeContext } from '../../Context/PokeContext'

export const PokemonInfo = () => {
  const {
    currentPokemon,
    setCurrentPokemon
  } = useContext<usePokeStoreI>(PokeContext)

  useEffect(() => {
    if (currentPokemon.name) {
      void getPokemonInfo(currentPokemon.name)
        .then((res: CurrentPokemon) => { setCurrentPokemon(res) })
    }
  }, [currentPokemon.id])

  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className={`${styles.pokeInfoWrapper} rounded`}>
        <div className={`${styles.pokeInfo} screen rounded d-flex align-items-center justify-content-center`}>
          <div className='row w-100'>
            <div className='col-5 d-flex align-items-center'>
              <img
                className={styles.pokeImg}
                src={currentPokemon.sprites?.frontDefault}
                alt={currentPokemon.name}
              />
            </div>
            <div className='col ps-0 pe-3'>
              <div className={`${styles.stats} bg-white rounded px-3 py-2`}>
                <h5 className='text-center'>{`${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}`}</h5>
                <table className='table small'>
                  <tbody>
                    <tr>
                      <th>No.</th>
                      <td className='text-center'>{currentPokemon.id}</td>
                    </tr>
                    <tr>
                      <th className=''>Types</th>
                      <td className='d-flex justify-content-center flex-wrap' style={{ gap: '1rem' }}>
                        {currentPokemon.types?.map(
                          (type: string, i: number) => (
                            <span key={i}>{type}</span>
                          )
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td className='text-center'>{`${(currentPokemon.weight ?? 0) / 10} kg`}</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td className='text-center'>{`${(currentPokemon.height ?? 0) / 10} m`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
