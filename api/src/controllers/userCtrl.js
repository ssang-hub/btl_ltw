import connect from "../config/connect.js";

// upload file
const uploadFile = async (req, res) => {
  // console.log(123);
  res.json(req.file.filename);
};

// tạo sách
const createBook = async (req, res) => {
  const data = req.body.book;
  // console.log(data);
  try {
    const result = await connect.promise().execute(`Select * from books where title = "${data.title}"`);

    if (!result[0][0]) {
      connect
        .promise()
        .execute(
          `insert into books values (0, "${data.title}", "${data.author}", "${data.category}", ${data.price},"${data.date}", ${parseInt(data.numberPage)}, "${data.image}", "${
            data.description
          }")`
        );
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
    await connect
      .promise()
      .execute(
        `update books set title = "${data.title}", author = "${data.author}",description = "${data.description}",date = "${data.date}",category = "${data.category}", price = ${data.price}, image = "${data.image}",numberPage = ${data.numberPage} where id = ${data.id}`
      );
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
    const [day, month, year] = [
      datetext.getDate() > 9 ? datetext.getDate() : `0${datetext.getDate()}`,
      datetext.getMonth() + 1 > 9 ? datetext.getMonth() + 1 : `0${datetext.getMonth()}`,
      datetext.getFullYear(),
    ];
    result.date = `${year}-${month}-${day}`;
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const addToCart = async (req, res) => {
  const uid = req.user.id;
  try {
    await connect.promise().execute(`insert into CartItem values (0, ${uid}, ${req.body.id}, ${req.body.quantity})`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const createComment = async (req, res) => {
  console.log(req.body);
  try {
    await connect.promise().execute(`insert into bookReview values (0, ${req.user.id}, ${req.body.book}, ${req.body.numberStar}, '${req.body.contentComment}')`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const getAllCartItems = async (req, res) => {
  try {
    const data = await connect
      .promise()
      .execute(`select books.title, books.price, books.image, CartItem.* from books inner join CartItem on books.id = CartItem.bookId where CartItem.userID = ${req.user.id} `);
    res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};
const deleteCartItem = async (req, res) => {
  // console.log(req.body);
  try {
    await connect.promise().execute(`delete from CartItem where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const deleteMultipleCartItems = async (data, req, res) => {
  let datatemp = "";
  for (let v of data) {
    datatemp += `id = ${v.id} or `;
  }
  datatemp = datatemp.slice(0, datatemp.length - 3);
  try {
    await connect.promise().execute(`delete from CartItem where ${datatemp} `);
    return true;
  } catch (error) {
    console.log(error);
  }
};
const createOrder = async (req, res) => {
  const date = new Date();
  const data = req.body.order;
  // console.log(req.body);
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  try {
    const createOrderExcute = await connect.promise().execute(`insert into Orders values(0, ${req.user.id}, '${dateString}', ${req.body.totalPrice})`);
    let temp = "";
    for (let v of data) {
      temp = temp + `(0, ${createOrderExcute[0].insertId}, ${v.bookID}, ${v.quantity}), `;
    }
    temp = temp.slice(0, temp.length - 2);
    const result = await connect.promise().execute(`insert into OrderLine values ${temp}`);
    const deleteCartItem = deleteMultipleCartItems(data, req, res);
    if (deleteCartItem) {
      return res.json(true);
    } else {
      return res.json(false);
    }
    // const
  } catch (error) {
    console.log(error);
  }
};
// const updateBook = async (req, res) => {};
const getAllOrders = async (req, res) => {
  // console.log(123);
  try {
    const data = await connect
      .promise()
      .execute(
        `select OL.*, O.createAt, O.totalPrice,B.title, B.price, B.image, B.author from (OrderLine as OL inner join Orders as O on O.id = OL.OrderID) inner join books as B on OL.BookID = B.id where O.UserID= ${req.user.id} `
      );
    // console.log(data[0]);
    const result = data[0].reduce(function (r, a) {
      r[a.OrderID] = r[a.OrderID] || [];
      r[a.OrderID].push(a);
      return r;
    }, Object.create(null));
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
export { createOrder, createBook, deleteBook, editBook, addToCart, getAllBooks, uploadFile, getBook, createComment, getAllCartItems, deleteCartItem, getAllOrders };
