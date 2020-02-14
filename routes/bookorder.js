const express = require("express");
const Bookorder = require("../models/bookorder");
const router = express.Router();
const auth = require('../auth');

router.route("/")
    .post((req, res, next) => {
        let bookorder = new Bookorder(req.body);
        bookorder.buyer = req.user._id;
        console.log(bookorder)
        bookorder.save()
            .then((bookorder) => {
                res.statusCode = 201;
                res.json(bookorder);
            }).catch(next);
    })
    .get((req, res, next) => {
        Bookorder.find({ buyer: req.user._id })
            .then((bookorder) => {
                console.log(bookorder);
                res.json(bookorder);
            })
            .catch((err) => {
                next(err);
            })
    })

router.route("/list", auth.verifyAdmin)
    .get((req, res, next) => {
        Bookorder.find()
            .then((bookorders) => {
                console.log(bookorders);
                res.json(bookorders)
            })
            .catch((err) => {
                next(err)
            })
    })

router.route("/list/:id")
    .delete(auth.verifyAdmin, (req, res, next) => {
        Bookorder.findOneAndDelete({ _id: req.params.id })
            .then((bookorders) => {
                if (bookorders == null) throw new Error("Order not found");
                res.json(bookorders)
            }).catch(next)
    })
module.exports = router;