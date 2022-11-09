import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
//connect đến database
// các thông tin được ghi trong file .env, ví dụ process.env.hostdb là biến hostdb trong file .env
const connect = mysql.createConnection({
  host: process.env.hostdb,
  port: process.env.portdb,
  user: process.env.userdb,
  password: process.env.passwordb,
  database: process.env.database,
});
connect.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

export default connect;
