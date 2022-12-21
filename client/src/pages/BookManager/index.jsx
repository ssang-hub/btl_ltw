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
          <div className="d-flex ">
            <nav aria-label="..." className="m-auto">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabindex="-1">
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item ">
                  <a className="page-link" href="#">
                    2 <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default BookManager;
