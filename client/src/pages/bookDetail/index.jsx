import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import axios from "axios";
import { AppName } from "../../config/variable";
import { AiTwotoneStar, AiOutlineUser } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookDetail() {
  const { id } = useParams();

  //   console.log(id);
  const [commnet, setComment] = useState([]);
  const [book, setBook] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [contentComment, setContentComment] = useState("");
  const [numberStar, setNumberStar] = useState(undefined);
  const temp = [1, 2, 3, 4, 5];
  useEffect(() => {
    const getComment = async () => {
      const data = await axios.get(`/getAllComment?id=${id}`);
      // console.log(data.data);
      setComment(data.data);
      console.log(data.data);
    };
    const getBook = async () => {
      // console.log(id);
      const data = await axios.post("/getBook", { id: id });
      setBook(data.data);
    };
    getComment();
    getBook();
  }, []);
  const setStar = (e, v) => {
    const stars = document.querySelectorAll(".star");
    // console.log(stars);
    for (let i = 0; i < v; i++) {
      stars[i].classList.add("burlywood-color");
    }
    setNumberStar(v);
    while (v < 5) {
      stars[v].classList.remove("burlywood-color");
      v += 1;
    }
  };
  const AddToCart = async (e) => {
    e.preventDefault();
    try {
      // console.log(id);
      const data = await axios({
        method: "POST",
        url: "/addToCart",
        data: { id, quantity },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
        },
      });
      if (data.data) {
        toast.success("Them san pham thanh cong", { position: "bottom-right", theme: "colored" });
      }
    } catch (error) {}
  };
  const createComment = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        method: "POST",
        url: "/createComment",
        data: { contentComment, numberStar, book: id },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
        },
      });
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {book && (
        <div>
          <Header />
          <div className="container" style={{ marginTop: "100px" }}>
            <div className="d-flex ">
              <img src={book.image} alt="" style={{ width: "300px", height: "450px" }} />
              <div className="ml-4">
                <h4>{book.title}</h4>
                <h5 className="d-flex ml-3">{book.price}đ</h5>
                <form onSubmit={AddToCart}>
                  <div>
                    <div className="d-flex"> Số lượng</div>
                    <div className="d-flex">
                      {/* <div className="btn btn-outline-info">-</div> */}
                      <input type="number" style={{ width: "80px" }} min={1} defaultValue={quantity} required onChange={(e) => setQuantity(e.target.value)} />
                      {/* <div className="btn btn-outline-info">+</div> */}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-outline-success mt-3 px-5">
                    Dat mua
                  </button>
                </form>
              </div>
              <div style={{ marginLeft: "100px" }}>
                <h5>Thông tin của sách</h5>
                <div>{book.description}</div>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: "80px" }}>
            <div className="form-outline mb-4">
              <h4 className="float-left">
                Nhận xét:
                {temp.map((v, i) => (
                  <AiTwotoneStar key={i} className="star" onClick={(e) => setStar(e, v)} />
                ))}
              </h4>
              <form onSubmit={createComment}>
                <input type="number" name="numberStar" defaultValue={numberStar} hidden />
                <textarea
                  type="text"
                  className="form-control form-control-lg"
                  name="content"
                  placeholder="Nhận xét"
                  rows="4"
                  cols="50"
                  required
                  onChange={(e) => setContentComment(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-outline-success">
                  Gửi nhận xét
                </button>
              </form>
            </div>
            <div>
              {commnet.map((item) => (
                <div className="ml-3 my-5 border-info border p-3" key={item.id}>
                  <div className="d-flex">
                    <AiOutlineUser className="text-info mt-1" style={{ fontSize: "20px" }} />

                    <h5 className="text-info ml-2">{item.uname}</h5>
                  </div>
                  <div className="d-flex">
                    {temp.map((temp) => (
                      <div key={temp}>{temp > item.numberVote ? <AiTwotoneStar className="star mt-1" /> : <AiTwotoneStar className="star burlywood-color mt-1" />}</div>
                    ))}
                  </div>
                  <div className="d-flex">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>
      )}
    </>
  );
}

export default BookDetail;
