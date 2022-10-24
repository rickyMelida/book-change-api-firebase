const express = require("express");
const { isAuth } = require("../middlewares/userAutenticated");
const router = express.Router();
const {
  getBooks,
  getBookById,
  getFavouriteBooks,
  getMyBooks,
  setBook,
} = require("../controllers/book");

const multipart = require("connect-multiparty");
const mdUpload = multipart({ uploadDir: "./upload" });

router.get("/", getBooks);
router.get("/:uid", getBookById);
router.get("/favourite/:id", getFavouriteBooks);
router.get("/my/:id", getMyBooks);
router.post("/set-book", mdUpload, setBook);

module.exports = router;
