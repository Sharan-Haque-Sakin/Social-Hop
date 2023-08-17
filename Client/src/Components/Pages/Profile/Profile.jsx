import { Box, Flex, Heading } from "@chakra-ui/react";
import { ImageContainer } from "./ImageContainer";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { UserPosts } from "./userPosts";
export default function Profile() {
  const cookies = new Cookies();
  const getCookie = cookies.get("authCookie");
  const userInfo = jwt(getCookie);
  return (
    <Box p="2rem">
      <Flex flexDir="column" justifyContent="center">
        <Heading mb="2rem" textAlign="center">
          Profile
        </Heading>

        <ImageContainer />
        <h2 style={{ textAlign: "center", fontSize: "1.3rem" }}>
          User Name: {userInfo.userName}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "1.3rem" }}>
          Email: {userInfo.userEmail}
        </h2>
        <h2 style={{ textAlign: "center", fontSize: "1.3rem" }}>
          UID:{userInfo.uid}
        </h2>
      </Flex>
      <UserPosts />
    </Box>
  );
}
