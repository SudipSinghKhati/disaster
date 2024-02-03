import dotenv from "dotenv";
import express from "express";
import auth from './middleware/auth'
import mongoose from "mongoose";
import users from './routes/user';
import news from './routes/news';
import path from "path";
dotenv.config({ path: path.resolve(".env") });

const dbName = "/disaster";

const app = express();

app.get("/", (req: any, res: any) => {
  return res.send("<h1>Hello MY Friends</h1>");
});

mongoose
  .connect("mongodb://127.0.0.1:27017" + dbName)
  .then(() => console.log("connected sucessfully"))
  .catch((err) => console.log(err));

  app.use('/users', users);
  app.use('/news', auth.verifyUser, news)

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  if (err.name === "ValidatorError") res.status(400);
  else if (err.name === "CastError") res.status(400);
  res.json({ error: err.message });
});

app.use((req: any, res: any) => {
  res.status(404).json({ error: "Path Not Found" });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
