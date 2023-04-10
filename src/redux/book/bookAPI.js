import axios from "axios";
import {
  fetchDataError,
  fetchDataSuccess,
  apiRequest,
  removeBook,
} from "./bookSlice";

export const fetchData = () => {
  const api =
    "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/vFHUp6rXkWC0OA0uJsAx/books";
  return async (dispatch) => {
    dispatch(apiRequest("pending"));
    try {
      const response = await axios.get(api);
      const data = response.data;
      dispatch(fetchDataSuccess(data));
      dispatch(apiRequest("Success"));
    } catch (err) {
      dispatch(apiRequest("Error:" + err));
    }
  };
};

export const sendData = (item) => {
  const {item_id, title, author, category} = item;
  const data = {
    item_id: item_id,
    title: title,
    author: author,
    category: category,
  };

  const api =
    "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/vFHUp6rXkWC0OA0uJsAx/books";
  return async (dispatch) => {
    dispatch(apiRequest("pending"));

    try {
      const response = await axios.post(
        api,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = response.data;
      dispatch(apiRequest(res));
      dispatch(fetchData());
    } catch (error) {
      dispatch(apiRequest(error));
    }
  };
};

export const deleteData = (item_id) => {
  const api =
    "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/vFHUp6rXkWC0OA0uJsAx/books/" +
    item_id;

  return async (dispatch) => {
    dispatch(apiRequest("pending"));

    try {
      const request = axios.delete(api);
      const result = await request.data;
      dispatch(apiRequest(result));
      dispatch(removeBook({item_id}))
    } catch (error) {
      dispatch(apiRequest(error));
    }
  };
};
