import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import dotenv from "dotenv";

// Internal Exports

import LoginRoute from "./Routes/Login.js";
import SignUpRoute from "./Routes/SignUp.js";
import PostRoute from "./Routes/PostRoute.js";
import getPostsRoute from "./Routes/getPost.js";
import DeletePostRoute from "./Routes/deleteRoute.js";
import updatePost from "./Routes/updatePostRoute.js";
dotenv.config();
// Connection of MongoDB

mongoose.set("strictQuery", true);
const url = process.env.MONGODB_CONNECTION_STRING;
// Ohio
mongoose
  .connect(url)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err.message));

// Request Body Parsers and other app.use() functions

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://socialhop.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Routes
app.get("/", async function (req, res) {
  res.send("This is the base route for the server side! ~ Sharan Haque Sakin");
});
app.get("/check", function (req, res) {
  res.send("It's working...");
});
app.use("/login", LoginRoute);
app.use("/signup", SignUpRoute);
app.use("/post", PostRoute);
app.use("/getPosts", getPostsRoute);
app.use("/deletePost", DeletePostRoute);
app.use("/updatePostRoute", updatePost);

app.post("/postMe", function (req, res) {
  res.send("You just posted the following- ", req.body.post);
});

// Lister to Port

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at PORT ${process.env.PORT}`);
});
