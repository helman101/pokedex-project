import {
  crossWrapper,
  cross,
  crossLine,
  lineTop,
  lineRight,
  lineLeft,
  lineBottom
} from './style.module.scss'

export const CrossPad = () => {
  return (
    <div className={`${crossWrapper} position-absolute`}>
      <div className={`${cross} rounded`}>
        <div className={`${crossLine} ${lineTop} position-absolute`} />
        <div className={`${crossLine} ${lineRight} position-absolute`} />
        <div className={`${crossLine} ${lineBottom} position-absolute`} />
        <div className={`${crossLine} ${lineLeft} position-absolute`} />
      </div>
    </div>
  )
}
