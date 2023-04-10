import axios from "axios";


const item = {
  item_id: "item1",
  title: "Twelve",
  author: "ME",
  category: "Fantasy",
};
export const sendData = async (item) => {
  const {item_id, title, author, category} = item;
  const data = {
    item_id: item_id,
    title: title, 
    author: author,
    category: category,
  };
  const api =
    "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/k2KrkKjiqwBlRvvqvmbL/books";

  try {
    const response = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = response.data;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// sendData(item); 
const item_id = 'item1'
const api =
    "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/vFHUp6rXkWC0OA0uJsAx/books/" +
    item_id;

    console.log(api)