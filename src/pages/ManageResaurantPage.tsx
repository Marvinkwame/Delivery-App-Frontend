import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/myRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"


const ManageResaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant()
  const { updateRestaurant, isLoading: updateLoading } = useUpdateMyRestaurant()

  const editing = !!restaurant;

  return (
    <div>
        <ManageRestaurantForm 
        restaurant={restaurant} 
        onSave={editing ? updateRestaurant : createRestaurant} 
        isLoading={isLoading || updateLoading} />
    </div>
  )
}

export default ManageResaurantPage