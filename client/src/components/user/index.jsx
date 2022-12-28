import React from "react";
import { useContext, useState } from "react";
import Context from "../../store/Context";
import { AiOutlineUser } from "react-icons/ai";
import { AppName } from "../../config/variable";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
function User() {
  const [logged, setLogged] = useContext(Context);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem(AppName)) || undefined);
  const [isAdmin, setIsAdmin] = useState(0);
  const lougOutAction = async () => {
    //request logout
    localStorage.removeItem(AppName);
    setLogged(undefined);
    navigate("/");
  };
  useEffect(() => {
    if (userData) setIsAdmin(jwt_decode(userData.accessToken).isAdmin);
  }, []);
  // console.log(userData);
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {logged ? (
          <div className="d-flex">
            <Link to={"/Cart"} className="mr-3 btn btn-outline-primary">
              <BsCart style={{ color: "blue", fontSize: "20px" }} />
            </Link>
            <div className="dropdown" style={{ marginRight: "50px" }}>
              <button
                className="btn btn-outline-info dropdown-toggle"
                id="userDropDown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ marginRight: "80px" }}
              >
                <AiOutlineUser />
              </button>
              <div className="dropdown-menu" aria-labelledby="userDropDown">
                {isAdmin && (
                  <div className="dropdown-item">
                    <a className="navbar-brand" href="/bookmanager" style={{ fontSize: "16px" }}>
                      Quản lý sách
                    </a>
                  </div>
                )}
                <Link className="dropdown-item" to="/Order">
                  Đơn hàng của tôi
                </Link>
                <div className="dropdown-item" onClick={lougOutAction}>
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <a className="btn btn-outline-primary mx-2" href="/login">
              Đăng Nhập
            </a>
            <a className="btn btn-outline-primary mx-2" href="/register">
              Đăng Ký
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
