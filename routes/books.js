const express = require("express");
const Book = require("../models/books");
const router = express.Router();
const auth = require('../auth');

router.route("/", auth.verifyAdmin)
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
        Book.find({ categories: req.params.categories })
            .then((books) => {
                console.log(books);
                res.json(books);
            })
            .catch((err) => {
                next(err)
            });
    })

router.route("/", auth.verifyAdmin)
    .get((req, res, next) => {
        Book.find()
            .then((books) => {
                console.log(books);
                res.json(books)
            })
            .catch((err) => {
                next(err)
            })
    })

router.route("/:id")
    .delete(auth.verifyAdmin, (req, res, next) => {
        Book.findOneAndDelete({ _id: req.params.id })
            .then((books) => {
                if (books == null) throw new Error("product not found");
                res.json(books)
            }).catch(next)
    })

    .put((req, res, next) => {
        console.log(req.body);
        Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then((book) => {
                if (book == null) throw new Error("product not found");
                res.json(book)
            }).catch(next)
    });

module.exports = router;
