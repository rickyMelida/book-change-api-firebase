const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  getFavouriteBooks,
  getMyBooks,
  setBook,
  getBookByUserOwner,
  getRecentsBooks,
  getFeaturedBooks,
  getothersBooks
} = require("../controllers/book");

const multipart = require("connect-multiparty");
const mdUpload = multipart({ uploadDir: "./upload" });

router.get("/", getBooks);
router.get("/:uid", getBookById);
router.get("/byUser/:uid", getBookByUserOwner);
router.get("/favourite/:id", getFavouriteBooks);
router.get("/my/:id", getMyBooks);
router.post("/set-book", mdUpload, setBook);
router.get("/getRecents/:amount", getRecentsBooks);
router.get("/getFeaturedBooks/:amount", getFeaturedBooks);
router.get("/getothersBooks/:amount", getothersBooks);

module.exports = router;
