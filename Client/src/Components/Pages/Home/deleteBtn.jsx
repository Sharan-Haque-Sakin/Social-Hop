import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export const DeleteBtn = () => {
  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      <IconButton variant="ghost">
        <DeleteIcon />
      </IconButton>
    </>
  );
};
