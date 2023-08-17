import React from "react";
import "./Auth.css";

import { Center } from "@chakra-ui/react";
import AuthBox from "./AuthBox";
export default function SignUp() {
  return (
    <div className="SignUpContainer">
      <Center height="100vh">
        {/* <img src={Authimage} alt="SignUp Page Image" />
          <div className="line"></div> */}
        {/* Signup Box */}
        <AuthBox
          heading="Login"
          CreateAccount={false}
          BottomText="Don't have an account?"
          LinkTo="/signup"
        />
      </Center>
    </div>
  );
}
