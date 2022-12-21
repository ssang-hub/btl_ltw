import connect from "../config/connect.js";

// upload file
const uploadFile = async (req, res) => {
  res.json(req.file.filename);
};

// tạo sách
const createBook = async (req, res) => {
  const data = req.body.book;
  // console.log(data);
  try {
    const result = await connect.promise().execute(`Select * from books where title = "${data.title}"`);

    if (!result[0][0]) {
      connect.promise().execute(`insert into books values (0, "${data.title}", "${data.author}", "${data.category}", ${data.price},"${data.date}", ${parseInt(data.numberPage)}, "${data.image}", "${data.description}")`);
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
};

// xóaa sách
const deleteBook = async (req, res) => {
  try {
    await connect.promise().execute(`delete from books where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
// suwa sách
const editBook = async (req, res) => {
  const data = req.body.book;

  try {
    // console.log(req.body);
    await connect.promise().execute(`update books set title = "${data.title}", author = "${data.author}",description = "${data.description}",date = "${data.date}",category = "${data.category}", price = ${data.price}, image = "${data.image}",numberPage = ${data.numberPage} where id = ${data.id}`);
    // console.log();
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
// get tất cả sách
const getAllBooks = async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books`);
    console.log(data[0]);
    res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

// get sách theo id sách
const getBook = async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books where id = ${req.params.id}`);
    const result = data[0][0];
    const datetext = new Date(result.date);
    // chuyển date từ UTC sang yyyy-mm-dd
    const [day, month, year] = [datetext.getDate() > 9 ? datetext.getDate() : `0${datetext.getDate()}`, datetext.getMonth() + 1 > 9 ? datetext.getMonth() + 1 : `0${datetext.getMonth()}`, datetext.getFullYear()];
    result.date = `${year}-${month}-${day}`;
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const addToCart = async (req, res) => {
  const uid = req.user.id;
  try {
    await connect.promise().execute(`insert into CartItem values (0, ${uid}, ${req.body.id}, ${req.body.id})`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
// const updateBook = async (req, res) => {};
export { createBook, deleteBook, editBook, addToCart, getAllBooks, uploadFile, getBook };
