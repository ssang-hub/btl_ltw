import React from "react";
// import * as variable from "../../config/variable";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import axios from "axios";
import Book from "../../components/Book";

function Home() {
  const [books, setBooks] = useState(undefined);
  useEffect(() => {
    //từ client get tất cả các book
    const getAllBooks = async () => {
      try {
        const data = await axios.get("/getAllBooks");
        setBooks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBooks();
  }, []);
  return (
    <>
      {books && (
        <>
          <Header />
          <div className="container d-flex flex-wrap" style={{ marginTop: "30px" }}>
            {books.map((book) => (
              <div key={book.id}>
                <Book book={book} />
              </div>
            ))}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
