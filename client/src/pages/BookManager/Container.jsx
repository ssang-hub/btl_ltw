import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppName } from "../../config/variable";
import Context from "../../store/Context";

function Conttainer({ books }) {
  const [logged, setLogged] = useContext(Context);
  const [deleteBookID, setDeleteBookID] = useState(undefined);
  const navigate = useNavigate();
  const handleDelete = () => {
    const deleteAction = async () => {
      try {
        await axios({
          method: "DELETE",
          url: "/deleteBook",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
          },
          data: {
            id: deleteBookID,
          },
        });
        navigate("/");
      } catch (error) {
        console.log("error");
      }
    };
    deleteAction();
    navigate("/bookmanager");
  };

  return (
    <>
      {books && (
        <div>
          <div className="d-flex">
            <div className="container">
              <div className="row">
                <h1>List Books</h1>
              </div>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Mã Sách</th>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Ngày xuất bản</th>
                    <th>Số trang</th>
                    {logged && <th>Hành động</th>}
                  </tr>
                </thead>
                <tbody className="table-dark">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <th>{book.id}</th>
                      <th>{book.title}</th>
                      <th>{book.author}</th>
                      <th>{book.category}</th>
                      <th>{book.date}</th>
                      <th>{book.numberPage}</th>
                      {logged && (
                        <th>
                          <a href={`edit/book/${book.id}`} className="btn btn-outline-success mx-2">
                            Edit
                          </a>
                          <button
                            className="btn btn-outline-danger mx-2"
                            type="button"
                            data-toggle="modal"
                            data-target="#modal-delete"
                            onClick={(e) => {
                              setDeleteBookID(book.id);
                            }}
                          >
                            Delete
                          </button>
                        </th>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal fade" id="modal-delete" role="dialog" aria-labelledby="modal-deleteCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Xóa Sách
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Bạn có muốn xóa không?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Thoát
                  </button>
                  <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={handleDelete}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Conttainer;
