import { Flex } from "@chakra-ui/react";
import profileImage from "../../../imgs/defaultProfileImagePng.png";
export const ImageContainer = () => {
  return (
    <Flex
      flexDir="row"
      justifyContent="center"
      className="Profile_Image_Container"
    >
      <img src={profileImage} alt="" />
    </Flex>
  );
};
