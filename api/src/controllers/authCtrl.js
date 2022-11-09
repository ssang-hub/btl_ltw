import * as JWTAuth from "../middleware/JWTAuth.js";
import sha256 from "crypto-js/sha256.js";
import dotenv from "dotenv";
import connect from "../config/connect.js";
dotenv.config();

// chức năng đăng nhập
const login = async (req, res) => {
  // lấy thông tin user, password, mã hóa password và so sánh mã băm đó với mã băm được lưu trong csdl
  const user = { uname: req.body.uname, hash: sha256(req.body.passwd, process.env.KEY_ENCRYPT_PASS).toString() };
  try {
    const data = await connect.promise().execute(`Select * from users where uname = '${user.uname}' and passwd = '${user.hash}'`);

    if (data[0].length != 0) {
      const userResult = {
        uname: user.uname,
        email: data[0].email,
      };
      // trả về cho client accessToken và RefreshToken
      // accessToken dùng để duy trì đăng nhập, refreshToken dùng để lấy accessToken mới khi accessToken hết hạn
      res.json({
        accessToken: JWTAuth.generateAccessToken(userResult),
        refreshToken: JWTAuth.generateRefreshToken(userResult),
      });
    } else {
      res.json(false);
    }
  } catch (error) {
    res.json(error);
  }
};
// logout sẽ xóa refreshToken trong db
const logout = async (req, res) => {
  const refreshToken = req.body.token;
  try {
    await connect.promise().execute(`Delete from refreshToken where token = '${refreshToken}'`);
    res.json("logout success");
  } catch (error) {
    res.json(error);
  }
};
// đăng ký
const register = async (req, res) => {
  console.log(req.body);
  const user = { uname: req.body.uname, hash: sha256(req.body.passwd, process.env.KEY_ENCRYPT_PASS), email: req.body.email };
  const checkUser = await connect.promise().execute(`Select * from users where uname = '${user.uname}'`);
  if (checkUser[0].length == 0) {
    connect.promise().execute(`insert into users values(0, '${user.uname}', '${user.hash}', '${user.email}')`);
    res.json(true);
  }
};
export { login, logout, register };
