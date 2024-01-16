export interface FilterState {
  genList: FilterListItem[]
  typeList: FilterListItem[]
  genFilter: string
  typeFilter: string
  checkedFilter: FilterNames
}

export interface FilterListItem {
  value: string
  name: string
}

export type FilterNames = Filters.all | Filters.generation | Filters.type

export enum FiltersEnum {
  all = 'all',
  generation = 'gen',
  type = 'type'
}

export enum FilterActions {
  setGenList = 'SET_GEN_LIST',
  setTypeList = 'SET_TYPE_LIST',
  setGenFilter = 'SET_GEN_FILTER',
  setTypeFilter = 'SET_TYPE_FILTER',
  setCheckedFilter = 'SET_CHECKED_FILTER',
}

export interface useFilterStoreI extends FilterState {
  setGenList: (list: FilterListItem[]) => void
  setTypeList: (list: FilterListItem[]) => void
  setGenFilter: (gen: string) => void
  setTypeFilter: (type: string) => void
  setCheckedFilter: (filter: string) => void
}

export type FilterStoreAction =
  | { type: FilterActions.setGenList, payload: FilterListItem[] }
  | { type: FilterActions.setTypeList, payload: FilterListItem[] }
  | { type: FilterActions.setGenFilter, payload: string }
  | { type: FilterActions.setTypeFilter, payload: string }
  | { type: FilterActions.setCheckedFilter, payload: string }
