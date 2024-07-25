import { Orders, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurant = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get resturant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurant
  );

  return {
    restaurant,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurant = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurant);

  if (isSuccess) {
    toast.success("Restaurant Created!");
  }

  if (error) {
    toast.error("Unable To Create Restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurant = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update Restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyRestaurant);

  if (isSuccess) {
    toast.success("Restaurant Updated!");
  }

  if (error) {
    toast.error("Unable To Update Restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrders = async (): Promise<Orders[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant orders");
    }

    return response.json();
  };
  const { data: restaurantOrders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrders
  );

  return {
    restaurantOrders,
    isLoading,
  };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantOrderStatus = async (
    updateOrderStatusRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateOrderStatusRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status of order");  
    }

    return response.json();
  };

  const {
    mutateAsync: updateStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateRestaurantOrderStatus);

  if (isSuccess) {
    toast.message("Order Status Updated");
  }

  if (isError) {
    toast.error("Unable to update status");
    reset();
  }

  return {
    updateStatus,
    isLoading,
  };
};
