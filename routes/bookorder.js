const express = require("express");
const Bookorder = require("../models/bookorder");
const router = express.Router();

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
    });
module.exports = router;