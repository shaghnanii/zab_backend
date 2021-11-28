const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/jwt_token");


const authentication = require("./src/routes/authentication");


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authentication);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/api", passport.authenticate("jwt", { session: false }), secureRoute);

app.use("/users", passport.authenticate("jwt", { session: false }), users);

// Handle errors. for api
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;