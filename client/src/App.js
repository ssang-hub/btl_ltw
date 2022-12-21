import "./App.css";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Home from "./pages/home";
import BookManager from "./pages/BookManager";
import CreateBook from "./pages/createBook";
import Cart from "./pages/cart";
import BookDetail from "./pages/bookDetail";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<Home />} />
        <Route path="/createBook" element={<CreateBook option={undefined} />} />
        <Route path="/edit/book/:id" element={<CreateBook option={"update"} />} />
        <Route path="/bookmanager" element={<BookManager />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
