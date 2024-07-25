import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/myRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageResaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: updateLoading } =
    useUpdateMyRestaurant();
  const { restaurantOrders } = useGetMyRestaurantOrders();

  const editing = !!restaurant; //means give me the truthy value of this variable: if there is a restaurant
  //when the page loads for the first time, it fetches the restaurant

  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-form">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders" 
          className="space-y-4 bg-gray-50  rounded-lg p-10"
        >
          <h2 className="text-2xl font-bold">
            {restaurantOrders?.length} Active orders
          </h2>
          {restaurantOrders?.map((item) => (
            <OrderItemCard item={item} />
          ))}
        </TabsContent>
        <TabsContent value="manage-form">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={editing ? updateRestaurant : createRestaurant}
            isLoading={isLoading || updateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageResaurantPage;
