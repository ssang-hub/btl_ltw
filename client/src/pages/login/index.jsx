import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/Context";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { AppName } from "../../config/variable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [uname, setUname] = useState(undefined);
  const [passwd, setPasswd] = useState(undefined);
  const [logged, setLogged] = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      navigate("/");
    }
  });

  // gửi yêu cầu login
  const loginAction = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/login", {
        uname,
        passwd,
      });
      if (result.data) {
        localStorage.setItem(AppName, JSON.stringify(result.data));
        setLogged(true);
        navigate("/");
      } else {
        toast.error("Thông tin tài khoản, mật khẩu không chính xác", {
          position: "bottom-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  //  Giao diện login
  return (
    <section className="vh-100 d-flex">
      <div className="container-fluid h-custom m-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="http://localhost:3001/images/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={loginAction}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
                <button type="button" className="btn btn-outline-primary btn-floating mx-1" style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                  <FiFacebook style={{ fontSize: "20px", paddingRight: "4px" }} />
                </button>

                <button type="button" className="btn btn-outline-danger btn-floating mx-1   " style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                  <AiOutlineGoogle style={{ fontSize: "20px", paddingRight: "4px" }} />
                </button>

                <button type="button" className="btn btn-outline-primary btn-floating mx-1" style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
                  <AiOutlineTwitter style={{ fontSize: "20px", paddingRight: "4px" }} />
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Hoặc</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Tên tài khoản"
                  name="uname"
                  onChange={(e) => {
                    setUname(e.target.value);
                  }}
                  required
                />
                <label className="form-label" htmlFor="form3Example3">
                  Tên tài khoản
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Mật khẩu"
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                  required
                  name="passwd"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Mật khẩu
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Nhớ mật khẩu
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Quên mật khẩu
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Đăng Nhập
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Bạn chưa có tài khoản? <a href="/register">Đăng Ký</a>
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

export default Login;
