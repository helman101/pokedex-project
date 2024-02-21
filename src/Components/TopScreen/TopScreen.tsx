import { PokemonInfo } from '../PokemonInfo/PokemonInfo'
import {
  topScreenMargin,
  pad,
  padRight,
  padLeft,
  squareStart,
  topScreen,
  points,
  square,
  squareTop,
  squareEnd,
  squareBottom,
  dsFrame
} from './style.module.scss'

export const TopScreen = () => {
  return (
    <section>
      <div className={`${topScreenMargin} m-auto position-relative`}>
        <div className={`${pad} ${padLeft} position-absolute rounded-1`} />
        <div className={`${topScreen} d-flex justify-content-center align-items-center border-bottom-0`}>
          <div className={points} />
          <div className={`${square} ${squareTop} ${squareEnd} position-absolute rounded-2`} />
          <div className={`${square} ${squareTop} ${squareStart} position-absolute rounded-2`} />
          <div className={`${dsFrame} rounded-3`}>
            <PokemonInfo />
          </div>
          <div className={`${square} ${squareBottom} ${squareEnd} position-absolute rounded-2`} />
          <div className={`${square} ${squareBottom} ${squareStart} position-absolute rounded-2`} />
          <div className={points} />
        </div>
        <div className={`${pad} ${padRight} position-absolute rounded-1`} />
      </div>
    </section>
  )
}
