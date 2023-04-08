import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  books: [],
  data: null,
  info: "",
};

const bookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {
    apiRequest: (state, {payload}) => {
      return {
        ...state,
        info: payload
      };
    },
    fetchDataSuccess: (state, {payload}) => {
      return {
        ...state,
        data: payload,
        books: payload,
      };
    },
    fetchDataError: (state, {payload}) => {
      return {
        ...state,
        info: "Error: " + payload.toString(),
      };
    },

    addBook: (state, action) => {
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    },
    removeBook: (state, {payload}) => {
      const {item_id} = payload;
      const newState = {...state.books};
      delete newState[item_id];
      return {
        ...state,
        books: newState,
        info: 'Success',
      };
    },
  },
});

export const {
  addBook,
  removeBook,
  apiRequest,
  fetchDataSuccess,
  fetchDataError,
  postDataSuccess,
  postDataFailure,
} = bookSlice.actions;
export default bookSlice.reducer;
