import { Flex, Box, Card, CardBody, Text } from "@chakra-ui/react";
import Post from "../Posts/Post";

export default function TopPostIcon() {
  return (
    <Flex justifyContent="center" className="topBar" mt="2rem">
      <Card width="15rem">
        <CardBody textAlign="center">
          <Text>Share your thoughts!</Text>
        </CardBody>
        <Post />
      </Card>
    </Flex>
  );
}
