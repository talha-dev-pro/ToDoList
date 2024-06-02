var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var userRoutes = require("./routes/userRouter");
var authRoutes = require("./routes/authRouter");
var adminRoutes = require("./routes/adminRouter");
var taskRoutes = require("./routes/taskRouter");
var sessionRoutes = require("./routes/sessionRouter");

var app = express();

// view engine setup
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/users", userRoutes);
app.use("/task", taskRoutes);
app.use(sessionRoutes);
app.use("/auth", authRoutes);
app.use(adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
