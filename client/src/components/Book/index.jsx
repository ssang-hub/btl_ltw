import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

function Book({ book }) {
  return (
    <div className="card m-3" style={{ width: "500px", height: "300px" }}>
      <div className="row g-0 h-100 w-100">
        <div className="h-100 w-50">
          <img src={book.image} alt="Trendy Pants and Shoes" className="img-fluid rounded-start h-100" />
        </div>
        <div className="w-50">
          <div className="card-body">
            <h5 className="card-title"> {book.title}</h5>

            <p className="card-text">-Tác giả: {book.author}</p>
            <p className="card-text">
              <AiOutlineUnorderedList className="mr-2" />
              {book.numberPage}
            </p>
            <p className="card-text">-Thể loại: {book.category}</p>
            <p className="card-text">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
