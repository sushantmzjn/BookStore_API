const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const User = require('../models/users')
const router = express.Router();
const auth = require('../auth');

router.post('/signupadmin', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err = new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        Admin.create({
            name: req.body.name,
            password: hash
        }).then((admin) => {
            let token = jwt.sign({ _id: admin._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/loginadmin', (req, res, next) => {
    Admin.findOne({ name: req.body.name })
        .then((admin) => {
            if (admin == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, admin.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: admin._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get("/userlist", auth.verifyAdmin, (req, res, next) => {
    User.find()
        .then((users) => {
            console.log(users);
            res.json(users)
        })
        .catch((err) => {
            next(err)
        })
})
router.route("/userlist/:id")
    .delete(auth.verifyAdmin, (req, res, next) => {
        User.findOneAndDelete({ _id: req.params.id })
            .then((users) => {
                if (users == null) throw new Error("user not found");
                res.json(users)
            }).catch(next)
    })
module.exports = router;
