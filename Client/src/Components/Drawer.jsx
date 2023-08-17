import {
  Drawer as Dw,
  DrawerBody,
  DrawerHeader,
  Button,
  DrawerOverlay,
  IconButton,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  useColorMode,
  LightMode,
  Flex,
  DrawerFooter,
} from "@chakra-ui/react";
import { SunIcon, HamburgerIcon, MoonIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import Cookies from "universal-cookie";
import LogOutIcon from "../imgs/LogOut.svg";
import { IoIosLogOut } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
export default function Drawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = useRef();

  const cookies = new Cookies();
  const navigate = useNavigate();
  const handleLogOut = () => {
    cookies.remove("authCookie");
    window.location.reload();
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={onOpen} ref={btnRef}>
        <HamburgerIcon />
      </IconButton>
      <Dw
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column">
              <LightMode>
                <IconButton
                  onClick={toggleColorMode}
                  colorScheme={colorMode === "dark" ? "orange" : "purple"}
                  w="2rem"
                >
                  {colorMode === "dark" ? (
                    <SunIcon color="white" />
                  ) : (
                    <MoonIcon color="white" />
                  )}
                </IconButton>
              </LightMode>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <LightMode>
              <Button onClick={handleLogOut} colorScheme="blue">
                {" "}
                <IoIosLogOut /> {"  "} Log Out
              </Button>
            </LightMode>
          </DrawerFooter>
        </DrawerContent>
      </Dw>
    </>
  );
}
