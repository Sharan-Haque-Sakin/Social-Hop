import { Flex, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";

import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Feeds from "./../Home/Feeds";
import SkeletonFeeds from "../../Skeleton";
export const UserPosts = () => {
  const cookies = new Cookies();
  const getCookie = cookies.get("authCookie");
  const userDetails = jwt(getCookie);

  const [userPosts, setUserPosts] = useState([]);
  const [dltLoading, setDltLoading] = useState(false); //* for loading spinner of Delete request
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`https://social-hop.vercel.app/getPosts/userPost/${userDetails.id}`)
      .then((res) => {
        setUserPosts(res.data.msg[0].posts);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, [userPosts]);

  //* Handle Delete

  const toast = useToast();

  const handleDelete = (e) => {
    toast({
      title: "Deleting post...",
      description: "Your post is being deleted,please wait...",
      status: "info",
      duration: "1500",
    });
    setDltLoading(true);
    axios
      .delete(`https://social-hop.vercel.app/deletePost/${e}`)
      .then((data) => {
        toast({
          title: "Your post was successfully deleted!",
          variant: "subtle",
          status: "success",
          duration: "5000",
          isClosable: true,
        });
        setDltLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Failed to delete the post!",
          status: "error",
        });
      });
  };

  //* Handle Update
  const [formValue, setFormValue] = useState("");
  const onUpdate = (e) => {
    setFormValue(e);
    console.log(formValue);
  };
  const changeFormValue = (e) => {
    setFormValue(e);
  };

  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      className="user_Posts_Container"
    >
      {Loading ? (
        userPosts.map((items, key) => {
          return (
            <Feeds
              userName={userDetails.userName}
              Date={items.date}
              Content={items.Content}
              Time={items.time}
              key={key}
              userPost={true}
              loading={dltLoading}
              onDelete={handleDelete}
              postId={items._id}
              onUpdate={onUpdate}
              formValue={formValue}
              changeFormValue={changeFormValue}
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
    </Flex>
  );
};
