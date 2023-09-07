import { Box, Flex } from "@chakra-ui/react";
import Feeds from "./Feeds";
import Post from "../Posts/Post";
import TopPostIcon from "./topPostIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonFeeds from "../../Skeleton";
export default function Home() {
  // const { toggleColorMode } = useColorMode();
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://socialhop.vercel.app/getPosts")
      .then((data) => {
        setData(data.data.Posts);
        setLoading(true);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <Box px="2rem">
      <TopPostIcon />
      <Flex
        flexDir="column"
        justifyContent="center"
        // width="100%"

        // alignItems="center"
      >
        {Loading ? (
          Data.map((items, key) => {
            return (
              <Feeds
                key={key}
                userName={items.user.userName}
                Date={items.date}
                Content={items.Content}
                Time={items.time}
                userPost={false}
              />
            );
          })
        ) : (
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <SkeletonFeeds />

            <SkeletonFeeds />
            <SkeletonFeeds />
          </Flex>
        )}
        {/* <SkeletonFeeds /> */}
      </Flex>
    </Box>
  );
}
