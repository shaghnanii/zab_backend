require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./src/routes/api");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

// Handle errors. for api
// app.use(function (err, req, res, next) {
//     // res.status(err.status || 500);
//     // res.json({ error: err });
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

module.exports = app;