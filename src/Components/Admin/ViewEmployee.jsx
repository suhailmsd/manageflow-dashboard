
import { useContext } from 'react'
import UserTable from './UserTable'
import {UserContext, UsersListContext} from '../../Contexts'

export default function ViewEmployee() {  

  return (
    <div className='p-2 w-[70%] mx-auto max-[700px]:p-1 max-[500px]:p-2 max-[500px]:mx-0 max-[500px]:w-full'>
        <UserTable />
    </div>
  )
}
