import { useState } from "react";

export default function useEditModal(){

    const [isOpenModal,setIsOpenModal] = useState(false)

    function openModal(){
        setIsOpenModal(true)
        
    }

    function closeModal(){
        setIsOpenModal(false)
        
    }

    return {
        openModal,closeModal,isOpenModal
    }
}