import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { AppName } from "../../config/variable";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleteCartItem, setDeleteCartItem] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getCartItems = async () => {
      try {
        // console.log(id);
        const data = await axios({
          method: "GET",
          url: "/getAllCartItems",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
          },
        });
        console.log(data.data);
        setCartItem(data.data);
        setTotalPrice(
          data.data.reduce((total, v) => {
            return total + v.price * v.quantity;
          }, 0)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getCartItems();
  }, []);
  const DeleteCartitem = async (e) => {
    try {
      // console.log(id);
      const data = await axios({
        method: "Delete",
        url: "/deleteCartItem",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
        },
        data: { id: deleteCartItem },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateQuantity = async (e, item) => {
    const temp = cartItem;
    // console.log(temp);
    temp[temp.indexOf(item)].quantity = parseInt(e.target.value);
    setCartItem(temp);
    setTotalPrice(
      temp.reduce((total, v) => {
        return total + v.price * v.quantity;
      }, 0)
    );
    // console.log(item);
  };
  const CreateOrder = async (e) => {
    try {
      // console.log(id);
      const data = await axios({
        method: "POST",
        url: "/createOrder",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
        },
        data: { order: cartItem, totalPrice: totalPrice },
      });
      if (data.data) {
        navigate("/Order");
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="d-flex">
          <table className="table" style={{ width: "60%", margin: "auto" }}>
            {cartItem.map((item) => (
              <tr className="d-flex my-5 " key={item.id}>
                <td className="center-itemCart border-0">
                  <div>
                    <img className="image-size-mini" src={item.image} alt="" />
                  </div>
                </td>
                <td colSpan={2} className="center-itemCart border-0">
                  <h6>{item.title}</h6>
                </td>
                <td className="center-itemCart border-0">
                  <div className="group-input d-flex quantity">
                    <div className="form-outline mb-4 cartQuantitySize">
                      <input
                        type="number"
                        className="form-control form-control-lg quantity"
                        style={{ width: "100px" }}
                        name="quantity"
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(e) => UpdateQuantity(e, item)}
                        required
                      />
                    </div>
                  </div>
                </td>
                <td className="center-itemCart border-0">
                  <h6 className="ml-3 col-xl-2">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h6>
                </td>
                <td className="center-itemCart border-0">
                  <h6 className="ml-3 col-xl-2 ">
                    <div className="btn btn-outline-danger hover-pointer" data-toggle="modal" data-target="#CartItemDelete" onClick={(e) => setDeleteCartItem(item.id)}>
                      <BsTrash />
                    </div>
                  </h6>
                </td>
              </tr>
            ))}
          </table>
          {cartItem.length > 0 && (
            <div style={{ backgroundColor: "white", padding: "40px" }}>
              <h5>Tổng tiền: {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
              <button className="btn btn-outline-primary" onClick={(e) => CreateOrder(e)}>
                Đặt hàng
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="modal fade" id="CartItemDelete" tabIndex={-1} role="dialog" aria-labelledby="CartItemDeleteTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Xóa Khỏi giỏ hàng
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Bạn có muốn xóa khỏi giỏ hàng</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Đóng
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={(e) => DeleteCartitem(e)}>
                Xóa khỏi giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
