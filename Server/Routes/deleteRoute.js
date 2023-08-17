import { Router } from "express";
import PostSchema from "../Schemas/PostSchema.js";
import { model } from "mongoose";
const Post = model("Post", PostSchema);
const Routes = Router();

Routes.delete("/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Deleted successful!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
    console.log(error.meessage);
  }
});
export default Routes;
