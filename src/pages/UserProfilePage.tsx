import { useGetMyUser, useUpdateMyUser } from '@/api/myUserApi'
import UserProfile from '@/forms/user-profile-forms/UserProfile'

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateMyUser() 
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()

  if(isGetLoading) {
    return <span>Loading...</span>
  }

  if(!currentUser) {
    return <span>Unable to get user details</span>
  } 

  return (
    <div>
        <UserProfile onSave={updateUser} currentUser={currentUser} isLoading={isLoading} />
    </div>
  )
}

export default UserProfilePage