const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todoList");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/todo", todoRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to DB");

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
