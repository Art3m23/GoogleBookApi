import api from "../services/api";
import { MAX_RESULTS } from "../constants";
import { API_KEY } from "../constants";
import {
  GET_BOOKS,
  GET_BOOKS_IS_FETCHING,
  GET_BOOKS_IS_FAILURE,
  GET_MORE_BOOKS,
  GET_MORE_BOOKS_IS_FETCHING
} from "./types";


export const getBooks = ({ searchTerm, category, startIndex, sort }) => (
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BOOKS_IS_FETCHING,
        payload: { isFetching: true },
      });
      const response = await api.get(`volumes?key=${API_KEY}&q=${searchTerm}+subject:${category}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&orderBy=${sort}`);
      dispatch({
        type: GET_BOOKS,
        payload: { books: response.data, searchOptions: { searchTerm, category, startIndex, sort } },
      });

    } catch (e) {
      dispatch({
        type: GET_BOOKS_IS_FAILURE,
        payload: { error: e },
      });
    }
  }
);


export const getMoreBooks = (searchOptions) => (
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MORE_BOOKS_IS_FETCHING,
        payload: { isLoading: true },
      });
      const response = await api.get(`volumes?key=${API_KEY}&q=${searchOptions.searchTerm}+subject:${searchOptions.category}&maxResults=${MAX_RESULTS}&startIndex=${searchOptions.startIndex}&orderBy=${searchOptions.sort}`);
      dispatch({
        type: GET_MORE_BOOKS,
        payload: { books: response.data, searchOptions },
      });

    } catch (e) {
      dispatch({
        type: GET_BOOKS_IS_FAILURE,
        payload: { error: e },
      });
    }
  }
);


export const getCurrentBook = async (id, setBook, setLoader, setError) => {
  try {
    setLoader(true);
    const response = await api.get(`volumes/${id}`);
    setBook(response.data);
  } catch (e) {
    setError(true);
  } finally {
    setLoader(false);
  }
};

