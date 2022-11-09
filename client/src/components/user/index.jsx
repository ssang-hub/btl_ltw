import React from "react";
import { useContext } from "react";
import Context from "../../store/Context";
import { AiOutlineUser } from "react-icons/ai";
import { AppName } from "../../config/variable";
import { useNavigate } from "react-router-dom";

function User() {
  const [logged, setLogged] = useContext(Context);
  const navigate = useNavigate();
  const lougOutAction = async () => {
    //request logout
    localStorage.removeItem(AppName);
    setLogged(undefined);
    navigate("/");
  };
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {logged ? (
          <div>
            <div className="dropdown" style={{ marginRight: "50px" }}>
              <button
                className="btn btn-outline-info dropdown-toggle"
                id="userDropDown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <AiOutlineUser />
              </button>
              <div className="dropdown-menu" aria-labelledby="userDropDown">
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
