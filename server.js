require('dotenv').config();

const menusRouter = require("./controllers/MenuController");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB avec Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB!");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit();
});

app.use("/", menusRouter);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
