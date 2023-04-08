import "./home.scss";
import {CircularProgressbar} from "react-circular-progressbar";
import {FaUserAlt} from "react-icons/fa";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {useEffect, useState} from "react";
import {
  fetchData,
  sendData,
  deleteData,
} from "../../redux/book/bookAPI";

const Header = () => (
  <nav className="navbar">
    <h2 className="title">Bookstore CMS</h2>
    <div className="links">
      <button>BOOKS</button>
      <button>CATEGORIES</button>
    </div>

    <div className="profile">
      <FaUserAlt />
    </div>
  </nav>
);

const Book = ({
  title,
  author,
  category,
  item_id,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="bookElement">
      <div className="subSection1">
        <p className="category">{category}</p>
        <h2 className="bookTitle">{title}</h2>
        <p className="author">{author}</p>

        <div className="actionLinks">
          <button>Comment</button>
          <button
            onClick={() =>
              dispatch(deleteData(item_id))
            }
          >
            Remove
          </button>
          <button>Edit</button>
        </div>
      </div>
      <div className="subSection2">
        <CircularProgressbar
          value={50}
          strokeWidth={6}
          styles={{
            trail: {stroke: "#e6e6e6"},
            path: {stroke: "#4386bf"},
            root: {width: "80px", height: "80px"},
          }}
          aria-label="Circular progress bar with 40% progress"
        />
        <span>
          <p className="book-percent">8%</p>
          <p className="book-completed">
            Completed
          </p>
        </span>
      </div>
      <div className="subSection3">
        <p className="current-chapter">
          CURRENT CHAPTER
        </p>
        <p className="chapter-name">
          CHAPTER 4: Into The Universe
        </p>
        <button className="update-progress">
          UPDATE PROGRESS
        </button>
      </div>
    </div>
  );
};

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const {books} = useSelector(
    (store) => store.book
  );
  const dispatch = useDispatch();
  const newBook = {
    item_id: `item${
      Object.keys(books).length + 1
    }`,
    title,
    author,
    category,
  };

  return (
    <footer>
      <input
        value={title}
        type="text"
        placeholder="Book title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={author}
        type="text"
        placeholder="Book author"
        onChange={(e) =>
          setAuthor(e.target.value)
        }
      />
      <select
        value={category}
        name="category"
        id="category"
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option>Select category</option>
        <option>Fantasy</option>
        <option>Fiction</option>
        <option>Science Fiction</option>
        <option>Non-fiction</option>
        <option>Romance</option>
        <option>Mystery & thriller</option>
        <option>Horror</option>
        <option>Young Adult</option>
        <option>Children</option>
      </select>

      <button
        onClick={() => {
          dispatch(sendData(newBook));
          setAuthor("");
          setTitle("");
          setCategory("Select category");
        }}
      >
        ADD BOOK
      </button>
    </footer>
  );
};

const Loading = () => {
  return (
    <div className="holdLoading">
      <div className="loading"></div>
    </div>
  );
};

const Home = () => {
  const {books, info} = useSelector(
    (store) => store.book
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  if (info === "pending") {
    return (
      <main className="main">
        <Header />
        <Loading />
        <AddBook />
      </main>
    );
  }
  if (Object.keys(books).length < 1) {
    return (
      <main className="main">
        <Header />
        <h2 className="book-empty">
          Book is empty
        </h2>
        <AddBook />
      </main>
    );
  }

  return (
    <main className="main">
      <Header />
      {Object.keys(books).map((key) => {
        let item = books[key][0];
        return (
          <Book
            key={key}
            title={item.title}
            author={item.author}
            category={item.category}
            item_id={key}
          />
        );
      })}
      <AddBook />
    </main>
  );
};

export default Home;
