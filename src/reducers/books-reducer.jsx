import {
  GET_BOOKS,
  GET_BOOKS_IS_FETCHING,
  GET_BOOKS_IS_FAILURE,
  GET_MORE_BOOKS,
  GET_MORE_BOOKS_IS_FETCHING
} from "../actions/types";

const defaultState = {
  books: [],
  searchOptions: {},
  error: null,
  totalItems: 0,
  isFetching: false,
  isLoading: false,
}

export const booksReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload.books.items,
        searchOptions: payload.searchOptions,
        error: null,
        totalItems: payload.books.totalItems,
        isFetching: false,
      }
    case GET_MORE_BOOKS:
      return {
        ...state,
        books: [...state.books, ...payload.books.items],
        searchOptions: payload.searchOptions,
        error: null,
        isLoading: false
      }
    case GET_BOOKS_IS_FETCHING:
      return {
        ...state,
        isFetching: payload,
      }
    case GET_MORE_BOOKS_IS_FETCHING:
      return {
        ...state,
        isLoading: payload,
      }
    case GET_BOOKS_IS_FAILURE:
      return {
        ...state,
        error: payload,
        isFetching: false,
      }
    default:
      return state
  }
}