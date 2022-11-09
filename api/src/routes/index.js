import express from "express";
import * as userController from "../controllers/userCtrl.js";
import * as authController from "../controllers/authCtrl.js";
import connect from "../config/connect.js";
import userRoute from "./userRoute.js";
import passport from "../middleware/passportJWT.js";
import * as userCtrl from "../controllers/userCtrl.js";
const router = express.Router();

// router.post("/getAllBook", upload.single("file"), (req, res) => {});

// get tất cả book trong csdl
router.get("/getAllBooks", async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books`);
    const results = data[0].map((result) => {
      const datetext = new Date(result.date);
      const [day, month, year] = [
        datetext.getDate() > 10 ? datetext.getDate() : `0${datetext.getDate()}`,
        datetext.getMonth() + 1 > 10 ? datetext.getMonth() : `0${datetext.getMonth()}`,
        datetext.getFullYear(),
      ];
      result.date = `${year}-${month}-${day}`;
      return result;
    });
    // console.log(results);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
});

// nhận thông tin uname, password, và tiến hành đăng nhập
router.post("/login", authController.login);
// nhận thông tin và đătn ký
router.post("/register", authController.register);
// đăng xuất
router.post("/logout", authController.logout);
router.get("/failureLogin", (req, res) => {
  res.json("hello");
});
// get thông tin của book cần sửa
router.get("/editBook/:id", userCtrl.getBook);
router.use(passport.authenticate("jwt", { session: false }), userRoute);

export default router;
