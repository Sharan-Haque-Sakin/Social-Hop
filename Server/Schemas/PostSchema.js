import mongoose, { Schema, Types } from "mongoose";
// Getting current time

const time = new Date();
const thisTime = time.toLocaleString("en-BD", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const currentTime = thisTime.toString();

// Getting current Date

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

// Making Schema

const PostSchema = new Schema(
  {
    time: {
      type: String,

      default: currentTime,
    },
    date: {
      type: String,
      default: currentDate,
    },

    Content: {
      type: String,
      required: true,
    },

    like: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: "People",
      required: true,
    },
  },
  { timestamps: true }
);

export default PostSchema;
