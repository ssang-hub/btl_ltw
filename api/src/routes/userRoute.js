import express from "express";
import multer from "multer";
import * as userCtrl from "../controllers/userCtrl.js";
const upload = multer({ dest: "src/public/images" });
const router = express.Router();
// router.post("/createBooks");
router.get("/test", (req, res) => {
  console.log("ok");
});

router.post("/uploadFile", upload.single("file"), userCtrl.uploadFile);
router.post("/createBook", userCtrl.createBook);
router.put("/editBook", userCtrl.editBook);
router.post("/addToCart", userCtrl.addToCart);
router.get("/getAllCartItems", userCtrl.getAllCartItems);
router.delete("/deleteBook", userCtrl.deleteBook);
router.post("/createComment", userCtrl.createComment);
router.delete("/deleteCartItem", userCtrl.deleteCartItem);
router.post("/createOrder", userCtrl.createOrder);
router.get("/getMyOrder", userCtrl.getAllOrders);
// router.post('/addToCart', userCtrl.)
export default router;
