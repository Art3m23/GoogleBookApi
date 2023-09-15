import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { booksReducer } from "./books-reducer";



const rootReducer = combineReducers({
  books: booksReducer,
});


export const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  },
  applyMiddleware([thunk])
);