import pokeballChecked from '../assets/pokeball-checked.png'
import pokeball from '../assets/pokeball.png'

interface Props {
  isCheck: boolean
  filterName: 'all' | 'gen' | 'type'
  onChange: () => void
}

export const FiltersRadio = ({ isCheck, filterName, onChange }: Props) => {
  return (
    <div className="form-check ps-0">
      <input
        type="radio"
        className='form-check-input poke-radio'
        name='filters'
        id={`${filterName}Filter`}
        onChange={onChange}
      />
      <label htmlFor={`${filterName}Filter`} className='d-flex align-items-center'>
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
