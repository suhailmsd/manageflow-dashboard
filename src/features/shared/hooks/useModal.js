import { useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  function openModal(getModalTitle) {
    setIsModalOpen(true);
    setModalTitle(getModalTitle);
  }

  function closeModal() {
    setIsModalOpen((prev) => !prev);
  }

  return { modalTitle, openModal, isModalOpen, closeModal };
}
