import React, { useState } from 'react'

export default function UserEditRequest() {
    const [isLoading,setIsLoading] = useState(false);
    const [editError,setEditError] = useState(null)

    function updateUser(userForm){
        console.log(userForm);

    }

    return {isLoading,updateUser}
    
}
