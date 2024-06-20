import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type RestaurantInfo = {
  restaurant: Restaurant;
};

const RestaurantIdInfo = ({ restaurant }: RestaurantInfo) => {
  return (
    <Card className="border-2 border-green-600">
      <CardHeader>
        <CardTitle className="text-3xl font-bold italic tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="italic text-xl">
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex" key={index}>
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantIdInfo;
