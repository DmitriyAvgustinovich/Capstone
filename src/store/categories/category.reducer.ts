import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess
} from "./category.action"
import { Category } from "./category.types"
import { AnyAction } from 'redux'

export type CategoriesState = {
  readonly categories: Category[] | undefined
  readonly isLoading: boolean
  readonly error: Error | null | undefined
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [] as Category[],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false }
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false }
  }

  return state
}