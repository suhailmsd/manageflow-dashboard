import { useState } from "react";

export default function useEditModal() {
  const [isOpenEditModal, setIsOpenModal] = useState(false);

  function openEditModal() {
    setIsOpenModal(true);
  }

  function closeEditModal() {
    setIsOpenModal(false);
  }

  return {
    openEditModal,
    closeEditModal,
    isOpenEditModal,
  };
}
