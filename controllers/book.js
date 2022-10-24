const { firestoreAdmin } = require("../services/firebase-admin-service");
const { v4: uuid } = require("uuid");

//const Book = {
const getBooks = async (req, res) => {
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
};

const getBookById = async (req, res) => {
  const { uid } = req.params;

  try {
    const bookByUid = await firestoreAdmin.collection("book").doc(uid).get();

    if (bookByUid.data() == null || bookByUid.data() == "")
      return res.status(404).send({ data: "No Data" });

    return res.status(200).send(bookByUid.data());
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getFavouriteBooks = (req, res) => {
  res.send("getFavouriteBooks");
};

const getMyBooks = (req, res) => {
  res.send("getMyBooks");
};

const setBook = async (req, res) => {
  const bookData = req.body;

  try {
    const serverRespose = await firestoreAdmin
      .collection("book")
      .doc(uuid())
      .create(bookData);
    return res.status(200).send({ serverRespose });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = {
  getBooks,
  getBookById,
  getFavouriteBooks,
  getMyBooks,
  setBook,
};
