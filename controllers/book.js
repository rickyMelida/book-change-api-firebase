const { firestoreAdmin } = require("../services/firebase-admin-service");
const Book = {
  getBooks: (req, res) => {
    firestoreAdmin
      .collection("users")
      .get()
      .forEach((doc) => {
        res.send({ data: doc.data() });
      });
  },

  getBookById: (req, res) => {
    res.send("getBook");
  },

  getFavouriteBooks: (req, res) => {
    res.send("getFavouriteBooks");
  },

  getMyBooks: (req, res) => {
    res.send("getMyBooks");
  },

  setBook: (req, res) => {
    const myFile = req.files;
    console.log(myFile);
    console.log(req.body);
    res.send("setBook");
  },
};

module.exports = Book;
