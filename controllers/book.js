const { firestoreAdmin } = require("../services/firebase-admin-service");
const Book = {
  getBooks: async (req, res) => {
    try {
      const querySnapshot = await firestoreAdmin.collection("book").get();
      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).send({ books });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getBookById: async (req, res) => {
    const { uid } = req.params;

    try {
      const bookByUid = await firestoreAdmin.collection("book").doc(uid).get();

      if (bookByUid.data() == null || bookByUid.data() == "")
        return res.status(404).send({ data: "No Data" });

      return res.status(200).send(bookByUid.data());
    } catch (error) {
      return res.status(500).send({ error: error });
    }
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
