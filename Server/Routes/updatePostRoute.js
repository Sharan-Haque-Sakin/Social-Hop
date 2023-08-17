import { Router } from "express";
import PostSchema from "../Schemas/PostSchema.js";
import { model } from "mongoose";

const Routes = Router();

// Get Post model

const Post = model("Post", PostSchema);

Routes.put("/:id", async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        Content: req.body.Content,
      }
    );
    res.status(200).json({
      msg: "Your post was successfully updated!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Error in update!",
    });
  }
});
export default Routes;
