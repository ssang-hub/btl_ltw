import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { AppName } from "../../config/variable";

function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await axios({
          method: "get",
          url: "/getMyOrder",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
          },
        });
        // console.log(data.data);
        // console.log(Object.keys(data.data).map((key) => data.data[key]));
        const temp = Object.keys(data.data).map((key) => data.data[key]);
        setOrders(temp);
        // console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "80px" }}>
        {orders.map((order, index) => (
          <div style={{ marginBottom: "100px" }} key={index}>
            <table className="table">
              <tbody>
                {order.map((orderItem) => (
                  <tr className="my-1 d-flex" key={orderItem.id}>
                    <td className="border-0">
                      <img className="d-flex" src={orderItem.image} style={{ height: "300px", width: "200px" }} alt="" />
                    </td>
                    <td className="border-0" colSpan={2} style={{ width: "500px" }}>
                      <div className="d-flex flex-column mx-3">
                        <p className="mt-2 d-flex">{orderItem.title}</p>
                        <div className="d-flex my-2">{orderItem.author}</div>
                        <div className="align-items-end d-flex mt-3">x{orderItem.quantity}</div>
                      </div>
                    </td>
                    <td className="border-0">
                      <div>{orderItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="d-flex justify-content-between">
              <h4>Tổng Số Tiền</h4>
              <div>{order[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
