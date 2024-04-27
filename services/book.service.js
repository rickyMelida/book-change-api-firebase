const { firestoreAdmin, admin } = require("./firebase-admin-service");
const { v4: uuid } = require("uuid");

module.exports.bookService = {
  getBooks: async () => {
    try {
      const querySnapshot = await firestoreAdmin.collection("book").get();

      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (books.length == 0) return null;

      return books;
    } catch (error) {
      return error;
    }
  },

  getBook: async (uid) => {
    try {
      const querySnapshot = await firestoreAdmin
        .collection("book")
        .where("uid", "==", uid)
        .get();

      if (querySnapshot.empty) return null;

      return querySnapshot.docs[0].data();
    } catch (err) {
      return err;
    }
  },

  getBooksByUserOwner: async (bookOwnerUid) => {
    const querySnapshot = await firestoreAdmin
      .collection("book")
      .where("userId", "==", bookOwnerUid)
      .get();

    try {
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return error;
    }
  },

  getBookName: async (bookName) => {
    try {
      const querySnapshot = await firestoreAdmin
        .collection("book")
        .where("name", ">=", bookName)
        .where("name", "<=", bookName + "\uf8ff")
        .get();

      if (querySnapshot.empty) return null;

      return querySnapshot.docs[0].data();
    } catch (err) {
      return err;
    }
  },

  setBook: async (book) => {
    const uid = uuid();
    const bookDetail = { ...book, uid };

    try {
      const serverRespose = await firestoreAdmin
        .collection("book")
        .doc(uid)
        .create(bookDetail);
      return serverRespose;
    } catch (error) {
      return error;
    }
  },

  getFeaturedBooks: async (amount) => {
    try {
      const querySnapshot = await firestoreAdmin
        .collection("book")
        .orderBy("year", "desc")
        .limit(parseInt(amount))
        .get();

      if (querySnapshot.empty) return null;

      return await querySnapshot.docs.map((doc) => doc.data());
    } catch (err) {
      return err;
    }
  },

  getRecentsBooks: async (amount) => {
    try {
      const querySnapshot = await firestoreAdmin
        .collection("book")
        .orderBy("uploadDate", "desc")
        .limit(parseInt(amount))
        .get();

      if (querySnapshot.empty) return null;

      return await querySnapshot.docs.map((doc) => doc.data());
    } catch (err) {
      return err;
    }
  },

  getOthersBooks: async (amount) => {
    try {
      const querySnapshot = await firestoreAdmin
        .collection("book")
        .orderBy("uploadDate", "asc")
        .limit(parseInt(amount))
        .get();

      if (querySnapshot.empty) return null;

      return await querySnapshot.docs.map((doc) => doc.data());
    } catch (err) {
      return err;
    }
  },

  setFavorite: async (bookId, userId) => {
    try {
      const serverRespose = await firestoreAdmin
        .collection("book")
        .doc(bookId)
        .update({
          userInterested: admin.firestore.FieldValue.arrayUnion(userId),
        });

      return serverRespose;
    } catch (error) {
      return error;
    }
  },
};
