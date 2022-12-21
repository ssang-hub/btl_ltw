import React, { useState } from "react";
import { useEffect, useContext } from "react";
import Context from "../../store/Context";
import { AppName } from "../../config/variable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  // định nghĩa các state
  const [uname, setUname] = useState(undefined);
  const [passwd, setPasswd] = useState(undefined);
  const [passwdConfirm, setPasswdConfirm] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [logged, setLogged] = useContext(Context);
  useEffect(() => {
    // đã login thì chuyển về trang chủ đéo cho đăng ký
    if (logged) {
      navigate("/");
    }
  });
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    // mật khẩu ko khớp hiện thị thông báo
    if (passwdConfirm !== passwd) {
      toast.error("Mật khẩu nhập lại không khớp", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
    } else {
      // nếu khớp thì gửi yêu cầu đăng ký
      const action = async () => {
        try {
          const result = await axios.post("/register", { uname, passwd, email });
          if (result.data) {
            toast.success("Đăng Ký thành công", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark",
            });
          } else {
            toast.error("Người dùng đã tồn tại", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark",
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      action();
    }
  };

  return (
    <section className="vh-100 d-flex">
      <div className="container-fluid h-custom m-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="http://localhost:3001/images/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Tên người dùng"
                  required
                  onChange={(e) => {
                    setUname(e.target.value);
                  }}
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Địa chỉ email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Mật Khẩu"
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Nhập Lại Mật Khẩu"
                  onChange={(e) => {
                    setPasswdConfirm(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Lưu mật khẩu
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Quên mật khẩu
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Đăng Ký
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Bạn đã có tài khoản? <a href="/login">Đăng Nhập</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
