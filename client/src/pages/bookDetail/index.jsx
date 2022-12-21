import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import axios from "axios";
import { AppName } from "../../config/variable";
import { AiTwotoneStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookDetail() {
  const { id } = useParams();

  //   console.log(id);
  const [commnet, setComment] = useState(undefined);
  const [book, setBook] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getComment = async () => {
      const data = await axios.post("/getAllComment", { id: id });
      // console.log(data.data);
      setComment(data.data);
    };
    const getBook = async () => {
      // console.log(id);
      const data = await axios.post("/getBook", { id: id });
      setBook(data.data);
    };
    getComment();
    getBook();
    const stars = document.querySelectorAll(".star");
    console.log(stars);
  }, []);
  const AddToCart = async () => {
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
                <div>
                  <div className="d-flex"> Số lượng</div>
                  <div className="d-flex">
                    <div className="btn btn-outline-info">-</div>
                    <input
                      type="text"
                      style={{ width: "80px" }}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      value={quantity}
                    />
                    <div className="btn btn-outline-info">+</div>
                  </div>
                </div>
                <button className="btn btn-outline-success mt-3 px-5" onClick={AddToCart}>
                  Dat mua
                </button>
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
                Nhận xét: <AiTwotoneStar className="star" /> <AiTwotoneStar className="star" /> <AiTwotoneStar className="star" /> <AiTwotoneStar className="star" /> <AiTwotoneStar className="star" />
              </h4>

              <textarea type="date" className="form-control form-control-lg" name="description" placeholder="Nhận xét" rows="4" cols="50" required></textarea>
              <div className="btn btn-outline-success">Gửi nhận xét</div>
            </div>
            <div>
              {commnet.map((item) => (
                <div key={item.id}>123</div>
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
