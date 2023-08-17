import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function SkeletonFeeds() {
  return (
    <Box padding="6" boxShadow="lg" my="1rem" width="25rem">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
}
