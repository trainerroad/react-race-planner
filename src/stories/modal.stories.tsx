/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import {
  Modal,
  PrimaryButton,
  DangerOutlineButton,
} from "../components/shared";

export default {
  title: "modal",
};

export const ModalStory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Modal</PrimaryButton>
      <Modal isOpen={isOpen}>
        <h3>Modal</h3>
        <DangerOutlineButton onClick={() => setIsOpen(false)}>
          Close
        </DangerOutlineButton>
      </Modal>
    </>
  );
};
ModalStory.storyName = "modal";
ModalStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
