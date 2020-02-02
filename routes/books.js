const express = require("express");
const Book = require("../models/books");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let book = new Book(req.body);
        book.buyer = req.user._id;
        console.log(book)
        book.save()
            .then((book) => {
                res.statusCode = 201;
                res.json(book);
            }).catch(next);
    });

module.exports = router;
