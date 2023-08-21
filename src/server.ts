import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import { userRoute } from "./routes/user";

const app = express();
const port = process.env.PORT;
const DB_URI = process.env.DB_URI || "";

app.use(express.json());

app.use("/api/user", userRoute);

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
