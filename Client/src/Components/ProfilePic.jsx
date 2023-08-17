import { Avatar, Flex, Wrap } from "@chakra-ui/react";
import "./Style.css";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import defaultProfilePic from "../imgs/defaultProfileImagePng.png";
export default function ProfilePic() {
  const cookies = new Cookies();
  const getCookie = cookies.get("authCookie");
  const userName = jwt(getCookie);

  return (
    <>
      <Wrap>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <h2
            className="username"
            style={{ position: "relative", top: "-2px", fontSize: "1.2rem" }}
          >
            {userName.userName}
          </h2>
          <h3 className="userid" style={{ color: "GrayText" }}>
            #{userName.uid}
          </h3>
        </Flex>
        <Menu>
          <MenuButton>
            <Avatar src={defaultProfilePic} />
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <Link to="/profile">
              <MenuItem>My Profile</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Wrap>
    </>
  );
}
