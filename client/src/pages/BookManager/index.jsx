import React from "react";
import axios from "axios";
import Footer from "../../components/footer";
import { useState, useEffect, useContext } from "react";
import Context from "../../store/Context";
import Container from "./Container";
import "./style.scss";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function BookManager() {
  const [logged, setLogged] = useContext(Context);
  const [books, setBooks] = useState(undefined);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const result = await axios.get("/getAllBooks");
        setBooks(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      {books && (
        <>
          <header>
            {logged && <Sidebar option={"manager"} />}
            <Header />
          </header>
          <div style={{ marginTop: "60px" }}>
            <div className="container pt-4"></div>
          </div>
          <Container books={books} />
          <Footer />
        </>
      )}
    </>
  );
}

export default BookManager;
