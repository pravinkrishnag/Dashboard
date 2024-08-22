const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authroute = require("./routes/authroute");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
//routes use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authroute);
mongoose.connect("mongodb://127.0.0.1:27017").then(app.listen(7001));