import { EditIcon } from "@chakra-ui/icons";
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
  //   useToast,
  Spinner,
  IconButton,
  LightMode,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
// import { useFormik } from "formik";
// import Cookies from "universal-cookie";
// import decodedJwt from "jwt-decode";
// import { useState } from "react";

export const Update = ({
  onUpdate,
  Content,
  id,
  formValue,
  changeFormValue,
  isLoading,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .put(`http://localhost:3000/updatePostRoute/${id}`, {
        Content: formValue,
      })
      .then((data) => {
        setLoading(false);
        toast({
          title: "Your post was successfully updated!",
          status: "success",
          variant: "subtle",
          duration: "2000",
          isClosable: true,
        });
        // setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        toast({
          title: "Post update failed!",
          variant: "subtle",
          status: "error",
          duration: "2000",
          isClosable: true,
        });
      });
  };

  const handleChange = (e) => {
    let value = e.target.value;

    changeFormValue(value);
  };
  return (
    <>
      <LightMode>
        <IconButton
          onClick={onOpen}
          colorScheme="blue"
          variant="ghost"
          fontWeight="bold"
        >
          <EditIcon onClick={() => onUpdate(Content)} />
        </IconButton>
      </LightMode>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h2>Update</h2>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Textarea
                  onChange={(e) => handleChange(e)}
                  value={formValue}
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
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isDisabled={isLoading}
                  >
                    {/* Post */}
                    {loading ? <Spinner /> : "Update"}
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
};
