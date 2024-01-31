import pokeballChecked from '../../assets/pokeball-checked.png'
import pokeball from '../../assets/pokeball.png'
import styles from './styles.module.scss'

interface Props {
  isCheck: boolean
  filterName: string
  onChange: () => void
}

export const FiltersRadio = ({ isCheck, filterName, onChange }: Props) => {
  return (
    <div className="form-check ps-0">
      <input
        type="radio"
        className={`form-check-input ${styles.pokeRadio}`}
        name='filters'
        id={`${filterName}Filter`}
        onChange={onChange}
      />
      <label htmlFor={`${filterName}Filter`} className='d-flex align-items-baseline'>
        <img
          className='me-1'
          src={isCheck ? pokeballChecked : pokeball}
          alt="pokeball"
          width={15}
        />
        <small className='ms-1'>{filterName.charAt(0).toUpperCase() + filterName.slice(1)}</small>
      </label>
    </div>
  )
}
