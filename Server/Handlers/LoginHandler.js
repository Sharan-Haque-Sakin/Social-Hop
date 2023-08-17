import { model } from "mongoose";
// import { PeopleSchema } from "../Schemas/PeopleSchema.js";
import PeopleSchema from "./../Schemas/PeopleSchema.js";
const User = model("People", PeopleSchema);
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const HandleGetLogin = async (req, res) => {
  try {
    const findUserName = await User.findOne({
      userName: req.body.userName,
    });
    // Checking the if that user exists
    if (findUserName) {
      // Checking if the password is correct
      const checkPass = await compare(req.body.password, findUserName.password);
      if (checkPass) {
        // Generate JWT Token!

        const token = jwt.sign(
          {
            userName: findUserName.userName,
            userEmail: findUserName.email,
            id: findUserName._id,
            uid: findUserName.uid,
          },
          process.env.SECRET
        );

        res.status(200).json({
          msg: "Login successful!",
          jwt: token,
        });
      } else {
        res
          .status(403)
          .json({ msg: "Password didn't match", body: "password" });
      }
    } else {
      res.status(403).json({ msg: "No account was found", body: "userName" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errorMsg: "Something went wrong" });
  }
};

export default HandleGetLogin;
