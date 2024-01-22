const { firestoreAdmin } = require("../services/firebase-admin-service");
const { ApiResponse } = require("../utils/responses");
const { bookService } = require("../services/book.service");

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();

    if (books == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, books);
  } catch (error) {
    return ApiResponse.InternalServerError(res);
  }
};

const getBook = async (req, res) => {
  const { uid } = req.params;
  try {
    const book = await bookService.getBook(uid);

    if (book == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, book);
  } catch (err) {
    return ApiResponse.InternalServerError(res);
  }
};

const getBooksByUserOwner = async (req, res) => {
  const { uid } = req.params;

  try {
    const book = await bookService.getBooksByUserOwner(uid);

    if (book == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, book);
  } catch (err) {
    return ApiResponse.InternalServerError(res);
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
    const bookCreated = bookService.setBook(bookData);

    return ApiResponse.Created(res, bookCreated);
  } catch (error) {
    return ApiResponse.InternalServerError(res);
  }
};

const getFeaturedBooks = async (req, res) => {
  const { amount } = req.params;
  try {
    const books = await bookService.getFeaturedBooks(amount);

    if (books == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, books);
  } catch (err) {
    return ApiResponse.InternalServerError(res);
  }
};

const getRecentsBooks = async (req, res) => {
  const { amount } = req.params;
  try {
    const books = await bookService.getRecentsBooks(amount);

    if (books == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, books);
  } catch (err) {
    return ApiResponse.InternalServerError(res);
  }
};

const getOthersBooks = async (req, res) => {
  const { amount } = req.params;
  try {
    const books = await bookService.getOthersBooks(amount);

    if (books == null) return ApiResponse.NotContent(res);

    return ApiResponse.OK(res, books);
  } catch (err) {
    return ApiResponse.InternalServerError(res);
  }
};

const findBook = (req, res) => {
  return { message: "findBook Controller" };
};

module.exports = {
  getBooks,
  getBook,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBooksByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getOthersBooks,
  findBook,
};
