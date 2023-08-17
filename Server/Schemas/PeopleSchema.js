import { Schema, Types } from "mongoose";
const PeopleSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  posts: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
});

// module.exports = PeopleSchema;
export default PeopleSchema;
