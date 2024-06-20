import { useGetRestaurantById } from "@/api/RestaurantApi";
import RestaurantIdInfo from "@/components/RestaurantIdInfo";
import RestaurantMenuItem from "@/components/RestaurantMenuItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

  if (isLoading || !restaurant) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded object-cover h-full w-full"
          alt={` ${restaurant.restaurantName} Image`}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          <RestaurantIdInfo restaurant={restaurant} />
          <h3 className="text-2xl font-bold tracking-tight">
            Our Menu 
            <span className="text-green-600 text-xl italic">(Click on your desired item to select)</span>
            </h3>
          {restaurant.menuItems.map((item) => (
            <RestaurantMenuItem menuItem={item} />
          ))}
        </div>

        {/* RIGHT SIDE */}
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
