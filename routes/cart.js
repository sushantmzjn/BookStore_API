const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let cart = new Cart(req.body);
        cart.buyer = req.user._id;
        console.log(cart)
        cart.save()
            .then((cart) => {
                res.statusCode = 201;
                res.json(cart);
            }).catch(next);
    })
    .get((req, res, next) => {
        Cart.find({ buyer: req.user._id })
            .then((cart) => {
                console.log(cart);
                res.json(cart);
            })
            .catch((err) => {
                next(err);
            })
    })
// router.route("/id")
    .delete((req, res, next) => {
        Cart.findOneAndDelete({ buyer: req.user._id})
            .then((cart) => {
                if (cart == null) throw new Error("product not found");
                res.json(cart);
            }).catch(next);
    })
module.exports = router;