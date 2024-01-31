import style from './styles.module.scss'

interface PropType {
  color: string
}

export const Loader = ({ color }: PropType) => {
  return (
    <div className={`${style.loader} ${style[color]} rounded-circle my-3`} />
  )
}
