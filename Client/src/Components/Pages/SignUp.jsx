import React from "react";
import "./Auth.css";

import { Center } from "@chakra-ui/react";
import AuthBox from "./AuthBox";
export default function SignUp() {
  return (
    <div className="SignUpContainer">
      <Center height="100vh">
        <AuthBox
          heading="Create Account"
          CreateAccount={true}
          BottomText="Already have an account?"
          LinkTo="/"
        />
      </Center>
    </div>
  );
}
