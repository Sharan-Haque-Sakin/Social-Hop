import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Textarea,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalFooter,
  FormLabel,
  useToast,
  Spinner,
  LightMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
const initialValue = {
  postBar: "",
};

export default function Post() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const cookies = new Cookies();
  const getCookie = cookies.get("authCookie");
  const decodedJwt = jwt(getCookie);
  const toast = useToast();
  const { isSubmitting, handleChange, handleSubmit, handleBlur, values } =
    useFormik({
      initialValues: initialValue,
      onSubmit: (values, k) => {
        axios
          .post("http://localhost:3000/post", {
            Content: values.postBar,
            user: decodedJwt.id,
          })
          .then((msg) => {
            if (msg.status === 200) {
              toast({
                title: "Your Post was successfull!",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              setInterval(() => {
                window.location.reload();
              }, 1000);
            }
            setInterval(() => {
              k.setSubmitting(false);
            }, 500);
          })
          .catch((err) => {
            toast({
              title: "Post failed:(",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            console.log(err);
            setInterval(() => {
              k.setSubmitting(false);
            }, 500);
          });
      },
    });

  return (
    <>
      <LightMode>
        <Button
          onClick={onOpen}
          colorScheme="blue"
          color="white"
          fontWeight="bold"
        >
          Post
        </Button>
      </LightMode>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>Post</h2>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Textarea
                  onChange={handleChange}
                  value={values.postBar}
                  onBlur={handleBlur}
                  maxLength={1000}
                  placeholder="What on your mind?"
                  h="10rem"
                  resize="none"
                  name="postBar"
                />
                <FormLabel color="gray.500">
                  You can write max 1000 words
                </FormLabel>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue">
                    {/* Post */}
                    {isSubmitting ? <Spinner /> : "Post"}
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
}
