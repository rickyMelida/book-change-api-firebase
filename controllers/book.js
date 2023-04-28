const utils = require("../utils/utils");
const { firestoreAdmin } = require("../services/firebase-admin-service");
const { app } = require("../services/firebase-service");
const { v4: uuid } = require("uuid");
const {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
  orderBy,
  limit,
} = require("firebase/firestore");

const getBooks = async (req, res) => {
  try {
    const querySnapshot = await firestoreAdmin.collection("book").get();
    const books = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).send(books);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getBook = async (req, res) => {
  const { uid } = req.params;
  let bookData = {};

  const db = getFirestore(app);

  try {
    const q = query(collection(db, "book"), where("uid", "==", uid));
    const data = await getDocs(q);

    if ((data.size = 0)) return res.status(204).send({ message: "No data" });

    data.forEach((doc) => {
      bookData = doc.data();
    });

    return await res.status(200).send(bookData);
  } catch (err) {
    return await res.status(500).send({ message: "Error al traer los datos" });
  }
};

const getBookByUserOwner = async (req, res) => {
  const { uid } = req.params;
  let bookData = [];

  console.log(uid);

  const db = getFirestore(app);
  try {
    const q = query(collection(db, "book"), where("userId", "==", uid));
    const data = await getDocs(q);
    if ((data.size = 0)) return res.status(204).send({ message: "No data" });

    data.forEach((doc) => {
      bookData.push(doc.data());
    });

    return await res.status(200).send(bookData);
  } catch (error) {
    return res.status(500).send({ message: "Error al traer los datos" });
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

const getFeaturedBooks = async (req, res) => {
  const { amount } = req.params;
  const dataResult = [];
  const db = getFirestore(app);

  try {
    const q = query(
      collection(db, "book"),
      orderBy("year", "desc"),
      limit(amount)
    );
    const data = await getDocs(q);
    if ((data.size = 0)) return res.status(204).send({ message: "No data" });

    data.forEach((doc) => dataResult.push(doc.data()));

    return res.status(200).send(dataResult);
  } catch (error) {
    return res.status(500).send({ message: "Error al traer los datos" });
  }
};

const getRecentsBooks = async (req, res) => {
  const { amount } = req.params;
  const dataResult = [];
  const db = getFirestore(app);

  try {
    const q = query(
      collection(db, "book"),
      orderBy("uploadDate", "desc"),
      limit(amount)
    );
    const data = await getDocs(q);

    if ((data.size = 0)) return res.status(204).send({ message: "No data" });

    data.forEach((doc) => dataResult.push(doc.data()));

    return res.status(200).send(dataResult);
  } catch (error) {
    return res.status(500).send({ message: "Error al traer los datos" });
  }
};

const getOthersBooks = async (req, res) => {
  const { amount } = req.params;
  const dataResult = [];
  const db = getFirestore(app);

  try {
    const q = query(
      collection(db, "book"),
      orderBy("uploadDate", "asc"),
      limit(amount)
    );

    const data = await getDocs(q);
    if ((data.size = 0)) return res.status(204).send({ message: "No data" });

    data.forEach((doc) => dataResult.push(doc.data()));

    return res.status(200).send(dataResult);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al traer los datos" });
  }
};

const getSearchResult = async (word) => {
  const db = getFirestore(app);
  const uid = params.split("=")[1];

  const q = query(collection(db, "book"), where("userId", "==", uid));

  return await getDocs(q);
};

const findBook = (req, res) => {
  console.log(req.body);
};

module.exports = {
  getBooks,
  getBook,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBookByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getOthersBooks,
  findBook,
};
