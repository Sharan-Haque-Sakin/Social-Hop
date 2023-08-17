import { Router } from "express";

import mongoose from "mongoose";

// Models

import PostSchema from "../Schemas/PostSchema.js";
import PeopleSchema from "../Schemas/PeopleSchema.js";

const PostsModel = mongoose.model("Posts", PostSchema);
const People = mongoose.model("People", PeopleSchema);

// gets Express Router

const Routes = Router();

Routes.get("/", async (req, res) => {
  try {
    const Posts = (
      await PostsModel.find({}).populate("user", "userName _id")
    ).reverse();
    res.status(200).json({
      msg: "Successfull",
      Posts: Posts,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong while getting data",
    });
    console.log(error.message);
  }
});

Routes.get("/userPost/:id", async (req, res) => {
  const result = await People.find({ _id: req.params.id }).populate("posts");
  res.status(200).json({
    msg: result,
  });
});
export default Routes;
