import { model } from "mongoose";
import PeopleSchema from "./../Schemas/PeopleSchema.js";
const User = new model("People", PeopleSchema); // I'm using the term People for User,cz some problem while Hosting might happen
import { hash } from "bcrypt";

// Generate UNIQUE USER ID - UUID
import { nanoid } from "nanoid";
const UUID = nanoid(7);
const SignUpHandler = async (req, res) => {
  try {
    const hashPass = await hash(req.body.password, 10);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPass,
      uid: UUID,
    });
    await newUser.save();
    res.status(200).json({
      msg: "Your account was successfully created!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      errorMsg: "There was a error !",
    });
  }
};

export default SignUpHandler;
