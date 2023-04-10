import "./App.scss";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
