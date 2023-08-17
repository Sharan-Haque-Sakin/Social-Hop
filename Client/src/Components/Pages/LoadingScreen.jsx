import { Modal, ModalOverlay } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="backdrop">
      <Modal>
        <ModalOverlay>
          <HashLoader color="#36d7b7" />
        </ModalOverlay>
      </Modal>
    </div>
  );
}
