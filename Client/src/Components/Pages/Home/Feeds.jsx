import {
  Text,
  Avatar,
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Button,
  Spacer,
  IconButton,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Update } from "../Posts/Update";
import defaultProfileImage from "../../../imgs/defaultProfileImagePng.png";

export default function Feeds({
  userName,
  Date,
  Content,
  Time,
  userPost,
  onDelete,
  postId,
  onUpdate,
  formValue,
  changeFormValue,
  loading,
}) {
  return (
    <Box className="Feed" display="flex" justifyContent="center" my="1rem">
      <Card size="md" width="25rem">
        <CardHeader flexDir="row" display="flex" gap=".5rem">
          <Avatar src={defaultProfileImage} />
          <Flex flexDir="column">
            <Text>{userName}</Text>
            <Text color="gray.500">
              {Date} - {Time}
            </Text>
          </Flex>
          <Spacer />
          {userPost ? (
            <>
              <Update
                onUpdate={onUpdate}
                formValue={formValue}
                changeFormValue={changeFormValue}
                id={postId}
                Content={Content}
                isLoading={loading}
              />
              <IconButton variant="ghost" isDisabled={loading}>
                <DeleteIcon onClick={() => onDelete(postId)} />
              </IconButton>
            </>
          ) : null}
        </CardHeader>

        <Divider />
        <CardBody>
          <Text>{Content}</Text>
        </CardBody>
      </Card>
    </Box>
  );
}
