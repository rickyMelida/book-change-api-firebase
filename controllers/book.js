const { firestoreAdmin } = require("../services/firebase-admin-service");
const Book = {
  getBooks: async(req, res) => {
    try {
      const querySnapshot = await firestoreAdmin.collection('book').get();
      const books = querySnapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).send({books})
    } catch (error) {
      res.status(500).send({error})
    }
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
