
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'


const UserMenu = () => {
  const { user, logout } = useAuth0()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='font-bold'>{`Hello ${user?.email}`}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/me" className='font-bold text-lg'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/manage-restaurant" className='font-bold text-lg'>Manage Your Restaurant</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="ghost"
          className='flex flex-1 font-bold bg-green-700 text-white text-lg hover:bg-green-900'
           onClick={() => logout()}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu