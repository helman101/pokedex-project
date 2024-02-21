import {
  middle,
  separator,
  mic,
  batteryContainer,
  battery,
  batteryOn,
  batteryOff,
  sepLeft,
  sepRight
} from './style.module.scss'

export const Middle = () => {
  return (
    <section>
      <div className={`${middle} m-auto rounded-pill mt-1 position-relative d-flex justify-content-around align-items-center`}>
        <div className={`${separator} ${sepLeft} position-absolute`} />
        <div className={`${mic} rounded-pill`} />
        <div className={`${separator} ${sepRight} position-absolute`} />
        <div className={`${batteryContainer} h-100 d-flex position-absolute d-flex align-items-center`}>
          <div className={`${battery} ${batteryOff} rounded-pill`} />
          <div className={`${battery} ${batteryOn} rounded-pill`} />
        </div>
      </div>
    </section>
  )
}
