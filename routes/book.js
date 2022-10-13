const express = require("express");
const bookController = require("../controllers/book");
const { isAuth } = require("../middlewares/userAutenticated");
const router = express.Router();

const multipart = require("connect-multiparty");
const mdUpload = multipart({ uploadDir: "./upload" });

router.get("/", bookController.getBooks);
router.get("/:uid", bookController.getBookById);
router.get("/favourite/:id", bookController.getFavouriteBooks);
router.get("/my/:id", bookController.getMyBooks);
router.post("/", mdUpload, bookController.setBook);

module.exports = router;
