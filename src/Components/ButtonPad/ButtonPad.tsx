import styles, {
  buttonWrapper,
  btn
} from './style.module.scss'

export const ButtonPad = () => {
  return (
    <div className={`${buttonWrapper} position-absolute`}>
      <Btn position='Top' text='X' />
      <Btn position='Right' text='A' />
      <Btn position='Bottom' text='B' />
      <Btn position='Left' text='Y' />
    </div>
  )
}

export const Btn = ({ position, text }: { position: string, text: string }) => {
  return (
    <div
      className={
      `${btn} ${styles['btn' + position]} rounded-circle position-absolute p-0 d-flex align-items-center justify-content-center`
      }
    >
      {text}
    </div>
  )
}
