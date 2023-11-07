const express = require("express");
const app = express();
const router = express.Router();
const {
  createBook,
  updateBook,
  deleteBook,
  getBookById,
  getAllBooks,
} = require("../controllers/book");

router.route("/book").post(createBook);

router.route("/book/:id").get(getBookById);

router.route("/book/:id").patch(updateBook);

router.route("/book/:id").delete(deleteBook);

router.route("/books").get(getAllBooks);

module.exports = router;
