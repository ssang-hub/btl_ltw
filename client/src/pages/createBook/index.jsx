import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Context from "../../store/Context";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Sidebar from "../../components/sidebar";
import { AppName } from "../../config/variable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateBook({ option }) {
  const [logged, setLogged] = useContext(Context);
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState("http://localhost:3001/images/default-book.png");
  const [book, setBook] = useState({ id: 0, title: "", author: "", numberPage: 0, description: "", date: "", category: "", image: "", price: 0 });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate("/bookmanager");
    }
  });
  useEffect(() => {
    if (option) {
      const getBook = async () => {
        try {
          const result = await axios.get(`/editBook/${id}`);
          const data = result.data;
          setBook((prevState) => ({
            id: data.id,
            title: data.title,
            author: data.author,
            numberPage: data.numberPage,
            description: data.description,
            date: data.date,
            category: data.category,
            image: data.image,
            price: data.price,
          }));
          setImage(data.image);
        } catch (error) {
          console.log(error);
        }
      };
      getBook();
    }
  }, []);
  // console.log(book);
  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("filename", file.name);
      }
      try {
        if (file) {
          const result = await axios({
            method: "POST",
            url: "/uploadFile",
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
            },
            data: formData,
          });
          setImage(`http://localhost:3001/images/${result.data}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    uploadFile();
  }, [file]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createBookAction = async () => {
      try {
        const result = await axios({
          method: option ? "PUT" : "POST",
          url: option ? "/editBook" : "/createBook",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
          },
          data: {
            book: { ...book, image: image },
          },
        });
        if (result.data) {
          navigate("/");
        } else {
          if (!option) {
            toast.error("Sách đã tồn tại", {
              position: "bottom-right",
              theme: "dark",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    createBookAction();
  };
  return (
    <>
      <Sidebar option={"createBook"} />
      <Header />
      <div className="container d-flex" style={{ marginTop: "100px", marginBottom: "100px" }}>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div>
              <div className="d-flex">
                <div className="form-outline mb-4 mr-3">
                  <div className="float-left">Tiêu đề</div>
                  <input type="text" className="form-control form-control-lg" name="title" placeholder="Tiêu đề" required defaultValue={book.title} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-outline mb-4 ml-3">
                  <div className="float-left">Tác giả </div>
                  <input type="text" className="form-control form-control-lg" name="author" onChange={(e) => handleChange(e)} defaultValue={book.author} placeholder="Tác giả" required />
                </div>{" "}
              </div>
              <div className="form-outline mb-4">
                <div className="float-left"> Mô tả sách </div>
                <textarea type="date" className="form-control form-control-lg" name="description" onChange={(e) => handleChange(e)} placeholder="Mô tả sách" rows="4" defaultValue={book.description} cols="50" required></textarea>
              </div>
              <div>
                <div className="form-outline mb-4">
                  <div className="float-left"> Ngày xuất bản </div>
                  <input type="date" className="form-control form-control-lg mr-3" name="date" onChange={(e) => handleChange(e)} defaultValue={book.date} placeholder="Ngày phát hành" required />
                </div>
                <div className="form-outline mb-4">
                  <div className="float-left"> Số trang </div>
                  <input
                    type="number"
                    className="form-control form-control-lg "
                    name="numberPage"
                    onChange={(e) => handleChange(e)}
                    // defaultValue={book.numberPage}
                    value={book.numberPage}
                    placeholder="Số trang"
                    required
                  />
                </div>{" "}
              </div>
              <div className="form-outline mb-4">
                <div className="float-left"> Giá </div>
                <input
                  type="number"
                  className="form-control form-control-lg "
                  name="price"
                  onChange={(e) => handleChange(e)}
                  // defaultValue={book.numberPage}
                  value={book.price}
                  placeholder="Giá"
                  required
                />
              </div>{" "}
              <div className="form-group w-50">
                <div className="float-left"> Thể loại </div>
                <select
                  className="form-control form-select"
                  id="exampleFormControlSelect1"
                  name="category"
                  defaultValue={book.category}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value={"Truyện thiếu nhi"} selected={book.category === "Truyện thiếu nhi"}>
                    Truyện thiếu nhi
                  </option>
                  <option value={"Truyện phiêu lưu"} selected={book.category === "Truyện phiêu lưu"}>
                    Truyện phiêu lưu
                  </option>
                  <option value={"Truyện bí ẩn"} selected={book.category === "Truyện bí ẩn"}>
                    Truyện bí ẩn
                  </option>
                  <option value={"Truyện tâm lý"} selected={book.category === "Truyện tâm lý"}>
                    Truyện tâm lý
                  </option>
                  <option value={"Truyện tình cảm"} selected={book.category === "Truyện tình cảm"}>
                    Truyện tình cảm
                  </option>
                  <option value={"Truyện cười"} selected={book.category === "Truyện cười"}>
                    Truyện cười
                  </option>
                  <option value={"Khác"} selected={book.category === "Khác"}>
                    Khác
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-success">
            Lưu lại
          </button>
        </form>
        <div style={{ marginLeft: "50px" }}>
          <button className="form-outline mb-4 btn btn-outline-primary">
            <input
              type="file"
              className="form-control form-control-lg"
              id="upload-image-user"
              name="image"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              hidden
            />

            <label htmlFor="upload-image-user" id="upload-image-label" className="btn-image-user m-0">
              Chọn File
            </label>
          </button>
          <button
            className="btn btn-outline-danger mb-4 ml-3"
            onClick={(e) => {
              setImage("http://localhost:3001/images/default-book.png");
            }}
          >
            Xóa ảnh
          </button>
          <div>
            <img src={image} style={{ width: "300px", height: "400px" }} />
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default CreateBook;
