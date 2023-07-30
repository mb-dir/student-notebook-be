import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT;
const DB_URI = process.env.DB_URI || "";

app.use(express.json());

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(err => {
    console.log(err);
  });
