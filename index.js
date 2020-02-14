const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const bookRouter = require('./routes/books');
const adminRouter = require('./routes/admin');
const bookorderRouter = require('./routes/bookorder')
const cartRouter = require('./routes/cart')
const auth = require('./auth');
const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));
//DB Config
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

// Routes
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);
app.use(auth.verifyUser);
app.use('/book',bookRouter);
app.use('/bookorder', bookorderRouter);
app.use('/cart',cartRouter);





// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});
