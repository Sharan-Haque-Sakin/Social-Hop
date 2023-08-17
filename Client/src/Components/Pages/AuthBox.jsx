import {
  Box,
  IconButton,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormLabel,
  useToast,
  Spinner,
  Button,
  useColorMode,
  LightMode,
  DarkMode,
  Img,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CiUser as User } from "react-icons/ci";
import { MdOutlineAlternateEmail as Email } from "react-icons/md";
import { BsKey as Pass } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import Logo from "../../imgs/Logo.png";
import "./Auth.css";
import { LoginSchema, SignUpSchema } from "../../Schemas/index";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// Validation

import { useFormik } from "formik";
import LoadingScreen from "./LoadingScreen";

const initialValuesSignUp = {
  userName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  userName: "",
  password: "",
};
// For conditional rendering(also to ignore the code hell)

const EmailInput = ({ values, handleChange, handleBlur, errors, touched }) => {
  return (
    <>
      <InputGroup marginTop="2rem" fontSize="1rem">
        <InputLeftElement>
          <Email size={20} />
        </InputLeftElement>
        <Input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          value={values}
          variant="filled"
          fontFamily="Outfit"
        />
      </InputGroup>
      {errors && touched ? <FormLabel color="red">{errors}</FormLabel> : null}
    </>
  );
};

// Main box

const AuthBox = (props) => {
  const [Show, setShow] = useState(false);

  const cookie = new Cookies();

  const [errorUserName, setErrorUserName] = useState("");
  const [errorPass, setErrorPass] = useState("");

  const toast = useToast();

  const { heading } = props;

  const initialValues =
    heading === "Login" ? initialValuesLogin : initialValuesSignUp;

  const schema = heading === "Login" ? LoginSchema : SignUpSchema;

  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,

    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values, action) => {
      if (heading === "Login") {
        axios
          .post("http://localhost:5000/login/", {
            userName: values.userName,
            password: values.password,
          })

          .then((data) => {
            setTimeout(() => {
              action.setSubmitting(false);
            }, 500);
            if (data.status === 200) {
              cookie.set("authCookie", data.data.jwt, {
                expires: new Date(Date.now() + 2589000000),
                sameSite: "none",
                secure: "true",
              });
              toast({
                name: "Login successfull",
                description: "Login successfull!",
                status: "success",
                duration: "9000",
                isClosable: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 600);
            }
          })
          .catch((error) => {
            if (error.response) {
              setTimeout(() => action.setSubmitting(false), 500);
              if (error.response.data.body === "userName") {
                setErrorPass("");
                setErrorUserName(error.response.data.msg);
              } else if (error.response.data.body === "password") {
                setErrorPass(error.response.data.msg);
                setErrorUserName("");
              }

              //   setEmail(error.response.userName);
              // }
            } else if (error.request) {
              setTimeout(() => {
                // alert(JSON.stringify(values));
                // you have to clean up
                action.setSubmitting(false);
                toast({
                  name: "Request error!",
                  description: "Request failed",
                  status: "error",
                  duration: "5000",
                  isClosable: true,
                });
              }, 2000);
            } else {
              setTimeout(() => {
                action.setSubmitting(false);
              });
              console.log("Error", error.message);
              toast({
                name: "Error",
                description: "Something went wrong",
                status: "error",
                duration: "9000",
                isClosable: true,
              });
            }
          });
      } else {
        axios
          .post("http://localhost:5000/signup/", {
            userName: values.userName,
            email: values.email,
            password: values.password,
          })

          .then((data) => {
            if (data.status === 200) {
              setTimeout(() => action.setSubmitting(false), 500);
              toast({
                name: "Account creation successfull",
                description: "Your account was successfully created!",
                status: "success",
                duration: "9000",
                isClosable: true,
              });
              setOk(true);
            }
          })
          .catch((err) => {
            setTimeout(() => action.setSubmitting(false), 500);
            setOk(false);
            toast({
              name: "Request failed!",
              description: "Request Failed!",
              status: "error",
              duration: "9000",
              isClosable: true,
            });

            console.log(err);
          });
      }
    },
  });

  const { colorMode } = useColorMode();

  return (
    <>
      {ok && navigate("/profile")}
      <Box
        as="main"
        backgroundColor={colorMode === "dark" ? "gray.700" : "white"}
        padding="33px"
        height="max-content"
        border=".5px solid #bdbdbd"
        borderRadius="20px"
      >
        <Img
          // background={colorMode === "dark" ? "white" : "transparent"}
          // borderRadius="1000px"
          src={Logo}
          alt="Logo"
          style={{ width: "8rem", margin: "auto" }}
        />
        <Heading textAlign="center" fontFamily="Outfit">
          {props.heading}
        </Heading>
        {/* UserName */}
        <form onSubmit={handleSubmit}>
          <InputGroup marginTop="2rem" fontSize="1rem" aria-required>
            <InputLeftElement>
              <User size={20} />
            </InputLeftElement>
            <Input
              placeholder="userName"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="filled"
              fontFamily="Outfit"
            />
          </InputGroup>
          <LoadingScreen />
          {errors.userName && touched.userName ? (
            <FormLabel color="red">{errors.userName}</FormLabel>
          ) : null}
          <FormLabel color="red">{errorUserName}</FormLabel>
          {props.CreateAccount ? (
            <EmailInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.email}
              values={values.email}
              errors={errors.email}
            />
          ) : null}

          <InputGroup marginTop="2rem" fontSize="1rem">
            <InputLeftElement>
              <Pass size={20} />
            </InputLeftElement>
            <Input
              placeholder="Password"
              name="password"
              type={Show ? "text" : "password"}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              value={values.password}
              variant="filled"
              fontFamily="Outfit"
            />
            <InputRightElement>
              <IconButton
                mr="2"
                backgroundColor="transparent"
                _hover="none"
                _active="none"
                onClick={() => setShow(!Show)}
              >
                {Show ? <ViewIcon /> : <ViewOffIcon />}
              </IconButton>
            </InputRightElement>
          </InputGroup>

          {errors.password && touched.password ? (
            <FormLabel color="red">{errors.password}</FormLabel>
          ) : null}
          <FormLabel color="red">{errorPass}</FormLabel>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LightMode>
              <Button
                isDisabled={isSubmitting}
                type="submit"
                colorScheme="telegram"
              >
                {isSubmitting ? (
                  <Spinner speed="0.65s" color="white" size="sm" />
                ) : (
                  heading
                )}
              </Button>
            </LightMode>
            <Link
              to={`${props.LinkTo}`}
              style={{
                color: colorMode === "dark" ? "aqua" : "blue",
                textDecoration: "underline",
                marginTop: "1rem",
              }}
            >
              {props.BottomText}
            </Link>
          </div>
        </form>
      </Box>
    </>
  );
};

export default AuthBox;
