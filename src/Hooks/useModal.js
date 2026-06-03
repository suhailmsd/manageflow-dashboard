import { useState } from "react";

export default function useModal(){
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [modalTitle,setModalTitle] = useState('');

    function openModal(getModalTitle){
        console.log(getModalTitle,'modall');
        
        setIsModalOpen(true)
        setModalTitle(getModalTitle)
    }

    function closeModal(){
        setIsModalOpen(prev => !prev)
        console.log('cancel modal clicked');
        
    }

    return {modalTitle,openModal,isModalOpen,closeModal}

}