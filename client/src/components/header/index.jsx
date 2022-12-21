import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import User from "../../components/user";
import { AppName } from "../../config/variable";
function Header() {
  return (
    <div>
      <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className="container-fluid">
          <div className="d-flex">
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand" href="/">
              Trang chủ
            </a>

            <a className="navbar-brand" href="#">
              Thể loại sách
            </a>
            <a className="navbar-brand" href="#">
              Sách bán chạy
            </a>
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input type="search" className="form-control rounded" placeholder="Tên Sách" style={{ minWidth: "225px" }} />
              <span className="input-group-text border-0">
                <BsSearch />
              </span>
            </form>
          </div>
          <div>
            <User />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
