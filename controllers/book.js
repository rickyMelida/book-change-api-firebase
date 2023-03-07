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
    return res.status(200).send({ books });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getBookById = async (req, res) => {
  const { uid } = req.params;

  try {
    const bookByUid = await firestoreAdmin
      .collection("book")
      .doc(uid.split("=")[1])
      .get();

    if (bookByUid.data() == null || bookByUid.data() == "")
      return res.status(404).send({ data: "No Data" });

    return res.status(200).send(bookByUid.data());
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getDataByUserOwner = async (params) => {
  const db = getFirestore(app);
  const uid = params.split("=")[1];

  const q = query(collection(db, "book"), where("userId", "==", uid));

  return await getDocs(q);
};

const getBookByUserOwner = (req, res) => {
  const { uid } = req.params;
  let bookData = [];

  getDataByUserOwner(uid)
    .then((data) => {
      if ((data.size = 0)) return res.status(204).send({ message: "No data" });

      data.forEach((doc) => bookData.push(doc.data()));
      return res.status(200).send({ bookData });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al traer los datos" });
    });
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

const getFeaturedData = async (amount) => {
  const db = getFirestore(app);

  const q = query(
    collection(db, "book"),
    orderBy("year", "desc"),
    limit(amount)
  );

  return await getDocs(q);
};

const getFeaturedBooks = (req, res) => {
  const amount = req.params.amount;
  const dataLimit = amount.split("=")[1];
  const dataResult = [];

  getFeaturedData(dataLimit)
    .then((data) => {
      if ((data.size = 0)) return res.status(204).send({ message: "No data" });

      data.forEach((doc) => dataResult.push(doc.data()));

      return res.status(200).send(dataResult);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al traer los datos" });
    });
};

const getRecentData = async (amount) => {
  const db = getFirestore(app);

  const q = query(
    collection(db, "book"),
    orderBy("uploadDate", "desc"),
    limit(amount)
  );

  return await getDocs(q);
};

const getRecentsBooks = (req, res) => {
  const amount = req.params.amount;
  const dataLimit = amount.split("=")[1];
  const dataResult = [];

  getRecentData(dataLimit)
    .then((data) => {
      if ((data.size = 0)) return res.status(204).send({ message: "No data" });

      data.forEach((doc) => dataResult.push(doc.data()));

      return res.status(200).send(dataResult);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al traer los datos" });
    });
};

const getOthersData = async (amount) => {
  const db = getFirestore(app);

  const q = query(
    collection(db, "book"),
    orderBy("uploadDate", "asc"),
    limit(amount)
  );

  return await getDocs(q);
};

const getothersBooks = (req, res) => {
  const amount = req.params.amount;
  const dataLimit = amount.split("=")[1];
  const dataResult = [];

  getOthersData(dataLimit)
    .then((data) => {
      if ((data.size = 0)) return res.status(204).send({ message: "No data" });

      data.forEach((doc) => dataResult.push(doc.data()));

      return res.status(200).send(dataResult);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error al traer los datos" });
    });
};

module.exports = {
  getBooks,
  getBookById,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBookByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getothersBooks,
};
