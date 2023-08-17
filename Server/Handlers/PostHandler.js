// const { model } = require("mongoose");
import { model } from "mongoose";

// Initial Imports
import PostSchema from "./../Schemas/PostSchema.js";
import PeopleSchema from "../Schemas/PeopleSchema.js";

// Create model

const Post = new model("Post", PostSchema);
const People = new model("People", PeopleSchema);
const PostHandler = async (req, res) => {
  try {
    const NewPost = new Post({
      Content: req.body.Content,
      user: req.body.user,
    });
    await NewPost.save();

    await People.updateOne(
      {
        _id: req.body.user,
      },
      {
        $push: {
          posts: NewPost._id,
        },
      }
    );

    res.json({
      msg: "Post successfull!",
      isOk: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Post failed", isOk: false });
  }
};

// module.exports = PostHandler;
export default PostHandler;
