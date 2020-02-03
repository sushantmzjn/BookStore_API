const express = require("express");
const Book = require("../models/books");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let book = new Book(req.body);
        console.log(book)
        book.save()
            .then((book) => {
                res.statusCode = 201;
                res.json(book);
            }).catch(next);
    });

router.route("/:categories")
.get((req, res, next) => {
    Book.find({categories: req.params.categories})
    .then((books) => {
        console.log(books);
        res.json(books);
    })
    .catch((err) => {
        next(err)
    });
})

module.exports = router;
