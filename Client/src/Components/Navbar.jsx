import {
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import ProfilePic from "./ProfilePic";
import Drawer from "./Drawer";
// import Logo from "./Logo.png";
export default function Navbar() {
  const { colorMode } = useColorMode();
  const SetColor = colorMode === "dark" ? "#b3b3b3" : "black";
  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#007AB8" : SetColor,
      backgroundColor: isActive ? "lightblue" : "transparent",
      padding: "5px",
      borderRadius: "50px",
      display: "block",
    };
  };

  const navStyle = {
    py: "1rem",
    px: "4rem",

    bgColor: colorMode === "dark" ? "gray.700" : "white",
    "@media(max-width:660px)": {
      px: "1rem",
    },
  };

  const logoColor = colorMode === "dark" ? "#0084f9" : "blue";
  const logoStyle = {
    fontFamily: "Outfit",
    color: logoColor,
    fontSize: "1.2rem",
    fontWeight: "400",
    "@media(max-width:385px)": {
      display: "none",
    },
  };

  return (
    <Box sx={navStyle} as="nav">
      <Flex justifyContent="space-between">
        <Text sx={logoStyle}>
          <b>Socialhop</b>
        </Text>
        <List>
          <HStack flexDirection="row" gap="6" justifyContent="center">
            <ListItem>
              <NavLink style={NavLinkStyle} to="/">
                <BiHomeAlt2 style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={NavLinkStyle} to="/friends">
                <BsPeople style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink style={NavLinkStyle} to="/msg">
                <FiMessageCircle style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </ListItem>
          </HStack>
        </List>
        <HStack>
          <ProfilePic />
          <Drawer />
        </HStack>
      </Flex>
    </Box>
  );
}
