import { useReducer } from 'react'
import {
  type FilterState,
  FiltersEnum, FilterActions,
  type FilterStoreAction,
  type useFilterStoreI,
  type FilterListItem
} from './types.d'

export const initialState: FilterState = {
  genList: [],
  typeList: [],
  genFilter: 'generation-i',
  typeFilter: 'normal',
  checkedFilter: FiltersEnum.all
}

const reducer = (state: FilterState, action: FilterStoreAction): FilterState => {
  const { type } = action

  if (type === FilterActions.setGenList) {
    return {
      ...state,
      genList: action.payload
    }
  }

  if (type === FilterActions.setTypeList) {
    return {
      ...state,
      typeList: action.payload
    }
  }

  if (type === FilterActions.setGenFilter) {
    return {
      ...state,
      genFilter: action.payload
    }
  }

  if (type === FilterActions.setTypeFilter) {
    return {
      ...state,
      typeFilter: action.payload
    }
  }

  if (type === FilterActions.setCheckedFilter) {
    return {
      ...state,
      checkedFilter: action.payload
    }
  }

  return state
}

export const useFilterStore = (): useFilterStoreI => {
  const [{
    genList,
    typeList,
    typeFilter,
    genFilter,
    checkedFilter
  }, dispatch] = useReducer(reducer, initialState)

  const setGenList = (list: FilterListItem[]) => {
    dispatch({ type: FilterActions.setGenList, payload: list })
  }
  const setTypeList = (list: FilterListItem[]) => {
    dispatch({ type: FilterActions.setTypeList, payload: list })
  }
  const setGenFilter = (gen: string) => {
    dispatch({ type: FilterActions.setGenFilter, payload: gen })
  }
  const setTypeFilter = (type: string) => {
    dispatch({ type: FilterActions.setTypeFilter, payload: type })
  }
  const setCheckedFilter = (filter: string) => {
    dispatch({ type: FilterActions.setCheckedFilter, payload: filter })
  }

  return {
    genList,
    typeList,
    typeFilter,
    genFilter,
    checkedFilter,
    setGenList,
    setTypeList,
    setGenFilter,
    setTypeFilter,
    setCheckedFilter
  }
}
