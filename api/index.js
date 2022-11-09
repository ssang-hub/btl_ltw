import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import route from "./src/routes/index.js";

const app = express();
dotenv.config();
// dùng cái này để loại bỏ lỗi cors
app.use(cors());

// express.json() và express.urlencoded dùng để có thể dùng biến req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// setup nơi để lưu trữ file
app.use(express.static(path.join(path.resolve(), "src/public")));

// dùng viết các mapping
app.use(route);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
